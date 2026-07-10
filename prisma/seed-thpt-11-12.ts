import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Nội dung Hóa học lớp 11-12 dựa theo SGK Hóa học (Kết nối tri thức):
 * - Lớp 11: Chương 1 (Cân bằng hóa học), Chương 2 (Nitrogen - Sulfur),
 *           Chương 3 (Đại cương hữu cơ), Chương 4 (Hydrocarbon),
 *           Chương 5 (Dẫn xuất halogen - Alcohol - Phenol), Chương 6 (Carbonyl - Carboxylic acid)
 * - Lớp 12: Chương 1 (Ester - Lipid), Chương 2 (Carbohydrate), Chương 3 (Hợp chất chứa Nitrogen),
 *           Chương 4 (Polymer), Chương 5 (Pin điện - Điện phân), Chương 6 (Đại cương kim loại),
 *           Chương 7 (Nhóm IA - IIA), Chương 8 (Kim loại chuyển tiếp - Phức chất)
 * Các bài "Ôn tập chương" được lược bỏ vì chỉ tổng hợp lại kiến thức, không có nội dung mới.
 */

async function main() {
  await prisma.question.deleteMany({ where: { quiz: { grade: { in: [11, 12] } } } });
  await prisma.quiz.deleteMany({ where: { grade: { in: [11, 12] } } });
  await prisma.flashcard.deleteMany({ where: { set: { grade: { in: [11, 12] } } } });
  await prisma.flashcardSet.deleteMany({ where: { grade: { in: [11, 12] } } });
  await prisma.practiceQuestion.deleteMany({ where: { chapter: { grade: { in: [11, 12] } } } });
  await prisma.document.deleteMany({ where: { grade: { in: [11, 12] } } });
  await prisma.chapter.deleteMany({ where: { grade: { in: [11, 12] } } });

  const l11c1 = await prisma.chapter.create({ data: { grade: 11, order: 1, title: "Chương 1. Cân bằng hóa học" } });
  const l11c2 = await prisma.chapter.create({ data: { grade: 11, order: 2, title: "Chương 2. Nitrogen - Sulfur" } });
  const l11c3 = await prisma.chapter.create({ data: { grade: 11, order: 3, title: "Chương 3. Đại cương về hóa học hữu cơ" } });
  const l11c4 = await prisma.chapter.create({ data: { grade: 11, order: 4, title: "Chương 4. Hydrocarbon" } });
  const l11c5 = await prisma.chapter.create({ data: { grade: 11, order: 5, title: "Chương 5. Dẫn xuất halogen - Alcohol - Phenol" } });
  const l11c6 = await prisma.chapter.create({ data: { grade: 11, order: 6, title: "Chương 6. Hợp chất carbonyl - Carboxylic acid" } });

  const l12c1 = await prisma.chapter.create({ data: { grade: 12, order: 1, title: "Chương 1. Ester - Lipid" } });
  const l12c2 = await prisma.chapter.create({ data: { grade: 12, order: 2, title: "Chương 2. Carbohydrate" } });
  const l12c3 = await prisma.chapter.create({ data: { grade: 12, order: 3, title: "Chương 3. Hợp chất chứa nitrogen" } });
  const l12c4 = await prisma.chapter.create({ data: { grade: 12, order: 4, title: "Chương 4. Polymer" } });
  const l12c5 = await prisma.chapter.create({ data: { grade: 12, order: 5, title: "Chương 5. Pin điện và điện phân" } });
  const l12c6 = await prisma.chapter.create({ data: { grade: 12, order: 6, title: "Chương 6. Đại cương về kim loại" } });
  const l12c7 = await prisma.chapter.create({ data: { grade: 12, order: 7, title: "Chương 7. Nguyên tố nhóm IA và nhóm IIA" } });
  const l12c8 = await prisma.chapter.create({ data: { grade: 12, order: 8, title: "Chương 8. Kim loại chuyển tiếp và phức chất" } });

  // ================= LỚP 11 - CHƯƠNG 1: CÂN BẰNG HÓA HỌC =================
  await prisma.document.createMany({
    data: [
      {
        grade: 11,
        chapterId: l11c1.id,
        order: 1,
        title: "Bài 1. Khái niệm về cân bằng hóa học",
        content:
          "## Phản ứng một chiều và phản ứng thuận nghịch\n" +
          "- Phản ứng một chiều: chỉ xảy ra theo một chiều từ chất phản ứng tạo thành sản phẩm, phản ứng xảy ra hoàn toàn.\n" +
          "- Phản ứng thuận nghịch: ở cùng điều kiện, xảy ra theo hai chiều trái ngược nhau, kí hiệu bằng mũi tên hai chiều ⇌.\nN2 + 3H2 ⇌ 2NH3\n\n" +
          "## Cân bằng hóa học\n" +
          "- Là trạng thái của phản ứng thuận nghịch khi tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch, nồng độ các chất trong hệ không thay đổi theo thời gian (đây là một cân bằng động).\n\n" +
          "## Hằng số cân bằng Kc\n" +
          "- Với phản ứng tổng quát aA + bB ⇌ cC + dD, Kc chỉ phụ thuộc vào nhiệt độ và bản chất phản ứng, không phụ thuộc vào nồng độ ban đầu của các chất.\n\n" +
          "## Nguyên lí chuyển dịch cân bằng Le Chatelier\n" +
          "- Khi một hệ đang ở trạng thái cân bằng chịu một tác động từ bên ngoài (thay đổi nồng độ, nhiệt độ, áp suất), cân bằng sẽ chuyển dịch theo chiều làm giảm tác động đó.\n\n" +
          "## Ví dụ minh họa\n" +
          "Ở một nhiệt độ xác định, phản ứng H2 + I2 ⇌ 2HI đạt cân bằng với [H2] = 0,1 mol/L, [I2] = 0,1 mol/L, [HI] = 0,8 mol/L:\n" +
          "Kc = [HI]^2 / ([H2][I2]) = 0,8^2 / (0,1 x 0,1) = 64.\n\n" +
          "## Lưu ý\n" +
          "- Đừng nhầm \"cân bằng\" với \"phản ứng đã dừng lại\": ở trạng thái cân bằng, phản ứng thuận và nghịch vẫn diễn ra liên tục, chỉ là tốc độ hai chiều bằng nhau.",
      },
      {
        grade: 11,
        chapterId: l11c1.id,
        order: 2,
        title: "Bài 2. Cân bằng trong dung dịch nước",
        content:
          "## Sự điện li\n" +
          "- Là quá trình chất tan trong nước phân li ra ion.\n" +
          "- Chất điện li mạnh phân li hoàn toàn ra ion (acid mạnh, base mạnh, hầu hết các muối tan).\n" +
          "- Chất điện li yếu chỉ phân li một phần ra ion (acid yếu, base yếu).\n\n" +
          "## Cân bằng trong nước\n" +
          "- Nước là chất điện li rất yếu: H2O ⇌ H+ + OH-\n" +
          "- Tích số ion của nước: Kw = [H+][OH-] = 10^-14 ở 25°C.\n\n" +
          "## Thang pH\n" +
          "- pH = -log[H+]\n" +
          "- Ở 25°C: môi trường trung tính có pH = 7; môi trường acid có pH nhỏ hơn 7; môi trường base có pH lớn hơn 7.\n" +
          "- Chất chỉ thị acid - base như quỳ tím, phenolphthalein được dùng để nhận biết môi trường của một dung dịch.\n\n" +
          "## Ví dụ minh họa\n" +
          "Một dung dịch có [H+] = 10^-3 mol/L thì pH = -log(10^-3) = 3 -> dung dịch có môi trường acid.",
      },
    ],
  });

  // ================= LỚP 11 - CHƯƠNG 2: NITROGEN - SULFUR =================
  await prisma.document.createMany({
    data: [
      {
        grade: 11,
        chapterId: l11c2.id,
        order: 3,
        title: "Bài 4. Nitrogen",
        content:
          "## Tính chất\n" +
          "- Nitrogen (N2) là chất khí không màu, không mùi, chiếm khoảng 78% thể tích không khí.\n" +
          "- Phân tử N2 có liên kết ba bền vững (N≡N) nên khá trơ về mặt hóa học ở điều kiện thường.\n\n" +
          "## Phản ứng hóa học\n" +
          "- Ở nhiệt độ cao và có xúc tác, nitrogen phản ứng với hydrogen tạo thành ammonia (quá trình Haber, xúc tác Fe, nhiệt độ và áp suất cao):\nN2 + 3H2 ⇌ 2NH3\n" +
          "- Ở nhiệt độ rất cao (tia lửa điện, sấm sét), nitrogen phản ứng với oxygen:\nN2 + O2 -> 2NO\n\n" +
          "## Ứng dụng\n" +
          "- Nitrogen là nguyên liệu quan trọng để sản xuất ammonia và phân đạm, đồng thời được dùng làm môi trường trơ trong công nghiệp và bảo quản thực phẩm.\n\n" +
          "## Ví dụ minh họa\n" +
          "Cho 2,24 lít khí N2 (đkc, n = 2,24/24,79 ≈ 0,09 mol) phản ứng với H2 dư, hiệu suất phản ứng 25%:\nN2 + 3H2 ⇌ 2NH3\n" +
          "- Số mol NH3 tính theo lí thuyết (hiệu suất 100%): 0,09 x 2 = 0,18 mol.\n" +
          "- Số mol NH3 thực tế thu được: 0,18 x 25% = 0,045 mol.\n\n" +
          "## Lưu ý\n" +
          "- Chính liên kết ba N≡N rất bền là lý do phản ứng tổng hợp NH3 cần nhiệt độ, áp suất cao và xúc tác mới xảy ra được với tốc độ đủ nhanh.",
      },
      {
        grade: 11,
        chapterId: l11c2.id,
        order: 4,
        title: "Bài 5. Ammonia - Muối ammonium",
        content:
          "## Ammonia\n" +
          "- NH3 là chất khí không màu, mùi khai xốc, tan rất nhiều trong nước, tạo dung dịch có tính base yếu:\nNH3 + H2O ⇌ NH4^+ + OH-\n" +
          "- Ammonia phản ứng với acid tạo thành muối ammonium:\nNH3 + HCl -> NH4Cl\n\n" +
          "## Muối ammonium\n" +
          "- Muối ammonium (chứa ion NH4^+) đều tan tốt trong nước.\n" +
          "- Khi đun nóng muối ammonium với dung dịch kiềm, giải phóng khí ammonia có mùi khai đặc trưng - đây là phản ứng dùng để nhận biết ion ammonium:\nNH4Cl + NaOH -> NaCl + NH3 + H2O\n\n" +
          "## Ứng dụng\n" +
          "- Ammonia và muối ammonium là nguyên liệu quan trọng để sản xuất phân đạm như urea, ammonium nitrate, ammonium sulfate.",
      },
      {
        grade: 11,
        chapterId: l11c2.id,
        order: 5,
        title: "Bài 6. Một số hợp chất của nitrogen với oxygen",
        content:
          "## Oxide của nitrogen\n" +
          "- NO (khí không màu), NO2 (khí màu nâu đỏ, độc) - sinh ra từ quá trình đốt cháy nhiên liệu ở nhiệt độ cao, là một trong các tác nhân gây mưa acid và ô nhiễm không khí.\n\n" +
          "## Nitric acid\n" +
          "- HNO3 là acid mạnh, có tính oxi hóa mạnh, đặc biệt khi ở dạng đặc và đun nóng.\n" +
          "- Phản ứng được với hầu hết kim loại (trừ Au, Pt), tạo muối nitrate và giải phóng các sản phẩm khử khác nhau của nitrogen (NO2, NO,...) tùy theo nồng độ acid.\n\n" +
          "## Muối nitrate\n" +
          "- Đều tan tốt trong nước; khi bị nhiệt phân sẽ giải phóng oxygen nên dễ gây cháy nổ nếu bảo quản không đúng cách.\n" +
          "- Được dùng phổ biến làm phân bón, ví dụ potassium nitrate, ammonium nitrate.\n\n" +
          "## Ví dụ minh họa\n" +
          "Cho Cu tác dụng với HNO3 đặc, nóng:\nCu + 4HNO3(đặc) -> Cu(NO3)2 + 2NO2 + 2H2O\n" +
          "- Với 6,4 gam Cu (n = 6,4/64 = 0,1 mol), theo phương trình n(NO2) = 2 x n(Cu) = 0,2 mol -> thể tích khí NO2 (màu nâu đỏ) thoát ra ở đkc: V = 0,2 x 24,79 = 4,958 lít.",
      },
      {
        grade: 11,
        chapterId: l11c2.id,
        order: 6,
        title: "Bài 7. Sulfur và sulfur dioxide",
        content:
          "## Sulfur\n" +
          "- Lưu huỳnh (S) là chất rắn màu vàng, không tan trong nước.\n" +
          "- Sulfur vừa có tính oxi hóa (khi tác dụng với kim loại, hydrogen) vừa có tính khử (khi tác dụng với oxygen hoặc các phi kim mạnh hơn).\n\n" +
          "## Sulfur dioxide\n" +
          "- SO2 là khí không màu, mùi hắc, độc; là một oxide acid, tan trong nước tạo thành sulfurous acid:\nSO2 + H2O ⇌ H2SO3\n" +
          "- SO2 vừa có tính oxi hóa vừa có tính khử do nguyên tử sulfur trong SO2 có số oxi hóa trung gian (+4).\n\n" +
          "## Tác động môi trường\n" +
          "- SO2 là một trong các tác nhân chính gây ra hiện tượng mưa acid.\n\n" +
          "## Ví dụ minh họa\n" +
          "Đốt cháy hoàn toàn 3,2 gam sulfur (S, M = 32 g/mol):\nS + O2 -> SO2\n" +
          "- Số mol S: n = 3,2/32 = 0,1 mol -> n(SO2) = 0,1 mol -> thể tích SO2 ở đkc: V = 0,1 x 24,79 = 2,479 lít.",
      },
      {
        grade: 11,
        chapterId: l11c2.id,
        order: 7,
        title: "Bài 8. Sulfuric acid và muối sulfate",
        content:
          "## Sulfuric acid loãng\n" +
          "- Có đầy đủ tính chất của một acid mạnh: làm quỳ tím hóa đỏ, tác dụng với kim loại đứng trước hydrogen giải phóng khí H2, tác dụng với base, oxide base và muối.\n\n" +
          "## Sulfuric acid đặc\n" +
          "- Có tính oxi hóa mạnh và tính háo nước rất mạnh (làm than hóa nhiều hợp chất hữu cơ như đường, giấy, vải).\n" +
          "- Phản ứng được với nhiều kim loại kể cả kim loại đứng sau hydrogen (như đồng) nhưng không giải phóng khí H2 mà tạo thành khí SO2:\nCu + 2H2SO4 -> CuSO4 + SO2 + 2H2O\n\n" +
          "## Nhận biết muối sulfate\n" +
          "- Dùng dung dịch BaCl2, tạo kết tủa trắng BaSO4 không tan trong acid.\n\n" +
          "## Ví dụ minh họa\n" +
          "Cho 5,6 gam Fe tác dụng hết với dung dịch H2SO4 loãng dư:\nFe + H2SO4 -> FeSO4 + H2\n" +
          "- Số mol Fe: n = 5,6/56 = 0,1 mol -> n(H2) = 0,1 mol -> thể tích H2 ở đkc: V = 0,1 x 24,79 = 2,479 lít.\n\n" +
          "## Ứng dụng\n" +
          "- Sulfuric acid là một trong những hóa chất quan trọng bậc nhất của công nghiệp, dùng để sản xuất phân bón, chất tẩy rửa, phẩm nhuộm và trong chế biến dầu mỏ.\n\n" +
          "## Lưu ý\n" +
          "- Khi pha loãng sulfuric acid đặc, phải rót từ từ acid vào nước (không làm ngược lại) để tránh bắn acid gây bỏng do phản ứng tỏa nhiệt rất mạnh.",
      },
    ],
  });

  // ================= LỚP 11 - CHƯƠNG 3: ĐẠI CƯƠNG HÓA HỮU CƠ =================
  await prisma.document.createMany({
    data: [
      {
        grade: 11,
        chapterId: l11c3.id,
        order: 8,
        title: "Bài 10. Hợp chất hữu cơ và hóa học hữu cơ",
        content:
          "## Khái niệm\n" +
          "- Hợp chất hữu cơ là hợp chất của carbon, trừ một số hợp chất đơn giản như oxide của carbon, muối carbonate, cyanide, carbide,... được xếp vào hợp chất vô cơ.\n" +
          "- Hóa học hữu cơ là ngành hóa học nghiên cứu về các hợp chất hữu cơ.\n\n" +
          "## Đặc điểm chung\n" +
          "- Liên kết trong phân tử chủ yếu là liên kết cộng hóa trị.\n" +
          "- Thường có nhiệt độ nóng chảy, nhiệt độ sôi thấp hơn so với nhiều hợp chất vô cơ; dễ cháy.\n" +
          "- Các phản ứng hữu cơ thường xảy ra chậm và có thể theo nhiều hướng khác nhau, tạo hỗn hợp sản phẩm.\n\n" +
          "## Phân loại\n" +
          "- Hydrocarbon: phân tử chỉ chứa carbon và hydrogen.\n" +
          "- Dẫn xuất của hydrocarbon: phân tử còn chứa thêm các nguyên tố khác như oxygen, nitrogen, halogen.\n\n" +
          "## Ví dụ minh họa\n" +
          "- CH4, C2H4, C6H6 là hydrocarbon (chỉ chứa C, H).\n" +
          "- C2H5OH (chứa thêm O), CH3NH2 (chứa thêm N), CH3Cl (chứa thêm Cl) là dẫn xuất của hydrocarbon.",
      },
      {
        grade: 11,
        chapterId: l11c3.id,
        order: 9,
        title: "Bài 11. Phương pháp tách biệt và tinh chế hợp chất hữu cơ",
        content:
          "## Chưng cất\n" +
          "- Phương pháp tách các chất lỏng có nhiệt độ sôi khác nhau, dựa vào sự khác biệt về độ bay hơi của chúng.\n\n" +
          "## Chiết\n" +
          "- Phương pháp tách chất dựa vào độ tan khác nhau của chất đó trong hai dung môi không trộn lẫn vào nhau (chiết lỏng - lỏng), hoặc dùng một dung môi hòa tan chọn lọc để tách chất cần thiết ra khỏi hỗn hợp rắn (chiết lỏng - rắn).\n\n" +
          "## Kết tinh\n" +
          "- Phương pháp tách chất rắn ra khỏi dung dịch, dựa vào sự khác nhau về độ tan của chất đó theo nhiệt độ; thường dùng để làm sạch (tinh chế) chất rắn.\n\n" +
          "## Sắc kí\n" +
          "- Phương pháp tách các chất trong hỗn hợp dựa vào sự khác nhau về tốc độ di chuyển của chúng khi được một pha động lôi cuốn qua một pha tĩnh.",
      },
      {
        grade: 11,
        chapterId: l11c3.id,
        order: 10,
        title: "Bài 12. Công thức phân tử hợp chất hữu cơ",
        content:
          "## Công thức đơn giản nhất\n" +
          "- Biểu thị tỉ lệ tối giản về số nguyên tử của các nguyên tố có trong phân tử hợp chất hữu cơ.\n\n" +
          "## Công thức phân tử\n" +
          "- Biểu thị đúng số lượng nguyên tử của mỗi nguyên tố có trong một phân tử hợp chất.\n\n" +
          "## Cách xác định\n" +
          "- Để lập được công thức phân tử của một hợp chất hữu cơ, cần xác định thành phần phần trăm khối lượng của các nguyên tố (thông qua phân tích định lượng) và phân tử khối của hợp chất đó (thông qua phổ khối lượng hoặc tỉ khối hơi so với một khí đã biết).\n\n" +
          "## Ví dụ minh họa\n" +
          "Hợp chất X có M = 46 g/mol, chứa 52,17% C, 13,05% H, 34,78% O về khối lượng. Tìm công thức phân tử:\n" +
          "- Khối lượng C: 46 x 52,17% ≈ 24 -> số nguyên tử C = 24/12 = 2.\n" +
          "- Khối lượng H: 46 x 13,05% ≈ 6 -> số nguyên tử H = 6/1 = 6.\n" +
          "- Khối lượng O: 46 x 34,78% ≈ 16 -> số nguyên tử O = 16/16 = 1.\n" +
          "- Công thức phân tử: C2H6O (chính là ethanol C2H5OH).",
      },
      {
        grade: 11,
        chapterId: l11c3.id,
        order: 11,
        title: "Bài 13. Cấu tạo hóa học hợp chất hữu cơ",
        content:
          "## Thuyết cấu tạo hóa học\n" +
          "- Trong phân tử hợp chất hữu cơ, các nguyên tử liên kết với nhau theo đúng hóa trị của chúng và theo một thứ tự nhất định; thứ tự liên kết đó được gọi là cấu tạo hóa học, quyết định tính chất của chất.\n\n" +
          "## Đồng đẳng\n" +
          "- Các hợp chất có thành phần phân tử hơn kém nhau một hay nhiều nhóm CH2 nhưng có tính chất hóa học tương tự nhau, hợp thành một dãy đồng đẳng.\n" +
          "- Ví dụ: dãy đồng đẳng của alkane gồm methane, ethane, propane,...\n\n" +
          "## Đồng phân\n" +
          "- Các hợp chất có cùng công thức phân tử nhưng có cấu tạo hóa học khác nhau nên có tính chất khác nhau.\n" +
          "- Ví dụ: đồng phân về mạch carbon, đồng phân về vị trí nhóm chức.",
      },
    ],
  });

  // ================= LỚP 11 - CHƯƠNG 4: HYDROCARBON =================
  await prisma.document.createMany({
    data: [
      {
        grade: 11,
        chapterId: l11c4.id,
        order: 12,
        title: "Bài 15. Alkane",
        content:
          "## Khái niệm\n" +
          "- Alkane (còn gọi là paraffin) là hydrocarbon no, mạch hở, công thức chung CnH2n+2 (n ≥ 1), trong phân tử chỉ có liên kết đơn C-C và C-H.\n\n" +
          "## Tính chất hóa học\n" +
          "- Phản ứng thế với halogen khi có ánh sáng.\n" +
          "- Phản ứng cháy tỏa nhiều nhiệt.\n" +
          "- Phản ứng tách (cracking, tách hydrogen) ở nhiệt độ cao có xúc tác, tạo thành hydrocarbon không no và/hoặc alkane có mạch ngắn hơn.\n\n" +
          "## Ứng dụng\n" +
          "- Alkane là thành phần chính của khí thiên nhiên, khí đồng hành và xăng dầu; được dùng làm nhiên liệu và là nguyên liệu quan trọng cho công nghiệp hóa dầu (thông qua phản ứng cracking).\n\n" +
          "## Ví dụ minh họa\n" +
          "Đốt cháy hoàn toàn 4,4 gam propane (C3H8, M = 44 g/mol):\nC3H8 + 5O2 -> 3CO2 + 4H2O\n" +
          "- Số mol C3H8: n = 4,4/44 = 0,1 mol -> n(CO2) = 0,3 mol -> khối lượng CO2: m = 0,3 x 44 = 13,2 gam.",
      },
      {
        grade: 11,
        chapterId: l11c4.id,
        order: 13,
        title: "Bài 16. Hydrocarbon không no",
        content:
          "## Alkene\n" +
          "- Hydrocarbon mạch hở có một liên kết đôi C=C, công thức chung CnH2n (n ≥ 2).\n" +
          "- Có phản ứng cộng (với H2, halogen, hydrogen halide), phản ứng trùng hợp, và phản ứng oxi hóa bởi dung dịch KMnO4 (làm mất màu tím của dung dịch).\n\n" +
          "## Alkyne\n" +
          "- Hydrocarbon mạch hở có một liên kết ba C≡C, công thức chung CnH2n-2 (n ≥ 2), ví dụ điển hình là acetylene (C2H2).\n" +
          "- Có phản ứng cộng (cộng được hai lần với H2, halogen, hydrogen halide), phản ứng trùng hợp.\n" +
          "- Alk-1-yne (alkyne có liên kết ba ở đầu mạch) còn có phản ứng thế với dung dịch AgNO3/NH3 tạo kết tủa vàng - phản ứng đặc trưng dùng để nhận biết.\n\n" +
          "## Ứng dụng\n" +
          "- Ethylene, propylene dùng sản xuất nhựa PE, PP; acetylene được dùng làm nhiên liệu cho đèn xì hàn cắt kim loại và làm nguyên liệu tổng hợp hữu cơ.\n\n" +
          "## Ví dụ minh họa\n" +
          "Dẫn 2,8 gam ethylene (C2H4, M = 28 g/mol) qua dung dịch bromine dư:\nC2H4 + Br2 -> C2H4Br2\n" +
          "- Số mol C2H4: n = 2,8/28 = 0,1 mol -> n(Br2) phản ứng = 0,1 mol -> khối lượng Br2 đã phản ứng: m = 0,1 x 160 = 16 gam.",
      },
      {
        grade: 11,
        chapterId: l11c4.id,
        order: 14,
        title: "Bài 17. Arene (Hydrocarbon thơm)",
        content:
          "## Khái niệm\n" +
          "- Arene là hydrocarbon có chứa một hay nhiều vòng benzene trong phân tử.\n" +
          "- Benzene (C6H6) là arene đơn giản nhất, có cấu trúc vòng 6 cạnh phẳng với hệ liên kết π liên hợp bền vững.\n\n" +
          "## Tính chất hóa học\n" +
          "- Do hệ vòng thơm khá bền vững, arene dễ tham gia phản ứng thế (thế bởi halogen, phản ứng nitro hóa) hơn là phản ứng cộng.\n" +
          "- Tuy vậy arene vẫn có phản ứng cộng với H2 (tạo cyclohexane, cần xúc tác và điều kiện đặc biệt) và phản ứng oxi hóa nhánh alkyl gắn trên vòng benzene.\n\n" +
          "## Ứng dụng\n" +
          "- Benzene, toluene, xylene là dung môi và nguyên liệu quan trọng trong công nghiệp hóa dầu, dùng để sản xuất chất dẻo, phẩm nhuộm, dược phẩm.",
      },
    ],
  });

  // ================= LỚP 11 - CHƯƠNG 5: DẪN XUẤT HALOGEN - ALCOHOL - PHENOL =================
  await prisma.document.createMany({
    data: [
      {
        grade: 11,
        chapterId: l11c5.id,
        order: 15,
        title: "Bài 19. Dẫn xuất halogen",
        content:
          "## Khái niệm\n" +
          "- Dẫn xuất halogen là hợp chất hữu cơ trong đó một hay nhiều nguyên tử hydrogen của hydrocarbon được thay thế bằng nguyên tử halogen (F, Cl, Br, I).\n\n" +
          "## Tính chất hóa học\n" +
          "- Phản ứng thế nguyên tử halogen bằng nhóm -OH khi đun nóng với dung dịch kiềm, tạo thành alcohol.\n" +
          "- Phản ứng tách hydrogen halide (HX) khi đun nóng với kiềm trong alcohol, tạo thành alkene.\n\n" +
          "## Ứng dụng và lưu ý\n" +
          "- Một số dẫn xuất halogen từng được dùng làm dung môi và chất làm lạnh (như CFC), nhưng do gây phá hủy tầng ozone nên hiện nay bị hạn chế sử dụng, được thay thế bằng các chất thân thiện với môi trường hơn.\n\n" +
          "## Ví dụ minh họa\n" +
          "C2H5Br + NaOH (đun nóng trong nước) -> C2H5OH + NaBr (phản ứng thế tạo alcohol).\n" +
          "C2H5Br + NaOH (đun nóng trong alcohol) -> C2H4 + NaBr + H2O (phản ứng tách tạo alkene) - cùng chất đầu nhưng điều kiện phản ứng khác nhau cho sản phẩm khác nhau.",
      },
      {
        grade: 11,
        chapterId: l11c5.id,
        order: 16,
        title: "Bài 20. Alcohol",
        content:
          "## Khái niệm\n" +
          "- Alcohol là hợp chất hữu cơ có nhóm chức hydroxyl (-OH) liên kết trực tiếp với nguyên tử carbon no.\n" +
          "- Công thức chung của alcohol no, đơn chức, mạch hở: CnH2n+1OH (n ≥ 1).\n\n" +
          "## Tính chất hóa học\n" +
          "- Phản ứng với kim loại kiềm (Na, K) giải phóng khí H2.\n" +
          "- Phản ứng ester hóa với carboxylic acid.\n" +
          "- Phản ứng tách nước (đun nóng với H2SO4 đặc) tạo thành alkene hoặc ether.\n" +
          "- Phản ứng oxi hóa: alcohol bậc 1 bị oxi hóa tạo aldehyde rồi carboxylic acid; alcohol bậc 2 bị oxi hóa tạo ketone.\n\n" +
          "## Polyalcohol\n" +
          "- Ethylene glycol và glycerol là các polyalcohol (đa chức) quan trọng.\n" +
          "- Glycerol có phản ứng đặc trưng với copper(II) hydroxide, tạo thành dung dịch màu xanh lam đặc trưng - dùng để nhận biết các polyalcohol có nhóm -OH liền kề nhau.\n\n" +
          "## Ví dụ minh họa\n" +
          "Cho 4,6 gam ethanol (C2H5OH, M = 46 g/mol) phản ứng hết với Na dư:\n2C2H5OH + 2Na -> 2C2H5ONa + H2\n" +
          "- Số mol ethanol: n = 4,6/46 = 0,1 mol -> n(H2) = 0,1/2 = 0,05 mol -> thể tích H2 ở đkc: V = 0,05 x 24,79 = 1,2395 lít.",
      },
      {
        grade: 11,
        chapterId: l11c5.id,
        order: 17,
        title: "Bài 21. Phenol",
        content:
          "## Khái niệm\n" +
          "- Phenol là hợp chất hữu cơ có nhóm -OH liên kết trực tiếp với nguyên tử carbon của vòng benzene. Phenol đơn giản nhất có công thức C6H5OH.\n\n" +
          "## Tính chất hóa học\n" +
          "- Có tính acid yếu (yếu hơn cả carbonic acid), phản ứng được với dung dịch NaOH tạo thành muối - đây là điểm khác biệt so với alcohol (alcohol không phản ứng với NaOH).\n" +
          "- Dễ tham gia phản ứng thế ở vòng benzene, ví dụ phản ứng với dung dịch bromine tạo kết tủa trắng 2,4,6-tribromophenol, dùng để nhận biết phenol.\n\n" +
          "## Ứng dụng\n" +
          "- Sản xuất nhựa phenol-formaldehyde (bakelite), phẩm nhuộm, thuốc diệt nấm mốc, chất khử trùng.\n\n" +
          "## Lưu ý\n" +
          "- Phenol có độc tính, cần sử dụng cẩn thận; đừng nhầm phenol với alcohol thơm - phenol có tính acid (phản ứng NaOH), alcohol thì không.",
      },
    ],
  });

  // ================= LỚP 11 - CHƯƠNG 6: HỢP CHẤT CARBONYL - CARBOXYLIC ACID =================
  await prisma.document.createMany({
    data: [
      {
        grade: 11,
        chapterId: l11c6.id,
        order: 18,
        title: "Bài 23. Hợp chất carbonyl",
        content:
          "## Khái niệm\n" +
          "- Hợp chất carbonyl là hợp chất hữu cơ chứa nhóm chức carbonyl (C=O), gồm hai loại: aldehyde (có nhóm -CHO ở đầu mạch) và ketone (nhóm C=O liên kết với hai gốc hydrocarbon).\n\n" +
          "## Tính chất hóa học đặc trưng của aldehyde\n" +
          "- Có tính khử, tham gia phản ứng tráng bạc (phản ứng với dung dịch AgNO3/NH3 tạo kết tủa bạc) - đây là phản ứng đặc trưng dùng để phân biệt aldehyde với ketone (ketone không có phản ứng này).\n" +
          "- Cả aldehyde và ketone đều có phản ứng cộng hydrogen (bị khử tạo thành alcohol tương ứng).\n\n" +
          "## Ứng dụng\n" +
          "- Formaldehyde (HCHO) dùng để sản xuất nhựa, làm chất bảo quản mẫu vật sinh học; acetone (CH3COCH3) là dung môi hữu cơ rất phổ biến.\n\n" +
          "## Ví dụ minh họa\n" +
          "Cho CH3CHO tác dụng với dung dịch AgNO3/NH3 dư:\nCH3CHO + 2AgNO3 + 3NH3 + H2O -> CH3COONH4 + 2Ag + 2NH4NO3\n" +
          "- Cứ 1 mol aldehyde tráng bạc tạo ra 2 mol Ag (kết tủa bạc sáng bóng) - tỉ lệ mol 1:2 này thường dùng để tính toán trong bài tập.",
      },
      {
        grade: 11,
        chapterId: l11c6.id,
        order: 19,
        title: "Bài 24. Carboxylic acid",
        content:
          "## Khái niệm\n" +
          "- Carboxylic acid là hợp chất hữu cơ có nhóm chức carboxyl (-COOH) liên kết với gốc hydrocarbon (hoặc với nguyên tử H).\n" +
          "- Công thức chung của carboxylic acid no, đơn chức, mạch hở: CnH2n+1COOH (n ≥ 0).\n\n" +
          "## Tính chất hóa học\n" +
          "- Có đầy đủ tính chất của một acid yếu: làm quỳ tím hóa đỏ, tác dụng với kim loại đứng trước hydrogen giải phóng khí H2, tác dụng với base, oxide base và muối carbonate.\n" +
          "- Phản ứng ester hóa với alcohol khi có xúc tác H2SO4 đặc, đun nóng.\n\n" +
          "## Ví dụ minh họa\n" +
          "- Acetic acid (CH3COOH) là carboxylic acid tiêu biểu, có trong giấm ăn.\n" +
          "- Formic acid (HCOOH) có trong nọc kiến, ngoài tính acid còn có thêm tính khử (do trong phân tử vẫn còn nhóm -CHO) nên cũng tham gia được phản ứng tráng bạc - đây là điểm khác biệt so với acetic acid.",
      },
    ],
  });

  // ================= LỚP 12 - CHƯƠNG 1: ESTER - LIPID =================
  await prisma.document.createMany({
    data: [
      {
        grade: 12,
        chapterId: l12c1.id,
        order: 1,
        title: "Bài 1. Ester - Lipid",
        content:
          "## Ester\n" +
          "- Là sản phẩm thay thế nhóm -OH ở nhóm carboxyl của carboxylic acid bằng nhóm -OR (gốc alcohol).\n" +
          "- Được điều chế bằng phản ứng ester hóa giữa carboxylic acid và alcohol, có xúc tác H2SO4 đặc, đun nóng; đây là phản ứng thuận nghịch:\nCH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O\n\n" +
          "## Lipid\n" +
          "- Gồm chất béo và một số hợp chất khác (sáp, steroid,...).\n" +
          "- Chất béo là trieste của glycerol với các acid béo (acid béo no như palmitic acid, stearic acid; acid béo không no như oleic acid).\n\n" +
          "## Phản ứng thủy phân chất béo\n" +
          "- Trong môi trường acid tạo glycerol và acid béo (phản ứng thuận nghịch).\n" +
          "- Trong môi trường kiềm tạo glycerol và muối của acid béo (xà phòng) - đây là phản ứng một chiều, gọi là phản ứng xà phòng hóa.\n\n" +
          "## Ví dụ minh họa\n" +
          "Xà phòng hóa hoàn toàn 17,8 gam tristearin (C17H35COO)3C3H5, M = 890 g/mol) bằng NaOH vừa đủ:\n" +
          "(C17H35COO)3C3H5 + 3NaOH -> 3C17H35COONa + C3H5(OH)3\n" +
          "- Số mol chất béo: n = 17,8/890 = 0,02 mol -> n(glycerol) = 0,02 mol -> khối lượng glycerol: m = 0,02 x 92 = 1,84 gam.",
      },
      {
        grade: 12,
        chapterId: l12c1.id,
        order: 2,
        title: "Bài 2. Xà phòng và chất giặt rửa",
        content:
          "## Xà phòng\n" +
          "- Là hỗn hợp muối sodium hoặc potassium của các acid béo.\n" +
          "- Làm sạch được nhờ cấu tạo phân tử gồm một đầu ưa nước (nhóm -COO-) và một đuôi kị nước (gốc hydrocarbon dài), giúp nhũ hóa chất béo, dầu mỡ bám bẩn vào trong nước để rửa trôi.\n\n" +
          "## Chất giặt rửa tổng hợp\n" +
          "- Có cấu tạo và cơ chế hoạt động tương tự xà phòng, nhưng được tổng hợp từ dầu mỏ.\n" +
          "- Ưu điểm: vẫn hoạt động tốt trong nước cứng, trong khi xà phòng bị giảm tác dụng trong nước cứng do tạo kết tủa với các ion Ca^2+, Mg^2+.",
      },
    ],
  });

  // ================= LỚP 12 - CHƯƠNG 2: CARBOHYDRATE =================
  await prisma.document.createMany({
    data: [
      {
        grade: 12,
        chapterId: l12c2.id,
        order: 3,
        title: "Bài 4. Giới thiệu về carbohydrate. Glucose và fructose",
        content:
          "## Phân loại chung\n" +
          "- Carbohydrate là những hợp chất hữu cơ tạp chức, đa số có công thức chung dạng Cn(H2O)m.\n" +
          "- Được chia thành ba nhóm: monosaccharide (glucose, fructose), disaccharide (saccharose, maltose) và polysaccharide (tinh bột, cellulose).\n\n" +
          "## Glucose\n" +
          "- C6H12O6, tồn tại chủ yếu ở dạng mạch vòng 6 cạnh trong dung dịch, nhưng vẫn chuyển hóa qua dạng mạch hở có nhóm -CHO nên có tính chất của aldehyde (phản ứng tráng bạc).\n" +
          "- Đồng thời có tính chất của polyalcohol do có nhiều nhóm -OH liền kề (phản ứng với copper(II) hydroxide tạo dung dịch màu xanh lam).\n\n" +
          "## Fructose\n" +
          "- C6H12O6, là đồng phân của glucose, tồn tại chủ yếu ở dạng mạch vòng 5 cạnh, có nhóm chức ketone ở dạng mạch hở.\n" +
          "- Trong môi trường kiềm, fructose có thể chuyển hóa thành glucose nên vẫn tham gia được phản ứng tráng bạc.\n\n" +
          "## Ví dụ minh họa\n" +
          "Lên men 18 gam glucose (M = 180 g/mol) với hiệu suất 80%:\nC6H12O6 -> 2C2H5OH + 2CO2\n" +
          "- Số mol glucose: n = 18/180 = 0,1 mol -> n(C2H5OH) lí thuyết = 0,2 mol.\n" +
          "- Khối lượng ethanol thực tế thu được: m = 0,2 x 46 x 80% = 7,36 gam.",
      },
      {
        grade: 12,
        chapterId: l12c2.id,
        order: 4,
        title: "Bài 5. Saccharose và maltose",
        content:
          "## Saccharose\n" +
          "- C12H22O11, là disaccharide được tạo bởi một gốc glucose và một gốc fructose liên kết với nhau.\n" +
          "- Không có tính khử (không tham gia phản ứng tráng bạc) do không còn nhóm -OH hemiacetal tự do, nhưng vẫn có tính chất của polyalcohol.\n" +
          "- Bị thủy phân trong môi trường acid tạo thành glucose và fructose.\n\n" +
          "## Maltose\n" +
          "- Đường mạch nha, C12H22O11, được tạo bởi hai gốc glucose liên kết với nhau.\n" +
          "- Khác với saccharose, maltose vẫn còn nhóm -OH hemiacetal tự do nên có tính khử, tham gia được phản ứng tráng bạc; khi thủy phân, maltose tạo ra glucose.\n\n" +
          "## Lưu ý\n" +
          "- Đây là điểm dễ nhầm: saccharose và maltose có cùng công thức phân tử C12H22O11 nhưng khác cấu tạo, dẫn tới saccharose KHÔNG tráng bạc được còn maltose thì CÓ.",
      },
      {
        grade: 12,
        chapterId: l12c2.id,
        order: 5,
        title: "Bài 6. Tinh bột và cellulose",
        content:
          "## Tinh bột\n" +
          "- Công thức (C6H10O5)n, gồm hai thành phần: amylose (mạch xoắn, không phân nhánh) và amylopectin (mạch phân nhánh).\n" +
          "- Có phản ứng màu đặc trưng với dung dịch iodine, tạo thành hợp chất màu xanh tím.\n" +
          "- Khi thủy phân hoàn toàn (nhờ acid hoặc enzyme), tinh bột tạo thành glucose.\n\n" +
          "## Cellulose\n" +
          "- Cũng có công thức (C6H10O5)n, có mạch thẳng, không phân nhánh, các mắt xích liên kết chặt chẽ tạo thành sợi bền vững; không có phản ứng màu với iodine như tinh bột.\n" +
          "- Khi thủy phân hoàn toàn, cellulose cũng tạo ra glucose.\n" +
          "- Được dùng làm nguyên liệu sản xuất giấy và tơ sợi (tơ visco, tơ acetate).",
      },
    ],
  });

  // ================= LỚP 12 - CHƯƠNG 3: HỢP CHẤT CHỨA NITROGEN =================
  await prisma.document.createMany({
    data: [
      {
        grade: 12,
        chapterId: l12c3.id,
        order: 6,
        title: "Bài 8. Amine",
        content:
          "## Khái niệm\n" +
          "- Amine là hợp chất hữu cơ được tạo ra khi thay thế một hay nhiều nguyên tử hydrogen trong phân tử ammonia (NH3) bằng gốc hydrocarbon.\n" +
          "- Amine được phân thành bậc 1, bậc 2, bậc 3 tùy theo số nguyên tử H trong NH3 bị thay thế.\n\n" +
          "## Tính chất hóa học\n" +
          "- Có tính base (do nguyên tử nitrogen còn cặp electron chưa liên kết), làm quỳ tím hóa xanh (đối với amine mạch hở), phản ứng được với acid tạo thành muối.\n\n" +
          "## Aniline\n" +
          "- C6H5NH2 là amine thơm quan trọng, có tính base yếu hơn so với amine no mạch hở do ảnh hưởng của vòng benzene.\n" +
          "- Phản ứng với dung dịch bromine tạo kết tủa trắng, tương tự phenol.\n\n" +
          "## Ví dụ minh họa\n" +
          "Cho 4,5 gam methylamine (CH3NH2, M = 31 g/mol) phản ứng vừa đủ với dung dịch HCl:\nCH3NH2 + HCl -> CH3NH3Cl\n" +
          "- Số mol CH3NH2: n = 4,5/31 ≈ 0,145 mol -> n(HCl) cần dùng = 0,145 mol (tỉ lệ mol 1:1 vì amine bậc 1 chỉ có 1 cặp electron tự do phản ứng với 1 phân tử acid).",
      },
      {
        grade: 12,
        chapterId: l12c3.id,
        order: 7,
        title: "Bài 9. Amino acid và peptide",
        content:
          "## Amino acid\n" +
          "- Hợp chất hữu cơ tạp chức, trong phân tử có đồng thời nhóm amino (-NH2) và nhóm carboxyl (-COOH).\n" +
          "- Có tính lưỡng tính, vừa phản ứng được với acid vừa phản ứng được với base.\n" +
          "- Trong dung dịch, amino acid tồn tại chủ yếu ở dạng ion lưỡng cực.\n\n" +
          "## Peptide\n" +
          "- Là hợp chất chứa từ 2 đến khoảng 50 gốc amino acid liên kết với nhau qua liên kết peptide (-CO-NH-).\n" +
          "- Liên kết peptide được hình thành giữa nhóm -COOH của amino acid này với nhóm -NH2 của amino acid kia, đồng thời giải phóng một phân tử nước.\n\n" +
          "## Ví dụ minh họa\n" +
          "Glycine (Gly, H2N-CH2-COOH) kết hợp với alanine (Ala) tạo đipeptide Gly-Ala:\nH2N-CH2-COOH + H2N-CH(CH3)-COOH -> H2N-CH2-CO-NH-CH(CH3)-COOH + H2O\n" +
          "- Một phân tử nước được giải phóng khi hình thành mỗi liên kết peptide; n amino acid tạo thành 1 chuỗi sẽ giải phóng (n-1) phân tử nước.",
      },
      {
        grade: 12,
        chapterId: l12c3.id,
        order: 8,
        title: "Bài 10. Protein và enzyme",
        content:
          "## Protein\n" +
          "- Là polypeptide có phân tử khối rất lớn, được tạo thành từ rất nhiều gốc amino acid liên kết với nhau.\n\n" +
          "## Tính chất\n" +
          "- Bị thủy phân (nhờ acid, base hoặc enzyme) tạo thành các amino acid.\n" +
          "- Bị đông tụ (biến tính, mất hoạt tính sinh học) khi đun nóng hoặc khi tác dụng với một số hóa chất.\n" +
          "- Có phản ứng màu biuret đặc trưng, tạo phức chất màu tím với copper(II) hydroxide - dùng để nhận biết protein.\n\n" +
          "## Enzyme\n" +
          "- Là chất xúc tác sinh học có bản chất là protein, có khả năng xúc tác đặc hiệu rất cao cho các phản ứng sinh hóa trong cơ thể sống.\n" +
          "- Tốc độ phản ứng khi có enzyme xúc tác thường nhanh hơn rất nhiều lần so với khi không có xúc tác.",
      },
    ],
  });

  // ================= LỚP 12 - CHƯƠNG 4: POLYMER =================
  await prisma.document.createMany({
    data: [
      {
        grade: 12,
        chapterId: l12c4.id,
        order: 9,
        title: "Bài 12. Đại cương về polymer",
        content:
          "## Khái niệm\n" +
          "- Polymer là hợp chất có phân tử khối rất lớn, do nhiều mắt xích monomer liên kết với nhau tạo thành.\n" +
          "- Hình thành thông qua phản ứng trùng hợp (monomer có liên kết bội hoặc vòng kém bền) hoặc phản ứng trùng ngưng (monomer có ít nhất hai nhóm chức có khả năng phản ứng, đồng thời giải phóng những phân tử nhỏ như nước).\n\n" +
          "## Cấu trúc mạch\n" +
          "- Mạch không phân nhánh, mạch phân nhánh, hoặc mạch mạng lưới (không gian).\n\n" +
          "## Tính chất vật lí\n" +
          "- Hầu hết polymer là chất rắn, không bay hơi, không có nhiệt độ nóng chảy xác định (nóng chảy trong một khoảng nhiệt độ).\n" +
          "- Nhiều polymer có tính dẻo, tính đàn hồi hoặc có thể kéo thành sợi.\n\n" +
          "## Ví dụ minh họa\n" +
          "Một mẫu PE (poly(ethylene), -[CH2-CH2]n-) có phân tử khối trung bình 280.000 g/mol:\n" +
          "- Hệ số trùng hợp n = 280.000 / 28 (M của mắt xích -CH2-CH2-) = 10.000 - nghĩa là mỗi phân tử PE được tạo thành từ khoảng 10.000 mắt xích ethylene liên kết với nhau.",
      },
      {
        grade: 12,
        chapterId: l12c4.id,
        order: 10,
        title: "Bài 13. Vật liệu polymer",
        content:
          "## Chất dẻo\n" +
          "- Vật liệu polymer có tính dẻo, có thể tạo hình dưới tác dụng của nhiệt độ và áp suất, ví dụ: polyethylene (PE), poly(vinyl chloride) (PVC), poly(methyl methacrylate) (thủy tinh hữu cơ).\n\n" +
          "## Tơ\n" +
          "- Vật liệu polymer hình sợi dài, mảnh, có độ bền nhất định, gồm tơ thiên nhiên (bông, tơ tằm) và tơ tổng hợp hoặc tơ nhân tạo (nylon, tơ capron, tơ visco).\n\n" +
          "## Cao su\n" +
          "- Vật liệu polymer có tính đàn hồi, gồm cao su thiên nhiên (lấy từ mủ cây cao su, thành phần chính là polyisoprene) và cao su tổng hợp (như cao su buna).\n\n" +
          "## Keo dán\n" +
          "- Vật liệu có khả năng kết dính hai bề mặt vật liệu với nhau mà không làm biến đổi bản chất của các vật liệu được kết dính.",
      },
    ],
  });

  // ================= LỚP 12 - CHƯƠNG 5: PIN ĐIỆN VÀ ĐIỆN PHÂN =================
  await prisma.document.createMany({
    data: [
      {
        grade: 12,
        chapterId: l12c5.id,
        order: 11,
        title: "Bài 15. Thế điện cực và nguồn điện hóa học",
        content:
          "## Thế điện cực chuẩn\n" +
          "- E° của một cặp oxi hóa - khử đặc trưng cho khả năng oxi hóa - khử của cặp đó trong điều kiện chuẩn, được xác định bằng cách so sánh với điện cực hydrogen chuẩn (quy ước E° của cặp 2H+/H2 bằng 0,00 V).\n" +
          "- Giá trị E° càng lớn (dương) thì dạng oxi hóa của cặp đó có tính oxi hóa càng mạnh; E° càng nhỏ (âm) thì dạng khử có tính khử càng mạnh.\n\n" +
          "## Ví dụ minh họa\n" +
          "- E°(Zn^2+/Zn) = -0,76 V; E°(Cu^2+/Cu) = +0,34 V.\n" +
          "- Vì E°(Cu^2+/Cu) > E°(Zn^2+/Zn) nên Cu^2+ có tính oxi hóa mạnh hơn Zn^2+, còn Zn có tính khử mạnh hơn Cu.\n\n" +
          "## Pin điện hóa\n" +
          "- Pin điện hóa (pin Galvani) gồm hai điện cực nhúng trong dung dịch chất điện li, nối với nhau bằng dây dẫn và cầu muối, chuyển hóa năng lượng của phản ứng oxi hóa - khử tự xảy ra thành điện năng.\n" +
          "- Suất điện động chuẩn của pin: E°(pin) = E°(cực dương) - E°(cực âm), luôn có giá trị dương.",
      },
      {
        grade: 12,
        chapterId: l12c5.id,
        order: 12,
        title: "Bài 16. Điện phân",
        content:
          "## Khái niệm\n" +
          "- Điện phân là quá trình sử dụng dòng điện một chiều để thực hiện phản ứng oxi hóa - khử không tự xảy ra, diễn ra tại các điện cực khi cho dòng điện đi qua chất điện li nóng chảy hoặc dung dịch chất điện li.\n\n" +
          "## Quá trình tại các điện cực\n" +
          "- Tại cathode (cực âm): xảy ra quá trình khử (ion dương nhận electron).\n" +
          "- Tại anode (cực dương): xảy ra quá trình oxi hóa (ion âm hoặc phân tử nhường electron).\n\n" +
          "## Ứng dụng\n" +
          "- Điện phân nóng chảy được dùng để điều chế các kim loại hoạt động mạnh như Na, K, Ca, Al.\n" +
          "- Điện phân dung dịch được dùng để điều chế một số kim loại trung bình hoặc yếu, để mạ điện và tinh luyện kim loại.\n\n" +
          "## Ví dụ minh họa\n" +
          "Điện phân dung dịch CuSO4 với điện cực trơ, cường độ dòng điện I = 5A trong thời gian t = 3860 giây:\n" +
          "- Áp dụng định luật Faraday: n(electron trao đổi) = It/F = (5 x 3860)/96500 = 0,2 mol.\n" +
          "- Tại cathode: Cu^2+ + 2e -> Cu, nên n(Cu) = 0,2/2 = 0,1 mol -> khối lượng Cu bám vào cathode: m = 0,1 x 64 = 6,4 gam.",
      },
    ],
  });

  // ================= LỚP 12 - CHƯƠNG 6: ĐẠI CƯƠNG VỀ KIM LOẠI =================
  await prisma.document.createMany({
    data: [
      {
        grade: 12,
        chapterId: l12c6.id,
        order: 13,
        title: "Bài 18. Cấu tạo và liên kết trong tinh thể kim loại",
        content:
          "## Cấu tạo tinh thể kim loại\n" +
          "- Được cấu tạo từ các nguyên tử và ion dương kim loại nằm ở các nút mạng tinh thể, xen giữa là các electron hóa trị chuyển động tự do - đây gọi là liên kết kim loại.\n\n" +
          "## Các kiểu mạng tinh thể\n" +
          "- Lập phương tâm khối, lập phương tâm diện, lục phương.\n\n" +
          "## Ý nghĩa\n" +
          "- Liên kết kim loại giải thích được các tính chất vật lí chung của kim loại như: tính dẻo, khả năng dẫn điện, dẫn nhiệt và có ánh kim.",
      },
      {
        grade: 12,
        chapterId: l12c6.id,
        order: 14,
        title: "Bài 19. Tính chất vật lí và tính chất hóa học của kim loại",
        content:
          "## Tính chất vật lí\n" +
          "- Tính dẻo, dẫn điện, dẫn nhiệt, có ánh kim - đều do các electron tự do trong tinh thể kim loại gây ra.\n\n" +
          "## Tính chất hóa học\n" +
          "- Tính chất hóa học chung của kim loại là tính khử (kim loại dễ nhường electron để tạo thành cation).\n" +
          "- Kim loại tác dụng được với phi kim, tác dụng với dung dịch acid, và tác dụng với dung dịch muối của kim loại yếu hơn.\n\n" +
          "## Ví dụ minh họa\n" +
          "Cho 2,7 gam Al (M = 27 g/mol) tác dụng hết với dung dịch HCl dư:\n2Al + 6HCl -> 2AlCl3 + 3H2\n" +
          "- Số mol Al: n = 2,7/27 = 0,1 mol -> n(H2) = 0,1 x 3/2 = 0,15 mol -> thể tích H2 ở đkc: V = 0,15 x 24,79 = 3,7185 lít.",
      },
      {
        grade: 12,
        chapterId: l12c6.id,
        order: 15,
        title: "Bài 20. Kim loại trong tự nhiên và phương pháp tách kim loại",
        content:
          "## Trạng thái tự nhiên\n" +
          "- Phần lớn kim loại tồn tại ở dạng hợp chất (quặng oxide, sulfide, muối,...); chỉ một số kim loại kém hoạt động (như Au, Ag, Pt) tồn tại ở dạng đơn chất.\n\n" +
          "## Nguyên tắc chung\n" +
          "- Khử ion kim loại thành nguyên tử kim loại.\n\n" +
          "## Ba phương pháp điều chế\n" +
          "- Nhiệt luyện: dùng chất khử như carbon, khí CO, nhôm ở nhiệt độ cao, áp dụng cho kim loại có độ hoạt động trung bình như Fe, Zn.\n" +
          "- Thủy luyện: dùng kim loại mạnh hơn để đẩy kim loại yếu hơn ra khỏi dung dịch muối, áp dụng cho kim loại yếu như Cu, Ag.\n" +
          "- Điện phân (thường là điện phân nóng chảy): áp dụng cho kim loại hoạt động mạnh như Na, K, Ca, Mg, Al.\n\n" +
          "## Ví dụ minh họa\n" +
          "Khử 16 gam Fe2O3 (M = 160 g/mol) bằng khí CO dư ở nhiệt độ cao (phương pháp nhiệt luyện):\nFe2O3 + 3CO -> 2Fe + 3CO2\n" +
          "- Số mol Fe2O3: n = 16/160 = 0,1 mol -> n(Fe) = 0,2 mol -> khối lượng Fe thu được: m = 0,2 x 56 = 11,2 gam.",
      },
      {
        grade: 12,
        chapterId: l12c6.id,
        order: 16,
        title: "Bài 21. Hợp kim",
        content:
          "## Khái niệm\n" +
          "- Hợp kim là vật liệu kim loại có chứa một kim loại cơ bản và một số kim loại hoặc phi kim khác.\n" +
          "- So với kim loại thành phần, hợp kim thường có độ cứng cao hơn, đôi khi có nhiệt độ nóng chảy thấp hơn.\n\n" +
          "## Ví dụ\n" +
          "- Thép và gang: hợp kim của sắt với carbon (gang có hàm lượng carbon cao hơn thép).\n" +
          "- Duralumin: hợp kim của nhôm với đồng, magnesium.\n" +
          "- Đồng thau: hợp kim của đồng với kẽm.\n" +
          "- Đồng thanh: hợp kim của đồng với thiếc.",
      },
      {
        grade: 12,
        chapterId: l12c6.id,
        order: 17,
        title: "Bài 22. Sự ăn mòn kim loại",
        content:
          "## Khái niệm\n" +
          "- Ăn mòn kim loại là sự phá hủy kim loại do phản ứng oxi hóa - khử giữa kim loại với các chất trong môi trường.\n\n" +
          "## Ăn mòn hóa học\n" +
          "- Kim loại phản ứng trực tiếp với chất oxi hóa trong môi trường (như oxygen, hơi nước ở nhiệt độ cao), không phát sinh dòng điện.\n\n" +
          "## Ăn mòn điện hóa\n" +
          "- Xảy ra khi kim loại tiếp xúc với một kim loại khác (hoặc phi kim) trong môi trường chất điện li, hình thành các cặp điện cực (giống như một pin điện hóa).\n" +
          "- Kim loại hoạt động mạnh hơn đóng vai trò cực âm và bị ăn mòn (bị oxi hóa). Đây là dạng ăn mòn phổ biến và nghiêm trọng nhất, ví dụ điển hình là hiện tượng gỉ sắt.\n\n" +
          "## Biện pháp chống ăn mòn\n" +
          "- Sơn phủ bề mặt, mạ kim loại không bị ăn mòn.\n" +
          "- Dùng phương pháp bảo vệ điện hóa: gắn thêm một kim loại hoạt động mạnh hơn làm \"vật hi sinh\", ví dụ gắn khối kẽm để bảo vệ vỏ tàu biển bằng thép khỏi bị ăn mòn.",
      },
    ],
  });

  // ================= LỚP 12 - CHƯƠNG 7: NHÓM IA VÀ NHÓM IIA =================
  await prisma.document.createMany({
    data: [
      {
        grade: 12,
        chapterId: l12c7.id,
        order: 18,
        title: "Bài 24. Nguyên tố nhóm IA",
        content:
          "## Vị trí, cấu tạo\n" +
          "- Nhóm IA gồm các kim loại kiềm: lithium (Li), sodium (Na), potassium (K), rubidium (Rb), caesium (Cs).\n" +
          "- Nguyên tử của các nguyên tố này có 1 electron ở lớp ngoài cùng nên dễ nhường 1 electron tạo thành ion +1, thể hiện tính khử rất mạnh, tăng dần từ Li đến Cs.\n\n" +
          "## Tính chất\n" +
          "- Kim loại kiềm là kim loại nhẹ, mềm, có nhiệt độ nóng chảy thấp.\n" +
          "- Phản ứng mạnh với nước ngay ở điều kiện thường, tạo thành dung dịch base và giải phóng khí H2:\n2Na + 2H2O -> 2NaOH + H2\n" +
          "- Cũng phản ứng mạnh với oxygen và halogen.\n\n" +
          "## Hợp chất quan trọng\n" +
          "- NaOH (xút, dùng sản xuất xà phòng, giấy, tơ sợi).\n" +
          "- Na2CO3 (soda, dùng sản xuất thủy tinh, chất tẩy rửa).\n" +
          "- NaHCO3 (dùng trong thực phẩm và y tế).\n\n" +
          "## Ví dụ minh họa\n" +
          "Cho 4,6 gam Na (M = 23 g/mol) tác dụng hết với nước:\n2Na + 2H2O -> 2NaOH + H2\n" +
          "- Số mol Na: n = 4,6/23 = 0,2 mol -> n(H2) = 0,1 mol -> thể tích H2 ở đkc: V = 0,1 x 24,79 = 2,479 lít.",
      },
      {
        grade: 12,
        chapterId: l12c7.id,
        order: 19,
        title: "Bài 25. Nguyên tố nhóm IIA",
        content:
          "## Vị trí, cấu tạo\n" +
          "- Nhóm IIA gồm các kim loại kiềm thổ: beryllium (Be), magnesium (Mg), calcium (Ca), strontium (Sr), barium (Ba).\n" +
          "- Nguyên tử của các nguyên tố này có 2 electron ở lớp ngoài cùng, dễ nhường 2 electron tạo thành ion +2, thể hiện tính khử mạnh (yếu hơn kim loại kiềm cùng chu kì).\n\n" +
          "## Tính chất\n" +
          "- Beryllium không phản ứng với nước.\n" +
          "- Magnesium phản ứng chậm với nước ở nhiệt độ thường (phản ứng nhanh hơn khi đun nóng).\n" +
          "- Calcium, strontium, barium phản ứng được với nước ngay ở điều kiện thường, tạo thành base và giải phóng khí H2.\n\n" +
          "## Hợp chất quan trọng\n" +
          "- CaCO3 (thành phần chính của đá vôi, đá phấn), CaO (vôi sống), Ca(OH)2 (vôi tôi), thạch cao (CaSO4.2H2O).\n\n" +
          "## Nước cứng\n" +
          "- Là nước chứa nhiều ion Ca^2+, Mg^2+, gây nhiều tác hại như đóng cặn đường ống nước, làm giảm tác dụng của xà phòng.\n" +
          "- Có thể làm mềm nước cứng bằng phương pháp trao đổi ion hoặc phương pháp kết tủa.\n\n" +
          "## Ví dụ minh họa\n" +
          "Làm mềm nước cứng tạm thời (chứa Ca(HCO3)2) bằng cách đun nóng:\nCa(HCO3)2 -> CaCO3 + CO2 + H2O\n" +
          "- Ca(HCO3)2 tan bị phân hủy thành CaCO3 kết tủa (dễ lọc bỏ), giải thích vì sao ấm đun nước lâu ngày bị đóng cặn trắng ở đáy.",
      },
    ],
  });

  // ================= LỚP 12 - CHƯƠNG 8: KIM LOẠI CHUYỂN TIẾP VÀ PHỨC CHẤT =================
  await prisma.document.createMany({
    data: [
      {
        grade: 12,
        chapterId: l12c8.id,
        order: 20,
        title: "Bài 27. Đại cương về kim loại chuyển tiếp dãy thứ nhất",
        content:
          "## Vị trí, cấu tạo\n" +
          "- Kim loại chuyển tiếp dãy thứ nhất gồm các nguyên tố từ Sc đến Zn (thuộc chu kì 4, các nhóm B), có electron hóa trị điền vào cả phân lớp d.\n\n" +
          "## Đặc điểm nổi bật\n" +
          "- Thường có nhiều số oxi hóa khác nhau trong hợp chất (do các electron d dễ tham gia liên kết).\n" +
          "- Hợp chất của chúng thường có màu sắc đặc trưng (do sự chuyển electron trong phân lớp d chưa lấp đầy).\n" +
          "- Có khả năng tạo phức chất tốt.\n\n" +
          "## Ví dụ\n" +
          "- Iron (Fe), copper (Cu), zinc (Zn) là các kim loại chuyển tiếp quan trọng, có nhiều ứng dụng trong đời sống và công nghiệp.",
      },
      {
        grade: 12,
        chapterId: l12c8.id,
        order: 21,
        title: "Bài 28. Sơ lược về phức chất",
        content:
          "## Khái niệm\n" +
          "- Phức chất là hợp chất được tạo thành từ một ion kim loại (thường là kim loại chuyển tiếp) liên kết với một số phân tử hoặc ion khác gọi là phối tử (ligand), thông qua liên kết cho - nhận.\n\n" +
          "## Số phối trí\n" +
          "- Là số liên kết cho - nhận được hình thành giữa nguyên tử trung tâm với các phối tử xung quanh nó.\n\n" +
          "## Ví dụ minh họa\n" +
          "- Khi cho dung dịch ammonia dư vào dung dịch muối copper(II), tạo thành ion phức [Cu(NH3)4]^2+ có màu xanh lam đậm đặc trưng.",
      },
      {
        grade: 12,
        chapterId: l12c8.id,
        order: 22,
        title: "Bài 29. Một số tính chất và ứng dụng của phức chất",
        content:
          "## Tính chất\n" +
          "- Phức chất thường có màu sắc đặc trưng, được ứng dụng để nhận biết một số ion kim loại.\n" +
          "- Ví dụ: nhận biết ion Cu^2+ qua phức [Cu(NH3)4]^2+ có màu xanh lam đậm; nhận biết ion Fe^3+ qua phức có màu đỏ máu khi phản ứng với ion thiocyanate.\n\n" +
          "## Ứng dụng\n" +
          "- Làm xúc tác trong công nghiệp hóa học.\n" +
          "- Một số phức chất được dùng làm thuốc điều trị bệnh (ví dụ cisplatin dùng trong điều trị ung thư).\n" +
          "- Có vai trò sinh học quan trọng: hemoglobin trong máu chứa phức chất của iron với vòng porphyrin; chlorophyll ở thực vật chứa phức chất của magnesium.",
      },
    ],
  });

  // ================= QUIZ: LỚP 11 =================
  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Cân bằng hóa học (Chương 1 - Lớp 11)",
      grade: 11,
      chapterId: l11c1.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Cân bằng hóa học là trạng thái mà:",
            choices: JSON.stringify([
              "Phản ứng đã dừng hẳn, không còn xảy ra nữa",
              "Tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch",
              "Chỉ còn lại chất sản phẩm trong hệ",
              "Nồng độ tất cả các chất luôn bằng nhau",
            ]),
            correctIndex: 1,
            explanation: "Cân bằng hóa học là một cân bằng động: phản ứng thuận và nghịch vẫn xảy ra nhưng với tốc độ bằng nhau.",
          },
          {
            order: 2,
            content: "Kí hiệu nào dùng để biểu diễn một phản ứng thuận nghịch?",
            choices: JSON.stringify(["->", "=>", "⇌", "="]),
            correctIndex: 2,
            explanation: "Mũi tên hai chiều ⇌ biểu diễn phản ứng thuận nghịch, xảy ra theo cả hai chiều.",
          },
          {
            order: 3,
            content: "Theo nguyên lí Le Chatelier, khi tăng nồng độ chất phản ứng, cân bằng sẽ chuyển dịch theo chiều nào?",
            choices: JSON.stringify([
              "Không thay đổi",
              "Chiều thuận (làm giảm nồng độ chất phản ứng)",
              "Chiều nghịch",
              "Phản ứng dừng lại hoàn toàn",
            ]),
            correctIndex: 1,
            explanation: "Cân bằng chuyển dịch theo chiều làm giảm tác động (ở đây là giảm bớt nồng độ chất phản ứng vừa tăng thêm).",
          },
          {
            order: 4,
            content: "Ở 25°C, nước tinh khiết có nồng độ ion H+ bằng bao nhiêu?",
            choices: JSON.stringify(["10^-7 mol/L", "10^-14 mol/L", "10^-1 mol/L", "1 mol/L"]),
            correctIndex: 0,
            explanation: "Ở 25°C, Kw = [H+][OH-] = 10^-14, và trong nước tinh khiết [H+] = [OH-] = 10^-7 mol/L.",
          },
          {
            order: 5,
            content: "Một dung dịch base sẽ có giá trị pH như thế nào?",
            choices: JSON.stringify(["Nhỏ hơn 7", "Bằng 7", "Lớn hơn 7", "Luôn luôn bằng 14"]),
            correctIndex: 2,
            explanation: "Dung dịch base có pH lớn hơn 7 (ở 25°C).",
          },
          {
            order: 6,
            content: "Ở một nhiệt độ xác định, phản ứng N2O4 ⇌ 2NO2 đạt cân bằng với [N2O4]=0,2M, [NO2]=0,4M. Hằng số cân bằng Kc là?",
            choices: JSON.stringify(["0,4", "0,8", "1,6", "2,0"]),
            correctIndex: 1,
            explanation: "Kc = [NO2]^2/[N2O4] = 0,4^2/0,2 = 0,16/0,2 = 0,8.",
          },
          {
            order: 7,
            content: "Một dung dịch có pH = 4. Nồng độ ion H+ trong dung dịch là bao nhiêu?",
            choices: JSON.stringify(["10^-4 mol/L", "4 mol/L", "10^4 mol/L", "0,4 mol/L"]),
            correctIndex: 0,
            explanation: "pH = -log[H+] = 4 -> [H+] = 10^-4 mol/L.",
          },
          {
            order: 8,
            content: "Khi tăng áp suất của hệ cân bằng có chất khí, cân bằng sẽ chuyển dịch theo chiều nào?",
            choices: JSON.stringify([
              "Chiều làm tăng số mol khí",
              "Chiều làm giảm số mol khí",
              "Không chuyển dịch",
              "Luôn chuyển dịch theo chiều thuận",
            ]),
            correctIndex: 1,
            explanation: "Theo Le Chatelier, khi tăng áp suất, cân bằng chuyển dịch theo chiều làm giảm số mol khí để giảm áp suất.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Nitrogen - Sulfur (Chương 2 - Lớp 11)",
      grade: 11,
      chapterId: l11c2.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Trong phân tử N2, hai nguyên tử nitrogen liên kết với nhau bằng loại liên kết nào?",
            choices: JSON.stringify(["Liên kết đơn", "Liên kết đôi", "Liên kết ba", "Liên kết ion"]),
            correctIndex: 2,
            explanation: "Phân tử N2 có liên kết ba (N≡N) rất bền vững, khiến nitrogen khá trơ ở điều kiện thường.",
          },
          {
            order: 2,
            content: "Dung dịch ammonia (NH3) trong nước có môi trường gì?",
            choices: JSON.stringify(["Acid mạnh", "Base yếu", "Trung tính", "Acid yếu"]),
            correctIndex: 1,
            explanation: "NH3 + H2O ⇌ NH4^+ + OH-, tạo môi trường base yếu.",
          },
          {
            order: 3,
            content: "Đun nóng muối ammonium với dung dịch kiềm sẽ giải phóng khí gì (dùng để nhận biết)?",
            choices: JSON.stringify(["H2", "NH3", "CO2", "SO2"]),
            correctIndex: 1,
            explanation: "Khí NH3 sinh ra có mùi khai đặc trưng, dùng để nhận biết ion ammonium.",
          },
          {
            order: 4,
            content: "Sulfuric acid đặc, nóng phản ứng với đồng (Cu) sinh ra khí gì?",
            choices: JSON.stringify(["H2", "SO2", "H2S", "O2"]),
            correctIndex: 1,
            explanation: "Cu + 2H2SO4 (đặc) -> CuSO4 + SO2 + 2H2O. Sulfuric acid đặc có tính oxi hóa mạnh nên không giải phóng H2.",
          },
          {
            order: 5,
            content: "Dùng dung dịch BaCl2 để nhận biết ion nào trong dung dịch (tạo kết tủa trắng)?",
            choices: JSON.stringify(["Cl-", "NO3^-", "SO4^2-", "CO3^2-"]),
            correctIndex: 2,
            explanation: "BaCl2 + SO4^2- tạo kết tủa trắng BaSO4 không tan trong acid.",
          },
          {
            order: 6,
            content: "Cho 3,36 lít khí N2 (đkc, n≈0,1355 mol - làm tròn 0,3 mol theo tỉ lệ phản ứng hoàn toàn) phản ứng vừa đủ với H2 tạo NH3: N2+3H2⇌2NH3. Nếu hiệu suất 100%, thể tích NH3 (đkc) gấp bao nhiêu lần thể tích N2 ban đầu?",
            choices: JSON.stringify(["1 lần", "1,5 lần", "2 lần", "3 lần"]),
            correctIndex: 2,
            explanation: "Theo phương trình, tỉ lệ mol N2 : NH3 = 1 : 2 nên ở cùng điều kiện, thể tích NH3 luôn gấp 2 lần thể tích N2 phản ứng.",
          },
          {
            order: 7,
            content: "Kim loại nào sau đây KHÔNG phản ứng được với dung dịch HNO3 (kể cả đặc, nóng)?",
            choices: JSON.stringify(["Fe", "Cu", "Au", "Zn"]),
            correctIndex: 2,
            explanation: "Au (vàng) và Pt là 2 kim loại không phản ứng với HNO3 dù đặc và nóng.",
          },
          {
            order: 8,
            content: "Vì sao cần rót từ từ acid sulfuric đặc vào nước khi pha loãng, không làm ngược lại?",
            choices: JSON.stringify([
              "Vì phản ứng hòa tan tỏa nhiệt rất mạnh, làm ngược lại có thể bắn acid gây bỏng",
              "Vì nước nặng hơn acid",
              "Vì acid sẽ bay hơi hết",
              "Vì không có lý do đặc biệt nào",
            ]),
            correctIndex: 0,
            explanation: "Khi hòa tan H2SO4 đặc vào nước, phản ứng tỏa nhiệt rất mạnh; nếu đổ nước vào acid, nhiệt tỏa ra đột ngột có thể làm nước sôi bắn acid ra ngoài gây bỏng nặng.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Đại cương hóa học hữu cơ (Chương 3 - Lớp 11)",
      grade: 11,
      chapterId: l11c3.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Hợp chất hữu cơ là hợp chất của nguyên tố nào?",
            choices: JSON.stringify(["Nitrogen", "Carbon", "Oxygen", "Hydrogen"]),
            correctIndex: 1,
            explanation: "Hợp chất hữu cơ là hợp chất của carbon (trừ một số hợp chất đơn giản như CO2, muối carbonate).",
          },
          {
            order: 2,
            content: "Phương pháp nào dùng để tách các chất lỏng dựa vào sự khác nhau về nhiệt độ sôi?",
            choices: JSON.stringify(["Chiết", "Kết tinh", "Chưng cất", "Sắc kí"]),
            correctIndex: 2,
            explanation: "Chưng cất tách các chất lỏng dựa vào độ bay hơi (nhiệt độ sôi) khác nhau.",
          },
          {
            order: 3,
            content: "Các chất trong cùng một dãy đồng đẳng có đặc điểm gì?",
            choices: JSON.stringify([
              "Có cùng công thức phân tử",
              "Tính chất hóa học tương tự nhau, hơn kém nhau một hay nhiều nhóm CH2",
              "Cấu tạo hoàn toàn giống nhau",
              "Không có mối liên hệ nào với nhau",
            ]),
            correctIndex: 1,
            explanation: "Đồng đẳng là các chất có tính chất tương tự, thành phần phân tử hơn kém nhau một hay nhiều nhóm CH2.",
          },
          {
            order: 4,
            content: "Đồng phân là các chất:",
            choices: JSON.stringify([
              "Có cùng công thức phân tử nhưng cấu tạo hóa học khác nhau",
              "Có cùng cấu tạo nhưng công thức phân tử khác nhau",
              "Có tính chất hóa học giống hệt nhau",
              "Không tồn tại trong hóa học hữu cơ",
            ]),
            correctIndex: 0,
            explanation: "Đồng phân là những chất có cùng công thức phân tử nhưng khác nhau về cấu tạo hóa học nên tính chất khác nhau.",
          },
          {
            order: 5,
            content: "Hợp chất X có M=46 g/mol, chứa 52,17%C, 13,05%H, 34,78%O. Công thức phân tử của X là?",
            choices: JSON.stringify(["CH4O", "C2H6O", "C2H4O2", "C3H8O"]),
            correctIndex: 1,
            explanation: "Số nguyên tử C = (46x0,5217)/12=2; H=(46x0,1305)/1=6; O=(46x0,3478)/16=1 -> công thức C2H6O." ,
          },
          {
            order: 6,
            content: "Phương pháp nào tách chất dựa vào độ tan khác nhau trong hai dung môi không trộn lẫn?",
            choices: JSON.stringify(["Chưng cất", "Chiết", "Kết tinh", "Sắc kí"]),
            correctIndex: 1,
            explanation: "Chiết tách chất dựa vào độ tan khác nhau của chất trong hai dung môi không trộn lẫn (chiết lỏng-lỏng).",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Hydrocarbon (Chương 4 - Lớp 11)",
      grade: 11,
      chapterId: l11c4.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Alkane chỉ có loại liên kết nào trong phân tử?",
            choices: JSON.stringify(["Chỉ liên kết đơn", "Có liên kết đôi", "Có liên kết ba", "Liên kết ion"]),
            correctIndex: 0,
            explanation: "Alkane là hydrocarbon no, chỉ có liên kết đơn C-C và C-H.",
          },
          {
            order: 2,
            content: "Chất nào sau đây là alkyne?",
            choices: JSON.stringify(["C2H4", "C2H6", "C2H2", "C6H6"]),
            correctIndex: 2,
            explanation: "C2H2 (acetylene) có công thức CnH2n-2, là alkyne (có liên kết ba).",
          },
          {
            order: 3,
            content: "Phản ứng đặc trưng để nhận biết alk-1-yne (alkyne có liên kết ba ở đầu mạch) là phản ứng với:",
            choices: JSON.stringify(["Dung dịch AgNO3/NH3", "Dung dịch NaOH", "Dung dịch HCl", "Nước"]),
            correctIndex: 0,
            explanation: "Alk-1-yne phản ứng với dung dịch AgNO3/NH3 tạo kết tủa vàng, dùng để nhận biết.",
          },
          {
            order: 4,
            content: "Benzene có công thức phân tử là gì?",
            choices: JSON.stringify(["C6H6", "C6H12", "C6H14", "C5H5"]),
            correctIndex: 0,
            explanation: "Benzene, arene đơn giản nhất, có công thức phân tử C6H6.",
          },
          {
            order: 5,
            content: "So với phản ứng cộng, arene dễ tham gia loại phản ứng nào hơn?",
            choices: JSON.stringify(["Phản ứng thế", "Phản ứng trùng hợp", "Phản ứng oxi hóa hoàn toàn", "Phản ứng thủy phân"]),
            correctIndex: 0,
            explanation: "Do hệ vòng thơm bền vững, arene dễ tham gia phản ứng thế hơn là phản ứng cộng.",
          },
          {
            order: 6,
            content: "Đốt cháy hoàn toàn 2,8 gam C2H4 (M=28) thì thu được bao nhiêu gam CO2? (C2H4+3O2->2CO2+2H2O)",
            choices: JSON.stringify(["4,4 gam", "8,8 gam", "13,2 gam", "17,6 gam"]),
            correctIndex: 1,
            explanation: "n(C2H4)=2,8/28=0,1 mol -> n(CO2)=0,2 mol -> m=0,2x44=8,8 gam.",
          },
          {
            order: 7,
            content: "Dẫn khí propene (CH2=CH-CH3) qua dung dịch bromine, hiện tượng quan sát được là gì?",
            choices: JSON.stringify([
              "Dung dịch bromine bị mất màu",
              "Xuất hiện kết tủa trắng",
              "Có khí thoát ra",
              "Không có hiện tượng gì",
            ]),
            correctIndex: 0,
            explanation: "Propene có liên kết đôi C=C nên phản ứng cộng với Br2, làm mất màu dung dịch bromine (phản ứng đặc trưng của alkene).",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Dẫn xuất halogen - Alcohol - Phenol (Chương 5 - Lớp 11)",
      grade: 11,
      chapterId: l11c5.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Alcohol có nhóm chức nào?",
            choices: JSON.stringify(["-COOH", "-OH liên kết với carbon no", "-CHO", "-NH2"]),
            correctIndex: 1,
            explanation: "Alcohol có nhóm chức hydroxyl (-OH) liên kết trực tiếp với carbon no.",
          },
          {
            order: 2,
            content: "Alcohol phản ứng với kim loại sodium (Na) giải phóng khí gì?",
            choices: JSON.stringify(["O2", "H2", "N2", "CO2"]),
            correctIndex: 1,
            explanation: "Alcohol phản ứng với Na giải phóng khí H2, tương tự phản ứng của nước với Na.",
          },
          {
            order: 3,
            content: "Điểm khác biệt giữa phenol và alcohol thông thường là gì?",
            choices: JSON.stringify([
              "Phenol phản ứng được với dung dịch NaOH, còn alcohol thường thì không",
              "Phenol không có nhóm -OH",
              "Phenol không phản ứng với Na",
              "Phenol không có tính acid",
            ]),
            correctIndex: 0,
            explanation: "Phenol có tính acid yếu nên phản ứng được với NaOH tạo muối, khác với alcohol.",
          },
          {
            order: 4,
            content: "Nhóm -OH trong phân tử phenol liên kết trực tiếp với:",
            choices: JSON.stringify([
              "Carbon no mạch hở",
              "Carbon của vòng benzene",
              "Nguyên tử nitrogen",
              "Carbon của nhóm carbonyl",
            ]),
            correctIndex: 1,
            explanation: "Phenol có nhóm -OH liên kết trực tiếp với carbon của vòng benzene.",
          },
          {
            order: 5,
            content: "Cho 9,2 gam ethanol (C2H5OH, M=46) tác dụng hết với Na dư. Thể tích khí H2 thu được ở đkc là?",
            choices: JSON.stringify(["2,479 lít", "4,958 lít", "7,437 lít", "9,916 lít"]),
            correctIndex: 0,
            explanation: "n(C2H5OH)=9,2/46=0,2 mol; 2C2H5OH+2Na->2C2H5ONa+H2 nên n(H2)=0,1 mol -> V=0,1x24,79=2,479 lít.",
          },
          {
            order: 6,
            content: "Đun etanol với H2SO4 đặc ở 170°C tạo sản phẩm chính nào?",
            choices: JSON.stringify(["Ether", "Ethylene (phản ứng tách nước)", "Ethyl hydrogen sulfate", "Acetic acid"]),
            correctIndex: 1,
            explanation: "Ở 170°C với H2SO4 đặc, ethanol bị tách nước tạo ethylene: C2H5OH -> C2H4 + H2O.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Hợp chất carbonyl - Carboxylic acid (Chương 6 - Lớp 11)",
      grade: 11,
      chapterId: l11c6.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Phản ứng tráng bạc là phản ứng đặc trưng của nhóm chức nào?",
            choices: JSON.stringify(["-OH", "-CHO", "-COOH", "-NH2"]),
            correctIndex: 1,
            explanation: "Nhóm -CHO (aldehyde) có tính khử, tham gia phản ứng tráng bạc với dung dịch AgNO3/NH3.",
          },
          {
            order: 2,
            content: "Carboxylic acid có nhóm chức nào?",
            choices: JSON.stringify(["-CHO", "-COOH", "-OH", "Nhóm carbonyl của ketone"]),
            correctIndex: 1,
            explanation: "Carboxylic acid có nhóm chức carboxyl -COOH.",
          },
          {
            order: 3,
            content: "Formic acid (HCOOH) có tính chất đặc biệt nào mà acetic acid không có?",
            choices: JSON.stringify([
              "Tính acid",
              "Tham gia phản ứng tráng bạc (có tính khử)",
              "Phản ứng ester hóa",
              "Làm quỳ tím hóa đỏ",
            ]),
            correctIndex: 1,
            explanation: "Formic acid còn nhóm -CHO trong phân tử nên có thêm tính khử, tham gia được phản ứng tráng bạc.",
          },
          {
            order: 4,
            content: "Carboxylic acid phản ứng với alcohol (xúc tác H2SO4 đặc, đun nóng) tạo ra sản phẩm chính nào?",
            choices: JSON.stringify(["Aldehyde", "Ester", "Ketone", "Amine"]),
            correctIndex: 1,
            explanation: "Đây là phản ứng ester hóa, tạo ra ester và nước.",
          },
          {
            order: 5,
            content: "Cho 3 gam CH3CHO tác dụng hết với dung dịch AgNO3/NH3 dư. Khối lượng Ag kết tủa thu được là? (M(CH3CHO)=44, M(Ag)=108)",
            choices: JSON.stringify(["7,36 gam", "14,7 gam", "22,1 gam", "29,5 gam"]),
            correctIndex: 1,
            explanation: "n(CH3CHO)=3/44≈0,068 mol; 1 mol aldehyde tráng bạc tạo 2 mol Ag nên n(Ag)≈0,136 mol -> m≈0,136x108≈14,7 gam.",
          },
          {
            order: 6,
            content: "Nhóm carbonyl (C=O) có mặt trong loại hợp chất nào sau đây?",
            choices: JSON.stringify(["Alcohol", "Aldehyde và ketone", "Carboxylic acid mà không có nhóm khác", "Ether"]),
            correctIndex: 1,
            explanation: "Cả aldehyde (-CHO) và ketone (>C=O) đều chứa nhóm chức carbonyl.",
          },
        ],
      },
    },
  });

  // ================= QUIZ: LỚP 12 =================
  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Ester - Lipid (Chương 1 - Lớp 12)",
      grade: 12,
      chapterId: l12c1.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Ester được tạo thành từ phản ứng giữa carboxylic acid và chất nào?",
            choices: JSON.stringify(["Alcohol", "Aldehyde", "Amine", "Phenol"]),
            correctIndex: 0,
            explanation: "Ester hình thành qua phản ứng ester hóa giữa carboxylic acid và alcohol.",
          },
          {
            order: 2,
            content: "Chất béo về bản chất là ester của glycerol với chất nào?",
            choices: JSON.stringify(["Amino acid", "Acid béo", "Glucose", "Carbonic acid"]),
            correctIndex: 1,
            explanation: "Chất béo là trieste của glycerol với các acid béo.",
          },
          {
            order: 3,
            content: "Phản ứng thủy phân chất béo trong môi trường kiềm gọi là gì?",
            choices: JSON.stringify(["Ester hóa", "Xà phòng hóa", "Trùng hợp", "Trùng ngưng"]),
            correctIndex: 1,
            explanation: "Thủy phân chất béo trong môi trường kiềm tạo glycerol và xà phòng, gọi là phản ứng xà phòng hóa.",
          },
          {
            order: 4,
            content: "Vì sao chất giặt rửa tổng hợp vẫn hoạt động tốt trong nước cứng còn xà phòng thì không?",
            choices: JSON.stringify([
              "Vì không tạo kết tủa với ion Ca^2+, Mg^2+",
              "Vì có màu sắc khác biệt",
              "Vì không tan trong nước",
              "Vì có giá thành thấp hơn",
            ]),
            correctIndex: 0,
            explanation: "Xà phòng tạo kết tủa với Ca^2+, Mg^2+ trong nước cứng làm giảm tác dụng; chất giặt rửa tổng hợp thì không.",
          },
          {
            order: 5,
            content: "Xà phòng hóa hoàn toàn 17,8 gam tristearin (M=890) cần vừa đủ bao nhiêu mol NaOH?",
            choices: JSON.stringify(["0,02 mol", "0,04 mol", "0,06 mol", "0,08 mol"]),
            correctIndex: 2,
            explanation: "n(chất béo)=17,8/890=0,02 mol; 1 mol chất béo cần 3 mol NaOH nên n(NaOH)=0,02x3=0,06 mol.",
          },
          {
            order: 6,
            content: "Phân tử ester đơn giản nhất tạo bởi acid nào và alcohol nào?",
            choices: JSON.stringify([
              "Acetic acid và methanol tạo methyl acetate",
              "Chỉ tạo được từ acid vô cơ",
              "Chỉ tạo được từ phenol",
              "Không có ester đơn giản",
            ]),
            correctIndex: 0,
            explanation: "CH3COOH + CH3OH -> CH3COOCH3 (methyl acetate) + H2O là ví dụ điển hình của phản ứng ester hóa.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Carbohydrate (Chương 2 - Lớp 12)",
      grade: 12,
      chapterId: l12c2.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Glucose có công thức phân tử là gì?",
            choices: JSON.stringify(["C6H12O6", "C12H22O11", "(C6H10O5)n", "C2H5OH"]),
            correctIndex: 0,
            explanation: "Glucose là monosaccharide có công thức C6H12O6.",
          },
          {
            order: 2,
            content: "Chất nào sau đây KHÔNG tham gia phản ứng tráng bạc?",
            choices: JSON.stringify(["Glucose", "Fructose", "Saccharose", "Maltose"]),
            correctIndex: 2,
            explanation: "Saccharose không còn nhóm -OH hemiacetal tự do nên không có tính khử, không tráng bạc được.",
          },
          {
            order: 3,
            content: "Saccharose khi thủy phân trong môi trường acid tạo ra hai sản phẩm nào?",
            choices: JSON.stringify([
              "Glucose và fructose",
              "Glucose và maltose",
              "Hai phân tử glucose",
              "Tinh bột và glucose",
            ]),
            correctIndex: 0,
            explanation: "Saccharose thủy phân tạo thành glucose và fructose.",
          },
          {
            order: 4,
            content: "Tinh bột phản ứng với dung dịch iodine tạo ra màu gì?",
            choices: JSON.stringify(["Đỏ", "Xanh tím", "Vàng", "Không đổi màu"]),
            correctIndex: 1,
            explanation: "Đây là phản ứng đặc trưng để nhận biết tinh bột.",
          },
          {
            order: 5,
            content: "Cellulose khác tinh bột chủ yếu ở điểm nào?",
            choices: JSON.stringify([
              "Cellulose có mạch thẳng, không phân nhánh, bền hơn",
              "Cellulose không phải là polysaccharide",
              "Cellulose có công thức phân tử hoàn toàn khác",
              "Cellulose không tồn tại trong tự nhiên",
            ]),
            correctIndex: 0,
            explanation: "Cellulose có mạch thẳng không phân nhánh (khác tinh bột có mạch xoắn/phân nhánh), nên bền và chắc hơn.",
          },
          {
            order: 6,
            content: "Lên men 18 gam glucose (M=180) với hiệu suất 80%, khối lượng ethanol thu được là bao nhiêu? (C6H12O6->2C2H5OH+2CO2)",
            choices: JSON.stringify(["3,68 gam", "7,36 gam", "9,2 gam", "14,72 gam"]),
            correctIndex: 1,
            explanation: "n(glucose)=18/180=0,1 mol -> n(C2H5OH) lí thuyết=0,2 mol -> khối lượng thực tế = 0,2x46x80%=7,36 gam.",
          },
          {
            order: 7,
            content: "Maltose khác saccharose ở điểm nào dù có cùng công thức phân tử C12H22O11?",
            choices: JSON.stringify([
              "Maltose còn nhóm -OH hemiacetal tự do nên tráng bạc được, saccharose thì không",
              "Maltose không tan trong nước",
              "Maltose không thủy phân được",
              "Saccharose có khối lượng phân tử lớn hơn",
            ]),
            correctIndex: 0,
            explanation: "Maltose (2 gốc glucose) còn nhóm -OH hemiacetal tự do nên có tính khử; saccharose (glucose+fructose) thì không.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Hợp chất chứa Nitrogen (Chương 3 - Lớp 12)",
      grade: 12,
      chapterId: l12c3.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Amine được tạo ra khi thay thế nguyên tử H trong phân tử nào bằng gốc hydrocarbon?",
            choices: JSON.stringify(["H2O", "NH3", "CH4", "HCl"]),
            correctIndex: 1,
            explanation: "Amine là dẫn xuất thay thế H trong NH3 bằng gốc hydrocarbon.",
          },
          {
            order: 2,
            content: "Amino acid có tính chất đặc biệt gì?",
            choices: JSON.stringify([
              "Chỉ có tính acid",
              "Chỉ có tính base",
              "Tính lưỡng tính (vừa phản ứng với acid vừa phản ứng với base)",
              "Không phản ứng với acid hay base",
            ]),
            correctIndex: 2,
            explanation: "Amino acid có cả nhóm -NH2 (base) và -COOH (acid) nên có tính lưỡng tính.",
          },
          {
            order: 3,
            content: "Liên kết giữa các amino acid trong phân tử protein được gọi là gì?",
            choices: JSON.stringify(["Liên kết ester", "Liên kết peptide", "Liên kết hydrogen", "Liên kết ion"]),
            correctIndex: 1,
            explanation: "Các amino acid liên kết với nhau qua liên kết peptide (-CO-NH-).",
          },
          {
            order: 4,
            content: "Phản ứng màu biuret dùng để nhận biết chất nào?",
            choices: JSON.stringify(["Glucose", "Protein", "Ethanol", "Chất béo"]),
            correctIndex: 1,
            explanation: "Protein phản ứng với Cu(OH)2 tạo phức chất màu tím đặc trưng (phản ứng biuret).",
          },
          {
            order: 5,
            content: "Enzyme có bản chất hóa học là gì?",
            choices: JSON.stringify(["Carbohydrate", "Lipid", "Protein", "Kim loại"]),
            correctIndex: 2,
            explanation: "Enzyme là chất xúc tác sinh học có bản chất protein.",
          },
          {
            order: 6,
            content: "Cho 4,5 gam methylamine (CH3NH2, M=31) phản ứng vừa đủ với dung dịch HCl. Khối lượng muối thu được là?",
            choices: JSON.stringify(["8,175 gam", "9,775 gam", "10,45 gam", "12,3 gam"]),
            correctIndex: 1,
            explanation: "n(CH3NH2)=4,5/31≈0,145 mol; CH3NH2+HCl->CH3NH3Cl (M=67,5) nên m=0,145x67,5≈9,775 gam.",
          },
          {
            order: 7,
            content: "Protein bị đông tụ (biến tính) trong trường hợp nào?",
            choices: JSON.stringify(["Khi hòa tan trong nước lạnh", "Khi đun nóng hoặc gặp một số hóa chất", "Khi để trong bóng tối", "Protein không bao giờ biến tính"]),
            correctIndex: 1,
            explanation: "Protein bị đông tụ khi đun nóng hoặc tác dụng với một số hóa chất, làm mất hoạt tính sinh học.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Polymer (Chương 4 - Lớp 12)",
      grade: 12,
      chapterId: l12c4.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Polymer được tạo thành từ các đơn vị nhỏ lặp lại, gọi là gì?",
            choices: JSON.stringify(["Monomer", "Isomer", "Ion", "Nguyên tử"]),
            correctIndex: 0,
            explanation: "Monomer là đơn vị nhỏ liên kết lặp lại tạo thành polymer.",
          },
          {
            order: 2,
            content: "Phản ứng trùng ngưng khác với phản ứng trùng hợp ở điểm nào?",
            choices: JSON.stringify([
              "Trùng ngưng giải phóng thêm phân tử nhỏ (như nước)",
              "Trùng ngưng không tạo ra polymer",
              "Trùng hợp cần monomer có ít nhất 2 nhóm chức",
              "Không có sự khác biệt nào",
            ]),
            correctIndex: 0,
            explanation: "Trùng ngưng cần monomer có ít nhất 2 nhóm chức và giải phóng phân tử nhỏ, khác với trùng hợp.",
          },
          {
            order: 3,
            content: "Cao su thiên nhiên có thành phần chính là polymer của chất nào?",
            choices: JSON.stringify(["Ethylene", "Isoprene", "Styrene", "Vinyl chloride"]),
            correctIndex: 1,
            explanation: "Cao su thiên nhiên có thành phần chính là polyisoprene.",
          },
          {
            order: 4,
            content: "Chất nào sau đây là ví dụ về tơ tổng hợp?",
            choices: JSON.stringify(["Bông", "Tơ tằm", "Nylon", "Cellulose"]),
            correctIndex: 2,
            explanation: "Nylon là tơ tổng hợp; bông và tơ tằm là tơ thiên nhiên.",
          },
          {
            order: 5,
            content: "Một mẫu PVC (poly(vinyl chloride), -[CH2-CHCl]n-, mắt xích M=62,5) có phân tử khối trung bình 250.000. Hệ số trùng hợp n là bao nhiêu?",
            choices: JSON.stringify(["2000", "3000", "4000", "5000"]),
            correctIndex: 2,
            explanation: "n = 250.000/62,5 = 4000.",
          },
          {
            order: 6,
            content: "Chất dẻo nào sau đây được dùng làm thủy tinh hữu cơ?",
            choices: JSON.stringify(["PE", "PVC", "Poly(methyl methacrylate)", "Cao su buna"]),
            correctIndex: 2,
            explanation: "Poly(methyl methacrylate) - PMMA có độ trong suốt cao, được dùng làm thủy tinh hữu cơ (plexiglass).",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Pin điện và điện phân (Chương 5 - Lớp 12)",
      grade: 12,
      chapterId: l12c5.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Thế điện cực chuẩn của cặp 2H+/H2 được quy ước bằng bao nhiêu?",
            choices: JSON.stringify(["1,00 V", "0,00 V", "-1,00 V", "0,76 V"]),
            correctIndex: 1,
            explanation: "Điện cực hydrogen chuẩn được quy ước có thế điện cực chuẩn bằng 0,00 V.",
          },
          {
            order: 2,
            content: "Suất điện động chuẩn của pin E°(pin) được tính bằng công thức nào?",
            choices: JSON.stringify([
              "E°(cực âm) - E°(cực dương)",
              "E°(cực dương) - E°(cực âm)",
              "E°(cực dương) + E°(cực âm)",
              "E°(cực dương) x E°(cực âm)",
            ]),
            correctIndex: 1,
            explanation: "E°(pin) = E°(cực dương) - E°(cực âm), luôn có giá trị dương.",
          },
          {
            order: 3,
            content: "Trong quá trình điện phân, tại cathode xảy ra quá trình gì?",
            choices: JSON.stringify(["Quá trình oxi hóa", "Quá trình khử", "Không có phản ứng nào", "Phản ứng trung hòa"]),
            correctIndex: 1,
            explanation: "Tại cathode xảy ra quá trình khử (ion dương nhận electron).",
          },
          {
            order: 4,
            content: "Điện phân nóng chảy thường được dùng để điều chế kim loại nào?",
            choices: JSON.stringify(["Cu", "Fe", "Na, K, Al", "Ag"]),
            correctIndex: 2,
            explanation: "Kim loại hoạt động mạnh như Na, K, Al thường được điều chế bằng điện phân nóng chảy.",
          },
          {
            order: 5,
            content: "Biết E°(Zn^2+/Zn)=-0,76V và E°(Ag+/Ag)=+0,80V. Suất điện động chuẩn của pin Zn-Ag là bao nhiêu?",
            choices: JSON.stringify(["0,04 V", "0,76 V", "1,56 V", "-1,56 V"]),
            correctIndex: 2,
            explanation: "E°(pin) = E°(cực dương, Ag) - E°(cực âm, Zn) = 0,80 - (-0,76) = 1,56 V.",
          },
          {
            order: 6,
            content: "Điện phân dung dịch CuSO4 với I=5A trong 3860 giây (F=96500). Khối lượng Cu bám vào cathode là bao nhiêu?",
            choices: JSON.stringify(["3,2 gam", "6,4 gam", "9,6 gam", "12,8 gam"]),
            correctIndex: 1,
            explanation: "n(electron)=It/F=5x3860/96500=0,2 mol; Cu^2+ +2e->Cu nên n(Cu)=0,1 mol -> m=0,1x64=6,4 gam.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Đại cương về kim loại (Chương 6 - Lớp 12)",
      grade: 12,
      chapterId: l12c6.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Liên kết trong tinh thể kim loại được gọi là gì?",
            choices: JSON.stringify(["Liên kết ion", "Liên kết cộng hóa trị", "Liên kết kim loại", "Liên kết hydrogen"]),
            correctIndex: 2,
            explanation: "Liên kết kim loại hình thành giữa ion dương kim loại và các electron tự do.",
          },
          {
            order: 2,
            content: "Tính chất hóa học chung của kim loại là gì?",
            choices: JSON.stringify(["Tính oxi hóa", "Tính khử", "Tính lưỡng tính", "Tính trung hòa"]),
            correctIndex: 1,
            explanation: "Kim loại dễ nhường electron nên có tính khử.",
          },
          {
            order: 3,
            content: "Phương pháp nào thường dùng để điều chế kim loại hoạt động mạnh như Na, Ca, Al?",
            choices: JSON.stringify(["Nhiệt luyện", "Thủy luyện", "Điện phân nóng chảy", "Chưng cất"]),
            correctIndex: 2,
            explanation: "Kim loại hoạt động mạnh được điều chế bằng phương pháp điện phân nóng chảy hợp chất của chúng.",
          },
          {
            order: 4,
            content: "Ăn mòn điện hóa xảy ra khi kim loại tiếp xúc với:",
            choices: JSON.stringify(["Chân không", "Kim loại khác trong môi trường chất điện li", "Ánh sáng mặt trời", "Nhiệt độ thấp"]),
            correctIndex: 1,
            explanation: "Ăn mòn điện hóa cần có 2 điện cực khác nhau tiếp xúc trong môi trường chất điện li.",
          },
          {
            order: 5,
            content: "Để bảo vệ vỏ tàu biển bằng thép khỏi ăn mòn, người ta thường gắn thêm khối kim loại nào?",
            choices: JSON.stringify(["Đồng (Cu)", "Kẽm (Zn)", "Bạc (Ag)", "Vàng (Au)"]),
            correctIndex: 1,
            explanation: "Kẽm hoạt động hóa học mạnh hơn sắt nên đóng vai trò \"vật hi sinh\", bị ăn mòn thay cho thép.",
          },
          {
            order: 6,
            content: "Khử 16 gam Fe2O3 (M=160) bằng CO dư (nhiệt luyện): Fe2O3+3CO->2Fe+3CO2. Khối lượng Fe thu được là?",
            choices: JSON.stringify(["5,6 gam", "8,4 gam", "11,2 gam", "16,8 gam"]),
            correctIndex: 2,
            explanation: "n(Fe2O3)=16/160=0,1 mol -> n(Fe)=0,2 mol -> m=0,2x56=11,2 gam.",
          },
          {
            order: 7,
            content: "Hợp kim nào sau đây là hợp kim của nhôm?",
            choices: JSON.stringify(["Thép", "Đồng thau", "Duralumin", "Đồng thanh"]),
            correctIndex: 2,
            explanation: "Duralumin là hợp kim của nhôm với đồng, magnesium, có độ bền cao và nhẹ.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Nhóm IA - IIA (Chương 7 - Lớp 12)",
      grade: 12,
      chapterId: l12c7.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Nhóm IA còn được gọi là nhóm kim loại gì?",
            choices: JSON.stringify(["Kiềm thổ", "Kiềm", "Chuyển tiếp", "Halogen"]),
            correctIndex: 1,
            explanation: "Nhóm IA gồm các kim loại kiềm: Li, Na, K, Rb, Cs.",
          },
          {
            order: 2,
            content: "Nguyên tử kim loại nhóm IA có bao nhiêu electron ở lớp ngoài cùng?",
            choices: JSON.stringify(["1", "2", "3", "7"]),
            correctIndex: 0,
            explanation: "Kim loại nhóm IA có 1 electron lớp ngoài cùng, dễ nhường tạo ion +1.",
          },
          {
            order: 3,
            content: "Chất nào là thành phần chính của đá vôi?",
            choices: JSON.stringify(["NaCl", "CaCO3", "MgO", "Al2O3"]),
            correctIndex: 1,
            explanation: "Đá vôi có thành phần chính là calcium carbonate (CaCO3).",
          },
          {
            order: 4,
            content: "Nước cứng là nước có chứa nhiều ion nào?",
            choices: JSON.stringify(["Na+, K+", "Ca^2+, Mg^2+", "Cl-, SO4^2-", "H+, OH-"]),
            correctIndex: 1,
            explanation: "Nước cứng chứa nhiều ion Ca^2+ và Mg^2+.",
          },
          {
            order: 5,
            content: "Cho 4,6 gam Na (M=23) tác dụng hết với nước: 2Na+2H2O->2NaOH+H2. Thể tích H2 thu được ở đkc là?",
            choices: JSON.stringify(["1,2395 lít", "2,479 lít", "3,7185 lít", "4,958 lít"]),
            correctIndex: 1,
            explanation: "n(Na)=4,6/23=0,2 mol -> n(H2)=0,1 mol -> V=0,1x24,79=2,479 lít.",
          },
          {
            order: 6,
            content: "Cách nào sau đây KHÔNG dùng để làm mềm nước cứng?",
            choices: JSON.stringify(["Đun sôi (với nước cứng tạm thời)", "Dùng phương pháp trao đổi ion", "Dùng phương pháp kết tủa", "Thêm muối NaCl vào nước"]),
            correctIndex: 3,
            explanation: "Thêm NaCl không loại bỏ được ion Ca^2+, Mg^2+ nên không làm mềm được nước cứng.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Kim loại chuyển tiếp - Phức chất (Chương 8 - Lớp 12)",
      grade: 12,
      chapterId: l12c8.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Kim loại chuyển tiếp dãy thứ nhất có electron hóa trị điền vào phân lớp nào?",
            choices: JSON.stringify(["s", "p", "d", "f"]),
            correctIndex: 2,
            explanation: "Kim loại chuyển tiếp dãy thứ nhất (Sc-Zn) có electron điền vào phân lớp 3d.",
          },
          {
            order: 2,
            content: "Trong phức chất, các phân tử hoặc ion liên kết với ion kim loại trung tâm được gọi là gì?",
            choices: JSON.stringify(["Monomer", "Phối tử (ligand)", "Gốc acid", "Đồng phân"]),
            correctIndex: 1,
            explanation: "Phối tử (ligand) là các phân tử/ion liên kết với ion kim loại trung tâm qua liên kết cho - nhận.",
          },
          {
            order: 3,
            content: "Ion phức [Cu(NH3)4]^2+ trong dung dịch có màu đặc trưng gì?",
            choices: JSON.stringify(["Đỏ máu", "Xanh lam đậm", "Vàng", "Không màu"]),
            correctIndex: 1,
            explanation: "Phức [Cu(NH3)4]^2+ có màu xanh lam đậm đặc trưng, dùng để nhận biết ion Cu^2+.",
          },
          {
            order: 4,
            content: "Ion Fe^3+ được nhận biết đặc trưng bằng cách phản ứng với ion nào tạo màu đỏ máu?",
            choices: JSON.stringify(["Chloride (Cl-)", "Thiocyanate (SCN-)", "Sulfate (SO4^2-)", "Nitrate (NO3^-)"]),
            correctIndex: 1,
            explanation: "Fe^3+ phản ứng với ion thiocyanate (SCN-) tạo phức có màu đỏ máu đặc trưng.",
          },
          {
            order: 5,
            content: "Hemoglobin trong máu người chứa phức chất của nguyên tố kim loại nào?",
            choices: JSON.stringify(["Đồng (Cu)", "Sắt (Fe)", "Magnesium (Mg)", "Kẽm (Zn)"]),
            correctIndex: 1,
            explanation: "Hemoglobin chứa phức chất của iron (Fe) với vòng porphyrin, có vai trò vận chuyển oxygen trong máu.",
          },
        ],
      },
    },
  });

  // ================= FLASHCARD SETS: LỚP 11 =================
  await prisma.flashcardSet.create({
    data: {
      grade: 11,
      chapterId: l11c1.id,
      topic: "Cân bằng hóa học",
      cards: {
        create: [
          { order: 1, term: "⇌", meaning: "Kí hiệu biểu diễn phản ứng thuận nghịch" },
          { order: 2, term: "Kc", meaning: "Hằng số cân bằng, chỉ phụ thuộc vào nhiệt độ" },
          { order: 3, term: "Nguyên lí Le Chatelier", meaning: "Cân bằng chuyển dịch theo chiều làm giảm tác động bên ngoài" },
          { order: 4, term: "N2 + 3H2 ⇌ 2NH3", meaning: "Phản ứng tổng hợp ammonia (quá trình Haber, xúc tác Fe)" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 11,
      chapterId: l11c2.id,
      topic: "Nitrogen - Sulfur",
      cards: {
        create: [
          { order: 1, term: "NH4Cl + NaOH -> NaCl + NH3 + H2O", meaning: "Phản ứng nhận biết muối ammonium (có mùi khai)" },
          { order: 2, term: "H2SO4 đặc, nóng + Cu -> SO2", meaning: "Sulfuric acid đặc có tính oxi hóa mạnh, không giải phóng H2" },
          { order: 3, term: "BaCl2 + SO4^2-", meaning: "Tạo kết tủa trắng BaSO4, dùng nhận biết gốc sulfate" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 11,
      chapterId: l11c3.id,
      topic: "Đại cương hóa học hữu cơ",
      cards: {
        create: [
          { order: 1, term: "Đồng đẳng", meaning: "Các chất tính chất tương tự, hơn kém nhau 1 hay nhiều nhóm CH2" },
          { order: 2, term: "Đồng phân", meaning: "Các chất có cùng công thức phân tử nhưng cấu tạo khác nhau" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 11,
      chapterId: l11c4.id,
      topic: "Hydrocarbon",
      cards: {
        create: [
          { order: 1, term: "CnH2n+2", meaning: "Công thức chung của alkane" },
          { order: 2, term: "CnH2n-2", meaning: "Công thức chung của alkyne" },
          { order: 3, term: "C6H6", meaning: "Benzene - arene đơn giản nhất" },
          { order: 4, term: "AgNO3/NH3", meaning: "Thuốc thử nhận biết alk-1-yne, tạo kết tủa vàng" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 11,
      chapterId: l11c5.id,
      topic: "Dẫn xuất halogen - Alcohol - Phenol",
      cards: {
        create: [
          { order: 1, term: "C6H5OH", meaning: "Phenol" },
          { order: 2, term: "Cu(OH)2", meaning: "Thuốc thử nhận biết polyalcohol (tạo dung dịch xanh lam)" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 11,
      chapterId: l11c6.id,
      topic: "Hợp chất carbonyl - Carboxylic acid",
      cards: {
        create: [
          { order: 1, term: "Phản ứng tráng bạc", meaning: "Phản ứng đặc trưng của nhóm chức -CHO (aldehyde)" },
          { order: 2, term: "-COOH", meaning: "Nhóm chức carboxyl của carboxylic acid" },
          { order: 3, term: "HCOOH", meaning: "Formic acid - vừa có tính acid vừa có tính khử (tráng bạc được)" },
        ],
      },
    },
  });

  // ================= FLASHCARD SETS: LỚP 12 =================
  await prisma.flashcardSet.create({
    data: {
      grade: 12,
      chapterId: l12c1.id,
      topic: "Ester - Lipid",
      cards: {
        create: [
          { order: 1, term: "Xà phòng hóa", meaning: "Thủy phân chất béo trong môi trường kiềm, tạo glycerol và xà phòng" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 12,
      chapterId: l12c2.id,
      topic: "Carbohydrate",
      cards: {
        create: [
          { order: 1, term: "C6H12O6", meaning: "Glucose và fructose (đồng phân của nhau)" },
          { order: 2, term: "C12H22O11", meaning: "Saccharose hoặc maltose (đồng phân của nhau)" },
          { order: 3, term: "Maltose", meaning: "Disaccharide có tính khử, tham gia phản ứng tráng bạc (khác saccharose)" },
          { order: 4, term: "(C6H10O5)n", meaning: "Công thức chung của tinh bột và cellulose" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 12,
      chapterId: l12c3.id,
      topic: "Hợp chất chứa Nitrogen",
      cards: {
        create: [
          { order: 1, term: "Amino acid", meaning: "Có cả nhóm -NH2 và -COOH, mang tính lưỡng tính" },
          { order: 2, term: "Liên kết peptide", meaning: "Liên kết -CO-NH- giữa các amino acid trong protein" },
          { order: 3, term: "Phản ứng màu biuret", meaning: "Nhận biết protein (tạo phức màu tím với Cu(OH)2)" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 12,
      chapterId: l12c4.id,
      topic: "Polymer",
      cards: {
        create: [
          { order: 1, term: "Monomer", meaning: "Đơn vị nhỏ liên kết lặp lại tạo thành polymer" },
          { order: 2, term: "Trùng ngưng", meaning: "Phản ứng tạo polymer, giải phóng thêm phân tử nhỏ (như nước)" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 12,
      chapterId: l12c5.id,
      topic: "Pin điện và điện phân",
      cards: {
        create: [
          { order: 1, term: "E°(Cu^2+/Cu) = +0,34 V", meaning: "Thế điện cực chuẩn của đồng" },
          { order: 2, term: "E°(Zn^2+/Zn) = -0,76 V", meaning: "Thế điện cực chuẩn của kẽm" },
          { order: 3, term: "Cathode", meaning: "Nơi xảy ra quá trình khử khi điện phân" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 12,
      chapterId: l12c6.id,
      topic: "Đại cương về kim loại",
      cards: {
        create: [
          { order: 1, term: "Ăn mòn điện hóa", meaning: "Ăn mòn kim loại khi tiếp xúc kim loại khác trong môi trường điện li" },
          { order: 2, term: "Vật hi sinh (Zn)", meaning: "Kim loại gắn thêm để bảo vệ vỏ tàu thép khỏi ăn mòn" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 12,
      chapterId: l12c7.id,
      topic: "Nhóm IA - IIA",
      cards: {
        create: [
          { order: 1, term: "Nhóm IA", meaning: "Kim loại kiềm: Li, Na, K, Rb, Cs" },
          { order: 2, term: "Nhóm IIA", meaning: "Kim loại kiềm thổ: Be, Mg, Ca, Sr, Ba" },
          { order: 3, term: "Nước cứng", meaning: "Nước chứa nhiều ion Ca^2+, Mg^2+" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 12,
      chapterId: l12c8.id,
      topic: "Kim loại chuyển tiếp - Phức chất",
      cards: {
        create: [
          { order: 1, term: "Phối tử (ligand)", meaning: "Phân tử/ion liên kết với ion kim loại trung tâm tạo phức chất" },
          { order: 2, term: "[Cu(NH3)4]^2+", meaning: "Phức chất màu xanh lam đậm đặc trưng của Cu^2+" },
        ],
      },
    },
  });

  // ================= BÀI TẬP LUYỆN TẬP (PRACTICE) - LỚP 11 =================
  await prisma.practiceQuestion.createMany({
    data: [
      // Chương 1 - Cân bằng hóa học
      { chapterId: l11c1.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Hằng số cân bằng Kc phụ thuộc vào yếu tố nào?", choices: JSON.stringify(["Nồng độ ban đầu", "Nhiệt độ", "Áp suất", "Chất xúc tác"]), correctIndex: 1, explanation: "Kc chỉ phụ thuộc vào nhiệt độ và bản chất phản ứng, không phụ thuộc nồng độ ban đầu." },
      { chapterId: l11c1.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Một dung dịch có pH=9. Nồng độ ion OH- là bao nhiêu? (Kw=10^-14)", choices: JSON.stringify(["10^-5 mol/L", "10^-9 mol/L", "10^-14 mol/L", "9 mol/L"]), correctIndex: 0, explanation: "[H+]=10^-9 -> [OH-]=Kw/[H+]=10^-14/10^-9=10^-5 mol/L." },

      // Chương 2 - Nitrogen - Sulfur
      { chapterId: l11c2.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Khí nào có mùi khai đặc trưng, dùng để nhận biết muối ammonium?", choices: JSON.stringify(["H2", "NH3", "SO2", "NO2"]), correctIndex: 1, explanation: "Đun muối ammonium với kiềm giải phóng khí NH3 có mùi khai." },
      { chapterId: l11c2.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Cho 3,2 gam sulfur (M=32) cháy hết trong oxygen: S+O2->SO2. Thể tích SO2 thu được ở đkc là?", choices: JSON.stringify(["1,2395 lít", "2,479 lít", "3,7185 lít", "4,958 lít"]), correctIndex: 1, explanation: "n(S)=3,2/32=0,1 mol -> n(SO2)=0,1 mol -> V=0,1x24,79=2,479 lít." },

      // Chương 3 - Đại cương hữu cơ
      { chapterId: l11c3.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Phương pháp sắc kí dùng để làm gì?", choices: JSON.stringify(["Tách các chất dựa vào tốc độ di chuyển khác nhau qua pha tĩnh", "Chỉ dùng để đo nhiệt độ sôi", "Chỉ áp dụng cho chất khí", "Tổng hợp hợp chất hữu cơ"]), correctIndex: 0, explanation: "Sắc kí tách các chất trong hỗn hợp dựa vào tốc độ di chuyển khác nhau qua pha tĩnh khi được pha động lôi cuốn." },

      // Chương 4 - Hydrocarbon
      { chapterId: l11c4.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "Chất nào sau đây làm mất màu dung dịch KMnO4?", choices: JSON.stringify(["CH4", "C2H4", "C2H6", "C3H8"]), correctIndex: 1, explanation: "Alkene (C2H4) có liên kết đôi nên bị oxi hóa bởi KMnO4, làm mất màu tím." },
      { chapterId: l11c4.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Đốt cháy hoàn toàn 4,4 gam propane (C3H8, M=44). Khối lượng CO2 sinh ra là?", choices: JSON.stringify(["8,8 gam", "13,2 gam", "17,6 gam", "22 gam"]), correctIndex: 1, explanation: "n(C3H8)=4,4/44=0,1 mol -> n(CO2)=0,3 mol -> m=0,3x44=13,2 gam." },

      // Chương 5 - Dẫn xuất halogen - Alcohol - Phenol
      { chapterId: l11c5.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Glycerol phản ứng với Cu(OH)2 tạo dung dịch màu gì?", choices: JSON.stringify(["Đỏ", "Xanh lam", "Vàng", "Tím"]), correctIndex: 1, explanation: "Glycerol (polyalcohol) phản ứng với Cu(OH)2 tạo phức màu xanh lam đặc trưng." },
      { chapterId: l11c5.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Phenol phản ứng với dung dịch bromine dư tạo 2,4,6-tribromophenol theo phương trình C6H5OH + 3Br2 -> C6H2Br3OH + 3HBr. Với 0,05 mol phenol phản ứng hết, cần dùng bao nhiêu mol Br2?", choices: JSON.stringify(["0,05 mol", "0,10 mol", "0,15 mol", "0,20 mol"]), correctIndex: 2, explanation: "Tỉ lệ mol phenol : Br2 = 1 : 3 nên n(Br2) = 0,05 x 3 = 0,15 mol." },

      // Chương 6 - Carbonyl - Carboxylic acid
      { chapterId: l11c6.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "Chất nào sau đây vừa có tính acid vừa tham gia phản ứng tráng bạc?", choices: JSON.stringify(["Acetic acid (CH3COOH)", "Formic acid (HCOOH)", "Ethanol", "Propanoic acid"]), correctIndex: 1, explanation: "Formic acid còn nhóm -CHO trong phân tử nên vừa có tính acid vừa có tính khử (tráng bạc được)." },
    ],
  });

  // ================= BÀI TẬP LUYỆN TẬP (PRACTICE) - LỚP 12 =================
  await prisma.practiceQuestion.createMany({
    data: [
      // Chương 1 - Ester - Lipid
      { chapterId: l12c1.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Xà phòng hóa 8,9 gam tristearin (M=890) bằng NaOH vừa đủ. Số mol NaOH cần dùng là?", choices: JSON.stringify(["0,01 mol", "0,02 mol", "0,03 mol", "0,04 mol"]), correctIndex: 2, explanation: "n(chất béo)=8,9/890=0,01 mol -> n(NaOH)=0,01x3=0,03 mol." },

      // Chương 2 - Carbohydrate
      { chapterId: l12c2.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Chất nào sau đây thủy phân tạo ra glucose và fructose?", choices: JSON.stringify(["Tinh bột", "Cellulose", "Saccharose", "Maltose"]), correctIndex: 2, explanation: "Saccharose thủy phân tạo glucose và fructose; tinh bột/cellulose tạo glucose; maltose tạo glucose." },
      { chapterId: l12c2.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Thủy phân hoàn toàn 1kg tinh bột (hiệu suất 100%) thu được bao nhiêu kg glucose? ((C6H10O5)n + nH2O -> nC6H12O6, tỉ lệ khối lượng 162n:180n)", choices: JSON.stringify(["0,9 kg", "1,0 kg", "1,11 kg", "1,2 kg"]), correctIndex: 2, explanation: "Tỉ lệ khối lượng (C6H10O5)n : C6H12O6 = 162:180 nên m(glucose)=1x180/162≈1,11 kg." },

      // Chương 3 - Hợp chất chứa Nitrogen
      { chapterId: l12c3.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "Amino acid tồn tại chủ yếu ở dạng nào trong dung dịch?", choices: JSON.stringify(["Phân tử trung hòa thông thường", "Ion lưỡng cực", "Cation", "Anion"]), correctIndex: 1, explanation: "Amino acid tồn tại chủ yếu ở dạng ion lưỡng cực (nhóm -NH2 nhận H+ từ nhóm -COOH ngay trong phân tử)." },

      // Chương 4 - Polymer
      { chapterId: l12c4.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Phản ứng trùng hợp cần monomer có đặc điểm gì?", choices: JSON.stringify(["Có liên kết bội hoặc vòng kém bền", "Có ít nhất 2 nhóm chức", "Luôn là hydrocarbon no", "Không cần điều kiện gì đặc biệt"]), correctIndex: 0, explanation: "Trùng hợp cần monomer có liên kết bội (như C=C) hoặc vòng kém bền để mở ra liên kết." },

      // Chương 5 - Pin điện và điện phân
      { chapterId: l12c5.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Điện phân dung dịch AgNO3 với I=2A trong 965 giây (F=96500). Khối lượng Ag thu được là?", choices: JSON.stringify(["1,08 gam", "2,16 gam", "3,24 gam", "4,32 gam"]), correctIndex: 1, explanation: "n(e)=It/F=2x965/96500=0,02 mol; Ag+ +e->Ag nên n(Ag)=0,02 mol -> m=0,02x108=2,16 gam." },

      // Chương 6 - Đại cương kim loại
      { chapterId: l12c6.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Ăn mòn hóa học khác ăn mòn điện hóa ở điểm nào?", choices: JSON.stringify(["Ăn mòn hóa học không phát sinh dòng điện", "Ăn mòn hóa học chỉ xảy ra với phi kim", "Ăn mòn hóa học nhanh hơn", "Không có sự khác biệt"]), correctIndex: 0, explanation: "Ăn mòn hóa học là phản ứng trực tiếp giữa kim loại và chất oxi hóa, không phát sinh dòng điện; ăn mòn điện hóa thì có." },

      // Chương 7 - Nhóm IA - IIA
      { chapterId: l12c7.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "Vì sao phải bảo quản kim loại kiềm trong dầu hỏa?", choices: JSON.stringify(["Vì kim loại kiềm phản ứng mạnh với nước và oxygen trong không khí", "Vì kim loại kiềm dễ bay hơi", "Vì dầu hỏa làm kim loại kiềm cứng hơn", "Không có lý do đặc biệt"]), correctIndex: 0, explanation: "Kim loại kiềm phản ứng rất mạnh với hơi nước và oxygen trong không khí nên cần ngâm trong dầu hỏa để cách li." },

      // Chương 8 - Kim loại chuyển tiếp - Phức chất
      { chapterId: l12c8.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Vì sao hợp chất của kim loại chuyển tiếp thường có màu sắc đặc trưng?", choices: JSON.stringify(["Do sự chuyển electron trong phân lớp d chưa lấp đầy", "Do kim loại chuyển tiếp luôn ở thể khí", "Do chúng không tan trong nước", "Không có lý do hóa học nào"]), correctIndex: 0, explanation: "Sự chuyển mức năng lượng của electron trong phân lớp d chưa lấp đầy hấp thụ ánh sáng ở bước sóng nhất định, tạo màu sắc đặc trưng." },
    ],
  });

  console.log("Đã thêm đầy đủ dữ liệu Hóa học Lớp 11-12 theo SGK Hóa học (Kết nối tri thức):");
  console.log("- Lớp 11: 6 chương, 19 tài liệu, 6 đề kiểm tra, 6 bộ flashcard");
  console.log("- Lớp 12: 8 chương, 22 tài liệu, 8 đề kiểm tra, 8 bộ flashcard");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
