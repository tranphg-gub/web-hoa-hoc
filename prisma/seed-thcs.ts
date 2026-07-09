import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Nội dung Hóa học lớp 8-9 dựa theo SGK Khoa học tự nhiên (Kết nối tri thức):
 * - Lớp 8: Chương I (Phản ứng hóa học, bài 2-7), Chương II (Một số hợp chất thông dụng, bài 8-12)
 * - Lớp 9: Chương 6 (Kim loại, bài 18-21), Chương 7 (Hydrocarbon, bài 22-25),
 *          Chương 8 (Ethylic alcohol - Acetic acid, bài 26-27), Chương 9 (Lipid-Carbohydrate-Protein-Polymer, bài 28-32)
 * Cấu trúc chương/bài và các mốc số liệu (24,79 lít/mol ở đkc; dãy hoạt động hóa học...)
 * đã được đối chiếu với sách scan gốc và nhiều nguồn tham khảo để đảm bảo chính xác.
 */

async function main() {
  await prisma.question.deleteMany({ where: { quiz: { grade: { in: [8, 9] } } } });
  await prisma.quiz.deleteMany({ where: { grade: { in: [8, 9] } } });
  await prisma.flashcard.deleteMany({ where: { set: { grade: { in: [8, 9] } } } });
  await prisma.flashcardSet.deleteMany({ where: { grade: { in: [8, 9] } } });
  await prisma.document.deleteMany({ where: { grade: { in: [8, 9] } } });

  // ================= LỚP 8 - CHƯƠNG I: PHẢN ỨNG HÓA HỌC =================
  await prisma.document.createMany({
    data: [
      {
        grade: 8,
        chapter: "Chương I. Phản ứng hóa học",
        order: 1,
        title: "Bài 2. Phản ứng hóa học",
        content:
          "## Biến đổi vật lí và biến đổi hóa học\n" +
          "- Biến đổi vật lí: chất biến đổi về trạng thái, hình dạng, kích thước nhưng vẫn giữ nguyên là chất ban đầu (ví dụ: nước đá tan chảy, hòa tan đường vào nước).\n" +
          "- Biến đổi hóa học: chất biến đổi tạo thành chất mới, có tính chất khác hẳn chất ban đầu (ví dụ: đốt cháy giấy, đinh sắt bị gỉ).\n\n" +
          "## Phản ứng hóa học\n" +
          "- Phản ứng hóa học là quá trình biến đổi từ chất này (chất phản ứng) thành chất khác (sản phẩm).\n" +
          "- Trong phản ứng hóa học chỉ có liên kết giữa các nguyên tử thay đổi làm phân tử này biến đổi thành phân tử khác, còn số nguyên tử của mỗi nguyên tố vẫn được giữ nguyên trước và sau phản ứng.\n\n" +
          "## Dấu hiệu và điều kiện xảy ra\n" +
          "- Dấu hiệu nhận biết: có chất mới tạo thành với tính chất khác chất ban đầu như đổi màu, tạo kết tủa, tạo chất khí (sủi bọt), tỏa nhiệt hoặc phát sáng.\n" +
          "- Điều kiện xảy ra: các chất phản ứng phải tiếp xúc với nhau; một số phản ứng cần được đun nóng hoặc cần có chất xúc tác mới xảy ra được.\n\n" +
          "## Ví dụ minh họa\n" +
          "Đốt cháy than trong khí oxygen tạo ra khí carbon dioxide:\nC + O2 -> CO2\n" +
          "- Dấu hiệu: than cháy sáng, tỏa nhiều nhiệt, sinh ra khí mới không màu, không mùi.\n\n" +
          "## Lưu ý\n" +
          "- Đừng nhầm biến đổi vật lí với biến đổi hóa học: nước đá tan thành nước lỏng vẫn là H2O, không sinh ra chất mới nên KHÔNG phải phản ứng hóa học.",
      },
      {
        grade: 8,
        chapter: "Chương I. Phản ứng hóa học",
        order: 2,
        title: "Bài 3. Mol và tỉ khối chất khí",
        content:
          "## Mol và số Avogadro\n" +
          "- Mol là lượng chất có chứa NA = 6,022×10^23 hạt vi mô (nguyên tử, phân tử,...) của chất đó. NA gọi là số Avogadro.\n" +
          "- Khối lượng mol (kí hiệu M) của một chất là khối lượng tính bằng gam của NA hạt vi mô chất đó, có trị số bằng nguyên tử khối hoặc phân tử khối. Ví dụ khối lượng mol của H2O là 18 g/mol.\n\n" +
          "## Công thức tính số mol\n" +
          "- n = m/M (n: số mol; m: khối lượng chất, gam; M: khối lượng mol, g/mol).\n\n" +
          "## Thể tích mol chất khí\n" +
          "- Ở điều kiện chuẩn (25°C, 1 bar, viết tắt là đkc), 1 mol khí bất kì đều chiếm thể tích 24,79 lít.\n" +
          "- Với n mol khí ở đkc, thể tích được tính bằng công thức: V = n x 24,79 (lít)\n\n" +
          "## Tỉ khối chất khí\n" +
          "- Tỉ khối của khí A so với khí B cho biết khí A nặng hay nhẹ hơn khí B bao nhiêu lần: d(A/B) = M(A)/M(B).\n" +
          "- Tỉ khối của khí A so với không khí (không khí có khối lượng mol trung bình khoảng 29 g/mol): d(A/kk) = M(A)/29\n\n" +
          "## Ví dụ minh họa\n" +
          "Tính khối lượng và thể tích (ở đkc) của 0,5 mol khí CO2 (M = 44 g/mol):\n" +
          "- Khối lượng: m = n x M = 0,5 x 44 = 22 gam.\n" +
          "- Thể tích: V = n x 24,79 = 0,5 x 24,79 = 12,395 lít.",
      },
      {
        grade: 8,
        chapter: "Chương I. Phản ứng hóa học",
        order: 3,
        title: "Bài 4. Dung dịch và nồng độ",
        content:
          "## Dung dịch và độ tan\n" +
          "- Dung dịch là hỗn hợp đồng nhất của dung môi và chất tan.\n" +
          "- Độ tan (kí hiệu S) của một chất trong nước là số gam chất đó tan tối đa trong 100 gam nước để tạo thành dung dịch bão hòa ở một nhiệt độ xác định.\n\n" +
          "## Nồng độ phần trăm\n" +
          "- C% = (m chất tan / m dung dịch) x 100%\n" +
          "- Khối lượng dung dịch bằng khối lượng chất tan cộng khối lượng dung môi.\n\n" +
          "## Nồng độ mol\n" +
          "- CM = n / V (n: số mol chất tan; V: thể tích dung dịch, lít; đơn vị CM là mol/lít).\n\n" +
          "## Ví dụ minh họa\n" +
          "Hòa tan 20 gam muối ăn (NaCl) vào 80 gam nước:\n" +
          "- Khối lượng dung dịch = 20 + 80 = 100 gam.\n" +
          "- C% = (20/100) x 100% = 20%.",
      },
      {
        grade: 8,
        chapter: "Chương I. Phản ứng hóa học",
        order: 4,
        title: "Bài 5. Định luật bảo toàn khối lượng và phương trình hóa học",
        content:
          "## Định luật bảo toàn khối lượng\n" +
          "- Nội dung (Lavoisier): trong một phản ứng hóa học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng của các chất phản ứng.\n" +
          "- Nếu chất A phản ứng với chất B tạo ra chất C và D thì: m(A) + m(B) = m(C) + m(D)\n\n" +
          "## Phương trình hóa học\n" +
          "- Phương trình hóa học dùng để biểu diễn ngắn gọn phản ứng hóa học bằng công thức hóa học của các chất, trong đó số nguyên tử mỗi nguyên tố ở hai vế phải bằng nhau (đã được cân bằng).\n\n" +
          "## Các bước lập phương trình hóa học\n" +
          "- Viết sơ đồ phản ứng gồm công thức hóa học của các chất phản ứng và sản phẩm.\n" +
          "- Cân bằng số nguyên tử của mỗi nguyên tố ở hai vế bằng cách thêm hệ số thích hợp.\n" +
          "- Hoàn thành phương trình hóa học.\n\n" +
          "## Ví dụ minh họa\n" +
          "Cân bằng phương trình đốt cháy sắt trong oxygen:\n3Fe + 2O2 -> Fe3O4\n" +
          "- Kiểm tra: vế trái có 3 nguyên tử Fe, 4 nguyên tử O; vế phải có 3 Fe và 4 O trong Fe3O4 - đã cân bằng.",
      },
      {
        grade: 8,
        chapter: "Chương I. Phản ứng hóa học",
        order: 5,
        title: "Bài 6. Tính theo phương trình hóa học",
        content:
          "## Nguyên tắc\n" +
          "- Dựa vào phương trình hóa học đã cân bằng, tỉ lệ số mol giữa các chất trong phản ứng chính là tỉ lệ hệ số của chúng trong phương trình.\n" +
          "- Từ đó có thể tính số mol, khối lượng hoặc thể tích của một chất khi biết số mol, khối lượng hoặc thể tích của một chất khác trong cùng phản ứng.\n\n" +
          "## Các bước giải\n" +
          "- Đổi dữ kiện đề bài (khối lượng, thể tích khí ở đkc,...) ra số mol.\n" +
          "- Viết phương trình hóa học và cân bằng.\n" +
          "- Lập tỉ lệ số mol giữa chất đã biết và chất cần tìm theo hệ số trong phương trình.\n" +
          "- Tính số mol chất cần tìm, sau đó đổi ra khối lượng hoặc thể tích theo yêu cầu của đề bài.\n\n" +
          "## Ví dụ minh họa\n" +
          "Cho 6,5 gam kẽm (Zn, M = 65 g/mol) phản ứng hết với dung dịch HCl dư:\nZn + 2HCl -> ZnCl2 + H2\n" +
          "- Số mol Zn: n = 6,5/65 = 0,1 mol.\n" +
          "- Theo phương trình, tỉ lệ Zn : H2 = 1 : 1 nên n(H2) = 0,1 mol.\n" +
          "- Thể tích khí H2 ở đkc: V = 0,1 x 24,79 = 2,479 lít.",
      },
      {
        grade: 8,
        chapter: "Chương I. Phản ứng hóa học",
        order: 6,
        title: "Bài 7. Tốc độ phản ứng và chất xúc tác",
        content:
          "## Khái niệm\n" +
          "- Tốc độ phản ứng là đại lượng đặc trưng cho sự nhanh, chậm của một phản ứng hóa học.\n\n" +
          "## Các yếu tố ảnh hưởng\n" +
          "- Nồng độ: nồng độ chất phản ứng càng cao, tốc độ phản ứng càng lớn.\n" +
          "- Nhiệt độ: nhiệt độ càng cao, tốc độ phản ứng càng lớn.\n" +
          "- Diện tích bề mặt tiếp xúc: diện tích bề mặt càng lớn (chất rắn được nghiền nhỏ), tốc độ phản ứng càng lớn.\n" +
          "- Chất xúc tác: là chất làm tăng tốc độ phản ứng nhưng không bị tiêu hao trong quá trình phản ứng.\n\n" +
          "## Ví dụ thực tế\n" +
          "- Than củi đập nhỏ cháy nhanh hơn than để nguyên cục do diện tích tiếp xúc với oxygen tăng lên.\n" +
          "- Thực phẩm bảo quản trong tủ lạnh (nhiệt độ thấp) lâu hỏng hơn để ở ngoài không khí.\n\n" +
          "## Lưu ý\n" +
          "- Chất xúc tác KHÔNG bị biến đổi về khối lượng và tính chất hóa học sau phản ứng - đây là điểm phân biệt với các chất phản ứng thông thường.",
      },
      // ================= LỚP 8 - CHƯƠNG II =================
      {
        grade: 8,
        chapter: "Chương II. Một số hợp chất thông dụng",
        order: 7,
        title: "Bài 8. Acid",
        content:
          "## Khái niệm\n" +
          "- Acid là những hợp chất trong phân tử có nguyên tử hydrogen liên kết với gốc acid; khi tan trong nước, acid phân li ra ion H+ (cation hydrogen).\n\n" +
          "## Tính chất hóa học\n" +
          "- Làm quỳ tím chuyển sang màu đỏ.\n" +
          "- Tác dụng với kim loại đứng trước hydrogen trong dãy hoạt động hóa học, giải phóng khí H2: Zn + 2HCl -> ZnCl2 + H2\n" +
          "- Tác dụng với base tạo thành muối và nước (phản ứng trung hòa): HCl + NaOH -> NaCl + H2O\n" +
          "- Tác dụng với oxide base tạo thành muối và nước.\n\n" +
          "## Một số acid thường gặp\n" +
          "- HCl (hydrochloric acid), H2SO4 (sulfuric acid), HNO3 (nitric acid): các acid vô cơ mạnh.\n" +
          "- CH3COOH (acetic acid): acid hữu cơ yếu, có trong giấm ăn.",
      },
      {
        grade: 8,
        chapter: "Chương II. Một số hợp chất thông dụng",
        order: 8,
        title: "Bài 9. Base - Thang pH",
        content:
          "## Khái niệm\n" +
          "- Base là những hợp chất mà phân tử gồm nguyên tử kim loại liên kết với nhóm hydroxide (OH); khi tan trong nước, base phân li ra ion OH-.\n\n" +
          "## Tính chất hóa học\n" +
          "- Làm quỳ tím chuyển sang màu xanh.\n" +
          "- Tác dụng với acid tạo thành muối và nước.\n" +
          "- Base không tan bị nhiệt phân hủy tạo thành oxide và nước, ví dụ: Cu(OH)2 -> CuO + H2O (đun nóng)\n\n" +
          "## Phân loại\n" +
          "- Base tan trong nước (kiềm): NaOH, KOH, Ca(OH)2, Ba(OH)2.\n" +
          "- Base không tan: Cu(OH)2, Fe(OH)3, Mg(OH)2,...\n\n" +
          "## Thang pH\n" +
          "- pH nhỏ hơn 7: dung dịch có môi trường acid.\n" +
          "- pH bằng 7: dung dịch trung tính.\n" +
          "- pH lớn hơn 7: dung dịch có môi trường base (kiềm).\n" +
          "- pH càng nhỏ tính acid càng mạnh; pH càng lớn tính base càng mạnh.",
      },
      {
        grade: 8,
        chapter: "Chương II. Một số hợp chất thông dụng",
        order: 9,
        title: "Bài 10. Oxide",
        content:
          "## Khái niệm\n" +
          "- Oxide là hợp chất gồm hai nguyên tố, trong đó có một nguyên tố là oxygen.\n\n" +
          "## Phân loại\n" +
          "- Oxide acid: thường là oxide của phi kim, tương ứng với một acid. Ví dụ: CO2, SO2, SO3, P2O5.\n" +
          "- Oxide base: thường là oxide của kim loại, tương ứng với một base. Ví dụ: Na2O, CaO, CuO, Fe2O3.\n" +
          "- Oxide lưỡng tính: tác dụng được với cả dung dịch acid và dung dịch base. Ví dụ: Al2O3, ZnO.\n" +
          "- Oxide trung tính: không tác dụng với acid, base hay nước ở điều kiện thường. Ví dụ: CO, NO.\n\n" +
          "## Tính chất hóa học\n" +
          "- Oxide acid tác dụng với nước tạo thành acid tương ứng: SO3 + H2O -> H2SO4\n" +
          "- Oxide base tác dụng với nước tạo thành base tương ứng (với oxide của kim loại kiềm, kiềm thổ): CaO + H2O -> Ca(OH)2\n" +
          "- Oxide acid tác dụng với base tạo muối và nước; oxide base tác dụng với acid tạo muối và nước.",
      },
      {
        grade: 8,
        chapter: "Chương II. Một số hợp chất thông dụng",
        order: 10,
        title: "Bài 11. Muối",
        content:
          "## Khái niệm\n" +
          "- Muối là hợp chất mà phân tử gồm một hay nhiều nguyên tử kim loại (hoặc ion ammonium NH4^+) liên kết với một hay nhiều gốc acid.\n\n" +
          "## Tính chất hóa học\n" +
          "- Tác dụng với kim loại, tác dụng với acid, tác dụng với base, tác dụng với muối khác.\n" +
          "- Phản ứng giữa hai dung dịch muối (hoặc muối với acid, muối với base) chỉ xảy ra khi sản phẩm tạo thành có chất kết tủa, chất khí hoặc nước.\n\n" +
          "## Ví dụ minh họa\n" +
          "Phản ứng dùng để nhận biết gốc sulfate trong dung dịch, tạo kết tủa trắng BaSO4 không tan:\nBaCl2 + Na2SO4 -> BaSO4 + 2NaCl",
      },
      {
        grade: 8,
        chapter: "Chương II. Một số hợp chất thông dụng",
        order: 11,
        title: "Bài 12. Phân bón hóa học",
        content:
          "## Vai trò chung\n" +
          "- Phân bón hóa học cung cấp các nguyên tố dinh dưỡng cần thiết cho sự sinh trưởng và phát triển của cây trồng, chủ yếu là đạm (N), lân (P), kali (K) và một số nguyên tố vi lượng khác.\n\n" +
          "## Các loại phân bón chính\n" +
          "- Phân đạm: cung cấp nguyên tố nitrogen, giúp cây phát triển thân, lá. Ví dụ: urea CO(NH2)2, ammonium nitrate NH4NO3, ammonium sulfate (NH4)2SO4.\n" +
          "- Phân lân: cung cấp nguyên tố phosphorus, giúp cây phát triển bộ rễ. Ví dụ: superphosphate Ca(H2PO4)2.\n" +
          "- Phân kali: cung cấp nguyên tố potassium, giúp cây ra hoa, quả và tăng khả năng chống chịu. Ví dụ: KCl, K2SO4.\n" +
          "- Phân hỗn hợp NPK chứa đồng thời cả ba nguyên tố nitrogen, phosphorus, potassium theo một tỉ lệ nhất định.",
      },
    ],
  });

  // ================= LỚP 9 - CHƯƠNG 6: KIM LOẠI =================
  await prisma.document.createMany({
    data: [
      {
        grade: 9,
        chapter: "Chương 6. Kim loại",
        order: 1,
        title: "Bài 18. Tính chất chung của kim loại",
        content:
          "## Tính chất vật lí\n" +
          "- Có tính dẻo (dễ dát mỏng, kéo thành sợi), dẫn điện tốt, dẫn nhiệt tốt, có ánh kim.\n\n" +
          "## Tính chất hóa học\n" +
          "- Tác dụng với phi kim: nhiều kim loại phản ứng với oxygen tạo thành oxide, ví dụ 3Fe + 2O2 -> Fe3O4; kim loại cũng phản ứng được với một số phi kim khác như chlorine, sulfur tạo thành muối.\n" +
          "- Tác dụng với dung dịch acid: kim loại đứng trước hydrogen trong dãy hoạt động hóa học phản ứng với dung dịch acid giải phóng khí H2.\n" +
          "- Tác dụng với dung dịch muối: kim loại hoạt động mạnh hơn đẩy được kim loại yếu hơn ra khỏi dung dịch muối của nó, ví dụ: Fe + CuSO4 -> FeSO4 + Cu",
      },
      {
        grade: 9,
        chapter: "Chương 6. Kim loại",
        order: 2,
        title: "Bài 19. Dãy hoạt động hóa học",
        content:
          "## Dãy hoạt động hóa học\n" +
          "Sắp xếp các kim loại theo chiều giảm dần mức độ hoạt động hóa học:\nK, Na, Ba, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, (H), Cu, Ag, Pt, Au\n\n" +
          "## Ý nghĩa\n" +
          "- Kim loại đứng trước Mg (K, Na, Ba, Ca) phản ứng được với nước ở điều kiện thường, tạo thành base tan và giải phóng khí H2.\n" +
          "- Kim loại đứng trước (H) phản ứng được với một số dung dịch acid (HCl, H2SO4 loãng,...) giải phóng khí H2.\n" +
          "- Kim loại đứng trước (trừ nhóm kim loại phản ứng mạnh với nước) đẩy được kim loại đứng sau ra khỏi dung dịch muối của kim loại đó.\n\n" +
          "## Mẹo nhớ\n" +
          "- \"Khi Nào Bạn Cần May Áo Záp Sắt Nhớ Sang Phố Hỏi Cửa Hàng Á Phi Âu\" (K, Na, Ba, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Ag, Pt, Au).",
      },
      {
        grade: 9,
        chapter: "Chương 6. Kim loại",
        order: 3,
        title: "Bài 20. Tách kim loại và việc sử dụng hợp kim",
        content:
          "## Trạng thái tự nhiên\n" +
          "- Hầu hết kim loại tồn tại ở dạng hợp chất (oxide, muối,...) lẫn trong quặng; chỉ một số ít kim loại kém hoạt động như vàng, bạc, platinum tồn tại ở dạng đơn chất.\n\n" +
          "## Nguyên tắc tách kim loại\n" +
          "- Khử ion kim loại thành kim loại tự do, thường dùng chất khử (như carbon, khí CO) đối với kim loại có độ hoạt động trung bình, hoặc điện phân đối với kim loại hoạt động mạnh.\n\n" +
          "## Hợp kim\n" +
          "- Hợp kim là vật liệu kim loại có chứa một kim loại cơ bản và một hay nhiều nguyên tố khác (kim loại hoặc phi kim).\n" +
          "- Ví dụ: gang và thép là hợp kim của sắt với carbon (gang có hàm lượng carbon cao hơn thép); duralumin là hợp kim của nhôm với đồng, magnesium.\n" +
          "- So với kim loại nguyên chất, hợp kim thường cứng hơn, bền hơn.",
      },
      {
        grade: 9,
        chapter: "Chương 6. Kim loại",
        order: 4,
        title: "Bài 21. Sự khác nhau cơ bản giữa phi kim và kim loại",
        content:
          "## Kim loại\n" +
          "- Dẫn điện và dẫn nhiệt tốt, có ánh kim, có tính dẻo, phần lớn ở trạng thái rắn tại nhiệt độ thường (trừ mercury (Hg) ở trạng thái lỏng).\n\n" +
          "## Phi kim\n" +
          "- Dẫn điện và dẫn nhiệt kém (trừ than chì - graphite dẫn điện được), không có ánh kim, giòn ở trạng thái rắn.\n" +
          "- Tồn tại ở cả ba trạng thái tại nhiệt độ thường (ví dụ: sulfur, carbon ở thể rắn; bromine ở thể lỏng; oxygen, nitrogen, chlorine ở thể khí).\n\n" +
          "## Bản chất hóa học\n" +
          "- Nguyên tử kim loại có xu hướng nhường electron để tạo thành ion dương (cation); nguyên tử phi kim có xu hướng nhận thêm electron để tạo thành ion âm (anion).",
      },
    ],
  });

  // ================= LỚP 9 - CHƯƠNG 7: HYDROCARBON =================
  await prisma.document.createMany({
    data: [
      {
        grade: 9,
        chapter: "Chương 7. Hydrocarbon và nguồn nhiên liệu",
        order: 5,
        title: "Bài 22. Giới thiệu về hợp chất hữu cơ",
        content:
          "## Khái niệm\n" +
          "- Hợp chất hữu cơ là hợp chất của carbon, trừ một số hợp chất đơn giản như CO, CO2, muối carbonate,... được xếp vào hợp chất vô cơ.\n\n" +
          "## Đặc điểm chung\n" +
          "- Liên kết trong phân tử chủ yếu là liên kết cộng hóa trị, thường dễ cháy, kém bền với nhiệt hơn so với nhiều hợp chất vô cơ.\n\n" +
          "## Phân loại\n" +
          "- Hydrocarbon: phân tử chỉ chứa carbon và hydrogen, ví dụ alkane, alkene.\n" +
          "- Dẫn xuất của hydrocarbon: phân tử còn chứa thêm các nguyên tố khác như oxygen, nitrogen,... ví dụ alcohol, acid hữu cơ.\n\n" +
          "## Công thức hóa học\n" +
          "- Công thức phân tử cho biết số lượng nguyên tử của mỗi nguyên tố trong một phân tử.\n" +
          "- Công thức cấu tạo cho biết thứ tự và cách thức liên kết giữa các nguyên tử trong phân tử.",
      },
      {
        grade: 9,
        chapter: "Chương 7. Hydrocarbon và nguồn nhiên liệu",
        order: 6,
        title: "Bài 23. Alkane",
        content:
          "## Khái niệm\n" +
          "- Alkane là hydrocarbon no, mạch hở, trong phân tử chỉ có liên kết đơn. Công thức chung: CnH2n+2 (n ≥ 1).\n" +
          "- Ví dụ: methane CH4 (n = 1), ethane C2H6 (n = 2), propane C3H8 (n = 3), butane C4H10 (n = 4).\n\n" +
          "## Tính chất hóa học\n" +
          "- Phản ứng thế với halogen khi có ánh sáng: CH4 + Cl2 -> CH3Cl + HCl\n" +
          "- Phản ứng cháy tỏa nhiều nhiệt: CH4 + 2O2 -> CO2 + 2H2O\n" +
          "- Khá trơ về mặt hóa học so với alkene, không làm mất màu dung dịch bromine.\n\n" +
          "## Ứng dụng\n" +
          "- Methane là thành phần chính của khí thiên nhiên và khí biogas, được dùng làm nhiên liệu đốt cháy sinh nhiệt.",
      },
      {
        grade: 9,
        chapter: "Chương 7. Hydrocarbon và nguồn nhiên liệu",
        order: 7,
        title: "Bài 24. Alkene",
        content:
          "## Khái niệm\n" +
          "- Alkene là hydrocarbon không no, mạch hở, trong phân tử có một liên kết đôi C=C. Công thức chung: CnH2n (n ≥ 2).\n" +
          "- Ví dụ: ethylene (ethene) C2H4, propylene (propene) C3H6.\n\n" +
          "## Tính chất hóa học\n" +
          "- Phản ứng cộng, làm mất màu dung dịch bromine: C2H4 + Br2 -> C2H4Br2\n" +
          "- Phản ứng trùng hợp: nhiều phân tử alkene nhỏ kết hợp với nhau tạo thành phân tử polymer có khối lượng phân tử rất lớn, ví dụ trùng hợp ethylene tạo poly(ethylene) - PE.\n" +
          "- Phản ứng cháy tỏa nhiệt.\n\n" +
          "## Ứng dụng\n" +
          "- Ethylene được dùng làm nguyên liệu sản xuất nhựa PE, đồng thời có tác dụng kích thích quả mau chín.\n\n" +
          "## Lưu ý\n" +
          "- Phản ứng làm mất màu dung dịch bromine là cách đơn giản để phân biệt alkene (có phản ứng) với alkane (không phản ứng).",
      },
      {
        grade: 9,
        chapter: "Chương 7. Hydrocarbon và nguồn nhiên liệu",
        order: 8,
        title: "Bài 25. Nguồn nhiên liệu",
        content:
          "## Nhiên liệu hóa thạch\n" +
          "- Gồm than đá, dầu mỏ, khí thiên nhiên, được hình thành từ xác sinh vật qua hàng triệu năm; đây là nguồn nhiên liệu không tái tạo.\n\n" +
          "## Chưng cất dầu mỏ\n" +
          "- Dầu mỏ qua quá trình chưng cất phân đoạn (dựa vào sự khác nhau về nhiệt độ sôi) tạo ra nhiều sản phẩm khác nhau: khí đốt, xăng, dầu hỏa (kerosene), dầu diesel, dầu mazut, nhựa đường.\n\n" +
          "## Vấn đề môi trường\n" +
          "- Đốt cháy nhiên liệu hóa thạch thải ra khí carbon dioxide gây hiệu ứng nhà kính.\n" +
          "- Cần sử dụng tiết kiệm, hiệu quả và khuyến khích các nguồn năng lượng tái tạo như năng lượng mặt trời, gió, sinh khối để thay thế dần nhiên liệu hóa thạch.",
      },
    ],
  });

  // ================= LỚP 9 - CHƯƠNG 8 =================
  await prisma.document.createMany({
    data: [
      {
        grade: 9,
        chapter: "Chương 8. Ethylic alcohol và Acetic acid",
        order: 9,
        title: "Bài 26. Ethylic alcohol",
        content:
          "## Tính chất vật lí\n" +
          "- Ethylic alcohol (còn gọi là ethanol, rượu ethylic), công thức phân tử C2H6O, thường viết là C2H5OH, là chất lỏng không màu, tan vô hạn trong nước, dễ cháy.\n\n" +
          "## Tính chất hóa học\n" +
          "- Phản ứng cháy tỏa nhiều nhiệt: C2H5OH + 3O2 -> 2CO2 + 3H2O\n" +
          "- Phản ứng với sodium giải phóng khí hydrogen: 2C2H5OH + 2Na -> 2C2H5ONa + H2\n" +
          "- Phản ứng với acetic acid (có xúc tác sulfuric acid đặc, đun nóng) tạo thành ester, gọi là phản ứng ester hóa.\n\n" +
          "## Ứng dụng và tác hại\n" +
          "- Làm nhiên liệu (cồn, xăng sinh học E5), dung môi, sát khuẩn, nguyên liệu trong công nghiệp.\n" +
          "- Lạm dụng rượu, bia gây hại nghiêm trọng cho sức khỏe và an toàn giao thông.",
      },
      {
        grade: 9,
        chapter: "Chương 8. Ethylic alcohol và Acetic acid",
        order: 10,
        title: "Bài 27. Acetic acid",
        content:
          "## Tính chất vật lí\n" +
          "- Acetic acid, công thức CH3COOH, là acid hữu cơ yếu có nhóm chức -COOH; giấm ăn là dung dịch acetic acid loãng với nồng độ khoảng 2-5%.\n\n" +
          "## Tính chất hóa học\n" +
          "- Làm quỳ tím chuyển sang màu đỏ (nhạt hơn so với acid vô cơ mạnh).\n" +
          "- Tác dụng với kim loại đứng trước hydrogen giải phóng khí H2.\n" +
          "- Tác dụng với base và oxide base tạo muối và nước.\n" +
          "- Tác dụng với muối carbonate giải phóng khí CO2.\n" +
          "- Phản ứng ester hóa với ethylic alcohol khi có sulfuric acid đặc làm xúc tác, đun nóng:\nCH3COOH + C2H5OH -> CH3COOC2H5 + H2O\n\n" +
          "## Ứng dụng\n" +
          "- Giấm ăn dùng trong chế biến thực phẩm; acetic acid còn là nguyên liệu sản xuất tơ nhân tạo, dược phẩm, chất dẻo.",
      },
    ],
  });

  // ================= LỚP 9 - CHƯƠNG 9 =================
  await prisma.document.createMany({
    data: [
      {
        grade: 9,
        chapter: "Chương 9. Lipid - Carbohydrate - Protein - Polymer",
        order: 11,
        title: "Bài 28. Lipid",
        content:
          "## Khái niệm\n" +
          "- Lipid gồm chất béo (dầu, mỡ) và một số hợp chất khác; lipid không tan trong nước nhưng tan được trong các dung môi hữu cơ như xăng, dầu hỏa.\n" +
          "- Chất béo về bản chất là ester của glycerol với các acid béo (là các carboxylic acid có mạch carbon dài).\n\n" +
          "## Vai trò\n" +
          "- Cung cấp và dự trữ năng lượng cho cơ thể, là dung môi hòa tan một số vitamin như A, D, E, K.\n\n" +
          "## Phản ứng xà phòng hóa\n" +
          "- Thủy phân chất béo trong môi trường kiềm (dung dịch NaOH hoặc KOH) tạo ra glycerol và muối của acid béo (xà phòng); phản ứng này được gọi là phản ứng xà phòng hóa.",
      },
      {
        grade: 9,
        chapter: "Chương 9. Lipid - Carbohydrate - Protein - Polymer",
        order: 12,
        title: "Bài 29. Carbohydrate, Glucose và saccharose",
        content:
          "## Khái niệm chung\n" +
          "- Carbohydrate (còn gọi là gluxit hay đường) là hợp chất hữu cơ tạp chức, nhiều chất có công thức chung dạng Cn(H2O)m.\n\n" +
          "## Glucose\n" +
          "- C6H12O6, là một loại đường đơn có trong quả chín (như nho) và trong máu người (khoảng 0,1%).\n" +
          "- Có phản ứng tráng bạc đặc trưng, dùng để nhận biết glucose.\n" +
          "- Trong quá trình lên men rượu (nhờ enzyme), glucose chuyển hóa thành ethylic alcohol:\nC6H12O6 -> 2C2H5OH + 2CO2\n\n" +
          "## Saccharose\n" +
          "- C12H22O11, là đường đôi (đường mía, đường ăn hằng ngày).\n" +
          "- Khi thủy phân trong môi trường acid, saccharose tạo thành glucose và fructose.",
      },
      {
        grade: 9,
        chapter: "Chương 9. Lipid - Carbohydrate - Protein - Polymer",
        order: 13,
        title: "Bài 30. Tinh bột và cellulose",
        content:
          "## Đặc điểm chung\n" +
          "- Tinh bột (starch) và cellulose đều là polysaccharide (polymer thiên nhiên), có công thức chung là (C6H10O5)n nhưng khác nhau về cấu trúc mạch: tinh bột có mạch xoắn và có thể phân nhánh, còn cellulose có mạch thẳng, không phân nhánh và bền hơn.\n\n" +
          "## Tinh bột\n" +
          "- Có nhiều trong gạo, ngô, khoai, sắn, là chất dự trữ năng lượng ở thực vật; khi thủy phân hoàn toàn, tinh bột tạo thành glucose.\n" +
          "- Phản ứng với dung dịch iodine (iot) tạo thành hợp chất có màu xanh tím đặc trưng, dùng để nhận biết tinh bột.\n\n" +
          "## Cellulose\n" +
          "- Có nhiều trong gỗ, bông, đay, là thành phần chính cấu tạo nên thành tế bào thực vật.\n" +
          "- Được dùng làm nguyên liệu sản xuất giấy, sợi, tơ nhân tạo.",
      },
      {
        grade: 9,
        chapter: "Chương 9. Lipid - Carbohydrate - Protein - Polymer",
        order: 14,
        title: "Bài 31. Protein",
        content:
          "## Cấu tạo\n" +
          "- Protein là hợp chất hữu cơ có phân tử khối rất lớn, được cấu tạo từ nhiều đơn vị amino acid liên kết với nhau thông qua liên kết peptide.\n\n" +
          "## Vai trò\n" +
          "- Có nhiều trong trứng, thịt, cá, sữa, đậu,...\n" +
          "- Đóng nhiều vai trò quan trọng trong cơ thể sống: cấu tạo nên tế bào, xúc tác các phản ứng sinh học (enzyme), vận chuyển chất, bảo vệ cơ thể (kháng thể).\n\n" +
          "## Tính chất\n" +
          "- Bị thủy phân trong môi trường acid, môi trường base hoặc nhờ enzyme, tạo thành các amino acid.\n" +
          "- Bị đông tụ (biến tính) khi đun nóng hoặc khi gặp một số hóa chất, ví dụ lòng trắng trứng bị đông lại khi luộc.",
      },
      {
        grade: 9,
        chapter: "Chương 9. Lipid - Carbohydrate - Protein - Polymer",
        order: 15,
        title: "Bài 32. Polymer",
        content:
          "## Khái niệm\n" +
          "- Polymer là hợp chất có phân tử khối rất lớn, do nhiều đơn vị nhỏ (gọi là monomer) liên kết lặp đi lặp lại với nhau tạo thành, thông qua phản ứng trùng hợp hoặc phản ứng trùng ngưng.\n\n" +
          "## Ví dụ\n" +
          "- Poly(ethylene) - PE (tạo thành từ ethylene), poly(vinyl chloride) - PVC.\n" +
          "- Tinh bột và cellulose là các polymer thiên nhiên; cao su thiên nhiên được tạo thành chủ yếu từ đơn vị isoprene.\n\n" +
          "## Ứng dụng và vấn đề môi trường\n" +
          "- Polymer được ứng dụng rộng rãi để sản xuất chất dẻo, cao su, tơ sợi, màng bọc thực phẩm.\n" +
          "- Rác thải nhựa (polymer tổng hợp khó phân hủy sinh học) đang là thách thức lớn với môi trường hiện nay, cần được phân loại, tái chế và hạn chế sử dụng đồ nhựa dùng một lần.",
      },
    ],
  });

  // ================= QUIZ: LỚP 8 - CHƯƠNG I =================
  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Phản ứng hóa học (Chương I - Lớp 8)",
      grade: 8,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Phản ứng hóa học là gì?",
            choices: JSON.stringify([
              "Quá trình biến đổi từ chất này thành chất khác",
              "Quá trình chất chỉ thay đổi trạng thái (rắn, lỏng, khí)",
              "Quá trình chất thay đổi hình dạng, kích thước",
              "Quá trình hòa tan một chất vào nước",
            ]),
            correctIndex: 0,
            explanation:
              "Phản ứng hóa học là quá trình biến đổi chất này (chất phản ứng) thành chất khác (sản phẩm), khác với biến đổi vật lí (chỉ thay đổi trạng thái/hình dạng).",
          },
          {
            order: 2,
            content: "Công thức nào sau đây dùng để tính số mol (n) theo khối lượng chất (m) và khối lượng mol (M)?",
            choices: JSON.stringify(["n = m x M", "n = m/M", "n = M/m", "n = m + M"]),
            correctIndex: 1,
            explanation: "n = m/M, trong đó m là khối lượng chất (gam), M là khối lượng mol (g/mol).",
          },
          {
            order: 3,
            content: "Ở điều kiện chuẩn (25°C, 1 bar), 1 mol khí bất kì chiếm thể tích bao nhiêu?",
            choices: JSON.stringify(["22,4 lít", "24,79 lít", "20 lít", "18 lít"]),
            correctIndex: 1,
            explanation: "Ở điều kiện chuẩn (25°C, 1 bar) theo chương trình mới, 1 mol khí bất kì chiếm 24,79 lít.",
          },
          {
            order: 4,
            content: "Định luật bảo toàn khối lượng phát biểu điều gì?",
            choices: JSON.stringify([
              "Tổng khối lượng sản phẩm luôn nhỏ hơn tổng khối lượng chất phản ứng",
              "Tổng khối lượng các chất sản phẩm bằng tổng khối lượng các chất phản ứng",
              "Chỉ có khối lượng chất rắn được bảo toàn trong phản ứng",
              "Khối lượng mỗi nguyên tố tăng lên sau phản ứng",
            ]),
            correctIndex: 1,
            explanation:
              "Theo định luật bảo toàn khối lượng của Lavoisier: trong phản ứng hóa học, tổng khối lượng các chất sản phẩm bằng tổng khối lượng các chất phản ứng.",
          },
          {
            order: 5,
            content: "Yếu tố nào sau đây KHÔNG làm tăng tốc độ phản ứng hóa học?",
            choices: JSON.stringify([
              "Tăng nồng độ chất phản ứng",
              "Tăng nhiệt độ",
              "Giảm diện tích bề mặt tiếp xúc",
              "Sử dụng chất xúc tác",
            ]),
            correctIndex: 2,
            explanation: "Giảm diện tích bề mặt tiếp xúc làm giảm tốc độ phản ứng, không phải tăng.",
          },
          {
            order: 6,
            content: "Cân bằng phương trình hóa học: Fe + O2 -> Fe3O4. Hệ số cân bằng (theo thứ tự Fe, O2) là?",
            choices: JSON.stringify(["1 và 1", "2 và 3", "3 và 2", "4 và 3"]),
            correctIndex: 2,
            explanation: "Phương trình cân bằng đúng là: 3Fe + 2O2 -> Fe3O4",
          },
        ],
      },
    },
  });

  // ================= QUIZ: LỚP 8 - CHƯƠNG II =================
  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Một số hợp chất thông dụng (Chương II - Lớp 8)",
      grade: 8,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Khi tan trong nước, acid phân li ra ion nào?",
            choices: JSON.stringify(["OH-", "H+", "Na+", "Cl-"]),
            correctIndex: 1,
            explanation: "Acid là hợp chất khi tan trong nước phân li ra ion H+ (cation hydrogen).",
          },
          {
            order: 2,
            content: "Chất nào sau đây là base tan (kiềm)?",
            choices: JSON.stringify(["Cu(OH)2", "Fe(OH)3", "NaOH", "Mg(OH)2"]),
            correctIndex: 2,
            explanation: "NaOH là base tan (kiềm) thường gặp. Cu(OH)2, Fe(OH)3, Mg(OH)2 đều là base không tan.",
          },
          {
            order: 3,
            content: "Một dung dịch có pH = 3 thì dung dịch đó có môi trường gì?",
            choices: JSON.stringify(["Acid", "Trung tính", "Base (kiềm)", "Không xác định được"]),
            correctIndex: 0,
            explanation: "pH nhỏ hơn 7 tương ứng với môi trường acid.",
          },
          {
            order: 4,
            content: "CaO thuộc loại oxide nào?",
            choices: JSON.stringify(["Oxide acid", "Oxide base", "Oxide lưỡng tính", "Oxide trung tính"]),
            correctIndex: 1,
            explanation: "CaO là oxide của kim loại calcium, tương ứng với base Ca(OH)2 nên là oxide base.",
          },
          {
            order: 5,
            content: "Phản ứng BaCl2 + Na2SO4 -> BaSO4 + 2NaCl thường được dùng để làm gì?",
            choices: JSON.stringify([
              "Nhận biết ion sulfate (SO4^2-) trong dung dịch",
              "Điều chế khí oxygen",
              "Trung hòa acid",
              "Sản xuất phân bón",
            ]),
            correctIndex: 0,
            explanation: "BaSO4 là kết tủa trắng không tan, nên phản ứng này dùng để nhận biết gốc sulfate.",
          },
          {
            order: 6,
            content: "Phân đạm cung cấp chủ yếu nguyên tố dinh dưỡng nào cho cây trồng?",
            choices: JSON.stringify(["Nitrogen", "Phosphorus", "Potassium", "Calcium"]),
            correctIndex: 0,
            explanation: "Phân đạm cung cấp nguyên tố nitrogen, giúp cây phát triển thân, lá.",
          },
        ],
      },
    },
  });

  // ================= QUIZ: LỚP 9 - CHƯƠNG 6 =================
  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Kim loại (Chương 6 - Lớp 9)",
      grade: 9,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Trong các kim loại sau, kim loại nào hoạt động hóa học mạnh nhất?",
            choices: JSON.stringify(["Cu", "K", "Fe", "Ag"]),
            correctIndex: 1,
            explanation: "Theo dãy hoạt động hóa học, K đứng trước Cu, Fe, Ag nên hoạt động mạnh nhất trong 4 kim loại này.",
          },
          {
            order: 2,
            content: "Kim loại đứng trước hydrogen (H) trong dãy hoạt động hóa học có tính chất gì?",
            choices: JSON.stringify([
              "Phản ứng với dung dịch acid giải phóng khí H2",
              "Không phản ứng được với acid",
              "Chỉ phản ứng được với nước",
              "Không có phản ứng hóa học đặc biệt nào",
            ]),
            correctIndex: 0,
            explanation: "Kim loại đứng trước H phản ứng được với một số dung dịch acid, giải phóng khí H2.",
          },
          {
            order: 3,
            content: "Phản ứng Fe + CuSO4 -> FeSO4 + Cu chứng tỏ điều gì?",
            choices: JSON.stringify([
              "Fe hoạt động hóa học mạnh hơn Cu",
              "Cu hoạt động hóa học mạnh hơn Fe",
              "Fe và Cu hoạt động hóa học như nhau",
              "Phản ứng này không có ý nghĩa gì đặc biệt",
            ]),
            correctIndex: 0,
            explanation: "Fe đẩy được Cu ra khỏi dung dịch muối CuSO4, chứng tỏ Fe hoạt động hóa học mạnh hơn Cu.",
          },
          {
            order: 4,
            content: "Hợp kim của sắt với carbon, có hàm lượng carbon thấp hơn gang và dẻo hơn gang, được gọi là gì?",
            choices: JSON.stringify(["Gang", "Thép", "Duralumin", "Đồng thau"]),
            correctIndex: 1,
            explanation: "Thép là hợp kim của sắt với carbon (hàm lượng carbon thấp hơn gang), có tính dẻo và bền hơn gang.",
          },
          {
            order: 5,
            content: "Tính chất nào sau đây là của phi kim, không phải của kim loại?",
            choices: JSON.stringify([
              "Dẫn điện tốt",
              "Có ánh kim",
              "Giòn ở trạng thái rắn",
              "Có tính dẻo, dễ dát mỏng",
            ]),
            correctIndex: 2,
            explanation: "Phi kim ở trạng thái rắn thường giòn, trong khi kim loại có tính dẻo, dẫn điện tốt và có ánh kim.",
          },
        ],
      },
    },
  });

  // ================= QUIZ: LỚP 9 - CHƯƠNG 7 =================
  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Hydrocarbon và nguồn nhiên liệu (Chương 7 - Lớp 9)",
      grade: 9,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Alkane có công thức chung là gì?",
            choices: JSON.stringify(["CnH2n", "CnH2n+2", "CnH2n-2", "CnH2n+1"]),
            correctIndex: 1,
            explanation: "Alkane là hydrocarbon no, mạch hở, có công thức chung CnH2n+2 (n ≥ 1).",
          },
          {
            order: 2,
            content: "Chất nào sau đây là alkene?",
            choices: JSON.stringify(["CH4", "C2H6", "C2H4", "C3H8"]),
            correctIndex: 2,
            explanation: "C2H4 (ethylene) có công thức CnH2n với n=2, là alkene. Các chất còn lại là alkane.",
          },
          {
            order: 3,
            content: "Phản ứng đặc trưng để phân biệt alkene với alkane là phản ứng gì?",
            choices: JSON.stringify([
              "Phản ứng cháy",
              "Phản ứng cộng làm mất màu dung dịch bromine",
              "Phản ứng thế với oxygen",
              "Phản ứng phân hủy ở nhiệt độ thường",
            ]),
            correctIndex: 1,
            explanation: "Alkene có liên kết đôi C=C nên có phản ứng cộng, làm mất màu dung dịch bromine; alkane thì không.",
          },
          {
            order: 4,
            content: "Thành phần chính của khí thiên nhiên là chất nào?",
            choices: JSON.stringify(["Ethane", "Methane", "Propane", "Butane"]),
            correctIndex: 1,
            explanation: "Methane (CH4) là thành phần chính của khí thiên nhiên và khí biogas.",
          },
          {
            order: 5,
            content: "Chất nào sau đây KHÔNG phải là nhiên liệu hóa thạch?",
            choices: JSON.stringify(["Than đá", "Dầu mỏ", "Khí thiên nhiên", "Ethanol sinh học"]),
            correctIndex: 3,
            explanation: "Ethanol sinh học là nhiên liệu tái tạo (sản xuất từ sinh khối), không phải nhiên liệu hóa thạch.",
          },
        ],
      },
    },
  });

  // ================= QUIZ: LỚP 9 - CHƯƠNG 8 =================
  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Ethylic alcohol và Acetic acid (Chương 8 - Lớp 9)",
      grade: 9,
      durationSec: 600,
      questions: {
        create: [
          {
            order: 1,
            content: "Công thức của ethylic alcohol là gì?",
            choices: JSON.stringify(["CH3COOH", "C2H5OH", "C6H12O6", "CH4"]),
            correctIndex: 1,
            explanation: "Ethylic alcohol (ethanol) có công thức C2H5OH (C2H6O).",
          },
          {
            order: 2,
            content: "Giấm ăn là dung dịch loãng (khoảng 2-5%) của chất nào?",
            choices: JSON.stringify(["Ethylic alcohol", "Acetic acid", "Sulfuric acid", "Glucose"]),
            correctIndex: 1,
            explanation: "Giấm ăn là dung dịch acetic acid (CH3COOH) loãng.",
          },
          {
            order: 3,
            content: "Phản ứng giữa acetic acid và ethylic alcohol (xúc tác sulfuric acid đặc, đun nóng) tạo ra sản phẩm chính nào (ngoài nước)?",
            choices: JSON.stringify(["Ester", "Muối", "Oxide", "Base"]),
            correctIndex: 0,
            explanation: "CH3COOH + C2H5OH -> CH3COOC2H5 (ester) + H2O. Đây gọi là phản ứng ester hóa.",
          },
          {
            order: 4,
            content: "Ethylic alcohol phản ứng với sodium (Na) giải phóng khí gì?",
            choices: JSON.stringify(["O2", "CO2", "H2", "N2"]),
            correctIndex: 2,
            explanation: "2C2H5OH + 2Na -> 2C2H5ONa + H2",
          },
        ],
      },
    },
  });

  // ================= QUIZ: LỚP 9 - CHƯƠNG 9 =================
  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Lipid - Carbohydrate - Protein - Polymer (Chương 9 - Lớp 9)",
      grade: 9,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Chất béo về bản chất là ester của glycerol với chất nào?",
            choices: JSON.stringify(["Acid béo", "Amino acid", "Glucose", "Ethylic alcohol"]),
            correctIndex: 0,
            explanation: "Chất béo là ester của glycerol với các acid béo (carboxylic acid mạch dài).",
          },
          {
            order: 2,
            content: "Phản ứng thủy phân chất béo trong môi trường kiềm còn được gọi là phản ứng gì?",
            choices: JSON.stringify(["Ester hóa", "Xà phòng hóa", "Trùng hợp", "Trùng ngưng"]),
            correctIndex: 1,
            explanation: "Thủy phân chất béo trong môi trường kiềm tạo glycerol và muối của acid béo (xà phòng), gọi là phản ứng xà phòng hóa.",
          },
          {
            order: 3,
            content: "Glucose có phản ứng đặc trưng nào thường dùng để nhận biết?",
            choices: JSON.stringify([
              "Phản ứng tráng bạc",
              "Phản ứng với quỳ tím",
              "Phản ứng với dung dịch NaOH",
              "Phản ứng cháy tạo khói đen",
            ]),
            correctIndex: 0,
            explanation: "Glucose có phản ứng tráng bạc đặc trưng (do có nhóm -CHO), dùng để nhận biết glucose.",
          },
          {
            order: 4,
            content: "Tinh bột khi gặp dung dịch iodine (iot) thì chuyển sang màu gì?",
            choices: JSON.stringify(["Đỏ", "Xanh tím", "Vàng", "Không đổi màu"]),
            correctIndex: 1,
            explanation: "Đây là phản ứng đặc trưng dùng để nhận biết tinh bột: tinh bột + iodine tạo màu xanh tím.",
          },
          {
            order: 5,
            content: "Protein được cấu tạo từ nhiều đơn vị nào liên kết với nhau qua liên kết peptide?",
            choices: JSON.stringify(["Glucose", "Amino acid", "Ethylene", "Acid béo"]),
            correctIndex: 1,
            explanation: "Protein là chuỗi nhiều amino acid liên kết với nhau bằng liên kết peptide.",
          },
          {
            order: 6,
            content: "Polymer được tạo thành từ nhiều đơn vị nhỏ lặp lại, các đơn vị đó gọi là gì?",
            choices: JSON.stringify(["Monomer", "Isomer", "Nguyên tử", "Ion"]),
            correctIndex: 0,
            explanation: "Monomer là đơn vị nhỏ liên kết lặp lại tạo thành polymer, qua phản ứng trùng hợp hoặc trùng ngưng.",
          },
        ],
      },
    },
  });

  // ================= FLASHCARD SETS =================
  await prisma.flashcardSet.create({
    data: {
      grade: 8,
      topic: "Phản ứng hóa học - Mol - Nồng độ (Chương I)",
      cards: {
        create: [
          { order: 1, term: "Phản ứng hóa học", meaning: "Quá trình biến đổi chất này thành chất khác" },
          { order: 2, term: "Mol", meaning: "Lượng chất chứa 6,022x10^23 hạt (nguyên tử/phân tử) - số Avogadro" },
          { order: 3, term: "n = m/M", meaning: "Công thức tính số mol theo khối lượng chất và khối lượng mol" },
          { order: 4, term: "24,79 lít", meaning: "Thể tích của 1 mol khí bất kì ở điều kiện chuẩn (25°C, 1 bar)" },
          { order: 5, term: "C% = (m ct/m dd) x 100%", meaning: "Công thức tính nồng độ phần trăm của dung dịch" },
          { order: 6, term: "CM = n/V", meaning: "Công thức tính nồng độ mol của dung dịch (mol/lít)" },
          { order: 7, term: "Định luật bảo toàn khối lượng", meaning: "Tổng khối lượng chất sản phẩm bằng tổng khối lượng chất phản ứng" },
          { order: 8, term: "Chất xúc tác", meaning: "Chất làm tăng tốc độ phản ứng nhưng không bị tiêu hao sau phản ứng" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 8,
      topic: "Acid - Base - Oxide - Muối (Chương II)",
      cards: {
        create: [
          { order: 1, term: "Acid", meaning: "Hợp chất phân li ra ion H+ khi tan trong nước, làm quỳ tím hóa đỏ" },
          { order: 2, term: "Base", meaning: "Hợp chất phân li ra ion OH- khi tan trong nước, làm quỳ tím hóa xanh" },
          { order: 3, term: "pH < 7", meaning: "Dung dịch có môi trường acid" },
          { order: 4, term: "pH > 7", meaning: "Dung dịch có môi trường base (kiềm)" },
          { order: 5, term: "CaO", meaning: "Calcium oxide - một oxide base, tác dụng với nước tạo Ca(OH)2" },
          { order: 6, term: "Muối", meaning: "Hợp chất gồm kim loại (hoặc NH4^+) liên kết với gốc acid" },
          { order: 7, term: "NPK", meaning: "Phân bón hỗn hợp chứa Nitrogen, Phosphorus, Potassium" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 9,
      topic: "Kim loại - Dãy hoạt động hóa học (Chương 6)",
      cards: {
        create: [
          {
            order: 1,
            term: "K, Na, Ba, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, (H), Cu, Ag, Pt, Au",
            meaning: "Dãy hoạt động hóa học của kim loại (giảm dần từ trái sang phải)",
          },
          { order: 2, term: "Gang", meaning: "Hợp kim của sắt với hàm lượng carbon cao" },
          { order: 3, term: "Thép", meaning: "Hợp kim của sắt với hàm lượng carbon thấp hơn gang, dẻo và bền hơn" },
          { order: 4, term: "Ánh kim", meaning: "Tính chất vật lí đặc trưng của kim loại" },
          { order: 5, term: "Fe + CuSO4 -> FeSO4 + Cu", meaning: "Ví dụ kim loại mạnh đẩy kim loại yếu ra khỏi dung dịch muối" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 9,
      topic: "Hợp chất hữu cơ - Hydrocarbon - Alcohol - Acid (Chương 7-8)",
      cards: {
        create: [
          { order: 1, term: "CnH2n+2", meaning: "Công thức chung của alkane (hydrocarbon no)" },
          { order: 2, term: "CnH2n", meaning: "Công thức chung của alkene (có 1 liên kết đôi C=C)" },
          { order: 3, term: "C2H5OH", meaning: "Ethylic alcohol (ethanol)" },
          { order: 4, term: "CH3COOH", meaning: "Acetic acid - thành phần chính của giấm ăn" },
          { order: 5, term: "Phản ứng ester hóa", meaning: "CH3COOH + C2H5OH -> CH3COOC2H5 + H2O" },
          { order: 6, term: "Methane (CH4)", meaning: "Thành phần chính của khí thiên nhiên và khí biogas" },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 9,
      topic: "Lipid - Carbohydrate - Protein - Polymer (Chương 9)",
      cards: {
        create: [
          { order: 1, term: "Xà phòng hóa", meaning: "Phản ứng thủy phân chất béo trong môi trường kiềm, tạo glycerol và xà phòng" },
          { order: 2, term: "Phản ứng tráng bạc", meaning: "Phản ứng đặc trưng dùng để nhận biết glucose" },
          { order: 3, term: "(C6H10O5)n", meaning: "Công thức chung của tinh bột và cellulose" },
          { order: 4, term: "Tinh bột + iodine", meaning: "Tạo hợp chất màu xanh tím đặc trưng, dùng nhận biết tinh bột" },
          { order: 5, term: "Liên kết peptide", meaning: "Liên kết giữa các amino acid tạo nên protein" },
          { order: 6, term: "Monomer", meaning: "Đơn vị nhỏ liên kết lặp lại tạo thành polymer" },
        ],
      },
    },
  });

  console.log("Đã thêm đầy đủ dữ liệu Hóa học Lớp 8-9 theo SGK KHTN (Kết nối tri thức):");
  console.log("- Lớp 8: 11 tài liệu (Chương I + II), 2 đề kiểm tra, 2 bộ flashcard");
  console.log("- Lớp 9: 15 tài liệu (Chương 6-9), 4 đề kiểm tra, 3 bộ flashcard");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
