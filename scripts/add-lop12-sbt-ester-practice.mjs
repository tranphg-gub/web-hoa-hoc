import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-X: bài tập mining từ SBT Hóa 12 - Kết nối tri thức thật (Tài liệu/Lớp 12/Hóa 12 theo
// chuyên đề/Chương 1 Ester-Lipid.zip -> "(TỜ SÁCH BÀI TẬP-KNTT) Chương I - BT Hoá 12 -
// KNTT-ĐỀ.pdf", đọc bằng pdftoppm + thị giác vì PDF lỗi text layer). File SBT không có đáp
// án đi kèm trong các trang đã đọc — mọi đáp án dưới đây do tự giải bằng kiến thức hóa học
// và kiểm chứng lại trước khi đưa vào, theo đúng skill chem-exercises (không đoán).
const CHAPTER_ID = "cmrelkcle0006vhus7ep6c6jk"; // Lớp 12 - Chương 1. Ester - Lipid

const QUESTIONS = [
  {
    content: "Ester đơn chức có công thức chung là",
    choices: ["RCOOR'", "RCOOH", "(RCOO)2R'", "RCOR'"],
    correctIndex: 0,
    explanation:
      "Ester đơn chức tạo bởi acid đơn chức RCOOH và alcohol đơn chức R'OH nên có công thức chung RCOOR'.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Số ester có cùng công thức phân tử C3H6O2 là",
    choices: ["2", "5", "4", "3"],
    correctIndex: 0,
    explanation:
      "Ứng với C3H6O2 chỉ có 2 ester: HCOOC2H5 (ethyl formate) và CH3COOCH3 (methyl acetate).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ester được tạo bởi methanol và acetic acid có công thức cấu tạo là",
    choices: ["HCOOCH3", "CH3COOC2H5", "HCOOC2H5", "CH3COOCH3"],
    correctIndex: 3,
    explanation: "Methanol (CH3OH) + acetic acid (CH3COOH) tạo ester CH3COOCH3 (methyl acetate).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ester thường có mùi đặc trưng là",
    choices: ["mùi hoa, quả chín", "mùi tanh của cá", "mùi tinh dầu sả, chanh", "mùi cồn"],
    correctIndex: 0,
    explanation:
      "Nhiều ester có mùi thơm giống mùi hoa quả (VD isoamyl acetate mùi chuối chín) nên được dùng làm hương liệu.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Thuỷ phân ester nào sau đây trong dung dịch NaOH dư thu được sodium formate?",
    choices: ["CH3COOCH3", "CH3COOC2H5", "HCOOC2H5", "CH3COOC3H7"],
    correctIndex: 2,
    explanation:
      "Sodium formate (HCOONa) bắt nguồn từ formic acid (HCOOH), nên ester tương ứng là HCOOC2H5: HCOOC2H5 + NaOH → HCOONa + C2H5OH.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Xà phòng hoá hoàn toàn ester CH3COOC2H5 trong dung dịch KOH dư đun nóng, thu được sản phẩm gồm",
    choices: ["CH3COOH và C2H5OH", "CH3COOK và C2H5OH", "C2H5COOK và CH3OH", "HCOOK và C3H7OH"],
    correctIndex: 1,
    explanation: "CH3COOC2H5 + KOH → CH3COOK + C2H5OH.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức cấu tạo nào sau đây là của chất béo glyceryl trioleate (triolein)?",
    choices: [
      "(C17H35COO)3C3H5",
      "(C17H33COO)3C3H5",
      "(C17H31COO)3C3H5",
      "(C16H33COO)3C3H5",
    ],
    correctIndex: 1,
    explanation:
      "Oleate bắt nguồn từ oleic acid C17H33COOH (18 carbon, 1 liên kết đôi) nên gốc acid béo là C17H33COO-.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Quần áo bị dính bẩn bởi dầu luyn (dầu nhớt). Nên sử dụng chất nào sau đây để loại bỏ vết bẩn đó?",
    choices: ["Dung dịch muối ăn", "Chất giặt rửa tổng hợp", "Dung dịch HCl", "Dung dịch NaOH"],
    correctIndex: 1,
    explanation:
      "Chất giặt rửa tổng hợp có cả phần ưa dầu và ưa nước nên hoà tan/kéo được vết dầu nhớt ra khỏi vải, an toàn hơn acid/base mạnh.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dầu mỡ khi chiên rán nhiều lần thường có mùi khó chịu do nguyên nhân chính là dầu mỡ bị",
    choices: ["thuỷ phân", "xà phòng hoá", "oxi hoá", "hydrogen hoá"],
    correctIndex: 2,
    explanation:
      "Ở nhiệt độ cao, các gốc acid béo không no trong dầu mỡ bị oxi hoá bởi oxygen không khí, sinh ra các hợp chất có mùi khó chịu.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Xà phòng hoá chất béo nào sau đây thu được sodium stearate?",
    choices: [
      "(C17H35COO)3C3H5",
      "(C17H33COO)3C3H5",
      "(C17H31COO)3C3H5",
      "(C16H33COO)3C3H5",
    ],
    correctIndex: 0,
    explanation:
      "Sodium stearate (C17H35COONa) bắt nguồn từ stearic acid (C17H35COOH, no), nên chất béo tương ứng là tristearin (C17H35COO)3C3H5.",
    difficulty: "THONG_HIEU",
  },
];

async function main() {
  let added = 0;
  let skipped = 0;
  for (const q of QUESTIONS) {
    const exists = await prisma.practiceQuestion.findFirst({
      where: { chapterId: CHAPTER_ID, content: q.content },
    });
    if (exists) {
      skipped++;
      continue;
    }
    await prisma.practiceQuestion.create({
      data: {
        chapterId: CHAPTER_ID,
        content: q.content,
        choices: JSON.stringify(q.choices),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        difficulty: q.difficulty,
        source: "SBT Hóa 12 - Kết nối tri thức (Chương 1 - Ester-Lipid)",
      },
    });
    added++;
  }
  console.log(`Hoàn tất: thêm ${added} câu, bỏ qua (đã tồn tại) ${skipped} câu.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
