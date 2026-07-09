import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("hocsinh123", 10);

  await prisma.user.upsert({
    where: { username: "giaovien" },
    update: {},
    create: {
      username: "giaovien",
      password: adminPassword,
      name: "Cô Lan",
      role: "ADMIN",
    },
  });

  const students = [
    { username: "hs_an", name: "Nguyễn Văn An", grade: 8 },
    { username: "hs_binh", name: "Trần Thị Bình", grade: 10 },
    { username: "hs_chi", name: "Lê Thị Chi", grade: 12 },
  ];

  for (const s of students) {
    await prisma.user.upsert({
      where: { username: s.username },
      update: {},
      create: {
        username: s.username,
        password: studentPassword,
        name: s.name,
        role: "STUDENT",
        grade: s.grade,
      },
    });
  }

  await prisma.chatMessage.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.readDocument.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.flashcard.deleteMany();
  await prisma.flashcardSet.deleteMany();
  await prisma.document.deleteMany();

  await prisma.document.createMany({
    data: [
      {
        grade: 8,
        chapter: "Mở đầu về Hóa học",
        title: "Chất, nguyên tử và phân tử",
        order: 1,
        content:
          "Chất là những gì cấu tạo nên vật thể. Mỗi chất được tạo nên từ các nguyên tử.\n\n" +
          "Nguyên tử gồm hạt nhân (chứa proton mang điện dương và neutron không mang điện) và lớp vỏ electron mang điện âm.\n\n" +
          "Phân tử nước gồm 2 nguyên tử Hiđro và 1 nguyên tử Oxi liên kết với nhau, viết là H2O.\n\n" +
          "Ví dụ một số công thức phân tử thường gặp: H2O, CO2, O2, N2, NaCl.",
      },
      {
        grade: 8,
        chapter: "Mở đầu về Hóa học",
        title: "Công thức hóa học và hóa trị",
        order: 2,
        content:
          "Hóa trị là con số biểu thị khả năng liên kết của nguyên tử nguyên tố này với nguyên tử nguyên tố khác.\n\n" +
          "Quy tắc hóa trị: trong công thức hóa học, tích của chỉ số và hóa trị của nguyên tố này bằng tích của chỉ số và hóa trị của nguyên tố kia.\n\n" +
          "Ví dụ: CaCO3 phân hủy khi nung tạo thành CaO và khí CO2:\nCaCO3 -> CaO + CO2",
      },
      {
        grade: 9,
        chapter: "Các loại hợp chất vô cơ",
        title: "Oxit - Axit - Bazơ - Muối",
        order: 1,
        content:
          "Oxit là hợp chất của oxi với một nguyên tố khác. Ví dụ: CaO (canxi oxit), CO2 (cacbon đioxit).\n\n" +
          "Axit là hợp chất mà phân tử gồm một hay nhiều nguyên tử Hiđro liên kết với gốc axit. Ví dụ: HCl, H2SO4.\n\n" +
          "Bazơ là hợp chất mà phân tử gồm nguyên tử kim loại liên kết với nhóm hiđroxit (OH). Ví dụ: NaOH, Ca(OH)2.\n\n" +
          "Phản ứng trung hòa giữa axit và bazơ tạo muối và nước:\nHCl + NaOH -> NaCl + H2O",
      },
      {
        grade: 10,
        chapter: "Cấu tạo nguyên tử - Bảng tuần hoàn",
        title: "Bảng tuần hoàn các nguyên tố hóa học",
        order: 1,
        content:
          "Bảng tuần hoàn sắp xếp các nguyên tố theo chiều tăng dần điện tích hạt nhân.\n\n" +
          "Nguyên tử Natri (Na) có 11 electron, dễ nhường 1 electron để tạo ion Na^+.\n\n" +
          "Nguyên tử Clo (Cl) có 17 electron, dễ nhận 1 electron để tạo ion Cl^-.\n\n" +
          "Hai ion trái dấu hút nhau tạo thành hợp chất ion NaCl (muối ăn).",
      },
      {
        grade: 11,
        chapter: "Sự điện li",
        title: "Chất điện li, axit - bazơ theo Areniut",
        order: 1,
        content:
          "Chất điện li là chất khi tan trong nước phân li ra ion, giúp dung dịch dẫn được điện.\n\n" +
          "Theo Areniut, axit là chất khi tan trong nước phân li ra ion H^+. Ví dụ:\nHCl -> H^+ + Cl^-\n\n" +
          "Bazơ là chất khi tan trong nước phân li ra ion OH^-. Ví dụ:\nNaOH -> Na^+ + OH^-",
      },
      {
        grade: 12,
        chapter: "Este - Lipit",
        title: "Este: cấu tạo, tính chất và phản ứng thủy phân",
        order: 1,
        content:
          "Este là sản phẩm của phản ứng giữa axit cacboxylic và ancol, giải phóng nước.\n\n" +
          "Ví dụ phản ứng este hóa giữa axit axetic và ancol etylic (có xúc tác H2SO4 đặc, đun nóng):\n" +
          "CH3COOH + C2H5OH -> CH3COOC2H5 + H2O\n\n" +
          "Phản ứng thủy phân este trong môi trường kiềm (phản ứng xà phòng hóa) là phản ứng một chiều.",
      },
    ],
  });

  const quiz8 = await prisma.quiz.create({
    data: {
      title: "Kiểm tra 15 phút: Công thức hóa học và hóa trị",
      grade: 8,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Công thức hóa học của nước là gì?",
            choices: JSON.stringify(["H2O", "HO2", "H3O", "OH2"]),
            correctIndex: 0,
            explanation: "Phân tử nước gồm 2 nguyên tử H liên kết với 1 nguyên tử O: H2O.",
          },
          {
            order: 2,
            content: "Trong hợp chất CaCO3, hóa trị của Ca là bao nhiêu?",
            choices: JSON.stringify(["I", "II", "III", "IV"]),
            correctIndex: 1,
            explanation: "Ca luôn có hóa trị II trong các hợp chất.",
          },
          {
            order: 3,
            content: "Nung CaCO3 thu được CaO và khí gì?",
            choices: JSON.stringify(["O2", "H2", "CO2", "N2"]),
            correctIndex: 2,
            explanation: "CaCO3 -> CaO + CO2 khi bị nung nóng.",
          },
          {
            order: 4,
            content: "Nguyên tử được cấu tạo từ những hạt nào?",
            choices: JSON.stringify([
              "Chỉ có proton",
              "Proton, neutron và electron",
              "Chỉ có electron",
              "Chỉ có neutron",
            ]),
            correctIndex: 1,
            explanation: "Nguyên tử gồm hạt nhân (proton, neutron) và lớp vỏ electron.",
          },
          {
            order: 5,
            content: "Khí O2 là đơn chất hay hợp chất?",
            choices: JSON.stringify(["Đơn chất", "Hợp chất", "Hỗn hợp", "Không xác định"]),
            correctIndex: 0,
            explanation: "O2 chỉ gồm 1 nguyên tố Oxi nên là đơn chất.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra 15 phút: Oxit - Axit - Bazơ - Muối",
      grade: 9,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Chất nào sau đây là axit?",
            choices: JSON.stringify(["NaOH", "HCl", "CaO", "NaCl"]),
            correctIndex: 1,
            explanation: "HCl là axit clohiđric, phân li ra ion H+.",
          },
          {
            order: 2,
            content: "Sản phẩm của phản ứng trung hòa HCl + NaOH là gì?",
            choices: JSON.stringify([
              "NaCl + H2O",
              "NaCl + H2",
              "Na2O + HCl",
              "NaOH + H2O",
            ]),
            correctIndex: 0,
            explanation: "HCl + NaOH -> NaCl + H2O (phản ứng trung hòa).",
          },
          {
            order: 3,
            content: "CaO thuộc loại hợp chất nào?",
            choices: JSON.stringify(["Oxit", "Axit", "Bazơ", "Muối"]),
            correctIndex: 0,
            explanation: "CaO là oxit của kim loại Canxi (oxit bazơ).",
          },
          {
            order: 4,
            content: "Nhóm nguyên tử đặc trưng của bazơ là gì?",
            choices: JSON.stringify(["OH", "Cl", "SO4", "NO3"]),
            correctIndex: 0,
            explanation: "Bazơ luôn có nhóm hiđroxit -OH liên kết với kim loại.",
          },
          {
            order: 5,
            content: "Ca(OH)2 có tên gọi là gì?",
            choices: JSON.stringify([
              "Canxi oxit",
              "Canxi cacbonat",
              "Canxi hiđroxit",
              "Canxi clorua",
            ]),
            correctIndex: 2,
            explanation: "Ca(OH)2: canxi hiđroxit (vôi tôi).",
          },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 8,
      topic: "Ký hiệu & hóa trị nguyên tố thường gặp",
      cards: {
        create: [
          { order: 1, term: "H", meaning: "Hiđro - hóa trị I" },
          { order: 2, term: "O", meaning: "Oxi - hóa trị II" },
          { order: 3, term: "C", meaning: "Cacbon - hóa trị IV (hoặc II)" },
          { order: 4, term: "N", meaning: "Nitơ - hóa trị III (hoặc II, IV, V)" },
          { order: 5, term: "Na", meaning: "Natri - hóa trị I" },
          { order: 6, term: "Ca", meaning: "Canxi - hóa trị II" },
          { order: 7, term: "Fe", meaning: "Sắt - hóa trị II hoặc III" },
          { order: 8, term: "Cl", meaning: "Clo - hóa trị I" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 9,
      topic: "Công thức các hợp chất vô cơ thường gặp",
      cards: {
        create: [
          { order: 1, term: "HCl", meaning: "Axit clohiđric" },
          { order: 2, term: "H2SO4", meaning: "Axit sunfuric" },
          { order: 3, term: "NaOH", meaning: "Natri hiđroxit (xút ăn da)" },
          { order: 4, term: "Ca(OH)2", meaning: "Canxi hiđroxit (vôi tôi)" },
          { order: 5, term: "NaCl", meaning: "Natri clorua (muối ăn)" },
          { order: 6, term: "CaCO3", meaning: "Canxi cacbonat (đá vôi)" },
        ],
      },
    },
  });

  console.log("Seed dữ liệu hoàn tất.");
  console.log("Đăng nhập giáo viên: giaovien / admin123");
  console.log("Đăng nhập học sinh: hs_an, hs_binh, hs_chi / hocsinh123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
