"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChemProseText } from "@/components/chemistry/chemical-formula";
import { cn } from "@/lib/utils";
import { PartyPopper } from "lucide-react";

type CardData = { id: string; term: string; meaning: string };
type Tile = { key: string; cardId: string; label: string };

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildTiles(cards: CardData[]): Tile[] {
  const tiles: Tile[] = [];
  cards.forEach((c) => {
    tiles.push({ key: `${c.id}-term`, cardId: c.id, label: c.term });
    tiles.push({ key: `${c.id}-meaning`, cardId: c.id, label: c.meaning });
  });
  return shuffle(tiles);
}

function formatTime(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function MatchingGame({ cards }: { cards: CardData[] }) {
  const [tiles, setTiles] = useState(() => buildTiles(cards));
  const [selected, setSelected] = useState<Tile[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const finished = matchedCardIds.size === cards.length && cards.length > 0;

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [finished]);

  useEffect(() => {
    if (selected.length !== 2) return;
    const [a, b] = selected;
    const isMatch = a.cardId === b.cardId;

    const timeout = setTimeout(() => {
      if (isMatch) {
        setMatchedCardIds((prev) => new Set(prev).add(a.cardId));
      } else {
        setMistakes((m) => m + 1);
      }
      setSelected([]);
    }, 500);

    return () => clearTimeout(timeout);
  }, [selected]);

  function handleTileClick(tile: Tile) {
    if (matchedCardIds.has(tile.cardId)) return;
    if (selected.length === 2) return;
    if (selected.some((s) => s.key === tile.key)) return;
    setSelected((prev) => [...prev, tile]);
  }

  const stats = useMemo(
    () => `${formatTime(elapsed)} · ${mistakes} lượt sai`,
    [elapsed, mistakes]
  );

  if (finished) {
    return (
      <Card className="flex flex-col items-center gap-3 py-12 text-center">
        <PartyPopper className="h-8 w-8" strokeWidth={1.5} />
        <p className="text-sm font-medium">Hoàn thành!</p>
        <p className="text-sm text-foreground-muted">{stats}</p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setTiles(buildTiles(cards));
            setMatchedCardIds(new Set());
            setMistakes(0);
            setElapsed(0);
          }}
        >
          Chơi lại
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Badge tone="neutral" className="self-start">
        {stats}
      </Badge>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tiles.map((tile) => {
          const isMatched = matchedCardIds.has(tile.cardId);
          const isSelected = selected.some((s) => s.key === tile.key);
          return (
            <button
              key={tile.key}
              type="button"
              disabled={isMatched}
              onClick={() => handleTileClick(tile)}
              className={cn(
                "flex min-h-20 items-center justify-center rounded-xl border px-3 py-3 text-center text-sm transition-colors",
                isMatched && "border-success-fg/30 bg-success-bg text-success-fg opacity-60",
                isSelected && !isMatched && "border-foreground bg-background-subtle",
                !isMatched && !isSelected && "border-border-subtle hover:bg-background-subtle"
              )}
            >
              <ChemProseText text={tile.label} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
