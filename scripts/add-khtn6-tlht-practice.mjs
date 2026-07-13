import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Nguồn: Tài liệu/Lớp 6-9 (THCS)/Mới upload (Lớp 6,7,8,9)/KHTN 6 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx
// Mining 2026-07-13 (agent nền trích xuất, sau đó tự rà soát lại toàn bộ 178 câu thủ công trước khi
// chạy): 171 câu trắc nghiệm có đáp án xác định (đáp án chữ cái A/B/C/D lấy trực tiếp từ dòng
// "Đáp án X" đi kèm ngay sau mỗi câu trong tài liệu — không suy luận ngược từ lời giải).
// Docx dùng 2 kiểu định dạng lựa chọn khác nhau tùy phần: numbering XML (numPr, khôi phục thứ tự
// A/B/C/D theo vị trí trong nhóm 4 mục cùng numId) và đoạn văn bản thường "A. ... B. ... C. ... D. ..."
// (không có numPr) — script trích xuất xử lý cả 2 dạng, kể cả trường hợp 1 lựa chọn bị ngắt dòng
// giữa chừng (đoạn tiếp theo không có numPr được nối lại vào lựa chọn trước đó).
// Đã loại khi mining: câu tự luận/điền khuyết/nối cột/mô tả hình-đồ thị (không đủ 4 lựa chọn A-D rõ
// ràng), câu bị mất đáp án, và các câu key rõ ràng sai khi đối chiếu kiến thức Hóa học/Sinh học lớp 6
// chuẩn hoặc mâu thuẫn với bản sao trùng nội dung khác trong cùng tài liệu (12 câu, xem lịch sử agent).
// Rà soát thủ công lại thêm sau khi agent tạo file (loại tiếp 7 câu, agent bị dừng giữa chừng do hết
// phiên nên chưa kịp tự kiểm tra hết): 3 câu tham chiếu hình ảnh không có trong text ("máu người quan
// sát dưới kính hiển vi", "nước cam trước/sau", "dụng cụ bên") nên không thể xác nhận đáp án đúng; 1
// câu điền khuyết có phần đề bị garbled khi trích xuất ("nguồn cũng cấp chính về. và chất bột.") không
// đọc hiểu được; 3 câu đáp án key đáng ngờ khi tự đối chiếu kiến thức hóa học — "đặc điểm của đá vôi"
// (cả "dùng sản xuất sođa" và "tan trong axit" đều là tính chất đúng của đá vôi, không phải MCQ đơn đáp
// án sạch), "quá trình thu kim loại từ quặng" (key "lắng gạn" không khớp phương pháp chuẩn "nấu chảy"),
// "thành phần không sinh ra từ đốt nhiên liệu hoá thạch" (key "chất bụi" trong khi bụi/soot THỰC SỰ
// sinh ra từ đốt cháy không hoàn toàn — đáp án hợp lý hơn phải là "oxygen", ngoài ra lựa chọn D bị
// garbled). Đã sửa 3 lỗi chính tả nhỏ không ảnh hưởng đáp án (VD "Carbon dioxygende" → "Carbon dioxide").
// Đích: ngân hàng luyện tập /practice (PracticeQuestion) 3 chương Lớp 6 (trước đó 0 câu).
// Idempotent: so nội dung (chuẩn hóa) với câu đã có trong practice + quiz của chương, trùng thì bỏ qua
// (một số câu trong mảng dưới đây có nội dung câu hỏi giống hệt nhau nhưng phương án nhiễu khác nhau —
// cơ chế dedup theo nội dung câu hỏi sẽ tự động chỉ giữ lại bản xuất hiện đầu tiên, đúng như hành vi
// script mẫu KHTN 8).

const QUESTIONS = [
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Đặc điểm cơ bản để phân biệt vật thể tự nhiên và vật thể nhân tạo là",
  "choices": [
   "vật thể nhân tạo đẹp hơn vật thể tự nhiên.",
   "vật thể nhân tạo do con người tạo ra.",
   "vật thể tự nhiên làm từ chất, còn vật thể nhân tạo làm từ vật liệu.",
   "vật thể tự nhiên làm từ các chất trong tự nhiên, vật thể nhân tạo làm từ các chất nhân tạo."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Đặc điểm cơ bản để phân biệt vật thể vô sinh và vật thể hữu sinh là",
  "choices": [
   "vật thể vô sinh không xuất phát từ cơ thể sống, vật thể hữu sinh xuất phát từ cơ thể sống.",
   "vật thể vô sinh không có các đặc điểm như trao đổi chất và năng lượng, sinh trưởng và phát triển, sinh sản, cảm ứng, còn vật thể hữu sinh có các đặc điểm trên.",
   "vật thể vô sinh là vật thể đã chết, vật thể hữu sinh là vật thể còn sống.",
   "vật thể vô sinh là vật thể không có khả năng sinh sản, vật thể hữu sinh luôn luôn sinh sản."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Vật thể tự nhiên là",
  "choices": [
   "Ao, hồ, sông, suối.",
   "Biển, mương, kênh, bể nước.",
   "Đập nước, máng, đại dương, rạch.",
   "Hồ, thác, giếng, bể bơi."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Tất cả các trường hợp nào sau đây đều là chất?",
  "choices": [
   "Đường mía, muối ăn, con dao.",
   "Con dao, đôi đũa, cái thìa nhôm.",
   "Nhôm, muối ăn, đường mía.",
   "Con dao, đôi đũa, muối ăn."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 2. Các thể của chất và sự chuyển thể",
  "content": "Một số chất khí có mùi thơm toả ra từ bông hoa hồng làm ta có thể ngửi thấy mùi hoa thơm. Điều này thể hiện tính chất nào của thể khí?",
  "choices": [
   "Dễ dàng nén được.",
   "Không có hình dạng xác định.",
   "Có thể lan toả trong không gian theo mọi hướng.",
   "Không chảy được."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Quá trình thể hiện tính chất hóa học của muối ăn (sodium chloride) là",
  "choices": [
   "Hòa tan muối vào nước.",
   "Rang muối tới khô.",
   "Điện phân dung dịch để sản xuất sodium hydroxide trong công nghiệp.",
   "Làm gia vị cho thức ăn."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Tính chất nào sau đây là tính chất hoá học của khí carbon dioxide?",
  "choices": [
   "Chất khí, không màu.",
   "Không mùi, không vị.",
   "Tan rất ít trong nước.",
   "Làm đục dung dịch nước vôi trong (dung dịch calcium hydroxide)."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Quá trình nào sau đây thể hiện tính chất hoá học?",
  "choices": [
   "Hoà tan đường vào nước.",
   "Cô cạn nước đường thành đường.",
   "Đun nóng đường tới lúc xuất hiện chất màu đen.",
   "Đun nóng đường ở thể rắn để chuyển sang đường ở thể lỏng."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 2. Các thể của chất và sự chuyển thể",
  "content": "Hiện tượng tự nhiên do hơi nước đông đặc là",
  "choices": [
   "Băng tan.",
   "Sương mù.",
   "Tạo thành mây.",
   "Mưa tuyết."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 2. Các thể của chất và sự chuyển thể",
  "content": "Sự sôi là",
  "choices": [
   "Sự chuyển từ thể lỏng sang thể khí diễn ra trong lòng hoặc bề mặt chất lỏng.",
   "Sự chuyển từ thể lỏng sang thể khí.",
   "Sự chuyển từ thể khí sang thể lỏng.",
   "Sự chuyển từ thể lỏng sang thể rắn."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 2. Các thể của chất và sự chuyển thể",
  "content": "Sự nóng chảy là",
  "choices": [
   "Sự chuyển từ thể lỏng sang thể khí.",
   "Sự chuyển từ thể khí sang thể lỏng.",
   "Sự chuyển từ thể rắn sang thể lỏng.",
   "Sự chuyển từ thể lỏng sang thể rắn."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Công thức hóa học của “muối biển” là",
  "choices": [
   "NaCl2.",
   "NaCl.",
   "KCl.",
   "Na2O."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Theo em, phát biểu nào dưới đây là đúng?",
  "choices": [
   "Có hai loại sodium chloride, một loại nhân tạo và một loại có trong tự nhiên",
   "Muối biển luôn luôn là dạng sodium chloride tinh khiết hơn sodium chloride nhân tạo",
   "Sodium chloride nhân tạo là chất nguy hiểm vì được tạo bởi các hóa chất độc, trong khi sử dụng muối biển hoàn toàn an toàn.",
   "Không có khác biệt hóa học nào giữa sodium chloride tinh khiết từ nguồn tự nhiên hoặc nhân tạo."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Cơ chế phát quang của bóng đèn sợi đốt là",
  "choices": [
   "Sử dụng dòng điện gây ra phản ứng phát quang trong bóng đèn",
   "Khi dòng điện đi qua đui đèn sẽ làm đui đèn cháy và phát sáng",
   "Dùng dòng điện đi qua đuôi đèn kim loại, vào đến dây tóc bóng đèn làm nó nóng lên đến mức phát sáng",
   "Sử dụng một kim loại (làm dây tóc bóng đèn) có khả năng phát nhiệt khi có dòng điện chạy qua"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 2. Các thể của chất và sự chuyển thể",
  "content": "Sự chuyển thể nào sau đây không xảy ra tại một nhiệt độ xác định?",
  "choices": [
   "Đông đặc.",
   "Sôi.",
   "Ngưng tụ.",
   "Nóng chảy."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 2. Các thể của chất và sự chuyển thể",
  "content": "Hiện tượng tự nhiên nào sau đây là do hơi nước ngưng tụ?",
  "choices": [
   "Lốc xoáy.",
   "Mưa rơi.",
   "Gió thổi.",
   "Tạo thành mây."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 2. Các thể của chất và sự chuyển thể",
  "content": "Chất ở thể nào có hình dạng cố định?",
  "choices": [
   "Thể khí.",
   "Thể lỏng.",
   "Thể rắn.",
   "Thể dẻo."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 2. Các thể của chất và sự chuyển thể",
  "content": "Chất ở thể nào thì dễ dàng lan truyền trong không gian theo mọi hướng?",
  "choices": [
   "Thể dẻo.",
   "Thể rắn.",
   "Thể khí.",
   "Thể lỏng."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 2. Các thể của chất và sự chuyển thể",
  "content": "Chất ở thể nào thì dễ bị nén?",
  "choices": [
   "Thể dẻo.",
   "Thể rắn.",
   "Thể lỏng.",
   "Thể khí."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 1. Sự đa dạng của chất",
  "content": "Chọn phát biểu sai.",
  "choices": [
   "Các vật thể đều do một hoặc nhiều chất tạo nên.",
   "Những gì tồn tại xung quanh ta gọi là vật thể.",
   "Số lượng các vật thể là có thể đếm được.",
   "Mỗi chất có thể tạo nên nhiều vật thể"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Oxygen có tính chất nào sau đây:",
  "choices": [
   "Ở điểu kiện thường oxygen là khí không màu, không mùi, không vị, tan ít trong nước, nặng hơn không khí, không duy trì sự cháy.",
   "Ở điểu kiện thường oxygen là khí không màu, không mùi, không vị, tan ít trong nước, nặng hơn không khí, duy trì sự cháy và sự sống.",
   "Ở điều kiện thường oxygen là khí không màu, không mùi, không vị, tan ít trong nước, nhẹ hơn không khí, duy trì sự cháy và sự sống.",
   "Ở điều kiện thường oxygen là khí không màu, không mùi, không vị, tan nhiều trong nước, nặng hơn không khí, duy trì sự cháy và sự sống."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Tính chất nào sau đây oxygen không có?",
  "choices": [
   "Oxygen là chất khí không màu, không vị.",
   "Có mùi hôi.",
   "Tan ít trong nước.",
   "Nặng hơn không khí."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Trong các câu sau, câu nào sai?",
  "choices": [
   "Oxygen nặng hơn không khí.",
   "Oxygen là chất khí không màu, không mùi, không vị.",
   "Oxygen tan nhiều trong nước.",
   "Oxygen chiếm 1/5 thể tích không khí."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Oxygen hóa lỏng ở nhiệt độ:",
  "choices": [
   "-183oC.",
   "183oC.",
   "196oC.",
   "–196oC."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Oxygen không có tính chất nào sau đây?",
  "choices": [
   "Tan nhiều trong nước.",
   "Không mùi.",
   "Không màu.",
   "Nặng hơn không khí."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Đưa tàn đóm vào bình đựng khí oxygen ta thấy hiện tượng như thế nào?",
  "choices": [
   "Tàn đóm tắt.",
   "Tàn đóm bùng cháy.",
   "Tàn đóm bốc khói.",
   "Không hiện tượng."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Phát biểu nào sau đây đúng?",
  "choices": [
   "Khí oxygen không tan trong nước.",
   "Khí oxygen sinh ra trong quá trình hô hấp của cây xanh.",
   "Ở điều kiện thường, oxygen là chất khí không màu, không mùi, không vị.",
   "Cần cung cấp oxygen để dập tất đám cháy."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Trong các bình chữa cháy thường chứa chất khí nào?",
  "choices": [
   "Oxygen",
   "Carbon dioxide.",
   "Nitrogen.",
   "H2O."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Những lĩnh vực quan trọng nhất của khí oxygen:",
  "choices": [
   "Sự hô hấp.",
   "Sự đốt nhiên liệu.",
   "Dùng trong phản ứng hóa hợp.",
   "Đốt cháy nhiên liệu và hô hấp."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Tại sao bệnh nhân lại cần đến ống thở khi hô hấp không ổn định",
  "choices": [
   "Cung cấp oxygen.",
   "Tăng nhiệt độ cơ thể.",
   "Lưu thông máu.",
   "Giảm đau."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Làm thế nào để dập tắt sự cháy?",
  "choices": [
   "Hạ nhiệt độ của chất cháy xuống dưới nhiệt độ cháy.",
   "Cách li chất cháy với oxygen.",
   "Quạt.",
   "Hạ dưới nhiệt độ cháy và cách li với oxygen."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Lĩnh vực nào là ứng dụng quan trọng nhất của khí oxygen?",
  "choices": [
   "Sự hô hấp và quang hợp của cây xanh.",
   "Sự hô hấp và sự đốt nhiên liệu.",
   "Sự quang hợp và sự cháy.",
   "Sự cháy và đốt nhiên liệu."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Muốn dập tắt đám cháy nhỏ do xăng, dầu gây ra, ta có thể sử dụng:",
  "choices": [
   "Xăng hoặc dầu phun vào đám cháy.",
   "Cát hoặc vải dày ẩm trùm kín đám cháy.",
   "Nước để dập tắt đám cháy.",
   "Khí oxygen phun vào đám cháy."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Không khí là",
  "choices": [
   "Một chất.",
   "Một đơn chất.",
   "Một hợp chất.",
   "Một hỗn hợp."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Câu nào đúng khi nói về không khí trong các câu sau?",
  "choices": [
   "Không khí là một đơn chất.",
   "Không khí là một nguyên tố hóa học.",
   "Không khí là một hỗn hợp của nhiều nguyên tố trong đó chủ yếu là oxygen và nitrogen.",
   "Không khí là hỗn hợp của nhiều khí trong đó chủ yếu là khí oxygen và nitrogen."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Chất nào sau đây chiếm tỉ lệ thể tích lớn nhất trong không khí?",
  "choices": [
   "Oxygen.",
   "Hydrogen.",
   "Nitrogen.",
   "Carbon dioxide."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Thành phần các chất trong không khí:",
  "choices": [
   "9% Nitơ, 90% Oxygen, 1% các chất khác.",
   "91% Nitơ, 8% Oxygen, 1% các chất khác.",
   "50% Nitơ, 50% Oxygen.",
   "21% Oxygen, 78% Nitơ, 1% các chất khác."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Nitrogen trong không khí có vai trò nào sau đây?",
  "choices": [
   "Cung cấp đạm tự nhiên cho cây trồng.",
   "Hình thành sấm sét.",
   "Tham gia quá trình quang hợp của cây.",
   "Tham gia quá trình tạo mây."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Chất nào sau đây chiếm tỉ lệ thể tích lớn nhất trong không khí?",
  "choices": [
   "Oxygen.",
   "Hydrogen.",
   "Nitrogen.",
   "Carbon dioxide."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Thành phần nào của không khí là nguyên nhân chủ yếu gây ra hiệu ứng nhà kính?",
  "choices": [
   "Oxygen.",
   "Hydrogen.",
   "Carbon dioxide.",
   "Nitrogen."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Hoạt động nông nghiệp nào sau đây không làm ô nhiễm môi trường không khí?",
  "choices": [
   "Đốt rom rạ sau khi thu hoạch.",
   "Tưới nước cho cây trồng.",
   "Bón phân tươi cho cây trồng.",
   "Phun thuốc trừ sâu để phòng sâu bọ phá hoại cây trồng."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Hoạt động của ngành kinh tế nào ít gây ô nhiễm môi trường không khí nhất?",
  "choices": [
   "Sản xuất phần mềm tin học.",
   "Sản xuất nhiệt điện.",
   "Du lịch.",
   "Giao thông vận tải."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Phương tiện giao thông nào sau đây không gây hại cho môi trường không khí?",
  "choices": [
   "Máy bay.",
   "Ô tô.",
   "Tàu hoả.",
   "Xe đạp."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 1. Chất quanh ta",
  "topic": "Bài 3. Oxygen và không khí",
  "content": "Biểu hiện nào sau đây không phải là biểu hiện của sự ô nhiễm môi trường?",
  "choices": [
   "Không khí có mùi khó chịu.",
   "Da bị kích ứng, nhiễm các bệnh đường hô hấp.",
   "Mưa axit, bầu trời bị sương mù cả ban ngày.",
   "Buổi sáng mai thường có sương đọng trên lá."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Thế nào là vật liệu?",
  "choices": [
   "Vật liệu là một số thức ăn được con người sử dụng hàng ngày.",
   "Vật liệu là một chất được dùng trong xây dựng như sắt, cát, xi măng,...",
   "Vật liệu là một chất hoặc hỗn hợp một số chất được con người sử dụng như là nguyên liệu đấu vào trong một quá trình sản xuất hoặc chế tạo ra những sản phẩm phục vụ cuộc sống.",
   "Vật liệu là gồm nhiều chất trộn lẫn vào nhau."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Mô hình 3R có nghĩa là gì?",
  "choices": [
   "Sử dụng vật liệu có hiệu quả, an toàn, tiết kiệm.",
   "Sử dụng vật liệu với mục tiêu giảm thiểu, tái chế, tái sử dụng.",
   "Sử dụng các vật liệu ít gây ô nhiễm môi trường.",
   "Sử dụng vật liệu chất lượng cao, mẫu mã đẹp, hình thức phù hợp."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Khi sử dụng các vật liệu bằng kim loại, người ta thường dung sơn phủ bề mặt kim loại hay bôi dầu mỡ, … Những việc làm này giúp",
  "choices": [
   "kim loại đẹp hơn.",
   "kim loại tránh hoen gỉ.",
   "kim loại mới lâu hơn.",
   "kim loại dễ dát mỏng hơn."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Pin được xem là thiết bị lưu trữ năng lượng dưới dạng hóa năng, nó là nguồn năng lượng giúp các thiết bị cầm tay hoạt động như pin con Thỏ, pin con Ó, … Trong pin có chưa nhiều kim loại nặng như thủy ngân, kẽm, chì,... Khi vứt một cục pin bừa bãi làm ô nhiễm",
  "choices": [
   "500 lít nước, 1m3 đất trong 50 năm.",
   "500 lít nước, 1m3 đất trong 100 năm.",
   "1 lít nước, 500m3 đất trong 50 năm.",
   "1 lít nước, 500m3 đất trong 100 năm."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật liệu nào sau đây được xem là thân thiện với môi trường?",
  "choices": [
   "Pin máy tính.",
   "Túi nilong.",
   "Hộp nhựa.",
   "Ống hút gạo."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật liệu xây dựng nào dưới đây sử dụng nhằm bảo vệ môi trường và đảm bảo phát triển bền vững?",
  "choices": [
   "Gỗ tự nhiên.",
   "Kim loại.",
   "Gạch không nung.",
   "Gạch chịu lửa."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Cách sắp xếp các vật liệu dẫn nhiệt từ tốt hơn đến kém hơn nào là chính xác?",
  "choices": [
   "Đồng, nước, thủy tinh, không khí.",
   "Đồng, thủy tinh, nước, không khí.",
   "Thủy tinh, đồng, nước, không khí.",
   "Không khí, nước, thủy tinh, đồng."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật liệu nano có đặc điểm",
  "choices": [
   "Độ rắn siêu cao, siêu dẻo.",
   "Có độ mềm, dẻo.",
   "Độ rắn thấp, nhiệt độ nóng chảy cao.",
   "Có kích cỡ lớn."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Dầu mỏ là một dạng nhiên liệu hóa thạch, dầu được hình thành khi số lượng lớn sinh vật chết, thường là động vật phù du và tảo được chôn dưới đá trầm tích và chịu nhiệt độ lẫn áp suất cao. Nguồn nhiên liệu này",
  "choices": [
   "tồn tại vô tận trong tự nhiên.",
   "có thể bị cạn kiệt.",
   "được sử dụng vĩnh viễn.",
   "nhanh chóng được tái sinh"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Trong các chất sau đây, chất nào không được gọi là nhiên liệu?",
  "choices": [
   "Than.",
   "Đất.",
   "Củi.",
   "Xăng."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Làm thế nào để nhiên liệu hóa thạch được lấy từ trái đất?",
  "choices": [
   "Thu thập trên bề mặt đại dương.",
   "Thông qua quá trình đốt cháy ngầm.",
   "Sử dụng nước để mang chúng lên mặt đất.",
   "Qua giếng sâu và hầm mỏ."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Nhóm nhiên liệu nào là nhiên liệu hóa thạch?",
  "choices": [
   "Than đá, than củi, dầu khí, khí thiên nhiên.",
   "Than đá, than củi, nhựa đường, khí thiên nhiên.",
   "Than đá, dầu nặng, dầu khí, khí thiên nhiên.",
   "Than củi, dầu nặng, dầu khí, khí thiên nhiên."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Nhiên liệu nào sau đây không phải nhiên liệu hoá thạch?",
  "choices": [
   "Than đá.",
   "Dầu mỏ.",
   "Khí tự nhiên.",
   "Biogas."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Để sử dụng nhiên liệu tiết kiệm và hiệu quả cần phải cung cấp một lượng khí oxygen",
  "choices": [
   "vừa đủ.",
   "thiếu.",
   "dư.",
   "tùy ý."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Để sử dụng gas tiết kiệm, hiệu quả người ta sử dụng biện pháp nào sau đây?",
  "choices": [
   "Tuỳ nhiệt độ cần thiết để điểu chỉnh lượng gas.",
   "Tốt nhất nên để gas ở mức độ lớn nhất.",
   "Tốt nhất nên để gas ở mức độ nhỏ nhất.",
   "Ngăn không cho khí gas tiếp xúc với carbon dioxide."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Dựa vào trạng thái, người ta phân thành mấy loại nhiên liệu?",
  "choices": [
   "2 loại.",
   "3 loại.",
   "4 loại.",
   "5 loại."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vì sao không đun bếp than trong phòng kín?",
  "choices": [
   "Vì than tỏa nhiều nhiệt dẫn đến phòng quá nóng.",
   "Vì than cháy tỏa nhiều khí CO, CO2 có thể gây tử vong nếu ngửi quá nhiều trong phòng kín.",
   "Vì than không cháy được trong phòng kín.",
   "Vì gía thành than khá cao và khó tìm."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Ứng dụng của tre trong cuộc sống là?",
  "choices": [
   "Dùng xây các ngôi nhà sàn.",
   "Dùng để đan rổ, chiếu.",
   "Dùng làm đồ điện.",
   "Làm các tòa nhà cao tầng."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Thủy tinh được chế tạo ra từ nguồn nguyên liệu chính nào dưới đây?",
  "choices": [
   "Cát.",
   "Đá vôi.",
   "Gạch.",
   "Than đá."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Các vật liệu, sản phẩm như xi măng, vôi sơn nhà,….có chung nguồn nguyên liệu từ?",
  "choices": [
   "Đá vôi.",
   "Cát.",
   "Xi măng.",
   "Quặng bauxite."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật thể nào sau đây được xem là nguyên liệu?",
  "choices": [
   "Ngói.",
   "Đất sét.",
   "Xi măng.",
   "Gạch xây dựng."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Ăn mòn nguyên liệu nào sau đây gây hiện tượng thạch nhũ trong hang động?",
  "choices": [
   "Đá vôi.",
   "Cát.",
   "Gạch.",
   "Than đá."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Khai thác nguyên liệu trái phép sẽ gây hậu quả?",
  "choices": [
   "Cung cấp nguyên liệu cho con người.",
   "Phát triển kinh tế.",
   "Cung cấp các sản phẩm mới.",
   "Ảnh hưởng đến môi trường."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Nguyên liệu khoáng sản là tài sản của……Điền vào chỗ “….” từ thích hợp.",
  "choices": [
   "Cá nhân.",
   "Quốc gia.",
   "Dân tộc.",
   "Cơ sở khai thác."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Điền vào chỗ trống: “Nguyên liệu sản xuất không phải là nguồn nguyên liệu…. do đó chúng ta cần sử dụng một cách tiết kiệm, hiệu quả và an toàn.”",
  "choices": [
   "vô hạn.",
   "hiếm.",
   "đa dạng.",
   "nhiều."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Nhận xét nào sau đây là không đúng?",
  "choices": [
   "Khai thác tiết kiệm vì nguồn quặng có hạn.",
   "Nước biển đa phần là nước mặn.",
   "Không thể thu muối từ nước biển.",
   "Quặng apatit dùng sản xuất phân lân,…"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Tính chất nào không đúng của quặng?",
  "choices": [
   "Cứng.",
   "Dễ ăn mòn.",
   "Dẫn nhiệt.",
   "Có duy nhất 1 thành phần."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Nguyên liệu nào sau đây được sử dụng trong lò nung vôi?",
  "choices": [
   "Đá vôi.",
   "Cát.",
   "Gạch.",
   "Đất sét."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Khi khai thác quặng sắt, ý nào sau đây là không đúng?",
  "choices": [
   "Khai thác tiết kiệm vì nguồn quặng có hạn.",
   "Tránh làm ô nhiễm môi trường.",
   "Nên sử dụng các phương pháp khai thác thủ công.",
   "Chế biến quặng thành sản phẩm có giá trị để nâng cao hiệu quả kinh tế."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Nước biển có tính chất cơ bản nào sau đây?",
  "choices": [
   "Cứng.",
   "Tạo thành vôi khi bị phân hủy.",
   "Ăn mòn tạo thành thạch nhũ trong hang động.",
   "Khi bay hơi nước sẽ thu được muối ăn."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Đá vôi có tính chất cơ bản nào sau đây?",
  "choices": [
   "Mềm và dễ dàng cắt được.",
   "Tạo thành vôi khi bị phân hủy.",
   "Khó bị ăn mòn dưới nước mưa.",
   "Dạng bột mịn, tan tốt trong nước."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Gỗ có trạng thái nào sau đây?",
  "choices": [
   "Rắn.",
   "Lỏng.",
   "Khí.",
   "Tất cả sai."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Nước biển có trạng thái nào sau đây?",
  "choices": [
   "Rắn.",
   "Lỏng.",
   "Khí.",
   "Tất cả sai."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Cát có trạng thái nào sau đây?",
  "choices": [
   "Rắn.",
   "Lỏng.",
   "Khí.",
   "Tất cả sai."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Điền từ thích hợp vào chỗ trống trong phát biểu sau: “Nguyên liệu là vật liệu…. chưa qua xử lí và cần được chuyển hóa để tạo ra sản phẩm”",
  "choices": [
   "Thô.",
   "Tổng hợp.",
   "Bán tổng hợp.",
   "Nhân tạo."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Điền từ thích hợp vào chỗ trống trong phát biểu sau: “… là vật liệu tự nhiên (vật liệu thô) chưa qua xử lí và cần được chuyển hóa để tạo ra sản phẩm”",
  "choices": [
   "vật liệu.",
   "nguyên liệu.",
   "nhiên liệu.",
   "phế liệu."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Quặng Bauxite là nguyên liệu dùng để sản xuất vật liệu nào sau đây.",
  "choices": [
   "Vật liệu Nhôm.",
   "Vật liệu Sắt.",
   "Vật liệu polyme.",
   "Vật liệu Chì."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Loại nguyên liệu nào sau đây có thể tái sinh?",
  "choices": [
   "Quặng.",
   "Than đá.",
   "Dầu mỏ.",
   "Nông sản."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Loại nguyên liệu nào sau đây hầu như không thể tái sinh?",
  "choices": [
   "Gỗ.",
   "Bông.",
   "Dầu mỏ.",
   "Nông sản."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Loại nguyên liệu nào sau đây hầu như không thể tái sinh?",
  "choices": [
   "Gỗ.",
   "Bông.",
   "Than đá.",
   "Nông sản."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Loại nguyên liệu nào sau đây hầu như không thể tái sinh?",
  "choices": [
   "Gỗ.",
   "Bông.",
   "Quặng.",
   "Nông sản."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Người ta khai thác đá vôi và cát để cung cấp cho các nhà máy nhiệt sản xuất xi măng. Lúc này, đá vôi và cát được gọi là",
  "choices": [
   "vật liệu.",
   "nhiên liệu.",
   "nguyên liệu.",
   "vật liệu hoặc nguyên liệu."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Người ta khai thác tre để cung cấp cho các xưởng sản xuất đan lát: rổ, rá, chiếu, manh, …. Lúc này, tre được gọi là",
  "choices": [
   "vật liệu.",
   "nhiên liệu.",
   "nguyên liệu.",
   "vật liệu hoặc nguyên liệu."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Khi dùng quặng để sản xuất sắt thì người ta sẽ gọi quặng là",
  "choices": [
   "vật liệu.",
   "nguyên liệu.",
   "nhiên liệu.",
   "phế liệu."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Khi dùng gỗ để sản xuất bàn ghế thì người ta sẽ gọi gỗ là",
  "choices": [
   "vật liệu.",
   "nguyên liệu.",
   "nhiên liệu.",
   "phế liệu."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Khi dùng cát để sản xuất thủy tinh thì người ta sẽ gọi cát là",
  "choices": [
   "vật liệu.",
   "nguyên liệu.",
   "nhiên liệu.",
   "phế liệu."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật thể nào sau đây không được xem là nguyên liệu?",
  "choices": [
   "Cát.",
   "Quặng.",
   "Gỗ.",
   "Muỗng nĩa kim loại."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật thể nào sau đây không được xem là nguyên liệu?",
  "choices": [
   "Cát.",
   "Quặng.",
   "Đá.",
   "Thủy tinh."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật thể nào sau đây được xem là nguyên liệu?",
  "choices": [
   "Bàn ghế.",
   "Quặng.",
   "Gạch xây dựng.",
   "Thủy tinh."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật thể nào sau đây được xem là nguyên liệu?",
  "choices": [
   "Bàn ghế.",
   "Cát.",
   "Xi măng.",
   "Thủy tinh."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật thể nào sau đây được xem là nguyên liệu?",
  "choices": [
   "Bàn ghế.",
   "Nước biển.",
   "Xi măng.",
   "Ngói."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật thể nào sau đây được xem là nguyên liệu?",
  "choices": [
   "Gạch xây dựng.",
   "Quặng.",
   "Bàn ghế.",
   "Cửa kính."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Vật thể nào sau đây được xem là nguyên liệu?",
  "choices": [
   "Gạch xây dựng.",
   "Bình hoa gốm sứ.",
   "Bàn ghế.",
   "Gỗ."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Loại nguyên liệu nào sau đây hầu như không thể tái sinh?",
  "choices": [
   "Gỗ.",
   "Bông.",
   "Dầu thô.",
   "Nông sản."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 4. Vật liệu, nhiên liệu, nguyên liệu",
  "content": "Người ta khai thác than đá để cung cấp cho các nhà máy nhiệt điện sản xuất điện. Lúc này, than đá được gọi là",
  "choices": [
   "vật liệu.",
   "nhiên liệu.",
   "nguyên liệu.",
   "vật liệu hoặc nguyên liệu."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Để duy trì một sức khỏe tốt với chế độ ăn hợp lí ta nên làm gì?",
  "choices": [
   "Kiên trì chạy bộ.",
   "Liên tục ăn các chất dinh dưỡng.",
   "Ăn đủ, đa dạng.",
   "Tập trung vào việc học nhiều hơn."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Vitamin nào tốt cho xương?",
  "choices": [
   "Vitamin D.",
   "Vitamin E.",
   "Vitatamin A.",
   "Vitamin C."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Khi tiêu hóa carbonhydrate sẽ chuyển thành chất nào trong cơ thể",
  "choices": [
   "Đường.",
   "Mỡ.",
   "Dầu.",
   "Đạm."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Trong các loại lương thực sau: mía; thốt nốt; củ cải đường; dứa. Có bao nhiêu lương thực có đường?",
  "choices": [
   "1.",
   "2.",
   "3.",
   "4."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Thực phẩm nào dưới đây không thể ăn sống được?",
  "choices": [
   "Rau xanh.",
   "Cà chua.",
   "Thịt heo.",
   "Sữa."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Cách bảo quản, chế biến và sử dụng thực phẩm nào dưới đây là đúng:",
  "choices": [
   "Nên vo gạo nhiều nước trước khi nấu để làm sạch.",
   "Nên để cá thịt chung với những rau củ.",
   "Có thể khử độc măng bằng cách ngâm với nước vôi trong.",
   "Nên dùng cá đông đá hơn cá còn sống."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Lợi ích giữ vệ sinh an toàn thực phẩm là",
  "choices": [
   "nguy cơ nhiễm bệnh lây lan qua đường tiêu hóa.",
   "gia tăng số người ngộ độc thực phẩm.",
   "tạo điều kiện cho việc buôn bán thực phẩm bẩn.",
   "giảm nguy cơ lây nhiểm bênh đường tiêu hóa."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Khi chế biến thực phẩm ta nên làm gì để đảm bảo vệ sinh:",
  "choices": [
   "Chế biến an toàn, hiệu quả, ngon miệng.",
   "Chế biến an toàn, kĩ lưỡng, sạch sẽ.",
   "Chọn thực phẩm rõ ràng nguồn gốc.",
   "Sử dụng nguồn nước tự nhiên để chế biến."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Biện pháp nào không giữ vệ sinh tránh nhiễm khuẩn trong ăn uống?",
  "choices": [
   "Rửa tay mỗi khi đi vệ sinh, trước khi ăn uống.",
   "Đánh răng mỗi khi đi ngủ.",
   "Bảo quản thực phẩm đúng cách.",
   "Không để lẫn thực phẩm sống và thực phẩm chín."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Biện pháp nào dưới đây phòng tránh nhiễm trùng, nhiễm khuẩn thực phẩm?",
  "choices": [
   "Rửa sạch tay, dụng cụ làm bếp và thức ăn cất vào tủ.",
   "Lựa chọn nguồn thực phẩm đảm bảo vệ sinh, an toàn.",
   "Đun lại thức ăn trước khi cất vào tủ lạnh và rửa tay sạch sẻ khi chế biến.",
   "Lựa chọn nguồn thực phẩm an toàn và thức ăn nên cất vào tủ."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Các loại thực phẩm nào dưới đây hầu như không gây dị ứng?",
  "choices": [
   "Cua.",
   "Tôm.",
   "Thịt bò.",
   "Dưa hấu."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Ý nào dưới đây không phải là vai trò của vitamin?",
  "choices": [
   "Tạo miễn dịch cho cơ thể.",
   "Ảnh hưởng quá trình trao đổi chất.",
   "Là nguồn năng lượng chính.",
   "Làm đẹp da."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Trái cây nào dưới đây giàu vitamin C nhất trong số những trái cây dưới đây?",
  "choices": [
   "Trái cam.",
   "Trái lựu.",
   "Trái ổi.",
   "Trái sơ ri."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Vitamin nào tan trong nước",
  "choices": [
   "Vitamin A.",
   "Vitamin D.",
   "Vitamin B.",
   "Vitamin K."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Các vitamin tan trong dầu là",
  "choices": [
   "Vitamin C.",
   "Vitamin B6.",
   "Vitamin B12.",
   "Vitamin E."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Loại thực phẩm nào dưới đây chứa sẵn độc tố?",
  "choices": [
   "Khoai lang mọc mầm.",
   "Bí đỏ.",
   "Khoai mì đã luộc chín.",
   "Khoai tây lên mầm."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Loại thực phẩm nào dưới đây không chứa sẵn độc tố?",
  "choices": [
   "Cá nóc.",
   "Mật cá trắm.",
   "Khoai tây mọc mầm.",
   "Bí đỏ."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Thực phẩm nào dưới đây đã bị hư hỏng?",
  "choices": [
   "Rau xanh mới được cắt",
   "Bánh mì mới sản xuất.",
   "Trái cây tươi.",
   "Rau xanh có nhiều lá vàng úa."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Nếu thức ăn bị hỏng, khi ăn vào cơ thể có thể",
  "choices": [
   "đái tháo đường.",
   "Buồn nôn.",
   "Chán ăn.",
   "đau đầu."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Khi thức ăn bị hư hỏng, nếu ăn vào cơ thể sẽ bị",
  "choices": [
   "đau bụng và chán ăn.",
   "tiêu lỏng và chán ăn.",
   "Đau bụng và tiêu chảy.",
   "chán ăn."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Tác nhân nào gây lương thực – thực phẩm bị hỏng trong không khí?",
  "choices": [
   "Nấm.",
   "Vi khuẩn.",
   "Nấm và vi khuẩn.",
   "Sinh vật kị khí."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Tại sao trên bao bì và vỏ hộp các loại thực phẩm người ta thường ghi hạn sử dụng?",
  "choices": [
   "Để biết công dụng.",
   "Cho biết nhãn hiệu.",
   "Quy định thời gian sử dụng sản phẩm.",
   "Biết được ngày sản xuất."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Các loại thực phẩm nào dưới đây có nguồn gốc từ không động vật?",
  "choices": [
   "Cá.",
   "Thịt.",
   "Tôm.",
   "Rau."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Người ta chia nguồn gốc thực phẩm tự nhiên thành các dạng nào dưới đây?",
  "choices": [
   "Thực vật.",
   "Thiên nhiên.",
   "Động vật.",
   "Thực vật và động vật."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Người ta chia nguồn gốc thực phẩm tự nhiên thành các dạng nào dưới đây?",
  "choices": [
   "Thực vật và vi khuẩn.",
   "Động vật và thực vật.",
   "Nhân tạo và tự nhiên.",
   "Sinh học và hóa học."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Nguồn gốc thực phẩm tự nhiên được chia làm mấy loại?",
  "choices": [
   "1 loại.",
   "2 loại.",
   "3 loại.",
   "4 loại."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Chức năng của protein (chất đạm) đối với con người:",
  "choices": [
   "Tạo các kháng thể bảo vệ cơ thể và cung cấp vitamin.",
   "Tạo enzyme điều hòa trao đổi chất và cung cấp các chất khoáng thiết yếu.",
   "Tạo các collagen bảo vệ sụn khớp và tạo kháng thể cho cơ thể.",
   "Tạo các kháng thể bảo vệ cơ thể và tạo enzyme điều hòa trao đổi chất."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Chức năng nào của protein (chất đạm) đối với con người?",
  "choices": [
   "Tạo nên cơ bắp và tạo kháng thể chống bênh tật.",
   "Góp phần tạo nên da, tóc, móng.",
   "Tạo kháng thể chống bệnh tật và cung cấp các vitamin.",
   "Tạo nên cơ bắp và tạo kháng thể chống bênh tật và tạo da, tóc."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Tạo nên hồng cầu vận chuyển oxygen là chức năng của",
  "choices": [
   "dầu ăn.",
   "đường.",
   "protein.",
   "Vitamin C."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Vai trò của đậu phụ, chọn câu đúng?",
  "choices": [
   "Cung cấp chủ yếu chất đạm.",
   "Cung cấp chất bột đường.",
   "Cung cấp vitamin và khoáng chất.",
   "Cung cấp tinh bột."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Vai trò của dầu thực vật, chọn câu sai?",
  "choices": [
   "Chống lạnh, cung cấp năng lượng.",
   "Vận chuyển các vitamin tan trong dầu.",
   "Giúp cơ thể dự trữ năng lương.",
   "Chủ yếu cung cấp năng lượng là chính."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Trong các nhóm thực phẩm sau, thực phẩm nào chứa nhiều vitamin nhất?",
  "choices": [
   "Mỡ gà.",
   "Thịt bò.",
   "Gạo.",
   "Rau xanh."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Trong các nhóm thực phẩm sau, thực phẩm nào chứa nhiều đạm nhất?",
  "choices": [
   "Mỡ gà.",
   "Thịt bò.",
   "Rau xanh.",
   "Táo."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Trong các thực phẩm sau, thực phẩm nào chứa nhiều chất béo nhất?",
  "choices": [
   "Mỡ gà.",
   "Thịt bò.",
   "Rau xanh.",
   "Táo."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Có mấy nhóm lương thực - thực phẩm chủ yếu?",
  "choices": [
   "1.",
   "2.",
   "3.",
   "4."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Trạng thái, tính chất và ứng dụng phù hợp với ngô là",
  "choices": [
   "củ, dẻo, nấu cơm.",
   "hạt, bùi, làm bột chế biến bánh.",
   "củ, dẻo, làm bột chế biến bánh.",
   "hạt, dẻo, men sản xuất rượu."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Trạng thái và tính chất chủ yếu của sắn (khoai mì) là",
  "choices": [
   "hạt, dẻo.",
   "củ, bùi.",
   "củ, dẻo.",
   "hạt, bùi."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Ứng dụng của gạo, chọn câu sai trong các ứng dụng sau?",
  "choices": [
   "Nấu cơm.",
   "Lên men rượu.",
   "Làm bột chế biến bánh.",
   "Làm cồn."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Vì sao gạo là loại thương thực được sử dụng nhiều nhất?",
  "choices": [
   "Dễ trồng.",
   "Dễ chế biến.",
   "Rẻ tiền.",
   "Hàm lượng tinh bột cao và cung cấp năng lượng cần thiết"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Lương thực nào được sử dụng nhiều nhất?",
  "choices": [
   "Lúa mì.",
   "Khoai lang.",
   "Gạo.",
   "Khoai mì."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Ngũ cốc là tên gọi có từ thời Trung Hoa cổ đại nhằm chỉ 5 loại thực vật giàu dưỡng chất với hạt có thể ăn được gồm vừng, mì, gạo tẻ, các loại đậu và loại nào khác?",
  "choices": [
   "Gạo nếp.",
   "Đậu xanh.",
   "Đậu phộng.",
   "Đậu đen."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Ngũ cốc là tên gọi có từ thời Trung Hoa cổ đại nhằm chỉ bao nhiêu loại thực vật giàu dưỡng chất với hạt có thể ăn được?",
  "choices": [
   "1.",
   "3.",
   "5.",
   "7."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Lứa tuổi từ 11 -15 là lứa tuổi có sự phát triển nhanh chóng về chiều cao. Chất quan trọng nhất cho sự phát triển của xương là",
  "choices": [
   "carbohydrate.",
   "protein.",
   "calcium.",
   "chất béo."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Hàm lượng dinh dưỡng chính trong lương thực là",
  "choices": [
   "nước.",
   "protein.",
   "carbohydrate.",
   "lipid."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Gạo sẽ cung cấp chất dinh dưỡng nào nhiều nhất cho cơ thể?",
  "choices": [
   "Carbohydrate (chất đường, bột).",
   "Protein (chất đạm).",
   "Lipid (chất béo).",
   "Vitamin."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 2. Vật liệu, nhiên liệu, nguyên liệu, lương thực - thực phẩm",
  "topic": "Bài 5. Một số lương thực, thực phẩm",
  "content": "Trong các thực phẩm dưới đây,loại nào chứa nhiều protein (chất đạm) nhất?",
  "choices": [
   "Gạo.",
   "Rau xanh.",
   "Thịt.",
   "Gạo và rau xanh."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Khi cho bột mì vào nước và khuấy đều, ta thu được",
  "choices": [
   "nhũ tương.",
   "huyền phù.",
   "dung dịch.",
   "dung môi."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Hỗn hợp nào sau đây không được xem là dung dịch?",
  "choices": [
   "Hỗn hợp nước đường.",
   "Hỗn hợp nước muối.",
   "Hỗn hợp bột mì và nước khuấy đều.",
   "Hỗn hợp nước và rượu."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Trường hợp nào sau đây là chất tinh khiết?",
  "choices": [
   "Gỗ.",
   "Nước khoáng.",
   "Sodium chloride.",
   "Nước biển."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Khi giảm nhiệt độ và tăng áp suất thì độ tan của chất khí trong nước thay đổi như thế nào?",
  "choices": [
   "Đều tăng.",
   "Đều giảm.",
   "Có thể tăng hoặc giảm.",
   "Không tăng, không giảm."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Chất tinh khiết là",
  "choices": [
   "chỉ có một loại chất.",
   "chứa một chất chính và nhiều chất phụ.",
   "từ hai hay nhiều chất trở lên.",
   "chỉ có hai loại chất duy nhất."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Khi tăng nhiệt độ thì độ tan của các chất rắn trong nước thay đổi như thế nào?",
  "choices": [
   "Đều giảm.",
   "Đều tăng.",
   "Không thay đổi.",
   "Phần lớn là tăng."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Khi hoà tan 100 ml rượu êtylic vào 50 ml nước thì nhận định nào đây đúng?",
  "choices": [
   "Rượu là chất tan và nước là dung môi.",
   "Nước là chất tan và rượu là dung môi.",
   "Nước và rượu đều là chất tan.",
   "Nước và rượu đều là dung môi."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Dung dịch là hỗn hợp đồng nhất của",
  "choices": [
   "2 chất lỏng.",
   "Chất rắn và chất lỏng.",
   "Chất khí và chất lỏng.",
   "Chất tan và dung môi."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Muốn chuyển đổi một dung dịch NaCl từ chưa bão hòa sang bão hòa, ta dùng biện pháp là",
  "choices": [
   "tăng dung môi là nước.",
   "đun nóng dung dịch.",
   "tăng chất tan.",
   "giảm chất tan."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Khi hoà tan bột đá vôi vào nước, chỉ một lượng chất này tan trong nước; phần còn lại làm cho nước bị đục. Hổn hợp này được coi là",
  "choices": [
   "dung dịch.",
   "chất tan.",
   "nhũ tương.",
   "huyền phù."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Trong tự nhiên, các loại đá thạch anh được cấu tạo từ SiO2 lẫn các loại chất khác tạo nên nhiều màu sắc khác nhau. Đá thạch anh được gọi là",
  "choices": [
   "dung dịch.",
   "hỗn hợp.",
   "chất tinh khiết.",
   "dung môi."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 6. Chất tinh khiết và hỗn hợp",
  "content": "Khi vo gạo nấu cơm, bạn Hải thấy rằng nước vo gạo khi để một thời gian trong cốc sẽ tách thành hai lớp. Phía trên thì trong còn phía dưới thì đục hơn. Như hình minh họa Bạn Hải thắc mắc tại sao lại có hiện tượng này. Em hãy chọn phát biểu đúng trong các phát biểu sau?",
  "choices": [
   "Nước vo gạo là chất nguyên chất nên tách lớp.",
   "Nước vo gạo là một dung dịch đồng nhất.",
   "Nước vo gạo là một hỗn hợp huyền phù nên tách lớp.",
   "Nước vo gạo là một hôn hợp nhũ tương nên để lâu sẽ tách lớp."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Phương pháp nào dưới đây là đơn giản nhất để tách cát lẫn trong nước?",
  "choices": [
   "Lọc.",
   "Dùng máy li tâm.",
   "Chiết.",
   "Cô cạn."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Nếu không may làm đổ dầu ăn vào nước, ta dùng phương pháp nào để tách riêng dấu ăn ra khỏi nước?",
  "choices": [
   "Lọc.",
   "Dùng máy li tâm.",
   "Chiết.",
   "Cô cạn"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Tác dụng chủ yếu của việc đeo khẩu trang là gì?",
  "choices": [
   "Tách hơi nước ra khỏi không khí hít vào.",
   "Tách oxygen ra khỏi không khí hít vào.",
   "Tách khí carbon dioxide ra khỏi không khí hít vào.",
   "Tách khói bụi ra khỏi không khí hít vào."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Vào mùa hè, nhiều hôm thời tiết rất oi bức khiến chúng ta cảm thấy ngột ngạt, khó thở. Thế nhưng sau khi có một trận mưa rào ập xuống, người ta lại cảm thấy dễ chịu hơn nhiều. Lí do là",
  "choices": [
   "mưa đã làm giảm nhiệt độ môi trường.",
   "mưa đã làm chết các loài sinh vật gây bệnh.",
   "mưa đã làm giảm nhiệt độ môi trường và loại bớt khói bụi ra khỏi không khí.",
   "mưa đã làm giảm nhiệt độ môi trường và làm chết các loài sinh vật gây bệnh."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Khí nitrogen và khí oxygen là hai thành phần chính của không khí. Trong kĩ thuật, người ta có thể hạ thấp nhiệt độ xuống dưới -196 °C để hoá lỏng không khí, sau đó nâng nhiệt độ đến dưới -183 °C. Khi đó, nitrogen bay ra và còn lại là oxygen dạng lỏng. Phương pháp tách khí nitrogen và khí oxygen ra khỏi không khí như trên được gọi là",
  "choices": [
   "phương pháp lọc.",
   "phương pháp chiết.",
   "phương pháp cô cạn.",
   "phương pháp chưng phân đoạn."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Ở nông thôn, để tách thóc lép ra khỏi thóc, người dân thường đổ thóc roi trước một cái quạt gió. Những hạt thóc lép sẽ bị gió thổi bay ra, đó là do thóc lép có",
  "choices": [
   "khối lượng nhẹ hơn.",
   "kích thước hạt nhỏ hơn.",
   "tốc độ rơi nhỏ hơn.",
   "lớp vỏ trẩu dễ tróc hơn."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Việc làm nào sau đây là quá trình tách chất dựa theo sự khác nhau vể kích thước hạt?",
  "choices": [
   "Giặt giẻ lau bảng bằng nước từ vòi nước.",
   "Dùng nam châm hút bột sắt từ hỗn hợp bột sắt và lưu huỳnh.",
   "Lọc nước bị vẩn đục bằng giấy lọc.",
   "Ngâm quả dâu với đường để lấy nước dầu."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Nước giếng khoan thường lẫn nhiều tạp chất. Để tách bỏ tạp chất, người dân cho nước giếng khoan vào bể lọc, đáy bể lót các lớp cát mịn, sỏi và than củi. Nước chảy qua các lớp này sẽ trong hơn. Nhận định nào sau đây là không đúng?",
  "choices": [
   "Lớp cát mịn có tác dụng giữ các hạt đất, cát ở lại.",
   "Lớp sỏi làm cho nước có vị ngọt.",
   "Lớp than củi có tác dụng hút các chất hữu cơ, vi khuẩn.",
   "Sau một thời gian sử dụng, ta phải thau rửa các lớp đáy bể lọc."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Hỗn hợp có thể tách riêng các chất thành phần bằng cách cho hỗn hợp vào nước, sau đó khuấy kỹ, lọc và cô cạn là",
  "choices": [
   "Đường và muối.",
   "Bột đá vôi và muối ăn.",
   "Bột than và bột sắt.",
   "Giấm và rượu."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Cách hợp lí nhất để tách muối từ nước biển là:",
  "choices": [
   "Lọc.",
   "Chưng cất.",
   "Làm bay hơi nước.",
   "Để muối lắng xuống rồi gạn đi."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Rượu etylic (cồn) sôi ở 78,3oC, nước sôi ở 100oC. Muốn tách rượu ra khỏi hỗn hợp rượu và nước có thể dùng cách nào trong số các cách cho dưới đây?",
  "choices": [
   "Lọc.",
   "Bay hơi.",
   "Chưng cất ở nhiệt độ khoảng 80o.",
   "Không tách được."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Người ta có thể sản xuất phân đạm từ nitơ trong không khí. Coi không khí gồm nitơ và oxi. Nitơ sôi ở -196oC, còn oxi sôi ở -183oC. Để tách nitơ ra khỏi không khí, ta tiến hành như sau:",
  "choices": [
   "Dẫn không khí vào dụng cụ chiết, lắc thật kỹ sau đó tiến hành chiết sẽ thu được nitơ.",
   "Dẫn không khí qua nước, nitơ sẽ bị giữ lại, sau đó đun sẽ thu được nitơ.",
   "Hóa lỏng không khí bằng cách hạ nhiệt độ xuống dưới -196oC. Sau đó nâng nhiệt độ lên đúng -196oC, nitơ sẽ sôi và bay hơi.",
   "Làm lạnh không khí, sau đó đun sôi thì nitơ bay hơi trước, oxi bay hơi sau."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Để tách muối ra khỏi hỗn hợp gồm muối, bột sắt và bột lưu huỳnh. Cách nhanh nhất là",
  "choices": [
   "dùng nam châm, hòa tan trong nước, lọc, bay hơi.",
   "hòa tan trong nước, lọc, bay hơi.",
   "hòa tan trong nước, lọc, dùng nam châm, bay hơi.",
   "hòa tan trong nước, lọc, bay hơi, dùng nam châm."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương 3. Hỗn hợp",
  "topic": "Bài 7. Tách chất khỏi hỗn hợp",
  "content": "Cách hợp lí để tách muối từ nước biển là",
  "choices": [
   "lọc.",
   "bay hơi.",
   "chưng cất.",
   "để yên thì muối sẽ tự lắng xuống."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 }
];

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 80);
}

async function main() {
  const chapters = await prisma.chapter.findMany({ where: { grade: 6 } });
  const byTitle = new Map(chapters.map((c) => [c.title, c]));

  let added = 0, skipped = 0;
  for (const chapterTitle of [...new Set(QUESTIONS.map((q) => q.chapterTitle))]) {
    const chapter = byTitle.get(chapterTitle);
    if (!chapter) {
      console.error(`Không tìm thấy chương "${chapterTitle}" (grade 6) — bỏ qua nhóm này.`);
      continue;
    }
    const [existingPractice, existingQuiz] = await Promise.all([
      prisma.practiceQuestion.findMany({ where: { chapterId: chapter.id }, select: { content: true } }),
      prisma.question.findMany({ where: { quiz: { chapterId: chapter.id } }, select: { content: true } }),
    ]);
    const seen = new Set([...existingPractice, ...existingQuiz].map((q) => normalize(q.content)));

    const rows = [];
    for (const q of QUESTIONS.filter((x) => x.chapterTitle === chapterTitle)) {
      const key = normalize(q.content);
      if (seen.has(key)) { skipped++; continue; }
      seen.add(key);
      rows.push({
        chapterId: chapter.id,
        content: q.content,
        choices: JSON.stringify(q.choices),
        correctIndex: q.correctIndex,
        explanation: q.explanation || null,
        difficulty: q.difficulty,
        source: `KHTN 6 - Tài liệu học tập 2024 — ${q.topic}`,
        published: true,
      });
    }
    if (rows.length) await prisma.practiceQuestion.createMany({ data: rows });
    added += rows.length;
    console.log(`${chapterTitle}: thêm ${rows.length} câu`);
  }
  console.log(`Hoàn tất: thêm ${added}, bỏ qua ${skipped} câu trùng.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
