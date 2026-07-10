import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-auth";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { DIFFICULTY_ORDER } from "@/lib/difficulty";
import { ChemProseText } from "@/components/chemistry/chemical-formula";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, X } from "lucide-react";

export default async function QuizResultPage({
  params,
}: {
  params: Promise<{ id: string; attemptId: string }>;
}) {
  const { id, attemptId } = await params;
  const session = await requireUser();

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: {
      quiz: { include: { questions: { orderBy: { order: "asc" } } } },
    },
  });

  if (!attempt || attempt.userId !== session.user.id || attempt.quizId !== id) {
    notFound();
  }
  if (!attempt.submittedAt) notFound();

  const answers = JSON.parse(attempt.answers) as Record<string, number>;

  const statsByDifficulty = DIFFICULTY_ORDER.map((difficulty) => {
    const questions = attempt.quiz.questions.filter((q) => q.difficulty === difficulty);
    const correct = questions.filter((q) => answers[q.id] === q.correctIndex).length;
    return { difficulty, correct, total: questions.length };
  }).filter((s) => s.total > 0);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 pb-16">
      <Link
        href="/quizzes"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách đề
      </Link>

      <Card className="flex items-center justify-between bg-background-subtle">
        <div>
          <CardTitle>{attempt.quiz.title}</CardTitle>
          <p className="mt-1 text-sm text-foreground-muted">
            Nộp lúc {attempt.submittedAt.toLocaleString("vi-VN")}
          </p>
          {attempt.late && (
            <Badge tone="warning" className="mt-2">
              Nộp trễ (quá thời gian quy định)
            </Badge>
          )}
        </div>
        <Badge tone={(attempt.score ?? 0) >= 5 ? "success" : "danger"} className="text-base">
          {attempt.score?.toFixed(1)} / 10
        </Badge>
      </Card>

      {statsByDifficulty.length > 0 && (
        <Card>
          <CardTitle className="text-sm">Kết quả theo mức độ</CardTitle>
          <div className="mt-3 flex flex-wrap gap-2">
            {statsByDifficulty.map((s) => (
              <div
                key={s.difficulty}
                className="flex items-center gap-2 rounded-xl border border-border-subtle px-3 py-2 text-sm"
              >
                <DifficultyBadge difficulty={s.difficulty} />
                <span className="text-foreground-muted">
                  {s.correct}/{s.total} câu
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {attempt.quiz.questions.map((q, idx) => {
          const choices = JSON.parse(q.choices) as string[];
          const chosen = answers[q.id];
          const isCorrect = chosen === q.correctIndex;

          return (
            <Card key={q.id}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    <span className="text-foreground-muted">Câu {idx + 1}. </span>
                    <ChemProseText text={q.content} />
                  </p>
                  <div className="mt-2">
                    <DifficultyBadge difficulty={q.difficulty} />
                  </div>
                </div>
                {isCorrect ? (
                  <Badge tone="success">
                    <Check className="h-3.5 w-3.5" />
                  </Badge>
                ) : (
                  <Badge tone="danger">
                    <X className="h-3.5 w-3.5" />
                  </Badge>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {choices.map((choice, choiceIdx) => {
                  const isRightAnswer = choiceIdx === q.correctIndex;
                  const isChosenWrong = choiceIdx === chosen && !isRightAnswer;
                  return (
                    <div
                      key={choiceIdx}
                      className={cn(
                        "rounded-xl border px-4 py-2.5 text-sm",
                        isRightAnswer &&
                          "border-success-fg/30 bg-success-bg text-success-fg",
                        isChosenWrong &&
                          "border-danger-fg/30 bg-danger-bg text-danger-fg",
                        !isRightAnswer && !isChosenWrong && "border-border-subtle"
                      )}
                    >
                      <ChemProseText text={choice} />
                    </div>
                  );
                })}
              </div>
              {q.explanation && (
                <p className="mt-3 text-sm text-foreground-muted">
                  <span className="font-medium text-foreground">Giải thích: </span>
                  <ChemProseText text={q.explanation} />
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
