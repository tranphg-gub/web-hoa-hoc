import type { Difficulty } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_LABELS, DIFFICULTY_TONES } from "@/lib/difficulty";

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <Badge tone={DIFFICULTY_TONES[difficulty]}>{DIFFICULTY_LABELS[difficulty]}</Badge>;
}
