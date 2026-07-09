"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChemProseText } from "@/components/chemistry/chemical-formula";
import { cn } from "@/lib/utils";
import { RotateCw, PartyPopper } from "lucide-react";

type Card1 = { id: string; term: string; meaning: string };

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function FlashcardDeck({ cards }: { cards: Card1[] }) {
  const [queue, setQueue] = useState(() => shuffle(cards));
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [reviewed, setReviewed] = useState(0);

  const current = queue[0];

  const progressLabel = useMemo(
    () => `${reviewed} lượt · ${known} thẻ đã nhớ`,
    [reviewed, known]
  );

  function handleResponse(rememberedIt: boolean) {
    setReviewed((r) => r + 1);
    setFlipped(false);

    setQueue((prev) => {
      const [first, ...rest] = prev;
      if (rememberedIt) {
        setKnown((k) => k + 1);
        return rest;
      }
      return [...rest, first];
    });
  }

  if (!current) {
    return (
      <Card className="flex flex-col items-center gap-3 py-12 text-center">
        <PartyPopper className="h-8 w-8" strokeWidth={1.5} />
        <p className="text-sm font-medium">Bạn đã ôn hết bộ thẻ này!</p>
        <p className="text-sm text-foreground-muted">{progressLabel}</p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setQueue(shuffle(cards));
            setKnown(0);
            setReviewed(0);
          }}
        >
          Ôn lại từ đầu
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <Badge tone="neutral">{progressLabel}</Badge>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full"
      >
        <Card
          className={cn(
            "flex h-56 w-full flex-col items-center justify-center gap-3 text-center transition-colors",
            flipped && "bg-background-subtle"
          )}
        >
          <span className="text-2xl font-semibold tracking-tight">
            <ChemProseText text={flipped ? current.meaning : current.term} />
          </span>
          <span className="flex items-center gap-1.5 text-xs text-foreground-muted">
            <RotateCw className="h-3.5 w-3.5" /> Bấm để lật thẻ
          </span>
        </Card>
      </button>

      <div className="grid w-full grid-cols-2 gap-3">
        <Button variant="secondary" onClick={() => handleResponse(false)}>
          Chưa nhớ
        </Button>
        <Button onClick={() => handleResponse(true)}>Nhớ rồi</Button>
      </div>
    </div>
  );
}
