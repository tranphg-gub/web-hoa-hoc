"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { Difficulty, QuestionType, QuizKind } from "@prisma/client";

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
      chapterId: String(formData.get("chapterId") ?? ""),
      durationSec: Number(formData.get("durationMin")) * 60,
      kind: (formData.get("kind") as QuizKind) || "REGULAR",
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

  const type = (formData.get("type") as QuestionType) || "SINGLE_CHOICE";
  const existingCount = await prisma.question.count({ where: { quizId } });

  const base = {
    quizId,
    type,
    content: String(formData.get("content") ?? ""),
    explanation: String(formData.get("explanation") ?? "") || null,
    order: existingCount,
    difficulty: formData.get("difficulty") as Difficulty,
  };

  if (type === "TRUE_FALSE_GROUP") {
    const statements = ["a", "b", "c", "d"].map((letter) => ({
      text: String(formData.get(`statement${letter}`) ?? ""),
      correct: formData.get(`correct${letter}`) === "true",
    }));
    await prisma.question.create({
      data: { ...base, statements: JSON.stringify(statements) },
    });
  } else if (type === "SHORT_ANSWER") {
    await prisma.question.create({
      data: { ...base, shortAnswer: String(formData.get("shortAnswer") ?? "").trim() },
    });
  } else {
    const choices = [
      String(formData.get("choiceA") ?? ""),
      String(formData.get("choiceB") ?? ""),
      String(formData.get("choiceC") ?? ""),
      String(formData.get("choiceD") ?? ""),
    ].filter((c) => c.trim() !== "");
    await prisma.question.create({
      data: {
        ...base,
        choices: JSON.stringify(choices),
        correctIndex: Number(formData.get("correctIndex")),
      },
    });
  }

  revalidatePath(`/admin/quizzes/${quizId}`);
}

export async function deleteQuestion(quizId: string, questionId: string) {
  await requireAdmin();
  await prisma.question.delete({ where: { id: questionId } });
  revalidatePath(`/admin/quizzes/${quizId}`);
}
