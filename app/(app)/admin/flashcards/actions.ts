"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Không có quyền truy cập.");
  }
}

export async function createFlashcardSet(formData: FormData) {
  await requireAdmin();

  await prisma.flashcardSet.create({
    data: {
      grade: Number(formData.get("grade")),
      chapterId: String(formData.get("chapterId") ?? ""),
      topic: String(formData.get("topic") ?? "").trim(),
    },
  });

  revalidatePath("/admin/flashcards");
}

export async function deleteFlashcardSet(setId: string) {
  await requireAdmin();
  await prisma.flashcardSet.delete({ where: { id: setId } });
  revalidatePath("/admin/flashcards");
}

export async function addFlashcard(setId: string, formData: FormData) {
  await requireAdmin();

  const existingCount = await prisma.flashcard.count({ where: { setId } });

  await prisma.flashcard.create({
    data: {
      setId,
      term: String(formData.get("term") ?? "").trim(),
      meaning: String(formData.get("meaning") ?? "").trim(),
      order: existingCount,
    },
  });

  revalidatePath(`/admin/flashcards/${setId}`);
}

export async function deleteFlashcard(setId: string, cardId: string) {
  await requireAdmin();
  await prisma.flashcard.delete({ where: { id: cardId } });
  revalidatePath(`/admin/flashcards/${setId}`);
}
