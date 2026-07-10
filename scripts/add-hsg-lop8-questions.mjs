import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Nguồn: Tài liệu/.../HSG/Chuyên Đề 10 - MOL VA TI KHOI CHAT KHI... - Võ Thị Huyền Trang - Đắk Nông.docx
// Bộ "HSG" (70 chuyên đề nâng cao) hầu hết là tự luận nhiều bước, nhiều câu tái sử dụng đề thi THPT QG/
// đại học (vượt xa mức lớp 8), và lời giải bị mất số liệu khi trích xuất do dùng Equation Editor (OMML)
// mà python-docx không đọc được phần công thức - không đủ tin cậy để đưa vào quiz. Chỉ Chuyên đề 10
// (Mol và tỉ khối chất khí) có một số câu trắc nghiệm 1 bước, đúng mức lớp 8, tự kiểm chứng được độc
// lập bằng công thức tỉ khối cơ bản - các chuyên đề còn lại (Nồng độ dung dịch, Độ tan, Tính theo PTHH,
// Năng lượng hoá học, Tốc độ phản ứng/cân bằng, Định luật bảo toàn nguyên tố, Oxide, Acid) bị bỏ qua
// vì lý do trên (xem KE_HOACH_MO_RONG.md mục MR-Q).

const quizId = "cmrel0pwu000xvhd8phumi47u"; // Kiểm tra: Phản ứng hóa học (Chương I - Lớp 8)
const startOrder = 40;

const questions = [
  { content: "Tỉ khối của khí X đối với khí hydrogen bằng 16. Khí X có khối lượng mol bằng", choices: ["16 gam/mol.", "32 gam/mol.", "64 gam/mol.", "8 gam/mol."], correctIndex: 1 },
  { content: "Một chất khí có phân tử khối bằng 14 lần khí hydrogen, khí đó là", choices: ["nitrogen.", "oxygen.", "chlorine.", "carbonic."], correctIndex: 0, explanation: "M = 14 × 2 = 28 g/mol, đúng bằng phân tử khối của N2 (nitrogen)." },
  { content: "X là chất khí có tỉ khối so với H2 bằng 22, phân tử X có chứa 1 nguyên tử O. X là khí nào?", choices: ["NO.", "CO.", "N2O.", "CO2."], correctIndex: 2, explanation: "M = 22 × 2 = 44 g/mol. Cả N2O và CO2 đều có M = 44 nhưng CO2 chứa 2 nguyên tử O, chỉ N2O chứa 1 nguyên tử O." },
  { content: "Khí A có công thức dạng RO2. Biết dA/kk = 1,5862. Hãy xác định công thức của khí A?", choices: ["SO2.", "NO2.", "CO2.", "H2O."], correctIndex: 1, explanation: "M = 1,5862 × 29 ≈ 46 g/mol, đúng bằng phân tử khối NO2 (R = N)." },
  { content: "Tỉ khối của khí A đối với không khí là dA/KK < 1. A là khí nào trong các khí sau?", choices: ["O2.", "H2S.", "CO2.", "N2."], correctIndex: 3, explanation: "M(N2) = 28 < 29 = M không khí, nên dN2/kk < 1; các khí còn lại đều nặng hơn không khí." },
  { content: "Một hỗn hợp khí gồm 0,1 mol O2; 0,25 mol N2 và 0,15 mol CO. Khối lượng mol trung bình của hỗn hợp khí trên là", choices: ["26,4 gam/mol.", "27,5 gam/mol.", "28,8 gam/mol.", "28,2 gam/mol."], correctIndex: 2, explanation: "M trung bình = (0,1×32 + 0,25×28 + 0,15×28)/(0,1+0,25+0,15) = 14,4/0,5 = 28,8 g/mol." },
  { content: "Một hỗn hợp khí gồm 3,2 gam O2 và 8,8 gam CO2. Khối lượng mol trung bình của hỗn hợp khí trên là", choices: ["45 gam/mol.", "40 gam/mol.", "30 gam/mol.", "35 gam/mol."], correctIndex: 1, explanation: "n(O2) = 0,1 mol, n(CO2) = 0,2 mol → M trung bình = 12/0,3 = 40 g/mol." },
  { content: "Một hỗn hợp khí O2 và CO2 có tỉ khối so với hydrogen là 19. Phần trăm thể tích của O2 trong hỗn hợp là", choices: ["40%.", "50%.", "60%.", "70%."], correctIndex: 1, explanation: "M trung bình = 38. Gọi x là %mol O2: 32x + 44(1-x) = 38 → x = 0,5 = 50%." },
  { content: "Một hỗn hợp khí O2 và CO2 có tỉ khối so với hydrogen là 19. Phần trăm khối lượng của O2 trong hỗn hợp là", choices: ["57,9%.", "42,1%.", "21,05%.", "78,95%."], correctIndex: 1, explanation: "Theo câu trên, hỗn hợp gồm 50% mol O2 và 50% mol CO2: xét 1 mol hỗn hợp, m(O2) = 0,5×32 = 16g, m(CO2) = 0,5×44 = 22g, tổng 38g → %O2 = 16/38 ≈ 42,1%." },
  { content: "X là chất khí có tỉ khối so với không khí là dX/kk = 1,52, phân tử X có chứa 2 nguyên tử nitrogen. X là khí nào?", choices: ["CO.", "NO.", "N2O.", "N2."], correctIndex: 2, explanation: "M = 1,52 × 29 ≈ 44 g/mol, chứa 2 nguyên tử N → N2O (M = 44)." },
  { content: "Cho tỉ khối của khí A đối với khí B là 2,75 và tỉ khối của khí B đối với oxygen là 0,5. Khối lượng mol của khí A là", choices: ["2 g/mol.", "28 g/mol.", "44 g/mol.", "64 g/mol."], correctIndex: 2, explanation: "M(B) = 0,5 × 32 = 16 g/mol → M(A) = 2,75 × 16 = 44 g/mol." },
  { content: "Một hỗn hợp A gồm khí oxygen và khí carbon dioxide có tỉ khối so với khí hydrogen là 19. Phần trăm khối lượng của khí oxygen trong hỗn hợp là", choices: ["7,9%.", "42,1%.", "21,05%.", "78,95%."], correctIndex: 1, explanation: "Giống hỗn hợp O2/CO2 có d/H2 = 19 ở trên: %O2 theo khối lượng ≈ 42,1%." },
];

async function main() {
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
  if (!quiz) {
    console.log("Không tìm thấy quiz", quizId);
    return;
  }
  const existingCount = await prisma.question.count({ where: { quizId } });
  if (existingCount > startOrder) {
    console.log(`Bỏ qua "${quiz.title}": đã có ${existingCount} câu (>= ${startOrder}), có vẻ đã chạy script này rồi.`);
    return;
  }
  let order = startOrder;
  for (const q of questions) {
    await prisma.question.create({
      data: {
        quizId,
        order: order++,
        content: q.content,
        choices: JSON.stringify(q.choices),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      },
    });
  }
  console.log(`Đã thêm ${questions.length} câu vào "${quiz.title}"`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
