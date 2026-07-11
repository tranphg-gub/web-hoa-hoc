import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const prisma = new PrismaClient();
const __dirname = dirname(fileURLToPath(import.meta.url));

async function getOrCreateChapter(grade, title, order) {
  const existing = await prisma.chapter.findFirst({ where: { grade, title } });
  if (existing) return existing;
  return prisma.chapter.create({ data: { grade, title, order } });
}

function buildQuestionData(q, i) {
  const base = {
    order: i + 1,
    type: q.type,
    content: q.content,
    difficulty: q.difficulty ?? "NHAN_BIET",
    choices: null,
    correctIndex: null,
    statements: null,
    shortAnswer: null,
    explanation: q.explanation ?? null,
  };
  if (q.type === "SINGLE_CHOICE") {
    base.choices = JSON.stringify(q.choices);
    base.correctIndex = q.correctIndex;
  } else if (q.type === "TRUE_FALSE_GROUP") {
    base.statements = JSON.stringify(
      q.statements.map((s) => ({ text: s.text, correct: s.correct }))
    );
  } else if (q.type === "SHORT_ANSWER") {
    base.shortAnswer = q.shortAnswer;
  }
  return base;
}

async function main() {
  const chapter = await getOrCreateChapter(
    12,
    "Ôn tập tổng hợp - Đề dự đoán TN THPT 2026",
    9
  );

  const files = ["data/lop12-mapstudy-de01.json", "data/lop12-de-du-doan.json"];
  let addedQuizzes = 0;
  let addedQuestions = 0;
  let skipped = 0;

  for (const file of files) {
    const quizzes = JSON.parse(readFileSync(join(__dirname, file), "utf-8"));
    for (const quiz of quizzes) {
      const existing = await prisma.quiz.findFirst({ where: { title: quiz.title } });
      if (existing) {
        skipped++;
        continue;
      }
      await prisma.quiz.create({
        data: {
          title: quiz.title,
          grade: 12,
          chapterId: chapter.id,
          durationSec: quiz.durationSec ?? 3000,
          questions: { create: quiz.questions.map(buildQuestionData) },
        },
      });
      addedQuizzes++;
      addedQuestions += quiz.questions.length;
      console.log(`Đã thêm: ${quiz.title} (${quiz.questions.length} câu)`);
    }
  }

  console.log(
    `\nHoàn tất. Thêm ${addedQuizzes} đề / ${addedQuestions} câu. Bỏ qua (đã tồn tại): ${skipped}.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
