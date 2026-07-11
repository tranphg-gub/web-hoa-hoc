// Backup database PostgreSQL (Supabase) ra file JSON — thay bản cũ chỉ copy prisma/dev.db (SQLite).
// Không cần pg_dump; dump qua Prisma nên chạy được ở mọi máy đã `npm install`.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const backupDir = join(rootDir, "prisma", "backups");

async function main() {
  const [
    users,
    chapters,
    documents,
    readDocuments,
    quizzes,
    questions,
    quizAttempts,
    flashcardSets,
    flashcards,
    practiceQuestions,
    chatMessages,
  ] = await Promise.all([
    prisma.user.findMany(),
    prisma.chapter.findMany(),
    prisma.document.findMany(),
    prisma.readDocument.findMany(),
    prisma.quiz.findMany(),
    prisma.question.findMany(),
    prisma.quizAttempt.findMany(),
    prisma.flashcardSet.findMany(),
    prisma.flashcard.findMany(),
    prisma.practiceQuestion.findMany(),
    prisma.chatMessage.findMany(),
  ]);

  const payload = {
    exportedAt: new Date().toISOString(),
    users,
    chapters,
    documents,
    readDocuments,
    quizzes,
    questions,
    quizAttempts,
    flashcardSets,
    flashcards,
    practiceQuestions,
    chatMessages,
  };

  mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 16);
  const dest = join(backupDir, `backup-${stamp}.json`);
  writeFileSync(dest, JSON.stringify(payload, null, 1), "utf8");

  console.log(`Đã backup ${questions.length} câu hỏi, ${documents.length} tài liệu, ${users.length} tài khoản...`);
  console.log(`File: prisma/backups/backup-${stamp}.json`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
