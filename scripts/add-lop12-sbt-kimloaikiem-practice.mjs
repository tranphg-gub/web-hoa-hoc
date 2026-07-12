import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AF: bài tập mining từ SBT Hóa 12 - Kết nối tri thức thật (Tài liệu/Lớp 12/Hóa 12 theo
// chuyên đề/KL Kiềm_Kiềm thổ.zip -> "(TỜ SÁCH BT-KNTT) Chương VII - BT Hoá 12 - KNTT.pdf", đọc
// bằng pdftoppm + thị giác vì PDF lỗi text layer). Chỉ lấy câu SINGLE_CHOICE (NHẬN BIẾT/THÔNG
// HIỂU/VẬN DỤNG) — bỏ qua các câu Đúng/Sai nhóm và câu tự luận/tính toán không có đáp án trắc
// nghiệm vì PracticeQuestion chỉ hỗ trợ trắc nghiệm 1 đáp án. File SBT không in đáp án ở các
// trang đã đọc — mọi đáp án dưới đây tự giải bằng kiến thức hóa học (tính chất kim loại kiềm/
// kiềm thổ, quá trình Solvay, nước cứng) và kiểm chứng lại trước khi đưa vào. Ion điện tích ≥2
// dùng cú pháp "Ca^2+" (dấu ^) để hiển thị đúng dạng số mũ (bài học từ Chương 5).
const CHAPTER_ID = "cmrelkf8d000cvhuseifdze82"; // Lớp 12 - Chương 7. Nguyên tố nhóm IA và IIA

const QUESTIONS = [
  // Bài 24. Nguyên tố nhóm IA
  {
    content: "Ở trạng thái cơ bản, nguyên tử K có cấu hình electron là [Ar]4s1. Trong bảng tuần hoàn, nguyên tố K thuộc nhóm",
    choices: ["IIIA.", "IA.", "IVA.", "IIA."],
    correctIndex: 1,
    explanation: "Cấu hình [Ar]4s1 có 1 electron hoá trị ở phân lớp s nên K thuộc nhóm IA.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi tham gia phản ứng hoá học, mỗi nguyên tử kim loại nhóm IA đều thể hiện khuynh hướng",
    choices: ["nhường 2 electron.", "nhận 2 electron.", "nhận 1 electron.", "nhường 1 electron."],
    correctIndex: 3,
    explanation: "Kim loại nhóm IA có 1 electron hoá trị, dễ nhường 1 electron để đạt cấu hình khí hiếm, tạo ion +1.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở điều kiện thường, các tinh thể kim loại nhóm IA đều có kiểu cấu trúc",
    choices: ["lập phương tâm khối.", "lập phương tâm mặt.", "lục phương.", "lập phương đơn giản."],
    correctIndex: 0,
    explanation: "Các kim loại kiềm đều kết tinh theo kiểu mạng lập phương tâm khối.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhiệt độ nóng chảy của các kim loại nhóm IA từ Li đến Cs biến đổi như thế nào?",
    choices: ["Tăng dần.", "Không đổi.", "Không có quy luật.", "Giảm dần."],
    correctIndex: 3,
    explanation: "Từ Li đến Cs, bán kính nguyên tử tăng dần làm liên kết kim loại yếu dần nên nhiệt độ nóng chảy giảm dần.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở điều kiện thường, kim loại có khối lượng riêng nhỏ nhất là",
    choices: ["K.", "Rb.", "Li.", "Na."],
    correctIndex: 2,
    explanation: "Li là kim loại có khối lượng riêng nhỏ nhất trong tất cả các kim loại (khoảng 0,534 g/cm3).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hợp kim nào sau đây có nhiệt độ nóng chảy thấp (~70 °C), dễ hoá lỏng nên được dùng làm chất dẫn nhiệt trong một số lò phản ứng hạt nhân?",
    choices: ["Fe – C.", "Na – K.", "Al – Mg.", "Au – Ag."],
    correctIndex: 1,
    explanation: "Hợp kim Na-K có nhiệt độ nóng chảy rất thấp, ở dạng lỏng gần nhiệt độ phòng, được dùng làm chất tải nhiệt trong một số lò phản ứng hạt nhân.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhận định nào sau đây về các kim loại nhóm IA KHÔNG đúng?",
    choices: ["Độ cứng thấp.", "Dễ nóng chảy.", "Khối lượng riêng lớn.", "Dẫn điện tốt."],
    correctIndex: 2,
    explanation: "Kim loại kiềm có khối lượng riêng NHỎ (không phải lớn) — đây là phát biểu sai cần chọn.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở một số quốc gia, khoáng vật trona là nguyên liệu chính để sản xuất soda. Thành phần hoá học chính của trona là",
    choices: ["3NaF·AlF3.", "NaCl·KCl.", "Na2CO3·NaHCO3·2H2O.", "NaNO3."],
    correctIndex: 2,
    explanation: "Trona là khoáng vật tự nhiên có công thức Na2CO3·NaHCO3·2H2O, nguyên liệu quan trọng để sản xuất soda (Na2CO3).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Tính khử của các kim loại nhóm IA từ Li đến Cs biến đổi như thế nào?",
    choices: ["Tăng dần.", "Không đổi.", "Không có quy luật.", "Giảm dần."],
    correctIndex: 0,
    explanation: "Từ Li đến Cs, bán kính nguyên tử tăng, electron hoá trị càng xa hạt nhân càng dễ mất nên tính khử tăng dần.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dãy nào sau đây sắp xếp các kim loại nhóm IA theo mức độ phản ứng với nước tăng dần?",
    choices: ["K, Na, Li.", "Na, K, Li.", "Li, Na, K.", "K, Li, Na."],
    correctIndex: 2,
    explanation: "Mức độ phản ứng với nước của kim loại kiềm tăng dần từ Li đến K (thực nghiệm quan sát được), phù hợp với chiều tăng tính khử xuống nhóm.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nhóm IA có tính khử mạnh nhất trong các nhóm kim loại. Giá trị thế điện cực chuẩn nào sau đây thuộc về một kim loại trong nhóm IA?",
    choices: ["–0,44 V.", "–2,93 V.", "0 V.", "1,52 V."],
    correctIndex: 1,
    explanation: "Kim loại kiềm có thế điện cực chuẩn rất âm (khoảng –2,7 đến –3,0 V); –2,93 V là giá trị phù hợp với một kim loại kiềm.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi đốt nóng tinh thể LiCl trong ngọn lửa đèn khí không màu thì tạo ra ngọn lửa có màu",
    choices: ["da cam.", "tím nhạt.", "vàng.", "đỏ tía."],
    correctIndex: 3,
    explanation: "Li cho ngọn lửa màu đỏ tía (đỏ carmine) đặc trưng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Các kim loại kiềm đều hoạt động hoá học mạnh. Vì vậy, để bảo quản lâu dài, chúng thường được ngâm trong",
    choices: ["dầu hoả.", "nước máy.", "ethyl alcohol.", "giấm ăn."],
    correctIndex: 0,
    explanation: "Kim loại kiềm phản ứng mạnh với nước, alcohol và acid nên được bảo quản trong dầu hoả — môi trường trơ, không phản ứng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hợp chất nào sau đây vừa tác dụng được với dung dịch HCl, vừa tác dụng được với dung dịch NaOH?",
    choices: ["NaHCO3.", "NaCl.", "Ba(OH)2.", "Na2CO3."],
    correctIndex: 0,
    explanation: "NaHCO3 có tính lưỡng tính: phản ứng với acid tạo CO2 và H2O, phản ứng với base NaOH tạo Na2CO3 và H2O.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong công nghiệp, quá trình điện phân dung dịch NaCl bão hoà (điện cực trơ, màng ngăn xốp) để sản xuất các hoá chất nào sau đây?",
    choices: ["Na và Cl2.", "Na, H2 và Cl2.", "NaOH, H2 và Cl2.", "NaOH, O2 và Cl2."],
    correctIndex: 2,
    explanation: "Điện phân dung dịch NaCl có màng ngăn (phương pháp chlor-kiềm) tạo NaOH, khí H2 ở cathode và khí Cl2 ở anode.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhỏ vài giọt dung dịch phenolphthalein vào dung dịch Na2CO3 thì dung dịch chuyển sang màu",
    choices: ["tím.", "vàng.", "xanh.", "hồng."],
    correctIndex: 3,
    explanation: "Na2CO3 là muối của base mạnh và acid yếu, thuỷ phân tạo môi trường kiềm nên làm phenolphthalein chuyển hồng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở các nước ôn đới, để làm giảm nhiệt độ đóng băng của nước, làm tuyết tan, khoáng chất được rải lên tuyết là",
    choices: ["muối mỏ.", "than đá.", "đá vôi.", "thạch cao."],
    correctIndex: 0,
    explanation: "Muối mỏ (NaCl) được rải lên tuyết để hạ điểm đóng băng của nước, giúp làm tan băng tuyết trên đường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Diêm tiêu kali được dùng chế tạo thuốc nổ đen (làm mìn phá đá), làm phân bón (cung cấp nguyên tố N và K cho cây trồng) có công thức hoá học là",
    choices: ["KNO3.", "K2CO3.", "KCl.", "K2SO4."],
    correctIndex: 0,
    explanation: "Diêm tiêu kali là potassium nitrate KNO3, cung cấp đồng thời cả nguyên tố N và K.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Quá trình sản xuất soda bằng phương pháp Solvay KHÔNG sử dụng nguyên liệu nào sau đây?",
    choices: ["Carbon dioxide.", "Muối ăn.", "Xút ăn da.", "Ammonia."],
    correctIndex: 2,
    explanation: "Quá trình Solvay dùng nguyên liệu NaCl, NH3, CO2 (và đá vôi để tái sinh NH3); không sử dụng NaOH (xút ăn da) làm nguyên liệu đầu vào.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi đốt cháy kim loại Na trong bình chứa khí oxygen tạo thành sản phẩm là",
    choices: ["NaO.", "Na2O2.", "Na2O.", "NaO2."],
    correctIndex: 1,
    explanation: "Na cháy trong oxygen (dư) tạo thành sodium peroxide Na2O2, khác với việc chỉ bị oxi hoá chậm trong không khí tạo Na2O.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong dãy kim loại nhóm IA từ Li đến Cs, nhiệt độ nóng chảy giảm dần do nguyên nhân nào sau đây?",
    choices: ["Độ bền liên kết kim loại giảm dần.", "Số electron hoá trị tăng dần.", "Khối lượng nguyên tử tăng dần.", "Độ âm điện giảm dần."],
    correctIndex: 0,
    explanation: "Bán kính nguyên tử tăng dần từ Li đến Cs làm liên kết kim loại yếu dần, khiến nhiệt độ nóng chảy giảm dần.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong dãy kim loại nhóm IA từ Li đến Cs, số electron hoá trị trên một đơn vị thể tích biến đổi như thế nào?",
    choices: ["Giảm dần.", "Tăng dần.", "Không đổi.", "Không có quy luật."],
    correctIndex: 0,
    explanation: "Mỗi nguyên tử luôn có 1 electron hoá trị, nhưng thể tích nguyên tử tăng dần từ Li đến Cs nên mật độ electron hoá trị trên một đơn vị thể tích giảm dần.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi so sánh kim loại nhóm IA với các nguyên tố khác trong cùng chu kì, nhận định nào sau đây KHÔNG đúng?",
    choices: ["Có tính khử mạnh nhất.", "Có thế điện cực chuẩn âm nhất.", "Có bán kính nguyên tử lớn nhất.", "Có liên kết kim loại mạnh nhất."],
    correctIndex: 3,
    explanation: "Kim loại kiềm chỉ có 1 electron hoá trị nên có liên kết kim loại YẾU nhất trong chu kì, không phải mạnh nhất — đây là phát biểu sai.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong quá trình điện phân dung dịch NaCl với điện cực trơ có màng ngăn xốp, phân tử hay ion nào sau đây di chuyển được từ anode sang cathode qua màng ngăn xốp?",
    choices: ["Cl-.", "Na+.", "OH-.", "Cl2."],
    correctIndex: 1,
    explanation: "Màng ngăn xốp cho phép cation Na+ di chuyển từ khoang anode sang khoang cathode để cân bằng điện tích, đồng thời ngăn OH- di chuyển ngược lại để tránh phản ứng với Cl2.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một gia đình pha 1 kg nước muối sinh lí NaCl 0,9% để làm nước súc miệng. Khối lượng muối ăn cần dùng là",
    choices: ["9 g.", "27 g.", "18 g.", "36 g."],
    correctIndex: 0,
    explanation: "Khối lượng muối = 0,9% × 1000 g = 9 g.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "X, Y, Z là các hợp chất vô cơ của sodium, biết: (a) X + Z → Y + H2O; (b) X →(t°) Y + CO2 + H2O. Các hợp chất X, Z lần lượt là",
    choices: ["Na2CO3, NaHCO3.", "NaHCO3, NaOH.", "NaOH, Na2CO3.", "NaHCO3, Na2CO3."],
    correctIndex: 1,
    explanation:
      "Từ (b): X nhiệt phân tạo Y + CO2 + H2O nên X là NaHCO3 (2NaHCO3 →(t°) Na2CO3+CO2+H2O), Y=Na2CO3. Từ (a): NaHCO3+Z→Na2CO3+H2O, suy ra Z=NaOH (NaHCO3+NaOH→Na2CO3+H2O).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Xét phản ứng nhiệt phân NaHCO3 thành Na2CO3 trong quá trình Solvay: 2NaHCO3(s) → Na2CO3(s) + CO2(g) + H2O(g), ΔH° = +135,6 kJ. Nhiệt lượng cần cung cấp để nhiệt phân 1 kg NaHCO3 theo phản ứng trên là",
    choices: ["807,1 kJ.", "1 614,3 kJ.", "1 210,7 kJ.", "403,6 kJ."],
    correctIndex: 0,
    explanation: "n(NaHCO3) = 1000/84 ≈ 11,905 mol. Nhiệt lượng = (135,6/2) × 11,905 ≈ 807,1 kJ (vì ΔH ứng với 2 mol NaHCO3 phản ứng).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Trong một giai đoạn của quá trình Solvay có tồn tại cân bằng giữa các muối trong dung dịch: NaCl + NH4HCO3 ⇌ NaHCO3 + NH4Cl. Dựa trên tính chất nào của NaHCO3 để kết tinh muối này từ dung dịch hỗn hợp?",
    choices: ["Độ tan thấp.", "Tính lưỡng tính.", "Độ bền nhiệt thấp.", "Tính acid Bronsted."],
    correctIndex: 0,
    explanation: "NaHCO3 có độ tan trong nước thấp hơn các muối khác trong hỗn hợp (đặc biệt ở nhiệt độ thấp) nên kết tinh tách ra khỏi dung dịch trước — đây là nguyên lý cốt lõi của quá trình Solvay.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đun nóng tinh thể muối halide nào sau đây với dung dịch sulfuric acid đặc sẽ xảy ra phản ứng oxi hoá – khử?",
    choices: ["NaCl.", "NaF.", "KCl.", "KBr."],
    correctIndex: 3,
    explanation: "Br- có tính khử đủ mạnh để bị H2SO4 đặc oxi hoá thành Br2 (phản ứng oxi hoá – khử phụ); Cl-, F- có tính khử yếu hơn, chỉ xảy ra phản ứng trao đổi thông thường tạo HCl/HF bay hơi.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy nào sau đây sắp xếp các dung dịch (có cùng nồng độ 0,1 M) theo thứ tự pH tăng dần?",
    choices: ["LiOH, Na2CO3, KCl.", "Na2CO3, KCl, LiOH.", "KCl, Na2CO3, LiOH.", "Na2CO3, LiOH, KCl."],
    correctIndex: 2,
    explanation: "KCl là muối trung tính (pH≈7); Na2CO3 thuỷ phân tạo môi trường kiềm yếu (pH>7); LiOH là base mạnh có pH cao nhất. Thứ tự tăng dần: KCl, Na2CO3, LiOH.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho 1,9 g hỗn hợp gồm muối carbonate và hydrocarbonate của một kim loại kiềm tác dụng với dung dịch HCl dư thu được 0,496 lít khí (ở đkc). Kim loại kiềm là",
    choices: ["K.", "Li.", "Na.", "Rb."],
    correctIndex: 2,
    explanation:
      "n(CO2) = 0,496/24,79 ≈ 0,02 mol = x+y (x: mol M2CO3, y: mol MHCO3). Từ khối lượng 1,9 g, giải hệ chỉ có M=23 (Na) cho nghiệm x=y=0,01 mol hợp lệ (0 ≤ x,y ≤ 0,02); các kim loại còn lại đều cho nghiệm âm hoặc vô lí.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Hoà tan hoàn toàn hỗn hợp K và Na vào nước, thu được dung dịch X và a mol khí H2. Trung hoà X cần 200 mL dung dịch H2SO4 0,1 M. Giá trị của a là",
    choices: ["0,04.", "0,02.", "0,005.", "0,01."],
    correctIndex: 1,
    explanation:
      "n(H+) cần trung hoà = 2×0,2×0,1 = 0,04 mol = n(OH-) = tổng số mol kim loại kiềm (n). Mỗi 2 nguyên tử kim loại kiềm phản ứng với nước sinh 1 mol H2 nên a = n/2 = 0,02 mol.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Độ hoà tan của NaHCO3 ở 20 °C và 60 °C lần lượt là 9,6 và 16,5 g/100 g H2O. Để 1 tấn dung dịch NaHCO3 bão hoà ở 60 °C làm nguội về 20 °C (giả thiết không có sự bay hơi nước), thu được dung dịch X và a kg chất rắn khan. Giá trị của a là",
    choices: ["59,23.", "69,00.", "54,04.", "96,00."],
    correctIndex: 0,
    explanation:
      "Trong 1000 kg dung dịch bão hoà ở 60°C: khối lượng NaHCO3 = 1000×16,5/116,5 ≈ 141,63 kg; khối lượng nước ≈ 858,37 kg. Khi làm nguội, lượng NaHCO3 hoà tan tối đa (bão hoà ở 20°C) trong lượng nước đó = 858,37×9,6/100 ≈ 82,40 kg. Khối lượng kết tinh a = 141,63−82,40 ≈ 59,23 kg.",
    difficulty: "VAN_DUNG",
  },
  // Bài 25. Nguyên tố nhóm IIA
  {
    content: "Ở trạng thái cơ bản, cấu hình electron lớp ngoài cùng của các kim loại nhóm IIA có dạng chung là",
    choices: ["ns1.", "ns2.", "ns2np3.", "ns2np5."],
    correctIndex: 1,
    explanation: "Kim loại nhóm IIA có 2 electron hoá trị ở phân lớp s ngoài cùng, dạng chung ns2.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Nguyên tố calcium đóng vai trò thiết yếu cho việc phát triển xương, góp phần duy trì hoạt động của cơ bắp, truyền dẫn thần kinh, tăng cường khả năng miễn dịch. Trong cơ thể người, phần lớn calcium tập trung ở",
    choices: ["xương.", "răng.", "cơ.", "móng."],
    correctIndex: 0,
    explanation: "Phần lớn lượng calcium trong cơ thể người tập trung ở xương.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Trong cơ thể người, ion Mg^2+ (Z = 12) tham gia cấu trúc tế bào, tổng hợp protein và tổng hợp chất sinh năng lượng ATP. Tổng số hạt proton và electron của ion Mg^2+ là",
    choices: ["26.", "24.", "22.", "12."],
    correctIndex: 2,
    explanation: "Mg có 12 proton; ion Mg^2+ mất 2 electron nên còn 10 electron. Tổng số hạt proton và electron = 12+10 = 22.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Vôi đen (quặng dolomite nghiền nhỏ) được sử dụng chủ yếu trong luyện kim, phân bón và nuôi trồng thuỷ sản. Thành phần chính của vôi đen là",
    choices: ["3Ca3(PO4)2·CaF2.", "CaSO4·2H2O.", "CaCO3·MgCO3.", "CaO."],
    correctIndex: 2,
    explanation: "Dolomite (vôi đen) có thành phần chính là CaCO3·MgCO3.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở nơi tồn ứ rác thải, chất nào sau đây được các công nhân vệ sinh môi trường dùng để xử lí tạm thời nhằm sát trùng, diệt khuẩn, phòng chống dịch bệnh?",
    choices: ["Cát vàng.", "Than đá.", "Đá vôi.", "Vôi bột."],
    correctIndex: 3,
    explanation: "Vôi bột (CaO/Ca(OH)2) được rắc lên rác thải, xác động vật để sát trùng, diệt khuẩn.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Khi đun nóng đến 160 °C, thạch cao sống mất một phần nước trở thành thạch cao nung, được dùng để đúc khuôn trong điêu khắc, bó bột trong y học. Thành phần hoá học của thạch cao nung là",
    choices: ["CaSO4·0,5H2O.", "Ca(H2PO4)2.", "CaCO3.", "Ca(OH)2."],
    correctIndex: 0,
    explanation: "Thạch cao nung có công thức CaSO4·0,5H2O (bán hydrat), thu được khi nung thạch cao sống CaSO4·2H2O ở khoảng 160°C.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong tự nhiên, calcium sulfate tồn tại dưới dạng muối ngậm nước (CaSO4·2H2O) được gọi là",
    choices: ["vôi sống.", "thạch cao sống.", "vôi tôi.", "đá vôi."],
    correctIndex: 1,
    explanation: "CaSO4·2H2O trong tự nhiên được gọi là thạch cao sống.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hợp chất nào của calcium là thành phần hoá học chính của quặng apatite và phosphorite, được dùng trong công nghiệp sản xuất phân bón superphosphate?",
    choices: ["CaCO3.", "Ca3(PO4)2.", "Ca3P2.", "Ca(OH)2."],
    correctIndex: 1,
    explanation: "Ca3(PO4)2 là thành phần chính của quặng apatite, phosphorite, nguyên liệu sản xuất phân superphosphate.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong nông nghiệp, trộn urea hoặc phân đạm ammonium với chất nào sau đây thì sẽ làm giảm đáng kể tác dụng của phân đạm?",
    choices: ["KNO3.", "Ca(H2PO4)2.", "Ca(OH)2.", "KCl."],
    correctIndex: 2,
    explanation: "Ca(OH)2 là base mạnh, phản ứng với muối ammonium giải phóng khí NH3 bay hơi, làm mất đạm — không nên trộn vôi với phân đạm.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hiện tượng \"nước chảy đá mòn\" và hiện tượng \"xâm thực\" của nước mưa vào các phiến đá vôi là do trong nước có hoà tan khí nào sau đây?",
    choices: ["O2.", "N2.", "CO2.", "CH4."],
    correctIndex: 2,
    explanation: "CO2 hoà tan trong nước tạo acid carbonic yếu, phản ứng với CaCO3 tạo Ca(HCO3)2 tan, gây xói mòn đá vôi theo thời gian.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây cháy trong khí oxygen tạo thành sản phẩm là peroxide?",
    choices: ["Be.", "Mg.", "Ca.", "Ba."],
    correctIndex: 3,
    explanation: "Ba cháy trong oxygen dư có thể tạo barium peroxide BaO2, tương tự Na tạo Na2O2; Be, Mg, Ca chỉ tạo oxide thường khi cháy.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở nhiệt độ thường, kim loại nào sau đây phản ứng chậm với nước?",
    choices: ["Mg.", "Ca.", "Sr.", "Ba."],
    correctIndex: 0,
    explanation: "Mg phản ứng rất chậm với nước lạnh ở nhiệt độ thường (chỉ phản ứng rõ rệt với nước nóng/hơi nước); Ca, Sr, Ba đều phản ứng khá mạnh với nước ở nhiệt độ thường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Có thể nhận biết dung dịch BaCl2 bằng dung dịch chất nào sau đây?",
    choices: ["NaOH.", "Na2CO3.", "NaCl.", "NaNO3."],
    correctIndex: 1,
    explanation: "Na2CO3 phản ứng với BaCl2 tạo kết tủa trắng BaCO3, dễ nhận biết; NaOH không tạo kết tủa vì Ba(OH)2 tan tốt trong nước.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Muối nào sau đây chỉ tồn tại trong dung dịch và bị phân huỷ khi đun nóng?",
    choices: ["Ca(NO3)2.", "CaSO4.", "CaCl2.", "Ca(HCO3)2."],
    correctIndex: 3,
    explanation: "Ca(HCO3)2 chỉ bền trong dung dịch; khi đun nóng hoặc cô cạn sẽ phân huỷ thành CaCO3, CO2 và H2O, không tồn tại ở dạng rắn ổn định.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Nước cứng gây nhiều tác hại trong đời sống và sản xuất như đóng cặn đường ống dẫn nước, làm cho xà phòng có ít bọt khi giặt quần áo, làm giảm mùi vị thực phẩm khi nấu ăn. Nước cứng là nước có chứa nhiều các ion",
    choices: ["Mg^2+ và Ca^2+.", "Na+ và K+.", "F- và Cl-.", "SO4^2- và CO3^2-."],
    correctIndex: 0,
    explanation: "Nước cứng là nước chứa nhiều ion Mg^2+ và Ca^2+.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phản ứng nào sau đây được gọi là phản ứng tôi vôi?",
    choices: ["CaCO3 →(t°) CaO + CO2.", "2Ca + O2 → 2CaO.", "Ca + 2H2O → Ca(OH)2 + H2.", "CaO + H2O → Ca(OH)2."],
    correctIndex: 3,
    explanation: "Phản ứng tôi vôi là CaO + H2O → Ca(OH)2, toả nhiệt mạnh.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi đốt nóng tinh thể BaCl2 trong ngọn lửa đèn khí không màu thì tạo ra ngọn lửa có màu",
    choices: ["tím nhạt.", "đỏ son.", "đỏ cam.", "lục vàng."],
    correctIndex: 3,
    explanation: "Ba cho ngọn lửa màu lục vàng đặc trưng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong công nghiệp, kim loại kiềm thổ thường được điều chế bằng phương pháp điện phân nóng chảy muối chloride. Quá trình khử xảy ra tại cathode là",
    choices: ["M → M+ + 1e.", "M+ + 1e → M.", "M^2+ + 2e → M.", "M → M^2+ + 2e."],
    correctIndex: 2,
    explanation: "Kim loại kiềm thổ tạo ion M^2+; quá trình khử (nhận electron) tại cathode là M^2+ + 2e → M.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhận định nào sau đây về nước cứng tạm thời KHÔNG đúng?",
    choices: ["Chứa nhiều ion Mg^2+, Ca^2+.", "Chứa nhiều ion HCO3-.", "Chứa nhiều ion Cl-, SO4^2-.", "Đun sôi trở thành nước mềm."],
    correctIndex: 2,
    explanation: "Nước cứng tạm thời đặc trưng bởi ion HCO3-; chứa nhiều Cl-, SO4^2- là đặc trưng của nước cứng vĩnh cửu, không phải tạm thời.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Độ tan trong dãy muối sulfate từ MgSO4 đến BaSO4 biến đổi như thế nào?",
    choices: ["Tăng dần.", "Giảm dần.", "Không có quy luật.", "Không đổi."],
    correctIndex: 1,
    explanation: "Độ tan của muối sulfate kim loại kiềm thổ giảm dần từ Mg đến Ba; BaSO4 gần như không tan.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Độ bền nhiệt trong dãy muối carbonate từ MgCO3 đến BaCO3 biến đổi như thế nào?",
    choices: ["Tăng dần.", "Giảm dần.", "Không có quy luật.", "Không đổi."],
    correctIndex: 0,
    explanation: "Độ bền nhiệt của muối carbonate kim loại kiềm thổ tăng dần từ Mg đến Ba, BaCO3 cần nhiệt độ cao hơn để phân huỷ.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ở nhiệt độ phòng, hydroxide nào sau đây có độ tan lớn nhất?",
    choices: ["Mg(OH)2.", "Sr(OH)2.", "Ba(OH)2.", "Ca(OH)2."],
    correctIndex: 2,
    explanation: "Độ tan hydroxide kim loại kiềm thổ tăng dần từ Mg đến Ba nên Ba(OH)2 tan nhiều nhất trong 4 lựa chọn.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Khi để vôi sống trong không khí ẩm một thời gian sẽ có hiện tượng một phần bị chuyển hoá trở lại thành đá vôi. Khí nào sau đây có trong không khí gây ra hiện tượng trên?",
    choices: ["Oxygen.", "Methane.", "Nitrogen.", "Carbon dioxide."],
    correctIndex: 3,
    explanation: "CaO hấp thụ hơi ẩm tạo Ca(OH)2, sau đó Ca(OH)2 phản ứng với CO2 trong không khí tạo lại CaCO3.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đun nóng tinh thể CaF2 với dung dịch H2SO4 đặc ở nhiệt độ khoảng 250 °C, thu được khí nào sau đây?",
    choices: ["SO2.", "F2.", "HF.", "H2S."],
    correctIndex: 2,
    explanation: "CaF2 + H2SO4 đặc, nóng → CaSO4 + 2HF↑, đây là phản ứng điều chế khí HF.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho dung dịch HCl vào dung dịch X thấy sủi bọt khí, nếu cho dung dịch Ca(OH)2 vào dung dịch X sinh ra kết tủa. Dung dịch X là",
    choices: ["Na2SO4.", "KNO3.", "Ca(HCO3)2.", "BaCl2."],
    correctIndex: 2,
    explanation: "Ca(HCO3)2 + HCl → CaCl2 + H2O + CO2↑ (sủi bọt khí); Ca(HCO3)2 + Ca(OH)2 → 2CaCO3↓ + 2H2O (kết tủa) — cả hai hiện tượng đều khớp.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho một mẩu Na vào dung dịch MgSO4 dư, thu được kết tủa X và chất khí Y. Hai chất X, Y lần lượt là",
    choices: ["Mg, O2.", "Mg, H2.", "Mg(OH)2, H2.", "Mg(OH)2, O2."],
    correctIndex: 2,
    explanation: "Na phản ứng với nước trước tạo NaOH và khí H2 (Y); NaOH sinh ra phản ứng với MgSO4 dư tạo kết tủa Mg(OH)2 (X).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Tiến hành các thí nghiệm sau: (1) Cho mẩu nhỏ Na vào cốc đựng nước dư. (2) Điện phân dung dịch KCl bão hoà, có màng ngăn điện cực. (3) Cho dung dịch H2SO4 vào dung dịch Ba(HCO3)2. (4) Đun sôi dung dịch gồm CaCl2 và NaHCO3. Số thí nghiệm tạo ra chất khí là",
    choices: ["4.", "2.", "3.", "1."],
    correctIndex: 0,
    explanation:
      "(1) Na+H2O sinh khí H2. (2) điện phân KCl có màng ngăn sinh H2 và Cl2. (3) H2SO4+Ba(HCO3)2 tạo kết tủa BaSO4 và sinh khí CO2. (4) đun sôi dung dịch chứa NaHCO3 giải phóng CO2. Cả 4 thí nghiệm đều tạo khí.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Tiến hành các thí nghiệm sau: (1) Sục khí CO2 dư vào dung dịch Ca(OH)2. (2) Cho dung dịch NaOH dư vào dung dịch Ba(HCO3)2. (3) Đun sôi một mẫu nước có tính cứng tạm thời. (4) Cho dung dịch KHSO4 vào dung dịch Ba(OH)2. Khi kết thúc phản ứng, số thí nghiệm thu được kết tủa là",
    choices: ["1.", "3.", "2.", "4."],
    correctIndex: 1,
    explanation:
      "(1) CO2 dư hoà tan kết tủa CaCO3 thành Ca(HCO3)2 tan nên không còn kết tủa. (2) NaOH dư chuyển hết HCO3- thành CO3^2-, kết hợp Ba^2+ tạo kết tủa BaCO3. (3) đun sôi nước cứng tạm thời tạo kết tủa carbonate. (4) KHSO4+Ba(OH)2 tạo kết tủa BaSO4. Có 3 thí nghiệm tạo kết tủa: (2), (3), (4).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Vôi tôi được sử dụng trong nuôi trồng thuỷ sản để cải tạo ao, đầm trước khi bắt đầu vụ mới. Khối lượng vôi tôi để cải tạo một đầm nuôi tôm rộng 3 000 m2 với hàm lượng 8 kg/100 m2 là",
    choices: ["300 kg.", "80 kg.", "30 kg.", "240 kg."],
    correctIndex: 3,
    explanation: "Khối lượng vôi tôi = (3000/100) × 8 = 240 kg.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Từ hai muối X và Y thực hiện các sơ đồ phản ứng hoá học sau: (a) X → X1 + CO2; (b) X1 + H2O → X2; (c) X2 + Y → X + Y1 + H2O; (d) X2 + 2Y → X + Y2 + 2H2O. Hai chất Y1, Y2 thoả mãn sơ đồ trên lần lượt là",
    choices: ["Na2CO3, NaOH.", "NaHCO3, Ca(OH)2.", "Ca(OH)2, NaHCO3.", "NaOH, Na2CO3."],
    correctIndex: 3,
    explanation:
      "X=CaCO3 (nhiệt phân tạo X1=CaO+CO2); X1+H2O→X2=Ca(OH)2. Với Y=NaHCO3: Ca(OH)2+NaHCO3→CaCO3+NaOH+H2O (Y1=NaOH); Ca(OH)2+2NaHCO3→CaCO3+Na2CO3+2H2O (Y2=Na2CO3).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Thực hiện các sơ đồ phản ứng hoá học sau: X1 + H2O →(điện phân dung dịch, màng ngăn) X2 + X3↑ + H2↑; X2 + X4 → BaCO3↓ + Na2CO3 + H2O; X4 + X5 → BaSO4↓ + K2SO4 + CO2↑ + H2O. Nhận định nào sau đây đúng?",
    choices: ["X2 là KOH.", "X5 là KHSO4.", "X4 là NaHCO3.", "X1 là KCl."],
    correctIndex: 1,
    explanation:
      "X1=NaCl, điện phân dung dịch tạo X2=NaOH, X3=Cl2. X2(NaOH)+X4→BaCO3+Na2CO3+H2O nên X4=Ba(HCO3)2 (2NaOH+Ba(HCO3)2→BaCO3+Na2CO3+2H2O). X4+X5→BaSO4+K2SO4+CO2+H2O nên X5=KHSO4 (Ba(HCO3)2+2KHSO4→BaSO4+K2SO4+2CO2+2H2O).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Tiến hành thí nghiệm theo các bước sau: Bước 1: chuẩn bị hai ống nghiệm, ống (1) chứa 2 mL dung dịch CaCl2, ống (2) chứa 2 mL dung dịch BaCl2 1M. Bước 2: nhỏ đồng thời vào mỗi ống nghiệm 3 giọt dung dịch CuSO4 1M, thấy ống (1) xuất hiện kết tủa chậm hơn và ít hơn so với ống (2). Nhận định nào sau đây đúng khi so sánh CaSO4 với BaSO4?",
    choices: ["Khó nhiệt phân hơn.", "Khó thuỷ phân hơn.", "Dễ kết tủa hơn.", "Dễ tan hơn."],
    correctIndex: 3,
    explanation: "CaSO4 kết tủa chậm hơn, ít hơn BaSO4 trong cùng điều kiện chứng tỏ CaSO4 dễ tan hơn (độ tan lớn hơn) so với BaSO4.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một cốc nước chứa nhiều các ion sau: Ca^2+, Mg^2+, Cl-, SO4^2-. Nước trong cốc trên thuộc loại",
    choices: ["có tính cứng vĩnh cửu.", "không có tính cứng.", "có tính cứng tạm thời.", "có tính cứng toàn phần."],
    correctIndex: 0,
    explanation: "Nước chứa Ca^2+, Mg^2+ đi kèm gốc Cl-, SO4^2- (không có HCO3-) là nước cứng vĩnh cửu, không thể làm mềm bằng đun sôi.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các nhận định sau về tác hại của nước cứng: (1) làm giảm bọt khi giặt quần áo bằng xà phòng; (2) làm đường ống dẫn nước đóng cặn, giảm lưu lượng nước; (3) làm thức ăn lâu chín và giảm mùi vị; (4) làm nồi hơi phủ cặn, gây tốn nhiên liệu và có nguy cơ gây nổ. Số nhận định đúng là",
    choices: ["2.", "1.", "3.", "4."],
    correctIndex: 3,
    explanation: "Cả 4 nhận định đều là tác hại thực tế và đúng của nước cứng.",
    difficulty: "THONG_HIEU",
  },
  // Bài 26. Ôn tập chương VII
  {
    content: "Trong nhóm IA và IIA, theo chiều từ trên xuống dưới trong mỗi nhóm, tính kim loại biến đổi như thế nào?",
    choices: ["Không đổi.", "Giảm dần.", "Tăng dần.", "Không có quy luật."],
    correctIndex: 2,
    explanation: "Theo chiều từ trên xuống trong nhóm, bán kính nguyên tử tăng nên tính kim loại tăng dần.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi đun nóng nước tự nhiên, muối nào sau đây bị phân huỷ tạo thành cặn đá vôi trong phích nước, ấm đun nước?",
    choices: ["Ca3(PO4)2.", "CaCl2.", "CaSO4.", "Ca(HCO3)2."],
    correctIndex: 3,
    explanation: "Ca(HCO3)2 khi đun nóng bị phân huỷ tạo kết tủa CaCO3 bám thành cặn đá vôi.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong quá trình Solvay, NH3 được tái chế khi cho dung dịch NH4Cl tác dụng với",
    choices: ["CaO.", "NaOH.", "KOH.", "Ba(OH)2."],
    correctIndex: 0,
    explanation: "Trong quá trình Solvay, vôi (CaO, qua Ca(OH)2) được dùng để tái sinh NH3 từ dung dịch NH4Cl vì chi phí thấp và sẵn có trong công nghiệp.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Ion Ca^2+ (Z = 20) đóng vai trò thiết yếu trong việc phát triển xương, giúp duy trì hoạt động của cơ bắp, kích thích máu lưu thông, điều tiết một số loại hormone,... Tổng số proton và electron của ion Ca^2+ là",
    choices: ["40.", "42.", "38.", "18."],
    correctIndex: 2,
    explanation: "Ca có 20 proton; ion Ca^2+ mất 2 electron nên còn 18 electron. Tổng số hạt = 20+18 = 38.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở nhiệt độ phòng, muối nào sau đây dễ tan trong nước?",
    choices: ["SrSO4.", "MgSO4.", "CaSO4.", "BaSO4."],
    correctIndex: 1,
    explanation: "MgSO4 tan tốt trong nước; SrSO4, CaSO4, BaSO4 đều ít tan hoặc gần như không tan.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi đốt nóng tinh thể NaCl trong ngọn lửa đèn khí không màu thì tạo ra ngọn lửa có màu",
    choices: ["đỏ cam.", "tím nhạt.", "vàng.", "đỏ tía."],
    correctIndex: 2,
    explanation: "Na cho ngọn lửa màu vàng đặc trưng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Các đại dương là những kho muối vô tận với nhiều khoáng chất có giá trị dinh dưỡng cao. Trong nước biển, hai nguyên tố kim loại có nhiều nhất là",
    choices: ["sodium và magnesium.", "đồng và kẽm.", "nhôm và sắt.", "vàng và bạc."],
    correctIndex: 0,
    explanation: "Sodium và magnesium (chủ yếu dưới dạng NaCl, MgCl2) là hai kim loại hoà tan phổ biến nhất trong nước biển.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại Na ở chu kì 3, nhóm IA trong bảng tuần hoàn. Cấu hình electron lớp ngoài cùng của nguyên tử Na ở trạng thái cơ bản là",
    choices: ["3s2 3p5.", "3s2.", "3s1.", "3s2 3p1."],
    correctIndex: 2,
    explanation: "Na có cấu hình [Ne]3s1, lớp ngoài cùng là 3s1.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Các hợp chất dễ tan của kim loại kiềm, kiềm thổ là thành phần cung cấp dinh dưỡng của nhiều loại phân bón hoá học phổ biến. Hợp chất nào sau đây dễ tan, là thành phần dinh dưỡng chính trong phân bón superphosphate?",
    choices: ["KCl.", "CaSO4·2H2O.", "NaNO3.", "Ca(H2PO4)2."],
    correctIndex: 3,
    explanation: "Ca(H2PO4)2 tan tốt, là thành phần dinh dưỡng chính (cung cấp phosphorus) trong phân bón superphosphate.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nhóm IA nào sau đây dễ mất electron hoá trị nhất, được dùng sản xuất tế bào quang điện?",
    choices: ["Cs.", "Li.", "Na.", "K."],
    correctIndex: 0,
    explanation: "Cs có bán kính lớn nhất, năng lượng ion hoá thấp nhất trong nhóm IA, dễ mất electron hoá trị nhất nên được dùng trong tế bào quang điện.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong các kim loại nhóm IA từ Li đến Cs, nhiệt độ nóng chảy và độ cứng biến đổi như thế nào?",
    choices: ["Không đổi.", "Giảm dần.", "Tăng dần.", "Không có quy luật."],
    correctIndex: 1,
    explanation: "Cả nhiệt độ nóng chảy và độ cứng của kim loại kiềm đều giảm dần từ Li đến Cs.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Thực hiện bốn phản ứng hoá học theo sơ đồ: NaOH →(+CO2) X →(+NaOH) Y →(+Ca(OH)2) Z →(t°) T. Biết X, Y, Z, T là các hợp chất của kim loại. Công thức hoá học của T là",
    choices: ["NaOH.", "CaCO3.", "Na2CO3.", "CaO."],
    correctIndex: 3,
    explanation:
      "NaOH+CO2→X=NaHCO3; X+NaOH→Y=Na2CO3; Y+Ca(OH)2→Z=CaCO3 (+2NaOH); Z→(t°) T=CaO (+CO2).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Xét phản ứng phân huỷ muối carbonate của kim loại nhóm IIA: MCO3(s) → MO(s) + CO2(g). Từ MgCO3 đến BaCO3, biến thiên enthalpy chuẩn của phản ứng biến đổi như thế nào?",
    choices: ["Không đổi.", "Giảm dần.", "Tăng dần.", "Không có quy luật."],
    correctIndex: 2,
    explanation: "Biến thiên enthalpy chuẩn của phản ứng phân huỷ tăng dần từ MgCO3 đến BaCO3, phù hợp với độ bền nhiệt tăng dần của các muối carbonate.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Ở nhiệt độ thường, độ tan của các hydroxide tăng dần trong dãy từ Mg(OH)2 đến Ba(OH)2. Từ thông tin này có thể dự đoán được khả năng phản ứng với nước của các kim loại từ Mg đến Ba biến đổi như thế nào?",
    choices: ["Tăng dần.", "Không đổi.", "Không có quy luật.", "Giảm dần."],
    correctIndex: 0,
    explanation: "Độ tan hydroxide tăng dần từ Mg đến Ba tương ứng với khả năng phản ứng với nước của kim loại cũng tăng dần (Mg phản ứng chậm, Ba phản ứng mạnh với nước).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nước chứa nhiều các ion nào sau đây có tính cứng toàn phần?",
    choices: ["Mg^2+, Ca^2+, HCO3-, SO4^2-.", "Na+, K+, SO4^2-, Cl-.", "Mg^2+, Ca^2+, HCO3-.", "Mg^2+, Ca^2+, SO4^2-, Cl-."],
    correctIndex: 0,
    explanation: "Nước cứng toàn phần chứa đồng thời cả gốc HCO3- (cứng tạm thời) và gốc SO4^2-/Cl- (cứng vĩnh cửu) cùng với Mg^2+, Ca^2+.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Phân tích một mẫu nước tự nhiên thấy chứa nhiều các ion: Na+, Ca^2+, HCO3-, Cl- và SO4^2-. Chất nào sau đây có thể làm mềm mẫu nước trên?",
    choices: ["Na2CO3.", "Ca(OH)2.", "NaOH.", "HCl."],
    correctIndex: 0,
    explanation: "Na2CO3 phản ứng với Ca^2+ tạo kết tủa CaCO3, loại bỏ được ion gây cứng dù là cứng tạm thời hay vĩnh cửu; Ca(OH)2, NaOH chỉ hiệu quả với cứng tạm thời (gốc HCO3-).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một loại nước cứng khi đun sôi thì trở thành nước mềm. Trong loại nước này có hoà tan những hợp chất nào sau đây?",
    choices: ["Ca(HCO3)2 và Mg(HCO3)2.", "Ca(HCO3)2 và MgSO4.", "CaSO4 và MgCl2.", "MgCl2 và CaCl2."],
    correctIndex: 0,
    explanation: "Nước cứng tạm thời (làm mềm được bằng đun sôi) chứa các muối bicarbonate Ca(HCO3)2, Mg(HCO3)2, khi đun sôi phân huỷ tạo kết tủa carbonate.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho sơ đồ chuyển hoá sau: CaO →(+X) Y →(+Z) CaCO3 →(+Z+X) T →(+E) CaSO4. Biết X, Y, Z, T, E là các hợp chất khác nhau; mỗi mũi tên ứng với một phương trình hoá học. Các chất Z, E thoả mãn sơ đồ trên lần lượt là",
    choices: ["Na2CO3, H2SO4.", "CO2, KHSO4.", "NaHCO3, Na2SO4.", "CO2, BaSO4."],
    correctIndex: 1,
    explanation:
      "X=H2O: CaO+H2O→Ca(OH)2 (Y). Y+Z→CaCO3 với Z=CO2: Ca(OH)2+CO2→CaCO3+H2O. CaCO3+CO2+H2O→Ca(HCO3)2 (T). T+E→CaSO4 với E=KHSO4: Ca(HCO3)2+2KHSO4→CaSO4+K2SO4+2CO2+2H2O.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Các dung dịch muối ăn, phèn chua, nước vôi trong được kí hiệu ngẫu nhiên là X, Y, Z. Một số kết quả thí nghiệm: X + dung dịch phenolphthalein → chuyển màu hồng; Z + dung dịch BaCl2 → có kết tủa trắng. Các dung dịch ban đầu (muối ăn, phèn chua, nước vôi trong) tương ứng với các kí hiệu là",
    choices: ["Y, Z, X.", "Z, X, Y.", "X, Y, Z.", "Y, X, Z."],
    correctIndex: 0,
    explanation:
      "X chuyển phenolphthalein sang hồng (môi trường kiềm) nên X là nước vôi trong. Z tạo kết tủa trắng với BaCl2 (chứa gốc SO4^2-) nên Z là phèn chua. Còn lại Y là muối ăn. Vậy muối ăn, phèn chua, nước vôi trong tương ứng Y, Z, X.",
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
        source: "SBT Hóa 12 - Kết nối tri thức (Chương 7 - Nguyên tố nhóm IA và IIA)",
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
