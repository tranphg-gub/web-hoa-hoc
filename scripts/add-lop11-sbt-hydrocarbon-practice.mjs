import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AG: bài tập mining từ SBT Hóa 11 - Kết nối tri thức thật (Tài liệu/Lớp 11/Hydrocarbon/
// Hydrocarbon.zip -> "(TỜ 24)-Chuong IV - Hoa 11 - KNTT.pdf", đọc bằng pdftoppm + thị giác).
// Chỉ lấy câu SINGLE_CHOICE — bỏ qua Đúng/Sai nhóm, câu cần hình vẽ cấu trúc/sơ đồ chuyển hoá
// để xác định số liệu, và câu tự luận (viết đồng phân, viết phương trình). Đáp án tự giải bằng
// kiến thức hóa học (danh pháp IUPAC, quy tắc Markovnikov, cân bằng phương trình oxi hoá, phản
// ứng tạo kết tủa bạc acetylide...) và kiểm chứng lại trước khi đưa vào (SBT không in đáp án).
const CHAPTER_ID = "cmrelkbbm0003vhus2c7at4v4"; // Lớp 11 - Chương 4. Hydrocarbon

const QUESTIONS = [
  // Bài 15. Alkane
  {
    content: "Công thức phân tử nào sau đây không phải là công thức của một alkane?",
    choices: ["C2H6.", "C3H6.", "C4H10.", "C5H12."],
    correctIndex: 1,
    explanation: "Alkane có công thức chung CnH2n+2. C3H6 ứng với công thức CnH2n (dạng alkene/cycloalkane), không phải alkane.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Pentane là tên theo danh pháp thay thế của",
    choices: ["CH3[CH2]2CH3.", "CH3[CH2]3CH3.", "CH3[CH2]4CH3.", "CH3[CH2]5CH3."],
    correctIndex: 1,
    explanation: "CH3[CH2]3CH3 = CH3-CH2-CH2-CH2-CH3 có 5 carbon, đúng là pentane. Các chất còn lại lần lượt là butane (4C), hexane (6C), heptane (7C).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "(CH3)2CH-CH3 có tên theo danh pháp thay thế là",
    choices: ["2-methylpropane.", "isobutane.", "butane.", "2-methylbutane."],
    correctIndex: 0,
    explanation: "(CH3)2CH-CH3 có mạch chính 3 carbon (propane) với 1 nhóm methyl ở C2 → tên danh pháp thay thế là 2-methylpropane. \"Isobutane\" chỉ là tên thông thường, không phải danh pháp thay thế (IUPAC substitutive).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu nào sau đây không đúng?",
    choices: [
      "Trong phân tử alkane chỉ chứa các liên kết σ bền vững.",
      "Các phân tử alkane hầu như không phân cực.",
      "Ở điều kiện thường các alkane tương đối trơ về mặt hoá học.",
      "Trong phân tử methane, bốn liên kết C–H hướng về bốn đỉnh của một hình vuông.",
    ],
    correctIndex: 3,
    explanation: "Phân tử methane có cấu trúc tứ diện đều (không phải hình vuông phẳng) — bốn liên kết C-H hướng về bốn đỉnh của một tứ diện đều, góc liên kết ≈109,5°.",
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
    explanation: "Alkane là hợp chất không phân cực nên tan tốt trong các dung môi hữu cơ (không phân cực) theo nguyên tắc \"tương tự tan trong tương tự\", trái với phát biểu D.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhận xét nào sau đây là đúng về tính chất hoá học của alkane?",
    choices: [
      "Khá trơ về mặt hoá học, phản ứng đặc trưng là thế và tách.",
      "Hoạt động hoá học mạnh, phản ứng đặc trưng là thế và tách.",
      "Khá trơ về mặt hoá học, phản ứng đặc trưng là cộng và trùng hợp.",
      "Hoạt động hoá học mạnh, phản ứng đặc trưng là cộng và trùng hợp.",
    ],
    correctIndex: 0,
    explanation: "Alkane chỉ có liên kết đơn bền vững (σ) nên khá trơ về mặt hoá học; phản ứng đặc trưng của alkane là phản ứng thế (halogen hoá) và phản ứng tách (cracking, dehydro hoá), không phải cộng/trùng hợp (đặc trưng của hydrocarbon không no).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho các chất sau: chloromethane, dichloromethane, trichloromethane và tetrachloromethane. Số chất là sản phẩm của phản ứng xảy ra khi trộn methane với chlorine và chiếu ánh sáng tử ngoại là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 3,
    explanation: "Phản ứng thế halogen của methane với chlorine dưới ánh sáng UV xảy ra thế liên tiếp nhiều nấc, tạo ra hỗn hợp cả 4 sản phẩm: chloromethane, dichloromethane, trichloromethane và tetrachloromethane.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các chất sau: (X) 1-chloropropane và (Y) 2-chloropropane. Sản phẩm của phản ứng monochlorine hoá propane là",
    choices: ["(X).", "(Y).", "cả hai chất.", "chất khác X, Y."],
    correctIndex: 2,
    explanation: "Propane có cả carbon bậc 1 và bậc 2 nên phản ứng monochlorine hoá (có chiếu sáng) tạo đồng thời cả hai sản phẩm thế 1-chloropropane và 2-chloropropane (dạng hỗn hợp).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cracking alkane là quá trình phân cắt liên kết C–C (bẻ gãy mạch carbon) của các alkane mạch dài để tạo thành hỗn hợp các hydrocarbon có mạch carbon",
    choices: ["ngắn hơn.", "dài hơn.", "không đổi.", "thay đổi."],
    correctIndex: 0,
    explanation: "Cracking bẻ gãy liên kết C-C của alkane mạch dài, tạo ra các hydrocarbon có mạch carbon ngắn hơn (alkane + alkene nhỏ hơn).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu nào sau đây không đúng về phản ứng reforming alkane?",
    choices: [
      "Chuyển alkane mạch không phân nhánh thành các alkane mạch phân nhánh.",
      "Chuyển alkane mạch không phân nhánh thành các hydrocarbon mạch vòng.",
      "Số nguyên tử carbon của chất tham gia và của sản phẩm bằng nhau.",
      "Nhiệt độ sôi của sản phẩm lớn hơn nhiều so với alkane tham gia phản ứng.",
    ],
    correctIndex: 3,
    explanation: "Reforming chỉ đồng phân hoá/vòng hoá alkane mạch thẳng (giữ nguyên số carbon), sản phẩm có nhiệt độ sôi tương đương hoặc thậm chí thấp hơn (do phân nhánh làm giảm nhiệt độ sôi), không \"lớn hơn nhiều\" như phát biểu D.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phát biểu nào sau đây về ứng dụng của alkane không đúng?",
    choices: [
      "Propane C3H8 và butane C4H10 được sử dụng làm khí đốt.",
      "Các alkane C6, C7, C8 là nguyên liệu để sản xuất một số hydrocarbon thơm.",
      "Các alkane lỏng được sử dụng làm nhiên liệu như xăng hay dầu diesel.",
      "Các alkane từ C11 đến C20 được dùng làm nến và sáp.",
    ],
    correctIndex: 3,
    explanation: "Alkane từ C11 đến khoảng C20 chủ yếu thuộc phân đoạn dầu hoả/dầu diesel/dầu nhờn; nến và sáp (paraffin) thường được sản xuất từ các alkane có mạch dài hơn (khoảng C20 trở lên).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Alkane X có công thức phân tử C6H14. Số công thức cấu tạo của X là",
    choices: ["2.", "3.", "4.", "5."],
    correctIndex: 3,
    explanation: "C6H14 có 5 đồng phân cấu tạo: hexane, 2-methylpentane, 3-methylpentane, 2,2-dimethylbutane, 2,3-dimethylbutane.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Alkane (CH3)3C–CH2–CH(CH3)2 có tên gọi là",
    choices: ["2,2,4-trimethylpentane.", "2,4,4-trimethylpentane.", "pentamethylpropane.", "trimetylpentane."],
    correctIndex: 0,
    explanation: "Mạch chính dài nhất có 5 carbon (pentane); đánh số để tổng bộ locant nhỏ nhất cho ra 2,2,4-trimethylpentane (bộ số {2,2,4} < {2,4,4} khi so sánh). Đây chính là isooctane — hợp chất chuẩn dùng để đánh giá chỉ số octane của xăng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Tên gọi của alkane nào sau đây đúng?",
    choices: ["2-ethylbutane.", "2,2-dimethylbutane.", "3-methylbutane.", "2,3,3-trimethylbutane."],
    correctIndex: 1,
    explanation: "2,2-dimethylbutane là tên gọi đúng theo IUPAC. Các tên còn lại đều sai quy tắc: \"2-ethylbutane\" phải gọi lại theo mạch chính dài nhất là 3-methylpentane; \"3-methylbutane\" phải đánh số lại thành 2-methylbutane (locant nhỏ nhất); \"2,3,3-trimethylbutane\" không hợp lệ vì mạch chính thực tế dài hơn butane.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các alkane kèm theo nhiệt độ nóng chảy và nhiệt độ sôi (°C) sau: propane (-187,7 và -42,1), butane (-138,3 và -0,5), pentane (-129,7 và 36,1), hexane (-95,3 và 68,7). Số alkane tồn tại ở thể khí ở điều kiện thường là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 1,
    explanation: "Ở điều kiện thường (~25°C), chất là khí nếu nhiệt độ sôi < 25°C. Propane (bs -42,1°C) và butane (bs -0,5°C) đều là khí; pentane (bs 36,1°C) và hexane (bs 68,7°C) là chất lỏng. Vậy có 2 alkane ở thể khí.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trộn neopentane với chlorine và chiếu ánh sáng tử ngoại thì thu được tối đa bao nhiêu sản phẩm monochlorine?",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 0,
    explanation: "Neopentane C(CH3)4 có tính đối xứng cao, cả 12 nguyên tử H đều tương đương nhau (thuộc 4 nhóm methyl hoàn toàn giống nhau), nên chỉ tạo được duy nhất 1 sản phẩm monochlorine.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các chất sau: (1) 2-methylbutane; (2) 2-methylpentane; (3) 3-methylpentane; (4) 2,2-dimethylbutane và (5) benzene. Trong số các chất này, có bao nhiêu chất có thể là sản phẩm reforming hexane?",
    choices: ["5.", "2.", "3.", "4."],
    correctIndex: 3,
    explanation: "Reforming hexane (C6H14) chỉ tạo ra sản phẩm có cùng 6 carbon (đồng phân mạch nhánh hoặc vòng hoá/thơm hoá), không làm thay đổi số carbon. (1) 2-methylbutane chỉ có 5 carbon nên KHÔNG thể là sản phẩm. (2), (3), (4) đều là đồng phân C6H14 của hexane, và (5) benzene C6H6 là sản phẩm thơm hoá hexane — cả 4 chất (2),(3),(4),(5) đều hợp lệ.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Oxi hoá butane bằng oxygen ở 180°C và 70 bar tạo thành sản phẩm hữu cơ X duy nhất. X là",
    choices: ["HCOOH.", "CH3COOH.", "C2H5COOH.", "CO2."],
    correctIndex: 1,
    explanation: "Đây là phản ứng oxi hoá butane trong công nghiệp (xúc tác, nhiệt độ và áp suất cao) để sản xuất acetic acid (CH3COOH) — một trong những phương pháp sản xuất acetic acid quy mô công nghiệp.",
    difficulty: "VAN_DUNG",
  },
  // Bài 16. Hydrocarbon không no
  {
    content: "Hydrocarbon không no là những hydrocarbon trong phân tử có chứa",
    choices: ["liên kết đơn.", "liên kết σ.", "liên kết bội.", "vòng benzene."],
    correctIndex: 2,
    explanation: "Hydrocarbon không no chứa liên kết bội (liên kết đôi C=C hoặc liên kết ba C≡C) trong phân tử.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hợp chất nào sau đây là một alkene?",
    choices: ["CH3–CH2–CH3.", "CH3–CH=CH2.", "CH3–C≡CH.", "CH2=C=CH2."],
    correctIndex: 1,
    explanation: "CH3-CH=CH2 (propene) có 1 liên kết đôi C=C đơn lẻ, đúng là alkene. CH3CH2CH3 là alkane, CH3-C≡CH là alkyne, CH2=C=CH2 là allene (diene liên hợp dạng cumulated, không thuộc alkene thông thường).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hợp chất nào sau đây là một alkyne?",
    choices: ["CH3–CH2–CH2–CH3.", "CH3–CH=CH2.", "CH3–CH2–C≡CH.", "CH2=CH–CH=CH2."],
    correctIndex: 2,
    explanation: "CH3-CH2-C≡CH (but-1-yne) có liên kết ba C≡C, đúng là alkyne.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây là đồng phân của CH2=CH–CH2–CH2–CH3?",
    choices: ["(CH3)2C=CH–CH3.", "CH2=CH–CH2–CH3.", "CH≡C–CH2–CH2–CH3.", "CH2=CH–CH2–CH=CH2."],
    correctIndex: 0,
    explanation: "CH2=CH-CH2-CH2-CH3 (pent-1-ene) có công thức phân tử C5H10. (CH3)2C=CH-CH3 (2-methylbut-2-ene) cũng là C5H10 → đồng phân. Các chất còn lại có công thức phân tử khác (C4H8, C5H8, C5H8).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây không có đồng phân hình học?",
    choices: [
      "CH3–CH=CH–CH3.",
      "(CH3)2C=CH–CH3.",
      "CH3–CH=CH–CH(CH3)2.",
      "(CH3)2CHCH=CHCH(CH3)2.",
    ],
    correctIndex: 1,
    explanation: "Ở (CH3)2C=CH-CH3, một carbon của liên kết đôi mang hai nhóm thế giống nhau (2 nhóm CH3) nên không thể có đồng phân cis/trans. Các chất còn lại đều có hai nhóm thế khác nhau ở mỗi carbon liên kết đôi nên đều có đồng phân hình học.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây là đồng phân của CH≡C–CH2–CH3?",
    choices: ["CH≡C–CH3.", "CH3–C≡C–CH3.", "CH2=CH–CH2–CH3.", "CH2=CH–C≡CH."],
    correctIndex: 1,
    explanation: "CH≡C-CH2-CH3 (but-1-yne) có công thức phân tử C4H6. CH3-C≡C-CH3 (but-2-yne) cũng là C4H6 → đồng phân. Các chất còn lại có công thức phân tử khác (C3H4, C4H8, C4H4).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các chất kèm theo nhiệt độ nóng chảy và nhiệt độ sôi (°C) sau: (X) but-1-ene (-185 và -6,3); (Y) trans-but-2-ene (-106 và 0,9); (Z) cis-but-2-ene (-139 và 3,7); (T) pent-1-ene (-165 và 30). Chất nào là chất lỏng ở điều kiện thường?",
    choices: ["(X).", "(Y).", "(Z).", "(T)."],
    correctIndex: 3,
    explanation: "Ở điều kiện thường (~25°C), X, Y, Z đều có nhiệt độ sôi dưới 25°C nên ở thể khí. Chỉ có T (pent-1-ene) có nhiệt độ sôi 30°C (>25°C) và nhiệt độ nóng chảy -165°C (<25°C) nên tồn tại ở thể lỏng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phản ứng nào sau đây không phải là phản ứng đặc trưng của hydrocarbon không no?",
    choices: ["Phản ứng cộng.", "Phản ứng trùng hợp.", "Phản ứng oxi hoá.", "Phản ứng thế."],
    correctIndex: 3,
    explanation: "Phản ứng thế là phản ứng đặc trưng của alkane (hydrocarbon no), không phải của hydrocarbon không no (alkene/alkyne có phản ứng đặc trưng là cộng, trùng hợp và oxi hoá làm mất màu KMnO4/nước bromine).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Số alkene có cùng công thức C4H8 và số alkyne có cùng công thức C4H6 lần lượt là",
    choices: ["4 và 2.", "4 và 3.", "3 và 3.", "3 và 2."],
    correctIndex: 0,
    explanation: "C4H8 có 4 alkene: but-1-ene, cis-but-2-ene, trans-but-2-ene và 2-methylpropene (tính cả đồng phân hình học). C4H6 có 2 alkyne: but-1-yne và but-2-yne.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây cộng H2 dư (Ni, t°) tạo thành butane?",
    choices: ["CH3–CH=CH2.", "CH3–C≡C–CH2–CH3.", "CH3–CH2–CH=CH2.", "(CH3)2C=CH2."],
    correctIndex: 2,
    explanation: "CH3-CH2-CH=CH2 (but-1-ene) cộng H2 dư tạo butane mạch thẳng. CH3-CH=CH2 chỉ có 3 carbon nên cho propane; CH3-C≡C-CH2-CH3 có 5 carbon nên cho pentane; (CH3)2C=CH2 cộng H2 cho isobutane (2-methylpropane), không phải butane mạch thẳng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Sản phẩm tạo thành khi 2-methylpent-2-ene tác dụng với Br2 có tên gọi là",
    choices: [
      "2,3-dibromo-2-methylpent-2-ene.",
      "3,4-dibromo-4-methylpentane.",
      "2,3-dibromo-2-methylpentane.",
      "4-bromo-2-methylpent-2-ene.",
    ],
    correctIndex: 2,
    explanation: "2-methylpent-2-ene: CH3-C(CH3)=CH-CH2-CH3. Br2 cộng vào liên kết đôi C2=C3, đưa Br vào cả C2 và C3, không còn liên kết đôi → sản phẩm là 2,3-dibromo-2-methylpentane.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phản ứng nào sau đây đã tạo thành sản phẩm không tuân theo đúng quy tắc Markovnikov?",
    choices: [
      "CH3CH=CH2 + HCl → CH3CHClCH3.",
      "(CH3)2C=CH2 + HBr → (CH3)2CHCH2Br.",
      "CH3CH2CH=CH2 + H2O →(H+)→ CH3CH2CH(OH)CH3.",
      "(CH3)2C=CH–CH3 + HI → (CH3)2CICH2CH3.",
    ],
    correctIndex: 1,
    explanation: "Theo quy tắc Markovnikov, Br phải gắn vào carbon mang liên kết đôi có bậc cao hơn (carbon (CH3)2C=, bậc 3), cho sản phẩm (CH3)2CBrCH3. Nhưng sản phẩm đề cho là (CH3)2CHCH2Br (Br gắn vào carbon bậc thấp hơn) — đây là sản phẩm trái quy tắc Markovnikov. Các phản ứng còn lại đều cho đúng sản phẩm Markovnikov.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Xét phản ứng hoá học sau: CH3CH=CH2 + KMnO4 + H2O → CH3CH(OH)CH2OH + MnO2 + KOH. Tổng hệ số tỉ lượng tối giản của các chất trong phản ứng này bằng",
    choices: ["13.", "14.", "15.", "16."],
    correctIndex: 3,
    explanation: "Cân bằng phương trình: 3CH3CH=CH2 + 2KMnO4 + 4H2O → 3CH3CH(OH)CH2OH + 2MnO2 + 2KOH (kiểm tra đủ C, H, O, K, Mn ở hai vế). Tổng hệ số = 3+2+4+3+2+2 = 16.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho các chất sau: acetylene; methyl acetylene; ethyl acetylene và dimethyl acetylene. Số chất tạo được kết tủa khi tác dụng với dung dịch AgNO3 trong NH3 là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 2,
    explanation: "Phản ứng tạo kết tủa với AgNO3/NH3 chỉ xảy ra với alkyne có liên kết ba đầu mạch (≡C-H). Acetylene (HC≡CH), methyl acetylene (CH3-C≡CH) và ethyl acetylene (CH3CH2-C≡CH) đều có liên kết ba đầu mạch nên phản ứng tạo kết tủa; dimethyl acetylene (CH3-C≡C-CH3) có liên kết ba ở giữa mạch (không còn H trên carbon liên kết ba) nên không phản ứng. Vậy có 3 chất tạo kết tủa.",
    difficulty: "VAN_DUNG",
  },
  // Bài 17. Aren (Hydrocarbon thơm)
  {
    content: "Arene hay còn gọi là hydrocarbon thơm là những hydrocarbon trong phân tử có chứa một hay nhiều",
    choices: ["vòng benzene.", "liên kết đơn.", "liên kết đôi.", "liên kết ba."],
    correctIndex: 0,
    explanation: "Arene (hydrocarbon thơm) là hydrocarbon có chứa một hay nhiều vòng benzene trong phân tử.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức phân tử nào sau đây có thể là công thức của hợp chất thuộc dãy đồng đẳng của benzene?",
    choices: ["C8H16.", "C8H14.", "C8H12.", "C8H10."],
    correctIndex: 3,
    explanation: "Dãy đồng đẳng của benzene có công thức chung CnH2n-6 (n≥6). Với n=8: 2(8)-6=10 → công thức phải là C8H10, khớp với đáp án D (ví dụ xylene, ethylbenzene).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhận định nào sau đây về cấu tạo của phân tử benzene không đúng?",
    choices: [
      "Phân tử benzene có 6 nguyên tử carbon tạo thành hình lục giác đều.",
      "Tất cả nguyên tử carbon và hydrogen đều nằm trên một mặt phẳng.",
      "Các góc liên kết đều bằng 109,5°.",
      "Các độ dài liên kết carbon–carbon đều bằng nhau.",
    ],
    correctIndex: 2,
    explanation: "Trong phân tử benzene, các carbon ở trạng thái lai hoá sp2 nên góc liên kết bằng 120° (không phải 109,5° — đó là góc tứ diện của carbon lai hoá sp3).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây là chất rắn, màu trắng?",
    choices: ["Benzene.", "Toluene.", "Styrene.", "Naphthalene."],
    correctIndex: 3,
    explanation: "Naphthalene (băng phiến) là chất rắn kết tinh màu trắng, thăng hoa; benzene, toluene, styrene đều là chất lỏng không màu ở điều kiện thường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho các chất sau: (X) o-bromotoluene; (Y) m-bromotoluene; (Z) p-bromotoluene. Sản phẩm chính của phản ứng giữa toluen với bromine ở nhiệt độ cao có mặt iron(III) bromide là",
    choices: ["(X) và (Y).", "(Y) và (Z).", "(X) và (Z).", "(Y)."],
    correctIndex: 2,
    explanation: "Nhóm -CH3 trên vòng benzene là nhóm định hướng ortho, para (nhóm đẩy electron), nên phản ứng thế bromine trên vòng ưu tiên tạo sản phẩm ortho và para, tức là (X) và (Z).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nitro hoá benzene bằng hỗn hợp HNO3 đặc và H2SO4 đặc ở nhiệt độ ≤50°C, tạo thành chất hữu cơ X. Phát biểu nào sau đây về X không đúng?",
    choices: [
      "Tên của X là nitrobenzene.",
      "X là chất lỏng, sánh như dầu.",
      "X có màu vàng.",
      "X tan tốt trong nước.",
    ],
    correctIndex: 3,
    explanation: "Nitrobenzene là chất lỏng sánh như dầu, màu vàng nhạt, nhưng hầu như không tan (hoặc tan rất ít) trong nước do tính kém phân cực của vòng thơm và nhóm nitro, không \"tan tốt\" như phát biểu D.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhận xét nào sau đây không đúng đối với phản ứng cộng chlorine vào benzene?",
    choices: [
      "Khó hơn phản ứng cộng chlorine vào ethylene.",
      "Xảy ra với điều kiện ánh sáng tử ngoại và đun nóng.",
      "Sản phẩm thu được là 1,2,3,4,5,6-hexachlorocyclohexane.",
      "Tỉ lệ mol của các chất tham gia phản ứng là 1:1.",
    ],
    correctIndex: 3,
    explanation: "Phản ứng cộng chlorine vào benzene tạo 1,2,3,4,5,6-hexachlorocyclohexane cần no hoá cả 3 liên kết đôi trong vòng, do đó 1 mol benzene phản ứng với 3 mol Cl2 (tỉ lệ 1:3), không phải 1:1 như phát biểu D.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhận xét nào sau đây về tính chất hoá học của benzene là không đúng?",
    choices: [
      "Benzene khó tham gia phản ứng cộng hơn ethylene.",
      "Benzene dễ tham gia phản ứng thế hơn so với phản ứng cộng.",
      "Benzene không bị oxi hoá bởi tác nhân oxi hoá thông thường.",
      "Benzene làm mất màu dung dịch nước bromine ở điều kiện thường.",
    ],
    correctIndex: 3,
    explanation: "Benzene KHÔNG làm mất màu dung dịch nước bromine ở điều kiện thường (khác với alkene) — đây chính là phản ứng thường dùng để phân biệt hydrocarbon thơm với hydrocarbon không no.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phân tử chất nào sau đây có thể cộng thêm 5 phân tử H2 (xúc tác Ni, đun nóng)?",
    choices: ["Benzene.", "Toluene.", "Styrene.", "Naphthalene."],
    correctIndex: 3,
    explanation: "Naphthalene (C10H8) là hydrocarbon thơm 2 vòng ngưng tụ với độ bất bão hoà tương ứng 7, trong đó 2 là số vòng và 5 là số liên kết π có thể no hoá bằng H2 (tạo decahydronaphthalene). Benzene và toluene chỉ cộng tối đa 3 H2 (1 vòng thơm); styrene cộng tối đa 4 H2 (vòng thơm 3 + nhánh vinyl 1).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây có thể làm nhạt màu dung dịch Br2 trong CCl4 ở điều kiện thường?",
    choices: ["Benzene.", "Toluene.", "Styrene.", "Naphthalene."],
    correctIndex: 2,
    explanation: "Styrene (C6H5-CH=CH2) có nhóm vinyl (liên kết đôi C=C) gắn ngoài vòng thơm, phản ứng cộng Br2 dễ dàng ở điều kiện thường như một alkene thông thường, làm nhạt màu dung dịch Br2/CCl4. Benzene, toluene, naphthalene (chỉ có vòng thơm) đều không phản ứng cộng ở điều kiện thường.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây khi tác dụng với hỗn hợp HNO3 và H2SO4 đặc nóng tạo một sản phẩm mononitro hoá duy nhất?",
    choices: ["Benzene.", "Toluene.", "o-xylene.", "Naphthalene."],
    correctIndex: 0,
    explanation: "Benzene có 6 nguyên tử H hoàn toàn tương đương nhau (đối xứng cao) nên chỉ tạo được đúng 1 sản phẩm mononitro (nitrobenzene). Toluene, o-xylene, naphthalene đều có các vị trí H không tương đương nên tạo hỗn hợp nhiều đồng phân mononitro.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phản ứng giữa toluene và chlorine khi được chiếu sáng tạo sản phẩm là",
    choices: ["p-chlorotoluene.", "m-chlorotoluene.", "benzyl chloride.", "2,4-dichlorotoluene."],
    correctIndex: 2,
    explanation: "Khi có ánh sáng (không có xúc tác FeCl3), phản ứng chlorine hoá toluene xảy ra theo cơ chế gốc tự do ở nhánh (vị trí benzylic), tạo benzyl chloride (C6H5CH2Cl), khác với phản ứng thế trên vòng thơm (cần xúc tác FeCl3, không cần ánh sáng).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đun nóng toluene với dung dịch KMnO4 nóng, thì tỉ lệ mol C6H5COOK sinh ra so với KMnO4 phản ứng bằng",
    choices: ["1:2.", "2:1.", "2:3.", "3:2."],
    correctIndex: 0,
    explanation: "Phương trình cân bằng: C6H5CH3 + 2KMnO4 → C6H5COOK + 2MnO2 + KOH + H2O. Tỉ lệ mol C6H5COOK : KMnO4 = 1:2.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đun nóng hydrocarbon thơm X có công thức phân tử C8H10 với dung dịch KMnO4 nóng thu được dung dịch có chứa C6H5COOK và K2CO3. Chất X là",
    choices: ["o-xylene.", "p-xylene.", "ethyl benzene.", "styrene."],
    correctIndex: 2,
    explanation: "Ethylbenzene (C6H5-CH2-CH3) khi bị oxi hoá mạnh bởi KMnO4 nóng, carbon benzylic (gắn trực tiếp vào vòng) bị oxi hoá thành -COOK (cho C6H5COOK), còn carbon cuối mạch (CH3 của nhóm ethyl) bị oxi hoá cắt mạch hoàn toàn thành K2CO3. o-xylene và p-xylene có 2 nhóm CH3 nên tạo muối 2 lần -COOK (dicarboxylate), không cho K2CO3; styrene có công thức C8H8, không khớp C8H10 của đề bài.",
    difficulty: "VAN_DUNG",
  },
  // Bài 18. Ôn tập chương 4
  {
    content: "Chất nào sau đây không phải là hydrocarbon?",
    choices: ["CH3–CH3.", "CH2=CH2.", "CH≡CH.", "CH3–CH2–OH."],
    correctIndex: 3,
    explanation: "CH3-CH2-OH (ethanol) chứa oxygen nên là dẫn xuất của hydrocarbon (alcohol), không phải hydrocarbon (chỉ gồm C và H).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho các chất sau: methane, ethylene, acetylene, benzene, toluene và naphthalene. Số chất ở thể lỏng trong điều kiện thường là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 1,
    explanation: "Methane, ethylene, acetylene đều ở thể khí (nhiệt độ sôi rất thấp); naphthalene ở thể rắn (nhiệt độ nóng chảy ≈80°C). Chỉ benzene và toluene ở thể lỏng ở điều kiện thường → 2 chất.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhận xét nào sau đây không đúng?",
    choices: [
      "Alkane không tham gia phản ứng cộng.",
      "Phản ứng đặc trưng của alkene và alkyne là phản ứng cộng.",
      "Benzene và đồng đẳng dễ tham gia phản ứng thế hơn phản ứng cộng.",
      "Styrene dễ tham gia phản ứng thế hơn phản ứng cộng.",
    ],
    correctIndex: 3,
    explanation: "Styrene có nhóm vinyl (C=C) gắn ngoài vòng thơm, nhóm này phản ứng cộng dễ dàng giống alkene thông thường, nên với styrene phản ứng cộng (ở nhánh vinyl) xảy ra dễ dàng chứ không phải \"thế dễ hơn cộng\" như benzene/toluene thông thường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hợp chất X có công thức phân tử C5H12, khi tác dụng với chlorine (có chiếu sáng) tạo được bốn dẫn xuất thế monochlorine. X là",
    choices: ["pentane.", "isopentane.", "neopentane.", "isobutane."],
    correctIndex: 1,
    explanation: "Isopentane (2-methylbutane) có 4 loại nguyên tử H không tương đương (2 nhóm CH3 gắn vào C2 tương đương nhau, C2-H, C3-H2, C4-H3), tạo đúng 4 sản phẩm monochlorine khác nhau. Pentane mạch thẳng chỉ có 3 loại H (3 sản phẩm); neopentane có 1 loại H (1 sản phẩm); isobutane chỉ có 4 carbon (C4H10), không phải C5H12.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất lỏng X có khả năng làm nhạt màu dung dịch KMnO4 ở điều kiện thường. X là chất nào trong các chất sau đây?",
    choices: ["Benzene.", "Toluene.", "Styrene.", "Naphthalene."],
    correctIndex: 2,
    explanation: "Styrene có nhóm vinyl (C=C) dễ bị oxi hoá bởi KMnO4 ngay ở điều kiện thường, làm nhạt màu dung dịch. Benzene, toluene không phản ứng ở điều kiện thường (cần đun nóng với toluene); naphthalene ở thể rắn, không phải chất lỏng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các chất sau: propane, propene, propyne, butane, but-1-yne, but-2-yne, but-1-ene và cis-but-2-ene. Số chất tác dụng với dung dịch AgNO3 trong NH3 tạo kết tủa là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 1,
    explanation: "Chỉ alkyne có liên kết ba đầu mạch mới phản ứng tạo kết tủa với AgNO3/NH3: propyne (CH3-C≡CH) và but-1-yne (CH3CH2-C≡CH) thoả mãn. But-2-yne có liên kết ba ở giữa mạch (không có H đầu mạch) nên không phản ứng; các alkane, alkene còn lại cũng không phản ứng. Vậy có 2 chất.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các phát biểu sau: (1) Propane và butane được sử dụng làm khí đốt; (2) Ethene và propene được sử dụng để tổng hợp polymer; (3) Acetylene được sử dụng làm nhiên liệu cho đèn xì oxygen-acetylene; (4) Styrene được sử dụng tổng hợp polymer; (5) Toluene được sử dụng tổng hợp thuốc nổ. Số phát biểu đúng là",
    choices: ["5.", "2.", "3.", "4."],
    correctIndex: 0,
    explanation: "Cả 5 phát biểu đều đúng: (1) LPG; (2) polyethylene/polypropylene; (3) hàn cắt kim loại bằng đèn xì oxy-acetylene; (4) polystyrene; (5) toluene là nguyên liệu tổng hợp TNT (trinitrotoluene).",
    difficulty: "THONG_HIEU",
  },
];

async function main() {
  let added = 0;
  let skipped = 0;
  for (const q of QUESTIONS) {
    const exists = await prisma.practiceQuestion.findFirst({
      where: { chapterId: CHAPTER_ID, content: q.content },
    });
    if (exists) {
      skipped++;
      continue;
    }
    await prisma.practiceQuestion.create({
      data: {
        chapterId: CHAPTER_ID,
        content: q.content,
        choices: JSON.stringify(q.choices),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        difficulty: q.difficulty,
        source: "SBT Hóa 11 - Kết nối tri thức (Chương 4 - Hydrocarbon)",
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
