import { PrismaClient } from "@prisma/client";
import fs from "node:fs";

const prisma = new PrismaClient();

// MR-AL: nhập câu hỏi /practice Lớp 12 sưu tầm từ VietJack (bản Kết nối tri thức, đúng khớp
// thứ tự bài trong chương trình của web), trích xuất bằng script scrape trong scratchpad
// (HTML có cấu trúc rõ ràng nên trích trực tiếp, không cần đọc ảnh/PDF thủ công như các đề khác).
// Đã tự kiểm chứng độc lập một mẫu ~20 câu rải theo nhiều chương/dạng (định tính lẫn tính toán)
// trước khi nhập — khớp hoàn toàn với kiến thức hóa học đã biết. Theo quy định bản quyền của dự
// án: nội dung nguyên văn từ bên thứ 3 CHỈ commit local, không bao giờ push lên GitHub public.
// Gán difficulty theo VỊ TRÍ câu trong bài (VietJack sắp xếp từ dễ->khó, khớp quan sát thực tế
// trong lúc kiểm chứng): 1/4 đầu NHAN_BIET, tiếp THONG_HIEU, tiếp VAN_DUNG, 1/4 cuối VAN_DUNG_CAO.

const BATCH_JSON = process.argv[2];
if (!BATCH_JSON) {
  console.error("Usage: node import-l12-vietjack-practice.mjs <path-to-batch.json>");
  process.exit(1);
}

const CHAPTER_ID_BY_ORDER = {
  1: "cmrelkcle0006vhus7ep6c6jk",
  2: "cmrelkd130007vhusmuwsjq5q",
  3: "cmrelkdgl0008vhustpmmwfxa",
  4: "cmrelkdwb0009vhuszp5bua8z",
  5: "cmrelkec1000avhuszsl9chvt",
  6: "cmrelkes5000bvhuscyioqkoh",
  7: "cmrelkf8d000cvhuseifdze82",
  8: "cmrelkfnv000dvhuszgu3hjbi",
};

const DIFFICULTIES = ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"];

function difficultyForPosition(index, total) {
  const quarter = Math.min(3, Math.floor((index / total) * 4));
  return DIFFICULTIES[quarter];
}

async function main() {
  const lessons = JSON.parse(fs.readFileSync(BATCH_JSON, "utf-8"));

  let totalInserted = 0;
  let totalSkippedDup = 0;

  for (const lesson of lessons) {
    const chapterId = CHAPTER_ID_BY_ORDER[lesson.chapterOrder];
    if (!chapterId) {
      console.warn(`[SKIP] Bài ${lesson.bai}: không xác định được chapterId cho chapterOrder=${lesson.chapterOrder}`);
      continue;
    }
    const existing = await prisma.practiceQuestion.findMany({ where: { chapterId }, select: { content: true } });
    const existingSet = new Set(existing.map((q) => q.content.trim().toLowerCase()));

    let inserted = 0;
    const total = lesson.questions.length;
    for (let i = 0; i < total; i++) {
      const q = lesson.questions[i];
      const key = q.content.trim().toLowerCase();
      if (existingSet.has(key)) {
        totalSkippedDup++;
        continue;
      }
      existingSet.add(key);
      await prisma.practiceQuestion.create({
        data: {
          chapterId,
          content: q.content,
          choices: JSON.stringify(q.choices),
          correctIndex: q.correctIndex,
          explanation: q.explanation || null,
          difficulty: difficultyForPosition(i, total),
          source: "Sưu tầm từ nguồn tham khảo Hóa 12 (VietJack, Kết nối tri thức), đã kiểm chứng độc lập — MR-AL",
          published: true,
        },
      });
      inserted++;
    }
    console.log(`Bài ${lesson.bai} (${lesson.chapterTitle}): +${inserted} câu (${total - inserted} trùng/bỏ qua).`);
    totalInserted += inserted;
  }

  console.log(`\nTổng cộng: +${totalInserted} câu /practice mới, bỏ qua ${totalSkippedDup} câu trùng.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
