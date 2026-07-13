import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AJ: bài tập mining từ KHTN 9 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx (Tài liệu/Lớp 6-9 (THCS)/
// Mới upload (Lớp 6,7,8,9)/). Tài liệu này KHÔNG có bảng đáp án — mọi đáp án được tự giải bằng kiến
// thức hóa học (định nghĩa hợp chất hữu cơ/hydrocarbon, alkane/alkene, dãy đồng đẳng, phản ứng cháy/
// cộng/trùng hợp, tính %khối lượng nguyên tố, xác định CTPT từ tỉ khối hơi/thành phần %, nhiên liệu)
// và kiểm chứng lại trước khi đưa vào (nhiều bài toán đốt cháy có thể tích khí ở "đkc" theo chuẩn mới
// 24,79 L/mol — đã kiểm tra khớp số mol qua cân bằng khối lượng nguyên tố trước khi chấp nhận).
// Chỉ mining chương "Hydrocarbon và nguồn nhiên liệu" (Bài 22-25: Giới thiệu hợp chất hữu cơ, Alkane,
// Alkene, Nguồn nhiên liệu) trong đợt này — 2 chương còn lại của Lớp 9 (Ethylic alcohol-Acetic acid,
// Lipid-Carbohydrate-Protein-Polymer) để lại cho đợt tiếp theo.
// Đã loại khi đọc: câu thiếu lựa chọn/dữ liệu do lỗi trích xuất docx (VD Bài 22 Câu 20,36-38,40,41,
// 56,57; Bài 23 Câu 7-9,30; Bài 24 Câu 5,23; Ôn tập Câu 18-21,28,31,40), câu trùng lặp nội dung với
// câu đã chọn trong cùng đợt (Ôn tập Câu 14,38,39,41,42), câu phụ thuộc hình ảnh không có trong text
// (Bài 24 Câu 5, Ôn tập Câu 31).
// Đích: ngân hàng luyện tập /practice (PracticeQuestion) Chương 7 Lớp 9.
const CHAPTER_ID = "cmrel0mys0003vhd8pi27tfy4"; // Lớp 9 - Chương 7. Hydrocarbon và nguồn nhiên liệu

const QUESTIONS = [
  // ==================== Bài 22. Giới thiệu về hợp chất hữu cơ ====================
  {
    content: "Chất hữu cơ là",
    choices: [
      "Hợp chất khó tan trong nước.",
      "Hợp chất của cacbon và một số nguyên tố khác trừ N, Cl, O.",
      "Hợp chất của cacbon trừ CO, CO2, H2CO3, muối carbonate kim loại.",
      "Hợp chất có nhiệt độ sôi cao.",
    ],
    correctIndex: 2,
    explanation: "Hợp chất hữu cơ là hợp chất của carbon, trừ một số hợp chất đơn giản như CO, CO2, H2CO3, muối carbonate, muối carbide,... (được xếp vào hợp chất vô cơ).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Thành phần các nguyên tố trong hợp chất hữu cơ",
    choices: [
      "nhất thiết phải có carbon, thường có H, hay gặp O, N sau đó đến halogen, S, P...",
      "gồm có C, H và các nguyên tố khác.",
      "bao gồm tất cả các nguyên tố trong bảng tuần hoàn.",
      "thường có C, H hay gặp O, N, sau đó đến halogen, S, P.",
    ],
    correctIndex: 0,
    explanation: "Carbon là nguyên tố bắt buộc phải có trong hợp chất hữu cơ (nhất thiết phải có), hydrogen thường có, còn oxygen/nitrogen/halogen/S/P chỉ hay gặp chứ không bắt buộc.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong thành phần phân tử hợp chất hữu cơ nhất thiết phải có nguyên tố",
    choices: ["carbon.", "hydrogen.", "oxygen.", "nitrogen."],
    correctIndex: 0,
    explanation: "Carbon là nguyên tố bắt buộc phải có trong mọi hợp chất hữu cơ; hydrogen, oxygen, nitrogen chỉ thường gặp chứ không bắt buộc.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây không thuộc loại chất hữu cơ?",
    choices: ["CH3Cl.", "CH4.", "CO.", "CH3COONa."],
    correctIndex: 2,
    explanation: "CO (carbon monoxide) là một trong các hợp chất của carbon bị loại trừ khỏi nhóm hữu cơ, được xếp vào hợp chất vô cơ.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dãy các hợp chất nào sau đây là hợp chất hữu cơ?",
    choices: [
      "CH4, C2H6, CO2.",
      "C6H6, CH4, C2H5OH.",
      "CH4, C2H2, CO.",
      "C2H2, C2H6O, BaCO3.",
    ],
    correctIndex: 1,
    explanation: "C6H6, CH4, C2H5OH đều là hợp chất hữu cơ. Các dãy còn lại đều lẫn một chất vô cơ (CO2, CO, BaCO3).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhóm các chất đều gồm các hợp chất hữu cơ là",
    choices: [
      "K2CO3, CH3COOH, C2H6, C2H6O.",
      "C6H6, Ca(HCO3)2, C2H5Cl, CH3OH.",
      "CH3Cl, C2H6O, C3H8, CH3COONa.",
      "C2H4, CH4, C3H7Br, CO2.",
    ],
    correctIndex: 2,
    explanation: "CH3Cl, C2H6O, C3H8, CH3COONa đều là hợp chất hữu cơ. Các dãy còn lại lẫn muối/oxide vô cơ (K2CO3, Ca(HCO3)2, CO2).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Điều khẳng định nào sau đây không đúng?",
    choices: [
      "Chất hữu cơ nào cũng chứa carbon.",
      "Chất hữu cơ nào cũng chứa oxygen.",
      "Mỗi chất chỉ có một công thức cấu tạo.",
      "Công thức cấu tạo cho biết thành phần nguyên tử và trật tự liên kết các nguyên tử trong phân tử.",
    ],
    correctIndex: 1,
    explanation: "Không phải chất hữu cơ nào cũng chứa oxygen, ví dụ CH4, C2H6 chỉ có carbon và hydrogen.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hợp chất hữu cơ được chia thành mấy loại?",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 1,
    explanation: "Hợp chất hữu cơ được chia thành 2 loại: hydrocarbon (chỉ chứa C, H) và dẫn xuất của hydrocarbon (có thêm nguyên tố khác như O, N, Cl,...).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dãy các chất nào sau đây đều là hydrocarbon?",
    choices: [
      "C2H6, C4H10, C2H4.",
      "CH4, C2H2, C3H7Cl.",
      "C2H4, CH4, C2H5Cl.",
      "C2H6O, C3H8, C2H2.",
    ],
    correctIndex: 0,
    explanation: "C2H6, C4H10, C2H4 chỉ chứa hai nguyên tố C và H, đều là hydrocarbon. Các dãy còn lại có chất chứa Cl hoặc O (dẫn xuất của hydrocarbon).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy chất nào sau đây đều là hợp chất hydrocarbon?",
    choices: [
      "C2H6, CH4, C6H6, C2H4.",
      "CH4, CH3Cl, FeCl3, NaOH.",
      "C2H6O, CO2, Na2CO3, CH3NO2.",
      "C6H5NH2, C4H10, C5H12, C4H8.",
    ],
    correctIndex: 0,
    explanation: "C2H6, CH4, C6H6, C2H4 chỉ chứa C và H. Các dãy còn lại lẫn hợp chất vô cơ hoặc dẫn xuất chứa Cl/N/O.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy các chất nào sau đây đều là dẫn xuất của hydrocarbon?",
    choices: [
      "C2H6O, CH4, C2H2.",
      "C2H4, C3H7Cl, CH4.",
      "C2H6O, C3H7Cl, C2H5Cl.",
      "C2H6O, C3H8, C2H2.",
    ],
    correctIndex: 2,
    explanation: "C2H6O, C3H7Cl, C2H5Cl đều có thêm nguyên tố khác ngoài C, H (O hoặc Cl) nên là dẫn xuất của hydrocarbon. Các dãy còn lại lẫn hydrocarbon thuần (CH4, C2H2, C3H8).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy chất nào sau đây là dẫn xuất hydrocarbon?",
    choices: [
      "CH4, C2H5, C3H8, C5H12.",
      "C2H6O, CH4, C2H4O2, C2H6, C6H12O6.",
      "CH3Cl, C2H6O, C12H22O11, C15H31COOH.",
      "C6H12O6, C6H6, C6H5Cl, C4H9Cl.",
    ],
    correctIndex: 2,
    explanation: "CH3Cl, C2H6O, C12H22O11, C15H31COOH đều có nguyên tố khác ngoài C, H nên đều là dẫn xuất. Các dãy còn lại lẫn hydrocarbon thuần (CH4, C2H6, C6H6...).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy chất nào sau đây đều là hợp chất hữu cơ?",
    choices: [
      "C2H6O; C3H10N; CH4; C4H8; CO2; C6H12O6; C2H5Cl.",
      "C2H5Cl; C6H12O6; CH3COONa; C2H2Br4; CH4; C2H6O; C4H8.",
      "C2H6O; C4H8; H2S; C3H10N; C6H12O6; C2H2Br4.",
      "C2H6O; C4H8; CH4; C3H10N; C2H5Cl; C6H12O6; CH3COONa; C2H2Br4; CO2.",
    ],
    correctIndex: 1,
    explanation: "Dãy B toàn hợp chất hữu cơ. Các dãy A, D lẫn CO2 (vô cơ); dãy C lẫn H2S (vô cơ).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây thuộc loại chất hữu cơ?",
    choices: ["Al2C4.", "CH4.", "CO.", "Na2CO3."],
    correctIndex: 1,
    explanation: "CH4 là hợp chất hữu cơ. Aluminium carbide, CO và Na2CO3 đều được xếp vào hợp chất vô cơ theo quy ước loại trừ.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Liên kết hóa học trong phân tử chất hữu cơ chủ yếu là liên kết",
    choices: ["Cộng hóa trị.", "Ion.", "Kim loại.", "Hydrogen."],
    correctIndex: 0,
    explanation: "Các nguyên tử trong phân tử hợp chất hữu cơ liên kết với nhau chủ yếu bằng liên kết cộng hóa trị (dùng chung electron).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây trong phân tử có liên kết đôi?",
    choices: ["C2H4.", "C2H2.", "C3H8.", "C2H5OH."],
    correctIndex: 0,
    explanation: "C2H4 (ethylene) có một liên kết đôi C=C. C2H2 có liên kết ba; C3H8 và C2H5OH chỉ có liên kết đơn.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cấu tạo hóa học là",
    choices: [
      "Số lượng liên kết giữa các nguyên tử trong phân tử.",
      "Số lượng các nguyên tử trong phân tử.",
      "Thứ tự liên kết giữa các nguyên tử trong phân tử.",
      "Bản chất liên kết giữa các nguyên tử trong phân tử.",
    ],
    correctIndex: 2,
    explanation: "Cấu tạo hóa học là thứ tự liên kết giữa các nguyên tử trong phân tử — chính sự khác nhau về thứ tự này tạo nên các chất khác nhau dù cùng công thức phân tử (đồng phân).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây là hiđrocacbon?",
    choices: ["CH2O.", "C2H5Br.", "C6H6.", "CH3COOH."],
    correctIndex: 2,
    explanation: "C6H6 (benzene) chỉ chứa carbon và hydrogen nên là hydrocarbon. Các chất còn lại có thêm O hoặc Br, là dẫn xuất của hydrocarbon.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây là dẫn xuất của hydrocarbon?",
    choices: ["CH4.", "C2H6.", "C6H6.", "C3H6Br."],
    correctIndex: 3,
    explanation: "C3H6Br có thêm nguyên tố Br ngoài C, H nên là dẫn xuất của hydrocarbon; CH4, C2H6, C6H6 chỉ chứa C, H nên là hydrocarbon.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho các phát biểu sau: (1) Tất cả các hợp chất chứa cacbon đều là hợp chất hữu cơ. (2) Tất cả các hợp chất hữu cơ đều là hợp chất của carbon. (3) Hợp chất hữu cơ đều dễ bay hơi và dễ tan trong nước. (4) Hợp chất hữu cơ khi cháy đều sinh khí carbonic. Phát biểu đúng là",
    choices: ["1, 4.", "1, 2, 3, 4.", "2, 4.", "2."],
    correctIndex: 2,
    explanation: "(1) sai vì CO2, muối carbonate là hợp chất vô cơ dù chứa carbon. (2) đúng theo định nghĩa. (3) sai vì nhiều hợp chất hữu cơ (tinh bột, protein...) không dễ bay hơi/tan. (4) đúng vì hợp chất hữu cơ luôn chứa carbon nên cháy hoàn toàn cho CO2. Vậy (2), (4) đúng.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Trong các chất sau: CH4, CO2, C2H4, Na2CO3, C2H5ONa có",
    choices: [
      "1 hợp chất hữu cơ và 4 hợp chất vô cơ.",
      "2 hợp chất hữu cơ và 3 hợp chất vô cơ.",
      "4 hợp chất hữu cơ và 1 hợp chất vô cơ.",
      "3 hợp chất hữu cơ và 2 hợp chất vô cơ.",
    ],
    correctIndex: 3,
    explanation: "Hữu cơ: CH4, C2H4, C2H5ONa (3 chất). Vô cơ: CO2, Na2CO3 (2 chất, đều bị loại trừ theo quy ước dù chứa carbon).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Dựa vào dữ kiện nào trong số các dữ kiện sau đây để có thể nói một chất là vô cơ hay hữu cơ?",
    choices: ["Trạng thái (rắn, lỏng, khí).", "Độ tan trong nước.", "Màu sắc.", "Thành phần nguyên tố."],
    correctIndex: 3,
    explanation: "Việc phân loại hữu cơ/vô cơ dựa vào thành phần nguyên tố (có carbon hay không, và có thuộc nhóm bị loại trừ như CO2, muối carbonate hay không), không dựa vào trạng thái, độ tan hay màu sắc.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất có phần trăm khối lượng carbon lớn nhất là",
    choices: ["CH4.", "CH3Cl.", "CH2Cl2.", "CHCl3."],
    correctIndex: 0,
    explanation: "%C: CH4 = 12/16 = 75%; CH3Cl = 12/50,5 ≈ 23,8%; CH2Cl2 = 12/85 ≈ 14,1%; CHCl3 = 12/119,5 ≈ 10%. CH4 có %C lớn nhất.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hydrocarbon X có khối lượng mol phân tử là 30 g/mol. X là",
    choices: ["CH4.", "C2H6.", "C3H8.", "C2H4."],
    correctIndex: 1,
    explanation: "M(CH4)=16, M(C2H6)=30, M(C3H8)=44, M(C2H4)=28. Chỉ C2H6 có M=30 g/mol.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Sản phẩm chủ yếu của một hợp chất hữu cơ khi cháy là",
    choices: [
      "khí nitrogen và hơi nước.",
      "khí carbonic và khí hydrogen.",
      "khí carbonic và carbon.",
      "khí carbonic và hơi nước.",
    ],
    correctIndex: 3,
    explanation: "Hợp chất hữu cơ chứa carbon và hydrogen nên khi cháy hoàn toàn tạo ra chủ yếu khí carbon dioxide (CO2) và hơi nước (H2O).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chọn câu đúng trong các câu sau:",
    choices: [
      "Hóa học hữu cơ là ngành hóa học chuyên nghiên cứu các hợp chất có trong tự nhiên.",
      "Hóa học hữu cơ là ngành hóa học chuyên nghiên cứu các hợp chất của cacbon.",
      "Hóa học hữu cơ là ngành hóa học chuyên nghiên cứu về các hợp chất hữu cơ.",
      "Hóa học hữu cơ là ngành hóa học chuyên nghiên cứu các chất trong cơ thể sống.",
    ],
    correctIndex: 2,
    explanation: "Hóa học hữu cơ là ngành hóa học chuyên nghiên cứu về các hợp chất hữu cơ và những chuyển hóa của chúng — đây là định nghĩa chính xác nhất trong 4 phát biểu.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hãy chọn phát biểu đúng nhất về hoá học hữu cơ trong số các phát biểu sau:",
    choices: [
      "Hoá học hữu cơ là ngành hoá học chuyên nghiên cứu các hợp chất của carbon.",
      "Hoá học hữu cơ là ngành hoá học chuyên nghiên cứu các hợp chất của carbon, trừ CO, CO2, muối carbonate, muối carbide,...",
      "Hoá học hữu cơ là ngành hoá học chuyên nghiên cứu các hợp chất của carbon, trừ CO, CO2.",
      "Hoá học hữu cơ là ngành hoá học chuyên nghiên cứu các hợp chất của carbon trừ muối carbonate.",
    ],
    correctIndex: 1,
    explanation: "Phát biểu B đầy đủ và chính xác nhất, nêu đủ các nhóm hợp chất của carbon bị loại trừ khỏi phạm vi hữu cơ (CO, CO2, muối carbonate, muối carbide).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhận xét nào sau đây không đúng?",
    choices: [
      "Hợp chất hữu cơ có ở xung quanh ta.",
      "Hợp chất hữu cơ là hợp chất của carbon.",
      "Khi đốt cháy các hợp chất hữu cơ đều thấy tạo ra CO2.",
      "Đốt cháy hợp chất hữu cơ luôn thu được CO2 và H2O.",
    ],
    correctIndex: 3,
    explanation: "Không phải hợp chất hữu cơ nào cũng chứa hydrogen (ví dụ carbon tetrachloride CCl4 là dung môi hữu cơ không chứa H), nên đốt cháy không phải lúc nào cũng tạo H2O — phát biểu D không đúng.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho các chất: CO2, HCOOH, C2H6O, CH3COOH, CH3Cl, NaCl, K2CO3. Số hợp chất hữu cơ trong các chất trên là bao nhiêu?",
    choices: ["4.", "5.", "3.", "2."],
    correctIndex: 0,
    explanation: "Hợp chất hữu cơ: HCOOH, C2H6O, CH3COOH, CH3Cl (4 chất). CO2, NaCl, K2CO3 là hợp chất vô cơ.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các chất: CH4, C2H6O, C2H4O2, C3H8, C2H2, C2H5Cl, C6H6. Số hợp chất thuộc loại hydrocarbon trong dãy trên là",
    choices: ["3.", "4.", "2.", "5."],
    correctIndex: 1,
    explanation: "Hydrocarbon (chỉ chứa C, H): CH4, C3H8, C2H2, C6H6 (4 chất). C2H6O, C2H4O2, C2H5Cl có thêm O hoặc Cl nên là dẫn xuất.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong các hợp chất hữu cơ, carbon luôn có hoá trị là",
    choices: ["I.", "IV.", "III.", "II."],
    correctIndex: 1,
    explanation: "Trong hợp chất hữu cơ, carbon luôn có hoá trị IV.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hoá trị của carbon, oxygen, hydrogen trong hợp chất hữu cơ lần lượt là",
    choices: ["IV, II, II.", "IV, III, I.", "II, IV, I.", "IV, II, I."],
    correctIndex: 3,
    explanation: "Trong hợp chất hữu cơ: carbon hoá trị IV, oxygen hoá trị II, hydrogen hoá trị I.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nguyên tử cacbon có thể liên kết trực tiếp với nhau tạo thành các dạng mạch carbon là",
    choices: [
      "mạch vòng.",
      "mạch thẳng, mạch nhánh.",
      "mạch vòng, mạch thẳng, mạch nhánh.",
      "mạch nhánh.",
    ],
    correctIndex: 2,
    explanation: "Các nguyên tử carbon có thể liên kết với nhau tạo 3 dạng mạch: mạch thẳng, mạch nhánh và mạch vòng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong phân tử các chất hữu cơ, các nguyên tử liên kết với nhau",
    choices: [
      "theo đúng hóa trị.",
      "theo một thứ tự nhất định.",
      "theo đúng số oxi hóa.",
      "theo đúng hóa trị và theo một thứ tự nhất định.",
    ],
    correctIndex: 3,
    explanation: "Các nguyên tử trong phân tử hữu cơ liên kết với nhau vừa đúng theo hoá trị của chúng, vừa theo một thứ tự nhất định (cấu tạo hóa học).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Rượu ethylic alcohol có công thức là",
    choices: ["CH3OH.", "C2H5OH.", "CH3ONa.", "C2H5ONa."],
    correctIndex: 1,
    explanation: "Ethylic alcohol (ethanol) có công thức C2H5OH.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hợp chất hữu cơ chỉ gồm liên kết đơn?",
    choices: ["C3H8, C2H2.", "C3H8, C4H10.", "C4H10, C2H2.", "C4H10, C6H6."],
    correctIndex: 1,
    explanation: "C3H8 và C4H10 là alkane, chỉ có liên kết đơn. C2H2 có liên kết ba, C6H6 có cấu trúc vòng thơm với các liên kết đôi.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Số liên kết đơn trong phân tử C4H10 là",
    choices: ["10.", "13.", "14.", "12."],
    correctIndex: 1,
    explanation: "Butane CH3–CH2–CH2–CH3 có 3 liên kết C–C và 10 liên kết C–H, tổng cộng 13 liên kết đơn.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Phân tử chất hữu cơ X có 2 nguyên tố C, H. Tỉ khối hơi của X so với hydrogen là 21. Công thức phân tử của X là",
    choices: ["C4H8.", "C3H8.", "C3H6.", "C6H6."],
    correctIndex: 2,
    explanation: "M(X) = 21 × 2 = 42 g/mol, khớp với C3H6 (M = 42).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phân tử chất hữu cơ X có 2 nguyên tố C, H. Tỉ khối hơi của X so với hydrogen là 22. Công thức phân tử của X là",
    choices: ["C4H8.", "C3H8.", "C3H6.", "C6H6."],
    correctIndex: 1,
    explanation: "M(X) = 22 × 2 = 44 g/mol, khớp với C3H8 (M = 44).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hợp chất X có thành phần phần trăm về khối lượng: C (85,8%) và H (14,2%). Công thức đơn giản nhất của X là",
    choices: ["CH4.", "C3H4.", "CH3.", "CH2."],
    correctIndex: 3,
    explanation: "Tỉ lệ mol C:H = 85,8/12 : 14,2/1 = 7,15 : 14,2 ≈ 1 : 2, nên công thức đơn giản nhất là CH2.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Tỉ lệ phần trăm khối lượng của carbon và hydrogen trong hydrocarbon X là 92,3 : 7,7. Khối lượng phân tử của X lớn gấp 1,3 lần khối lượng của acetic acid (CH3COOH). Công thức phân tử của X là",
    choices: ["C6H6.", "C4H4.", "C6H12.", "C5H10."],
    correctIndex: 0,
    explanation: "M(X) = 1,3 × 60 = 78. Tỉ lệ mol C:H = 92,3/12 : 7,7/1 ≈ 1:1 nên X có dạng (CH)n; 13n = 78 → n = 6, vậy X là C6H6.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Phần trăm khối lượng của các nguyên tố trong hợp chất X là: 54,54% C; 9,1% H, còn lại là oxygen. Khối lượng phân tử của X bằng 88. Công thức phân tử của X là",
    choices: ["C4H10O.", "C5H12O.", "C4H10O2.", "C4H8O2."],
    correctIndex: 3,
    explanation: "mC = 54,54%×88 ≈ 48 → nC = 4; mH = 9,1%×88 ≈ 8 → nH = 8; mO = 88−48−8 = 32 → nO = 2. Công thức C4H8O2 (M = 48+8+32 = 88) khớp chính xác.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Phân tích một hợp chất Y có 65,75% C, 15,1% H và 19,18% N. Biết tỉ khối hơi của Y so với khí methane (CH4) bằng 4,5625. Công thức phân tử của Y là",
    choices: ["C2H7N.", "C3H9N.", "C4H11N.", "CH5N."],
    correctIndex: 2,
    explanation: "M(Y) = 4,5625 × 16 = 73. mC = 65,75%×73 ≈ 48 → nC=4; mH = 15,1%×73 ≈ 11 → nH=11; mN = 19,18%×73 ≈ 14 → nN=1. Công thức C4H11N (M=48+11+14=73) khớp chính xác.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Phần trăm khối lượng của các nguyên tố trong hợp chất X là: 51,3% C; 9,4% H; 12% N; 27,3% O. Tỉ khối hơi của X so với không khí là 4,034. Công thức phân tử của X là",
    choices: ["C5H12O2N.", "C5H11O2N.", "C5H11O3N.", "C5H10O2N."],
    correctIndex: 1,
    explanation: "M(X) = 4,034 × 29 ≈ 117. mC=51,3%×117≈60→nC=5; mH=9,4%×117≈11→nH=11; mN=12%×117≈14→nN=1; mO=27,3%×117≈32→nO=2. Công thức C5H11O2N (M=60+11+32+14=117) khớp chính xác.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Phân tích hợp chất hữu cơ X thấy cứ 3 phần khối lượng carbon lại có 1 phần khối lượng hydrogen, 7 phần khối lượng nitrogen và 8 phần lưu huỳnh. Trong X chỉ có 1 nguyên tử S. Công thức phân tử của X là",
    choices: ["CH4NS.", "C2H2N2S.", "C2H6NS.", "CH4N2S."],
    correctIndex: 3,
    explanation: "Tỉ lệ khối lượng C:H:N:S = 3:1:7:8. Với 1 nguyên tử S (khối lượng 32), suy ra 1 phần = 4: mC=12→nC=1; mH=4→nH=4; mN=28→nN=2. Công thức CH4N2S (thiourea).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Chất hữu cơ X có khối lượng phân tử bằng 123 và khối lượng của C, H, O, N trong phân tử tỉ lệ với nhau theo thứ tự là 72 : 5 : 32 : 14. Công thức phân tử của X là",
    choices: ["C6H14O2N.", "C6H6ON2.", "C6H12ON.", "C6H5O2N."],
    correctIndex: 3,
    explanation: "Vì 72+5+32+14=123=M(X), các số này chính là khối lượng từng nguyên tố trong 1 phân tử: nC=72/12=6, nH=5, nO=32/16=2, nN=14/14=1. Công thức C6H5O2N.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Khi đốt cháy hoàn toàn hợp chất X có công thức CxHyN, thu được 18,5925 lít khí CO2, 3,09875 lít N2 (các thể tích đo ở đkc) và 20,25 gam H2O. Công thức phân tử của X là",
    choices: ["C4H9N.", "C3H7N.", "C2H7N.", "C3H9N."],
    correctIndex: 3,
    explanation: "nH2O = 20,25/18 = 1,125 mol → nH = 2,25 mol. nN2 = 3,09875/24,79 = 0,125 mol → nN = 0,25 mol. nCO2 = 18,5925/24,79 = 0,75 mol → nC = 0,75 mol. Tỉ lệ C:H:N = 0,75:2,25:0,25 = 3:9:1, khớp C3H9N (M=59).",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Đốt cháy hoàn toàn 1,605 gam hợp chất hữu cơ X, thu được 4,62 gam CO2; 1,215 gam H2O và 185,925 mL N2 (đkc). Tỉ khối hơi của X so với không khí không vượt quá 4. Công thức phân tử của X là",
    choices: ["C2H5NO2.", "C4H9NO2.", "C7H9N.", "C6H7N."],
    correctIndex: 2,
    explanation: "nCO2=4,62/44=0,105mol→mC=1,26g; nH2O=1,215/18=0,0675mol→mH=0,135g; nN2=0,185925/24,79=0,0075mol→mN=0,21g. Tổng mC+mH+mN=1,605g = khối lượng X (không có oxygen). Tỉ lệ C:H:N=0,105:0,135:0,015=7:9:1 → C7H9N (M=107≤4×29=116, thỏa điều kiện).",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Ma túy đá hay còn gọi là hàng đá, chấm đá là tên gọi chỉ chung cho các loại ma túy tổng hợp có chứa chất methamphetamine (Meth). Đốt cháy 14,9 gam Meth thu được 24,79 lít CO2, 13,5 gam H2O và 1,2395 lít N2 (đkc). Tỉ khối hơi của Meth so với H2 < 75. Công thức phân tử của Meth là",
    choices: ["C20H30N2.", "C8H11N3.", "C9H11NO.", "C10H15N."],
    correctIndex: 3,
    explanation: "nCO2=24,79/24,79=1mol→mC=12g; nH2O=13,5/18=0,75mol→mH=1,5g; nN2=1,2395/24,79=0,05mol→mN=1,4g. Tổng=12+1,5+1,4=14,9g = khối lượng Meth (không oxygen). Tỉ lệ C:H:N=1:1,5:0,1=10:15:1 → C10H15N (M=149<150), đúng là công thức thật của methamphetamine.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Vitamin A là một chất dinh dưỡng thiết yếu cho con người. Trong thực phẩm, vitamin A tồn tại ở dạng chính là retinol (chứa C, H, O) trong đó thành phần % khối lượng H và O tương ứng là 10,49% và 5,594%. Biết CTPT của retinol là",
    choices: ["C18H30O.", "C22H26O.", "C21H18O.", "C20H30O."],
    correctIndex: 3,
    explanation: "Với C20H30O: M=286, %H=30/286≈10,49% và %O=16/286≈5,59%, khớp đúng với đề bài — đây cũng là công thức thật của retinol (vitamin A).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Khi đốt 1 lít khí X cần 6 lít O2, thu được 4 lít CO2 và 5 lít hơi H2O (các thể tích khí đo ở cùng điều kiện nhiệt độ, áp suất). CTPT của X là",
    choices: ["C4H10O.", "C4H8O2.", "C4H10O2.", "C3H8O."],
    correctIndex: 0,
    explanation: "Tỉ lệ thể tích = tỉ lệ mol: 1X cần 6O2 tạo 4CO2+5H2O nên X có 4C, 10H. Cân bằng oxygen: 2×6=12 (từ O2) so với 2×4+5=13 (trong sản phẩm), thiếu 1 O phải có sẵn trong X. Vậy X là C4H10O.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn 20 mL hơi hợp chất hữu cơ X (chỉ gồm C, H, O) cần vừa đủ 130 mL khí O2, thu được 200 mL hỗn hợp Y gồm khí và hơi. Dẫn Y qua dung dịch H2SO4 đặc (dư), còn lại 100 mL khí Z. Biết các thể tích khí và hơi đo ở cùng điều kiện. Công thức phân tử của X là",
    choices: ["C4H8O2.", "C5H10O2.", "C4H8O.", "C5H10O."],
    correctIndex: 1,
    explanation: "H2SO4 đặc hấp thụ hơi nước nên hơi nước = 200−100 = 100 mL, CO2 = 100 mL (khí Z còn lại). Với 20 mL X: tỉ lệ 1X:6,5O2:5CO2:5H2O. Vậy X có 5C, 10H; cân bằng O: 2×6,5=13 (từ O2) so với 2×5+5=15 cần có, thiếu 2 → X có 2 oxygen. X là C5H10O2.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Acetic acid có công thức là C2H4O2. Phần trăm nguyên tố C trong phân tử acetic acid là",
    choices: ["30%.", "40%.", "50%.", "60%."],
    correctIndex: 1,
    explanation: "%C = 24/60 × 100% = 40% (M của C2H4O2 = 60).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thành phần phần trăm về khối lượng của các nguyên tố C, H, O trong C2H6O lần lượt là",
    choices: [
      "52,2%; 13%; 34,8%.",
      "52,2%; 34,8%; 13%.",
      "13%; 34,8%; 52,2%.",
      "34,8%; 13%; 52,2%.",
    ],
    correctIndex: 0,
    explanation: "M(C2H6O)=46. %C=24/46≈52,2%; %H=6/46≈13%; %O=16/46≈34,8%.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một hợp chất hữu cơ X có thành phần phần trăm khối lượng carbon là 75%. Vậy X là",
    choices: ["C2H4.", "C2H6.", "CH4.", "C2H2."],
    correctIndex: 2,
    explanation: "%C(CH4)=12/16=75%, khớp chính xác; %C(C2H4)=85,7%, %C(C2H6)=80%, %C(C2H2)=92,3%.",
    difficulty: "THONG_HIEU",
  },

  // ==================== Bài 23. Alkane ====================
  {
    content: "Phát biểu nào sau đây là không đúng?",
    choices: [
      "Trong phân tử hydrocarbon, số nguyên tử hydrogen luôn là số chẵn.",
      "Trong phân tử alkene, liên kết đôi gồm một liên kết σ và một liên kết π.",
      "Hydrocarbon no là hydrocarbon mà trong phân tử chỉ có liên kết đơn.",
      "Công thức chung của hydrocarbon no, mạch hở có dạng CnH2n.",
    ],
    correctIndex: 3,
    explanation: "Công thức chung của hydrocarbon no (alkane), mạch hở phải là CnH2n+2, không phải CnH2n (đó là công thức của alkene — hydrocarbon không no).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Công thức phân tử nào sau đây không phải là công thức của một alkane?",
    choices: ["C2H6.", "C3H6.", "C4H10.", "C5H12."],
    correctIndex: 1,
    explanation: "C3H6 có dạng CnH2n (n=3), là công thức của alkene chứ không phải alkane (CnH2n+2).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu nào sau đây không đúng (ở điều kiện thường)?",
    choices: [
      "Các alkane từ C1 đến C4 và neopentane ở trạng thái khí.",
      "Các alkane từ C5 đến C17 (trừ neopentane) ở trạng thái lỏng.",
      "Các alkane không tan hoặc tan rất ít trong nước và nhẹ hơn nước.",
      "Các alkane không tan hoặc tan rất ít trong các dung môi hữu cơ.",
    ],
    correctIndex: 3,
    explanation: "Alkane thực chất tan tốt trong các dung môi hữu cơ (theo nguyên tắc \"tương tự hòa tan tương tự\", đều là chất không phân cực), không phải tan ít như phát biểu D nêu.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phát biểu nào sau đây là đúng?",
    choices: [
      "Những hợp chất mà trong phân tử chỉ có liên kết đơn là hydrocarbon no.",
      "Hydrocarbon chỉ có liên kết đơn trong phân tử là hydrocarbon no.",
      "Hydrocarbon có các liên kết đơn trong phân tử là hydrocarbon no.",
      "Hydrocarbon có ít nhất một liên kết đơn trong phân tử là hydrocarbon no.",
    ],
    correctIndex: 1,
    explanation: "Định nghĩa chính xác phải giới hạn trong phạm vi hydrocarbon và yêu cầu \"chỉ có\" liên kết đơn — phát biểu A thiếu từ \"hydrocarbon\", C và D không yêu cầu \"chỉ có\" nên không chính xác (VD alkene cũng có một số liên kết đơn).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phát biểu nào sau đây về alkane là không đúng?",
    choices: [
      "Trong phân tử alkane chỉ có liên kết đơn.",
      "Chỉ các alkane là chất khí ở điều kiện thường được dùng làm nhiên liệu.",
      "Các alkane lỏng được dùng sản xuất xăng, dầu và làm dung môi.",
      "Công thức chung của alkane là CxH2x+2, với x ≥ 1.",
    ],
    correctIndex: 1,
    explanation: "Các alkane lỏng (xăng, dầu hoả, diesel) cũng được dùng làm nhiên liệu rất phổ biến, không chỉ riêng alkane thể khí — phát biểu B không đúng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho phương trình hóa học: 2X + 7O2 → 4CO2 + 6H2O. X là",
    choices: ["C2H2.", "C2H4.", "C2H6.", "C6H6."],
    correctIndex: 2,
    explanation: "Cân bằng: 2X có 4 carbon → mỗi X có 2C; 2X có 12H (từ 6H2O) → mỗi X có 6H. Vậy X là C2H6.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Alkane là những hydrocarbon no, mạch hở, có công thức chung là",
    choices: ["CnH2n+2 (n ≥1).", "CnH2n (n ≥2).", "CnH2n–2 (n ≥2).", "CnH2n–6 (n ≥6)."],
    correctIndex: 0,
    explanation: "Công thức chung của alkane là CnH2n+2 với n ≥ 1.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong phân tử metan có",
    choices: [
      "4 liên kết đơn C – H.",
      "1 liên kết đôi C = H và 3 liên kết đơn C – H.",
      "2 liên kết đơn C – H và 2 liên kết đôi C = H.",
      "1 liên kết đơn C – H và 3 liên kết đôi C = H.",
    ],
    correctIndex: 0,
    explanation: "Methane CH4 có 4 liên kết đơn C–H; liên kết đôi C=H không tồn tại trong hoá học (hydrogen chỉ tạo được 1 liên kết).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong công nghiệp alkane có ứng dụng là",
    choices: ["Làm nhiên liệu, nguyên liệu.", "Làm thực phẩm.", "Làm hương liệu.", "Làm mĩ phẩm."],
    correctIndex: 0,
    explanation: "Alkane (khí thiên nhiên, LPG, xăng dầu...) được dùng chủ yếu làm nhiên liệu và nguyên liệu cho công nghiệp hoá chất.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Biện pháp nào sau đây không làm giảm ô nhiễm môi trường gây ra do sử dụng nhiên liệu từ dầu mỏ?",
    choices: [
      "Đưa thêm hợp chất có chứa chì vào xăng để làm tăng chỉ số octane của xăng.",
      "Đưa thêm chất xúc tác vào ống xả động cơ để chuyển hoá các khí thải độc.",
      "Tăng cường sử dụng biogas.",
      "Tổ chức thu gom và xử lí dầu cặn.",
    ],
    correctIndex: 0,
    explanation: "Pha chì vào xăng làm tăng ô nhiễm (chì là kim loại nặng độc hại) chứ không giảm; đây là lý do xăng pha chì đã bị cấm sử dụng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Theo ước tính, trung bình mỗi ngày một con bò \"ợ\" vào bầu khí quyển khoảng 250 L – 300 L một chất khí có khả năng gây hiệu ứng nhà kính. Khí đó là",
    choices: ["O2", "CO2.", "CH4.", "NH3."],
    correctIndex: 2,
    explanation: "Quá trình lên men trong dạ cỏ của bò sinh ra khí methane (CH4), một khí gây hiệu ứng nhà kính mạnh, được thải ra ngoài qua việc \"ợ hơi\".",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Biogas là một loại khí sinh học, được sản xuất bằng cách ủ kín các chất thải hữu cơ trong chăn nuôi, sinh hoạt. Biogas được dùng để đun nấu, chạy máy phát điện sinh hoạt gia đình. Thành phần chính của biogas là",
    choices: ["N2.", "CO2.", "CH4.", "NH3."],
    correctIndex: 2,
    explanation: "Biogas có thành phần chính là khí methane (CH4), sinh ra từ quá trình phân huỷ kị khí chất thải hữu cơ.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phương pháp nào sau đây có thể được thực hiện để góp phần hạn chế ô nhiễm môi trường do các phương tiện giao thông gây ra?",
    choices: [
      "Không sử dụng phương tiện giao thông.",
      "Cấm các phương tiện giao thông tại các đô thị.",
      "Sử dụng phương tiện chạy bằng điện hoặc nhiên liệu xanh.",
      "Sử dụng các phương tiện chạy bằng than đá.",
    ],
    correctIndex: 2,
    explanation: "Sử dụng phương tiện chạy điện hoặc nhiên liệu xanh là giải pháp thực tế, khả thi để giảm ô nhiễm; các phương án khác cực đoan/không khả thi hoặc gây ô nhiễm nặng hơn (than đá).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong phân tử hydrocarbon X, hydrogen chiếm 25% về khối lượng. Công thức phân tử của X là",
    choices: ["CH4.", "C2H4.", "C2H6.", "C6H6."],
    correctIndex: 0,
    explanation: "%H(CH4)=4/16=25%, khớp chính xác. %H(C2H4)=14,3%; %H(C2H6)=20%; %H(C6H6)=7,7%.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thành phần phần trăm về khối lượng của các nguyên tố carbon và hydrogen trong CH4 lần lượt là",
    choices: ["50% và 50%.", "75% và 25%.", "80% và 20%.", "40% và 60%."],
    correctIndex: 1,
    explanation: "M(CH4)=16. %C=12/16=75%, %H=4/16=25%.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đốt cháy hoàn toàn một hydrocarbon, thu được số mol H2O gấp đôi số mol CO2. Công thức phân tử hydrocarbon đó là",
    choices: ["C2H4.", "C2H6.", "CH4.", "C2H2."],
    correctIndex: 2,
    explanation: "Với CxHy: nCO2=x, nH2O=y/2 (theo 1 mol hydrocarbon). Điều kiện nH2O=2nCO2 → y=4x. Chỉ CH4 (x=1,y=4) thỏa mãn.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phần trăm khối lượng carbon trong C4H10 là",
    choices: ["28,57 %.", "82,76 %.", "17,24 %.", "96,77 %."],
    correctIndex: 1,
    explanation: "M(C4H10)=58. %C = 48/58 × 100% ≈ 82,76%.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phần trăm khối lượng carbon trong alkane X là 83,33%. Công thức phân tử của X là",
    choices: ["CH4.", "C3H8.", "C5H12.", "C10H22."],
    correctIndex: 2,
    explanation: "Với C5H12 (M=72): %C=60/72≈83,33%, khớp chính xác. CH4 có %C=75%, C3H8 có %C≈81,8%, C10H22 có %C≈84,5%.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phần trăm khối lượng hydrogen trong alkane X là 25,00%. Công thức phân tử của X là",
    choices: ["CH4.", "C2H6.", "C3H8.", "C4H10."],
    correctIndex: 0,
    explanation: "Với CH4 (M=16): %H=4/16=25%, khớp chính xác.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đốt cháy hoàn toàn 12,395 lít khí methane (đkc). Thể tích khí carbon dioxide tạo thành là",
    choices: ["1239,5 lít.", "12,395 lít.", "1,12 lít.", "24,79 lít."],
    correctIndex: 1,
    explanation: "CH4 + 2O2 → CO2 + 2H2O, tỉ lệ mol CH4:CO2 = 1:1 nên cùng thể tích (đo cùng điều kiện): V(CO2)=12,395 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi đốt cháy hoàn toàn 0,25 mol methane người ta thu được một lượng khí CO2 (đkc) có thể tích là",
    choices: ["6,1975 lít.", "24,79 lít.", "16,8 lít.", "8,96 lít."],
    correctIndex: 0,
    explanation: "nCO2 = nCH4 = 0,25 mol → V(CO2) = 0,25 × 24,79 = 6,1975 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khối lượng khí CO2 và khối lượng H2O thu được khi đốt cháy hoàn toàn 8 gam khí methane lần lượt là",
    choices: ["44 gam và 9 gam.", "22 gam và 9 gam.", "22 gam và 18 gam.", "22 gam và 36 gam."],
    correctIndex: 2,
    explanation: "n(CH4)=8/16=0,5 mol. CH4+2O2→CO2+2H2O: nCO2=0,5mol→22g; nH2O=1mol→18g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đốt cháy hoàn toàn m gam butane (C4H10), thu được tổng thể tích CO2 và hơi nước là 22,311 lít (đkc). Giá trị của m là",
    choices: ["4,5.", "5,0.", "5,8.", "6,0."],
    correctIndex: 2,
    explanation: "C4H10+13/2O2→4CO2+5H2O: mỗi mol C4H10 tạo 9 mol khí (4CO2+5H2O), thể tích 9×24,79=223,11 lít. n(C4H10)=22,311/223,11=0,1mol → m=0,1×58=5,8g.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn 6,4 gam khí methane, dẫn toàn bộ sản phẩm qua dung dịch nước vôi trong dư. Khối lượng kết tủa thu được là",
    choices: ["20 gam.", "40 gam.", "80 gam.", "10 gam."],
    correctIndex: 1,
    explanation: "n(CH4)=6,4/16=0,4mol → nCO2=0,4mol → nCaCO3=0,4mol → m=0,4×100=40g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đốt cháy hoàn toàn a gam methane. Dẫn toàn bộ hỗn hợp sản phẩm cháy qua bình đựng nước vôi trong dư, thu được 1,00 gam chất kết tủa trắng. Giá trị của a là",
    choices: ["16.", "1,6.", "0,16.", "0,32."],
    correctIndex: 2,
    explanation: "nCaCO3=1/100=0,01mol=nCO2=nCH4 → a=0,01×16=0,16g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đốt cháy hoàn toàn 12,395 lít khí methane (đkc). Thể tích không khí (đkc) cần dùng là",
    choices: ["123,95 lít.", "317,85 lít.", "540 lít.", "743,7 lít."],
    correctIndex: 0,
    explanation: "n(CH4)=12,395/24,79=0,5mol. O2 cần=2×0,5=1mol=24,79 lít. Không khí (O2 chiếm 1/5 thể tích)=5×24,79=123,95 lít.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn 12,395 lít hỗn hợp khí gồm CH4 và H2 (đkc), thu được 16,2 gam nước. Thành phần phần trăm theo thể tích của khí CH4 và H2 trong hỗn hợp lần lượt là:",
    choices: ["60% và 40%.", "80% và 20%.", "50% và 50%.", "30% và 70%."],
    correctIndex: 1,
    explanation: "n(hỗn hợp)=12,395/24,79=0,5mol. Đặt x=nCH4,y=nH2: x+y=0,5. nH2O=2x+y=16,2/18=0,9. Giải: x=0,4,y=0,1. %CH4=0,4/0,5=80%, %H2=20%.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn 1,7 gam khí CO và CH4 trong bình chứa khí oxygen dư. Dẫn hết sản phẩm cháy đi qua bình chứa nước vôi trong dư, thu được 8 gam kết tủa. Phần trăm theo thể tích của mỗi khí có trong hỗn hợp đầu là",
    choices: ["60% và 40%.", "43,75% và 56,25%.", "40,75% và 59,25%.", "30% và 70%."],
    correctIndex: 1,
    explanation: "nCaCO3=8/100=0,08mol=nCO+nCH4. Đặt a=nCO,b=nCH4: a+b=0,08; 28a+16b=1,7. Giải: b=0,045, a=0,035. %CO=0,035/0,08=43,75%, %CH4=56,25%.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn 3,4 gam hỗn hợp CH4 và H2, thu được 12,395 lít hơi H2O (đkc). Thành phần phần trăm theo khối lượng của mỗi khí trong hỗn hợp ban đầu là",
    choices: ["90 và 10.", "60 và 40.", "94,12 và 5,88.", "91,12 và 8,88."],
    correctIndex: 2,
    explanation: "nH2O=12,395/24,79=0,5mol. Đặt x=nCH4,y=nH2: 16x+2y=3,4; 2x+y=0,5. Giải: x=0,2,y=0,1. m(CH4)=3,2g (94,12%), m(H2)=0,2g (5,88%).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Tỉ khối hơi của một alkane đối với khí methane là 1,875. Công thức phân tử của alkane là",
    choices: ["C3H8.", "C2H6.", "C4H10.", "C5H12."],
    correctIndex: 1,
    explanation: "M(alkane)=1,875×16=30 g/mol, khớp với C2H6.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một hydrocarbon X ở thể khí có phân tử khối nặng gấp đôi phân tử khối trung bình của không khí. Công thức phân tử của X là",
    choices: ["C4H10.", "C4H8.", "C4H6.", "C5H10."],
    correctIndex: 0,
    explanation: "M(X)=2×29=58 g/mol, khớp với C4H10 (M=58).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một hợp chất X có tỉ khối hơi đối với hydrogen bằng 22. Công thức phân tử đúng của X là",
    choices: ["CH4", "C2H6.", "C3H8.", "C4H10."],
    correctIndex: 2,
    explanation: "M(X)=22×2=44 g/mol, khớp với C3H8 (M=44).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một hydrogen mà trong thành phần phân tử chứa 75% carbon theo khối lượng. Hydrocarbon có công thức là",
    choices: ["C4H10.", "C2H4.", "C6H6.", "CH4."],
    correctIndex: 3,
    explanation: "%C(CH4)=12/16=75%, khớp chính xác. %C(C4H10)≈82,8%; %C(C2H4)≈85,7%; %C(C6H6)≈92,3%.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đốt cháy 0,5 mol hiđrocacbon X được H2O và 22 gam CO2. X là",
    choices: ["CH4.", "C2H2.", "C2H4.", "C6H6."],
    correctIndex: 0,
    explanation: "nCO2=22/44=0,5mol. Số C trong X = nCO2/n(X) = 0,5/0,5 = 1 → X có 1 carbon, là CH4.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi đốt cháy hoàn toàn 1,2395 lít alkane X, thu được 6,1975 lít khí CO2. Các thể tích đo ở đkc. Công thức phân tử của X là",
    choices: ["C3H8.", "C5H10.", "C4H10.", "C5H12."],
    correctIndex: 3,
    explanation: "n(X)=1,2395/24,79=0,05mol; nCO2=6,1975/24,79=0,25mol. Số C = 0,25/0,05 = 5 → alkane C5H12 (C5H10 không phải alkane).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn một hydrocarbon X, thu được 7,437 lít CO2 (đkc) và 7,2 gam nước. Công thức phân tử của X là",
    choices: ["C2H6.", "C3H8.", "C4H10.", "CH4."],
    correctIndex: 1,
    explanation: "nCO2=7,437/24,79=0,3mol→nC=0,3mol. nH2O=7,2/18=0,4mol→nH=0,8mol. Tỉ lệ C:H=0,3:0,8=3:8, khớp C3H8.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn 6,1975 lít khí methane (đkc). Thể tích khí oxygen (đkc) cần dùng để đốt cháy hết lượng metan là",
    choices: ["6,1975 lít.", "12,395 lít.", "24,79 lít.", "33,6 lít."],
    correctIndex: 1,
    explanation: "n(CH4)=6,1975/24,79=0,25 mol. CH4+2O2→CO2+2H2O nên O2 cần=2×0,25=0,5mol=12,395 lít.",
    difficulty: "VAN_DUNG",
  },
];

async function main() {
  const exists = await prisma.chapter.findUnique({ where: { id: CHAPTER_ID } });
  if (!exists) {
    console.error("Không tìm thấy chương", CHAPTER_ID);
    process.exit(1);
  }
  const existingPractice = await prisma.practiceQuestion.findMany({
    where: { chapterId: CHAPTER_ID },
    select: { content: true },
  });
  const seen = new Set(existingPractice.map((q) => q.content.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 80)));

  let added = 0;
  let skipped = 0;
  for (const q of QUESTIONS) {
    const key = q.content.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 80);
    if (seen.has(key)) {
      skipped++;
      continue;
    }
    seen.add(key);
    await prisma.practiceQuestion.create({
      data: {
        chapterId: CHAPTER_ID,
        content: q.content,
        choices: JSON.stringify(q.choices),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        difficulty: q.difficulty,
        source: "KHTN 9 - Tài liệu học tập 2024 (VEAgroup) — Chương 7. Hydrocarbon và nguồn nhiên liệu",
        published: true,
      },
    });
    added++;
  }
  console.log(`Hoàn tất: thêm ${added} câu, bỏ qua (đã tồn tại) ${skipped} câu.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
