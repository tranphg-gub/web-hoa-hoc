"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChemProseText } from "@/components/chemistry/chemical-formula";
import { cn } from "@/lib/utils";
import { saveQuizAnswer, submitQuizAttempt } from "@/app/(app)/quizzes/actions";
import type { QuizKind } from "@prisma/client";
import { AlertTriangle } from "lucide-react";

type Question = {
  id: string;
  content: string;
  choices: string[];
};

function computeRemainingSec(startedAt: string, durationSec: number) {
  const elapsedMs = Date.now() - new Date(startedAt).getTime();
  const remaining = durationSec - Math.floor(elapsedMs / 1000);
  return Math.max(0, remaining);
}

function formatTime(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function QuizRunner({
  attemptId,
  title,
  durationSec,
  startedAt,
  questions,
  initialAnswers,
  kind,
}: {
  attemptId: string;
  quizId: string;
  title: string;
  durationSec: number;
  startedAt: string;
  questions: Question[];
  initialAnswers: Record<string, number>;
  kind: QuizKind;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers);
  const [remaining, setRemaining] = useState(() =>
    computeRemainingSec(startedAt, durationSec)
  );
  const [submitting, setSubmitting] = useState(false);
  const submittedRef = useRef(false);

  const handleSubmit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    await submitQuizAttempt(attemptId);
  }, [attemptId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = computeRemainingSec(startedAt, durationSec);
      setRemaining(next);
      if (next <= 0) {
        clearInterval(interval);
        handleSubmit();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt, durationSec, handleSubmit]);

  function handleSelect(questionId: string, choiceIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
    saveQuizAnswer(attemptId, questionId, choiceIndex);
  }

  const answeredCount = Object.keys(answers).length;
  const isLowTime = remaining <= 120;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 pb-24">
      <div className="sticky top-0 z-10 -mx-5 flex items-center justify-between border-b border-border-subtle bg-background/95 px-5 py-4 backdrop-blur md:-mx-10 md:px-10">
        <div>
          <h1 className="text-base font-semibold tracking-tight">{title}</h1>
          <p className="text-xs text-foreground-muted">
            Đã trả lời {answeredCount}/{questions.length} câu
          </p>
        </div>
        <div
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-semibold tabular-nums",
            isLowTime
              ? "border-danger-fg/20 bg-danger-bg text-danger-fg"
              : "border-border-subtle bg-background-subtle text-foreground"
          )}
        >
          {formatTime(remaining)}
        </div>
      </div>

      {kind !== "REGULAR" && (
        <div className="flex items-start gap-3 rounded-2xl border border-warning-fg/20 bg-warning-bg px-4 py-3 text-sm text-warning-fg">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
          <span>
            Đây là bài {kind === "PLACEMENT" ? "test đầu vào" : "đánh giá định kỳ"} dùng để xếp lộ
            trình học phù hợp cho bạn. Hãy làm nghiêm túc, không chọn đáp án bừa để kết quả phản
            ánh đúng năng lực hiện tại nhé.
          </span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {questions.map((q, idx) => (
          <Card key={q.id}>
            <p className="mb-4 text-sm font-medium">
              <span className="text-foreground-muted">Câu {idx + 1}. </span>
              <ChemProseText text={q.content} />
            </p>
            <div className="flex flex-col gap-2">
              {q.choices.map((choice, choiceIdx) => {
                const selected = answers[q.id] === choiceIdx;
                return (
                  <button
                    key={choiceIdx}
                    type="button"
                    onClick={() => handleSelect(q.id, choiceIdx)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition-colors",
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border-subtle hover:bg-background-subtle"
                    )}
                  >
                    <ChemProseText text={choice} />
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <Badge tone="neutral" className="self-center">
        Hết giờ sẽ tự động nộp bài
      </Badge>

      <Button
        size="lg"
        className="w-full"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? "Đang nộp bài..." : "Nộp bài"}
      </Button>
    </div>
  );
}
