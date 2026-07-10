"use client";

import { useState } from "react";
import type { Difficulty } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { ChemProseText } from "@/components/chemistry/chemical-formula";
import { cn } from "@/lib/utils";
import { PartyPopper } from "lucide-react";

type PracticeQuestionData = {
  id: string;
  content: string;
  choices: string[];
  correctIndex: number;
  explanation: string | null;
  difficulty: Difficulty;
};

function shuffleOrder(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function PracticeRunner({ questions }: { questions: PracticeQuestionData[] }) {
  const [order, setOrder] = useState(() => shuffleOrder(questions.length));
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[order[idx]];

  function handleChoose(choiceIdx: number) {
    if (chosen !== null) return;
    setChosen(choiceIdx);
    if (choiceIdx === question.correctIndex) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (idx + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIdx((i) => i + 1);
      setChosen(null);
    }
  }

  function handleRestart() {
    setOrder(shuffleOrder(questions.length));
    setIdx(0);
    setChosen(null);
    setCorrectCount(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <Card className="flex flex-col items-center gap-3 py-12 text-center">
        <PartyPopper className="h-8 w-8" strokeWidth={1.5} />
        <p className="text-sm font-medium">
          Bạn làm đúng {correctCount}/{questions.length} câu.
        </p>
        <Button variant="secondary" size="sm" onClick={handleRestart}>
          Làm lại
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Badge tone="neutral">
          Câu {idx + 1}/{questions.length}
        </Badge>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      <Card>
        <p className="text-sm font-medium leading-relaxed">
          <ChemProseText text={question.content} />
        </p>
      </Card>

      <div className="flex flex-col gap-2">
        {question.choices.map((choice, choiceIdx) => {
          const isRightAnswer = choiceIdx === question.correctIndex;
          const isChosenWrong = choiceIdx === chosen && !isRightAnswer;
          const showResult = chosen !== null;

          return (
            <button
              key={choiceIdx}
              type="button"
              disabled={showResult}
              onClick={() => handleChoose(choiceIdx)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                showResult && isRightAnswer && "border-success-fg/30 bg-success-bg text-success-fg",
                showResult && isChosenWrong && "border-danger-fg/30 bg-danger-bg text-danger-fg",
                !showResult && "border-border-subtle hover:bg-background-subtle"
              )}
            >
              {String.fromCharCode(65 + choiceIdx)}. <ChemProseText text={choice} />
            </button>
          );
        })}
      </div>

      {chosen !== null && (
        <Card className="bg-background-subtle">
          {question.explanation && (
            <p className="text-sm text-foreground-muted">
              <span className="font-medium text-foreground">Giải thích: </span>
              <ChemProseText text={question.explanation} />
            </p>
          )}
          <div className="mt-3">
            <Button size="sm" onClick={handleNext}>
              {idx + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp theo"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
