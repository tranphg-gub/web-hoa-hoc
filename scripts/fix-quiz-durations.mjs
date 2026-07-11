import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-W: durationSec trước đây không được tính lại sau khi câu hỏi được thêm/import
// hàng loạt (nhiều đề "Kiểm tra: <Chương>" bị mining script nối thêm câu liên tục
// nhưng vẫn giữ nguyên 15 phút gốc; 38 đề "dự đoán TN THPT 2026" import cùng
// hardcode 3000s/50 phút bất kể trích xuất được bao nhiêu câu). Người dùng phát
// hiện ra sự vô lý này ("kiểm tra j mà 50 phút được 12 câu"). Tính lại theo
// thời lượng thực tế mỗi dạng câu cần (phút). Script idempotent — chạy lại an
// toàn mỗi khi có đề bị thêm/bớt câu hỏi.
const MINUTES_PER_TYPE = {
  SINGLE_CHOICE: 1.5,
  TRUE_FALSE_GROUP: 3, // 4 ý đúng/sai mỗi câu, cần đọc + suy luận nhiều hơn 1 câu TN thường
  SHORT_ANSWER: 2,
};
const MIN_MINUTES = 10;
const ROUND_TO = 5;

async function main() {
  const quizzes = await prisma.quiz.findMany({
    include: { questions: { select: { type: true } } },
  });

  let changed = 0;
  for (const quiz of quizzes) {
    const totalMinutesRaw = quiz.questions.reduce(
      (sum, q) => sum + (MINUTES_PER_TYPE[q.type] ?? 1.5),
      0
    );
    const roundedMinutes = Math.max(
      MIN_MINUTES,
      Math.ceil(totalMinutesRaw / ROUND_TO) * ROUND_TO
    );
    const newDurationSec = roundedMinutes * 60;

    if (newDurationSec !== quiz.durationSec) {
      await prisma.quiz.update({
        where: { id: quiz.id },
        data: { durationSec: newDurationSec },
      });
      console.log(
        `[L${quiz.grade}] "${quiz.title}": ${quiz.durationSec / 60} phút -> ${roundedMinutes} phút (${quiz.questions.length} câu)`
      );
      changed++;
    }
  }

  console.log(`\nHoàn tất: cập nhật ${changed}/${quizzes.length} đề.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
