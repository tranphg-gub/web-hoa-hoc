import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import { FlashcardDeck } from "./flashcard-deck";

export default async function FlashcardsPage({
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

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <Link
        href="/games"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại trò chơi
      </Link>
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{set.topic}</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Bấm vào thẻ để lật, chọn &quot;Nhớ rồi&quot; hoặc &quot;Chưa nhớ&quot;.
        </p>
      </div>
      <FlashcardDeck
        cards={set.cards.map((c) => ({ id: c.id, term: c.term, meaning: c.meaning }))}
      />
    </div>
  );
}
