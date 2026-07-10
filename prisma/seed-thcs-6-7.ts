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

  async function upsertChapter(grade: number, order: number, title: string) {
    return prisma.chapter.upsert({
      where: { grade_order: { grade, order } },
      update: { title },
      create: { grade, order, title },
    });
  }

  const ch6_1 = await upsertChapter(6, 1, "Chương 1. Chất quanh ta");
  const ch6_2 = await upsertChapter(6, 2, "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm");
  const ch6_3 = await upsertChapter(6, 3, "Chương 3. Hỗn hợp");
  const ch7_1 = await upsertChapter(7, 1, "Chương 1. Nguyên tử, nguyên tố hóa học");
  const ch7_2 = await upsertChapter(7, 2, "Chương 2. Sơ lược bảng tuần hoàn các nguyên tố hóa học");
  const ch7_3 = await upsertChapter(7, 3, "Chương 3. Phân tử, liên kết hóa học");
  const ch7_4 = await upsertChapter(7, 4, "Chương 4. Hóa trị và công thức hóa học");

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

  // ================= LỚP 7 - CHƯƠNG 1: NGUYÊN TỬ, NGUYÊN TỐ HÓA HỌC =================
  await prisma.document.createMany({
    data: [
      {
        grade: 7,
        chapterId: ch7_1.id,
        order: 1,
        title: "Bài 8. Nguyên tử",
        content:
          "## Cấu tạo nguyên tử\n" +
          "- Nguyên tử là hạt cực kì nhỏ bé, trung hòa về điện, cấu tạo nên chất.\n" +
          "- Nguyên tử gồm hạt nhân (mang điện tích dương) và vỏ nguyên tử (gồm một hay nhiều electron mang điện tích âm).\n" +
          "- Hạt nhân được tạo bởi proton (p, mang điện tích +1) và neutron (n, không mang điện).\n" +
          "- Electron (e) mang điện tích -1, chuyển động quanh hạt nhân và sắp xếp thành từng lớp theo mô hình Rutherford - Bohr.\n\n" +
          "## Mối quan hệ giữa các hạt\n" +
          "- Trong một nguyên tử: số proton = số electron (vì nguyên tử trung hòa điện).\n" +
          "- Điện tích hạt nhân = số proton (viết dạng +Z).\n" +
          "- Khối lượng nguyên tử được coi bằng tổng khối lượng proton và neutron (do khối lượng electron rất nhỏ, không đáng kể).\n\n" +
          "## Đơn vị khối lượng nguyên tử\n" +
          "- Khối lượng nguyên tử được tính bằng đơn vị amu (atomic mass unit): 1 amu = 1,6605×10^-24 gam.\n" +
          "- Ví dụ: nguyên tử có 15 proton và 16 neutron có khối lượng = 15 + 16 = 31 amu.\n\n" +
          "## Lớp electron\n" +
          "- Electron được sắp xếp thành từng lớp quanh hạt nhân, từ trong ra ngoài.\n" +
          "- Lớp electron thứ nhất (gần hạt nhân nhất) chứa tối đa 2 electron.\n" +
          "- Ví dụ: nguyên tử có 15 electron được phân bố thành 3 lớp: 2/8/5 (lớp 1 có 2e, lớp 2 có 8e, lớp 3 có 5e).",
      },
      {
        grade: 7,
        chapterId: ch7_1.id,
        order: 2,
        title: "Bài 9. Nguyên tố hóa học, đồng vị, nguyên tử khối trung bình",
        content:
          "## Nguyên tố hóa học\n" +
          "- Các nguyên tử có cùng số proton trong hạt nhân thuộc cùng một nguyên tố hóa học.\n" +
          "- Số proton = số hiệu nguyên tử (kí hiệu Z).\n" +
          "- Các nguyên tử cùng một nguyên tố có tính chất hóa học giống nhau, dù số neutron có thể khác nhau.\n" +
          "- Hiện nay đã tìm ra 118 nguyên tố hóa học.\n\n" +
          "## Kí hiệu hóa học\n" +
          "- Mỗi nguyên tố có kí hiệu hóa học riêng, dùng thống nhất trên toàn thế giới theo IUPAC.\n" +
          "- Kí hiệu gồm 1 hoặc 2 chữ cái: chữ đầu viết hoa, chữ sau (nếu có) viết thường. Ví dụ: H (hydrogen), He (helium), Na (sodium), Ca (calcium).\n\n" +
          "## Đồng vị\n" +
          "- Đồng vị là những nguyên tử có cùng số proton nhưng khác số neutron.\n" +
          "- Các đồng vị của cùng một nguyên tố khác nhau về một số tính chất vật lí (như khối lượng) nhưng tính chất hóa học tương tự nhau.\n" +
          "- Có đồng vị bền và đồng vị phóng xạ (không bền), được ứng dụng trong y học, nông nghiệp, nghiên cứu khoa học.\n\n" +
          "## Nguyên tử khối trung bình\n" +
          "- Hầu hết nguyên tố trong tự nhiên là hỗn hợp nhiều đồng vị theo tỉ lệ phần trăm xác định.\n" +
          "- Nguyên tử khối của một nguyên tố là nguyên tử khối trung bình của hỗn hợp các đồng vị đó.\n" +
          "- Oxygen là nguyên tố phổ biến nhất trong lớp vỏ Trái Đất; hydrogen là nguyên tố phổ biến nhất trong vũ trụ.",
      },
    ],
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Nguyên tử, nguyên tố hóa học (Chương 1 - Lớp 7)",
      grade: 7,
      chapterId: ch7_1.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Nguyên tử được cấu tạo bởi những loại hạt nào?",
            choices: JSON.stringify(["Proton, neutron, electron", "Proton và neutron", "Proton và electron", "Neutron và electron"]),
            correctIndex: 0,
          },
          {
            order: 2,
            content: "Hạt mang điện tích dương, nằm trong hạt nhân nguyên tử là",
            choices: JSON.stringify(["Electron", "Proton", "Neutron", "Phân tử"]),
            correctIndex: 1,
          },
          {
            order: 3,
            content: "Trong nguyên tử, vì sao số proton luôn bằng số electron?",
            choices: JSON.stringify(["Vì nguyên tử trung hòa về điện", "Vì chúng có cùng khối lượng", "Vì chúng cùng nằm trong hạt nhân", "Vì đó là quy ước tùy ý"]),
            correctIndex: 0,
          },
          {
            order: 4,
            content: "Một đơn vị khối lượng nguyên tử (1 amu) có giá trị bằng",
            choices: JSON.stringify(["1/16 khối lượng nguyên tử oxygen", "1/12 khối lượng nguyên tử carbon", "1/32 khối lượng nguyên tử sulfur", "1/10 khối lượng nguyên tử boron"]),
            correctIndex: 1,
          },
          {
            order: 5,
            content: "Nguyên tử X có 11 proton và 12 neutron. Khối lượng nguyên tử X là",
            choices: JSON.stringify(["11 amu", "12 amu", "23 amu", "34 amu"]),
            correctIndex: 2,
            explanation: "Khối lượng nguyên tử = số proton + số neutron = 11 + 12 = 23 amu.",
          },
          {
            order: 6,
            content: "Các nguyên tử có cùng số proton trong hạt nhân thì",
            choices: JSON.stringify(["thuộc cùng một nguyên tố hóa học", "luôn có cùng số neutron", "luôn có khối lượng bằng nhau", "không có mối liên hệ gì"]),
            correctIndex: 0,
          },
          {
            order: 7,
            content: "Kí hiệu hóa học của nguyên tố calcium là",
            choices: JSON.stringify(["Ca", "C", "Cl", "Cr"]),
            correctIndex: 0,
          },
          {
            order: 8,
            content: "Đồng vị là những nguyên tử",
            choices: JSON.stringify([
              "có cùng số proton nhưng khác số neutron",
              "có cùng số neutron nhưng khác số proton",
              "có cùng số electron và số neutron",
              "hoàn toàn giống nhau về mọi mặt",
            ]),
            correctIndex: 0,
          },
          {
            order: 9,
            content: "Nguyên tố phổ biến nhất trong lớp vỏ Trái Đất là",
            choices: JSON.stringify(["Hydrogen", "Oxygen", "Silicon", "Nitrogen"]),
            correctIndex: 1,
          },
          {
            order: 10,
            content: "Nguyên tố phổ biến nhất trong vũ trụ là",
            choices: JSON.stringify(["Oxygen", "Helium", "Hydrogen", "Carbon"]),
            correctIndex: 2,
          },
          {
            order: 11,
            content: "Nguyên tử khối của một nguyên tố trong tự nhiên chính là",
            choices: JSON.stringify([
              "khối lượng của đồng vị phổ biến nhất",
              "nguyên tử khối trung bình của hỗn hợp các đồng vị của nguyên tố đó",
              "tổng khối lượng tất cả các đồng vị cộng lại",
              "khối lượng của đồng vị nhẹ nhất",
            ]),
            correctIndex: 1,
          },
          {
            order: 12,
            content: "Nguyên tử X có tổng số hạt (proton, neutron, electron) là 21, trong đó số hạt không mang điện chiếm 33,33% tổng số hạt. Nguyên tử X có số proton là",
            choices: JSON.stringify(["6", "7", "8", "9"]),
            correctIndex: 1,
            explanation: "Số neutron = 33,33% × 21 = 7. Vì 2×proton + neutron = 21 nên proton = (21-7)/2 = 7.",
          },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 7,
      chapterId: ch7_1.id,
      topic: "Nguyên tử, nguyên tố hóa học",
      cards: {
        create: [
          { order: 1, term: "Nguyên tử", meaning: "Hạt cực kì nhỏ bé, trung hòa về điện, cấu tạo nên chất" },
          { order: 2, term: "Proton (p)", meaning: "Hạt mang điện tích dương (+1), nằm trong hạt nhân" },
          { order: 3, term: "Neutron (n)", meaning: "Hạt không mang điện, nằm trong hạt nhân" },
          { order: 4, term: "Electron (e)", meaning: "Hạt mang điện tích âm (-1), chuyển động quanh hạt nhân theo từng lớp" },
          { order: 5, term: "amu", meaning: "Đơn vị khối lượng nguyên tử, 1 amu = 1/12 khối lượng nguyên tử carbon" },
          { order: 6, term: "Nguyên tố hóa học", meaning: "Tập hợp nguyên tử có cùng số proton trong hạt nhân" },
          { order: 7, term: "Số hiệu nguyên tử (Z)", meaning: "Bằng số proton, đặc trưng cho một nguyên tố hóa học" },
          { order: 8, term: "Đồng vị", meaning: "Nguyên tử cùng số proton nhưng khác số neutron" },
          { order: 9, term: "Nguyên tử khối trung bình", meaning: "Trung bình khối lượng các đồng vị của một nguyên tố theo tỉ lệ phần trăm" },
          { order: 10, term: "Oxygen phổ biến nhất", meaning: "Oxygen là nguyên tố phổ biến nhất trong vỏ Trái Đất; hydrogen phổ biến nhất trong vũ trụ" },
        ],
      },
    },
  });

  console.log("Đã tạo xong Lớp 7 - Chương 1");

  // ================= LỚP 7 - CHƯƠNG 2: SƠ LƯỢC BẢNG TUẦN HOÀN CÁC NGUYÊN TỐ HÓA HỌC =================
  await prisma.document.create({
    data: {
      grade: 7,
      chapterId: ch7_2.id,
      order: 1,
      title: "Bài 10. Sơ lược về bảng tuần hoàn các nguyên tố hóa học",
      content:
        "## Lịch sử và nguyên tắc sắp xếp\n" +
        "- Nhà bác học người Nga Dmitri Ivanovich Mendeleev là người đầu tiên xây dựng thành công bảng tuần hoàn (năm 1869), sắp xếp theo chiều tăng khối lượng nguyên tử.\n" +
        "- Bảng tuần hoàn hiện nay sắp xếp các nguyên tố theo chiều tăng dần điện tích hạt nhân nguyên tử.\n" +
        "- Các nguyên tố trong cùng một hàng (chu kì) có cùng số lớp electron.\n" +
        "- Các nguyên tố trong cùng một cột (nhóm) có tính chất hóa học gần giống nhau.\n\n" +
        "## Ô nguyên tố\n" +
        "- Mỗi ô nguyên tố cho biết: số hiệu nguyên tử (Z), kí hiệu hóa học, tên nguyên tố, khối lượng nguyên tử (amu).\n" +
        "- Số hiệu nguyên tử = số thứ tự ô = số electron = số đơn vị điện tích hạt nhân.\n\n" +
        "## Chu kì\n" +
        "- Chu kì gồm các nguyên tố có cùng số lớp electron, xếp thành hàng ngang theo chiều tăng điện tích hạt nhân.\n" +
        "- Có 7 chu kì (1-7); chu kì nhỏ: 1,2,3; chu kì lớn: 4,5,6,7.\n" +
        "- Số thứ tự chu kì = số lớp electron. Ví dụ: chu kì 3 gồm các nguyên tố có 3 lớp electron (Na đến Ar).\n" +
        "- Mở đầu mỗi chu kì (trừ chu kì 1) là kim loại điển hình, cuối chu kì là phi kim điển hình, kết thúc là khí hiếm.\n\n" +
        "## Nhóm\n" +
        "- Nhóm gồm các nguyên tố có tính chất hóa học tương tự nhau, xếp thành cột theo chiều tăng điện tích hạt nhân.\n" +
        "- Có 18 cột: 8 nhóm A (nhóm chính) và 8 nhóm B (nhóm phụ - kim loại chuyển tiếp).\n" +
        "- Với nhóm A: số thứ tự nhóm = số electron lớp ngoài cùng.\n" +
        "- Tên riêng một số nhóm: nhóm IA (kim loại kiềm, trừ H), nhóm IIA (kim loại kiềm thổ), nhóm VIIA (halogen), nhóm VIIIA (khí hiếm).\n\n" +
        "## Vị trí kim loại, phi kim, khí hiếm\n" +
        "- Kim loại (khoảng 80% số nguyên tố): nằm bên trái và góc dưới bên phải bảng tuần hoàn.\n" +
        "- Phi kim: nằm bên phải bảng tuần hoàn.\n" +
        "- Khí hiếm: nằm ở cột cuối cùng (nhóm VIIIA).",
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Sơ lược bảng tuần hoàn (Chương 2 - Lớp 7)",
      grade: 7,
      chapterId: ch7_2.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Ai là nhà khoa học đầu tiên xây dựng thành công bảng tuần hoàn các nguyên tố hóa học?",
            choices: JSON.stringify(["Ernest Rutherford", "Dmitri Ivanovich Mendeleev", "Niels Bohr", "John Dalton"]),
            correctIndex: 1,
          },
          {
            order: 2,
            content: "Các nguyên tố trong bảng tuần hoàn được sắp xếp theo chiều tăng dần của",
            choices: JSON.stringify(["khối lượng riêng", "số proton (điện tích hạt nhân)", "số neutron", "số lớp electron"]),
            correctIndex: 1,
          },
          {
            order: 3,
            content: "Hiện nay, bảng tuần hoàn có bao nhiêu chu kì?",
            choices: JSON.stringify(["5", "6", "7", "8"]),
            correctIndex: 2,
          },
          {
            order: 4,
            content: "Số thứ tự của chu kì bằng",
            choices: JSON.stringify(["số electron lớp ngoài cùng", "số lớp electron trong nguyên tử", "số hiệu nguyên tử", "số neutron"]),
            correctIndex: 1,
          },
          {
            order: 5,
            content: "Số thứ tự của nhóm A bằng",
            choices: JSON.stringify(["số lớp electron", "số electron lớp ngoài cùng", "số proton", "số neutron"]),
            correctIndex: 1,
          },
          {
            order: 6,
            content: "Nhóm VIIIA còn được gọi là nhóm",
            choices: JSON.stringify(["kim loại kiềm", "kim loại kiềm thổ", "halogen", "khí hiếm"]),
            correctIndex: 3,
          },
          {
            order: 7,
            content: "Nhóm VIIA còn được gọi là nhóm",
            choices: JSON.stringify(["kim loại kiềm", "halogen (phi kim điển hình)", "kim loại kiềm thổ", "khí hiếm"]),
            correctIndex: 1,
          },
          {
            order: 8,
            content: "Phần lớn các nguyên tố trong bảng tuần hoàn thuộc loại nào?",
            choices: JSON.stringify(["Kim loại", "Phi kim", "Khí hiếm", "Á kim"]),
            correctIndex: 0,
          },
          {
            order: 9,
            content: "Nguyên tố Ca có số hiệu nguyên tử là 20. Nguyên tố này ở ô số mấy trong bảng tuần hoàn?",
            choices: JSON.stringify(["10", "18", "20", "40"]),
            correctIndex: 2,
          },
          {
            order: 10,
            content: "Nguyên tử sodium (Na) có 3 lớp electron và 1 electron ở lớp ngoài cùng. Vậy sodium thuộc chu kì và nhóm nào?",
            choices: JSON.stringify(["Chu kì 1, nhóm IIIA", "Chu kì 3, nhóm IA", "Chu kì 1, nhóm IA", "Chu kì 3, nhóm IIIA"]),
            correctIndex: 1,
          },
          {
            order: 11,
            content: "Vị trí các nguyên tố khí hiếm trong bảng tuần hoàn nằm ở",
            choices: JSON.stringify(["cột đầu tiên (nhóm IA)", "cột cuối cùng (nhóm VIIIA)", "giữa bảng tuần hoàn", "chỉ ở chu kì 1"]),
            correctIndex: 1,
          },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 7,
      chapterId: ch7_2.id,
      topic: "Sơ lược bảng tuần hoàn",
      cards: {
        create: [
          { order: 1, term: "Mendeleev", meaning: "Nhà bác học người Nga xây dựng thành công bảng tuần hoàn đầu tiên (1869)" },
          { order: 2, term: "Nguyên tắc sắp xếp", meaning: "Theo chiều tăng dần điện tích hạt nhân nguyên tử" },
          { order: 3, term: "Ô nguyên tố", meaning: "Cho biết số hiệu nguyên tử, kí hiệu, tên nguyên tố, khối lượng nguyên tử" },
          { order: 4, term: "Chu kì", meaning: "Hàng ngang, số thứ tự chu kì = số lớp electron; có 7 chu kì" },
          { order: 5, term: "Nhóm", meaning: "Cột dọc, các nguyên tố có tính chất hóa học tương tự nhau" },
          { order: 6, term: "Nhóm A", meaning: "Số thứ tự nhóm A = số electron ở lớp ngoài cùng" },
          { order: 7, term: "Nhóm IA", meaning: "Nhóm kim loại kiềm (trừ hydrogen)" },
          { order: 8, term: "Nhóm VIIA", meaning: "Nhóm halogen - phi kim điển hình" },
          { order: 9, term: "Nhóm VIIIA", meaning: "Nhóm khí hiếm, nằm ở cột cuối cùng bảng tuần hoàn" },
          { order: 10, term: "Vị trí kim loại", meaning: "Kim loại nằm bên trái và góc dưới bên phải bảng tuần hoàn (~80% số nguyên tố)" },
        ],
      },
    },
  });

  console.log("Đã tạo xong Lớp 7 - Chương 2");

  // ================= LỚP 7 - CHƯƠNG 3: PHÂN TỬ, LIÊN KẾT HÓA HỌC =================
  await prisma.document.createMany({
    data: [
      {
        grade: 7,
        chapterId: ch7_3.id,
        order: 1,
        title: "Bài 11. Phân tử, đơn chất, hợp chất",
        content:
          "## Phân tử\n" +
          "- Phân tử là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau, thể hiện đầy đủ tính chất hóa học của chất.\n" +
          "- Khối lượng phân tử bằng tổng khối lượng các nguyên tử trong phân tử, tính bằng amu.\n" +
          "- Ví dụ: khối lượng phân tử nước H2O = 1×2 + 16 = 18 amu.\n\n" +
          "## Đơn chất\n" +
          "- Đơn chất là chất được tạo nên từ một nguyên tố hóa học.\n" +
          "- Phân loại: đơn chất kim loại (Cu, Fe, Al), đơn chất phi kim (C, S, P, Cl2, H2, O2), đơn chất khí hiếm (Ne, Ar).\n\n" +
          "## Hợp chất\n" +
          "- Hợp chất là chất được tạo nên từ hai hay nhiều nguyên tố hóa học.\n" +
          "- Phân loại: hợp chất vô cơ (nước, carbon dioxide, sodium chloride) và hợp chất hữu cơ (glucose, ethanol, acetic acid).\n\n" +
          "## Ví dụ tính khối lượng phân tử\n" +
          "- Ethanol (C2H5OH): 12×2 + 1×6 + 16 = 46 amu.\n" +
          "- Ammonia (NH3): 14 + 1×3 = 17 amu.\n" +
          "- Glucose (C6H12O6): 12×6 + 1×12 + 16×6 = 180 amu.",
      },
      {
        grade: 7,
        chapterId: ch7_3.id,
        order: 2,
        title: "Bài 12. Giới thiệu về liên kết hóa học",
        content:
          "## Cấu trúc electron bền vững của khí hiếm\n" +
          "- Nguyên tử khí hiếm có 8 electron ở lớp ngoài cùng (riêng helium có 2 electron) - đây là cấu trúc electron bền vững.\n" +
          "- Nguyên tử của các nguyên tố khác có xu hướng tham gia liên kết hóa học để đạt được lớp electron ngoài cùng bền vững như khí hiếm, bằng cách nhường, nhận hoặc góp chung electron.\n\n" +
          "## Liên kết ion\n" +
          "- Nguyên tử kim loại có xu hướng nhường electron tạo thành ion dương (cation); nguyên tử phi kim có xu hướng nhận electron tạo thành ion âm (anion).\n" +
          "- Liên kết ion là liên kết được hình thành bởi lực hút giữa các ion mang điện tích trái dấu, thường giữa một kim loại mạnh và một phi kim mạnh.\n" +
          "- Ví dụ: nguyên tử Na nhường 1 electron tạo Na+; nguyên tử Cl nhận 1 electron tạo Cl-; Na+ và Cl- hút nhau tạo hợp chất ion NaCl.\n" +
          "- Chất được tạo thành từ ion dương và ion âm gọi là hợp chất ion (NaCl, MgO, Al2O3,...). Tính chất: thường là chất rắn, khó nóng chảy, khó bay hơi, tan tốt trong nước tạo dung dịch dẫn điện.\n\n" +
          "## Liên kết cộng hóa trị\n" +
          "- Liên kết cộng hóa trị là liên kết hình thành giữa hai nguyên tử bằng một hay nhiều cặp electron dùng chung, thường giữa hai nguyên tử phi kim.\n" +
          "- Ví dụ: trong phân tử H2, mỗi nguyên tử H góp chung 1 electron tạo 1 cặp electron dùng chung; trong phân tử CO2, nguyên tử C góp 4 electron, mỗi nguyên tử O góp 2 electron, tạo hai cặp electron dùng chung mỗi liên kết.\n" +
          "- Chất chỉ chứa liên kết cộng hóa trị gọi là hợp chất cộng hóa trị (O2, CO2, C6H12O6,...). Tính chất: có thể là rắn, lỏng hay khí; nhiệt độ nóng chảy và nhiệt độ sôi thường thấp hơn hợp chất ion.\n\n" +
          "## So sánh nhanh\n" +
          "- Ammonia (NH3) là hợp chất cộng hóa trị nên có nhiệt độ sôi thấp, là chất khí ở nhiệt độ phòng.\n" +
          "- Sodium chloride (NaCl, hợp chất ion) có nhiệt độ nóng chảy cao hơn nhiều so với iodine (I2, hợp chất cộng hóa trị).",
      },
    ],
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Phân tử, liên kết hóa học (Chương 3 - Lớp 7)",
      grade: 7,
      chapterId: ch7_3.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Phân tử là gì?",
            choices: JSON.stringify([
              "Hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau, thể hiện đầy đủ tính chất hóa học của chất",
              "Hạt nhỏ nhất mang điện tích của một nguyên tố",
              "Hạt nhân của nguyên tử",
              "Nguyên tử duy nhất tạo nên chất",
            ]),
            correctIndex: 0,
          },
          {
            order: 2,
            content: "Đơn chất là chất được tạo nên từ",
            choices: JSON.stringify(["hai nguyên tố hóa học", "một nguyên tố hóa học", "ba nguyên tố hóa học trở lên", "một hợp chất"]),
            correctIndex: 1,
          },
          {
            order: 3,
            content: "Hợp chất là chất được tạo nên từ",
            choices: JSON.stringify(["chỉ một nguyên tố hóa học", "hai nguyên tố hóa học trở lên", "chỉ các nguyên tố kim loại", "chỉ các nguyên tố phi kim"]),
            correctIndex: 1,
          },
          {
            order: 4,
            content: "Khối lượng phân tử của nước (H2O) là",
            choices: JSON.stringify(["16 amu", "17 amu", "18 amu", "20 amu"]),
            correctIndex: 2,
            explanation: "Khối lượng phân tử H2O = 1×2 + 16 = 18 amu.",
          },
          {
            order: 5,
            content: "Khí oxygen (O2) là",
            choices: JSON.stringify(["đơn chất kim loại", "đơn chất phi kim", "hợp chất vô cơ", "hợp chất hữu cơ"]),
            correctIndex: 1,
          },
          {
            order: 6,
            content: "Nguyên tử khí hiếm bền vững vì có bao nhiêu electron ở lớp ngoài cùng (trừ helium)?",
            choices: JSON.stringify(["2", "6", "8", "10"]),
            correctIndex: 2,
          },
          {
            order: 7,
            content: "Trong quá trình hình thành liên kết ion, nguyên tử kim loại có xu hướng gì?",
            choices: JSON.stringify(["Nhận electron để tạo ion âm", "Nhường electron để tạo ion dương", "Góp chung electron", "Không thay đổi electron"]),
            correctIndex: 1,
          },
          {
            order: 8,
            content: "Liên kết ion thường hình thành giữa",
            choices: JSON.stringify(["hai phi kim mạnh", "một kim loại mạnh và một phi kim mạnh", "hai kim loại mạnh", "hai khí hiếm"]),
            correctIndex: 1,
          },
          {
            order: 9,
            content: "Liên kết cộng hóa trị là liên kết được hình thành bởi",
            choices: JSON.stringify(["lực hút giữa các ion trái dấu", "một hay nhiều cặp electron dùng chung giữa hai nguyên tử", "sự nhường hẳn electron từ nguyên tử này sang nguyên tử khác", "lực hút giữa hạt nhân và electron tự do"]),
            correctIndex: 1,
          },
          {
            order: 10,
            content: "Chất nào sau đây là hợp chất ion?",
            choices: JSON.stringify(["CO2", "NaCl", "O2", "H2"]),
            correctIndex: 1,
          },
          {
            order: 11,
            content: "Vì sao ammonia (NH3) là chất khí ở nhiệt độ phòng?",
            choices: JSON.stringify([
              "Vì NH3 là hợp chất ion nên có nhiệt độ sôi cao",
              "Vì NH3 là hợp chất cộng hóa trị nên có nhiệt độ sôi thấp",
              "Vì NH3 không có liên kết hóa học",
              "Vì NH3 chỉ tồn tại ở thể khí trong tự nhiên",
            ]),
            correctIndex: 1,
          },
          {
            order: 12,
            content: "Nguyên tử Na (11 proton) và nguyên tử Cl (17 proton) liên kết với nhau tạo NaCl. Đây là loại liên kết gì?",
            choices: JSON.stringify(["Liên kết cộng hóa trị", "Liên kết ion", "Liên kết kim loại", "Không có liên kết"]),
            correctIndex: 1,
            explanation: "Na (kim loại) nhường 1 electron tạo Na+, Cl (phi kim) nhận 1 electron tạo Cl-, hai ion trái dấu hút nhau tạo liên kết ion.",
          },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 7,
      chapterId: ch7_3.id,
      topic: "Phân tử, liên kết hóa học",
      cards: {
        create: [
          { order: 1, term: "Phân tử", meaning: "Hạt đại diện cho chất, gồm các nguyên tử liên kết với nhau" },
          { order: 2, term: "Đơn chất", meaning: "Chất tạo nên từ một nguyên tố hóa học (Cu, O2, S...)" },
          { order: 3, term: "Hợp chất", meaning: "Chất tạo nên từ hai hay nhiều nguyên tố hóa học (H2O, NaCl...)" },
          { order: 4, term: "Khối lượng phân tử", meaning: "Tổng khối lượng các nguyên tử trong phân tử, đơn vị amu" },
          { order: 5, term: "Cấu trúc electron bền vững", meaning: "8 electron lớp ngoài cùng (2 với He) như khí hiếm" },
          { order: 6, term: "Ion dương (cation)", meaning: "Nguyên tử kim loại nhường electron tạo thành, ví dụ Na+" },
          { order: 7, term: "Ion âm (anion)", meaning: "Nguyên tử phi kim nhận electron tạo thành, ví dụ Cl-" },
          { order: 8, term: "Liên kết ion", meaning: "Lực hút giữa ion dương và ion âm, giữa kim loại mạnh và phi kim mạnh" },
          { order: 9, term: "Liên kết cộng hóa trị", meaning: "Cặp electron dùng chung giữa hai nguyên tử phi kim" },
          { order: 10, term: "Hợp chất ion vs cộng hóa trị", meaning: "Hợp chất ion: rắn, khó nóng chảy, tan tốt, dẫn điện. Cộng hóa trị: rắn/lỏng/khí, nhiệt độ sôi thấp hơn" },
        ],
      },
    },
  });

  console.log("Đã tạo xong Lớp 7 - Chương 3");

  // ================= LỚP 7 - CHƯƠNG 4: HÓA TRỊ VÀ CÔNG THỨC HÓA HỌC =================
  await prisma.document.create({
    data: {
      grade: 7,
      chapterId: ch7_4.id,
      order: 1,
      title: "Bài 13. Hóa trị và công thức hóa học",
      content:
        "## Hóa trị\n" +
        "- Hóa trị là con số biểu thị khả năng liên kết của nguyên tử nguyên tố này với nguyên tử nguyên tố khác.\n" +
        "- Quy ước: hydrogen (H) luôn có hóa trị I; nguyên tố khác liên kết được với bao nhiêu nguyên tử H thì có hóa trị bấy nhiêu.\n" +
        "- Oxygen (O) được quy ước có hóa trị II.\n" +
        "- Ví dụ: trong HCl, Cl liên kết với 1 H nên Cl có hóa trị I; trong CO2, C liên kết với 2 O nên C có hóa trị IV.\n" +
        "- Hóa trị của nhóm nguyên tử (như SO4, NO3, OH) được xác định tương tự hóa trị nguyên tố.\n\n" +
        "## Quy tắc hóa trị\n" +
        "- Trong công thức hóa học của hợp chất hai nguyên tố AxBy: tích chỉ số và hóa trị của nguyên tố này bằng tích chỉ số và hóa trị của nguyên tố kia.\n" +
        "- Công thức: x × (hóa trị A) = y × (hóa trị B).\n" +
        "- Ví dụ: hợp chất P và O có dạng PxOy với hóa trị P = V, hóa trị O = II: x×V = y×II → x/y = II/V = 2/5 → công thức P2O5.\n\n" +
        "## Công thức hóa học\n" +
        "- Công thức hóa học của đơn chất: kí hiệu nguyên tố kèm chỉ số. Đơn chất kim loại và một số phi kim rắn chỉ ghi kí hiệu nguyên tố (Fe, P). Phi kim thể khí thường có dạng Ax (O2, N2, Cl2).\n" +
        "- Công thức hóa học của hợp chất: kí hiệu các nguyên tố kèm chỉ số, dạng AxBy. Ví dụ: CO2 (1 carbon, 2 oxygen).\n" +
        "- Nếu chỉ số bằng 1 thì không ghi.\n\n" +
        "## Tính phần trăm nguyên tố trong hợp chất\n" +
        "- %A = [khối lượng nguyên tử A × x / khối lượng phân tử AxBy] × 100%.\n" +
        "- Tổng phần trăm các nguyên tố trong một phân tử luôn bằng 100%.\n" +
        "- Ví dụ: hợp chất CaCO3 (M=100 amu) có %Ca = 40×1/100×100% = 40%.\n\n" +
        "## Xác định công thức hóa học\n" +
        "- Cách 1: dựa vào phần trăm nguyên tố và khối lượng phân tử đã biết, tính số nguyên tử mỗi nguyên tố.\n" +
        "- Cách 2: dựa vào quy tắc hóa trị, lập tỉ lệ chỉ số nguyên tử rồi chọn số nguyên đơn giản nhất.\n" +
        "- Lưu ý: quy tắc hóa trị đúng với đa số hợp chất vô cơ, không áp dụng cho hầu hết hợp chất hữu cơ.",
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Kiểm tra: Hóa trị và công thức hóa học (Chương 4 - Lớp 7)",
      grade: 7,
      chapterId: ch7_4.id,
      durationSec: 900,
      questions: {
        create: [
          {
            order: 1,
            content: "Hóa trị là gì?",
            choices: JSON.stringify([
              "Khối lượng của một nguyên tử",
              "Con số biểu thị khả năng liên kết của nguyên tử nguyên tố này với nguyên tử nguyên tố khác",
              "Số electron lớp ngoài cùng",
              "Số proton trong hạt nhân",
            ]),
            correctIndex: 1,
          },
          {
            order: 2,
            content: "Theo quy ước, nguyên tố hydrogen luôn có hóa trị",
            choices: JSON.stringify(["I", "II", "III", "IV"]),
            correctIndex: 0,
          },
          {
            order: 3,
            content: "Theo quy ước, nguyên tố oxygen luôn có hóa trị",
            choices: JSON.stringify(["I", "II", "III", "IV"]),
            correctIndex: 1,
          },
          {
            order: 4,
            content: "Trong hợp chất CO2, nguyên tố carbon có hóa trị bao nhiêu?",
            choices: JSON.stringify(["I", "II", "III", "IV"]),
            correctIndex: 3,
            explanation: "Carbon liên kết với 2 nguyên tử oxygen (hóa trị II) nên theo quy tắc hóa trị, carbon có hóa trị IV.",
          },
          {
            order: 5,
            content: "Trong hợp chất HCl, nguyên tố chlorine có hóa trị bao nhiêu?",
            choices: JSON.stringify(["I", "II", "III", "IV"]),
            correctIndex: 0,
          },
          {
            order: 6,
            content: "Công thức hóa học của hợp chất tạo bởi phosphorus (hóa trị V) và oxygen (hóa trị II) là",
            choices: JSON.stringify(["PO2", "P2O5", "P2O3", "P5O2"]),
            correctIndex: 1,
            explanation: "Theo quy tắc hóa trị: x×V = y×II → x/y = 2/5, chọn x=2, y=5 → P2O5.",
          },
          {
            order: 7,
            content: "Công thức hóa học của khí oxygen (phân tử gồm 2 nguyên tử oxygen liên kết với nhau) là",
            choices: JSON.stringify(["O", "O2", "O3", "2O"]),
            correctIndex: 1,
          },
          {
            order: 8,
            content: "Khối lượng phân tử của CaCO3 là (Ca=40, C=12, O=16)",
            choices: JSON.stringify(["60 amu", "100 amu", "116 amu", "164 amu"]),
            correctIndex: 1,
            explanation: "M(CaCO3) = 40 + 12 + 16×3 = 100 amu.",
          },
          {
            order: 9,
            content: "Phần trăm khối lượng của calcium trong CaCO3 (M=100 amu) là",
            choices: JSON.stringify(["12%", "40%", "48%", "60%"]),
            correctIndex: 1,
            explanation: "%Ca = (40×1/100)×100% = 40%.",
          },
          {
            order: 10,
            content: "Công thức hóa học cho biết điều gì?",
            choices: JSON.stringify([
              "Chỉ cho biết tên các nguyên tố có trong hợp chất",
              "Thành phần nguyên tố và số lượng nguyên tử của mỗi nguyên tố trong phân tử",
              "Chỉ cho biết khối lượng của hợp chất",
              "Chỉ cho biết trạng thái vật lí của hợp chất",
            ]),
            correctIndex: 1,
          },
          {
            order: 11,
            content: "Một hợp chất có phân tử gồm 1 nguyên tử lưu huỳnh (sulfur) và 3 nguyên tử oxygen. Công thức hóa học của hợp chất này là",
            choices: JSON.stringify(["SO2", "SO3", "S2O3", "S3O"]),
            correctIndex: 1,
          },
          {
            order: 12,
            content: "Quy tắc hóa trị áp dụng đúng cho phần lớn nhóm hợp chất nào?",
            choices: JSON.stringify(["Hợp chất hữu cơ", "Hợp chất vô cơ", "Cả hợp chất vô cơ và hữu cơ như nhau", "Không áp dụng cho hợp chất nào"]),
            correctIndex: 1,
          },
        ],
      },
    },
  });

  await prisma.flashcardSet.create({
    data: {
      grade: 7,
      chapterId: ch7_4.id,
      topic: "Hóa trị và công thức hóa học",
      cards: {
        create: [
          { order: 1, term: "Hóa trị", meaning: "Con số biểu thị khả năng liên kết của nguyên tử nguyên tố này với nguyên tố khác" },
          { order: 2, term: "Hóa trị của H", meaning: "Luôn quy ước bằng I" },
          { order: 3, term: "Hóa trị của O", meaning: "Luôn quy ước bằng II" },
          { order: 4, term: "Quy tắc hóa trị", meaning: "Trong AxBy: x × hóa trị(A) = y × hóa trị(B)" },
          { order: 5, term: "Công thức hóa học đơn chất", meaning: "Kí hiệu nguyên tố kèm chỉ số, ví dụ O2, Fe, P" },
          { order: 6, term: "Công thức hóa học hợp chất", meaning: "Kí hiệu các nguyên tố kèm chỉ số, dạng AxBy, ví dụ CO2" },
          { order: 7, term: "Khối lượng phân tử", meaning: "Tổng khối lượng nguyên tử trong phân tử (đơn vị amu)" },
          { order: 8, term: "% nguyên tố trong hợp chất", meaning: "= (KL nguyên tử × số nguyên tử / KL phân tử) × 100%" },
          { order: 9, term: "P2O5", meaning: "Công thức tạo bởi P (hóa trị V) và O (hóa trị II)" },
          { order: 10, term: "CaCO3", meaning: "Công thức hóa học của calcium carbonate (đá vôi), M = 100 amu" },
        ],
      },
    },
  });

  console.log("Đã tạo xong Lớp 7 - Chương 4");
  console.log("HOÀN TẤT LỚP 7 (4 chương, 6 bài)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
