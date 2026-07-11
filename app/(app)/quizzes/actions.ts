"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  isPastDeadline,
  scoreQuestion,
  scoreQuizAttempt,
  type QuestionAnswer,
  type Statement,
} from "@/lib/quiz-scoring";
import { generateLearningPathRecommendation } from "@/lib/ai/placement-analysis";

export async function startQuizAttempt(quizId: string) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");

  const quiz = await prisma.quiz.findUnique({ where: { id: quizId }, select: { grade: true } });
  if (!quiz) throw new Error("Không tìm thấy đề kiểm tra.");
  if (session.user.role !== "ADMIN" && session.user.grade !== quiz.grade) {
    throw new Error("Không có quyền làm đề của lớp khác.");
  }

  const existing = await prisma.quizAttempt.findFirst({
    where: { userId: session.user.id, quizId, submittedAt: null },
    orderBy: { startedAt: "desc" },
  });

  const attempt =
    existing ??
    (await prisma.quizAttempt.create({
      data: { userId: session.user.id, quizId },
    }));

  redirect(`/quizzes/${quizId}/attempt/${attempt.id}`);
}

export async function saveQuizAnswer(
  attemptId: string,
  questionId: string,
  answer: QuestionAnswer
) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: { quiz: true },
  });
  if (!attempt || attempt.userId !== session.user.id || attempt.submittedAt) {
    return;
  }

  // Đã hết giờ (server time) — không nhận thêm đáp án nữa, kể cả khi client
  // vẫn còn gửi request (ví dụ do tab bị treo hoặc bị can thiệp).
  if (isPastDeadline(attempt.startedAt, attempt.quiz.durationSec)) {
    return;
  }

  const answers = JSON.parse(attempt.answers) as Record<string, QuestionAnswer>;
  answers[questionId] = answer;

  await prisma.quizAttempt.update({
    where: { id: attemptId },
    data: { answers: JSON.stringify(answers) },
  });
}

export async function submitQuizAttempt(attemptId: string) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: { quiz: { include: { questions: true } } },
  });
  if (!attempt || attempt.userId !== session.user.id) {
    throw new Error("Không tìm thấy bài làm.");
  }

  if (!attempt.submittedAt) {
    // Chấm dựa trên đáp án đã lưu tại thời điểm này. saveQuizAnswer đã từ chối
    // lưu thêm đáp án sau deadline nên answers ở đây luôn phản ánh đúng trạng
    // thái tại thời điểm hết giờ, bất kể submitQuizAttempt được gọi trễ bao lâu.
    const answers = JSON.parse(attempt.answers) as Record<string, QuestionAnswer>;
    const scorableQuestions = attempt.quiz.questions.map((q) => ({
      id: q.id,
      type: q.type,
      correctIndex: q.correctIndex,
      statements: q.statements ? (JSON.parse(q.statements) as Statement[]) : null,
      shortAnswer: q.shortAnswer,
    }));
    const score = scoreQuizAttempt(scorableQuestions, answers);
    const late = isPastDeadline(attempt.startedAt, attempt.quiz.durationSec);

    // Điều kiện `submittedAt: null` ở where khiến update này chỉ khớp đúng 1 lần
    // dù 2 request nộp bài trùng lúc (double-click, mạng lag rồi bấm lại...) —
    // Postgres khoá theo dòng nên chỉ 1 trong 2 request thắng, request còn lại
    // update 0 dòng và bỏ qua toàn bộ phần cộng điểm/phân tích AI bên dưới.
    const claim = await prisma.quizAttempt.updateMany({
      where: { id: attemptId, submittedAt: null },
      data: { submittedAt: new Date(), score, late },
    });

    if (claim.count === 1) {
      const pointsEarned = Math.round(score * (late ? 5 : 10));
      await prisma.user.update({
        where: { id: session.user.id },
        data: { points: { increment: pointsEarned } },
      });
    }

    if (claim.count === 1 && attempt.quiz.kind !== "REGULAR") {
      try {
        const analysisQuestions = attempt.quiz.questions.map((q, i) => ({
          content: q.content,
          difficulty: q.difficulty,
          isCorrect: scoreQuestion(scorableQuestions[i], answers[q.id]) === 1,
        }));
        const { weakAreas, recommendation } = await generateLearningPathRecommendation(
          analysisQuestions,
          String(attempt.quiz.grade)
        );
        await prisma.learningPathRecommendation.create({
          data: {
            userId: session.user.id,
            quizAttemptId: attemptId,
            weakAreas: JSON.stringify(weakAreas),
            recommendation,
          },
        });
      } catch {
        // AI phân tích không bắt buộc để xem kết quả bài làm - bỏ qua nếu lỗi
        // (vd. chưa cấu hình GEMINI_API_KEY), học sinh vẫn thấy điểm số bình thường.
      }
    }
  }

  revalidatePath("/dashboard");
  redirect(`/quizzes/${attempt.quizId}/result/${attempt.id}`);
}
