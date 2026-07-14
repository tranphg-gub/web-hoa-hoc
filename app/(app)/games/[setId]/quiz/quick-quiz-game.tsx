"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChemProseText } from "@/components/chemistry/chemical-formula";
import { cn } from "@/lib/utils";
import { PartyPopper } from "lucide-react";

type CardData = { id: string; term: string; meaning: string };
type Round = { cardId: string; term: string; choices: string[]; correctIndex: number };

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRounds(cards: CardData[], doShuffle: boolean): Round[] {
  const orderedCards = doShuffle ? shuffle(cards) : cards;
  return orderedCards.map((card) => {
    const otherMeanings = cards.filter((c) => c.id !== card.id).map((c) => c.meaning);
    const distractors = (doShuffle ? shuffle(otherMeanings) : otherMeanings).slice(0, 3);
    const choices = doShuffle ? shuffle([card.meaning, ...distractors]) : [card.meaning, ...distractors];
    return {
      cardId: card.id,
      term: card.term,
      choices,
      correctIndex: choices.indexOf(card.meaning),
    };
  });
}

const SECONDS_PER_CARD = 8;

export function QuickQuizGame({ cards }: { cards: CardData[] }) {
  // Giữ thứ tự gốc lúc SSR, chỉ xáo câu hỏi/phương án trong useEffect (chạy
  // sau khi hydrate xong) — xáo ngay trong useState() bằng Math.random() sẽ
  // cho kết quả khác nhau giữa server và client, gây lỗi "hydration mismatch".
  const [rounds, setRounds] = useState(() => buildRounds(cards, false));
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredIdx, setAnsweredIdx] = useState<number | null>(null);
  const totalTime = rounds.length * SECONDS_PER_CARD;
  const [remaining, setRemaining] = useState(totalTime);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setRounds(buildRounds(cards, true));
    setRemaining(cards.length * SECONDS_PER_CARD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length]);

  const currentRound = rounds[roundIdx];

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(interval);
          setFinished(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [finished]);

  function handleAnswer(choiceIdx: number) {
    if (answeredIdx !== null) return;
    setAnsweredIdx(choiceIdx);
    if (choiceIdx === currentRound.correctIndex) setScore((s) => s + 1);

    setTimeout(() => {
      if (roundIdx + 1 >= rounds.length) {
        setFinished(true);
      } else {
        setRoundIdx((i) => i + 1);
        setAnsweredIdx(null);
      }
    }, 600);
  }

  const progressLabel = useMemo(
    () => `Câu ${Math.min(roundIdx + 1, rounds.length)}/${rounds.length}`,
    [roundIdx, rounds.length]
  );

  function restart() {
    setRounds(buildRounds(cards, true));
    setRoundIdx(0);
    setScore(0);
    setAnsweredIdx(null);
    setRemaining(totalTime);
    setFinished(false);
  }

  if (finished) {
    return (
      <Card className="flex flex-col items-center gap-3 py-12 text-center">
        <PartyPopper className="h-8 w-8" strokeWidth={1.5} />
        <p className="text-sm font-medium">
          Bạn trả lời đúng {score}/{rounds.length} câu!
        </p>
        <Button variant="secondary" size="sm" onClick={restart}>
          Chơi lại
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Badge tone="neutral">{progressLabel}</Badge>
        <Badge tone={remaining <= 5 ? "danger" : "neutral"}>
          {remaining}s
        </Badge>
      </div>

      <Card className="flex flex-col items-center gap-2 py-8 text-center">
        <span className="text-xs text-foreground-muted">Đây là gì?</span>
        <span className="text-2xl font-semibold tracking-tight">
          <ChemProseText text={currentRound.term} />
        </span>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {currentRound.choices.map((choice, idx) => {
          const isCorrect = idx === currentRound.correctIndex;
          const isChosen = idx === answeredIdx;
          const showResult = answeredIdx !== null;

          return (
            <button
              key={idx}
              type="button"
              disabled={showResult}
              onClick={() => handleAnswer(idx)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                showResult && isCorrect && "border-success-fg/30 bg-success-bg text-success-fg",
                showResult && isChosen && !isCorrect && "border-danger-fg/30 bg-danger-bg text-danger-fg",
                !showResult && "border-border-subtle hover:bg-background-subtle"
              )}
            >
              <ChemProseText text={choice} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
