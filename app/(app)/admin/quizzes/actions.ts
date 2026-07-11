"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { Difficulty, QuestionType, QuizKind } from "@prisma/client";
import {
  generateQuizQuestionDrafts,
  type DraftCounts,
  type QuizQuestionDraft,
} from "@/lib/ai/quiz-question-generator";

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

export async function generateQuizDrafts(
  quizId: string,
  counts: DraftCounts
): Promise<QuizQuestionDraft[]> {
  await requireAdmin();

  const clamp = (value: number, max: number) =>
    Math.min(Math.max(Math.floor(value || 0), 0), max);
  const safeCounts: DraftCounts = {
    singleChoice: clamp(counts.singleChoice, 20),
    trueFalse: clamp(counts.trueFalse, 8),
    shortAnswer: clamp(counts.shortAnswer, 10),
  };
  if (safeCounts.singleChoice + safeCounts.trueFalse + safeCounts.shortAnswer === 0) {
    throw new Error("Chọn ít nhất 1 câu để tạo.");
  }

  return generateQuizQuestionDrafts(quizId, safeCounts);
}

const VALID_DIFFICULTIES = new Set(["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"]);

export async function saveQuizDrafts(quizId: string, drafts: QuizQuestionDraft[]) {
  await requireAdmin();

  const existingCount = await prisma.question.count({ where: { quizId } });

  type Row = {
    quizId: string;
    type: QuestionType;
    content: string;
    choices: string | null;
    correctIndex: number | null;
    statements: string | null;
    shortAnswer: string | null;
    explanation: string | null;
    difficulty: Difficulty;
  };

  const rows: Row[] = [];
  for (const draft of drafts) {
    if (typeof draft.content !== "string" || draft.content.trim() === "") continue;
    const difficulty = (
      VALID_DIFFICULTIES.has(draft.difficulty) ? draft.difficulty : "THONG_HIEU"
    ) as Difficulty;
    const base = {
      quizId,
      content: draft.content.trim(),
      explanation: draft.explanation?.trim() || null,
      difficulty,
      choices: null,
      correctIndex: null,
      statements: null,
      shortAnswer: null,
    };

    if (draft.type === "SINGLE_CHOICE") {
      if (
        !Array.isArray(draft.choices) ||
        draft.choices.length !== 4 ||
        draft.choices.some((c) => typeof c !== "string" || c.trim() === "") ||
        typeof draft.correctIndex !== "number" ||
        draft.correctIndex < 0 ||
        draft.correctIndex > 3
      )
        continue;
      rows.push({
        ...base,
        type: "SINGLE_CHOICE",
        choices: JSON.stringify(draft.choices),
        correctIndex: draft.correctIndex,
      });
    } else if (draft.type === "TRUE_FALSE_GROUP") {
      if (
        !Array.isArray(draft.statements) ||
        draft.statements.length !== 4 ||
        draft.statements.some(
          (s) => typeof s.text !== "string" || s.text.trim() === "" || typeof s.correct !== "boolean"
        )
      )
        continue;
      rows.push({
        ...base,
        type: "TRUE_FALSE_GROUP",
        statements: JSON.stringify(
          draft.statements.map((s) => ({ text: s.text.trim(), correct: s.correct }))
        ),
      });
    } else if (draft.type === "SHORT_ANSWER") {
      if (typeof draft.shortAnswer !== "string" || draft.shortAnswer.trim() === "") continue;
      rows.push({ ...base, type: "SHORT_ANSWER", shortAnswer: draft.shortAnswer.trim() });
    }
  }

  if (rows.length === 0) {
    throw new Error("Không có câu hợp lệ để lưu (thiếu nội dung, phương án hoặc đáp án).");
  }

  await prisma.question.createMany({
    data: rows.map((row, i) => ({ ...row, order: existingCount + i })),
  });

  revalidatePath(`/admin/quizzes/${quizId}`);
  return rows.length;
}
