import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { addFlashcard, deleteFlashcard } from "../actions";

export default async function AdminFlashcardSetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const set = await prisma.flashcardSet.findUnique({
    where: { id },
    include: { cards: { orderBy: { order: "asc" } } },
  });
  if (!set) notFound();

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <Link
        href="/admin/flashcards"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách bộ flashcard
      </Link>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">{set.topic}</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Lớp {set.grade} · {set.cards.length} thẻ
        </p>
      </div>

      <Card>
        <CardTitle>Thêm thẻ</CardTitle>
        <form
          action={async (formData: FormData) => {
            "use server";
            await addFlashcard(id, formData);
          }}
          className="mt-4 grid gap-4 sm:grid-cols-2"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="term">Mặt trước (term)</Label>
            <Input id="term" name="term" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="meaning">Mặt sau (nghĩa)</Label>
            <Input id="meaning" name="meaning" required />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">Thêm thẻ</Button>
          </div>
        </form>
      </Card>

      <div className="flex flex-col gap-2">
        {set.cards.map((card) => (
          <Card key={card.id} className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">{card.term}</span>
              <span className="mx-2 text-foreground-muted">—</span>
              <span className="text-foreground-muted">{card.meaning}</span>
            </div>
            <form
              action={async () => {
                "use server";
                await deleteFlashcard(id, card.id);
              }}
            >
              <Button type="submit" size="sm" variant="ghost">
                Xóa
              </Button>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}
