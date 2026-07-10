"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isPastDeadline, scoreQuizAttempt } from "@/lib/quiz-scoring";

export async function startQuizAttempt(quizId: string) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");

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
  choiceIndex: number
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

  const answers = JSON.parse(attempt.answers) as Record<string, number>;
  answers[questionId] = choiceIndex;

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
    const answers = JSON.parse(attempt.answers) as Record<string, number>;
    const score = scoreQuizAttempt(attempt.quiz.questions, answers);
    const late = isPastDeadline(attempt.startedAt, attempt.quiz.durationSec);

    await prisma.quizAttempt.update({
      where: { id: attemptId },
      data: { submittedAt: new Date(), score, late },
    });

    const pointsEarned = Math.round(score * (late ? 5 : 10));
    await prisma.user.update({
      where: { id: session.user.id },
      data: { points: { increment: pointsEarned } },
    });
  }

  revalidatePath("/dashboard");
  redirect(`/quizzes/${attempt.quizId}/result/${attempt.id}`);
}
