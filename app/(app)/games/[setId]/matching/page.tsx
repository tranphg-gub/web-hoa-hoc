import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import { MatchingGame } from "./matching-game";

export default async function MatchingPage({
  params,
}: {
  params: Promise<{ setId: string }>;
}) {
  const { setId } = await params;
  const set = await prisma.flashcardSet.findUnique({
    where: { id: setId },
    include: { cards: { orderBy: { order: "asc" } } },
  });
  if (!set) notFound();

  const cards = set.cards.slice(0, 6).map((c) => ({
    id: c.id,
    term: c.term,
    meaning: c.meaning,
  }));

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href="/games"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại trò chơi
      </Link>
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{set.topic}</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Ghép các ô tương ứng với nhau — càng ít lượt sai càng tốt.
        </p>
      </div>
      <MatchingGame cards={cards} />
    </div>
  );
}
