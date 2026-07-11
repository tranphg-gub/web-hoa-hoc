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

  const safeCount = Math.min(Math.max(Math.floor(count), 1), 10);
  return generateExercises(chapterId, difficulty, safeCount);
}

export async function saveGeneratedExercises(
  chapterId: string,
  difficulty: Difficulty,
  exercises: GeneratedExercise[]
) {
  await requireAdmin();

  // Giáo viên có thể đã sửa tay bản nháp phía client — kiểm tra lại trước khi lưu.
  const valid = exercises.filter(
    (ex) =>
      typeof ex.content === "string" &&
      ex.content.trim() !== "" &&
      Array.isArray(ex.choices) &&
      ex.choices.length === 4 &&
      ex.choices.every((c) => typeof c === "string" && c.trim() !== "") &&
      typeof ex.correctIndex === "number" &&
      ex.correctIndex >= 0 &&
      ex.correctIndex <= 3
  );
  if (valid.length === 0) {
    throw new Error("Không có câu hợp lệ để lưu (thiếu nội dung, phương án hoặc đáp án).");
  }

  await prisma.practiceQuestion.createMany({
    data: valid.map((ex) => ({
      chapterId,
      content: ex.content.trim(),
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
