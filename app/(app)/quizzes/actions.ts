"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
  });
  if (!attempt || attempt.userId !== session.user.id || attempt.submittedAt) {
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
    const answers = JSON.parse(attempt.answers) as Record<string, number>;
    const total = attempt.quiz.questions.length;
    const correct = attempt.quiz.questions.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const score = total > 0 ? (correct / total) * 10 : 0;

    await prisma.quizAttempt.update({
      where: { id: attemptId },
      data: { submittedAt: new Date(), score },
    });
  }

  revalidatePath("/dashboard");
  redirect(`/quizzes/${attempt.quizId}/result/${attempt.id}`);
}
