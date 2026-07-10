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
import { scoreQuestion, type QuestionAnswer, type Statement } from "@/lib/quiz-scoring";
import { ArrowLeft, Check, X, Sparkles } from "lucide-react";

const TYPE_TAG: Record<string, string> = {
  SINGLE_CHOICE: "Trắc nghiệm",
  TRUE_FALSE_GROUP: "Đúng / Sai",
  SHORT_ANSWER: "Trả lời ngắn",
};

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
      learningPathRecommendation: true,
    },
  });

  if (!attempt || attempt.userId !== session.user.id || attempt.quizId !== id) {
    notFound();
  }
  if (!attempt.submittedAt) notFound();

  const answers = JSON.parse(attempt.answers) as Record<string, QuestionAnswer>;

  const scored = attempt.quiz.questions.map((q) => {
    const statements = q.statements ? (JSON.parse(q.statements) as Statement[]) : null;
    const fraction = scoreQuestion(
      { id: q.id, type: q.type, correctIndex: q.correctIndex, statements, shortAnswer: q.shortAnswer },
      answers[q.id]
    );
    return { question: q, statements, fraction };
  });

  const statsByDifficulty = DIFFICULTY_ORDER.map((difficulty) => {
    const rows = scored.filter((s) => s.question.difficulty === difficulty);
    const correct = rows.filter((s) => s.fraction === 1).length;
    return { difficulty, correct, total: rows.length };
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

      {attempt.learningPathRecommendation && (
        <Card className="border-accent-purple/40 bg-gradient-to-br from-[#FFD9E8]/15 via-[#E5D4FF]/15 to-[#D4E9FF]/15">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            <CardTitle className="text-sm">Phân tích & lộ trình ôn tập (AI)</CardTitle>
          </div>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground">
            <ChemProseText text={attempt.learningPathRecommendation.recommendation} />
          </p>
        </Card>
      )}

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
        {scored.map(({ question: q, statements, fraction }, idx) => {
          const chosen = answers[q.id];
          const isFullyCorrect = fraction === 1;

          return (
            <Card key={q.id}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    <span className="text-foreground-muted">Câu {idx + 1}. </span>
                    <ChemProseText text={q.content} />
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <DifficultyBadge difficulty={q.difficulty} />
                    <Badge tone="neutral">{TYPE_TAG[q.type] ?? q.type}</Badge>
                  </div>
                </div>
                {isFullyCorrect ? (
                  <Badge tone="success">
                    <Check className="h-3.5 w-3.5" />
                  </Badge>
                ) : fraction > 0 ? (
                  <Badge tone="warning">{fraction.toFixed(2).replace(/\.?0+$/, "")} điểm</Badge>
                ) : (
                  <Badge tone="danger">
                    <X className="h-3.5 w-3.5" />
                  </Badge>
                )}
              </div>

              {q.type === "SINGLE_CHOICE" && q.choices && (
                <div className="flex flex-col gap-2">
                  {(JSON.parse(q.choices) as string[]).map((choice, choiceIdx) => {
                    const isRightAnswer = choiceIdx === q.correctIndex;
                    const isChosenWrong = choiceIdx === chosen && !isRightAnswer;
                    return (
                      <div
                        key={choiceIdx}
                        className={cn(
                          "rounded-xl border px-4 py-2.5 text-sm",
                          isRightAnswer && "border-success-fg/30 bg-success-bg text-success-fg",
                          isChosenWrong && "border-danger-fg/30 bg-danger-bg text-danger-fg",
                          !isRightAnswer && !isChosenWrong && "border-border-subtle"
                        )}
                      >
                        <ChemProseText text={choice} />
                      </div>
                    );
                  })}
                </div>
              )}

              {q.type === "TRUE_FALSE_GROUP" && statements && (
                <div className="flex flex-col gap-2">
                  {statements.map((s, sIdx) => {
                    const studentAnswer = Array.isArray(chosen) ? chosen[sIdx] : undefined;
                    const matched = studentAnswer === s.correct;
                    return (
                      <div
                        key={sIdx}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-sm",
                          matched
                            ? "border-success-fg/30 bg-success-bg text-success-fg"
                            : "border-danger-fg/30 bg-danger-bg text-danger-fg"
                        )}
                      >
                        <p>
                          <span className="opacity-70">{String.fromCharCode(97 + sIdx)}) </span>
                          <ChemProseText text={s.text} />
                        </p>
                        <span className="shrink-0 text-xs font-medium">
                          Bạn chọn: {studentAnswer === undefined ? "—" : studentAnswer ? "Đúng" : "Sai"}
                          {" · "}Đáp án: {s.correct ? "Đúng" : "Sai"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {q.type === "SHORT_ANSWER" && (
                <div className="flex flex-col gap-2">
                  <div
                    className={cn(
                      "rounded-xl border px-4 py-2.5 text-sm",
                      isFullyCorrect
                        ? "border-success-fg/30 bg-success-bg text-success-fg"
                        : "border-danger-fg/30 bg-danger-bg text-danger-fg"
                    )}
                  >
                    Bạn trả lời: {typeof chosen === "string" && chosen.trim() !== "" ? chosen : "(bỏ trống)"}
                  </div>
                  {!isFullyCorrect && (
                    <div className="rounded-xl border border-success-fg/30 bg-success-bg px-4 py-2.5 text-sm text-success-fg">
                      Đáp án đúng: {q.shortAnswer}
                    </div>
                  )}
                </div>
              )}

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
