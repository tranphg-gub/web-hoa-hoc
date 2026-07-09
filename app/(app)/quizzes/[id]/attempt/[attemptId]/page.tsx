import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QuizRunner } from "./quiz-runner";

export default async function QuizAttemptPage({
  params,
}: {
  params: Promise<{ id: string; attemptId: string }>;
}) {
  const { id, attemptId } = await params;
  const session = await auth();

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: {
      quiz: { include: { questions: { orderBy: { order: "asc" } } } },
    },
  });

  if (!attempt || attempt.userId !== session!.user.id || attempt.quizId !== id) {
    notFound();
  }

  if (attempt.submittedAt) {
    redirect(`/quizzes/${id}/result/${attemptId}`);
  }

  const questions = attempt.quiz.questions.map((q) => ({
    id: q.id,
    content: q.content,
    choices: JSON.parse(q.choices) as string[],
  }));

  const savedAnswers = JSON.parse(attempt.answers) as Record<string, number>;

  return (
    <QuizRunner
      attemptId={attempt.id}
      quizId={id}
      title={attempt.quiz.title}
      durationSec={attempt.quiz.durationSec}
      startedAt={attempt.startedAt.toISOString()}
      questions={questions}
      initialAnswers={savedAnswers}
    />
  );
}
