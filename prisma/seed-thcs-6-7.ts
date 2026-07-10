import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Nội dung Hóa học lớp 6-7 dựa theo SGK Khoa học tự nhiên (Kết nối tri thức),
 * đối chiếu thêm với Cánh Diều/Chân trời sáng tạo, tổng hợp từ tài liệu giáo viên
 * cộng tác biên soạn (dự án KHTN 6789, phần Hóa học):
 * - Lớp 6: Chương 1 (Chất quanh ta, bài 1-3), Chương 2 (Vật liệu - Nhiên liệu -
 *          Nguyên liệu - Lương thực thực phẩm, bài 4-5), Chương 3 (Hỗn hợp, bài 6-7)
 * - Lớp 7: Chương 1 (Nguyên tử - Nguyên tố hóa học, bài 8-9), Chương 2 (Sơ lược
 *          bảng tuần hoàn, bài 10), Chương 3 (Phân tử - Liên kết hóa học, bài 11-12),
 *          Chương 4 (Hóa trị và công thức hóa học, bài 13)
 */

async function main() {
  await prisma.question.deleteMany({ where: { quiz: { grade: { in: [6, 7] } } } });
  await prisma.quiz.deleteMany({ where: { grade: { in: [6, 7] } } });
  await prisma.flashcard.deleteMany({ where: { set: { grade: { in: [6, 7] } } } });
  await prisma.flashcardSet.deleteMany({ where: { grade: { in: [6, 7] } } });
  await prisma.practiceQuestion.deleteMany({ where: { chapter: { grade: { in: [6, 7] } } } });
  await prisma.document.deleteMany({ where: { grade: { in: [6, 7] } } });
  await prisma.chapter.deleteMany({ where: { grade: { in: [6, 7] } } });

  const ch6_1 = await prisma.chapter.create({
    data: { grade: 6, order: 1, title: "Chương 1. Chất quanh ta" },
  });
  const ch6_2 = await prisma.chapter.create({
    data: { grade: 6, order: 2, title: "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm" },
  });
  const ch6_3 = await prisma.chapter.create({
    data: { grade: 6, order: 3, title: "Chương 3. Hỗn hợp" },
  });
  const ch7_1 = await prisma.chapter.create({
    data: { grade: 7, order: 1, title: "Chương 1. Nguyên tử, nguyên tố hóa học" },
  });
  const ch7_2 = await prisma.chapter.create({
    data: { grade: 7, order: 2, title: "Chương 2. Sơ lược bảng tuần hoàn các nguyên tố hóa học" },
  });
  const ch7_3 = await prisma.chapter.create({
    data: { grade: 7, order: 3, title: "Chương 3. Phân tử, liên kết hóa học" },
  });
  const ch7_4 = await prisma.chapter.create({
    data: { grade: 7, order: 4, title: "Chương 4. Hóa trị và công thức hóa học" },
  });

  // ================= LỚP 6 - CHƯƠNG 1: CHẤT QUANH TA =================
  await prisma.document.createMany({
    data: [
      {
        grade: 6,
        chapterId: ch6_1.id,
        order: 1,
        title: "Bài 1. Sự đa dạng của chất",
        content:
          "## Vật thể và chất\n" +
          "- Vật thể tự nhiên: có sẵn trong tự nhiên (con người, cây cối, sông suối, không khí,...).\n" +
          "- Vật thể nhân tạo: do con người tạo ra để phục vụ đời sống (nhà cửa, xe đạp, quần áo,...).\n" +
          "- Vật hữu sinh (vật sống): có các đặc trưng sống như trao đổi chất, sinh trưởng, sinh sản.\n" +
          "- Vật vô sinh (vật không sống): không có các đặc trưng sống.\n" +
          "- Ở đâu có vật thể là ở đó có chất; mọi vật thể đều được tạo nên từ chất.\n\n" +
          "## Ví dụ vật thể - chất\n" +
          "- Cơ thể người (vật thể) có 63-68% khối lượng là nước (chất).\n" +
          "- Dây điện (vật thể) làm bằng copper (chất), bọc lớp chất dẻo (chất) để cách điện.\n" +
          "- Xe đạp (vật thể) được chế tạo từ iron, aluminium, cao su,...\n\n" +
          "## Ba thể cơ bản của chất\n" +
          "- Thể rắn: có hình dạng và thể tích xác định, rất khó bị nén.\n" +
          "- Thể lỏng: có thể tích xác định nhưng hình dạng theo vật chứa, khó bị nén.\n" +
          "- Thể khí (hơi): không có hình dạng và thể tích xác định, chiếm toàn bộ vật chứa, dễ bị nén.\n\n" +
          "## Tính chất của chất\n" +
          "- Tính chất vật lí: thể (rắn/lỏng/khí), màu sắc, mùi, vị, hình dạng, kích thước, khối lượng riêng, tính tan, nhiệt độ nóng chảy, nhiệt độ sôi, tính dẫn điện, dẫn nhiệt. Quá trình biến đổi không tạo ra chất mới.\n" +
          "- Tính chất hóa học: khả năng biến đổi tạo ra chất mới (chất bị phân hủy, chất bị đốt cháy,...).\n" +
          "- Ví dụ: đun nóng đường đến khi xuất hiện chất màu đen là tính chất hóa học (tạo chất mới - than); đun nóng đường ở thể rắn chuyển sang thể lỏng chỉ là tính chất vật lí (vẫn là đường).\n\n" +
          "## Ứng dụng: tách chất theo tính chất\n" +
          "- Dựa vào sự khác nhau về nhiệt độ sôi có thể tách các chất lỏng bằng phương pháp chưng cất.\n" +
          "- Mỗi chất có tính chất vật lí và hóa học nhất định, không đổi (ở cùng điều kiện) - đây là cơ sở để nhận biết và tách chất.",
      },
      {
        grade: 6,
        chapterId: ch6_1.id,
        order: 2,
        title: "Bài 2. Các thể của chất và sự chuyển thể",
        content:
          "## So sánh ba thể của chất\n" +
          "| | Thể rắn | Thể lỏng | Thể khí |\n" +
          "|---|---|---|---|\n" +
          "| Hình dạng | Cố định | Theo vật chứa | Theo vật chứa |\n" +
          "| Khả năng chảy | Không chảy được | Rót được, chảy tràn | Lan tỏa mọi hướng |\n" +
          "| Liên kết hạt | Chặt chẽ | Không chặt chẽ | Chuyển động tự do |\n" +
          "| Thể tích | Xác định | Xác định | Không xác định |\n" +
          "| Khả năng nén | Rất khó nén | Khó nén | Dễ nén |\n\n" +
          "## Sự chuyển thể của chất\n" +
          "- Sự nóng chảy: quá trình chuyển từ thể rắn sang thể lỏng (xảy ra ở nhiệt độ xác định gọi là nhiệt độ nóng chảy).\n" +
          "- Sự đông đặc: quá trình chuyển từ thể lỏng sang thể rắn (cùng nhiệt độ với nóng chảy).\n" +
          "- Sự bay hơi: quá trình chuyển từ thể lỏng sang thể hơi, xảy ra ở mọi nhiệt độ, chỉ trên bề mặt thoáng.\n" +
          "- Sự sôi: là sự bay hơi đặc biệt, xảy ra cả trong lòng và trên bề mặt chất lỏng, ở một nhiệt độ xác định (nhiệt độ sôi).\n" +
          "- Sự ngưng tụ: quá trình chuyển từ thể khí (hơi) sang thể lỏng, xảy ra ở mọi nhiệt độ.\n\n" +
          "## Lưu ý quan trọng\n" +
          "- Một chất nóng chảy ở nhiệt độ nào thì cũng đông đặc ở chính nhiệt độ đó.\n" +
          "- Sự nóng chảy và sự đông đặc xảy ra tại nhiệt độ xác định; sự bay hơi và ngưng tụ xảy ra ở mọi nhiệt độ.\n" +
          "- Ví dụ: nước sôi ở 100°C; nhiệt độ nóng chảy của nước đá là 0°C; nhiệt độ nóng chảy của thủy ngân là -39°C.\n\n" +
          "## Vận dụng\n" +
          "- Khi đun sôi nước, hơi nước tạo ra bám vào nắp vung khi mở ra sẽ ngưng tụ lại thành các giọt nước.\n" +
          "- 1 mL nước lỏng khi chuyển sang thể hơi chiếm thể tích khoảng 1300 mL vì ở thể khí các hạt cấu tạo nên chất chuyển động tự do, khoảng cách giữa các hạt xa nhau hơn rất nhiều so với thể lỏng.",
      },
      {
        grade: 6,
        chapterId: ch6_1.id,
        order: 3,
        title: "Bài 3. Oxygen và không khí",
        content:
          "## Tính chất của oxygen\n" +
          "- Oxygen là chất khí không màu, không mùi, không vị, nặng hơn không khí, tan ít trong nước.\n" +
          "- Oxygen hóa lỏng ở -183°C, hóa rắn ở -218°C; ở thể lỏng và rắn, oxygen có màu xanh nhạt.\n" +
          "- Oxygen duy trì sự sống (hô hấp) và duy trì sự cháy.\n\n" +
          "## Thành phần của không khí\n" +
          "- Không khí là hỗn hợp khí với tỉ lệ gần đúng theo thể tích: khoảng 21% oxygen, 78% nitrogen, còn lại là carbon dioxide, hơi nước và một số khí khác.\n\n" +
          "## Vai trò của không khí\n" +
          "- Duy trì sự sống và sự cháy của nhiên liệu.\n" +
          "- Cung cấp carbon dioxide cho thực vật quang hợp; điều hòa khí hậu.\n" +
          "- Nitrogen cung cấp dưỡng chất tự nhiên cho sinh vật (qua các quá trình cố định đạm).\n\n" +
          "## Ô nhiễm không khí\n" +
          "- Nguyên nhân: khói bụi, khí thải từ phương tiện giao thông, nhà máy, đốt rác thải, cháy rừng,...\n" +
          "- Hậu quả: bệnh đường hô hấp, mưa acid, hiệu ứng nhà kính, biến đổi khí hậu.\n" +
          "- Biện pháp hạn chế: trồng cây xanh, xử lí khí thải trước khi thải ra môi trường, hạn chế sử dụng nhiên liệu hóa thạch, phân loại và xử lí rác thải đúng cách.\n\n" +
          "## Thí nghiệm nhận biết oxygen\n" +
          "- Đưa que đóm còn tàn đỏ vào lọ chứa khí oxygen: que đóm bùng cháy trở lại. Đây là cách nhận biết khí oxygen phổ biến trong phòng thí nghiệm.",
      },
    ],
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Chất quanh ta (Chương 1 - Lớp 6)",
      grade: 6,
      chapterId: ch6_1.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Ở đâu có vật thể thì ở đó có gì?",
            choices: JSON.stringify(["Chất", "Nguyên tử", "Phân tử", "Hỗn hợp"]),
            correctIndex: 0,
            explanation: "Mọi vật thể đều được tạo nên từ chất; ở đâu có vật thể là ở đó có chất.",
          },
          {
            order: 2,
            content: "Dãy nào sau đây gồm toàn vật thể nhân tạo?",
            choices: JSON.stringify(["Con gà, cây lúa, ngôi nhà", "Ngôi nhà, xe đạp, viên gạch", "Nước biển, con gà, xe đạp", "Cây lúa, con gà, nước biển"]),
            correctIndex: 1,
            explanation: "Ngôi nhà, xe đạp, viên gạch đều do con người tạo ra; các dãy còn lại có lẫn vật thể tự nhiên (con gà, cây lúa, nước biển).",
          },
          {
            order: 3,
            content: "Quá trình nào sau đây thể hiện tính chất hóa học của đường?",
            choices: JSON.stringify(["Hòa tan đường vào nước", "Đun nóng đường ở thể rắn chuyển sang thể lỏng", "Đun nóng đường tới khi xuất hiện chất màu đen", "Cô cạn nước đường thu lại đường"]),
            correctIndex: 2,
            explanation: "Đun nóng đường đến khi xuất hiện chất màu đen (than hóa) là quá trình tạo ra chất mới, thể hiện tính chất hóa học; các quá trình còn lại không tạo chất mới.",
          },
          {
            order: 4,
            content: "Chất nào sau đây tồn tại ở thể khí trong điều kiện thường?",
            choices: JSON.stringify(["Muối ăn", "Sắt", "Carbon dioxide", "Dầu ăn"]),
            correctIndex: 2,
          },
          {
            order: 5,
            content: "Đặc điểm nào sau đây không phải của thể rắn?",
            choices: JSON.stringify(["Các hạt liên kết chặt chẽ", "Có hình dạng và thể tích xác định", "Rất khó bị nén", "Có hình dạng và thể tích không xác định"]),
            correctIndex: 3,
          },
          {
            order: 6,
            content: "Sự chuyển từ thể lỏng sang thể rắn của một chất được gọi là",
            choices: JSON.stringify(["Sự nóng chảy", "Sự đông đặc", "Sự bay hơi", "Sự ngưng tụ"]),
            correctIndex: 1,
          },
          {
            order: 7,
            content: "Sự sôi khác với sự bay hơi thông thường ở điểm nào?",
            choices: JSON.stringify([
              "Sự sôi xảy ra ở mọi nhiệt độ, còn bay hơi chỉ xảy ra ở nhiệt độ xác định",
              "Sự sôi xảy ra cả trong lòng và trên bề mặt chất lỏng, ở một nhiệt độ xác định",
              "Sự sôi chỉ xảy ra trên bề mặt chất lỏng",
              "Sự sôi và sự bay hơi hoàn toàn giống nhau",
            ]),
            correctIndex: 1,
            explanation: "Sự sôi là trường hợp đặc biệt của sự bay hơi, xảy ra cả trong lòng lẫn trên bề mặt chất lỏng, tại một nhiệt độ xác định (nhiệt độ sôi).",
          },
          {
            order: 8,
            content: "Ở điều kiện thường, oxygen có tính chất nào sau đây?",
            choices: JSON.stringify([
              "Là khí không màu, không mùi, tan ít trong nước, nhẹ hơn không khí",
              "Là khí không màu, không mùi, tan ít trong nước, nặng hơn không khí, duy trì sự cháy và sự sống",
              "Là khí màu xanh nhạt, tan nhiều trong nước",
              "Là khí không màu, không mùi, tan nhiều trong nước, duy trì sự cháy",
            ]),
            correctIndex: 1,
          },
          {
            order: 9,
            content: "Trong không khí, khí nào chiếm tỉ lệ phần trăm thể tích lớn nhất?",
            choices: JSON.stringify(["Oxygen", "Nitrogen", "Carbon dioxide", "Hơi nước"]),
            correctIndex: 1,
          },
          {
            order: 10,
            content: "Tỉ lệ gần đúng của oxygen về thể tích trong không khí là",
            choices: JSON.stringify(["1%", "21%", "78%", "50%"]),
            correctIndex: 1,
          },
          {
            order: 11,
            content: "Đưa que đóm còn tàn đỏ vào lọ đựng khí oxygen, hiện tượng quan sát được là",
            choices: JSON.stringify(["Tàn đóm tắt ngay", "Tàn đóm bùng cháy", "Không có hiện tượng gì", "Tàn đóm chuyển màu đen"]),
            correctIndex: 1,
          },
          {
            order: 12,
            content: "Hoạt động nào sau đây không góp phần gây ô nhiễm không khí?",
            choices: JSON.stringify(["Đốt rác thải sinh hoạt", "Trồng cây xanh", "Khí thải phương tiện giao thông", "Khí thải nhà máy công nghiệp chưa qua xử lí"]),
            correctIndex: 1,
            explanation: "Trồng cây xanh giúp giảm carbon dioxide và cải thiện chất lượng không khí, không gây ô nhiễm.",
          },
          {
            order: 13,
            content: "Chất nào sau đây được dùng để phân biệt khí oxygen và khí carbon dioxide đơn giản nhất?",
            choices: JSON.stringify(["Que đóm còn tàn đỏ", "Nước cất", "Giấy quỳ tím", "Dung dịch muối ăn"]),
            correctIndex: 0,
            explanation: "Que đóm bùng cháy trong oxygen nhưng tắt trong carbon dioxide, đây là cách phân biệt đơn giản nhất ở cấp THCS.",
          },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 6,
      chapterId: ch6_1.id,
      topic: "Chất quanh ta",
      cards: {
        create: [
          { order: 1, term: "Vật thể tự nhiên", meaning: "Vật thể có sẵn trong tự nhiên, ví dụ: cây cối, sông suối, không khí" },
          { order: 2, term: "Vật thể nhân tạo", meaning: "Vật thể do con người tạo ra để phục vụ đời sống, ví dụ: xe đạp, nhà cửa" },
          { order: 3, term: "Tính chất vật lí", meaning: "Tính chất không làm xuất hiện chất mới (thể, màu sắc, tính tan, nhiệt độ sôi...)" },
          { order: 4, term: "Tính chất hóa học", meaning: "Tính chất thể hiện qua quá trình biến đổi tạo ra chất mới (bị phân hủy, bị đốt cháy...)" },
          { order: 5, term: "Sự nóng chảy", meaning: "Quá trình chuyển từ thể rắn sang thể lỏng, xảy ra ở nhiệt độ xác định" },
          { order: 6, term: "Sự sôi", meaning: "Sự bay hơi xảy ra cả trong lòng và trên bề mặt chất lỏng, ở nhiệt độ xác định" },
          { order: 7, term: "Sự ngưng tụ", meaning: "Quá trình chuyển từ thể khí (hơi) sang thể lỏng, xảy ra ở mọi nhiệt độ" },
          { order: 8, term: "Oxygen", meaning: "Khí không màu, không mùi, tan ít trong nước, duy trì sự cháy và sự sống" },
          { order: 9, term: "Thành phần không khí", meaning: "Khoảng 21% oxygen, 78% nitrogen, còn lại là CO2, hơi nước và khí khác" },
          { order: 10, term: "Ô nhiễm không khí", meaning: "Sự thay đổi thành phần không khí gây ảnh hưởng xấu đến sức khỏe con người và sinh vật" },
        ],
      },
    },
  });

  // ================= LỚP 6 - CHƯƠNG 2: VẬT LIỆU, NHIÊN LIỆU, NGUYÊN LIỆU, LƯƠNG THỰC - THỰC PHẨM =================
  await prisma.document.createMany({
    data: [
      {
        grade: 6,
        chapterId: ch6_2.id,
        order: 1,
        title: "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
        content:
          "## Vật liệu\n" +
          "- Vật liệu là chất hoặc hỗn hợp chất được con người dùng làm nguyên liệu đầu vào cho quá trình sản xuất, chế tạo sản phẩm phục vụ đời sống.\n" +
          "- Phân loại theo mục đích sử dụng: vật liệu xây dựng (xi măng, cát, đá), vật liệu cơ khí (thép, gang, đồng), vật liệu điện tử, vật liệu composite, vật liệu nano,...\n" +
          "- Sử dụng an toàn, hiệu quả theo mô hình 3R: Reduce (giảm thiểu) - Reuse (tái sử dụng) - Recycle (tái chế).\n\n" +
          "## Nhiên liệu\n" +
          "- Nhiên liệu là chất cháy được, khi cháy tỏa nhiều nhiệt, dùng để sưởi ấm, nấu ăn, chạy động cơ, phát điện.\n" +
          "- Tồn tại ở 3 thể: rắn (than đá, củi, nến), lỏng (xăng, dầu hỏa, cồn), khí (gas, biogas).\n" +
          "- Than đá, dầu mỏ, khí thiên nhiên là nhiên liệu hóa thạch - không tái tạo, sẽ cạn kiệt; than đá gây ô nhiễm nhiều nhất khi đốt.\n" +
          "- Sử dụng hiệu quả: cung cấp đủ oxygen cho quá trình cháy, tăng diện tích tiếp xúc nhiên liệu với không khí (chẻ nhỏ củi, tạo lỗ than tổ ong), điều chỉnh mức cháy phù hợp nhu cầu.\n\n" +
          "## Nguyên liệu\n" +
          "- Nguyên liệu là vật liệu tự nhiên (thô) chưa qua xử lí, cần chuyển hóa để tạo sản phẩm: đất, đá, quặng, dầu mỏ,...\n" +
          "- Đá vôi (thành phần chính: calcium carbonate) dùng sản xuất vôi sống, xi măng, làm đường.\n" +
          "- Quặng là đất đá chứa chất có giá trị: quặng sắt sản xuất gang, thép; quặng bauxite sản xuất nhôm (aluminium).\n" +
          "- Cần khai thác nguyên liệu có kế hoạch, tiết kiệm vì tài nguyên khoáng sản không tái tạo được.",
      },
      {
        grade: 6,
        chapterId: ch6_2.id,
        order: 2,
        title: "Bài 5. Một số lương thực, thực phẩm",
        content:
          "## Vai trò của lương thực, thực phẩm\n" +
          "- Là nguồn thức ăn quan trọng, cung cấp năng lượng và chất dinh dưỡng cho cơ thể.\n" +
          "- Cần bảo quản đúng cách vì dễ hỏng trong môi trường nóng ẩm, có thể sinh ra chất độc hại.\n\n" +
          "## Các nhóm chất dinh dưỡng\n" +
          "- Carbohydrate (tinh bột, đường, chất xơ): nguồn năng lượng chính, có nhiều trong gạo, ngô, khoai, mía.\n" +
          "- Protein (chất đạm): cấu tạo, duy trì, phát triển cơ thể; có nhiều trong thịt, cá, trứng, sữa, các loại đậu.\n" +
          "- Lipid (chất béo): dự trữ năng lượng, chống lạnh; có trong bơ, dầu thực vật, mỡ, lòng đỏ trứng.\n" +
          "- Chất khoáng: calcium (chắc xương), iodine (phòng bướu cổ), zinc,... cần thiết cho sự phát triển cơ thể.\n" +
          "- Vitamin: cần lượng nhỏ nhưng vai trò lớn; nhóm tan trong chất béo (A, D, E, K) và nhóm tan trong nước (B, C). Thiếu vitamin A gây quáng gà; thiếu vitamin D ảnh hưởng phát triển xương.\n\n" +
          "## Chế độ dinh dưỡng hợp lí\n" +
          "- Nhu cầu dinh dưỡng phụ thuộc độ tuổi, giới tính, mức độ hoạt động.\n" +
          "- Ăn thừa năng lượng mà ít vận động sẽ tích trữ thành chất béo (thừa cân); ăn thiếu chất sẽ suy dinh dưỡng.\n" +
          "- Bảo quản thực phẩm đúng cách: để trong tủ lạnh, sấy khô, ướp muối; tránh để thực phẩm sống lẫn thực phẩm chín.",
      },
    ],
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm (Chương 2 - Lớp 6)",
      grade: 6,
      chapterId: ch6_2.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Vật liệu là gì?",
            choices: JSON.stringify([
              "Một số thức ăn con người sử dụng hàng ngày",
              "Chất hoặc hỗn hợp chất được con người dùng làm nguyên liệu đầu vào để sản xuất, chế tạo sản phẩm phục vụ đời sống",
              "Chất cháy được và tỏa nhiều nhiệt khi cháy",
              "Đất đá chứa các chất có giá trị được khai thác từ mỏ",
            ]),
            correctIndex: 1,
          },
          {
            order: 2,
            content: "Vật liệu nào sau đây dẫn điện tốt, thường dùng làm dây dẫn điện?",
            choices: JSON.stringify(["Thủy tinh", "Cao su", "Kim loại (đồng, nhôm)", "Gốm sứ"]),
            correctIndex: 2,
          },
          {
            order: 3,
            content: "Nhiên liệu nào sau đây là nhiên liệu rắn?",
            choices: JSON.stringify(["Than đá", "Dầu hỏa", "Xăng", "Khí thiên nhiên"]),
            correctIndex: 0,
          },
          {
            order: 4,
            content: "Vì sao khi nhóm bếp củi người ta thường chẻ nhỏ củi?",
            choices: JSON.stringify([
              "Để củi dễ vận chuyển hơn",
              "Để tăng diện tích tiếp xúc với oxygen, giúp củi cháy nhanh và tận dụng tối đa nhiên liệu",
              "Để củi cháy chậm hơn, tiết kiệm hơn",
              "Không có tác dụng gì đặc biệt",
            ]),
            correctIndex: 1,
          },
          {
            order: 5,
            content: "Quặng bauxite được khai thác chủ yếu để sản xuất kim loại nào?",
            choices: JSON.stringify(["Sắt (iron)", "Đồng (copper)", "Nhôm (aluminium)", "Kẽm (zinc)"]),
            correctIndex: 2,
          },
          {
            order: 6,
            content: "Thành phần chính của đá vôi là chất nào sau đây?",
            choices: JSON.stringify(["Calcium carbonate", "Sodium chloride", "Silicon dioxide", "Aluminium oxide"]),
            correctIndex: 0,
          },
          {
            order: 7,
            content: "Nhóm chất dinh dưỡng nào là nguồn năng lượng chính cho cơ thể, có nhiều trong gạo, ngô, khoai?",
            choices: JSON.stringify(["Carbohydrate", "Protein", "Lipid", "Vitamin"]),
            correctIndex: 0,
          },
          {
            order: 8,
            content: "Thiếu chất khoáng nào sau đây có thể gây bệnh bướu cổ?",
            choices: JSON.stringify(["Calcium", "Iodine", "Zinc", "Phosphorus"]),
            correctIndex: 1,
          },
          {
            order: 9,
            content: "Thực phẩm nào sau đây chứa nhiều protein (chất đạm) nhất?",
            choices: JSON.stringify(["Gạo", "Rau xanh", "Thịt, cá, trứng", "Đường mía"]),
            correctIndex: 2,
          },
          {
            order: 10,
            content: "Việc làm nào sau đây không phải là cách bảo quản lương thực - thực phẩm đúng cách?",
            choices: JSON.stringify(["Bảo quản trong tủ lạnh", "Sấy khô trái cây", "Để thịt ngoài không khí trong thời gian dài", "Ướp muối cho cá"]),
            correctIndex: 2,
          },
          {
            order: 11,
            content: "Nguồn nhiên liệu nào sau đây là nhiên liệu hóa thạch, không tái tạo?",
            choices: JSON.stringify(["Năng lượng mặt trời", "Than đá, dầu mỏ, khí thiên nhiên", "Năng lượng gió", "Thủy điện"]),
            correctIndex: 1,
          },
          {
            order: 12,
            content: "Mô hình 3R trong sử dụng vật liệu an toàn, hiệu quả gồm những gì?",
            choices: JSON.stringify([
              "Reduce (giảm thiểu) - Reuse (tái sử dụng) - Recycle (tái chế)",
              "Read - Reduce - Repeat",
              "Reuse - Repair - Replace",
              "Recycle - Repair - Reduce",
            ]),
            correctIndex: 0,
          },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 6,
      chapterId: ch6_2.id,
      topic: "Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
      cards: {
        create: [
          { order: 1, term: "Vật liệu", meaning: "Chất/hỗn hợp chất dùng làm đầu vào sản xuất, chế tạo sản phẩm" },
          { order: 2, term: "Nhiên liệu", meaning: "Chất cháy được, khi cháy tỏa nhiều nhiệt (than, xăng, gas)" },
          { order: 3, term: "Nguyên liệu", meaning: "Vật liệu tự nhiên thô chưa qua xử lí, cần chuyển hóa để tạo sản phẩm" },
          { order: 4, term: "Nhiên liệu hóa thạch", meaning: "Than đá, dầu mỏ, khí thiên nhiên - nguồn không tái tạo, sẽ cạn kiệt" },
          { order: 5, term: "Quặng bauxite", meaning: "Nguyên liệu chính để sản xuất nhôm (aluminium)" },
          { order: 6, term: "Đá vôi", meaning: "Nguyên liệu có thành phần chính calcium carbonate, dùng sản xuất vôi, xi măng" },
          { order: 7, term: "Carbohydrate", meaning: "Nhóm chất (tinh bột, đường) là nguồn năng lượng chính cho cơ thể" },
          { order: 8, term: "Protein", meaning: "Chất đạm, cấu tạo và duy trì phát triển cơ thể" },
          { order: 9, term: "Vitamin A", meaning: "Thiếu vitamin A gây bệnh quáng gà, tốt cho mắt" },
          { order: 10, term: "Iodine", meaning: "Chất khoáng cần thiết, thiếu gây bệnh bướu cổ" },
        ],
      },
    },
  });

  console.log("Đã tạo xong Lớp 6 - Chương 2");

  // ================= LỚP 6 - CHƯƠNG 3: HỖN HỢP =================
  await prisma.document.createMany({
    data: [
      {
        grade: 6,
        chapterId: ch6_3.id,
        order: 1,
        title: "Bài 6. Chất tinh khiết và hỗn hợp",
        content:
          "## Chất tinh khiết\n" +
          "- Chất tinh khiết (chất nguyên chất) được tạo ra từ một chất duy nhất, không trộn lẫn chất khác.\n" +
          "- Có thành phần hóa học và tính chất nhất định (ví dụ: nước cất sôi ở 100°C, nóng chảy ở 0°C).\n\n" +
          "## Hỗn hợp\n" +
          "- Hỗn hợp được tạo ra khi hai hay nhiều chất trộn lẫn với nhau; tính chất phụ thuộc thành phần và hàm lượng.\n" +
          "- Hỗn hợp đồng nhất: thành phần giống nhau tại mọi vị trí (nước đường, nước muối).\n" +
          "- Hỗn hợp không đồng nhất: thành phần không giống nhau trong toàn bộ hỗn hợp (dầu ăn và nước, cát và nước).\n\n" +
          "## Dung dịch - dung môi - chất tan\n" +
          "- Dung dịch là hỗn hợp đồng nhất của chất tan và dung môi.\n" +
          "- Chất tan: chất được hòa tan (rắn, lỏng hoặc khí). Dung môi: chất dùng để hòa tan chất tan (thường là nước).\n" +
          "- Các yếu tố giúp chất rắn tan nhanh hơn: khuấy, đun nóng, nghiền nhỏ chất rắn.\n" +
          "- Khả năng tan trong nước của chất khí khác nhau: HCl, NH3 tan tốt; CO2, O2 tan ít; H2, N2 gần như không tan.\n\n" +
          "## Huyền phù và nhũ tương\n" +
          "- Huyền phù: hỗn hợp không đồng nhất gồm hạt chất rắn lơ lửng trong chất lỏng (nước phù sa). Để yên, hạt rắn lắng xuống đáy.\n" +
          "- Nhũ tương: hỗn hợp không đồng nhất gồm các chất lỏng không tan vào nhau (dầu ăn và nước, sữa).\n" +
          "- Ngoài ra còn có: bọt (khí phân tán trong lỏng), sương (giọt lỏng phân tán trong khí), bụi (hạt rắn phân tán trong khí).",
      },
      {
        grade: 6,
        chapterId: ch6_3.id,
        order: 2,
        title: "Bài 7. Tách chất khỏi hỗn hợp",
        content:
          "## Phương pháp lọc\n" +
          "- Dùng để tách chất rắn không tan ra khỏi hỗn hợp lỏng (ví dụ: tách sulfur ra khỏi hỗn hợp sulfur và nước bằng giấy lọc).\n\n" +
          "## Phương pháp cô cạn\n" +
          "- Dùng để tách chất rắn tan (không bị phân hủy khi đun nóng) ra khỏi dung dịch bằng cách đun cho dung môi bay hơi hết (ví dụ: tách muối ăn ra khỏi dung dịch muối).\n\n" +
          "## Phương pháp chiết\n" +
          "- Dùng để tách các chất lỏng không tan vào nhau (ví dụ: tách dầu ăn ra khỏi nước bằng phễu chiết - mở khóa cho lớp nước chảy ra trước, dầu nhẹ hơn nổi lên trên).\n\n" +
          "## Phương pháp chưng cất\n" +
          "- Dùng để tách các chất lỏng tan vào nhau nhưng có nhiệt độ sôi khác nhau (ví dụ: tách rượu ra khỏi nước - ethanol sôi ở 78°C, nước sôi ở 100°C).\n\n" +
          "## Các phương pháp khác\n" +
          "- Dùng nam châm: tách sắt ra khỏi hỗn hợp với các chất không bị nam châm hút (như cát).\n" +
          "- Lựa chọn phương pháp tách phù hợp cần dựa vào sự khác nhau về tính chất vật lí của các chất trong hỗn hợp (độ tan, nhiệt độ sôi, khả năng bị nam châm hút,...).",
      },
    ],
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Hỗn hợp (Chương 3 - Lớp 6)",
      grade: 6,
      chapterId: ch6_3.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Chất tinh khiết là gì?",
            choices: JSON.stringify(["Chất được tạo ra từ một chất duy nhất, không trộn lẫn với chất khác", "Hỗn hợp của hai chất trở lên", "Chất luôn ở thể lỏng", "Chất không tan trong nước"]),
            correctIndex: 0,
          },
          {
            order: 2,
            content: "Hỗn hợp nào sau đây là hỗn hợp đồng nhất?",
            choices: JSON.stringify(["Dầu ăn và nước", "Nước đường", "Cát và nước", "Bột mì và nước"]),
            correctIndex: 1,
          },
          {
            order: 3,
            content: "Dung dịch là gì?",
            choices: JSON.stringify(["Hỗn hợp không đồng nhất của chất rắn và chất lỏng", "Hỗn hợp đồng nhất của chất tan và dung môi", "Chất tinh khiết ở thể lỏng", "Hỗn hợp của hai chất khí"]),
            correctIndex: 1,
          },
          {
            order: 4,
            content: "Biện pháp nào sau đây KHÔNG giúp chất rắn tan nhanh hơn trong nước?",
            choices: JSON.stringify(["Khuấy dung dịch", "Đun nóng dung dịch", "Nghiền nhỏ chất rắn", "Để yên không tác động"]),
            correctIndex: 3,
          },
          {
            order: 5,
            content: "Huyền phù khác nhũ tương ở điểm nào?",
            choices: JSON.stringify([
              "Huyền phù gồm hạt chất rắn lơ lửng trong chất lỏng; nhũ tương gồm các chất lỏng không tan vào nhau",
              "Huyền phù và nhũ tương hoàn toàn giống nhau",
              "Huyền phù là hỗn hợp đồng nhất, nhũ tương là hỗn hợp không đồng nhất",
              "Huyền phù chỉ có ở thể khí",
            ]),
            correctIndex: 0,
          },
          {
            order: 6,
            content: "Ví dụ nào sau đây là nhũ tương?",
            choices: JSON.stringify(["Nước phù sa", "Sữa (hỗn hợp dầu béo và nước)", "Nước muối", "Nước đường"]),
            correctIndex: 1,
          },
          {
            order: 7,
            content: "Để tách muối ăn ra khỏi dung dịch nước muối, phương pháp phù hợp là",
            choices: JSON.stringify(["Lọc", "Cô cạn", "Dùng nam châm", "Chiết"]),
            correctIndex: 1,
          },
          {
            order: 8,
            content: "Để tách dầu ăn ra khỏi nước, phương pháp phù hợp nhất là",
            choices: JSON.stringify(["Cô cạn", "Lọc", "Chiết", "Dùng nam châm"]),
            correctIndex: 2,
          },
          {
            order: 9,
            content: "Để tách cát (không tan) ra khỏi nước, phương pháp phù hợp là",
            choices: JSON.stringify(["Lọc", "Cô cạn", "Chưng cất", "Chiết"]),
            correctIndex: 0,
          },
          {
            order: 10,
            content: "Ethanol sôi ở 78°C, nước sôi ở 100°C. Để tách ethanol ra khỏi hỗn hợp ethanol - nước, người ta dùng phương pháp nào?",
            choices: JSON.stringify(["Lọc", "Chiết", "Chưng cất", "Dùng nam châm"]),
            correctIndex: 2,
            explanation: "Vì hai chất lỏng tan vào nhau nhưng có nhiệt độ sôi khác nhau, phương pháp chưng cất là phù hợp nhất.",
          },
          {
            order: 11,
            content: "Hỗn hợp bột sắt và bột lưu huỳnh (sulfur) có thể tách riêng bằng cách nào đơn giản nhất?",
            choices: JSON.stringify(["Dùng nam châm hút sắt ra", "Hòa tan vào nước rồi lọc", "Đun nóng cho bay hơi", "Không thể tách được"]),
            correctIndex: 0,
            explanation: "Sắt bị nam châm hút còn lưu huỳnh thì không, đây là cách tách đơn giản và nhanh nhất.",
          },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 6,
      chapterId: ch6_3.id,
      topic: "Hỗn hợp và tách chất",
      cards: {
        create: [
          { order: 1, term: "Chất tinh khiết", meaning: "Chất được tạo ra từ một chất duy nhất, không trộn lẫn chất khác" },
          { order: 2, term: "Hỗn hợp đồng nhất", meaning: "Hỗn hợp có thành phần giống nhau tại mọi vị trí (nước đường, nước muối)" },
          { order: 3, term: "Hỗn hợp không đồng nhất", meaning: "Hỗn hợp có thành phần không giống nhau (dầu và nước, cát và nước)" },
          { order: 4, term: "Dung dịch", meaning: "Hỗn hợp đồng nhất của chất tan và dung môi" },
          { order: 5, term: "Huyền phù", meaning: "Hạt chất rắn lơ lửng phân tán trong chất lỏng, để yên sẽ lắng xuống" },
          { order: 6, term: "Nhũ tương", meaning: "Các chất lỏng không tan vào nhau, phân tán vào nhau (sữa, dầu-nước)" },
          { order: 7, term: "Phương pháp lọc", meaning: "Tách chất rắn không tan ra khỏi chất lỏng" },
          { order: 8, term: "Phương pháp cô cạn", meaning: "Tách chất rắn tan (bền nhiệt) ra khỏi dung dịch bằng cách bay hơi dung môi" },
          { order: 9, term: "Phương pháp chiết", meaning: "Tách các chất lỏng không tan vào nhau" },
          { order: 10, term: "Phương pháp chưng cất", meaning: "Tách các chất lỏng tan vào nhau nhưng có nhiệt độ sôi khác nhau" },
        ],
      },
    },
  });

  console.log("Đã tạo xong Lớp 6 - Chương 3");
  console.log("HOÀN TẤT LỚP 6 (3 chương, 7 bài)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
