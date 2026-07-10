import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Nguồn: Tài liệu/.../DaiTra/Hoá 8 - Bài 25 Phân bón hoá học- Lê Nghĩa- Gia Lai.docx
// (đọc bằng python-docx). Bổ sung lý thuyết chi tiết hơn cho Document có sẵn (Bài 12)
// và tạo mới 1 quiz riêng (trước đó Chương II lớp 8 chưa có câu hỏi về phân bón hoá học).

const documentContent = `## Vai trò chung
- Phân bón hóa học là những hóa chất có chứa các nguyên tố dinh dưỡng, dùng để bón cho cây nhằm nâng cao năng suất cây trồng.
- Theo hàm lượng cần cung cấp, chia làm 3 nhóm nguyên tố dinh dưỡng: đa lượng (N, P, K), trung lượng (Ca, Mg, S), vi lượng (Si, B, Zn, Fe, ...).

## Các loại phân bón chính
- Phân đạm: cung cấp nguyên tố nitrogen, kích thích sinh trưởng, giúp cây phát triển thân, lá. Ví dụ: urea (NH2)2CO, ammonium nitrate NH4NO3, ammonium sulfate (NH4)2SO4, ammonium chloride NH4Cl.
- Phân lân: cung cấp nguyên tố phosphorus, thúc đẩy bộ rễ phát triển, cây ra hoa quả sớm. Có 2 loại thông dụng:
  - Superphosphate đơn: thành phần chính gồm Ca(H2PO4)2 và CaSO4 (lẫn tạp chất do điều chế trực tiếp từ quặng bằng H2SO4), bón nhiều dễ làm đất bị cứng.
  - Superphosphate kép: thành phần chính chỉ có Ca(H2PO4)2 (tinh khiết hơn, hàm lượng phosphorus cao hơn), điều chế qua 2 giai đoạn (quặng + H2SO4 -> H3PO4, rồi H3PO4 + quặng -> Ca(H2PO4)2).
  - Phân lân nung chảy: thành phần chính là Ca3(PO4)2, không tan trong nước, phù hợp cho đất chua.
- Phân kali: cung cấp nguyên tố potassium, tăng khả năng chống chịu hạn, rét, sâu bệnh. Ví dụ: KCl, K2SO4.
- Phân hỗn hợp NPK: chứa đồng thời nitrogen, phosphorus, potassium theo tỉ lệ ghi trên bao bì (ví dụ NPK 16-16-8 nghĩa là 16% N, 16% P2O5, 8% K2O tính theo khối lượng - không phải % khối lượng nguyên tố P, K nguyên chất).
- Phân đơn chỉ cung cấp 1 nguyên tố dinh dưỡng (vd KCl chỉ có K); phân kép cung cấp từ 2 nguyên tố dinh dưỡng trở lên (vd KNO3 có cả K và N).

## Ví dụ minh họa
Tính thành phần phần trăm nitrogen trong phân đạm urea (NH2)2CO (M = 60 g/mol):
- Khối lượng N trong 1 mol urea: 2 x 14 = 28 gam.
- %N = 28/60 x 100% = 46,7% - đây là lý do urea được coi là loại phân đạm có hàm lượng dinh dưỡng cao nhất trong các loại phân đạm thông dụng.

## Nguyên tắc sử dụng phân bón ("4 đúng")
- Đúng loại: chọn loại phân phù hợp với giai đoạn phát triển của cây.
- Đúng liều: tránh lãng phí và tồn dư phân bón trong đất.
- Đúng lúc: đúng giai đoạn cây cần dinh dưỡng.
- Đúng cách: giúp cây hấp thụ tối đa, không gây hại cho cây.
- Lưu ý: không bón phân đạm cùng vôi bột vì xảy ra phản ứng làm mất đạm (2NH4NO3 + Ca(OH)2 -> 2NH3 (khí) + Ca(NO3)2 + H2O); không để phân đạm, phân kali nơi ẩm ướt (dễ chảy rữa) và không để đạm nitrate gần bếp lửa (dễ nhiệt phân, gây nổ).

## Tác hại khi lạm dụng phân bón hóa học
- Gây hại cho cây trồng, ô nhiễm nông phẩm và môi trường.
- Làm xấu lí tính của đất, giết chết vi sinh vật có lợi.
- Biện pháp khắc phục: bón đúng loại, đúng liều lượng khuyến cáo; kết hợp phân hữu cơ; rửa sạch nông sản trước khi dùng.

## Lưu ý
- Trên bao bì NPK, 3 con số (ví dụ NPK 16-16-8) lần lượt là % khối lượng N, P2O5 và K2O - không phải % khối lượng nguyên tố P, K nguyên chất.`;

const quizData = {
  title: "Kiểm tra: Phân bón hóa học (Bài 12 - Lớp 8)",
  grade: 8,
  durationSec: 900,
  chapterId: "cmrel0m8e0001vhd8qvr62s6i", // Chương II. Một số hợp chất thông dụng
  questions: [
    { content: "Trong các hợp chất sau, hợp chất có trong tự nhiên được dùng làm phân bón hoá học là", choices: ["CaCO3.", "Ca3(PO4)2.", "Ca(OH)2.", "CaCl2."], correctIndex: 1 },
    { content: "Trong các loại phân bón sau, phân bón hoá học kép là", choices: ["(NH4)2SO4.", "Ca(H2PO4)2.", "KCl.", "KNO3."], correctIndex: 3, explanation: "Phân kép cung cấp từ 2 nguyên tố dinh dưỡng trở lên; KNO3 cung cấp cả K và N." },
    { content: "Trong các loại phân bón hoá học sau, loại nào là phân đạm?", choices: ["KCl.", "Ca3(PO4)2.", "K2SO4.", "(NH2)2CO."], correctIndex: 3 },
    { content: "Phân đạm cung cấp nguyên tố dinh dưỡng nào sau đây cho cây trồng?", choices: ["Potassium.", "Carbon.", "Nitrogen.", "Phosphorus."], correctIndex: 2 },
    { content: "Phân lân cung cấp nguyên tố dinh dưỡng nào sau đây cho cây trồng?", choices: ["Nitrogen.", "Phosphorus.", "Potassium.", "Hydrogen."], correctIndex: 1 },
    { content: "Phân kali cung cấp nguyên tố dinh dưỡng nào sau đây cho cây trồng?", choices: ["Nitrogen.", "Phosphorus.", "Potassium.", "Hydrogen."], correctIndex: 2 },
    { content: "Nguyên tố nào sau đây không phải là nguyên tố đa lượng trong phân bón cho cây trồng?", choices: ["Sodium.", "Potassium.", "Nitrogen.", "Phosphorus."], correctIndex: 0 },
    { content: "Chất nào sau đây trong phân đạm, cung cấp nguyên tố đa lượng cho cây trồng?", choices: ["NaCl.", "NaNO3.", "Na2SO4.", "CaSO4."], correctIndex: 1 },
    { content: "Một trong các nguyên tố hóa học cần cung cấp cho cây trồng với một lượng nhỏ (vi lượng) dưới dạng hợp chất là", choices: ["N.", "Zn.", "P.", "K."], correctIndex: 1 },
    { content: "Công thức hóa học của một trong các loại phân đạm là", choices: ["KCl.", "NaCl.", "MgSO4.", "NH4NO3."], correctIndex: 3 },
    { content: "Chất nào sau đây trong phân lân, cung cấp nguyên tố đa lượng cho cây trồng?", choices: ["MgCl2.", "Na2CO3.", "Ca(H2PO4)2.", "CaSO4."], correctIndex: 2 },
    { content: "Chất nào sau đây trong phân kali, cung cấp nguyên tố đa lượng cho cây trồng?", choices: ["MgCl2.", "Na2CO3.", "Ca(HCO3)2.", "KCl."], correctIndex: 3 },
    { content: "Đạm urea có công thức là", choices: ["(NH2)2CO.", "NH4NO3.", "K2SO4.", "Ca(H2PO4)2."], correctIndex: 0 },
    { content: "Phân bón nào sau đây có thành phần chính không tan trong nước?", choices: ["Phân lân nung chảy.", "Superphosphate kép.", "Phân đạm.", "Phân kali."], correctIndex: 0 },
    { content: "Phân bón nào sau đây có thành phần chính là Ca(H2PO4)2 và CaSO4?", choices: ["Superphosphate đơn.", "Superphosphate kép.", "Phân lân nung chảy.", "Phân NPK."], correctIndex: 0 },
    { content: "Thành phần chính của superphosphate kép là", choices: ["Ca(H2PO4)2, CaSO4, 2H2O.", "Ca3(PO4)2, Ca(H2PO4)2.", "Ca(H2PO4)2, H3PO4.", "Ca(H2PO4)2."], correctIndex: 3 },
    { content: "Loại phân bón nào sau đây cung cấp cho cây trồng cả ba thành phần dinh dưỡng: nitrogen, phosphorus và potassium?", choices: ["Phân đạm.", "Phân kali.", "Phân NPK.", "Phân lân."], correctIndex: 2 },
    { content: "Dãy phân bón hoá học chỉ chứa toàn phân bón hoá học đơn là", choices: ["KNO3, NH4NO3, (NH2)2CO.", "KCl, NH4H2PO4, Ca(H2PO4)2.", "(NH4)2SO4, KCl, Ca(H2PO4)2.", "(NH4)2SO4, KNO3, NH4Cl."], correctIndex: 2, explanation: "KNO3 và NH4H2PO4 là phân kép (chứa từ 2 nguyên tố dinh dưỡng trở lên) nên các dãy còn lại không thoả." },
    { content: "Trong các loại phân bón sau, loại phân bón nào có lượng đạm (%N) cao nhất?", choices: ["NH4NO3.", "NH4Cl.", "(NH4)2SO4.", "(NH2)2CO."], correctIndex: 3, explanation: "%N: NH4NO3 ≈ 35%, NH4Cl ≈ 26,2%, (NH4)2SO4 ≈ 21,2%, (NH2)2CO ≈ 46,7% - urea cao nhất." },
    { content: "Để nhận biết 2 loại phân bón hoá học là NH4NO3 và NH4Cl, ta dùng dung dịch", choices: ["NaOH.", "Ba(OH)2.", "AgNO3.", "BaCl2."], correctIndex: 2, explanation: "AgNO3 tạo kết tủa trắng AgCl với ion Cl- (nhận ra NH4Cl), không phản ứng với NO3-." },
    { content: "Để thúc đẩy quá trình sinh trưởng của cây trồng, giúp cây trồng phát triển thân, rễ, lá, người ta bón phân nào sau đây?", choices: ["Phân kali.", "Phân đạm.", "Super lân.", "Phân lân nung chảy."], correctIndex: 1 },
    { content: "Phân bón nào sau đây giúp cây trồng tăng khả năng hấp thụ nước và chất dinh dưỡng, tăng sức chịu lạnh?", choices: ["Phân đạm.", "Phân lân nung chảy.", "Phân kali.", "Super lân."], correctIndex: 2 },
    { content: "Phân bón nào sau đây thích hợp cho cây trồng trên đất chua?", choices: ["Super lân.", "Phân kali.", "Phân đạm.", "Phân lân nung chảy."], correctIndex: 3, explanation: "Phân lân nung chảy (Ca3(PO4)2) có tính kiềm nhẹ, phù hợp cải tạo đất chua; super lân có tính acid nên không phù hợp." },
    { content: "Superphosphate đơn có nhược điểm là", choices: ["Làm chua đất trồng.", "Làm mặn đất trồng.", "Làm nghèo dinh dưỡng đất trồng.", "Làm rắn đất trồng."], correctIndex: 3, explanation: "Do lẫn tạp chất CaSO4, bón nhiều và lâu dài dễ làm đất bị cứng (rắn)." },
    { content: "Các chất nào sau đây đều là thành phần chính của phân đạm?", choices: ["NaNO3, K2SO4, Ca3(PO4)2.", "NaNO3, Na2SO4, CaSO4.", "Ca3(PO4)2, Ca(H2PO4)2, CaSO4.", "Ca(NO3)2, NH4Cl, (NH2)2CO."], correctIndex: 3 },
    { content: "Không nên bón phân đạm cùng với vôi vì", choices: [
      "phân đạm làm kết tủa vôi.",
      "phân đạm phản ứng với vôi tạo khí NH3 làm mất tác dụng của đạm.",
      "phân đạm phản ứng với vôi và toả nhiệt làm cây trồng bị chết vì nóng.",
      "cây trồng không thể hấp thụ được đạm khi có mặt của vôi.",
    ], correctIndex: 1, explanation: "2NH4NO3 + Ca(OH)2 -> 2NH3 (khí) + Ca(NO3)2 + H2O, khí NH3 bay đi làm mất đạm." },
    { content: "Phát biểu nào sau đây là đúng?", choices: [
      "Thành phần chính của superphosphate kép gồm hai muối Ca(H2PO4)2 và CaSO4.",
      "Urea có công thức là (NH2)2CO.",
      "Superphosphate đơn chỉ có Ca(H2PO4)2.",
      "Phân lân cung cấp nitrogen cho cây trồng.",
    ], correctIndex: 1 },
    { content: "Phần trăm về khối lượng của nguyên tố N trong (NH4)2SO4 (làm tròn) là", choices: ["20%.", "21%.", "22%.", "23%."], correctIndex: 1, explanation: "M((NH4)2SO4)=132; %N = 28/132×100% ≈ 21,2%." },
    { content: "Để nhận biết ba chất rắn NH4NO3, Ca3(PO4)2, KCl, người ta dùng dung dịch", choices: ["KOH.", "NaOH.", "Ba(OH)2.", "Na2CO3."], correctIndex: 2, explanation: "Ca3(PO4)2 không tan trong nước (nhận ra ngay); Ba(OH)2 tác dụng NH4NO3 sinh khí mùi khai (nhận ra), còn lại là KCl." },
    { content: "Khối lượng của nguyên tố N có trong 100 gam (NH4)2SO4 là", choices: ["42,42 g.", "24,56 g.", "21,21 g.", "49,12 g."], correctIndex: 2, explanation: "100 × 28/132 ≈ 21,21 g." },
    { content: "Phần trăm về khối lượng của nguyên tố N trong (NH2)2CO (urea) là", choices: ["32,33%.", "46,67%.", "31,81%.", "63,64%."], correctIndex: 1, explanation: "M=60; %N = 28/60×100% ≈ 46,67%." },
    { content: "Cho các phát biểu sau: (a) Phân đạm NH4NO3 không nên bón cho loại đất chua; (b) Độ dinh dưỡng của phân kali được đánh giá bằng hàm lượng phần trăm K2O tương ứng với lượng potassium có trong thành phần của nó; (c) Thành phần chính của superphosphate kép là Ca(H2PO4)2; (d) Phân lân nung chảy có thành phần chính là CaHPO4. Số phát biểu đúng là", choices: ["1.", "2.", "3.", "4."], correctIndex: 2, explanation: "(a), (b), (c) đúng; (d) sai vì phân lân nung chảy có thành phần chính là Ca3(PO4)2." },
    { content: "Các nhận xét sau: (a) Phân đạm ammonium không nên bón cho loại đất chua; (b) Độ dinh dưỡng của phân lân được đánh giá bằng phần trăm khối lượng phosphorus; (c) Thành phần chính của superphosphate kép là Ca(H2PO4)2.CaSO4; (d) Người ta dùng loại phân bón chứa nguyên tố kali để tăng cường sức chống bệnh, chống rét và chịu hạn cho cây; (e) Tro thực vật cũng là một loại phân kali vì có chứa K2CO3; (f) Phân bón NPK cung cấp đồng thời các nguyên tố N, P, K cho cây trồng. Số nhận xét sai là", choices: ["4.", "3.", "2.", "1."], correctIndex: 2, explanation: "(b) sai vì độ dinh dưỡng phân lân đánh giá theo %P2O5, không phải %P; (c) sai vì superphosphate kép chỉ có Ca(H2PO4)2, không lẫn CaSO4. Còn lại (a),(d),(e),(f) đúng." },
    { content: "Cho phản ứng điều chế phân bón superphosphate kép: X + Y -> Z. Biết Z là thành phần dinh dưỡng chính của superphosphate kép. Hai chất X, Y lần lượt là", choices: ["Ca3(PO4)2 và H3PO4.", "Ca3(PO4)2 và H2SO4.", "Ca(OH)2 và H3PO4.", "Ca(OH)2 và P2O5."], correctIndex: 0, explanation: "Ca3(PO4)2 + 4H3PO4 -> 3Ca(H2PO4)2 (Z = Ca(H2PO4)2 là thành phần dinh dưỡng chính)." },
  ],
};

async function main() {
  const doc = await prisma.document.findUnique({ where: { id: "cmrel0o1p000gvhd83hczimxs" } });
  if (!doc) {
    console.log("Không tìm thấy document Bài 12 - bỏ qua bước cập nhật lý thuyết.");
  } else {
    await prisma.document.update({ where: { id: doc.id }, data: { content: documentContent } });
    console.log("Đã cập nhật lý thuyết cho:", doc.title);
  }

  const existing = await prisma.quiz.findFirst({ where: { title: quizData.title } });
  if (existing) {
    console.log("Quiz đã tồn tại, bỏ qua:", existing.id);
  } else {
    const quiz = await prisma.quiz.create({
      data: {
        title: quizData.title,
        grade: quizData.grade,
        durationSec: quizData.durationSec,
        chapterId: quizData.chapterId,
        questions: {
          create: quizData.questions.map((q, i) => ({
            order: i + 1,
            content: q.content,
            choices: JSON.stringify(q.choices),
            correctIndex: q.correctIndex,
            explanation: q.explanation,
          })),
        },
      },
    });
    console.log(`Đã tạo quiz "${quiz.title}" với ${quizData.questions.length} câu hỏi.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
