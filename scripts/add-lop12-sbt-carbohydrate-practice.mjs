import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AF: bài tập mining từ SBT Hóa 12 - Kết nối tri thức thật (Tài liệu/Lớp 12/Hóa 12 theo
// chuyên đề/Chương2- Carbohydrate.zip -> "(TỜ SÁCH BÀI TẬP-KNTT) Chương II - BT Hoá 12 -
// KNTT.pdf", đọc bằng pdftoppm + thị giác vì PDF lỗi text layer). Chỉ lấy câu SINGLE_CHOICE
// (NHẬN BIẾT/THÔNG HIỂU) — bỏ qua các câu Đúng/Sai nhóm và câu tự luận vì PracticeQuestion
// chỉ hỗ trợ trắc nghiệm 1 đáp án. File SBT không in đáp án ở các trang đã đọc — mọi đáp án
// dưới đây tự giải bằng kiến thức hóa học và kiểm chứng lại trước khi đưa vào.
const CHAPTER_ID = "cmrelkd130007vhusmuwsjq5q"; // Lớp 12 - Chương 2. Carbohydrate

const QUESTIONS = [
  {
    content: "Carbohydrate là hợp chất hữu cơ",
    choices: [
      "chứa đồng thời nhóm amino và nhóm carboxyl.",
      "chứa đồng thời nhóm hydroxy và nhóm carboxyl.",
      "tạp chức, thường có công thức chung là Cn(H2O)m.",
      "đa chức, chứa nhiều nhóm hydroxy liên tiếp.",
    ],
    correctIndex: 2,
    explanation: "Carbohydrate là hợp chất hữu cơ tạp chức, đa số có công thức chung dạng Cn(H2O)m.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Glucose và fructose thuộc loại carbohydrate nào sau đây?",
    choices: ["Monosaccharide.", "Disaccharide.", "Polysaccharide.", "Oligosaccharide."],
    correctIndex: 0,
    explanation: "Glucose và fructose là các đường đơn (monosaccharide), không bị thủy phân.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức phân tử chung của glucose và fructose là",
    choices: ["C6H10O5.", "C6H12O6.", "C5H10O5.", "C12H22O11."],
    correctIndex: 1,
    explanation: "Glucose và fructose là đồng phân của nhau, đều có công thức phân tử C6H12O6.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhóm chức nào sau đây KHÔNG có trong cấu tạo của glucose?",
    choices: ["Aldehyde.", "Hydroxy.", "Ketone.", "Hemiacetal."],
    correctIndex: 2,
    explanation:
      "Glucose là aldohexose (có nhóm -CHO ở dạng mạch hở), không có nhóm ketone — đó là đặc trưng của fructose.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Fructose có bao nhiêu nhóm hydroxy trong cấu tạo?",
    choices: ["3.", "4.", "5.", "6."],
    correctIndex: 2,
    explanation:
      "Fructose (C6H12O6) mạch hở có 1 nhóm carbonyl (ketone) và 5 nhóm hydroxy: CH2OH-CO-CHOH-CHOH-CHOH-CH2OH.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Glucose và fructose KHÔNG có điểm chung nào sau đây?",
    choices: [
      "Dễ tan trong nước.",
      "Có vị ngọt.",
      "Chất rắn ở điều kiện thường.",
      "Hình thành trực tiếp từ quá trình quang hợp.",
    ],
    correctIndex: 3,
    explanation:
      "Glucose là sản phẩm trực tiếp của quá trình quang hợp ở thực vật; fructose thường không phải sản phẩm trực tiếp của quang hợp.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Dung dịch glucose KHÔNG có tính chất hoá học nào sau đây?",
    choices: [
      "Phản ứng với Cu(OH)2.",
      "Phản ứng với thuốc thử Tollens.",
      "Phản ứng với nước bromine.",
      "Phản ứng thuỷ phân.",
    ],
    correctIndex: 3,
    explanation: "Glucose là monosaccharide nên không bị thuỷ phân (khác với disaccharide/polysaccharide).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây có thể điều chế từ glucose qua quá trình lên men?",
    choices: ["Ethanol.", "Lactic acid.", "Methane.", "Fructose."],
    correctIndex: 0,
    explanation: "Lên men rượu: C6H12O6 → 2C2H5OH + 2CO2.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Trong môi trường kiềm, glucose và fructose có thể chuyển hoá lẫn nhau. Điều đó chứng tỏ hai chất này",
    choices: [
      "đều phản ứng với thuốc thử Tollens.",
      "đều là những disaccharide.",
      "đều làm mất màu nước bromine.",
      "đều không có nhóm hydroxy.",
    ],
    correctIndex: 0,
    explanation:
      "Thuốc thử Tollens có môi trường kiềm (ammoniacal); trong môi trường này fructose chuyển hoá một phần thành glucose (qua trung gian enediol) nên cũng cho phản ứng tráng bạc dương tính.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Glucose quan trọng đối với cơ thể sống vì nó",
    choices: [
      "là nguồn cung cấp nước và carbon dioxide.",
      "cung cấp năng lượng cho quá trình sinh hoá tế bào.",
      "xúc tác cho các quá trình sinh hoá.",
      "làm giảm quá trình oxi hoá của gốc tự do.",
    ],
    correctIndex: 1,
    explanation: "Glucose là nguồn cung cấp năng lượng chính cho tế bào thông qua quá trình hô hấp tế bào.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Saccharose và maltose đều tham gia phản ứng nào sau đây?",
    choices: [
      "Phản ứng với thuốc thử Tollens.",
      "Phản ứng thuỷ phân trong môi trường acid.",
      "Phản ứng với dung dịch nước bromine.",
      "Phản ứng với Cu(OH)2 tạo kết tủa đỏ gạch.",
    ],
    correctIndex: 1,
    explanation:
      "Cả saccharose (→ glucose + fructose) và maltose (→ 2 glucose) đều bị thuỷ phân trong môi trường acid; chỉ maltose có tính khử (phản ứng Tollens/Cu(OH)2 đun nóng).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Saccharose thường được tìm thấy nhiều trong loại thực vật nào sau đây?",
    choices: ["Cây đậu nành.", "Cây lúa mì.", "Cây mía.", "Cây cà phê."],
    correctIndex: 2,
    explanation: "Saccharose (đường mía) có nhiều trong cây mía, củ cải đường, thốt nốt.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cellulose không tan trong nước nhưng tan trong dung dịch nào sau đây?",
    choices: ["Dung dịch NaOH.", "Dung dịch ethanol.", "Nước Schweizer.", "Nước bromine."],
    correctIndex: 2,
    explanation:
      "Nước Schweizer (dung dịch phức [Cu(NH3)4](OH)2) hoà tan được cellulose, ứng dụng trong sản xuất tơ nhân tạo (tơ visco/cuprammonium).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cellulose phản ứng với nitric acid tạo thành sản phẩm nào sau đây?",
    choices: ["Glucose.", "Dextrin.", "Maltose.", "Cellulose nitrate."],
    correctIndex: 3,
    explanation: "Phản ứng ester hoá giữa cellulose và HNO3 (xúc tác H2SO4 đặc) tạo cellulose nitrate.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây có thể thu được khi thuỷ phân KHÔNG HOÀN TOÀN tinh bột?",
    choices: ["Cellulose.", "Dextrin.", "Fructose.", "Saccharose."],
    correctIndex: 1,
    explanation: "Thuỷ phân không hoàn toàn tinh bột tạo dextrin (sản phẩm trung gian trước khi tạo maltose rồi glucose).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cellulose KHÔNG có tính chất nào sau đây?",
    choices: [
      "Tan trong nước Schweizer.",
      "Phản ứng tạo màu xanh tím với iodine.",
      "Phản ứng với nitric acid tạo cellulose nitrate.",
      "Thuỷ phân hoàn toàn tạo glucose.",
    ],
    correctIndex: 1,
    explanation:
      "Phản ứng tạo màu xanh tím với iodine là tính chất đặc trưng của TINH BỘT (do cấu trúc xoắn ốc của amylose), cellulose không có phản ứng màu này.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cellulose KHÔNG được sử dụng trong ứng dụng nào sau đây?",
    choices: [
      "Sản xuất các thiết bị điện.",
      "Nguyên liệu sản xuất ethanol và cellulose nitrate.",
      "Sản xuất giấy, tơ tự nhiên và sợi nhân tạo.",
      "Vật liệu gỗ xây dựng.",
    ],
    correctIndex: 0,
    explanation: "Cellulose không phải nguyên liệu để sản xuất thiết bị điện; đây không phải ứng dụng thực tế của cellulose.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Nguyên liệu nào sau đây KHÔNG PHẢI là nguồn cung cấp tinh bột?",
    choices: ["Củ và quả.", "Hạt ngũ cốc.", "Sợi bông.", "Gạo."],
    correctIndex: 2,
    explanation: "Sợi bông là nguồn cellulose (gần như tinh khiết), không phải nguồn tinh bột.",
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
        source: "SBT Hóa 12 - Kết nối tri thức (Chương 2 - Carbohydrate)",
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
