"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { Difficulty } from "@prisma/client";
import { generateExercises, type GeneratedExercise } from "@/lib/ai/exercise-generator";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Không có quyền truy cập.");
  }
}

export async function createPracticeQuestion(chapterId: string, formData: FormData) {
  await requireAdmin();

  const choices = [
    String(formData.get("choiceA") ?? ""),
    String(formData.get("choiceB") ?? ""),
    String(formData.get("choiceC") ?? ""),
    String(formData.get("choiceD") ?? ""),
  ].filter((c) => c.trim() !== "");

  await prisma.practiceQuestion.create({
    data: {
      chapterId,
      content: String(formData.get("content") ?? ""),
      choices: JSON.stringify(choices),
      correctIndex: Number(formData.get("correctIndex")),
      explanation: String(formData.get("explanation") ?? "") || null,
      difficulty: formData.get("difficulty") as Difficulty,
      source: String(formData.get("source") ?? "").trim() || null,
    },
  });

  revalidatePath(`/admin/practice/${chapterId}`);
}

export async function deletePracticeQuestion(chapterId: string, questionId: string) {
  await requireAdmin();
  await prisma.practiceQuestion.delete({ where: { id: questionId } });
  revalidatePath(`/admin/practice/${chapterId}`);
}

export async function generateExercisesForChapter(
  chapterId: string,
  difficulty: Difficulty,
  count: number
): Promise<GeneratedExercise[]> {
  await requireAdmin();

  const chapter = await prisma.chapter.findUnique({ where: { id: chapterId } });
  if (!chapter) throw new Error("Không tìm thấy chương.");

  return generateExercises(chapter.title, chapter.grade, difficulty, count);
}

export async function saveGeneratedExercises(
  chapterId: string,
  difficulty: Difficulty,
  exercises: GeneratedExercise[]
) {
  await requireAdmin();

  await prisma.practiceQuestion.createMany({
    data: exercises.map((ex) => ({
      chapterId,
      content: ex.content,
      choices: JSON.stringify(ex.choices),
      correctIndex: ex.correctIndex,
      explanation: ex.explanation || null,
      difficulty,
      source: "AI tạo - đã duyệt",
      published: true,
    })),
  });

  revalidatePath(`/admin/practice/${chapterId}`);
  revalidatePath("/admin/practice");
}
