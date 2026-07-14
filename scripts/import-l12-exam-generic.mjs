import { PrismaClient } from "@prisma/client";
import fs from "node:fs";

const prisma = new PrismaClient();

// MR-AP: importer DÙNG CHUNG cho mọi đề Lớp 12 sưu tầm từ kho "file đề tổng hợp" — thay vì viết
// 1 file .mjs riêng (lặp lại toàn bộ phần Prisma boilerplate) cho mỗi đề như import-l12-longan-draft.mjs
// và import-l12-camau.mjs trước đó, giờ chỉ cần soạn 1 file JSON dữ liệu câu hỏi (transcribe + tự
// giải/tìm đáp án — phần THẬT SỰ cần làm thủ công mỗi đề, không thể tự động hoá vì mỗi đề nội dung
// khác nhau) rồi chạy script này. Giảm số bước lặp lại mỗi đề, không giảm phần buộc phải đọc/kiểm
// chứng nội dung riêng của từng đề.
//
// Cấu trúc file JSON đầu vào:
// {
//   "title": "Đề thi thử Sở ABC 2025",
//   "chapterId": "cmrg5whrc0000vhccm11cuu3w",   // mặc định: L12 Ôn tập tổng hợp nếu bỏ trống
//   "grade": 12,                                  // mặc định 12
//   "published": true,                            // false nếu còn câu chưa có đáp án, muốn giữ nháp
//   "singleChoice": [
//     { "content": "...", "choices": ["A...","B...","C...","D..."], "correctIndex": 0 } // correctIndex: null nếu chưa xác định
//   ],
//   "trueFalse": [
//     { "content": "...", "statements": [{ "text": "...", "correct": true }, ...4 ý...] }
//   ],
//   "shortAnswer": [
//     { "content": "...", "shortAnswer": "12.3" } // null nếu chưa xác định
//   ]
// }

const DEFAULT_CHAPTER_ID = "cmrg5whrc0000vhccm11cuu3w"; // L12, Ôn tập tổng hợp - Đề dự đoán TN THPT 2026

async function main() {
  const jsonPath = process.argv[2];
  if (!jsonPath) {
    console.error("Usage: node import-l12-exam-generic.mjs <path-to-exam.json>");
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const chapterId = data.chapterId || DEFAULT_CHAPTER_ID;
  const grade = data.grade ?? 12;
  const published = data.published ?? true;

  const existing = await prisma.quiz.findFirst({ where: { chapterId, title: data.title } });
  if (existing) {
    console.log(`Đề "${data.title}" đã tồn tại (${existing.id}), bỏ qua.`);
    return;
  }

  const quiz = await prisma.quiz.create({
    data: { title: data.title, grade, chapterId, durationSec: 50 * 60, published },
  });

  let order = 0;
  for (const q of data.singleChoice || []) {
    await prisma.question.create({
      data: {
        quizId: quiz.id,
        type: "SINGLE_CHOICE",
        content: q.content,
        choices: JSON.stringify(q.choices),
        correctIndex: q.correctIndex ?? null,
        explanation: q.explanation || null,
        difficulty: q.difficulty || "THONG_HIEU",
        order: order++,
      },
    });
  }
  for (const q of data.trueFalse || []) {
    await prisma.question.create({
      data: {
        quizId: quiz.id,
        type: "TRUE_FALSE_GROUP",
        content: q.content,
        statements: JSON.stringify(q.statements),
        explanation: q.explanation || null,
        difficulty: q.difficulty || "VAN_DUNG",
        order: order++,
      },
    });
  }
  for (const q of data.shortAnswer || []) {
    await prisma.question.create({
      data: {
        quizId: quiz.id,
        type: "SHORT_ANSWER",
        content: q.content,
        shortAnswer: q.shortAnswer ?? null,
        explanation: q.explanation || null,
        difficulty: q.difficulty || "VAN_DUNG_CAO",
        order: order++,
      },
    });
  }

  const needsAnswer =
    (data.singleChoice || []).filter((q) => q.correctIndex === null || q.correctIndex === undefined).length +
    (data.shortAnswer || []).filter((q) => !q.shortAnswer).length;

  console.log(`Đã tạo đề "${data.title}" với ${order} câu, published=${published}.`);
  if (needsAnswer > 0) {
    console.log(`  -> ${needsAnswer} câu chưa có đáp án, xem "Chưa có đáp án" tại /admin/quizzes/${quiz.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
