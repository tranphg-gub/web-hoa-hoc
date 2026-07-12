import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AF: bài tập mining từ SBT Hóa 12 - Kết nối tri thức thật (Tài liệu/Lớp 12/Hóa 12 theo
// chuyên đề/Amine.zip -> "(TỜ SÁCH BT-KNTT) Hoa 12-CHƯƠNG 3 - KNTT - SBT-ĐỀ.pdf", đọc bằng
// pdftoppm + thị giác). Chỉ lấy câu SINGLE_CHOICE — bỏ qua Đúng/Sai nhóm, câu hỏi định tính
// dạng liệt kê (VD "có bao nhiêu protein tan trong nước") và tự luận. Đáp án tự giải bằng
// kiến thức hóa học và kiểm chứng lại trước khi đưa vào.
const CHAPTER_ID = "cmrelkdgl0008vhustpmmwfxa"; // Lớp 12 - Chương 3. Hợp chất chứa nitrogen

const QUESTIONS = [
  {
    content: "Amine là dẫn xuất của",
    choices: ["methane.", "ammonia.", "ethanol.", "acetic acid."],
    correctIndex: 1,
    explanation: "Amine được tạo ra khi thay thế 1 hay nhiều H trong phân tử ammonia (NH3) bằng gốc hydrocarbon.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Amine nào sau đây là amine bậc hai?",
    choices: ["CH3CH2CH2NH2.", "CH3CH(NH2)CH3.", "CH3NHCH2CH3.", "(CH3)3N."],
    correctIndex: 2,
    explanation: "CH3-NH-CH2CH3 có nguyên tử N liên kết với 2 gốc hydrocarbon (methyl và ethyl) → amine bậc hai.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Amine nào sau đây ở trạng thái lỏng ở nhiệt độ phòng?",
    choices: ["Methylamine.", "Ethylamine.", "Dimethylamine.", "Aniline."],
    correctIndex: 3,
    explanation: "Aniline có nhiệt độ sôi 184°C nên là chất lỏng ở nhiệt độ phòng; methylamine, ethylamine, dimethylamine đều là chất khí.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong phân tử amine, nguyên tử nitrogen có số cặp electron chưa liên kết là",
    choices: ["một cặp.", "hai cặp.", "ba cặp.", "không cặp."],
    correctIndex: 0,
    explanation: "Nitrogen có 5 electron hoá trị, tạo 3 liên kết với gốc hydrocarbon/hydrogen, còn lại 1 cặp electron chưa liên kết.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dung dịch amine nào dưới đây KHÔNG làm quỳ tím đổi sang màu xanh?",
    choices: ["Aniline.", "Ethylamine.", "Methylamine.", "Dimethylamine."],
    correctIndex: 0,
    explanation: "Aniline có tính base rất yếu (do ảnh hưởng của vòng benzene hút electron của cặp electron tự do trên N) nên không đủ mạnh để làm đổi màu quỳ tím.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thêm ethylamine đến dư vào dung dịch CuSO4 thì thu được",
    choices: ["kết tủa màu xanh nhạt.", "dung dịch màu xanh lam.", "kết tủa màu xanh lam.", "dung dịch màu xanh nhạt."],
    correctIndex: 1,
    explanation: "Ban đầu tạo kết tủa Cu(OH)2 xanh nhạt, nhưng amine dư hoà tan kết tủa tạo phức chất tan màu xanh lam đậm, tương tự phức với ammonia.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Thêm methylamine đến dư vào dung dịch FeCl3 thì thu được",
    choices: ["kết tủa màu nâu đỏ.", "dung dịch màu vàng nâu.", "kết tủa màu vàng nâu.", "dung dịch màu nâu đỏ."],
    correctIndex: 0,
    explanation: "Methylamine (base yếu, tương tự NH3) phản ứng với Fe^3+ tạo kết tủa Fe(OH)3 màu nâu đỏ; khác với Cu(OH)2, kết tủa Fe(OH)3 không tan trong amine dư.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Aniline tác dụng với nitrous acid ở nhiệt độ thấp (0-5°C) tạo thành",
    choices: ["alcohol và khí nitrogen.", "phenol và khí nitrogen.", "muối phenyldiazonium.", "muối và nước."],
    correctIndex: 2,
    explanation: "Phản ứng diazo hoá đặc trưng của amine bậc 1 thơm ở nhiệt độ thấp tạo muối diazonium: C6H5NH2 + HNO2 + HCl → C6H5N2+Cl- + 2H2O.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Amine KHÔNG được ứng dụng trong lĩnh vực nào dưới đây?",
    choices: ["Dược phẩm.", "Phẩm nhuộm.", "Công nghiệp polymer.", "Công nghiệp silicate."],
    correctIndex: 3,
    explanation: "Công nghiệp silicate (thuỷ tinh, gốm sứ, xi măng) không liên quan tới amine; amine được dùng trong dược phẩm, phẩm nhuộm, tổng hợp polymer (nylon, polyurethane).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Hợp chất nào sau đây là amino acid?",
    choices: ["H2NCH2COOCH3.", "CH3NHCH2CH3.", "H2NCH2COOH.", "HOCH2COOH."],
    correctIndex: 2,
    explanation: "H2NCH2COOH (glycine) có đồng thời nhóm amino (-NH2) và nhóm carboxyl (-COOH) tự do nên là amino acid; các chất còn lại thiếu 1 trong 2 nhóm chức đặc trưng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Amino acid thiết yếu là các amino acid",
    choices: [
      "có thể được tổng hợp bởi cơ thể con người.",
      "phải được lấy thông qua chế độ ăn uống.",
      "không cần thiết cho sức khoẻ con người.",
      "chỉ được tìm thấy trong thực phẩm có nguồn gốc thực vật.",
    ],
    correctIndex: 1,
    explanation: "Amino acid thiết yếu là các amino acid cơ thể không tự tổng hợp được, cần bổ sung qua thực phẩm.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "H2N-CH2-COOH tồn tại chính ở dạng",
    choices: ["phân tử trung hoà.", "ion lưỡng cực.", "cation.", "anion."],
    correctIndex: 1,
    explanation: "Amino acid tồn tại chủ yếu ở dạng ion lưỡng cực (zwitterion): +H3N-CH2-COO-.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Tính chất nào sau đây là tính chất vật lí đặc trưng của amino acid?",
    choices: ["Nhiệt độ nóng chảy cao.", "Không hoà tan trong nước.", "Là chất khí ở nhiệt độ phòng.", "Có độc tính rất cao."],
    correctIndex: 0,
    explanation: "Do tồn tại chủ yếu ở dạng ion lưỡng cực, lực hút giữa các phân tử amino acid mạnh (giống muối) nên có nhiệt độ nóng chảy cao.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Tính chất nào sau đây là tính chất hoá học đặc trưng của amino acid?",
    choices: ["Tính oxi hoá mạnh.", "Tính khử mạnh.", "Tính lưỡng tính.", "Tính acid mạnh."],
    correctIndex: 2,
    explanation: "Amino acid có đồng thời nhóm -NH2 (tính base) và -COOH (tính acid) nên có tính lưỡng tính.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Quá trình di chuyển của các amino acid trong điện trường được gọi là",
    choices: ["sự điện di.", "sự điện li.", "sự điện phân.", "sự điện giải."],
    correctIndex: 0,
    explanation: "Sự điện di (electrophoresis) là quá trình các phân tử tích điện (như amino acid dạng ion) di chuyển trong điện trường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Loại liên kết được hình thành giữa các amino acid trong peptide được gọi là",
    choices: ["liên kết ion.", "liên kết hydrogen.", "liên kết peptide.", "liên kết cộng hoá trị."],
    correctIndex: 2,
    explanation: "Liên kết -CO-NH- hình thành giữa nhóm -COOH của amino acid này với nhóm -NH2 của amino acid kia được gọi riêng là liên kết peptide.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhóm chức nào sau đây là đặc trưng cho amine?",
    choices: ["-OH.", "-COOH.", "-NH2.", "-CHO."],
    correctIndex: 2,
    explanation: "Nhóm amino (-NH2, hoặc dạng thế -NHR, -NR2) là nhóm chức đặc trưng của amine.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây là aryl amine?",
    choices: ["C6H5-NH2.", "C2H5-NH2.", "C6H5-CH2-CH2-CH3.", "(CH3)3N."],
    correctIndex: 0,
    explanation: "Aryl amine là amine mà nhóm -NH2 gắn trực tiếp vào vòng thơm (aromatic ring) — C6H5-NH2 (aniline) là ví dụ điển hình.",
    difficulty: "NHAN_BIET",
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
        source: "SBT Hóa 12 - Kết nối tri thức (Chương 3 - Hợp chất chứa nitrogen)",
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
