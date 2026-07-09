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

export async function createQuiz(formData: FormData) {
  await requireAdmin();

  await prisma.quiz.create({
    data: {
      title: String(formData.get("title") ?? "").trim(),
      grade: Number(formData.get("grade")),
      durationSec: Number(formData.get("durationMin")) * 60,
    },
  });

  revalidatePath("/admin/quizzes");
}

export async function deleteQuiz(quizId: string) {
  await requireAdmin();
  await prisma.quiz.delete({ where: { id: quizId } });
  revalidatePath("/admin/quizzes");
}

export async function addQuestion(quizId: string, formData: FormData) {
  await requireAdmin();

  const choices = [
    String(formData.get("choiceA") ?? ""),
    String(formData.get("choiceB") ?? ""),
    String(formData.get("choiceC") ?? ""),
    String(formData.get("choiceD") ?? ""),
  ].filter((c) => c.trim() !== "");

  const existingCount = await prisma.question.count({ where: { quizId } });

  await prisma.question.create({
    data: {
      quizId,
      content: String(formData.get("content") ?? ""),
      choices: JSON.stringify(choices),
      correctIndex: Number(formData.get("correctIndex")),
      explanation: String(formData.get("explanation") ?? "") || null,
      order: existingCount,
    },
  });

  revalidatePath(`/admin/quizzes/${quizId}`);
}

export async function deleteQuestion(quizId: string, questionId: string) {
  await requireAdmin();
  await prisma.question.delete({ where: { id: questionId } });
  revalidatePath(`/admin/quizzes/${quizId}`);
}
