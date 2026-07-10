import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const byOrder = {
  1: "NHAN_BIET",
  2: "NHAN_BIET",
  3: "THONG_HIEU",
  4: "VAN_DUNG",
};

async function main() {
  const questions = await prisma.question.findMany({ select: { id: true, order: true } });

  for (const q of questions) {
    const difficulty = byOrder[q.order] ?? "VAN_DUNG_CAO";
    await prisma.question.update({ where: { id: q.id }, data: { difficulty } });
  }

  console.log(`Đã gán mức độ cho ${questions.length} câu hỏi theo thứ tự câu (1-2: Nhận biết, 3: Thông hiểu, 4+: Vận dụng/Vận dụng cao).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
