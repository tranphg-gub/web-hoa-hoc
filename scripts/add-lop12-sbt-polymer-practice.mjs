import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AF: bài tập mining từ SBT Hóa 12 - Kết nối tri thức thật (Tài liệu/Lớp 12/Hóa 12 theo
// chuyên đề/Polymer.zip -> "(TỜ SÁCH BT-KNTTT) Hóa 12-Chương 4-SÁCH BT KNTT-ĐỀ.pdf", đọc bằng
// pdftoppm + thị giác vì PDF lỗi text layer). Chỉ lấy câu SINGLE_CHOICE (NHẬN BIẾT/THÔNG HIỂU/
// VẬN DỤNG) — bỏ qua các câu Đúng/Sai nhóm và câu tự luận/tính toán vì PracticeQuestion chỉ
// hỗ trợ trắc nghiệm 1 đáp án. File SBT không in đáp án ở các trang đã đọc — mọi đáp án dưới
// đây tự giải bằng kiến thức hóa học và kiểm chứng lại trước khi đưa vào.
const CHAPTER_ID = "cmrelkdwb0009vhuszp5bua8z"; // Lớp 12 - Chương 4. Polymer

const QUESTIONS = [
  // Bài 12. Đại cương về polymer
  {
    content: "Chất nào dưới đây thuộc loại polymer?",
    choices: ["Glucose.", "Fructose.", "Saccharose.", "Cellulose."],
    correctIndex: 3,
    explanation:
      "Cellulose là polymer thiên nhiên (polysaccharide) với nhiều mắt xích glucose liên kết; glucose, fructose là monosaccharide, saccharose là disaccharide — đều không phải polymer.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Tính chất vật lí chung của polymer là",
    choices: [
      "chất lỏng, không màu, không tan trong nước.",
      "chất lỏng, không màu, tan tốt trong nước.",
      "chất rắn, không bay hơi, dễ tan trong nước.",
      "chất rắn, không bay hơi, không tan trong nước.",
    ],
    correctIndex: 3,
    explanation:
      "Hầu hết polymer là chất rắn, không bay hơi (không có nhiệt độ nóng chảy xác định) và không tan trong các dung môi thông thường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Polyethylene là sản phẩm của phản ứng trùng hợp của chất nào dưới đây?",
    choices: ["CH2=CH–Cl.", "CH2=CH2.", "CH2=CH–C6H5.", "CH2=CH–CH3."],
    correctIndex: 1,
    explanation: "Polyethylene (PE) được tổng hợp bằng phản ứng trùng hợp ethylene CH2=CH2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất có thể trùng hợp tạo ra polymer là",
    choices: ["C2H5OH.", "CH3COOH.", "CH3CH3.", "CH2=CHCH3."],
    correctIndex: 3,
    explanation:
      "Phản ứng trùng hợp cần monomer có liên kết bội (C=C) hoặc vòng kém bền; chỉ CH2=CHCH3 (propylene) có liên kết đôi C=C, các chất còn lại đều là hợp chất no.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Polymer nào dưới đây có chứa nguyên tố chlorine?",
    choices: ["PE.", "PP.", "PVC.", "PS."],
    correctIndex: 2,
    explanation:
      "PVC (poly(vinyl chloride)) được tổng hợp từ vinyl chloride CH2=CHCl nên có chứa nguyên tố chlorine trong mắt xích.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Polymer nào sau đây thuộc loại polymer tổng hợp?",
    choices: ["Tinh bột.", "Tơ tằm.", "Polyethylene.", "Cao su thiên nhiên."],
    correctIndex: 2,
    explanation:
      "Tinh bột, tơ tằm, cao su thiên nhiên đều là polymer có sẵn trong tự nhiên; polyethylene do con người tổng hợp bằng phản ứng trùng hợp nên là polymer tổng hợp.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Quá trình lưu hoá cao su thuộc loại phản ứng",
    choices: ["cắt mạch polymer.", "tăng mạch polymer.", "giữ nguyên mạch polymer.", "phân huỷ polymer."],
    correctIndex: 1,
    explanation:
      "Lưu hoá tạo các cầu nối –S–S– giữa các mạch polyisoprene, hình thành mạng lưới không gian → thuộc loại phản ứng tăng mạch (khâu mạch) polymer.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào dưới đây KHÔNG phải là polymer?",
    choices: ["Lipid.", "Tinh bột.", "Cellulose.", "Protein."],
    correctIndex: 0,
    explanation:
      "Lipid (chất béo) là ester của glycerol với acid béo, không có cấu trúc mắt xích lặp lại nên không phải polymer; tinh bột, cellulose, protein đều là polymer sinh học.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Poly(methyl methacrylate) (PMMA) cho ánh sáng truyền qua trên 90% nên được sử dụng làm thuỷ tinh hữu cơ. Thực hiện phản ứng trùng hợp monomer nào sau đây thu được PMMA?",
    choices: ["CH2=C(CH3)COOCH3.", "CH2=CHCOOCH3.", "CH2=CHC6H5.", "CH2=CHCl."],
    correctIndex: 0,
    explanation: "PMMA được tổng hợp từ methyl methacrylate CH2=C(CH3)COOCH3.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Polymer nào sau đây trong thành phần hoá học chỉ có hai nguyên tố carbon và hydrogen?",
    choices: ["Poly(methyl methacrylate).", "Poly(vinyl chloride).", "Poly(phenol formaldehyde).", "Polystyrene."],
    correctIndex: 3,
    explanation:
      "Polystyrene (–CH2–CH(C6H5)–)n chỉ chứa C và H; PMMA và poly(phenol formaldehyde) có thêm oxygen, PVC có thêm chlorine.",
    difficulty: "THONG_HIEU",
  },
  // Bài 13. Vật liệu polymer
  {
    content:
      "Polypropylene là chất dẻo được sử dụng phổ biến thứ hai sau polyethylene. Trùng hợp chất nào sau đây thu được polypropylene?",
    choices: ["CH2=CH–Cl.", "CH2=CH2.", "CH2=CH–C6H5.", "CH2=CH–CH3."],
    correctIndex: 3,
    explanation: "Polypropylene (PP) được tổng hợp từ propylene CH2=CH–CH3.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trùng hợp monomer CH2=CH–Cl thu được chất dẻo nào sau đây?",
    choices: ["PE.", "PP.", "PVC.", "PS."],
    correctIndex: 2,
    explanation: "CH2=CH–Cl là vinyl chloride, trùng hợp tạo poly(vinyl chloride) (PVC).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Tơ sợi nào sau đây thuộc loại tơ tự nhiên?",
    choices: ["Sợi bông.", "Nitron.", "Nylon-6,6.", "Cellulose acetate."],
    correctIndex: 0,
    explanation:
      "Sợi bông có sẵn trong tự nhiên (thành phần chính là cellulose) nên là tơ tự nhiên; nitron và nylon-6,6 là tơ tổng hợp, cellulose acetate là tơ bán tổng hợp.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cao su lưu hoá thu được khi cho cao su tác dụng với chất nào sau đây?",
    choices: ["Lưu huỳnh.", "Na2SO3.", "Na2SO4.", "Styrene."],
    correctIndex: 0,
    explanation:
      "Cao su lưu hoá được tạo ra khi đun nóng cao su thiên nhiên với lưu huỳnh (sulfur), tạo cầu nối –S–S– giữa các mạch polyisoprene.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trùng hợp chất nào sau đây thu được polyacrylonitrile dùng để sản xuất tơ nitron?",
    choices: ["CH2=CH–Cl.", "CH2=CH–CN.", "CH2=CH2.", "CH2=CH–CH3."],
    correctIndex: 1,
    explanation: "Polyacrylonitrile được tổng hợp bằng phản ứng trùng hợp acrylonitrile CH2=CH–CN.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trùng hợp chất nào sau đây thu được cao su buna?",
    choices: ["CH2=CH–CH=CH2.", "CH2=CCl–CH=CH2.", "CH2=C(CH3)–CH=CH2.", "CH2=C(CH3)–CCl=CH2."],
    correctIndex: 0,
    explanation: "Cao su buna được tổng hợp bằng phản ứng trùng hợp buta-1,3-diene CH2=CH–CH=CH2.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Cho các chất sau: CH2=CHCl; CH2=CHCH3; CH2=CH–CH=CH2; H2N[CH2]5COOH. Số chất có khả năng tham gia phản ứng trùng hợp là",
    choices: ["3.", "1.", "4.", "2."],
    correctIndex: 0,
    explanation:
      "CH2=CHCl, CH2=CHCH3 và CH2=CH–CH=CH2 đều có liên kết đôi C=C nên tham gia được phản ứng trùng hợp; H2N[CH2]5COOH là amino acid (có nhóm –NH2 và –COOH) chỉ tham gia phản ứng trùng ngưng. Vậy có 3 chất.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Trên hộp xốp cách nhiệt, hộp đựng thức ăn mang về, cốc, chén đĩa dùng một lần,... thường được in kí hiệu số 6 (PS). Polymer dùng làm các đồ dùng đó được tổng hợp từ monomer nào sau đây?",
    choices: ["CH2=CH2.", "CH2=CHCH3.", "CH2=CHC6H5.", "CH2=CHCl."],
    correctIndex: 2,
    explanation: "Kí hiệu số 6 (PS) là polystyrene, được tổng hợp từ styrene CH2=CH–C6H5.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phân tử polymer nào sau đây chỉ chứa hai loại nguyên tố?",
    choices: ["Poly(methyl methacrylate).", "Poly(vinyl chloride).", "Polyacrylonitrile.", "Polypropylene."],
    correctIndex: 3,
    explanation:
      "Polypropylene (–CH2–CH(CH3)–)n chỉ chứa carbon và hydrogen; các polymer còn lại có thêm oxygen, chlorine hoặc nitrogen.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Polymer nào sau đây KHÔNG thuộc loại chất dẻo?",
    choices: ["Poly(methyl methacrylate).", "Poly(vinyl chloride).", "Polystyrene.", "Polybuta-1,3-diene."],
    correctIndex: 3,
    explanation:
      "Polybuta-1,3-diene (cao su buna) thuộc loại cao su, không phải chất dẻo; PMMA, PVC, PS đều là chất dẻo phổ biến.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cao su buna-S (còn gọi là cao su SBR) là loại cao su tổng hợp được sử dụng rất phổ biến, ước tính 50% lốp xe được làm từ SBR. Thực hiện phản ứng trùng hợp các chất nào dưới đây thu được sản phẩm là cao su buna-S?",
    choices: [
      "CH2=CHCH=CH2 và C6H5CH=CH2.",
      "CH2=CHCH=CH2 và sulfur.",
      "CH2=CHCH=CH2 và CH2=CHCl.",
      "CH2=CHCH=CH2 và CH2=CHCN.",
    ],
    correctIndex: 0,
    explanation: "Cao su buna-S (SBR) là copolymer của buta-1,3-diene và styrene (C6H5CH=CH2).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cao su butyl có khả năng chống thấm khí tốt, chống chịu hoá chất nên được sử dụng làm lớp lót trong săm lốp, găng tay cao su,... Cao su butyl thường được sản xuất bằng cách trùng hợp 98% monomer X với 2% monomer Y. X và Y lần lượt là các chất nào sau đây?",
    choices: [
      "C(CH3)2=CH–CH=CH2 và CH2=CH(CH3).",
      "CH2=C(CH3)2 và CH2=C(CH3)–CH=CH2.",
      "CH2=C(CH3)–CH=CH2 và CH2=C(CH3)2.",
      "CH2=C(CH3)2 và C(CH3)2=CH–CH=CH2.",
    ],
    correctIndex: 1,
    explanation:
      "Cao su butyl là copolymer của isobutylene CH2=C(CH3)2 (chiếm ~98%, tạo mạch chính no) với một lượng nhỏ isoprene CH2=C(CH3)–CH=CH2 (~2%, tạo các liên kết đôi còn lại trong mạch để có thể lưu hoá).",
    difficulty: "VAN_DUNG",
  },
  // Bài 14. Ôn tập chương IV
  {
    content:
      "Poly(vinyl chloride) (PVC) là một loại chất dẻo phổ biến, được sử dụng làm vỏ dây điện, ống dẫn nước thải, áo mưa, vải giả da,... PVC có công thức cấu tạo là",
    choices: ["(–CH2–CH2–)n.", "(–CH2–CH(CH3)–)n.", "(–CH2–CH(C6H5)–)n.", "(–CH2–CH(Cl)–)n."],
    correctIndex: 3,
    explanation: "PVC được tổng hợp từ vinyl chloride CH2=CHCl nên có công thức cấu tạo (–CH2–CH(Cl)–)n.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Tơ tằm, sợi bông, len thuộc loại tơ nào sau đây?",
    choices: ["Tơ tự nhiên.", "Tơ tổng hợp.", "Tơ bán tổng hợp.", "Tơ nhân tạo."],
    correctIndex: 0,
    explanation: "Tơ tằm, sợi bông, len đều có sẵn trong tự nhiên (từ động vật hoặc thực vật) nên thuộc loại tơ tự nhiên.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Tính chất đặc trưng của cao su là",
    choices: ["tính đàn hồi.", "tính dẻo.", "dễ kéo thành sợi mảnh.", "dễ tan trong nước."],
    correctIndex: 0,
    explanation:
      "Tính đàn hồi (có thể biến dạng dưới lực tác dụng và trở lại hình dạng ban đầu khi ngừng tác dụng lực) là tính chất đặc trưng của cao su.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trùng hợp chất nào sau đây thu được cao su isoprene?",
    choices: ["CH2=CH–CH=CH2.", "CH2=CCl–CH=CH2.", "CH2=C(CH3)–CH=CH2.", "CH2=C(CH3)–C(CH3)=CH2."],
    correctIndex: 2,
    explanation:
      "Cao su isoprene được tổng hợp bằng phản ứng trùng hợp isoprene (2-methylbuta-1,3-diene) CH2=C(CH3)–CH=CH2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây có thể tham gia phản ứng trùng ngưng?",
    choices: ["CH2=CH2.", "CH2=CHCH3.", "CH2=CHC6H5.", "H2N[CH2]5COOH."],
    correctIndex: 3,
    explanation:
      "H2N[CH2]5COOH (6-aminohexanoic acid) có đồng thời nhóm –NH2 và –COOH nên có thể tự trùng ngưng tạo nylon-6; các chất còn lại chỉ là alkene đơn giản, chỉ tham gia được phản ứng trùng hợp.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Polymer nào sau đây KHÔNG thuộc loại cao su?",
    choices: ["Poly(methyl methacrylate).", "Polychloroprene.", "Polyisoprene.", "Polybuta-1,3-diene."],
    correctIndex: 0,
    explanation:
      "Poly(methyl methacrylate) là chất dẻo (thuỷ tinh hữu cơ), không phải cao su; polychloroprene, polyisoprene, polybuta-1,3-diene đều là các loại cao su.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Tơ nào sau đây thuộc loại tơ bán tổng hợp?",
    choices: ["Tơ nylon-6,6.", "Tơ cellulose acetate.", "Tơ capron.", "Tơ tằm."],
    correctIndex: 1,
    explanation:
      "Tơ cellulose acetate được chế biến từ cellulose thiên nhiên bằng phản ứng hoá học nên thuộc loại tơ bán tổng hợp; nylon-6,6 và capron là tơ tổng hợp, tơ tằm là tơ tự nhiên.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "LDPE là một chất dẻo dễ tạo màng, có tính dai bền nên được sử dụng làm túi nylon, màng bọc, bao gói thực phẩm. LDPE được tổng hợp từ monomer nào sau đây?",
    choices: ["CH2=CH2.", "CH2=CHCH3.", "CH2=CHC6H5.", "CH2=CHCl."],
    correctIndex: 0,
    explanation: "LDPE (polyethylene mật độ thấp) được tổng hợp bằng phản ứng trùng hợp ethylene CH2=CH2.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cao su buna-N (còn gọi là cao su nitrile, kí hiệu NBR) là loại cao su tổng hợp có khả năng chịu dầu mỡ tốt nên được dùng làm ống dẫn nhiên liệu, giăng phớt làm kín trong máy móc. Thực hiện phản ứng trùng hợp các chất nào dưới đây thu được sản phẩm là cao su buna-N?",
    choices: [
      "CH2=CHCH=CH2 và C6H5CH=CH2.",
      "CH2=C(CH3)CH=CH2 và CH2=CHCN.",
      "CH2=CHCH=CH2 và N2.",
      "CH2=CHCH=CH2 và CH2=CHCN.",
    ],
    correctIndex: 3,
    explanation: "Cao su buna-N (NBR) là copolymer của buta-1,3-diene và acrylonitrile (CH2=CHCN).",
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
        source: "SBT Hóa 12 - Kết nối tri thức (Chương 4 - Polymer)",
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
