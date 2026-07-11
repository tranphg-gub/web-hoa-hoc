import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Nguồn: Tài liệu/Lớp 6-9 (THCS)/Mới upload (Lớp 6,7,8,9)/KHTN 8 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx
// Mining 2026-07-11: 143 câu trắc nghiệm có đáp án (key chữ cái trong bảng đáp án của tài liệu;
// riêng Bài 6 khôi phục đáp án từ lời giải chi tiết và đã kiểm chứng lại từng câu bằng tay,
// loại 3 câu lời giải lệch số với đề). Đã loại: câu có hình/sơ đồ, câu cụt ngữ cảnh, câu key sai chuẩn SGK.
// Đích: ngân hàng luyện tập /practice (PracticeQuestion) 2 chương Lớp 8.
// Idempotent: so nội dung (chuẩn hóa) với câu đã có trong practice + quiz của chương, trùng thì bỏ qua.

const QUESTIONS = [
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Dấu hiệu nào giúp ta có khẳng định có phản ứng hoá học xảy ra?",
  "choices": [
   "Có chất kết tủa (chất không tan).",
   "Có chất khí thoát ra (sủi bọt).",
   "Có sự thay đổi màu sắc.",
   "Một trong số các dấu hiệu trên."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Kết luận nào dưới đây là đúng trong mọi phản ứng hóa học?",
  "choices": [
   "Phản ứng hóa học chỉ xảy ra được khi có chất xúc tác.",
   "Lượng các chất sản phẩm tăng dần, lượng các chất tham gia giảm dần.",
   "Lượng các chất tham gia không thay đổi.",
   "Lượng các chất sản phẩm giảm dần, lượng các chất tham gia tăng dần."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Câu nào sau đây đúng?",
  "choices": [
   "Trong phản ứng hoá học, các nguyên tử bị phá vỡ.",
   "Trong phản ứng hoá học, liên kết trong các phân tử bị phá vỡ.",
   "Trong phản ứng hoá học, liên kết trong các phân tử không bị phá vỡ.",
   "Trong phản ứng hoá học các phân tử được bảo toàn."
  ],
  "correctIndex": 1,
  "explanation": "Trong một phản ứng hóa học, chỉ có liên kết giữa các nguyên tử thay đổi làm cho phân tử này biến đổi thành phân tử khác.",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Các câu sau, câu nào sai?",
  "choices": [
   "Trong phản ứng hoá học các nguyên tử được bảo toàn, không tự nhiên sinh ra hoặc mất đi.",
   "Trong phản ứng hoá học, các nguyên tử bị phân chia.",
   "Trong phản ứng hoá học, các phân tử bị phân chia.",
   "Trong phản ứng hoá học, các phân tử không bị phá vỡ."
  ],
  "correctIndex": 2,
  "explanation": "Trong một phản ứng hóa học, chỉ có liên kết giữa các nguyên tử thay đổi làm cho phân tử này biến đổi thành phân tử khác. Sự thay đổi liên kết này khiến phân tử bị phân chia.",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Bỏ quả trứng vào dung dịch acid chloride thấy sủi bọt ở vỏ trứng. Biết rằng acid chloride đã tác dụng với Calcium carbonate (chất này trong vỏ trứng) tạo ra Calcium chloride (chất này tan), nước và khí carbon dioxide thoát ra. Ý nào dưới đây biểu diễn đúng phương trình chữ của phản ứng trên.",
  "choices": [
   "Acid chloride + Calcium carbonate → Calcium chloride + carbon dioxide + nước.",
   "Calcium chloride + carbon dioxide + nước → acid chloride + Calcium carbonate.",
   "Acid chloride + Calcium carbonate → Calcium chloride + carbon dioxide.",
   "Calcium chloride + nước → acid chloride + Calcium carbonate."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Khi xảy ra phản ứng hóa học sẽ",
  "choices": [
   "có ánh sáng phát ra.",
   "có sinh nhiệt.",
   "có chất mới tạo thành.",
   "có chất không tan trong nước."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Điều kiện để một phản ứng hóa học xảy ra là",
  "choices": [
   "không thể thiếu chất xúc tác.",
   "các chất phản ứng phải tiếp xúc với nhau.",
   "cần phải đun nóng.",
   "cả 3 điều kiện trên."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Trong phản ứng: Magnessium + sulfuric acid → magnessium sulfate + khí hydrogen.",
  "choices": [
   "chất phản ứng",
   "sản phẩm",
   "chất xúc tác",
   "chất môi trường"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Trong một phản ứng hóa học, giữa các sản phẩm với các chất phản ứng không có sự thay đổi về",
  "choices": [
   "số nguyên tử của mỗi chất.",
   "số nguyên tố của mỗi chất.",
   "số nguyên tử của mỗi nguyên tố.",
   "số phân tử của mỗi chất."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Cho kim loại K vào khí Cl2. Sản phẩm tạo thành là?",
  "choices": [
   "Sinh ra khí chlorine",
   "Sản phẩm là KCl2",
   "Sinh ra nước muối KCl",
   "K2Cl"
  ],
  "correctIndex": 2,
  "explanation": "2Na+Cl2 → 2NaCl",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 2. Phản ứng hóa học",
  "content": "Nhận định nào sau đây luôn đúng trong mọi phương trình hóa học?",
  "choices": [
   "Tổng hệ số của chất tham gia bằng tổng hệ số các sản phẩm.",
   "Tổng số nguyên tử của mỗi nguyên tố không thay đổi.",
   "Tổng số chất trước phản ứng bằng tổng số chất sau phản ứng.",
   "Tổng số phân tử chất tham gia luôn nhiều hơn tổng số phân tử chất sản phẩm."
  ],
  "correctIndex": 1,
  "explanation": "Trong mọi phương trình hóa học tổng số nguyên tử của mỗi nguyên tố không thay",
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 3. Mol và tỉ khối chất khí",
  "content": "Số phân tử H2O có trong một giọt nước (0,05 gam) là:",
  "choices": [
   "1,777.1023 phân tử.",
   "1,767.1022 phân tử.",
   "2,777.1021 phân tử.",
   "1,667.1021 phân tử."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Vì sao đun nóng dung dịch cũng là một phương pháp để chất rắn tan nhanh hơn trong nước",
  "choices": [
   "Làm mềm chất rắn",
   "Có áp suất cao",
   "Ở nhiệt độ cao, các phân tử nước chuyển động nhanh hơn làm tang số lần va chạm giữa các phân tử và bề mặt chất rắn",
   "Do nhiệt độ cao"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Khi hòa tan dầu ăn trong cốc xăng thì xăng đóng vai trò gì",
  "choices": [
   "Chất tan",
   "​Dung môi",
   "Chất bão hòa",
   "Chất chưa bão hòa"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Dung dịch có thể hòa tan thêm chất tan là",
  "choices": [
   "Dung môi",
   "Dung dich bão hòa",
   "Dung dich chưa bão hòa",
   "Cả A&B"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Hòa tan 3 gam muối NaCl vào trong nước thu được dung dịch muối. Chất tan là",
  "choices": [
   "muối NaCl.",
   "nước.",
   "muối NaCl và nước.",
   "dung dịch nước muối thu được."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Các câu sau, câu nào đúng khi định nghĩa dung dịch?",
  "choices": [
   "Dung dịch là hỗn hợp đồng nhất của chất rắn và chất lỏng",
   "Dung dịch là hỗn hợp đồng nhất của chất khí và chất lỏng",
   "Dung dịch là hỗn hợp đồng nhất của hai chất lỏng",
   "Dung dịch là hỗn hợp đồng nhất của chất tan và dung môi"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Khi hoà tan 100ml rượu ethylic vào 50ml nước thì:",
  "choices": [
   "Rượu là chất tan và nước là dung môi",
   "Nước là chất tan và rượu là dung môi",
   "Nước và rượu đều là chất tan",
   "Nước và rượu đều là dung môi"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Khi tăng nhiệt độ và giảm áp suất thì độ tan của chất khí trong nước thay đổi như thế nào?",
  "choices": [
   "Tăng",
   "Giảm",
   "Có thể tăng hoặc giảm",
   "Không thay đổi"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Ở 200C hoà tan 40g KNO3 vào trong 95g nước thì được dung dịch bão hoà. Độ tan của KNO3 ở",
  "choices": [
   "40,1g",
   "44, 2g",
   "42,1g",
   "43,5g"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Nồng độ của dung dịch tăng nhanh nhất khi nào?",
  "choices": [
   "Tăng lượng chất tan đồng thời tăng lượng dung môi",
   "Tăng lượng chất tan đồng thời giảm lượng dung môi",
   "Tăng lượng chất tan đồng thời giữ nguyên lượng dung môi",
   "Giảm lượng chất tan đồng thời giảm lượng dung môi"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Câu nào đúng, trong các câu sau?",
  "choices": [
   "Quá trình hoà tan muối ăn vào nước là một quá trình hoá học",
   "Sắt bị gỉ là một hiện tượng vật lí",
   "Những nguyên tử của các đồng vị có cùng số proton trong hạt nhân",
   "Nồng độ % của dung dịch cho biết số chất tan trong 100g dung môi"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Với một lượng chất tan xác định khi tăng thể tích dung môi thì:",
  "choices": [
   "C% tăng,CM tăng",
   "C% giảm ,CM giảm",
   "C% tăng,CM giảm",
   "C% giảm,CM tăng"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Bằng cách nào sau đây có thể pha chế được dung dịch NaCl 15%.",
  "choices": [
   "Hoà tan 15g NaCl vào 90g H2O",
   "Hoà tan 15g NaCl vào 100g H2O",
   "Hoà tan 30g NaCl vào 170g H2O",
   "Hoà tan 15g NaCl vào 190g H2O"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Để tính nồng độ mol của dung dịch NaOH, người ta làm thế nào?",
  "choices": [
   "Tính số gam NaOH có trong 100g dung dịch",
   "Tính số gam NaOH có trong 1 lít dung dịch",
   "Tính số gam NaOH có trong 1000g dung dịch",
   "Tính số mol NaOH có trong 1 lít dung dịch"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Để tính nồng độ phần trăm của dung dịch HCl, người ta làm thế nào?",
  "choices": [
   "Tính số gam HCl có trong 100g dung dịch",
   "Tính số gam HCl có trong 1lít dung dịch",
   "Tính số gam HCl có trong 100og dung dịch",
   "Tính số mol HCl có trong 1lít dung dịch"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Trong 225ml nước có hoà tan 25g KCl. Nồng đọ phần trăm của dung dịch là:",
  "choices": [
   "10%",
   "11%",
   "12%",
   "13%"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Hoà tan 1 mol H2SO4 vào 18g nước. Nồng độ phần trăm của dung dịch thu được là:",
  "choices": [
   "84,22%",
   "84.15%",
   "84.25%",
   "84,48%"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Hoà tan 124g Na2O vào 876ml nước, phản ứng tạo ra NaOH. Nồng độ phần trăm của dung dịch",
  "choices": [
   "16%",
   "17%",
   "18%",
   "19%"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Trong 400ml dung dịch có chứa 19,6g H2SO4. Nồng độ mol của dung dịch thu được là:",
  "choices": [
   "0,2M",
   "0,3M",
   "0,4M",
   "0,5M"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Cần thêm bao nhiêu ml nước vào 100ml dung dịch này để được dung dịch có nồng độ 0,1M?",
  "choices": [
   "150ml B. 160ml",
   "170ml D. 180ml",
   "Dữ kiện sau dùng cho hai câu 42,43.",
   "Pha loãng 20g dung dịch H2SO4 nồng độ 50% để được 50g dung dịch"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Nồng độ phần trăm của dung dịch sau khi pha loãng là:",
  "choices": [
   "7%",
   "18%",
   "19%",
   "20%"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Dung dịch sau khi pha loãng có khối lượng riêng D= 1,08g/ml. Nồng độ mol của dung dịch là:",
  "choices": [
   "2,24M",
   "1,24M",
   "1,84M",
   "2,5M Dữ kiện sau dùng cho hai câu 44,45. Muốn pha 300g dung dịch NaCl 20% thì:"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Khối lượng H2O cần có là:",
  "choices": [
   "480g",
   "506g",
   "360g",
   "240g"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Muốn pha 300ml dung dịch NaCl 3M thì khối lượng NaCl cần lấy là:",
  "choices": [
   "52,65g B. 54,65g",
   "60,12g D. 60,18g",
   "Dữ kiện sau dùng cho hai câu 47,48.",
   "Muốn pha 150g dung dịch CuSO4 2% từ dung dịch CuSO4 20% thì"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Khối lượng dung dịch CuSO4 20% cần lấy là:",
  "choices": [
   "14g",
   "15g",
   "16g",
   "17g"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 4. Dung dịch và nồng độ",
  "content": "Có 60g dung dịch NaOH 20%. Khối lượng NaOH cần cho thêm vào dung dịch trên để được dung dịch 25% là:",
  "choices": [
   "4g",
   "5g",
   "6g",
   "7g"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Đốt cháy 1,5 g kim loại Mg trong không khí thu được 2,5 g hợp chất magnessium Oxide MgO. Khối lượng khí Oxygen đã phản ứng là:",
  "choices": [
   "1 g",
   "1,2 g",
   "1,5 g",
   "1,1 g"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Nếu nung 5 tấn Calcium carbonate sinh ra 2,2 tấn khí carbon dioxide và Calcium Oxide? Khối lượng Calcium Oxide là:",
  "choices": [
   "7,2 tấn",
   "2,8 tấn",
   "3,2 tấn",
   "5,6 tấn"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Đốt cháy hoàn toàn 12 gam carbon trong không khí thu được 44 gam khí carbon dioxide (CO2). Khối lượng Oxygen đã tham gia phản ứng là:",
  "choices": [
   "3,2 gam",
   "32 gam",
   "0,32 gam",
   "1,6 gam"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Cho 9 gam aluminium cháy trong Oxygen thu được 10,2 gam aluminium Oxide. Tính khối lượng Oxygen đã phản ứng",
  "choices": [
   "1,7 gam",
   "1,6 gam",
   "1,5 gam",
   "1,2 gam"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Cho Iron tác dụng với acid chloride thu được 11,43 gam muối Iron (II) chloride và 0,18 gam khí hydrogen bay lên. Tổng khối lượng chất phản ứng là",
  "choices": [
   "11,61 gam",
   "12,2 gam",
   "11 gam",
   "12,22 gam"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Đốt cháy hết 9 gam kim loại magnessium Mg trong không khí thu được 15 gam hợp chất Magnessium Oxide MgO. Biết rằng magnessium cháy là xảy ra phản ứng với khí O2 trong không khí. Tính khối lượng của khí Oxygen phản ứng.",
  "choices": [
   "8 gam.",
   "24 gam.",
   "16 gam.",
   "6 gam."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Khi nung Calcium carbonate CaCO3 người ta thu được Calcium Oxide CaO và khí carbon dioxide. Cho biết khối lượng vôi sống sinh ra bằng 140 kg, khối lượng khí carbon dioxide bằng 110 kg. Hãy tính khối lượng Calcium carbonate phản ứng.",
  "choices": [
   "245 kg",
   "250 kg",
   "30 kg",
   "249 kg"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Đốt cháy hoàn toàn 13,4 gam hỗn hợp X gồm: Fe, Al và Cu trong 2,479 lít khí O2 (đktc),",
  "choices": [
   "16,6 gam.",
   "13,4 gam.",
   "22,2 gam.",
   "14,8 gam."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Định luật (định lý) nào sau đây được ứng dụng nhiều trong bộ môn hoá học lớp 8:",
  "choices": [
   "Định luật bảo toàn năng lượng.",
   "Định lý Pytago.",
   "Định luật bảo toàn động lượng.",
   "Định luật bảo toàn khối lượng."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Đốt cháy m gam chất Y cần dùng 3,2 g Oxygen thu được 2,2 gam khí CO2 và 1,8 g H2O. Khối lượng m có giá trị nào sau đây:",
  "choices": [
   "1,9 g",
   "1,7 g",
   "0,8 g",
   "0,9 g"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Đốt cháy 1,6 g chất M cần 6,4 g khí Oxygen và thu được khí CO2 và hơi nước theo tỉ lệ mCO2 : mH2O = 11 : 9. Khối lượng của CO2 và H2O lần lượt là:",
  "choices": [
   "3,4 g và 4,6 g",
   "4,4 g và 3,6 g",
   "5 g và 3 g",
   "4,2 g và 3,8 g"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Đốt cháy 4 g chất M cần 12,8 g khí Oxygen và thu được khí CO2 và hơi nước theo tỉ lệ mCO2 : mH2O = 11 : 3. Khối lượng của CO2 và H2O lần lượt là:",
  "choices": [
   "11g và 3g",
   "13,2 g và 3,6g",
   "12,32g và 3,36",
   "5,5 g và 1,5 g"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Khi nung đá vôi tới 90% khối lượng (chính bằng phần trăm chứa Calcium carbonate) thu",
  "choices": [
   "18 tấn",
   "20 tấn",
   "22,22 tấn",
   "33,33 tấn"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Người ta dùng 980 kg than để đốt lò chạy máy. Sau khi lò nguội, thấy còn 98 kg than",
  "choices": [
   "90%",
   "75%",
   "25%",
   "10%"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Calcium carbonate là thành phần chính của đá vôi. Khi nung đá vôi xảy ra phản ứng hoá học sau:",
  "choices": [
   "89,3%",
   "88,3%",
   "98,3%",
   "83,9%"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 5. Định luật bảo toàn khối lượng và PTHH",
  "content": "Đốt cháy hoàn toàn 4,5 gam kim loại Mg trong khí oxygen, sau phản ứng được 7,5 gam hợp chất MgO. Khối lượng của Oxygen đã tham gia phản ứng là",
  "choices": [
   "12,0 gam.",
   "3,0 gam.",
   "4,5 gam.",
   "5,5 gam."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 6. Tính theo phương trình hóa học",
  "content": "Cho 13,7 g Ba tác dụng với 3,2 g Oxygen thu được hợp chất Oxide. Tính khối lượng Oxygen sau phản ứng",
  "choices": [
   "3,2 g",
   "1,6 g",
   "6,4 g",
   "0,8 g"
  ],
  "correctIndex": 1,
  "explanation": "nBa = 13,7/137 = 0,1 mol, nO2 = 3,2/32 = 0,1 mol Phương trình hóa học 2Ba + O2 2BaO Ban đầu: 0,1 0,1 (mol) Phản ứng: 0,1 0,05 0,1 (mol) Sau phản ứng: 0 0,05 0,1 (mol) Khối lượng Oxygen sau phản ứng là m = 0,05.32 = 1,6 g",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 6. Tính theo phương trình hóa học",
  "content": "Cho 19,6 g H2SO4 phản ứng với thanh aluminium thấy có khí bay lên. Xác định thể tích",
  "choices": [
   "4,8 l",
   "2,479 l",
   "4,958 l",
   "0,345 l"
  ],
  "correctIndex": 2,
  "explanation": "nH2SO4 = 19,6/98 = 0,2 mol Phương trình hóa học 2Al + 3H2SO4 → Al2(SO4)3 + 3H2 0,2 0,2 VH2 = 0,2.24,79 = 4,958 lít",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 6. Tính theo phương trình hóa học",
  "content": "Tính thể tích của Oxygen (đktc) cần dùng để đốt cháy hết 3,1 gam P. Tính khối lượng của chất tạo thành sau phản ứng.",
  "choices": [
   "6,3g.",
   "7,1g.",
   "10g.",
   "12,3g."
  ],
  "correctIndex": 1,
  "explanation": "Số mol P phản ứng là: nP= 3,1/31 = 0,1mol Phương trình hóa học: 4P + 5O2 2P2O5 Tỉ lệ theo phương trình: 4 mol 5 mol 2 mol Số mol phản ứng: 0,1 mol ? mol ? mol Nhân chéo chia ngang ta được: nO2= 0,1.54 = 0,125 mol => Thể tích Oxygen cần dùng là: V = 24,79.n = 24,79.0,125 = 2,8 lít nP2O5 = 0,1.2/4= 0,05 mol => mP2O5 = 7,1 gam",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 6. Tính theo phương trình hóa học",
  "content": "Hòa tan hết 17,05 gam hỗn hợp Al và Zn cần vừa đủ 124,1 gam dung dịch HCl 25% thu",
  "choices": [
   "72,4%.",
   "73,8%.",
   "76,2%.",
   "79,8%."
  ],
  "correctIndex": 2,
  "explanation": "mHCl = 124,1.25% = 31,025 gam ⟹ nHCl = 31,025 : 36,5 = 0,85 mol Đặt nZn = x mol; nAl = y mol mhh = 65x + 27y = 17,05 (1) Zn + 2HCl → ZnCl2 + H2 x → 2x (mol) 2Al + 6HCl → 2AlCl3 + 3H2. y → 3y (mol) ⟹ nHCl = 2x + 3y = 0,85 (2) Từ (1) và (2) ⟹ x = 0,2; y = 0,15 ⟹ mZn = 65.0,2 = 13 gam ⟹ %mZn = 13 17,05 .100%= 76,2%",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 6. Tính theo phương trình hóa học",
  "content": "Hòa tan hết 21,6 gam hỗn hợp Mg và Fe trong dung dịch HCl thu được dung dịch muối và 12,395 lít khí H2 (đktc). Phần trăm khối lượng Mg là",
  "choices": [
   "11,1%.",
   "22,2%.",
   "34,4%.",
   "40%."
  ],
  "correctIndex": 1,
  "explanation": "nH2 = 11,2 = 0,5 mol 22,4 Đặt nMg = x mol; nFe = y mol ⟹ mhh = 24x + 56y = 21,6 (1) Mg + H2SO4 → MgSO4 + H2 → x Fe + H2SO4 → FeSO4 + H2 → y ⟹ nH2 = x + y = 0,5 (2) Từ (1) và (2) ⟹ x = 0,2; y = 0,3 ⟹ mMg = 24.0,2 = 4,8 gam ⟹ %mMg = 4,8 .100% = 22,2%. 21,6",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 6. Tính theo phương trình hóa học",
  "content": "Cho 11,3 gam hỗn hợp Mg và Zn tác dụng với H2SO4 loãng vừa đủ thu được 7,437 lít khí H2 (ở đktc). Cô cạn dung dịch sau phản ứng thu được lượng muối khan là",
  "choices": [
   "31g.",
   "40g.",
   "40,1g.",
   "37,5g."
  ],
  "correctIndex": 2,
  "explanation": "Phương trình phản ứng hóa học: Mg + H2SO4 → MgSO4+ H2 Zn + H2SO4 → ZnSO4 + H2 Ta có: nH2 = 7,437/24,79 = 0,3 (mol) => mH2 = 0,3 . 2 = 0,6 (gam) Theo PTHH, ta thấy nH2SO4 = nH2 = 0,3 (mol) => mH2SO4 = 0,3 . 98 = 29,4 (gam) Áp dụng định luật bảo toàn khối lượng, ta có: mmuối khan = mkim loại + mH2SO4 - mH2 = 11,3 + 29,4 - 0,6 = 40,1 (gam)",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 6. Tính theo phương trình hóa học",
  "content": "Đốt cháy hoàn toàn 1,2375 lít khí CH4 (đktc) cần dùng V lít khí O2 (đktc), sau phản ứng thu được sản phẩm là khí carbon dioxide (CO2) và hơi nước (H2O). Giá trị của V là",
  "choices": [
   "2,479",
   "1,2375",
   "3,7185",
   "4,958"
  ],
  "correctIndex": 0,
  "explanation": "Phương trình phản ứng: CH4 + 2O2 → CO2 + 2H2O Theo phương trình: Cứ 1 mol CH4 tham gia phản ứng sẽ cần 2 mol khí O2. Vậy 0,05 mol CH4 tham gia phản ứng sẽ cần 0,1 mol khí O2. VO2=n.24,79=0,1.24,79=2,479 (lít)",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 6. Tính theo phương trình hóa học",
  "content": "Cho 6,4 gam S cháy trong không khí thấy có khí A có khả năng làm mất màu cánh hoa hồng. Thể tích của khí A ở điều kiện tiêu chuẩn là",
  "choices": [
   "1,2375 ml",
   "4,958 lít",
   "12,395 ml",
   "1,2375 lít"
  ],
  "correctIndex": 1,
  "explanation": "Phương trình hóa học: S + O2 → SO2 Theo phương trình: Cứ 1 mol S tham gia phản ứng sẽ tạo ra 1 mol khí SO2. Vậy 0,2 mol S tham gia phản ứng sẽ tạo ra 0,2 mol khí SO2 = n. 24,79 = 0,2. 24,79 = 4,958 lít.",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 6. Tính theo phương trình hóa học",
  "content": "Để tác dụng hết với 5,75 gam Na thì khối lượng HCl có trong dung dịch cần dùng là",
  "choices": [
   "2,92 gam",
   "3,65 gam",
   "7,3 gam",
   "9,125 gam"
  ],
  "correctIndex": 3,
  "explanation": "Phương trình hóa học: 2Na + 2HCl→ 2NaCl + H2 Theo phương trình: Cứ 2 mol Na tham gia phản ứng sẽ cần 2 mol HCl. Vậy 0,25 mol Na tham gia phản ứng sẽ cần 0,25 mol HCl. mHCl = 0,25. (1 + 35,5) = 9,125 gam.",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương I. Phản ứng hóa học",
  "topic": "Bài 7. Tốc độ phản ứng và chất xúc tác",
  "content": "Khi diện tích bề mặt tăng, tốc độ phản ứng tăng là đúng với phản ứng có chất nào tham gia?",
  "choices": [
   "Chất lỏng",
   "Chất rắn",
   "Chất khí",
   "Cả 3 đều đúng"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 8. Acid",
  "content": "Cho dãy các acid sau: HCl, HNO3, H2SO3, H2CO3, H3PO4, H3PO3, HNO2. Số acid có ít nguyên tử Oxygen là",
  "choices": [
   "2",
   "3",
   "4",
   "5"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 8. Acid",
  "content": "Gốc acid của acid HNO3 có hóa trị mấy?",
  "choices": [
   "II",
   "III",
   "I",
   "IV"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Hợp chất nào sau đây là base?",
  "choices": [
   "Đồng (II) nitrate",
   "Potassium chloride",
   "Iron (II) sulfate",
   "Calcium hydroxide"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Cho các chất sau: NaCl, HCl, H2SO4, Ba(OH)2, Ca(OH)2, Mg(OH)2, K2CO3, AlCl3, NaOH. Số các chất có khả năng làm quỳ ẩm chuyển xanh là",
  "choices": [
   "2.",
   "3",
   "4",
   "5"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Phương trình hóa học biểu diễn quá trình CaO → Ca(OH)2 là",
  "choices": [
   "2CaO + H2 → 2Ca(OH)2",
   "CaO + H2O → Ca(OH)2",
   "CaO + 2H2O → Ca(OH)2 + H2",
   "2CaO + O2 + 2H2 → 2Ca(OH)2"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Tên gọi của Al(OH)3 là:",
  "choices": [
   "aluminium (III) Hydroxide.",
   "aluminium Hydroxide.",
   "aluminium (III) Oxide.",
   "aluminium Oxide."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Để nhận biết HCl, NaOH, MgSO4 ta dùng:",
  "choices": [
   "Quỳ tím",
   "Phenolphthalein",
   "Kim loại",
   "Phi kim"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Dãy các chất nào sau đây đều là hydroxide lưỡng tính ?",
  "choices": [
   "Zn(OH)2, Cu(OH)2.",
   "Al(OH)3, Cr(OH)2.",
   "Sn(OH)2, Pb(OH)2.",
   "Cả A, B, C."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Khi cho 100ml dung dịch NaOH 1M vào 100 ml dung dịch HNO3 xM, thu được dung dịch có chứa 7,6 gam chất tan. Giá trị của x là",
  "choices": [
   "1,2.",
   "0,8.",
   "0,6.",
   "0,5."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Theo thuyết A-rê-ni-ut, kết luận nào sau đây đúng?",
  "choices": [
   "base là chất khi tan trong nước phân li cho anion.",
   "base là những chất có khả năng phản ứng với acid.",
   "Một base không nhất thiết phải có nhóm OH trong thành phần phân tử.",
   "base là hợp chất trong thành phần phân tử có một hay nhiều nhóm OH."
  ],
  "correctIndex": 0,
  "explanation": "Theo thuyết A-rê-ni-ut, base là chất khi tan trong nước phân li cho anion.",
  "difficulty": "THONG_HIEU"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Dung dịch KOH không có tính chất hoá học nào sau đây?",
  "choices": [
   "Làm quỳ tím hoá xanh",
   "Tác dụng với Oxide acid tạo thành muối và nước",
   "Tác dụng với acid tạo thành muối và nước",
   "Bị nhiệt phân huỷ tạo ra Oxide base và nước"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Base tan và không tan có tính chất hoá học chung là:",
  "choices": [
   "Làm quỳ tím hoá xanh",
   "Tác dụng với Oxide acid tạo thành muối và nước",
   "Tác dụng với acid tạo thành muối và nước",
   "Bị nhiệt phân huỷ tạo ra Oxide base và nước"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Chỉ dùng nước có thể nhận biết chất rắn nào trong 4 chất rắn sau đây:",
  "choices": [
   "Zn(OH)2",
   "Fe(OH)2",
   "NaOH",
   "Al(OH)3"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Phản ứng hoá học nào sau đây tạo ra Oxide base ?",
  "choices": [
   "Cho dd Ca(OH)2 phản ứng với SO2",
   "Cho dd NaOH phản ứng với dd H2SO4",
   "Cho dd Cu(OH)2 phản ứng với HCl",
   "Nung nóng Cu(OH)2"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Dãy chất nào sau đây chỉ gồm các hydroxide lưỡng tính ?",
  "choices": [
   "Al(OH)3, Zn(OH)2,Fe(OH)2",
   "Zn(OH)2, Sn(OH)2, Pb(OH)2",
   "Al(OH)3, Fe(OH)2,Cu(OH)2",
   "Mg(OH)2, Pb(OH)2, Cu(OH)2"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Cần bao nhiêu ml dung dịch NaOH 0,5M để phản ứng vừa đủ với 50 ml dung dịch NaHCO3 0,2M ?",
  "choices": [
   "100 ml.",
   "50 ml.",
   "40 ml.",
   "20 ml."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Đặc điểm phân li Zn(OH)2 trong nước là",
  "choices": [
   "theo kiểu base.",
   "vừa theo kiểu acid vừa theo kiểu base.",
   "theo kiểu acid.",
   "không phân li."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Khí amoniac làm giấy quỳ tím ẩm",
  "choices": [
   "chuyển thành màu đỏ.",
   "chuyển thành màu xanh.",
   "không đổi màu.",
   "mất màu."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Cho 200 ml dung dịch NaOH 0,1M vào 200 ml dung dịch FeCl2 0,2M thu được m gam kết tủa. Giá trị của m là",
  "choices": [
   "0,9.",
   "3,6.",
   "1,8.",
   "0,45."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Hiện tượng nào sau đây xảy ra khi cho từ từ dung dịch kiềm vào dung dịch ZnSO4 cho",
  "choices": [
   "Xuất hiện kết tủa trắng không tan",
   "Xuất hiện kết tủa trắng sau đó tan hết",
   "Xuất hiện kết tủa xanh sau đó tan hết",
   "Có khí mùi xốc bay ra Bài 31. Cần bao nhiêu ml dung dịch NaOH 0,5M để phản ứng vừa đủ với 50 ml dung dịch NaHCO3 0,2M ? A. 100 ml. B. 50 ml. C. 40 ml. D. 20 ml."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Cho 1g NaOH rắn tác dụng với dung dịch chứa 1g HNO3. Dung dịch sau phản ứng có",
  "choices": [
   "Trung tính",
   "Base",
   "Acid",
   "Lưỡng tính"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "NaOH có thể làm khô chất khí ẩm sau:",
  "choices": [
   "CO2",
   "SO2",
   "N2",
   "HCl"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Để nhận biết dd KOH và dd Ba(OH)2 ta dùng thuốc thử là:",
  "choices": [
   "Phenolphtalein",
   "Quỳ tím",
   "dd H2SO4",
   "dd HCl"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Cặp chất tồn tại trong một dung dịch (chúng không phản ứng với nhau):",
  "choices": [
   "KOH và NaCl",
   "KOH và HCl",
   "KOH và MgCl2",
   "KOH và Al(OH)3"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Cho vài giọt dd Phenolphtalein không màu vào dung dịch NaOH. Hiện tượng xảy ra là:",
  "choices": [
   "dd không màu",
   "dd màu xanh",
   "kết tủa trắng",
   "dd màu hồng"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Cho 100ml dung dịch Ba(OH)2 0,1M vào 100ml dung dịch HCl 0,1M. Dung dịch thu",
  "choices": [
   "Làm quỳ tím hoá xanh",
   "Làm quỳ tím hoá đỏ",
   "Phản ứng được với magnessium giải phóng khí hydrogen",
   "Không làm đổi màu quỳ tím"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Nhiệt phân hoàn toàn x gam Fe(OH)3 đến khối lượng không đổi thu được 24 gam chất rắn. Giá trị bằng số của x là:",
  "choices": [
   "16,05 gam",
   "32,10 gam",
   "48,15 gam",
   "72,25"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Cho dung dịch chứa 0,9 mol NaOH vào dung dịch có chứa a mol H3PO4. Sau phản ứng chỉ thu được muối Na3PO4 và H2O. Giá trị của a là:",
  "choices": [
   "0,3 mol",
   "0,4 mol",
   "0,6 mol",
   "0,9 mol"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Cho các chất dưới đây, dãy chất nào toàn là dung dịch kiềm?",
  "choices": [
   "KOH, Mg(OH)2, Ba(OH)2, NaOH.",
   "KOH, Ca(OH)2, Ba(OH)2, NaOH.",
   "KOH, Mg(OH)2, Ba(OH)2, Fe(OH)2.",
   "Cu(OH)2, Mg(OH)2, Ba(OH)2, NaOH."
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Bài 9. Base - Thang pH",
  "content": "Dung dịch nào sau đây làm quỳ tím chuyển sang màu xanh?",
  "choices": [
   "HCl.",
   "Ca(OH)2",
   "MgCl2.",
   "H2SO4"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Đáp án nào dưới đây có tên gọi đúng với công thức của Oxide?",
  "choices": [
   "CO: carbon(II) Oxide",
   "CuO: đồng(II) Oxide",
   "FeO: Iron(III) Oxide",
   "CaO: Calcium triOxide"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Oxide phi kim nào dưới đây không phải là Oxide acid?",
  "choices": [
   "CO2",
   "CO",
   "SiO2",
   "Cl2O"
  ],
  "correctIndex": 1,
  "explanation": "CO là Oxide trung tính.",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Oxide nào dưới đây không phải là Oxide acid?",
  "choices": [
   "SO2",
   "SO3",
   "FeO",
   "N2O5"
  ],
  "correctIndex": 2,
  "explanation": "FeO là Oxide base.",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Oxide nào dưới đây góp nhiều phần nhất vào sự hình thành mưa acid?",
  "choices": [
   "CO2 (carbon dioxide)",
   "CO (carbon Oxide)",
   "SO2 (Sulfur dioxide)",
   "SnO2 (thiếc dioxide)"
  ],
  "correctIndex": 2,
  "explanation": "Trong 4 Oxide kể trên, Oxide góp nhiều phần nhất vào sự hình thành mưa acid là SO2.",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Thiếc có thể có hoá trị II hoặc IV. Hợp chất có công thức SnO2 có tên là",
  "choices": [
   "Thiếc penta Oxide",
   "Thiếc Oxide",
   "Thiếc(II) Oxide",
   "Thiếc(IV) Oxide"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Công thức hóa học của Oxide tạo bởi C và oxygen, trong đó C có hóa trị IV là",
  "choices": [
   "CO",
   "C2O",
   "CO3",
   "CO2"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Công thức hóa học của Oxide tạo bởi N và oxygen, trong đó N có hóa trị V là",
  "choices": [
   "NO",
   "N2O",
   "N2O5",
   "N2O3"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Công thức hóa học của Oxide tạo bởi Al và oxygen, trong đó Al có hóa trị III là",
  "choices": [
   "Al2O3",
   "Al3O2",
   "AlO",
   "AlO3"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Công thức Fe2O3 có tên gọi là gì?",
  "choices": [
   "Iron Oxide.",
   "Iron (II) Oxide.",
   "Iron (III) Oxide.",
   "Iron từ Oxide."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "ZnO thuộc loại Oxide gì?",
  "choices": [
   "Oxide acid.",
   "Oxide base.",
   "Oxide trung tính.",
   "Oxide lưỡng tính."
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Hợp chất nào sau đây không phải là Oxide?",
  "choices": [
   "CO2",
   "SO2",
   "CuO",
   "Na2S"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Oxide nào sau đây là Oxide acid?",
  "choices": [
   "CuO",
   "Na2O",
   "CO2",
   "CaO"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Cho các công thức Oxide sau: CaO, CuO, NaO, CO2, CO3. Công thức Oxide viết sai là",
  "choices": [
   "CaO, CuO",
   "NaO, CaO",
   "NaO, CO3",
   "CuO, CO3"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Chỉ ra các Oxide base: P2O5, CaO, CuO, BaO, Na2O, P2O3",
  "choices": [
   "P2O5, CaO, CuO",
   "CaO, CuO, BaO, Na2O",
   "BaO, Na2O, P2O3",
   "P2O5, CaO, P2O3"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Chỉ ra Oxide acid: : P2O5, CaO, CuO, BaO, SO2, CO2",
  "choices": [
   "P2O5, CaO, CuO, BaO",
   "BaO, SO2, CO2",
   "CaO, CuO, BaO",
   "SO2, CO2, P2O5"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Chất nào sau đây là Oxide acid:",
  "choices": [
   "SO2.",
   "Al2O3.",
   "HCl.",
   "BaCO3."
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Oxide",
  "content": "Cách đọc tên nào sau đây sai?",
  "choices": [
   "CO2: carbon (II) Oxide",
   "CuO: đồng (II) Oxide",
   "FeO: Iron (II) Oxide",
   "CaO: Calcium Oxide"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Muối",
  "content": "Trong các chất sau: NaCl, HCl, CaO, CuSO4, Ba(OH)2, KHCO3. Số chất thuộc hợp chất muối là",
  "choices": [
   "2",
   "3",
   "4",
   "1"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Muối",
  "content": "Dãy chất nào chỉ toàn bao gồm muối:",
  "choices": [
   "MgCl2; Na2SO4; KNO3",
   "Na2CO3; H2SO4; Ba(OH)2",
   "CaSO4; HCl; MgCO3",
   "H2O; Na3PO4; KOH"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Muối",
  "content": "Công thức hóa học của muối Iron (III) chloride là",
  "choices": [
   "FeCl.",
   "Fe3Cl.",
   "FeCl3.",
   "Fe3Cl2."
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Muối",
  "content": "Công thức của bạc chloride là:",
  "choices": [
   "AgCl2",
   "Ag2Cl",
   "Ag2Cl3",
   "AgCl"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Muối",
  "content": "Cho các chất sau: CaO, H2SO4, HCl, KOH, Fe(OH)2, FeSO4, CaSO4, HNO3, LiOH,",
  "choices": [
   "3",
   "4",
   "5",
   "6"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Muối",
  "content": "Hợp chất nào sau đây không phải là muối?",
  "choices": [
   "Đồng (II) nitrate",
   "potassium chloride",
   "Iron (II) sulfate",
   "Magnesium hydroxide"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Muối",
  "content": "Cho dãy các chất sau: Na2SO3, K2SO4, CuS, CuSO4, Na3PO4, KHSO4, CaCl2, BaHPO4, FeCl3, Ca3(PO4)2. Có bao nhiêu muối acid?",
  "choices": [
   "1",
   "2",
   "3",
   "4"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Muối",
  "content": "Trong số những chất có công thức hoá học dưới đây, chất nào làm cho quì tím không đổi màu?",
  "choices": [
   "HNO3",
   "NaOH",
   "Ca(OH)2",
   "NaCl"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phân bón dạng đơn gồm",
  "choices": [
   "Phân đạm (chứa N).",
   "Phân lân (chứa P).",
   "Phân potassium (chứa K).",
   "Cả A, B, C đều đúng."
  ],
  "correctIndex": 2,
  "explanation": "Dung dịch acid làm đổi màu quỳ tím thành đỏ: HCl, H2SO4, H3PO4, HNO3, H3PO3.",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Trong các loại phân bón sau, phân bón hóa học kép là",
  "choices": [
   "NH4NO3",
   "K2SO4",
   "(NH4)2SO4",
   "KNO3"
  ],
  "correctIndex": 3,
  "explanation": "KNO3 chứa hai nguyên tố dinh dưỡng chính là N và K nên là phân bón hóa học kép.",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Cho 12 gam NaOH vào dung dịch NH4NO3 dư thì thể tích thoát ra ở đktc là",
  "choices": [
   "7,437 lít",
   "7,40 lít",
   "8,20 lít",
   "5,65 lít"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Trong các loại phân bón hoá học sau loại nào là phân đạm?",
  "choices": [
   "Ca3(PO4)2",
   "NH4NO3",
   "KCl",
   "K2SO4"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phần trăm về khối lượng của nguyên tố N trong NH4NO3 là",
  "choices": [
   "20%",
   "25%",
   "30%",
   "35%"
  ],
  "correctIndex": 2,
  "explanation": "Theo thuyết A-rê-ni-ut, base là chất khi tan trong nước phân li cho anion.",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phân bón NPK là hỗn hợp của",
  "choices": [
   "NH4H2PO4, KNO3",
   "(NH4)3PO4, KNO3",
   "(NH4)2HPO4, NaNO3",
   "(NH4)2HPO4, KNO3"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Các loại phân lân đều cung cấp cho cây trồng nguyên tố",
  "choices": [
   "Nitrogen",
   "Carbon",
   "Potassium",
   "Phosphorus"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Khối lượng của nguyên tố N có trong 100 gam (NH2)2CO là",
  "choices": [
   "46,67 gam",
   "63,64 gam",
   "32,33 gam",
   "31,33 gam"
  ],
  "correctIndex": 0,
  "explanation": "Giải thích:",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Để phân biệt 2 loại phân bón hoá học là: NH4NO3 và NH4Cl. Ta dùng dung dịch:",
  "choices": [
   "KOH",
   "Ca(OH)2",
   "AgNO3",
   "BaCl2"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Để tăng năng suất cây trồng ta cần phải",
  "choices": [
   "Chọn giống tốt",
   "Chọn đất trồng",
   "Chăm sóc (bón phân; làm cỏ...)",
   "Cả A, B, C"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Trong các loại phân bón sau, phân bón hóa học đơn là",
  "choices": [
   "NH4H2PO4",
   "KNO3",
   "NH4NO3",
   "(NH4)2HPO4"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Cho 0,6 mol Ba(OH)2 vào dung dịch NH4NO3 dư thì thể tích thoát ra ở đktc là",
  "choices": [
   "14,874 lít",
   "29,748 lít",
   "10,04 lít",
   "12,56 lít"
  ],
  "correctIndex": 1,
  "explanation": "CO là Oxide trung tính.",
  "difficulty": "VAN_DUNG"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Để nhận biết 2 loại phân bón hoá học là: NH4NO3 và NH4Cl. Ta dùng dung dịch:",
  "choices": [
   "NaOH",
   "Ba(OH)2",
   "AgNO3",
   "BaCl2"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Để nhận biết dung dịch NH4NO3 , Ca3(PO4)2 , KCl người ta dùng dung dịch :",
  "choices": [
   "NaOH",
   "Ba(OH)2",
   "KOH",
   "Na2CO3"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phân bón nitrophotka (NPK) là hỗn hợp của",
  "choices": [
   "(NH4)2HPO4 , KNO3",
   "(NH4)2HPO4, NaNO3",
   "(NH4)3PO4 , KNO3",
   "NH4H2PO4 , KNO3"
  ],
  "correctIndex": 1,
  "explanation": "Phân bón kép là phân bón có chứa 2 hoặc 3 nguyên tố dinh dưỡng chính N, P, K.",
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phân bón nào sau đây làm tăng độ chua của đất?",
  "choices": [
   "KCl.",
   "NH4NO3.",
   "NaNO3.",
   "K2CO3"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Để đánh giá chất lượng phân đạm, người ta dựa vào chỉ số",
  "choices": [
   "% khối lượng NO có trong phân",
   "% khối lượng HNO3 có trong phân",
   "% khối lượng N có trong phân",
   "% khối lượng NH3 có trong phân"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phần trăm về khối lượng của nguyên tố N trong (NH2)2CO là",
  "choices": [
   "32,33%",
   "31,81%",
   "46,67%",
   "63,64%"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phân đạm giúp cho cây phát triển nhanh, cho nhiều hạt, củ, quả. Hiện nay người ta chủ yếu sử dụng đạm Urea để bón cho cây trồng. Công thức phân tử của đạm Urea là:",
  "choices": [
   "NaNO3",
   "(NH2)2CO",
   "NH4NO3",
   "NH4Cl"
  ],
  "correctIndex": 3,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phân đạm ure thường chỉ chứa 46% N về khối lượng. Khối lượng phân ure đủ để cung cấp 64 kg N là",
  "choices": [
   "139,1 kg",
   "152,2kg",
   "160,9 kg",
   "200,0 kg"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Trong các loại phân bón: NH4Cl, (NH2)2CO, (NH4)2SO4, NH4NO3. Phân nào có hàm lượng đạm cao nhất?",
  "choices": [
   "(NH4)2CO3",
   "(NH4)2SO4",
   "NH4NO3",
   "(NH2)2CO"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Thành phần hóa học chính của phân lân Superphosphate kép là",
  "choices": [
   "Ca3(PO4)2",
   "Ca(H2PO4)2",
   "CaHPO4",
   "Ca(H2PO4)2 và CaSO4"
  ],
  "correctIndex": 0,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Ứng dụng phổ biến nhất của amoni nitrate là làm phân bón, thuốc nổ quân sự. Amoni nitrate có công thức hóa học là",
  "choices": [
   "NH4NO2",
   "(NH4)2NO3",
   "NH4NO3",
   "(NH4)2NO2"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phát biểu nào sau đây là đúng:",
  "choices": [
   "Thành phần chính của Superphosphate kép gồm Ca(H2PO4)2 và H3PO4",
   "Urea có công thức là (NH2)2CO",
   "Superphosphate đơn chỉ có Ca(H2PO4)2",
   "Phân lân cung cấp Nitrogen cho cây trồng"
  ],
  "correctIndex": 1,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 },
 {
  "chapterTitle": "Chương II. Một số hợp chất thông dụng",
  "topic": "Phân bón hóa học",
  "content": "Phân bón hóa học: Đạm, Lân, potassium lần lượt được đánh giá theo chỉ số nào:",
  "choices": [
   "Hàm lượng % số mol: N, P2O5, K2O",
   "Hàm lượng % khối lượng: N, P, K",
   "Hàm lượng % khối lượng: N, P2O5, K2O",
   "Hàm lượng % khối lượng: N2O5, P2O5, K2O"
  ],
  "correctIndex": 2,
  "explanation": null,
  "difficulty": "NHAN_BIET"
 }
];

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 80);
}

async function main() {
  const chapters = await prisma.chapter.findMany({ where: { grade: 8 } });
  const byTitle = new Map(chapters.map((c) => [c.title, c]));

  let added = 0, skipped = 0;
  for (const chapterTitle of [...new Set(QUESTIONS.map((q) => q.chapterTitle))]) {
    const chapter = byTitle.get(chapterTitle);
    if (!chapter) {
      console.error(`Không tìm thấy chương "${chapterTitle}" (grade 8) — bỏ qua nhóm này.`);
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
        source: `KHTN 8 - Tài liệu học tập 2024 — ${q.topic}`,
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
