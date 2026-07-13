import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AG: bài tập mining từ SBT Hóa 11 - Kết nối tri thức thật (Tài liệu/Lớp 11/Hợp chất
// carbonyl - Carboxylic acid/carbonyl-carboxylic.zip -> "(TỜ 39)-SÁCH BT KNTT-Chuong VI.pdf",
// đọc bằng pdftoppm + thị giác). Chỉ lấy câu SINGLE_CHOICE — bỏ qua Đúng/Sai nhóm, câu cần hình
// vẽ/đồ thị/sơ đồ thí nghiệm để xác định số liệu, câu tự luận (viết phương trình, xác định công
// thức cấu tạo, tính toán không có lựa chọn), và câu có lỗi in ấn (trùng đáp án, hoặc kết quả tự
// giải không khớp bất kỳ đáp án nào). Đáp án tự giải bằng kiến thức hóa học (phản ứng tráng bạc,
// phản ứng iodoform, tính oxi hoá - khử của aldehyde, so sánh nhiệt độ sôi, đếm đồng phân...) và
// kiểm chứng lại trước khi đưa vào (SBT không in đáp án).
const CHAPTER_ID = "cmrelkc5u0005vhus9ljt4m4v"; // Lớp 11 - Chương 6. Hợp chất carbonyl - Carboxylic acid

const QUESTIONS = [
  // Bài 23. Hợp chất carbonyl
  {
    content: "Công thức tổng quát của hợp chất carbonyl no, đơn chức, mạch hở là",
    choices: ["CnH2nO.", "CnH2n+2O.", "CnH2n-2O.", "CnH2n-4O."],
    correctIndex: 0,
    explanation: "Hợp chất carbonyl (aldehyde/ketone) no, đơn chức, mạch hở có công thức chung CnH2nO (1 độ bất bão hoà ứng với liên kết đôi C=O).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong những cặp chất sau đây, cặp chất nào thuộc loại hợp chất carbonyl?",
    choices: ["CH3OH, C2H5OH.", "C6H5OH, C6H5CH2OH.", "CH3CHO, CH3OCH3.", "CH3CHO, CH3COCH3."],
    correctIndex: 3,
    explanation: "CH3CHO (aldehyde) và CH3COCH3 (ketone) đều là hợp chất carbonyl (chứa nhóm C=O). Các cặp còn lại là alcohol/phenol hoặc alcohol/ether, không phải carbonyl.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hợp chất nào sau đây có tên gọi là butanal?",
    choices: ["CH3CH2COCH3.", "CH3CH2CHO.", "CH3CH2CH2CHO.", "(CH3)2CHCHO."],
    correctIndex: 2,
    explanation: "Butanal là aldehyde mạch thẳng 4 carbon: CH3CH2CH2CHO. CH3CH2COCH3 là ketone (butan-2-one); CH3CH2CHO chỉ có 3 carbon (propanal); (CH3)2CHCHO là 2-methylpropanal.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho hợp chất carbonyl có công thức cấu tạo (CH3)2CH–CO–CH3. Tên theo danh pháp thay thế của hợp chất carbonyl đó là",
    choices: ["2-methylbutan-3-one.", "3-methylbutan-2-one.", "3-methylbutan-2-ol.", "1,1-dimethylpropan-2-one."],
    correctIndex: 1,
    explanation: "Đánh số mạch chính 4 carbon để nhóm C=O có locant nhỏ nhất: C1(CH3)-C2(C=O)-C3(CH(CH3))-C4(CH3), nhóm methyl ở C3 → 3-methylbutan-2-one.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho ba hợp chất hữu cơ có phân tử khối tương đương: (1) C3H8; (2) C2H5OH; (3) CH3CHO. Thứ tự giảm dần nhiệt độ sôi là",
    choices: ["(2) > (3) > (1).", "(1) > (2) > (3).", "(3) > (2) > (1).", "(2) > (1) > (3)."],
    correctIndex: 0,
    explanation: "Nhiệt độ sôi: C2H5OH (78,4°C, có liên kết hydrogen) > CH3CHO (20,2°C, chỉ có tương tác lưỡng cực) > C3H8 (-42°C, chỉ có lực van der Waals).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thực hiện phản ứng khử hợp chất carbonyl sau: CH3COCH2CH3 + 2[H] →(NaBH4)→ ? Sản phẩm thu được là",
    choices: ["propanol.", "isopropyl alcohol.", "butan-1-ol.", "butan-2-ol."],
    correctIndex: 3,
    explanation: "CH3COCH2CH3 (butan-2-one) bị khử bởi NaBH4 tạo alcohol bậc II tương ứng: CH3CH(OH)CH2CH3 (butan-2-ol).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Số đồng phân có cùng công thức phân tử C4H8O, có khả năng tham gia phản ứng tráng bạc là",
    choices: ["2.", "3.", "4.", "1."],
    correctIndex: 0,
    explanation: "Phản ứng tráng bạc chỉ xảy ra với aldehyde. C4H8O có 2 đồng phân aldehyde: CH3CH2CH2CHO (butanal) và (CH3)2CHCHO (2-methylpropanal).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khử hợp chất hữu cơ X bằng LiAlH4, thu được (CH3)2CH–CH2–CH2OH. Chất X có tên là",
    choices: ["3-methylbutanal.", "2-methylbutan-3-al.", "2-methylbutanal.", "3-methylbutan-3-al."],
    correctIndex: 0,
    explanation: "LiAlH4 khử aldehyde thành alcohol bậc I tương ứng (giữ nguyên mạch carbon). Alcohol sản phẩm (CH3)2CHCH2CH2OH ứng với aldehyde ban đầu (CH3)2CHCH2CHO, tức 3-methylbutanal.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phản ứng CH3–CH=O + HCN → CH3CH(OH)CN thuộc loại phản ứng nào sau đây?",
    choices: ["Phản ứng thế.", "Phản ứng cộng.", "Phản ứng tách.", "Phản ứng oxi hoá – khử."],
    correctIndex: 1,
    explanation: "HCN cộng vào liên kết đôi C=O của aldehyde tạo cyanohydrin — đây là phản ứng cộng nucleophin đặc trưng của hợp chất carbonyl.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong các hợp chất sau, hợp chất nào tham gia phản ứng iodoform?",
    choices: ["HCHO.", "CH3CHO.", "CH3COCH3.", "Cả B và C."],
    correctIndex: 3,
    explanation: "Phản ứng iodoform yêu cầu cấu trúc CH3-CO- hoặc CH3-CHO. Cả CH3CHO (acetaldehyde) và CH3COCH3 (acetone) đều thoả mãn cấu trúc này; HCHO (formaldehyde) không có nhóm CH3 nên không phản ứng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Để phân biệt ba hợp chất HCHO, CH3CHO, CH3COCH3, một học sinh tiến hành thí nghiệm thu được kết quả sau (√: có phản ứng; x: không phản ứng): Chất (1) — Tollens: √, I2/NaOH: x. Chất (2) — Tollens: x, I2/NaOH: √. Chất (3) — Tollens: √, I2/NaOH: √. Ba chất (1), (2), (3) lần lượt là",
    choices: [
      "HCHO, CH3CHO, CH3COCH3.",
      "CH3CHO, HCHO, CH3COCH3.",
      "HCHO, CH3COCH3, CH3CHO.",
      "CH3CHO, CH3COCH3, HCHO.",
    ],
    correctIndex: 2,
    explanation: "HCHO phản ứng Tollens nhưng không có nhóm CH3 nên không phản ứng iodoform → chất (1). CH3COCH3 không phản ứng Tollens (không phải aldehyde) nhưng có phản ứng iodoform (là methyl ketone) → chất (2). CH3CHO vừa phản ứng Tollens vừa phản ứng iodoform (có cấu trúc CH3-CHO) → chất (3).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Formalin có tác dụng diệt khuẩn nên được dùng để bảo quản mẫu sinh vật, tẩy uế, khử trùng,... Formalin là",
    choices: [
      "dung dịch rất loãng của aldehyde formic.",
      "dung dịch aldehyde formic 37 – 40%.",
      "aldehyde formic nguyên chất.",
      "tên gọi khác của aldehyde formic.",
    ],
    correctIndex: 1,
    explanation: "Formalin là dung dịch nước của formaldehyde (aldehyde formic) với nồng độ khoảng 37-40%.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hợp chất CH3CH=CH–CHO có danh pháp thay thế là",
    choices: ["but-2-enal.", "but-2-en-4-al.", "buten-1-al.", "butenal."],
    correctIndex: 0,
    explanation: "Đánh số mạch chính từ nhóm CHO (C1): C1(CHO)-C2=C3-C4(CH3), liên kết đôi ở vị trí 2 → but-2-enal.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong các hợp chất hữu cơ có công thức phân tử sau đây, chất nào không thể là aldehyde?",
    choices: ["C3H6O.", "C4H6O.", "C4H8O.", "C4H10O."],
    correctIndex: 3,
    explanation: "Aldehyde cần ít nhất 1 độ bất bão hoà (liên kết đôi C=O). C4H10O là công thức bão hoà hoàn toàn (độ bất bão hoà = 0) nên không thể chứa nhóm carbonyl, chỉ có thể là alcohol hoặc ether no.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "X là hợp chất no, mạch hở, chỉ chứa nhóm chức aldehyde và có công thức phân tử là C3H4O2. Cho 1 mol X phản ứng với thuốc thử Tollens thì thu được tối đa số mol Ag kim loại là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 3,
    explanation: "C3H4O2 no, mạch hở, chỉ chứa nhóm CHO → X là dialdehyde OHC-CH2-CHO (propanedial), có 2 nhóm CHO. Mỗi nhóm CHO phản ứng Tollens sinh 2 mol Ag, nên 1 mol X (2 nhóm CHO) cho tối đa 4 mol Ag.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Số đồng phân có cùng công thức phân tử C5H10O có khả năng tham gia phản ứng iodoform là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 1,
    explanation: "C5H10O có 3 ketone: pentan-2-one (CH3-CO-CH2CH2CH3, có nhóm CH3-CO- → phản ứng iodoform), pentan-3-one (CH3CH2-CO-CH2CH3, không có CH3 trực tiếp gắn carbonyl → không phản ứng), 3-methylbutan-2-one (CH3-CO-CH(CH3)2, có nhóm CH3-CO- → phản ứng iodoform). Các aldehyde C5H10O đều không có CH3 gắn trực tiếp vào carbon carbonyl nên không phản ứng iodoform. Vậy có 2 đồng phân phản ứng được.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phản ứng giữa CH3CHO với NaBH4 và với Cu(OH)2 đun nóng chứng tỏ rằng CH3CHO",
    choices: ["có tính oxi hoá.", "có tính khử.", "vừa có tính oxi hoá, vừa có tính khử.", "có tính acid."],
    correctIndex: 2,
    explanation: "Với NaBH4, CH3CHO bị khử thành alcohol (CH3CHO nhận electron/hydride → thể hiện tính oxi hoá). Với Cu(OH)2 đun nóng, CH3CHO bị oxi hoá thành CH3COOH, khử Cu^2+ thành Cu2O (CH3CHO nhường electron → thể hiện tính khử). Vậy CH3CHO vừa có tính oxi hoá vừa có tính khử.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhiều vụ ngộ độc rượu do sử dụng rượu có lẫn methanol. Khi hấp thụ vào cơ thể, ban đầu methanol được chuyển hoá ở gan tạo thành chất nào sau đây?",
    choices: ["C2H5OH.", "HCHO.", "CH3CHO.", "CH3COCH3."],
    correctIndex: 1,
    explanation: "Methanol bị enzyme alcohol dehydrogenase ở gan oxi hoá lần đầu thành formaldehyde (HCHO), sau đó tiếp tục oxi hoá thành formic acid (HCOOH) gây độc.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho phản ứng sau: (CH3)2CHCOCH3 + 2[H] →(LiAlH4)→ ? Sản phẩm của phản ứng là chất nào sau đây?",
    choices: [
      "2-methylbutan-3-ol.",
      "3-methylbutan-2-ol.",
      "1,1-dimethylpropan-2-ol.",
      "3,3-dimethylpropan-2-ol.",
    ],
    correctIndex: 1,
    explanation: "(CH3)2CHCOCH3 (3-methylbutan-2-one) bị khử bởi LiAlH4 thành alcohol bậc II tương ứng: (CH3)2CHCH(OH)CH3 (3-methylbutan-2-ol).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Oxi hoá alcohol nào sau đây bằng CuO tạo thành sản phẩm có phản ứng iodoform?",
    choices: ["CH3OH.", "CH3CH2OH.", "CH3CH2CH2OH.", "(CH3)2CHCH2OH."],
    correctIndex: 1,
    explanation: "CH3CH2OH (ethanol) oxi hoá bởi CuO tạo CH3CHO (acetaldehyde), có cấu trúc CH3-CHO nên phản ứng được iodoform. Các alcohol còn lại oxi hoá cho sản phẩm không có nhóm CH3 gắn trực tiếp vào carbon carbonyl.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây vừa phản ứng được với thuốc thử Tollens vừa phản ứng tạo iodoform?",
    choices: ["Formaldehyde.", "Acetaldehyde.", "Benzaldehyde.", "Acetone."],
    correctIndex: 1,
    explanation: "Acetaldehyde (CH3CHO) vừa là aldehyde (phản ứng Tollens) vừa có cấu trúc CH3-CHO (phản ứng iodoform). Formaldehyde và benzaldehyde không có nhóm CH3 nên không phản ứng iodoform; acetone không phản ứng Tollens vì không phải aldehyde.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong công nghiệp, quy trình cumene dùng để điều chế phenol và chất nào sau đây?",
    choices: ["Methanal.", "Ethanal.", "Propanal.", "Propan-2-one."],
    correctIndex: 3,
    explanation: "Quy trình cumene oxi hoá cumene rồi phân cắt bằng acid, tạo đồng thời phenol và acetone (propan-2-one) làm sản phẩm phụ có giá trị.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhận xét nào sau đây không đúng?",
    choices: [
      "Aldehyde bị khử tạo thành alcohol bậc I.",
      "Ketone bị khử tạo thành alcohol bậc II.",
      "Aldehyde phản ứng với thuốc thử Tollens tạo lớp bạc sáng.",
      "Ketone phản ứng với Cu(OH)2 đun nóng tạo kết tủa màu đỏ gạch.",
    ],
    correctIndex: 3,
    explanation: "Chỉ aldehyde (không phải ketone) mới phản ứng với Cu(OH)2 đun nóng tạo kết tủa Cu2O màu đỏ gạch, do ketone không có tính khử như aldehyde.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trước đây, người ta thường cho formol vào bánh phở, bún để làm trắng và tạo độ dai, tuy nhiên do formol có tác hại với sức khoẻ con người nên hiện nay đã bị cấm sử dụng trong thực phẩm. Formol là chất nào sau đây?",
    choices: ["Methanol.", "Phenol.", "Formaldehyde.", "Acetone."],
    correctIndex: 2,
    explanation: "Formol (formalin) là dung dịch formaldehyde, một chất độc bị cấm sử dụng trong thực phẩm.",
    difficulty: "NHAN_BIET",
  },
  // Bài 24. Carboxylic acid
  {
    content: "Công thức tổng quát của carboxylic acid no, đơn chức, mạch hở là",
    choices: ["CnH2n+2O2.", "CnH2nO2.", "CnH2n+2O.", "CnH2nO."],
    correctIndex: 1,
    explanation: "Carboxylic acid no, đơn chức, mạch hở có công thức chung CnH2nO2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Số đồng phân carboxylic acid có công thức phân tử C4H8O2 là",
    choices: ["2.", "3.", "4.", "5."],
    correctIndex: 0,
    explanation: "C4H8O2 có 2 đồng phân carboxylic acid: CH3CH2CH2COOH (butanoic acid) và (CH3)2CHCOOH (2-methylpropanoic acid).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi uống rượu có lẫn methanol, methanol có trong rượu được chuyển hoá ở gan tạo thành formic acid gây ngộ độc cho cơ thể, làm suy giảm thị lực và có thể gây mù. Formic acid có công thức cấu tạo là",
    choices: ["CH3OH.", "HCHO.", "HCOOH.", "CH3COOH."],
    correctIndex: 2,
    explanation: "Formic acid có công thức cấu tạo HCOOH.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Propanoic acid có công thức cấu tạo là",
    choices: ["CH3CH2OH.", "CH3COOH.", "CH3CH2COOH.", "CH3CH2CH2COOH."],
    correctIndex: 2,
    explanation: "Propanoic acid (3 carbon) có công thức cấu tạo CH3CH2COOH.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "(CH3)2CHCH2COOH có tên gọi theo danh pháp thay thế là",
    choices: [
      "dimethylpropanoic acid.",
      "2-methylbutanoic acid.",
      "3-methylbutanoic acid.",
      "pentanoic acid.",
    ],
    correctIndex: 2,
    explanation: "Đánh số mạch chính từ COOH (C1): C1(COOH)-C2(CH2)-C3(CH(CH3))-C4(CH3), nhóm methyl ở C3 → 3-methylbutanoic acid.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong các chất sau đây, chất nào có nhiệt độ sôi cao nhất?",
    choices: ["CH3CH2OH.", "CH3COOH.", "CH3CHO.", "CH3CH2CH2CH3."],
    correctIndex: 1,
    explanation: "Carboxylic acid có liên kết hydrogen mạnh (hình thành dimer bền) nên có nhiệt độ sôi cao nhất trong 4 chất (CH3COOH bs 118°C, cao hơn ethanol 78,4°C, acetaldehyde 20,2°C và butane -0,5°C).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dung dịch acetic acid không phản ứng được với chất nào sau đây?",
    choices: ["Mg.", "NaOH.", "Na2CO3.", "NaCl."],
    correctIndex: 3,
    explanation: "NaCl là muối trung tính của acid mạnh (HCl), không phản ứng với acid yếu acetic acid. Mg (kim loại), NaOH (base) và Na2CO3 (muối carbonate) đều phản ứng được với acetic acid.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi hoà tan vào nước, acetic acid",
    choices: ["phân li hoàn toàn.", "phân li một phần.", "không phân li.", "không tan trong nước."],
    correctIndex: 1,
    explanation: "Acetic acid là acid yếu, chỉ phân li một phần trong nước (cân bằng điện li).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhận định nào sau đây không đúng khi nói về tính chất hoá học của acetic acid?",
    choices: [
      "Acetic acid là acid yếu, làm đổi màu quỳ tím.",
      "Acetic acid có đầy đủ các tính chất của một acid thông thường.",
      "Acetic acid phản ứng được với ethanol tạo ester.",
      "Acetic acid là acid yếu nên không phản ứng được với đá vôi.",
    ],
    correctIndex: 3,
    explanation: "Dù là acid yếu, acetic acid vẫn đủ mạnh để phản ứng với đá vôi (CaCO3) giải phóng khí CO2 — đây là phản ứng quen thuộc (giấm ăn hoà tan cặn/đá vôi).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một thí nghiệm ester hoá gồm ống nghiệm A chứa hỗn hợp CH3OH, CH3CH2COOH và H2SO4 đặc, được đun nóng và dẫn hơi sang ống nghiệm B ngâm trong nước đá. Chất lỏng thu được ở ống nghiệm B có mùi táo, có tên gọi là",
    choices: ["ethyl formate.", "methyl propionate.", "ethyl propionate.", "propyl formate."],
    correctIndex: 1,
    explanation: "CH3OH (methanol) phản ứng ester hoá với CH3CH2COOH (propanoic/propionic acid) tạo methyl propionate (CH3CH2COOCH3), một ester có mùi táo đặc trưng.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Acetic acid được điều chế bằng phương pháp lên men giấm từ dung dịch chất nào sau đây?",
    choices: ["C2H5OH.", "CH3OH.", "CH3CHO.", "HCOOH."],
    correctIndex: 0,
    explanation: "Phương pháp lên men giấm oxi hoá ethanol (C2H5OH) nhờ vi khuẩn acetic acid để tạo thành acetic acid.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Carboxylic acid X có cấu tạo mạch hở, công thức tổng quát là CnH2n-2O4. Carboxylic acid X thuộc loại",
    choices: ["no, đơn chức.", "không no, đơn chức.", "no và có 2 chức acid.", "không no và có 2 chức acid."],
    correctIndex: 2,
    explanation: "4 nguyên tử oxygen ứng với 2 nhóm -COOH (diacid). Công thức CnH2n-2O4 (ví dụ oxalic acid HOOC-COOH, n=2: 2n-2=2 ✓) tương ứng với diacid no, mạch hở (độ bất bão hoà chỉ đến từ 2 nhóm C=O của 2 chức acid, không có liên kết đôi C=C nào khác).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Số đồng phân cấu tạo carboxylic acid và ester có cùng công thức phân tử C4H8O2 là",
    choices: ["4.", "3.", "6.", "5."],
    correctIndex: 2,
    explanation: "Carboxylic acid: butanoic acid, 2-methylpropanoic acid (2 chất). Ester: methyl propanoate, ethyl acetate, propyl formate, isopropyl formate (4 chất). Tổng cộng 2 + 4 = 6 đồng phân.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "(CH3)2C=CHCOOH có tên gọi theo danh pháp thay thế là",
    choices: [
      "1,1-dimethylpropenoic acid.",
      "3,3-dimethylpropenoic acid.",
      "3-methylbut-2-enoic acid.",
      "2-methylbut-2-enoic acid.",
    ],
    correctIndex: 2,
    explanation: "Đánh số mạch chính từ COOH (C1): C1(COOH)-C2(=CH)-C3(=C(CH3)2), liên kết đôi ở vị trí 2, 2 nhóm methyl ở C3 → 3-methylbut-2-enoic acid.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Benzoic acid và muối sodium của nó có tác dụng ức chế sự phát triển của nấm mốc, nấm men và một số vi khuẩn khác nên thường được sử dụng làm chất bảo quản thực phẩm. Benzoic acid có công thức cấu tạo là",
    choices: ["CH3COOH.", "HCOOH.", "C6H5COOH.", "(COOH)2."],
    correctIndex: 2,
    explanation: "Benzoic acid có công thức cấu tạo C6H5COOH (nhóm COOH gắn trực tiếp vào vòng benzene).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dãy nào sau đây gồm các chất có nhiệt độ sôi tăng dần từ trái qua phải?",
    choices: [
      "C4H10, C2H5OH, CH3CHO, HCOOH, CH3COOH.",
      "C2H5OH, C4H10, CH3CHO, CH3COOH, HCOOH.",
      "CH3CHO, C2H5OH, HCOOH, CH3COOH, C4H10.",
      "C4H10, CH3CHO, C2H5OH, HCOOH, CH3COOH.",
    ],
    correctIndex: 3,
    explanation: "Nhiệt độ sôi: C4H10 (-0,5°C) < CH3CHO (20,2°C) < C2H5OH (78,4°C) < HCOOH (100,8°C) < CH3COOH (118°C).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Giấm ăn được dùng phổ biến trong chế biến thực phẩm, có chứa acetic acid với hàm lượng 4 – 8% về thể tích. Một chai giấm ăn thể tích 500 mL có hàm lượng acetic acid là 5%, thể tích acetic acid có trong chai giấm ăn đó là",
    choices: ["5 mL.", "25 mL.", "50 mL.", "100 mL."],
    correctIndex: 1,
    explanation: "Thể tích acetic acid = 500 × 5% = 25 mL.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho các chất sau: H2O (1), C2H5OH (2), C6H5OH (3), CH3COOH (4). Độ linh động của nguyên tử hydrogen trong nhóm –OH tăng dần theo thứ tự là",
    choices: [
      "(1) < (2) < (3) < (4).",
      "(1) < (2) < (4) < (3).",
      "(2) < (1) < (3) < (4).",
      "(2) < (1) < (4) < (3).",
    ],
    correctIndex: 2,
    explanation: "Độ linh động H tăng theo tính acid: ethanol (yếu nhất, pKa≈16) < nước (pKa≈15,7) < phenol (pKa≈10) < acetic acid (mạnh nhất, pKa≈4,76). Vậy (2) < (1) < (3) < (4).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dung dịch acetic acid phản ứng được với tất cả các chất trong dãy nào sau đây?",
    choices: ["Cu, NaOH, NaCl.", "Zn, CuO, NaCl.", "Zn, CuO, HCl.", "Zn, NaOH, CaCO3."],
    correctIndex: 3,
    explanation: "Zn (kim loại hoạt động, phản ứng với acid), NaOH (base, phản ứng acid-base) và CaCO3 (muối carbonate, phản ứng giải phóng CO2) đều phản ứng được với acetic acid. Các dãy còn lại chứa Cu hoặc NaCl/HCl không phản ứng với acetic acid.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Để loại bỏ lớp cặn màu trắng trong ấm đun nước, người ta có thể dùng dung dịch nào sau đây?",
    choices: ["Giấm ăn.", "Nước.", "Muối ăn.", "Cồn 70°."],
    correctIndex: 0,
    explanation: "Cặn trắng trong ấm chủ yếu là CaCO3, phản ứng được với giấm ăn (chứa acetic acid) để hoà tan, giải phóng CO2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hai chất X và Y có cùng công thức phân tử C3H4O2. Cho X tác dụng với CaCO3 thấy có bọt khí thoát ra, còn Y có thể tham gia phản ứng tráng bạc. Công thức của X và Y lần lượt là",
    choices: [
      "CH2=CHCOOH, OHC–CH2–CHO.",
      "CH2=CH–COOH, CH≡C–O–CH2OH.",
      "HCOO–CH=CH2, OHC–CH2–CHO.",
      "HCOO–CH=CH2, CH≡C–O–CH2OH.",
    ],
    correctIndex: 0,
    explanation: "X phản ứng với CaCO3 sinh khí → X là carboxylic acid: CH2=CHCOOH (acrylic acid). Y phản ứng tráng bạc → Y là dialdehyde: OHC-CH2-CHO (propanedial), có 2 nhóm CHO.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khẳng định nào sau đây không đúng khi nói về đặc điểm của phản ứng ester hoá?",
    choices: [
      "Phản ứng ester hoá là phản ứng thuận nghịch.",
      "Phản ứng ester hoá là phản ứng một chiều.",
      "Phản ứng ester hoá luôn có hiệu suất < 100%.",
      "Phản ứng ester hoá giữa acid và alcohol thường dùng xúc tác là H2SO4 đặc.",
    ],
    correctIndex: 1,
    explanation: "Phản ứng ester hoá là phản ứng thuận nghịch (không phải một chiều), do đó luôn đạt trạng thái cân bằng với hiệu suất < 100%; xúc tác thường dùng là H2SO4 đặc.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Sữa chua được lên men từ sữa bột, sữa bò, sữa dê,... Sữa chua tốt cho hệ tiêu hoá. Vị chua trong sữa chua tạo bởi acid nào sau đây?",
    choices: ["Formic acid.", "Acetic acid.", "Lactic acid.", "Benzoic acid."],
    correctIndex: 2,
    explanation: "Quá trình lên men sữa chua tạo ra lactic acid, chất tạo vị chua đặc trưng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Đồ thị mô tả sự phụ thuộc giá trị nhiệt độ sôi vào số nguyên tử carbon của bốn loại hợp chất alkane, alcohol, aldehyde và carboxylic acid cho thấy bốn đường biểu diễn A, B, C, D xếp theo thứ tự nhiệt độ sôi giảm dần (A cao nhất, D thấp nhất). Đồ thị A, B, C, D lần lượt tương ứng với các loại hợp chất là",
    choices: [
      "alkane, alcohol, aldehyde, carboxylic acid.",
      "alcohol, carboxylic acid, aldehyde, alkane.",
      "carboxylic acid, aldehyde, alcohol, alkane.",
      "carboxylic acid, alcohol, aldehyde, alkane.",
    ],
    correctIndex: 3,
    explanation: "Ở cùng số carbon, nhiệt độ sôi giảm dần theo thứ tự: carboxylic acid (liên kết hydrogen mạnh, tạo dimer) > alcohol (liên kết hydrogen) > aldehyde (chỉ có tương tác lưỡng cực) > alkane (chỉ có lực van der Waals).",
    difficulty: "VAN_DUNG",
  },
  // Bài 25. Ôn tập chương 6
  {
    content: "Cặp chất nào sau đây không là đồng phân của nhau?",
    choices: [
      "HCHO, CH3CHO.",
      "CH2=CHCH2OH, CH3CH2CHO.",
      "CH3COCH3, CH3CH2CHO.",
      "CH3COOH, HCOOCH3.",
    ],
    correctIndex: 0,
    explanation: "HCHO (CH2O) và CH3CHO (C2H4O) có công thức phân tử khác nhau nên không phải đồng phân của nhau. Ba cặp còn lại đều có cùng công thức phân tử (C3H6O hoặc C2H4O2).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ba chất A, B, C có nhiệt độ sôi tăng dần theo thứ tự A (thấp nhất) < B < C (cao nhất) trên biểu đồ cột. Các chất A, B, C lần lượt là",
    choices: [
      "ethanol, acetaldehyde, acetic acid.",
      "acetaldehyde, ethanol, acetic acid.",
      "acetaldehyde, acetic acid, ethanol.",
      "acetic acid, acetaldehyde, ethanol.",
    ],
    correctIndex: 1,
    explanation: "Nhiệt độ sôi tăng dần: acetaldehyde (20,2°C) < ethanol (78,4°C) < acetic acid (118°C), khớp với thứ tự A < B < C trên biểu đồ.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Để phân biệt aldehyde và ketone, có thể dùng thuốc thử nào sau đây?",
    choices: ["Dung dịch acid.", "Dung dịch base.", "I2 trong môi trường kiềm.", "Dung dịch AgNO3 trong NH3."],
    correctIndex: 3,
    explanation: "Thuốc thử Tollens (AgNO3 trong NH3) phản ứng với mọi aldehyde (tạo lớp bạc sáng) nhưng không phản ứng với ketone, là thuốc thử tổng quát để phân biệt hai loại hợp chất này. I2/NaOH (iodoform) chỉ phản ứng với một số aldehyde/ketone có cấu trúc CH3-CO- nhất định, không phân biệt được tổng quát.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhận xét nào sau đây không đúng?",
    choices: [
      "Aldehyde vừa có tính oxi hoá, vừa có tính khử.",
      "Chỉ có ketone tham gia phản ứng tạo iodoform.",
      "Acid và ester no, đơn chức, mạch hở có công thức chung là CnH2nO2.",
      "Carboxylic acid làm đổi màu giấy quỳ.",
    ],
    correctIndex: 1,
    explanation: "Không chỉ ketone mà cả một số aldehyde (như acetaldehyde CH3CHO, có cấu trúc CH3-CHO) cũng tham gia phản ứng tạo iodoform, nên phát biểu B sai.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các chất sau: Na, NaOH, Cu, CuO, CaCO3, CaSO4. Số chất phản ứng được với acetic acid là",
    choices: ["3.", "4.", "5.", "6."],
    correctIndex: 1,
    explanation: "Acetic acid phản ứng với Na, NaOH, CuO, CaCO3 (4 chất). Không phản ứng với Cu (kim loại đứng sau H trong dãy hoạt động) và CaSO4 (muối của acid mạnh hơn).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Số đồng phân cấu tạo mạch hở của acid và ester có công thức phân tử C4H6O2 (không tính đồng phân hình học) là",
    choices: ["5.", "6.", "7.", "8."],
    correctIndex: 3,
    explanation: "Acid không no C4H6O2: but-3-enoic acid, but-2-enoic acid, methacrylic acid (3 chất). Ester không no C4H6O2: allyl formate, prop-1-enyl formate, isopropenyl formate (3 formate ester), vinyl acetate, methyl acrylate (2 ester khác) = 5 ester. Tổng cộng 3 + 5 = 8 đồng phân.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Có bốn chất lỏng có thể tích bằng nhau là ethanol, acetone, acetaldehyde, acetic acid. Tiến hành chưng cất hỗn hợp này, sau một thời gian, hàm lượng chất nào trong bình chưng cất còn lại lớn nhất?",
    choices: ["Ethanol.", "Acetone.", "Acetaldehyde.", "Acetic acid."],
    correctIndex: 3,
    explanation: "Khi chưng cất, chất dễ bay hơi (nhiệt độ sôi thấp) bốc hơi trước và rời khỏi bình; chất khó bay hơi nhất (nhiệt độ sôi cao nhất) còn đọng lại nhiều nhất. Acetic acid có nhiệt độ sôi cao nhất (118°C) trong 4 chất nên còn lại nhiều nhất trong bình chưng cất.",
    difficulty: "VAN_DUNG",
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
        source: "SBT Hóa 11 - Kết nối tri thức (Chương 6 - Hợp chất carbonyl - Carboxylic acid)",
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
