import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Nguồn: Tài liệu/.../DaiTra/Hóa 8 - Bài 14. Biến Đổi Vật Lí, Biến Đổi Hoá Học - Dương Quốc Khanh - Vũng Tàu.docx
// Chỉ lấy các câu có đáp án A/B/C/D tường minh trong file gốc (một số câu Nhận biết/Thông hiểu bị mất
// nhãn A/B/C/D do lỗi định dạng danh sách tự động khi trích xuất - đã loại bỏ để đảm bảo độ tin cậy).
// Một câu Thông hiểu (dạng chọn tập hợp a,b,c,d) có phương án không khớp với đáp án đúng theo hoá học
// (lưu huỳnh cháy trong không khí bị liệt vào "biến đổi vật lí") nên đã loại bỏ.

const quizId = "cmrel0pwu000xvhd8phumi47u"; // Kiểm tra: Phản ứng hóa học (Chương I - Lớp 8)
const startOrder = 10;

const questions = [
  { content: "Khi hoà tan muối ăn vào nước đã xảy ra hiện tượng", choices: ["Vật lí.", "Hoá học.", "Cả hiện tượng vật lí và hoá học.", "Không có hiện tượng gì."], correctIndex: 0 },
  { content: "Khi đốt nến (làm bằng paraffin), nến chảy lỏng thấm vào bấc. Sau đó nến lỏng chuyển thành hơi. Hơi nến cháy trong không khí tạo thành khí carbon dioxide và hơi nước. Giai đoạn diễn ra hiện tượng hóa học là", choices: ["Nến chảy lỏng thấm vào bấc.", "Nến lỏng chuyển thành hơi.", "Hơi nến cháy trong không khí tạo thành khí carbon dioxide và hơi nước.", "Không có giai đoạn nào xảy ra hiện tượng hóa học."], correctIndex: 2 },
  { content: "Dấu hiệu chính để phân biệt hiện tượng vật lý và hiện tượng hóa học là", choices: ["Sự thay đổi về màu sắc của chất.", "Sự xuất hiện chất mới.", "Sự thay đổi về trạng thái của chất.", "Sự thay đổi về hình dạng của chất."], correctIndex: 1 },
  { content: "Hiện tượng hóa học là", choices: ["Thanh sắt bị dát mỏng.", "Cồn để trong lọ không kín bị bay hơi.", "Thủy tinh nóng chảy được thổi thành bình cầu.", "Đốt cháy mẩu giấy."], correctIndex: 3 },
  { content: "Các hiện tượng sau, hiện tượng nào không phải là hiện tượng hoá học?", choices: ["Khi nung nóng đá vôi (calcium carbonate) thì thấy khối lượng giảm đi.", "Rượu để lâu trong không khí bị chua.", "Thuỷ tinh nóng chảy được thổi thành bình cầu.", "Một lá đồng bị nung nóng, trên mặt đồng phủ một lớp màu đen."], correctIndex: 2 },
  { content: "Hiện tượng hóa học là", choices: ["Cơm bị ôi thiu.", "Hòa tan đường vào nước.", "Cầu vồng xuất hiện sau mưa.", "Đun sôi nước."], correctIndex: 0 },
  { content: "Trong các hiện tượng sau, hiện tượng vật lý là", choices: ["Gỗ cháy thành than.", "Cơm bị ôi thiu.", "Sữa chua lên men.", "Nước bốc hơi."], correctIndex: 3 },
  { content: "Trong các hiện tượng sau, hãy cho biết đâu là hiện tượng hóa học", choices: ["Đốt gas để thu nhiệt.", "Khi nấu cơm, nước bay hơi.", "Cô cạn dung dịch đường cho đậm đặc.", "Hòa tan đường vào nước."], correctIndex: 0 },
  { content: "Trong các hiện tượng sau, hiện tượng vật lý là", choices: ["Cơm bị ôi thiu.", "Lưu huỳnh cháy trong không khí.", "Mực hòa tan vào nước.", "Đốt cháy mẩu giấy."], correctIndex: 2 },
  { content: "Hãy cho biết hiện tượng sắt để ngoài không khí lâu ngày bị gỉ sét là hiện tượng gì?", choices: ["Hiện tượng hóa học.", "Hiện tượng vật lý.", "Cả hiện tượng vật lý và hóa học.", "Không có hiện tượng gì."], correctIndex: 0 },
  { content: "Quá trình nào sau đây là biến đổi hoá học?", choices: ["Đốt cháy cồn trong đĩa.", "Hơ nóng chiếc thìa inox.", "Hoà tan muối ăn vào nước.", "Nước hoa trong lọ mở nắp bị bay hơi."], correctIndex: 0 },
  { content: "Quá trình nào sau đây chỉ xảy ra biến đổi vật lí?", choices: ["Đốt cháy củi trong bếp.", "Thắp sáng bóng đèn dây tóc.", "Đốt sợi dây đồng trên lửa đèn cồn.", "Để sợi dây thép ngoài không khí ẩm bị gỉ."], correctIndex: 1 },
  { content: "Chọn câu sai:", choices: ["Xay tiêu là hiện tượng vật lý.", "Đốt cháy đường mía là hiện tượng hóa học.", "Gấp quần áo là hiện tượng hóa học.", "Hiện tượng ma trơi là hiện tượng hóa học."], correctIndex: 2, explanation: "Gấp quần áo không tạo chất mới nên là hiện tượng vật lí, không phải hoá học." },
  { content: "Hiện tượng thiên nhiên sau đây xảy ra phản ứng hóa học?", choices: ["Sáng sớm, khi mặt trời mọc sương mù tan dần.", "Hơi nước trong các đám mây ngưng tụ và rơi xuống tạo ra mưa.", "Nạn cháy rừng tạo khói đen dày đặc, gây ô nhiễm môi trường.", "Khi mưa giông thường có sấm sét."], correctIndex: 2 },
  { content: "Quá trình nào sau đây xảy ra sự biến đổi hoá học?", choices: ["Khi mở nút chai nước giải khát loại có ga thấy bọt sủi lên.", "Nhỏ vài giọt mực vào cốc nước và khuấy đều thấy mực loang ra cả cốc nước.", "Trứng gà để lâu ngày bị hỏng, có mùi khó chịu.", "Dây tóc bóng trong bóng đèn điện nóng và sáng lên khi có dòng điện chạy qua."], correctIndex: 2 },
  { content: "Cho bột kẽm vào dung dịch hydrochloric acid thấy có nhiều bọt khí thoát ra. Dấu hiệu chứng tỏ phản ứng đã xảy ra là", choices: ["Có bọt khí thoát ra.", "Tạo thành dung dịch zinc chloride.", "Có sự tạo thành chất không tan.", "Lượng hydrochloric acid giảm dần."], correctIndex: 0 },
  { content: "Trong các hiện tượng sau: (1) Pha loãng nước muối. (2) Đốt cháy mẩu giấy. (3) Nước bốc hơi. (4) Lưu huỳnh cháy trong không khí. Hãy cho biết hiện tượng nào là hiện tượng vật lý?", choices: ["(1), (2).", "(1), (3).", "(2), (3).", "(3), (4)."], correctIndex: 1 },
  { content: "Các hiện tượng sau đây, hiện tượng nào có sự biến đổi hoá học: 1, Sắt được cắt nhỏ từng đoạn và tán thành đinh. 2, Vành xe đạp bằng sắt bị phủ một lớp gỉ là chất màu nâu đỏ. 3, Rượu để lâu trong không khí thường bị chua. 4, Đèn tín hiệu chuyển từ màu xanh sang màu đỏ. 5, Dây tóc trong bóng đèn điện nóng và sáng lên khi dòng điện đi qua.", choices: ["1, 2, 3, 4.", "1, 2, 4, 5.", "2, 3.", "4, 5."], correctIndex: 2 },
  { content: "Trong các hiện tượng sau, hiện tượng nào là hiện tượng hoá học? (1) Về mùa hè thức ăn thường bị thiu. (2) Đun đường, đường ngả màu nâu rồi đen đi. (3) Nước từ ao hồ bốc hơi lên tạo thành mưa. (4) Cháy rừng gây ô nhiễm lớn cho môi trường. (5) Nhiệt độ Trái đất nóng lên làm băng ở hai cực Trái đất tan dần.", choices: ["1, 2, 4.", "1, 2, 3.", "2, 3, 5.", "1, 3, 4, 5."], correctIndex: 0 },
  { content: "Trong số quá trình dưới đây, đâu là hiện tượng vật lý? (1) Hoà tan muối ăn vào nước ta được dung dịch muối ăn. (2) Đá khi lấy ra khỏi tủ lạnh chuyển dần sang thể lỏng. (3) Cồn để trong lọ không kín bị bay hơi. (4) Nước bị đóng băng tại hai cực của Trái đất. (5) Cho vôi sống có thành phần chính là CaO hoà tan vào nước thu được dung dịch nước vôi trong.", choices: ["1, 2, 3, 4.", "1, 2, 4.", "2, 3, 4.", "1, 4, 5."], correctIndex: 0, explanation: "(5) là biến đổi hoá học vì CaO + H2O -> Ca(OH)2 tạo thành chất mới." },
  { content: "Nến được làm bằng paraffin, khi đốt nến, xảy ra các quá trình sau: (1) Paraffin nóng chảy. (2) Paraffin lỏng chuyển thành hơi. (3) Hơi paraffin cháy biến đổi thành khí CO2 và hơi nước. Quá trình nào có sự biến đổi hoá học?", choices: ["1.", "2.", "3.", "Cả 1, 2, 3."], correctIndex: 2 },
  { content: "Cho hai quá trình sau: (1) Đun nước đá nóng chảy thành nước lỏng sau đó bay hơi thành hơi nước. (2) Nung thuốc tím rắn chuyển thành bột màu đen. Kết luận đúng là:", choices: ["(1) và (2) đều là biến đổi vật lí.", "(1) và (2) đều là biến đổi hoá học.", "(1) là biến đổi vật lí, (2) là biến đổi hoá học.", "(1) là biến đổi hoá học, (2) là biến đổi vật lí."], correctIndex: 2 },
  { content: "Cho các hiện tượng sau đây: a. Thổi hơi thở vào nước vôi trong thì nước vôi trong bị vẩn đục. b. Đốt cháy đường mía thành chất màu đen và mùi khét. c. Thanh sắt hơ nóng, dát mỏng thành dao, rựa. d. Lên men glucose thu được rượu ethylic và khí carbon dioxide. đ. Muối ăn hòa tan vào nước được dung dịch muối ăn. e. Mực tan vào nước. Số hiện tượng vật lý - hoá học tương ứng là", choices: ["3 – 3.", "4 – 2.", "2 – 4.", "1 – 5."], correctIndex: 0, explanation: "Hiện tượng vật lý: c, đ, e (3 hiện tượng). Hiện tượng hoá học: a, b, d (3 hiện tượng)." },
  { content: "Hiện nay khí gas thường được dùng làm nhiên liệu để đun nấu. Các quá trình sử dụng bình khí gas diễn ra như sau: (1) Các khí gas (chủ yếu là butane và propane) được nén ở áp suất cao, hoá lỏng và tích trữ ở bình gas. (2) Khi mở khoá, gas lỏng trong bình chuyển hoá lại thành hơi và bay ra. (3) Hơi gas bắt lửa và cháy trong không khí, tạo thành khí carbon dioxide và nước. (4) Nhiệt lượng toả ra làm nước trong xoong/nồi nóng dần. Ở giai đoạn nào có xảy ra sự biến đổi hoá học?", choices: ["(1).", "(4).", "(2).", "(3)."], correctIndex: 3 },
  { content: "Quá trình làm muối gồm các giai đoạn sau: (1) Cho nước biển chảy vào ao cạn làm \"đùng\". (2) Tát nước từ đùng lên sân trên gọi là \"ruộng chịu\", phơi nắng làm bay hơi nước để tăng độ mặn. (3) Tháo nước mặn xuống sân dưới gọi là \"ruộng ăn\" để muối bắt đầu kết tinh. (4) Khi nước cạn, muối đóng thành hạt thì cào muối thành gò để làm khô muối. Ở giai đoạn nào, muối ăn từ dung dịch chuyển sang trạng thái rắn?", choices: ["(3).", "(1).", "(2).", "(4)."], correctIndex: 3 },
  { content: "Quá trình làm muối gồm các giai đoạn sau: (1) Cho nước biển chảy vào ao cạn làm \"đùng\". (2) Tát nước từ đùng lên sân trên gọi là \"ruộng chịu\", phơi nắng làm bay hơi nước để tăng độ mặn. (3) Tháo nước mặn xuống sân dưới gọi là \"ruộng ăn\" để muối bắt đầu kết tinh. (4) Khi nước cạn, muối đóng thành hạt thì cào muối thành gò để làm khô muối. Có bao nhiêu giai đoạn được tiến hành nhằm mục đích làm bay hơi nước?", choices: ["2.", "3.", "4.", "1."], correctIndex: 0, explanation: "Có 2 giai đoạn nhằm làm bay hơi nước, đó là giai đoạn (2) và (4)." },
  { content: "Sự hình thành mưa tuyết gồm các giai đoạn sau: (1) Nhiệt lượng từ Mặt Trời làm nước từ các đại dương bốc hơi vào khí quyển. (2) Hơi nước ở nơi có nhiệt độ thấp ngưng tụ thành mây gồm các hạt nước nhỏ li ti. (3) Những hạt nước nhỏ li ti kết hợp với nhau, gia tăng kích thước và rơi xuống thành mưa. (4) Nếu thời tiết lạnh giá, nước mưa hoá rắn thành tuyết. Sự biến đổi vật lí của hơi nước biến thành nước lỏng xảy ra ở giai đoạn nào?", choices: ["(2).", "(1).", "(3).", "(4)."], correctIndex: 0 },
  { content: "Sự hình thành mưa tuyết gồm các giai đoạn sau: (1) Nhiệt lượng từ Mặt Trời làm nước từ các đại dương bốc hơi vào khí quyển. (2) Hơi nước ở nơi có nhiệt độ thấp ngưng tụ thành mây gồm các hạt nước nhỏ li ti. (3) Những hạt nước nhỏ li ti kết hợp với nhau, gia tăng kích thước và rơi xuống thành mưa. (4) Nếu thời tiết lạnh giá, nước mưa hoá rắn thành tuyết. Ở giai đoạn nào, nước chỉ tồn tại ở thể lỏng?", choices: ["(2).", "(1).", "(3).", "(4)."], correctIndex: 2 },
  { content: "Cho các phát biểu dưới đây: (1) Quá trình cho vôi sống (CaO) vào nước tạo thành nước vôi trong (Ca(OH)2) là sự biến đổi vật lí. (2) Khi đốt, nến (paraffin) nóng chảy thành paraffin lỏng, rồi chuyển thành hơi. Hơi paraffin cháy thành khí carbon dioxide và hơi nước. Các quá trình diễn ra ở trên đều có sự biến đổi hoá học. (3) Giũa thanh sắt thu được mạt sắt là sự biến đổi vật lí. (4) Trứng gà (vịt) để lâu ngày bị ung là sự biến đổi hoá học. (5) Quá trình chuyển hoá lipid (chất béo) trong cơ thể người thành glycerol và acid béo là sự biến đổi vật lí. Các phát biểu đúng là:", choices: ["(3) và (4).", "(4) và (5).", "(2) và (4).", "(1), (2) và (3)."], correctIndex: 0, explanation: "(1) sai vì CaO + H2O -> Ca(OH)2 là biến đổi hoá học; (2) sai vì nóng chảy và hoá hơi của paraffin là biến đổi vật lí (chỉ giai đoạn cháy mới là hoá học); (5) sai vì chuyển hoá lipid thành glycerol và acid béo là biến đổi hoá học." },
  { content: "Sơ đồ quy trình sản xuất điện năng của nhà máy nhiệt điện gồm bốn giai đoạn: (1) Đốt nhiên liệu (than, khí đốt,...). (2) Nước lỏng bay hơi và được nén ở áp suất cao. (3) Hơi nước làm quay tuabin của máy phát điện. (4) Cơ năng được máy phát điện chuyển hoá thành điện năng. Trong các giai đoạn trên, những giai đoạn nào có kèm theo sự biến đổi vật lí?", choices: ["(1) và (2).", "(2), (3) và (4).", "(3) và (4).", "(1), (3) và (4)."], correctIndex: 1 },
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
