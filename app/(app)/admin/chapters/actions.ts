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

export async function createChapter(formData: FormData) {
  await requireAdmin();

  await prisma.chapter.create({
    data: {
      grade: Number(formData.get("grade")),
      order: Number(formData.get("order")),
      title: String(formData.get("title") ?? "").trim(),
    },
  });

  revalidatePath("/admin/chapters");
}

export async function deleteChapter(chapterId: string) {
  await requireAdmin();

  const [documentsCount, quizzesCount, flashcardSetsCount] = await Promise.all([
    prisma.document.count({ where: { chapterId } }),
    prisma.quiz.count({ where: { chapterId } }),
    prisma.flashcardSet.count({ where: { chapterId } }),
  ]);

  if (documentsCount > 0 || quizzesCount > 0 || flashcardSetsCount > 0) {
    throw new Error(
      "Không thể xóa chương còn tài liệu/đề kiểm tra/bộ flashcard. Hãy xóa hoặc chuyển nội dung sang chương khác trước."
    );
  }

  await prisma.chapter.delete({ where: { id: chapterId } });
  revalidatePath("/admin/chapters");
}
