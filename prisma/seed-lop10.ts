import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Nội dung Hóa học lớp 10 dựa theo SGK Hóa học (Kết nối tri thức):
 * Chương 1 (Cấu tạo nguyên tử), Chương 2 (Bảng tuần hoàn), Chương 3 (Liên kết hóa học),
 * Chương 4 (Phản ứng oxi hóa - khử), Chương 5 (Năng lượng hóa học), Chương 6 (Tốc độ phản ứng),
 * Chương 7 (Nhóm halogen). Các bài "Ôn tập chương" được lược bỏ vì chỉ tổng hợp lại kiến thức.
 */

async function main() {
  await prisma.question.deleteMany({ where: { quiz: { grade: 10 } } });
  await prisma.quiz.deleteMany({ where: { grade: 10 } });
  await prisma.flashcard.deleteMany({ where: { set: { grade: 10 } } });
  await prisma.flashcardSet.deleteMany({ where: { grade: 10 } });
  await prisma.practiceQuestion.deleteMany({ where: { chapter: { grade: 10 } } });
  await prisma.document.deleteMany({ where: { grade: 10 } });
  await prisma.chapter.deleteMany({ where: { grade: 10 } });

  const ch1 = await prisma.chapter.create({ data: { grade: 10, order: 1, title: "Chương 1. Cấu tạo nguyên tử" } });
  const ch2 = await prisma.chapter.create({ data: { grade: 10, order: 2, title: "Chương 2. Bảng tuần hoàn các nguyên tố hóa học" } });
  const ch3 = await prisma.chapter.create({ data: { grade: 10, order: 3, title: "Chương 3. Liên kết hóa học" } });
  const ch4 = await prisma.chapter.create({ data: { grade: 10, order: 4, title: "Chương 4. Phản ứng oxi hoá - khử" } });
  const ch5 = await prisma.chapter.create({ data: { grade: 10, order: 5, title: "Chương 5. Năng lượng hoá học" } });
  const ch6 = await prisma.chapter.create({ data: { grade: 10, order: 6, title: "Chương 6. Tốc độ phản ứng" } });
  const ch7 = await prisma.chapter.create({ data: { grade: 10, order: 7, title: "Chương 7. Nguyên tố nhóm halogen" } });

  // ================= CHƯƠNG 1: CẤU TẠO NGUYÊN TỬ =================
  await prisma.document.createMany({
    data: [
      {
        grade: 10,
        chapterId: ch1.id,
        order: 1,
        title: "Bài 1. Thành phần của nguyên tử",
        content:
          "## Cấu tạo nguyên tử\n" +
          "- Nguyên tử gồm hạt nhân mang điện dương ở tâm và lớp vỏ electron mang điện âm chuyển động xung quanh.\n" +
          "- Hạt nhân được tạo bởi hai loại hạt: proton (điện tích +1, khối lượng xấp xỉ 1 amu) và neutron (không mang điện, khối lượng xấp xỉ 1 amu).\n" +
          "- Lớp vỏ electron gồm các electron (điện tích -1, khối lượng rất nhỏ, chỉ khoảng 1/1840 khối lượng proton).\n" +
          "- Nguyên tử trung hòa về điện nên số proton bằng số electron.\n\n" +
          "## Kích thước và khối lượng nguyên tử\n" +
          "- Nguyên tử có kích thước vô cùng nhỏ (đường kính cỡ 10^-10 m), trong khi hạt nhân còn nhỏ hơn rất nhiều (cỡ 10^-14 đến 10^-15 m) - vì vậy có thể coi nguyên tử có cấu tạo rỗng.\n" +
          "- Khối lượng nguyên tử tập trung hầu như toàn bộ ở hạt nhân do electron có khối lượng không đáng kể.\n\n" +
          "## Ví dụ minh họa\n" +
          "- Nguyên tử helium có 2 proton, 2 neutron trong hạt nhân và 2 electron ở lớp vỏ.",
      },
      {
        grade: 10,
        chapterId: ch1.id,
        order: 2,
        title: "Bài 2. Nguyên tố hóa học",
        content:
          "## Khái niệm\n" +
          "- Nguyên tố hóa học là tập hợp các nguyên tử có cùng số proton (cùng điện tích hạt nhân).\n" +
          "- Số hiệu nguyên tử (Z) bằng số proton, cũng bằng số electron (với nguyên tử trung hòa).\n" +
          "- Số khối (A) bằng tổng số proton và số neutron: A = Z + N.\n\n" +
          "## Đồng vị\n" +
          "- Đồng vị là các nguyên tử có cùng số proton nhưng khác số neutron (khác số khối).\n" +
          "- Ví dụ: nguyên tố hydrogen có 3 đồng vị chính là proti (không có neutron), deuteri (1 neutron), triti (2 neutron) - đều có 1 proton.\n" +
          "- Nguyên tử khối trung bình của một nguyên tố được tính theo tỉ lệ phần trăm số nguyên tử của các đồng vị.\n\n" +
          "## Ví dụ minh họa\n" +
          "- Chlorine trong tự nhiên có 2 đồng vị bền: 35Cl (chiếm 75,77%) và 37Cl (chiếm 24,23%).\n" +
          "- Nguyên tử khối trung bình của Cl = (35 x 75,77 + 37 x 24,23) / 100 ≈ 35,45.",
      },
      {
        grade: 10,
        chapterId: ch1.id,
        order: 3,
        title: "Bài 3. Cấu trúc lớp vỏ electron nguyên tử",
        content:
          "## Sự chuyển động của electron\n" +
          "- Electron chuyển động rất nhanh quanh hạt nhân, không theo quỹ đạo cố định mà tạo thành đám mây electron (orbital) - khu vực không gian có xác suất tìm thấy electron lớn nhất.\n\n" +
          "## Lớp và phân lớp electron\n" +
          "- Các electron được sắp xếp thành từng lớp, kí hiệu bằng số nguyên n = 1, 2, 3,...; mỗi lớp gồm một hay nhiều phân lớp (s, p, d, f).\n" +
          "- Số electron tối đa có thể có trong lớp thứ n là 2n^2.\n" +
          "- Các phân lớp được sắp xếp theo thứ tự mức năng lượng tăng dần: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p,...\n\n" +
          "## Cấu hình electron\n" +
          "- Cấu hình electron biểu diễn sự phân bố electron trên các phân lớp trong nguyên tử, tuân theo nguyên lí vững bền (electron chiếm mức năng lượng thấp trước), nguyên lí Pauli và quy tắc Hund.\n" +
          "- Ví dụ: cấu hình electron của nguyên tử oxygen (Z = 8) là 1s2 2s2 2p4.\n\n" +
          "## Electron lớp ngoài cùng\n" +
          "- Số electron ở lớp ngoài cùng quyết định phần lớn tính chất hóa học của nguyên tố (kim loại, phi kim hay khí hiếm).\n\n" +
          "## Ví dụ minh họa\n" +
          "Viết cấu hình electron của nguyên tử sodium (Na, Z = 11):\n" +
          "- Phân bố 11 electron theo thứ tự mức năng lượng: 1s2 2s2 2p6 3s1.\n" +
          "- Na có 1 electron lớp ngoài cùng (lớp 3) -> dễ nhường electron này để đạt cấu hình bền của khí hiếm Ne, thể hiện tính kim loại điển hình.",
      },
    ],
  });

  // ================= CHƯƠNG 2: BẢNG TUẦN HOÀN =================
  await prisma.document.createMany({
    data: [
      {
        grade: 10,
        chapterId: ch2.id,
        order: 4,
        title: "Bài 5. Cấu tạo của bảng tuần hoàn các nguyên tố hóa học",
        content:
          "## Nguyên tắc sắp xếp\n" +
          "- Các nguyên tố được sắp xếp theo chiều tăng dần điện tích hạt nhân.\n" +
          "- Các nguyên tố có cùng số lớp electron được xếp vào cùng một hàng, gọi là chu kì.\n" +
          "- Các nguyên tố có cấu hình electron lớp ngoài cùng tương tự nhau được xếp vào cùng một cột, gọi là nhóm.\n\n" +
          "## Ô nguyên tố, chu kì, nhóm\n" +
          "- Ô nguyên tố cho biết số hiệu nguyên tử, kí hiệu hóa học, tên nguyên tố và nguyên tử khối.\n" +
          "- Chu kì là dãy nguyên tố có cùng số lớp electron, được đánh số từ 1 đến 7; chu kì 1, 2, 3 là chu kì nhỏ, chu kì 4 đến 7 là chu kì lớn.\n" +
          "- Nhóm gồm nhóm A (chứa các nguyên tố s, p) và nhóm B (chứa các nguyên tố d, f - kim loại chuyển tiếp); với nhóm A, số thứ tự nhóm bằng số electron lớp ngoài cùng.\n\n" +
          "## Ví dụ minh họa\n" +
          "Nguyên tử chlorine (Cl) có Z = 17, cấu hình electron 1s2 2s2 2p6 3s2 3p5:\n" +
          "- Có 3 lớp electron -> thuộc chu kì 3.\n" +
          "- Có 7 electron lớp ngoài cùng -> thuộc nhóm VIIA.",
      },
      {
        grade: 10,
        chapterId: ch2.id,
        order: 5,
        title: "Bài 6. Xu hướng biến đổi một số tính chất của nguyên tử",
        content:
          "## Bán kính nguyên tử\n" +
          "- Trong một chu kì, theo chiều tăng điện tích hạt nhân, bán kính nguyên tử giảm dần (do lực hút giữa hạt nhân và electron lớp ngoài cùng tăng lên).\n" +
          "- Trong một nhóm A, theo chiều từ trên xuống dưới, bán kính nguyên tử tăng dần (do số lớp electron tăng).\n\n" +
          "## Độ âm điện\n" +
          "- Độ âm điện đặc trưng cho khả năng hút electron của nguyên tử khi hình thành liên kết hóa học.\n" +
          "- Trong một chu kì, độ âm điện tăng dần từ trái sang phải; trong một nhóm A, độ âm điện giảm dần từ trên xuống dưới.\n" +
          "- Fluorine (F) là nguyên tố có độ âm điện lớn nhất trong bảng tuần hoàn.\n\n" +
          "## Tính kim loại - phi kim\n" +
          "- Trong một chu kì, tính kim loại giảm dần và tính phi kim tăng dần từ trái sang phải.\n" +
          "- Trong một nhóm A, tính kim loại tăng dần và tính phi kim giảm dần từ trên xuống dưới.\n\n" +
          "## Ví dụ minh họa\n" +
          "So sánh bán kính nguyên tử của Na, Mg, K (cùng nhóm IA với Na là K, cùng chu kì 3 với Na là Mg):\n" +
          "- Na và Mg cùng chu kì 3: Mg đứng sau Na (điện tích hạt nhân lớn hơn) -> bán kính Mg nhỏ hơn Na.\n" +
          "- Na và K cùng nhóm IA: K ở chu kì 4 (nhiều lớp electron hơn) -> bán kính K lớn hơn Na.\n" +
          "- Vậy thứ tự bán kính tăng dần: Mg < Na < K.",
      },
      {
        grade: 10,
        chapterId: ch2.id,
        order: 6,
        title: "Bài 7. Xu hướng biến đổi thành phần và tính chất của hợp chất",
        content:
          "## Oxide và hydroxide theo chu kì\n" +
          "- Trong một chu kì, đi từ trái sang phải, tính base của oxide và hydroxide cao nhất giảm dần, đồng thời tính acid tăng dần.\n" +
          "- Ví dụ ở chu kì 3: Na2O, MgO là các oxide base; Al2O3 là oxide lưỡng tính; SiO2, P2O5, SO3, Cl2O7 là các oxide acid với tính acid tăng dần theo thứ tự đó.",
      },
      {
        grade: 10,
        chapterId: ch2.id,
        order: 7,
        title: "Bài 8. Định luật tuần hoàn. Ý nghĩa của bảng tuần hoàn",
        content:
          "## Nội dung định luật tuần hoàn\n" +
          "- Tính chất của các nguyên tố và đơn chất, cũng như thành phần và tính chất của các hợp chất tạo nên từ các nguyên tố đó, biến đổi tuần hoàn theo chiều tăng của điện tích hạt nhân nguyên tử.\n\n" +
          "## Ý nghĩa của bảng tuần hoàn\n" +
          "- Biết vị trí của một nguyên tố trong bảng tuần hoàn, có thể suy ra cấu tạo nguyên tử và tính chất cơ bản của nguyên tố đó, và ngược lại - đây là công cụ dự đoán tính chất rất hữu ích trong hóa học.\n\n" +
          "## Ví dụ minh họa\n" +
          "Nguyên tố X ở chu kì 3, nhóm IIA. Suy ra: X có 3 lớp electron, 2 electron lớp ngoài cùng, là kim loại (X chính là magnesium, Mg), oxide cao nhất MgO là oxide base, hydroxide tương ứng Mg(OH)2 là base.",
      },
    ],
  });

  // ================= CHƯƠNG 3: LIÊN KẾT HÓA HỌC =================
  await prisma.document.createMany({
    data: [
      {
        grade: 10,
        chapterId: ch3.id,
        order: 8,
        title: "Bài 10. Quy tắc octet",
        content:
          "## Nội dung quy tắc\n" +
          "- Trong quá trình hình thành liên kết hóa học, nguyên tử có xu hướng nhường, nhận hoặc góp chung electron để đạt được cấu hình electron bền vững của khí hiếm gần nhất, thường là 8 electron ở lớp ngoài cùng (riêng nguyên tố helium là 2 electron).\n" +
          "- Quy tắc octet là cơ sở để giải thích sự hình thành của cả liên kết ion và liên kết cộng hóa trị.\n\n" +
          "## Ví dụ minh họa\n" +
          "- Nguyên tử Cl (7 electron lớp ngoài cùng) nhận thêm 1 electron để có 8 electron lớp ngoài cùng, đạt cấu hình bền của khí hiếm Ar.\n" +
          "- Nguyên tử Mg (2 electron lớp ngoài cùng) nhường 2 electron để lớp electron sát ngoài cùng (đã đủ 8) trở thành lớp ngoài cùng mới, đạt cấu hình bền của khí hiếm Ne.",
      },
      {
        grade: 10,
        chapterId: ch3.id,
        order: 9,
        title: "Bài 11. Liên kết ion",
        content:
          "## Khái niệm\n" +
          "- Liên kết ion là liên kết được hình thành bởi lực hút tĩnh điện giữa các ion mang điện tích trái dấu.\n" +
          "- Liên kết ion thường hình thành giữa kim loại điển hình (nhóm IA, IIA) và phi kim điển hình (nhóm VIIA, oxygen).\n\n" +
          "## Ví dụ minh họa\n" +
          "- Nguyên tử Na nhường 1 electron tạo thành ion Na^+; nguyên tử Cl nhận 1 electron tạo thành ion Cl^-; hai ion mang điện trái dấu hút nhau tạo thành hợp chất ion NaCl.\n\n" +
          "## Tính chất của hợp chất ion\n" +
          "- Hợp chất ion thường là chất rắn ở nhiệt độ thường, có nhiệt độ nóng chảy và nhiệt độ sôi cao, dẫn điện được khi nóng chảy hoặc khi hòa tan trong nước.",
      },
      {
        grade: 10,
        chapterId: ch3.id,
        order: 10,
        title: "Bài 12. Liên kết cộng hóa trị",
        content:
          "## Khái niệm\n" +
          "- Liên kết cộng hóa trị là liên kết được hình thành giữa hai nguyên tử bằng một hay nhiều cặp electron dùng chung.\n" +
          "- Liên kết cộng hóa trị không cực: cặp electron dùng chung không lệch về nguyên tử nào, thường gặp giữa 2 nguyên tử giống nhau, ví dụ Cl2, H2.\n" +
          "- Liên kết cộng hóa trị có cực: cặp electron dùng chung lệch về phía nguyên tử có độ âm điện lớn hơn, ví dụ HCl.\n\n" +
          "## Ví dụ minh họa\n" +
          "- Phân tử nước H2O có 2 liên kết cộng hóa trị có cực O-H.",
      },
      {
        grade: 10,
        chapterId: ch3.id,
        order: 11,
        title: "Bài 13. Liên kết hydrogen và tương tác van der Waals",
        content:
          "## Liên kết hydrogen\n" +
          "- Liên kết hydrogen là một loại liên kết yếu, hình thành giữa nguyên tử H (đã liên kết với một nguyên tử có độ âm điện lớn như F, O, N) với một nguyên tử có độ âm điện lớn khác.\n" +
          "- Liên kết hydrogen giúp giải thích vì sao nước có nhiệt độ sôi cao bất thường so với các hợp chất có phân tử khối tương đương.\n\n" +
          "## Tương tác van der Waals\n" +
          "- Tương tác van der Waals là lực hút yếu giữa các phân tử, có xu hướng tăng theo khối lượng phân tử và diện tích tiếp xúc bề mặt phân tử.\n" +
          "- Tương tác van der Waals càng mạnh thì nhiệt độ nóng chảy, nhiệt độ sôi của chất càng cao.\n\n" +
          "## Ví dụ minh họa\n" +
          "- H2O (M = 18) sôi ở 100°C trong khi H2S (M = 34, phân tử khối lớn hơn) chỉ sôi ở -60°C, vì phân tử H2O có liên kết hydrogen còn H2S thì không - minh chứng liên kết hydrogen ảnh hưởng mạnh hơn nhiều so với khối lượng phân tử.",
      },
    ],
  });

  // ================= CHƯƠNG 4: PHẢN ỨNG OXI HÓA - KHỬ =================
  await prisma.document.createMany({
    data: [
      {
        grade: 10,
        chapterId: ch4.id,
        order: 12,
        title: "Bài 15. Phản ứng oxi hóa - khử",
        content:
          "## Số oxi hóa\n" +
          "- Số oxi hóa là điện tích quy ước của một nguyên tử trong phân tử, được tính với giả định mọi liên kết trong phân tử đều là liên kết ion.\n" +
          "- Quy tắc xác định số oxi hóa: số oxi hóa của đơn chất bằng 0; của ion đơn nguyên tử bằng đúng điện tích của ion đó; hydrogen thường có số oxi hóa +1 (trừ hydride kim loại có số oxi hóa -1); oxygen thường có số oxi hóa -2 (trừ một số trường hợp đặc biệt như OF2, peroxide).\n\n" +
          "## Chất oxi hóa - chất khử\n" +
          "- Chất khử (chất bị oxi hóa) là chất nhường electron, khiến số oxi hóa của nó tăng lên.\n" +
          "- Chất oxi hóa (chất bị khử) là chất nhận electron, khiến số oxi hóa của nó giảm xuống.\n" +
          "- Phản ứng oxi hóa - khử là phản ứng có sự thay đổi số oxi hóa của một hay nhiều nguyên tố.\n\n" +
          "## Ví dụ minh họa\n" +
          "Zn + CuSO4 -> ZnSO4 + Cu\n" +
          "- Zn nhường electron (số oxi hóa từ 0 lên +2) nên đóng vai trò chất khử; ion Cu^2+ nhận electron (từ +2 xuống 0) nên đóng vai trò chất oxi hóa.\n\n" +
          "## Cân bằng phản ứng oxi hóa - khử\n" +
          "- Phương pháp thăng bằng electron: cân bằng phương trình dựa trên nguyên tắc tổng số electron mà chất khử nhường bằng tổng số electron mà chất oxi hóa nhận.",
      },
    ],
  });

  // ================= CHƯƠNG 5: NĂNG LƯỢNG HÓA HỌC =================
  await prisma.document.createMany({
    data: [
      {
        grade: 10,
        chapterId: ch5.id,
        order: 13,
        title: "Bài 17. Biến thiên enthalpy trong các phản ứng hóa học",
        content:
          "## Phản ứng tỏa nhiệt - thu nhiệt\n" +
          "- Phản ứng tỏa nhiệt là phản ứng giải phóng năng lượng (dạng nhiệt) ra môi trường xung quanh, có biến thiên enthalpy ΔrH nhỏ hơn 0.\n" +
          "- Phản ứng thu nhiệt là phản ứng hấp thụ năng lượng từ môi trường xung quanh, có ΔrH lớn hơn 0.\n\n" +
          "## Enthalpy tạo thành chuẩn\n" +
          "- Enthalpy tạo thành chuẩn của một chất là biến thiên enthalpy của phản ứng tạo thành 1 mol chất đó từ các đơn chất bền, ở điều kiện chuẩn (25°C, 1 bar).\n" +
          "- Có thể tính biến thiên enthalpy của một phản ứng dựa vào enthalpy tạo thành chuẩn của các chất: ΔrH bằng tổng enthalpy tạo thành của sản phẩm trừ đi tổng enthalpy tạo thành của chất phản ứng.\n\n" +
          "## Ví dụ minh họa\n" +
          "Phản ứng CH4 + 2O2 -> CO2 + 2H2O (khí), biết ΔfH°(CH4) = -74,8 kJ/mol, ΔfH°(CO2) = -393,5 kJ/mol, ΔfH°(H2O, khí) = -241,8 kJ/mol, ΔfH°(O2) = 0:\n" +
          "ΔrH° = [-393,5 + 2x(-241,8)] - [-74,8 + 2x0] = -877,1 - (-74,8) = -802,3 kJ -> phản ứng tỏa nhiệt mạnh (ΔrH° < 0).\n\n" +
          "## Ứng dụng thực tế\n" +
          "- Phản ứng đốt cháy nhiên liệu (than, xăng dầu, khí gas) là phản ứng tỏa nhiệt mạnh, được ứng dụng rộng rãi để cung cấp năng lượng cho đời sống và sản xuất.",
      },
    ],
  });

  // ================= CHƯƠNG 6: TỐC ĐỘ PHẢN ỨNG =================
  await prisma.document.createMany({
    data: [
      {
        grade: 10,
        chapterId: ch6.id,
        order: 14,
        title: "Bài 19. Tốc độ phản ứng",
        content:
          "## Khái niệm\n" +
          "- Tốc độ phản ứng được đo bằng sự biến thiên nồng độ của một chất phản ứng hoặc sản phẩm trong một đơn vị thời gian.\n\n" +
          "## Các yếu tố ảnh hưởng đến tốc độ phản ứng\n" +
          "- Nồng độ: nồng độ chất phản ứng tăng thì tốc độ phản ứng tăng.\n" +
          "- Áp suất (đối với phản ứng có chất khí): áp suất tăng làm nồng độ khí tăng, khiến tốc độ phản ứng tăng.\n" +
          "- Nhiệt độ: nhiệt độ tăng thì tốc độ phản ứng tăng; thực nghiệm cho thấy với nhiều phản ứng, cứ tăng thêm 10°C thì tốc độ phản ứng tăng khoảng 2 đến 4 lần.\n" +
          "- Diện tích bề mặt tiếp xúc: diện tích bề mặt tiếp xúc của chất rắn càng lớn thì tốc độ phản ứng càng tăng.\n" +
          "- Chất xúc tác: làm tăng tốc độ phản ứng nhưng không bị biến đổi về khối lượng và tính chất hóa học sau khi phản ứng kết thúc.\n\n" +
          "## Ứng dụng thực tế\n" +
          "- Bảo quản thực phẩm trong tủ lạnh nhằm giảm nhiệt độ, từ đó làm giảm tốc độ phản ứng phân hủy; nghiền nhỏ chất rắn (như than, đá vôi) để tăng diện tích tiếp xúc, giúp phản ứng xảy ra nhanh hơn.",
      },
    ],
  });

  // ================= CHƯƠNG 7: NHÓM HALOGEN =================
  await prisma.document.createMany({
    data: [
      {
        grade: 10,
        chapterId: ch7.id,
        order: 15,
        title: "Bài 21. Nhóm halogen",
        content:
          "## Vị trí, cấu hình electron\n" +
          "- Nhóm halogen (nhóm VIIA) gồm các nguyên tố: fluorine (F), chlorine (Cl), bromine (Br), iodine (I).\n" +
          "- Nguyên tử các nguyên tố này có 7 electron ở lớp ngoài cùng, dễ nhận thêm 1 electron để đạt cấu hình electron bền vững của khí hiếm.\n\n" +
          "## Tính chất vật lí\n" +
          "- Từ F2 đến I2: trạng thái biến đổi từ khí (F2, Cl2) sang lỏng (Br2) rồi đến rắn (I2); màu sắc đậm dần; nhiệt độ nóng chảy và nhiệt độ sôi tăng dần.\n\n" +
          "## Tính chất hóa học\n" +
          "- Các đơn chất halogen đều có tính oxi hóa mạnh, giảm dần từ F2 đến I2.\n" +
          "- Phản ứng với hydrogen tạo thành hydrogen halide:\nH2 + Cl2 -> 2HCl\n" +
          "- Phản ứng với kim loại tạo thành muối halide; phản ứng với nước (trừ F2 có phản ứng mãnh liệt khác biệt):\nCl2 + H2O ⇌ HCl + HClO",
      },
      {
        grade: 10,
        chapterId: ch7.id,
        order: 16,
        title: "Bài 22. Hydrogen halide. Muối halide",
        content:
          "## Hydrogen halide và hydrohalic acid\n" +
          "- Hydrogen halide (HF, HCl, HBr, HI) là những chất khí tan rất tốt trong nước, tạo thành dung dịch acid tương ứng gọi là hydrohalic acid.\n" +
          "- Tính acid tăng dần từ HF đến HI (do năng lượng liên kết H-X giảm dần); riêng HF là acid yếu (do liên kết H-F rất bền) nhưng lại có tính chất đặc biệt là có khả năng ăn mòn thủy tinh.\n\n" +
          "## Muối halide\n" +
          "- Nhận biết ion halide bằng dung dịch AgNO3: AgCl tạo kết tủa trắng, AgBr tạo kết tủa vàng nhạt, AgI tạo kết tủa vàng đậm (riêng AgF tan tốt trong nước, không tạo kết tủa).\n" +
          "- Muối halide có nhiều ứng dụng quan trọng: NaCl (muối ăn), KI (bổ sung iodine cho thực phẩm), AgBr (dùng trong công nghiệp sản xuất phim ảnh).",
      },
    ],
  });

  // ================= QUIZ =================
  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Cấu tạo nguyên tử (Chương 1 - Lớp 10)",
      grade: 10,
      chapterId: ch1.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Hạt nào mang điện dương trong nguyên tử?",
            choices: JSON.stringify(["Proton", "Neutron", "Electron", "Không có hạt nào"]),
            correctIndex: 0,
            explanation: "Proton mang điện tích +1, nằm trong hạt nhân nguyên tử.",
          },
          {
            order: 2,
            content: "Số khối (A) được tính bằng công thức nào?",
            choices: JSON.stringify(["A = Z (số hiệu nguyên tử)", "A = số proton + số neutron", "A = số neutron", "A = số electron"]),
            correctIndex: 1,
            explanation: "Số khối A = Z (số proton) + N (số neutron).",
          },
          {
            order: 3,
            content: "Đồng vị là các nguyên tử:",
            choices: JSON.stringify([
              "Cùng số proton, khác số neutron",
              "Cùng số neutron, khác số proton",
              "Thuộc các nguyên tố hóa học khác nhau",
              "Không tồn tại trong tự nhiên",
            ]),
            correctIndex: 0,
            explanation: "Đồng vị là các nguyên tử của cùng một nguyên tố (cùng số proton) nhưng khác số neutron.",
          },
          {
            order: 4,
            content: "Số electron tối đa ở lớp thứ n được tính theo công thức nào?",
            choices: JSON.stringify(["n", "2n", "n^2", "2n^2"]),
            correctIndex: 3,
            explanation: "Số electron tối đa ở lớp thứ n là 2n^2.",
          },
          {
            order: 5,
            content: "Cấu hình electron của nguyên tử oxygen (Z = 8) là gì?",
            choices: JSON.stringify(["1s2 2s2 2p4", "1s2 2s2 2p6", "1s2 2s2 2p2", "1s2 2s1 2p5"]),
            correctIndex: 0,
            explanation: "Oxygen có 8 electron, phân bố: 1s2 2s2 2p4.",
          },
          {
            order: 6,
            content: "Nguyên tử X có tổng số hạt proton, neutron, electron là 34, trong đó số hạt mang điện gấp 1,833 lần số hạt không mang điện. X là nguyên tố nào?",
            choices: JSON.stringify(["Na (Z=11)", "Mg (Z=12)", "Al (Z=13)", "Si (Z=14)"]),
            correctIndex: 0,
            explanation: "Gọi Z=P=E, N là số neutron: 2Z+N=34 và 2Z=1,833N -> giải ra Z=11, N=12 -> X là Na (Z=11).",
          },
          {
            order: 7,
            content: "Nguyên tử có điện tích hạt nhân +11 (đơn vị điện tích nguyên tố) thì có bao nhiêu electron?",
            choices: JSON.stringify(["10", "11", "12", "23"]),
            correctIndex: 1,
            explanation: "Nguyên tử trung hòa về điện nên số electron bằng số proton, tức bằng 11.",
          },
          {
            order: 8,
            content: "Vì sao khối lượng nguyên tử tập trung hầu như hoàn toàn ở hạt nhân?",
            choices: JSON.stringify([
              "Vì proton và neutron có khối lượng lớn hơn electron rất nhiều lần",
              "Vì hạt nhân có kích thước lớn hơn electron",
              "Vì electron không có khối lượng",
              "Vì hạt nhân mang điện dương",
            ]),
            correctIndex: 0,
            explanation: "Khối lượng electron rất nhỏ (khoảng 1/1840 khối lượng proton), nên khối lượng nguyên tử tập trung ở hạt nhân (chứa proton, neutron).",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Bảng tuần hoàn (Chương 2 - Lớp 10)",
      grade: 10,
      chapterId: ch2.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Các nguyên tố trong bảng tuần hoàn được sắp xếp theo chiều tăng dần của đại lượng nào?",
            choices: JSON.stringify(["Khối lượng nguyên tử", "Điện tích hạt nhân", "Số neutron", "Bán kính nguyên tử"]),
            correctIndex: 1,
            explanation: "Nguyên tắc sắp xếp cơ bản của bảng tuần hoàn là theo chiều tăng dần điện tích hạt nhân.",
          },
          {
            order: 2,
            content: "Trong một chu kì, theo chiều tăng điện tích hạt nhân, bán kính nguyên tử biến đổi như thế nào?",
            choices: JSON.stringify(["Tăng dần", "Giảm dần", "Không đổi", "Biến đổi không theo quy luật"]),
            correctIndex: 1,
            explanation: "Trong một chu kì, bán kính nguyên tử giảm dần do lực hút hạt nhân với electron ngoài cùng tăng.",
          },
          {
            order: 3,
            content: "Trong một nhóm A, theo chiều từ trên xuống dưới, tính kim loại biến đổi như thế nào?",
            choices: JSON.stringify(["Tăng dần", "Giảm dần", "Không đổi", "Không xác định được"]),
            correctIndex: 0,
            explanation: "Trong một nhóm A, từ trên xuống dưới, tính kim loại tăng dần, tính phi kim giảm dần.",
          },
          {
            order: 4,
            content: "Nguyên tố nào có độ âm điện lớn nhất trong bảng tuần hoàn?",
            choices: JSON.stringify(["Oxygen", "Fluorine", "Chlorine", "Nitrogen"]),
            correctIndex: 1,
            explanation: "Fluorine (F) là nguyên tố có độ âm điện lớn nhất.",
          },
          {
            order: 5,
            content: "Nguyên tố X thuộc chu kì 3, nhóm VIIA. X là nguyên tố nào?",
            choices: JSON.stringify(["F", "Cl", "Br", "S"]),
            correctIndex: 1,
            explanation: "Chu kì 3 nhóm VIIA là chlorine (Cl), cấu hình 1s2 2s2 2p6 3s2 3p5.",
          },
          {
            order: 6,
            content: "Oxide cao nhất của nguyên tố thuộc nhóm VIA có công thức tổng quát nào?",
            choices: JSON.stringify(["RO", "RO2", "RO3", "R2O5"]),
            correctIndex: 2,
            explanation: "Nguyên tố nhóm VIA có hóa trị cao nhất với oxygen là VI, oxide cao nhất có công thức RO3 (ví dụ SO3)." ,
          },
          {
            order: 7,
            content: "So sánh tính phi kim của O, S, Se (cùng nhóm VIA): thứ tự giảm dần là?",
            choices: JSON.stringify(["O > S > Se", "Se > S > O", "S > O > Se", "O > Se > S"]),
            correctIndex: 0,
            explanation: "Trong cùng nhóm A, tính phi kim giảm dần từ trên xuống dưới nên O > S > Se.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Liên kết hóa học (Chương 3 - Lớp 10)",
      grade: 10,
      chapterId: ch3.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Theo quy tắc octet, nguyên tử có xu hướng đạt cấu hình bền vững với bao nhiêu electron lớp ngoài cùng (trừ helium)?",
            choices: JSON.stringify(["2", "6", "8", "10"]),
            correctIndex: 2,
            explanation: "Quy tắc octet: nguyên tử có xu hướng đạt 8 electron lớp ngoài cùng (riêng He là 2).",
          },
          {
            order: 2,
            content: "Liên kết ion được hình thành nhờ:",
            choices: JSON.stringify([
              "Lực hút tĩnh điện giữa các ion trái dấu",
              "Cặp electron dùng chung",
              "Lực hút giữa các phân tử trung hòa",
              "Sự chia sẻ neutron giữa 2 nguyên tử",
            ]),
            correctIndex: 0,
            explanation: "Liên kết ion hình thành do lực hút tĩnh điện giữa cation và anion.",
          },
          {
            order: 3,
            content: "Liên kết cộng hóa trị không cực thường gặp trong phân tử nào?",
            choices: JSON.stringify(["HCl", "Cl2", "NaCl", "H2O"]),
            correctIndex: 1,
            explanation: "Cl2 gồm 2 nguyên tử giống nhau nên cặp electron dùng chung không lệch, là liên kết không cực.",
          },
          {
            order: 4,
            content: "Liên kết hydrogen giúp giải thích tính chất đặc biệt nào của nước?",
            choices: JSON.stringify([
              "Nhiệt độ sôi cao bất thường so với phân tử khối tương đương",
              "Nước không màu",
              "Nước không dẫn điện",
              "Nước có vị ngọt",
            ]),
            correctIndex: 0,
            explanation: "Liên kết hydrogen giữa các phân tử nước khiến nhiệt độ sôi của nước cao hơn nhiều so với dự đoán dựa trên phân tử khối.",
          },
          {
            order: 5,
            content: "Nguyên tử Mg (Z=12) nhường bao nhiêu electron để đạt cấu hình bền của khí hiếm?",
            choices: JSON.stringify(["1", "2", "3", "8"]),
            correctIndex: 1,
            explanation: "Mg có cấu hình 1s2 2s2 2p6 3s2, nhường 2 electron lớp ngoài cùng để đạt cấu hình bền của Ne.",
          },
          {
            order: 6,
            content: "Hợp chất nào sau đây có liên kết cộng hóa trị có cực?",
            choices: JSON.stringify(["Cl2", "N2", "HCl", "H2"]),
            correctIndex: 2,
            explanation: "HCl gồm 2 nguyên tử khác nhau (H và Cl có độ âm điện khác nhau) nên cặp electron dùng chung lệch về Cl, tạo liên kết có cực.",
          },
          {
            order: 7,
            content: "Tương tác van der Waals có xu hướng biến đổi như thế nào khi khối lượng phân tử tăng?",
            choices: JSON.stringify(["Giảm dần", "Tăng dần", "Không đổi", "Biến mất hoàn toàn"]),
            correctIndex: 1,
            explanation: "Tương tác van der Waals có xu hướng tăng theo khối lượng phân tử và diện tích tiếp xúc bề mặt.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Phản ứng oxi hóa - khử (Chương 4 - Lớp 10)",
      grade: 10,
      chapterId: ch4.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Chất khử là chất:",
            choices: JSON.stringify(["Nhường electron", "Nhận electron", "Không tham gia phản ứng", "Luôn luôn là phi kim"]),
            correctIndex: 0,
            explanation: "Chất khử nhường electron, làm số oxi hóa của nó tăng lên.",
          },
          {
            order: 2,
            content: "Trong phản ứng Zn + CuSO4 -> ZnSO4 + Cu, chất nào đóng vai trò chất oxi hóa?",
            choices: JSON.stringify(["Zn", "Cu^2+ (trong CuSO4)", "Gốc SO4^2-", "ZnSO4"]),
            correctIndex: 1,
            explanation: "Cu^2+ nhận electron (từ +2 xuống 0) nên là chất oxi hóa; Zn nhường electron nên là chất khử.",
          },
          {
            order: 3,
            content: "Trong hầu hết các hợp chất, oxygen có số oxi hóa là bao nhiêu?",
            choices: JSON.stringify(["+1", "-1", "-2", "+2"]),
            correctIndex: 2,
            explanation: "Oxygen thường có số oxi hóa -2, trừ một số trường hợp đặc biệt như peroxide, OF2.",
          },
          {
            order: 4,
            content: "Số oxi hóa của S trong H2SO4 là bao nhiêu?",
            choices: JSON.stringify(["+4", "+6", "-2", "+2"]),
            correctIndex: 1,
            explanation: "H(+1)x2 + S(x) + O(-2)x4 = 0 -> 2 + x - 8 = 0 -> x = +6.",
          },
          {
            order: 5,
            content: "Trong phản ứng 2Na + Cl2 -> 2NaCl, chất nào là chất oxi hóa?",
            choices: JSON.stringify(["Na", "Cl2", "NaCl", "Không có chất oxi hóa"]),
            correctIndex: 1,
            explanation: "Cl2 nhận electron (từ 0 xuống -1) nên là chất oxi hóa; Na nhường electron nên là chất khử.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Năng lượng hóa học (Chương 5 - Lớp 10)",
      grade: 10,
      chapterId: ch5.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Phản ứng tỏa nhiệt có biến thiên enthalpy (ΔrH) như thế nào?",
            choices: JSON.stringify(["ΔrH > 0", "ΔrH < 0", "ΔrH = 0", "Không xác định được"]),
            correctIndex: 1,
            explanation: "Phản ứng tỏa nhiệt giải phóng năng lượng ra môi trường nên có ΔrH < 0.",
          },
          {
            order: 2,
            content: "Enthalpy tạo thành chuẩn được xác định ở điều kiện nào?",
            choices: JSON.stringify(["0°C, 1 atm", "25°C, 1 bar", "100°C, 1 bar", "Bất kỳ điều kiện nào"]),
            correctIndex: 1,
            explanation: "Điều kiện chuẩn để xác định enthalpy tạo thành chuẩn là 25°C, 1 bar.",
          },
          {
            order: 3,
            content: "Phản ứng thu nhiệt là phản ứng:",
            choices: JSON.stringify([
              "Giải phóng năng lượng ra môi trường",
              "Hấp thụ năng lượng từ môi trường",
              "Không trao đổi năng lượng với môi trường",
              "Luôn xảy ra ở nhiệt độ phòng",
            ]),
            correctIndex: 1,
            explanation: "Phản ứng thu nhiệt hấp thụ năng lượng từ môi trường xung quanh, có ΔrH > 0.",
          },
          {
            order: 4,
            content: "Phản ứng đốt cháy nhiên liệu (than, xăng dầu) thuộc loại phản ứng nào?",
            choices: JSON.stringify(["Thu nhiệt", "Tỏa nhiệt", "Không tỏa/thu nhiệt", "Chỉ xảy ra khi có ánh sáng"]),
            correctIndex: 1,
            explanation: "Đốt cháy nhiên liệu là phản ứng tỏa nhiệt mạnh, được dùng để cung cấp năng lượng.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Tốc độ phản ứng (Chương 6 - Lớp 10)",
      grade: 10,
      chapterId: ch6.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Yếu tố nào sau đây làm tăng tốc độ phản ứng?",
            choices: JSON.stringify(["Giảm nhiệt độ", "Giảm nồng độ chất phản ứng", "Tăng diện tích bề mặt tiếp xúc", "Giảm diện tích bề mặt tiếp xúc"]),
            correctIndex: 2,
            explanation: "Tăng diện tích bề mặt tiếp xúc (nghiền nhỏ chất rắn) làm tăng tốc độ phản ứng.",
          },
          {
            order: 2,
            content: "Chất xúc tác có đặc điểm gì sau khi phản ứng kết thúc?",
            choices: JSON.stringify([
              "Bị tiêu hao hoàn toàn",
              "Không bị biến đổi về khối lượng và tính chất",
              "Biến đổi thành một chất hoàn toàn khác",
              "Luôn luôn là kim loại",
            ]),
            correctIndex: 1,
            explanation: "Chất xúc tác làm tăng tốc độ phản ứng nhưng không bị biến đổi về khối lượng và tính chất sau phản ứng.",
          },
          {
            order: 3,
            content: "Thực nghiệm cho thấy cứ tăng thêm 10°C thì tốc độ nhiều phản ứng tăng khoảng mấy lần?",
            choices: JSON.stringify(["1-2 lần", "2-4 lần", "5-6 lần", "10 lần"]),
            correctIndex: 1,
            explanation: "Với nhiều phản ứng, cứ tăng 10°C thì tốc độ phản ứng tăng khoảng 2-4 lần (quy tắc Van't Hoff gần đúng)." ,
          },
          {
            order: 4,
            content: "Vì sao thực phẩm để trong tủ lạnh lâu hỏng hơn để ở nhiệt độ phòng?",
            choices: JSON.stringify([
              "Vì nhiệt độ thấp làm giảm tốc độ phản ứng phân hủy",
              "Vì tủ lạnh diệt hết vi khuẩn hoàn toàn",
              "Vì tủ lạnh làm tăng nồng độ chất bảo quản",
              "Không liên quan gì đến tốc độ phản ứng",
            ]),
            correctIndex: 0,
            explanation: "Nhiệt độ thấp làm giảm tốc độ các phản ứng/quá trình phân hủy sinh hóa trong thực phẩm.",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Nhóm Halogen (Chương 7 - Lớp 10)",
      grade: 10,
      chapterId: ch7.id,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Nhóm halogen thuộc nhóm nào trong bảng tuần hoàn?",
            choices: JSON.stringify(["IA", "IIA", "VIIA", "VIIIA"]),
            correctIndex: 2,
            explanation: "Nhóm halogen là nhóm VIIA, gồm F, Cl, Br, I.",
          },
          {
            order: 2,
            content: "Đơn chất halogen nào có tính oxi hóa mạnh nhất?",
            choices: JSON.stringify(["F2", "Cl2", "Br2", "I2"]),
            correctIndex: 0,
            explanation: "Tính oxi hóa của các đơn chất halogen giảm dần từ F2 đến I2, nên F2 mạnh nhất.",
          },
          {
            order: 3,
            content: "Nhỏ dung dịch AgNO3 vào dung dịch chứa ion Cl- sẽ tạo kết tủa màu gì?",
            choices: JSON.stringify(["Trắng", "Vàng nhạt", "Vàng đậm", "Đen"]),
            correctIndex: 0,
            explanation: "AgCl là kết tủa trắng, dùng để nhận biết ion Cl- trong dung dịch.",
          },
          {
            order: 4,
            content: "Hydrohalic acid nào có tính acid yếu nhất trong dãy HF, HCl, HBr, HI?",
            choices: JSON.stringify(["HF", "HCl", "HBr", "HI"]),
            correctIndex: 0,
            explanation: "HF có tính acid yếu nhất do liên kết H-F rất bền, dù các acid còn lại đều mạnh và tăng dần từ HCl đến HI.",
          },
          {
            order: 5,
            content: "Khí Cl2 tác dụng với dung dịch NaOH loãng nguội tạo ra sản phẩm nào?",
            choices: JSON.stringify(["Chỉ tạo NaCl", "NaCl và NaClO", "Chỉ tạo NaClO", "Không phản ứng"]),
            correctIndex: 1,
            explanation: "Cl2 + 2NaOH -> NaCl + NaClO + H2O (phản ứng tự oxi hóa - khử của chlorine).",
          },
          {
            order: 6,
            content: "Cho 7,1 gam Cl2 (M=71) tác dụng hết với Na dư: Cl2 + 2Na -> 2NaCl. Khối lượng NaCl tạo thành là?",
            choices: JSON.stringify(["11,7 gam", "23,4 gam", "35,1 gam", "46,8 gam"]),
            correctIndex: 0,
            explanation: "n(Cl2)=7,1/71=0,1 mol -> n(NaCl)=0,2 mol -> m=0,2x58,5=11,7 gam.",
          },
        ],
      },
    },
  });

  // ================= FLASHCARD SETS =================
  await prisma.flashcardSet.create({
    data: {
      grade: 10,
      chapterId: ch1.id,
      topic: "Cấu tạo nguyên tử",
      cards: {
        create: [
          { order: 1, term: "Proton", meaning: "Hạt mang điện dương trong hạt nhân nguyên tử" },
          { order: 2, term: "Neutron", meaning: "Hạt không mang điện trong hạt nhân nguyên tử" },
          { order: 3, term: "Đồng vị", meaning: "Các nguyên tử cùng số proton, khác số neutron" },
          { order: 4, term: "2n^2", meaning: "Số electron tối đa ở lớp thứ n" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 10,
      chapterId: ch2.id,
      topic: "Bảng tuần hoàn",
      cards: {
        create: [
          { order: 1, term: "Chu kì", meaning: "Dãy nguyên tố có cùng số lớp electron" },
          { order: 2, term: "Nhóm A", meaning: "Số thứ tự nhóm bằng số electron lớp ngoài cùng" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 10,
      chapterId: ch3.id,
      topic: "Liên kết hóa học",
      cards: {
        create: [
          { order: 1, term: "Quy tắc octet", meaning: "Xu hướng đạt 8 electron lớp ngoài cùng để bền vững" },
          { order: 2, term: "Liên kết ion", meaning: "Lực hút tĩnh điện giữa các ion trái dấu" },
          { order: 3, term: "Liên kết cộng hóa trị", meaning: "Dùng chung cặp electron giữa 2 nguyên tử" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 10,
      chapterId: ch4.id,
      topic: "Phản ứng oxi hóa - khử",
      cards: {
        create: [
          { order: 1, term: "Chất khử", meaning: "Chất nhường electron, số oxi hóa tăng" },
          { order: 2, term: "Chất oxi hóa", meaning: "Chất nhận electron, số oxi hóa giảm" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 10,
      chapterId: ch5.id,
      topic: "Năng lượng hóa học",
      cards: {
        create: [
          { order: 1, term: "ΔrH < 0", meaning: "Phản ứng tỏa nhiệt" },
          { order: 2, term: "ΔrH > 0", meaning: "Phản ứng thu nhiệt" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 10,
      chapterId: ch6.id,
      topic: "Tốc độ phản ứng",
      cards: {
        create: [{ order: 1, term: "Chất xúc tác", meaning: "Tăng tốc độ phản ứng, không bị biến đổi sau phản ứng" }],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 10,
      chapterId: ch7.id,
      topic: "Nhóm Halogen",
      cards: {
        create: [
          { order: 1, term: "F2, Cl2, Br2, I2", meaning: "Các đơn chất halogen, tính oxi hóa giảm dần" },
          { order: 2, term: "AgCl", meaning: "Kết tủa trắng, dùng nhận biết ion Cl-" },
          { order: 3, term: "AgBr", meaning: "Kết tủa vàng nhạt, dùng nhận biết ion Br-" },
          { order: 4, term: "AgI", meaning: "Kết tủa vàng đậm, dùng nhận biết ion I-" },
        ],
      },
    },
  });

  // ================= BÀI TẬP LUYỆN TẬP (PRACTICE) =================
  await prisma.practiceQuestion.createMany({
    data: [
      // Chương 1
      { chapterId: ch1.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Hạt nhân nguyên tử được cấu tạo từ những hạt nào?", choices: JSON.stringify(["Proton và neutron", "Proton và electron", "Neutron và electron", "Chỉ có proton"]), correctIndex: 0, explanation: "Hạt nhân gồm proton (mang điện dương) và neutron (không mang điện)." },
      { chapterId: ch1.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "Nguyên tử X có Z=17. Số electron ở lớp ngoài cùng của X là bao nhiêu?", choices: JSON.stringify(["5", "6", "7", "8"]), correctIndex: 2, explanation: "Cấu hình X (Z=17): 1s2 2s2 2p6 3s2 3p5 -> lớp ngoài cùng (lớp 3) có 7 electron." },
      { chapterId: ch1.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Nguyên tử của nguyên tố Y có tổng số hạt (p+n+e) là 40, trong đó số hạt mang điện nhiều hơn số hạt không mang điện là 12. Số proton của Y là?", choices: JSON.stringify(["12", "13", "14", "15"]), correctIndex: 1, explanation: "2Z+N=40 và 2Z-N=12 -> cộng lại: 4Z=52 -> Z=13." },

      // Chương 2
      { chapterId: ch2.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Nguyên tố có Z=20 thuộc chu kì mấy?", choices: JSON.stringify(["3", "4", "5", "2"]), correctIndex: 1, explanation: "Ca (Z=20) có cấu hình 1s2 2s2 2p6 3s2 3p6 4s2, có 4 lớp electron nên thuộc chu kì 4." },
      { chapterId: ch2.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "So sánh tính kim loại của Na, Mg, Al (cùng chu kì 3): thứ tự giảm dần là?", choices: JSON.stringify(["Na > Mg > Al", "Al > Mg > Na", "Mg > Na > Al", "Al > Na > Mg"]), correctIndex: 0, explanation: "Trong cùng chu kì, tính kim loại giảm dần từ trái sang phải nên Na > Mg > Al." },
      { chapterId: ch2.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Oxide cao nhất của nguyên tố R có công thức RO2. R thuộc nhóm nào?", choices: JSON.stringify(["IIA", "IVA", "VIA", "VIIA"]), correctIndex: 1, explanation: "Hóa trị cao nhất với oxygen của R là IV (RO2) nên R thuộc nhóm IVA." },

      // Chương 3
      { chapterId: ch3.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Liên kết ion thường hình thành giữa loại nguyên tố nào?", choices: JSON.stringify(["Kim loại điển hình và phi kim điển hình", "Hai phi kim giống nhau", "Hai kim loại", "Hai khí hiếm"]), correctIndex: 0, explanation: "Liên kết ion hình thành giữa kim loại điển hình (dễ nhường electron) và phi kim điển hình (dễ nhận electron)." },
      { chapterId: ch3.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "Phân tử nào sau đây chỉ có liên kết cộng hóa trị không cực?", choices: JSON.stringify(["HCl", "N2", "H2O", "NH3"]), correctIndex: 1, explanation: "N2 gồm 2 nguyên tử N giống nhau nên liên kết cộng hóa trị không cực." },
      { chapterId: ch3.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Giải thích vì sao NaCl có nhiệt độ nóng chảy rất cao (801°C)?", choices: JSON.stringify(["Vì là hợp chất ion, lực hút tĩnh điện giữa các ion rất mạnh", "Vì NaCl có khối lượng phân tử lớn", "Vì NaCl có liên kết cộng hóa trị", "Vì NaCl không tan trong nước"]), correctIndex: 0, explanation: "NaCl là hợp chất ion, lực hút tĩnh điện giữa Na+ và Cl- trong mạng tinh thể rất mạnh nên cần nhiệt độ cao để phá vỡ." },

      // Chương 4
      { chapterId: ch4.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Chất oxi hóa là chất:", choices: JSON.stringify(["Nhường electron", "Nhận electron", "Không đổi số oxi hóa", "Luôn là kim loại"]), correctIndex: 1, explanation: "Chất oxi hóa nhận electron, làm số oxi hóa của nó giảm xuống." },
      { chapterId: ch4.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "Số oxi hóa của Mn trong KMnO4 là bao nhiêu?", choices: JSON.stringify(["+2", "+4", "+6", "+7"]), correctIndex: 3, explanation: "K(+1) + Mn(x) + O(-2)x4 = 0 -> 1+x-8=0 -> x=+7." },
      { chapterId: ch4.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Cân bằng phản ứng Fe2O3 + CO -> Fe + CO2 bằng phương pháp thăng bằng electron, hệ số của CO là bao nhiêu?", choices: JSON.stringify(["1", "2", "3", "4"]), correctIndex: 2, explanation: "Phương trình cân bằng: Fe2O3 + 3CO -> 2Fe + 3CO2, hệ số CO là 3." },

      // Chương 5
      { chapterId: ch5.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Đơn vị thường dùng của biến thiên enthalpy là gì?", choices: JSON.stringify(["kJ hoặc kJ/mol", "lít", "mol/L", "độ C"]), correctIndex: 0, explanation: "Biến thiên enthalpy (ΔrH) thường có đơn vị kJ hoặc kJ/mol." },
      { chapterId: ch5.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Cho phản ứng C(s) + O2(g) -> CO2(g), ΔfH°(CO2)=-393,5 kJ/mol. Đốt cháy 1 mol than (carbon) tỏa ra bao nhiêu kJ?", choices: JSON.stringify(["+393,5 kJ", "-393,5 kJ", "-196,75 kJ", "-787 kJ"]), correctIndex: 1, explanation: "ΔrH° = ΔfH°(CO2) - ΔfH°(C) - ΔfH°(O2) = -393,5 - 0 - 0 = -393,5 kJ (tỏa nhiệt)." },

      // Chương 6
      { chapterId: ch6.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Tốc độ phản ứng được đo bằng sự biến thiên đại lượng nào theo thời gian?", choices: JSON.stringify(["Nồng độ chất phản ứng hoặc sản phẩm", "Khối lượng bình phản ứng", "Màu sắc dung dịch", "Áp suất khí quyển"]), correctIndex: 0, explanation: "Tốc độ phản ứng đo bằng sự biến thiên nồng độ của chất phản ứng hoặc sản phẩm trong một đơn vị thời gian." },
      { chapterId: ch6.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "Đun sôi nước nhanh hơn ở áp suất cao vì lý do gì liên quan đến tốc độ phản ứng/quá trình?", choices: JSON.stringify(["Nhiệt độ sôi tăng làm tăng tốc độ quá trình", "Áp suất làm giảm nồng độ", "Không liên quan gì", "Áp suất làm giảm nhiệt độ"]), correctIndex: 0, explanation: "Áp suất cao làm nước sôi ở nhiệt độ cao hơn, giúp tăng tốc độ nấu chín thức ăn." },

      // Chương 7
      { chapterId: ch7.id, difficulty: "NHAN_BIET", source: "SBT KNTT", content: "Đơn chất halogen nào ở thể lỏng tại điều kiện thường?", choices: JSON.stringify(["F2", "Cl2", "Br2", "I2"]), correctIndex: 2, explanation: "Br2 (bromine) là chất lỏng màu nâu đỏ ở điều kiện thường; F2, Cl2 là khí, I2 là chất rắn." },
      { chapterId: ch7.id, difficulty: "THONG_HIEU", source: "SBT KNTT", content: "Vì sao HF là acid yếu trong khi HCl, HBr, HI đều là acid mạnh?", choices: JSON.stringify(["Vì liên kết H-F rất bền, khó phân li ra ion H+", "Vì F có tính oxi hóa yếu", "Vì HF không tan trong nước", "Vì F có bán kính nguyên tử lớn"]), correctIndex: 0, explanation: "Liên kết H-F rất bền (năng lượng liên kết lớn) khiến HF khó phân li hoàn toàn ra ion trong nước, nên là acid yếu." },
      { chapterId: ch7.id, difficulty: "VAN_DUNG", source: "SBT KNTT", content: "Cho 4,25 gam AgNO3 (M=170) phản ứng vừa đủ với dung dịch NaCl: AgNO3+NaCl->AgCl+NaNO3. Khối lượng kết tủa AgCl thu được là?", choices: JSON.stringify(["1,4375 gam", "2,875 gam", "3,5875 gam", "5,75 gam"]), correctIndex: 2, explanation: "n(AgNO3)=4,25/170=0,025 mol -> n(AgCl)=0,025 mol -> m=0,025x143,5=3,5875 gam." },
    ],
  });

  console.log("Đã thêm đầy đủ dữ liệu Hóa học Lớp 10 theo SGK Hóa học (Kết nối tri thức):");
  console.log("- 7 chương, 16 tài liệu, 7 đề kiểm tra, 7 bộ flashcard");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
