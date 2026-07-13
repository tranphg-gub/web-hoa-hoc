import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AG: bài tập mining từ SBT Hóa 11 - Kết nối tri thức thật (Tài liệu/Lớp 11/Alcohol - Phenol/
// alcohol.zip -> "(TỜ 31) Chuong V - SÁCH BT Hoa 11 - KNTT.pdf", đọc bằng pdftoppm + thị giác).
// Chỉ lấy câu SINGLE_CHOICE — bỏ qua Đúng/Sai nhóm, câu cần hình vẽ cấu trúc/sơ đồ thí nghiệm để
// xác định số liệu, và câu tự luận (viết đồng phân, viết phương trình, giải thích). Đáp án tự
// giải bằng kiến thức hóa học (danh pháp IUPAC, quy tắc Zaitsev, so sánh nhiệt độ sôi, tính acid
// của phenol so với các nấc của carbonic acid, thuốc thử Cu(OH)2...) và kiểm chứng lại trước khi
// đưa vào (SBT không in đáp án).
const CHAPTER_ID = "cmrelkbqs0004vhusaa62fslv"; // Lớp 11 - Chương 5. Dẫn xuất halogen - Alcohol - Phenol

const QUESTIONS = [
  // Bài 19. Dẫn xuất halogen
  {
    content: "Công thức tổng quát của dẫn xuất monochlorine no, mạch hở là",
    choices: ["CnH2n-5Cl.", "CnH2n-3Cl.", "CnH2n-1Cl.", "CnH2n+1Cl."],
    correctIndex: 3,
    explanation: "Alkane no, mạch hở CnH2n+2 khi thế 1 nguyên tử H bằng Cl cho công thức CnH2n+1Cl.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Tên gọi theo danh pháp thay thế của dẫn xuất halogen có công thức cấu tạo CH3CHClCH3 là",
    choices: ["1-chloropropane.", "2-chloropropane.", "3-chloropropane.", "propyl chloride."],
    correctIndex: 1,
    explanation: "CH3-CHCl-CH3 có Cl gắn vào carbon số 2 của mạch propane → 2-chloropropane. \"Propyl chloride\" chỉ là tên thông thường và thực chất chỉ đúng cho đồng phân 1-chloropropane.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dẫn xuất halogen nào sau đây có đồng phân hình học?",
    choices: ["CH2=CHCl.", "CH2=CH–CH2Br.", "CH3CH=CFCH3.", "(CH3)2C=CHI."],
    correctIndex: 2,
    explanation: "CH3-CH=CF-CH3: carbon bên trái mang CH3 và H (khác nhau), carbon bên phải mang F và CH3 (khác nhau) → thoả điều kiện có đồng phân hình học. Các chất còn lại đều có một carbon liên kết đôi mang 2 nhóm thế giống nhau (2H hoặc 2CH3) nên không có đồng phân hình học.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các dẫn xuất halogen sau: (1) C2H5F; (2) C2H5Cl; (3) C2H5Br; (4) C2H5I. Thứ tự giảm dần nhiệt độ sôi là",
    choices: ["(1) > (2) > (3) > (4).", "(1) > (4) > (2) > (3).", "(4) > (3) > (2) > (1).", "(4) > (2) > (1) > (3)."],
    correctIndex: 2,
    explanation: "Nhiệt độ sôi của dẫn xuất halogen tăng dần theo kích thước/khối lượng nguyên tử halogen (lực van der Waals tăng): C2H5I (72,3°C) > C2H5Br (38,4°C) > C2H5Cl (12,3°C) > C2H5F (-37,7°C), tức (4) > (3) > (2) > (1).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho phản ứng hoá học sau: C2H5–Br + NaOH →(t°)→ C2H5–OH + NaBr. Phản ứng trên thuộc loại phản ứng nào sau đây?",
    choices: ["Phản ứng thế.", "Phản ứng cộng.", "Phản ứng tách.", "Phản ứng oxi hoá – khử."],
    correctIndex: 0,
    explanation: "Nguyên tử Br trong C2H5Br bị thay thế bởi nhóm -OH từ NaOH, đây là phản ứng thế nucleophin.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho sơ đồ phản ứng hoá học sau: CH3CHClCH2CH3 →(NaOH, C2H5OH, t°)→ ? Sản phẩm chính theo quy tắc Zaitsev của phản ứng trên là",
    choices: ["but-1-ene.", "but-2-ene.", "but-1-yne.", "but-2-yne."],
    correctIndex: 1,
    explanation: "NaOH/ethanol/t° là điều kiện phản ứng tách (không phải thế). Tách HCl từ 2-chlorobutane có thể tạo but-1-ene (kém bền, ít thế) hoặc but-2-ene (bền hơn, nhiều nhóm thế hơn). Theo quy tắc Zaitsev, sản phẩm chính là alkene bền hơn, tức but-2-ene.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây không phải là dẫn xuất halogen của hydrocarbon?",
    choices: ["CH3CH2Cl.", "CH2=CHBr.", "ClCH2COOH.", "CF3CH2Cl."],
    correctIndex: 2,
    explanation: "ClCH2COOH (chloroacetic acid) vừa chứa halogen vừa chứa nhóm -COOH nên là dẫn xuất halogen của một carboxylic acid (hợp chất tạp chức), không phải dẫn xuất halogen thuần tuý của hydrocarbon (chỉ có C, H và halogen).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhận xét nào sau đây không đúng?",
    choices: [
      "Dẫn xuất halogen có nhiệt độ sôi và nhiệt độ nóng chảy cao hơn hydrocarbon có phân tử khối tương đương.",
      "Thuỷ phân ethyl bromide trong môi trường kiềm thu được ethyl alcohol.",
      "Phản ứng tách HCl của 2-chloropropane chỉ thu được một alkene duy nhất.",
      "CFC là hợp chất chứa các nguyên tố carbon, fluorine, chlorine và hydrogen.",
    ],
    correctIndex: 3,
    explanation: "CFC (chlorofluorocarbon) chỉ chứa carbon, fluorine và chlorine — KHÔNG chứa hydrogen (hợp chất có thêm hydrogen được gọi là HCFC, khác với CFC). Ba phát biểu còn lại đều đúng: dẫn xuất halogen có to sôi/nóng chảy cao hơn hydrocarbon tương ứng; C2H5Br thuỷ phân trong kiềm cho ethanol; 2-chloropropane đối xứng nên tách HCl chỉ cho đúng 1 alkene (propene).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Sản phẩm chính theo quy tắc Zaitsev của phản ứng tách HCl ra khỏi phân tử 2-chloro-3-methylbutane là",
    choices: ["2-methylbut-2-ene.", "3-methylbut-2-ene.", "3-methylbut-3-ene.", "2-methylbut-3-ene."],
    correctIndex: 0,
    explanation: "2-chloro-3-methylbutane: CH3-CHCl-CH(CH3)-CH3. Tách H từ C1 cho 3-methylbut-1-ene (alkene đơn thế); tách H từ C3 cho 2-methylbut-2-ene (alkene ba lần thế, bền hơn). Theo quy tắc Zaitsev, sản phẩm chính là alkene bền hơn: 2-methylbut-2-ene.",
    difficulty: "THONG_HIEU",
  },
  // Bài 20. Alcohol
  {
    content: "Công thức tổng quát của alcohol no, đơn chức, mạch hở là",
    choices: ["CnH2n-5OH.", "CnH2n(OH)2.", "CnH2n-1OH.", "CnH2n+1OH."],
    correctIndex: 3,
    explanation: "Alcohol no, đơn chức, mạch hở có công thức chung CnH2n+1OH (dẫn xuất từ alkane CnH2n+2).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Số đồng phân cấu tạo alcohol có công thức C4H9OH là",
    choices: ["2.", "3.", "4.", "5."],
    correctIndex: 2,
    explanation: "C4H9OH (C4H10O) có 4 đồng phân alcohol: butan-1-ol, butan-2-ol, 2-methylpropan-1-ol và 2-methylpropan-2-ol.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây là alcohol bậc II?",
    choices: ["propan-1-ol.", "propan-2-ol.", "2-methylpropan-1-ol.", "2-methylpropan-2-ol."],
    correctIndex: 1,
    explanation: "Propan-2-ol (CH3CH(OH)CH3) có nhóm -OH gắn vào carbon liên kết với 2 carbon khác → alcohol bậc II. Propan-1-ol và 2-methylpropan-1-ol là bậc I; 2-methylpropan-2-ol là bậc III.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho alcohol có công thức cấu tạo sau: H3C–CH(CH3)–CH2–CH2–CH2–OH. Tên theo danh pháp thay thế của alcohol đó là",
    choices: ["4-methylpentan-1-ol.", "2-methylbutan-3-ol.", "3-methylbutan-2-ol.", "1,1-dimethylpropan-3-ol."],
    correctIndex: 0,
    explanation: "Đánh số mạch chính (5 carbon) từ đầu mang -OH để có locant nhỏ nhất cho nhóm chức: C1(CH2OH)-C2-C3-C4(CH(CH3))-C5(CH3), nhóm methyl ở C4 → 4-methylpentan-1-ol.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhiều vụ ngộ độc rượu do sử dụng rượu được pha chế từ cồn công nghiệp có lẫn methanol. Công thức phân tử của methanol là",
    choices: ["CH3OH.", "C2H5OH.", "C3H7OH.", "C2H4(OH)2."],
    correctIndex: 0,
    explanation: "Methanol có công thức phân tử CH3OH.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho các hợp chất hữu cơ sau: (1) C3H8; (2) CH3Cl; (3) C2H5OH; (4) CH3OH. Thứ tự giảm dần nhiệt độ sôi của các chất trên là",
    choices: ["(1) > (2) > (3) > (4).", "(1) > (4) > (2) > (3).", "(3) > (4) > (2) > (1).", "(4) > (2) > (1) > (3)."],
    correctIndex: 2,
    explanation: "Nhiệt độ sôi: C2H5OH (78,4°C) > CH3OH (64,7°C) > CH3Cl (-24,2°C) > C3H8 (-42,1°C) — alcohol có liên kết hydrogen nên sôi cao hơn hẳn dẫn xuất halogen và alkane có phân tử khối tương đương, tức (3) > (4) > (2) > (1).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Để pha chế một loại cồn sát trùng sử dụng trong y tế, người ta cho 700 mL ethanol nguyên chất vào bình định mức rồi thêm nước cất vào, thu được 1 000 mL cồn. Hỗn hợp trên có độ cồn là",
    choices: ["17°.", "7°.", "70°.", "170°."],
    correctIndex: 2,
    explanation: "Độ cồn = (thể tích ethanol nguyên chất / tổng thể tích dung dịch) × 100 = (700/1000) × 100 = 70°.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho phản ứng hoá học sau: CH3CHOHCH2CH3 →(H2SO4 đặc, t°)→ ? Sản phẩm chính theo quy tắc Zaitsev trong phản ứng trên là",
    choices: ["but-1-ene.", "but-2-ene.", "but-1-yne.", "but-2-yne."],
    correctIndex: 1,
    explanation: "Butan-2-ol tách nước: loại H từ C1 cho but-1-ene (kém bền), loại H từ C3 cho but-2-ene (bền hơn, nhiều nhóm thế hơn). Theo Zaitsev, sản phẩm chính là but-2-ene.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Oxi hoá propan-2-ol bằng CuO nung nóng, thu được sản phẩm nào sau đây?",
    choices: ["CH3CHO.", "CH3CH2CHO.", "CH3COCH3.", "CH3COOH."],
    correctIndex: 2,
    explanation: "Propan-2-ol là alcohol bậc II, khi bị oxi hoá bởi CuO cho ketone: CH3-CH(OH)-CH3 → CH3-CO-CH3 (acetone).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thuốc thử Cu(OH)2 dùng để nhận biết alcohol nào sau đây?",
    choices: ["Alcohol bậc I.", "Alcohol bậc II.", "Alcohol bậc III.", "Alcohol đa chức."],
    correctIndex: 3,
    explanation: "Cu(OH)2 chỉ hoà tan tạo phức xanh lam đậm với alcohol đa chức có các nhóm -OH liền kề nhau (poliol), không phản ứng với alcohol đơn chức dù bậc I, II hay III.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi đốt cháy hoàn toàn ethanol, thu được tỉ lệ mol nCO2 : nH2O là",
    choices: ["1 : 1.", "1 : 2.", "2 : 3.", "3 : 2."],
    correctIndex: 2,
    explanation: "C2H5OH + 3O2 → 2CO2 + 3H2O. Tỉ lệ nCO2 : nH2O = 2 : 3.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây dùng để điều chế ethanol theo phương pháp sinh hoá?",
    choices: ["Ethylene.", "Acetylene.", "Methane.", "Tinh bột."],
    correctIndex: 3,
    explanation: "Phương pháp sinh hoá điều chế ethanol là lên men tinh bột (hoặc đường) nhờ vi sinh vật; ethylene và acetylene được dùng trong phương pháp hoá học (cộng nước có xúc tác), không phải sinh hoá.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Để phân biệt cồn 90° và cồn tuyệt đối (ethanol nguyên chất), có thể dùng hoá chất nào sau đây?",
    choices: ["Na.", "CuSO4 khan.", "CuO, t°.", "Cu(OH)2."],
    correctIndex: 1,
    explanation: "CuSO4 khan có màu trắng, khi hấp thụ nước sẽ chuyển sang màu xanh lam (tạo CuSO4·5H2O). Cồn 90° còn chứa nước nên làm CuSO4 khan chuyển xanh, còn cồn tuyệt đối (không có nước) thì không.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hai ancol nào sau đây cùng bậc?",
    choices: [
      "Methanol và ethanol.",
      "Propan-1-ol và propan-2-ol.",
      "Ethanol và propan-2-ol.",
      "Propan-2-ol và 2-methylpropan-2-ol.",
    ],
    correctIndex: 0,
    explanation: "Methanol và ethanol đều được xếp vào alcohol bậc I (theo cách oxi hoá tương tự alcohol bậc I, cho aldehyde). Các cặp còn lại đều khác bậc (I với II, hoặc II với III).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Alcohol CH3CH=CHCH2OH có danh pháp thay thế là",
    choices: ["but-2-en-4-ol.", "but-2-en-1-ol.", "4-hydroxybut-2-ene.", "1-hydroxybut-2-ene."],
    correctIndex: 1,
    explanation: "Đánh số mạch chính để nhóm -OH có locant nhỏ nhất: C1(CH2OH)-C2=C3-C4(CH3) → but-2-en-1-ol.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một học sinh sau khi tiến hành thí nghiệm thì vẫn còn dư mẫu Na. Để tiêu huỷ mẫu Na dư này một cách an toàn, học sinh đó nên cho mẫu Na vào",
    choices: ["nước.", "cồn 96°.", "thùng rác.", "dầu hoả."],
    correctIndex: 1,
    explanation: "Cho Na dư phản ứng với cồn (ethanol) là cách tiêu huỷ an toàn vì phản ứng xảy ra êm dịu hơn nhiều so với phản ứng mãnh liệt với nước; không được vứt vào thùng rác (nguy hiểm cháy nổ khi gặp ẩm) hay để trong dầu hoả (chỉ dùng để bảo quản, không tiêu huỷ được Na).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một chai rượu gạo có thể tích 750 mL và có độ rượu là 40°. Số mL ethanol nguyên chất (khan) có trong chai rượu đó là",
    choices: ["18,75 mL.", "300 mL.", "400 mL.", "750 mL."],
    correctIndex: 1,
    explanation: "Thể tích ethanol nguyên chất = 750 × 40% = 300 mL.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Xăng E5 chứa 5% thể tích ethanol hiện đang được sử dụng phổ biến ở nước ta để thay thế một phần xăng thông thường. Một người đi xe máy mua 2 L xăng E5 để đổ vào bình chứa nhiên liệu. Thể tích ethanol có trong lượng xăng trên là",
    choices: ["50 mL.", "92 mL.", "46 mL.", "100 mL."],
    correctIndex: 3,
    explanation: "Thể tích ethanol = 2000 mL × 5% = 100 mL.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho các alcohol sau: CH3OH; C2H5OH; CH2(OH)–CH2(OH); CH2(OH)–CH(OH)–CH2(OH); và một alcohol mạch 3 carbon chỉ có 1 nhóm –OH. Số alcohol không hoà tan được Cu(OH)2 là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 2,
    explanation: "Cu(OH)2 chỉ tan trong alcohol đa chức có các nhóm -OH liền kề. Trong 5 chất: CH3OH, C2H5OH và alcohol mạch 3 carbon chỉ có 1 nhóm -OH (3 alcohol đơn chức) đều KHÔNG hoà tan được Cu(OH)2; chỉ có 2 alcohol đa chức (ethylene glycol và glycerol) mới hoà tan được. Vậy có 3 alcohol không hoà tan được Cu(OH)2.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhận xét nào sau đây không đúng?",
    choices: [
      "Oxi hoá không hoàn toàn alcohol bậc I, thu được aldehyde.",
      "Oxi hoá hoàn toàn alcohol bậc I, thu được aldehyde.",
      "Oxi hoá alcohol bậc II, thu được ketone.",
      "Alcohol bậc III không bị oxi hoá bởi tác nhân oxi hoá thông thường.",
    ],
    correctIndex: 1,
    explanation: "Oxi hoá KHÔNG HOÀN TOÀN alcohol bậc I mới cho aldehyde (sản phẩm trung gian); nếu oxi hoá hoàn toàn, sản phẩm phải là carboxylic acid (oxi hoá sâu hơn), không phải aldehyde. Phát biểu B mâu thuẫn với ý nghĩa \"hoàn toàn\" nên sai.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Sản phẩm chính thu được khi tách nước từ 3-methylbutan-2-ol là",
    choices: ["3-methylbut-1-ene.", "2-methylbut-2-ene.", "3-methylbut-2-ene.", "2-methylbut-3-ene."],
    correctIndex: 1,
    explanation: "3-methylbutan-2-ol: CH3-CH(OH)-CH(CH3)-CH3. Tách H từ C1 cho 3-methylbut-1-ene (đơn thế); tách H từ C3 cho 2-methylbut-2-ene (ba lần thế, bền hơn). Theo Zaitsev, sản phẩm chính là 2-methylbut-2-ene.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Oxi hoá alcohol nào sau đây thu được sản phẩm là ketone?",
    choices: ["C2H5OH.", "CH3CH2CH2OH.", "CH3CH(OH)CH3.", "(CH3)2C(OH)CH3."],
    correctIndex: 2,
    explanation: "CH3CH(OH)CH3 (propan-2-ol) là alcohol bậc II, oxi hoá cho ketone (acetone). C2H5OH và CH3CH2CH2OH là alcohol bậc I (cho aldehyde); (CH3)2C(OH)CH3 là alcohol bậc III (không bị oxi hoá bởi tác nhân thông thường).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phương pháp nào sau đây dùng để sản xuất ethanol sinh học?",
    choices: [
      "Cho hỗn hợp khí ethylene và hơi nước đi qua tháp chứa H3PO4.",
      "Cộng nước vào ethylene với xúc tác là H2SO4.",
      "Lên men tinh bột.",
      "Thuỷ phân dẫn xuất C2H5Br trong môi trường kiềm.",
    ],
    correctIndex: 2,
    explanation: "Ethanol sinh học (bioethanol) được sản xuất bằng phương pháp lên men tinh bột/đường nhờ vi sinh vật; các phương án còn lại là phương pháp hoá học/công nghiệp hoặc chỉ mang tính lí thuyết trong phòng thí nghiệm.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho dãy chuyển hoá sau: CH3–CH(OH)–CH2–CH3 →(H2SO4 đặc, t°)→ X →(HBr)→ Y. Biết X và Y đều là sản phẩm chính, công thức cấu tạo của X, Y lần lượt là",
    choices: [
      "CH3CH=CHCH3 và CH3CH2CHBrCH3.",
      "C4H9–O–C4H9 và CH3CH2CHBrCH3.",
      "CH2=CHCH2CH3 và CH3CH2CHBrCH3.",
      "CH2=CHCH2CH3 và CH3CH2CH2CH2Br.",
    ],
    correctIndex: 0,
    explanation: "Butan-2-ol tách nước theo Zaitsev cho but-2-ene (X = CH3CH=CHCH3, sản phẩm chính, bền hơn but-1-ene). But-2-ene đối xứng cộng HBr theo Markovnikov chỉ cho một sản phẩm duy nhất: CH3CH2CHBrCH3 (Y, 2-bromobutane).",
    difficulty: "VAN_DUNG",
  },
  // Bài 21. Phenol
  {
    content: "Phenol là hợp chất hữu cơ, trong phân tử có",
    choices: [
      "nhóm –OH và vòng benzene.",
      "nhóm –OH liên kết trực tiếp với nguyên tử carbon của vòng benzene.",
      "nhóm –OH liên kết trực tiếp với nguyên tử carbon no.",
      "nhóm –OH liên kết trực tiếp với nguyên tử carbon no và có chứa vòng benzene.",
    ],
    correctIndex: 1,
    explanation: "Định nghĩa chính xác của phenol yêu cầu nhóm -OH liên kết TRỰC TIẾP với carbon của vòng benzene (khác với các hợp chất chỉ \"có cả OH và vòng benzene\" nhưng OH gắn ở nhánh, như benzyl alcohol — đó không phải phenol).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho các phát biểu sau về phenol: (1) Phenol tan một phần trong nước ở điều kiện thường. (2) Phenol tan vô hạn trong nước ở điều kiện thường. (3) Phenol tan tốt trong nước khi đun nóng. (4) Nhiệt độ nóng chảy của phenol cao hơn ethanol. (5) Phenol có tính độc và có thể gây bỏng khi tiếp xúc với da nên cần phải cẩn thận khi sử dụng. Số phát biểu đúng là",
    choices: ["2.", "3.", "4.", "5."],
    correctIndex: 2,
    explanation: "Đúng: (1), (3), (4), (5). Sai: (2) — phenol chỉ tan một phần ở điều kiện thường (mâu thuẫn trực tiếp với (1) đúng), chỉ tan vô hạn khi đun nóng trên khoảng 66°C.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hợp chất hữu cơ X có chứa vòng benzene, có công thức phân tử là C7H8O. Số đồng phân cấu tạo của X là",
    choices: ["2.", "3.", "4.", "5."],
    correctIndex: 3,
    explanation: "C7H8O có vòng benzene gồm 5 đồng phân: o-cresol, m-cresol, p-cresol (3 phenol có nhóm CH3), benzyl alcohol (C6H5CH2OH) và anisole (C6H5OCH3).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phenol là hợp chất hữu cơ có tính",
    choices: ["acid yếu.", "base yếu.", "acid mạnh.", "base mạnh."],
    correctIndex: 0,
    explanation: "Phenol có tính acid yếu (yếu hơn cả carbonic acid ở nấc 1), do ảnh hưởng hút electron của vòng benzene lên nhóm -OH.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phản ứng với chất/dung dịch nào sau đây của phenol chứng minh phenol có tính acid?",
    choices: ["Na.", "Dung dịch NaOH.", "Dung dịch bromine.", "HNO3 đặc/H2SO4 đặc."],
    correctIndex: 1,
    explanation: "Phenol phản ứng được với base NaOH (một acid mới phản ứng với base) chứng tỏ phenol có tính acid; phản ứng với Na chỉ chứng tỏ có H linh động (alcohol cũng phản ứng với Na dù không có tính acid rõ rệt); phản ứng với bromine/HNO3 chỉ thể hiện ảnh hưởng hoạt hoá vòng thơm, không liên quan tính acid.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nguyên nhân phản ứng thế bromine vào vòng thơm của phenol xảy ra dễ dàng hơn so với benzene là do",
    choices: [
      "phenol tan một phần trong nước.",
      "phenol có tính acid yếu.",
      "ảnh hưởng của nhóm –OH đến vòng benzene trong phân tử phenol.",
      "ảnh hưởng của vòng benzene đến nhóm –OH trong phân tử phenol.",
    ],
    correctIndex: 2,
    explanation: "Nhóm -OH đẩy electron vào vòng benzene (hiệu ứng liên hợp), làm tăng mật độ electron trên vòng, khiến phản ứng thế electrophin (như thế bromine) xảy ra dễ dàng hơn so với benzene.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi nhỏ từ từ dung dịch bromine vào ống nghiệm chứa dung dịch phenol, hiện tượng quan sát được trong ống nghiệm là",
    choices: [
      "nước brom bị mất màu và xuất hiện kết tủa trắng.",
      "dung dịch trong suốt.",
      "xuất hiện kết tủa trắng nhưng nước brom không mất màu.",
      "không xảy ra hiện tượng gì.",
    ],
    correctIndex: 0,
    explanation: "Phenol phản ứng nhanh và định lượng với nước bromine tạo 2,4,6-tribromophenol (kết tủa trắng), đồng thời làm mất màu nước bromine.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong công nghiệp, phenol được điều chế chủ yếu từ chất nào sau đây?",
    choices: ["Benzene.", "Cumene.", "Chlorobenzene.", "Than đá."],
    correctIndex: 1,
    explanation: "Trong công nghiệp hiện đại, phenol được sản xuất chủ yếu theo phương pháp cumene (oxi hoá cumene rồi phân cắt bằng acid, đồng thời tạo ra acetone).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho hợp chất phenol có công thức cấu tạo với nhóm –OH ở vị trí 1 và nhóm –CH3 ở vị trí para (đối diện) trên vòng benzene. Tên gọi của phenol đó là",
    choices: ["2-methylphenol.", "3-methylphenol.", "4-methylphenol.", "hydroxytoluene."],
    correctIndex: 2,
    explanation: "Nhóm -CH3 ở vị trí para (vị trí 4) so với nhóm -OH (vị trí 1) → tên gọi là 4-methylphenol (p-cresol).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phản ứng với chất/dung dịch nào sau đây chứng minh tính acid của phenol (C6H5OH) mạnh hơn ethanol?",
    choices: ["Na.", "Dung dịch NaOH.", "Dung dịch bromine.", "HNO3 đặc/H2SO4 đặc."],
    correctIndex: 1,
    explanation: "NaOH phản ứng được với phenol (do tính acid đủ mạnh) nhưng không phản ứng với ethanol (tính acid quá yếu), qua đó chứng minh phenol có tính acid mạnh hơn ethanol. Phản ứng với Na thì cả hai đều xảy ra nên không phân biệt được.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phản ứng với chất/dung dịch nào sau đây chứng minh phenol (C6H5OH) có tính acid mạnh hơn nấc 2 của carbonic acid?",
    choices: ["Na.", "Dung dịch NaOH.", "Dung dịch Na2CO3.", "Dung dịch Br2."],
    correctIndex: 2,
    explanation: "Phenol phản ứng được với Na2CO3 tạo thành NaHCO3 (chỉ trung hoà đến nấc 2 của carbonic acid, không giải phóng được CO2/H2O) — điều này chứng tỏ tính acid của phenol mạnh hơn nấc 2 (HCO3-→CO3^2-) nhưng yếu hơn nấc 1 của carbonic acid.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các chất có cùng công thức phân tử C7H8O sau: benzyl alcohol (C6H5CH2OH), o-cresol, m-cresol và p-cresol. Số chất vừa phản ứng được với Na, vừa phản ứng được với dung dịch NaOH là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 2,
    explanation: "Ba đồng phân cresol (o-, m-, p-) đều là phenol nên vừa phản ứng với Na (do có H linh động) vừa phản ứng với NaOH (do có tính acid). Benzyl alcohol chỉ là alcohol (OH không gắn trực tiếp vào vòng) nên chỉ phản ứng với Na, không phản ứng với NaOH.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các phát biểu sau về phenol (C6H5OH): a) Phenol là hợp chất hữu cơ trong phân tử có vòng benzene và nhóm –OH. b) Do có nhóm –OH nên phenol tan vô hạn trong nước ở điều kiện thường tương tự ethanol. c) Dung dịch phenol không làm đổi màu giấy quỳ tím, do đó phenol có tính acid yếu. d) Phenol phản ứng được với dung dịch NaOH. e) Phenol phản ứng được với Na2CO3 do có tính acid mạnh hơn nấc 2 của carbonic acid. g) Phenol dễ tham gia phản ứng thế bromine và thế nitro hơn benzene do ảnh hưởng của nhóm –OH. Các phát biểu đúng là",
    choices: ["a, b, c, d.", "a, c, d, g.", "b, c, d, e.", "c, d, e, g."],
    correctIndex: 3,
    explanation: "a) sai vì định nghĩa không chính xác — chỉ nói \"có vòng benzene và nhóm -OH\" mà không yêu cầu -OH gắn trực tiếp vào vòng (như benzyl alcohol cũng thoả điều kiện này nhưng không phải phenol). b) sai vì phenol chỉ tan một phần ở điều kiện thường. c), d), e), g) đều đúng như đã phân tích ở các câu trước.",
    difficulty: "VAN_DUNG",
  },
  // Bài 22. Ôn tập chương 5
  {
    content: "Đồ uống có cồn là loại đồ uống có chứa chất nào sau đây?",
    choices: ["Methanol.", "Ethanol.", "Methanol và ethanol.", "Glycerol."],
    correctIndex: 1,
    explanation: "Đồ uống có cồn (rượu, bia) chứa ethanol; methanol là chất độc, không được phép có trong đồ uống.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây có nhiệt độ sôi cao nhất?",
    choices: ["Chloroethane.", "Methanol.", "Ethanol.", "Phenol."],
    correctIndex: 3,
    explanation: "Phenol (bs 181,7°C) có phân tử khối lớn hơn hẳn (vòng benzene) cộng với liên kết hydrogen mạnh, nên có nhiệt độ sôi cao nhất trong 4 chất, cao hơn cả ethanol (78,4°C), methanol (64,7°C) và chloroethane (12,3°C).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cồn 70° được sử dụng phổ biến trong y tế, dùng để sát trùng, diệt khuẩn,... Cách pha chế cồn 70° là",
    choices: [
      "pha 70 mL nước với 30 mL ethanol.",
      "pha 70 mL ethanol với 30 mL nước.",
      "lấy 70 mL rồi thêm 100 mL nước.",
      "lấy 70 mL ethanol rồi thêm nước để thu được 100 mL cồn.",
    ],
    correctIndex: 3,
    explanation: "Độ cồn 70° nghĩa là 70 mL ethanol nguyên chất trong 100 mL dung dịch cồn. Phải dùng bình định mức: lấy chính xác 70 mL ethanol rồi thêm nước đến khi đủ tổng thể tích 100 mL — cách này kiểm soát đúng tổng thể tích cuối cùng (khác với chỉ đơn giản cộng 70+30 mL, vì hỗn hợp ethanol-nước không cộng tính thể tích tuyệt đối).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Số đồng phân có công thức phân tử C4H9Br khi đun nóng với dung dịch NaOH thu được alcohol bậc I là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 1,
    explanation: "C4H9Br có 4 đồng phân. Thế OH cho: 1-bromobutane → butan-1-ol (bậc I) ✓; 2-bromobutane → butan-2-ol (bậc II); 1-bromo-2-methylpropane → 2-methylpropan-1-ol (bậc I) ✓; 2-bromo-2-methylpropane → 2-methylpropan-2-ol (bậc III). Có 2 đồng phân cho alcohol bậc I.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho hai phản ứng sau: (1) C6H5OH + Na2CO3 → C6H5ONa + NaHCO3; (2) C6H5ONa + CO2 + H2O → C6H5OH + NaHCO3. Hai phản ứng trên chứng tỏ phenol",
    choices: [
      "là một acid mạnh.",
      "là một base mạnh.",
      "có tính acid mạnh hơn nấc 1 của H2CO3.",
      "có tính acid mạnh hơn nấc 2 của H2CO3.",
    ],
    correctIndex: 3,
    explanation: "Phản ứng (1) cho thấy phenol đủ mạnh để biến CO3^2- thành HCO3- (mạnh hơn nấc 2 của H2CO3); phản ứng (2) cho thấy CO2/H2O (ứng với nấc 1 của H2CO3) lại đẩy được phenol ra khỏi muối phenolate (chứng tỏ nấc 1 của H2CO3 mạnh hơn phenol). Kết hợp cả hai: phenol có tính acid nằm giữa hai nấc, tức mạnh hơn nấc 2 nhưng yếu hơn nấc 1 của H2CO3.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong phương pháp nấu rượu gạo truyền thống, gạo được nấu chín, để nguội, rắc men rồi trộn đều, ủ kín 3–5 ngày. Khi ngửi thấy mùi thơm, thêm nước và ủ kín 1–2 tuần, thu được hỗn hợp chủ yếu gồm: ethanol, nước và bã rượu. Để tách rượu (hỗn hợp ethanol và nước) ra khỏi hỗn hợp trên, người ta sử dụng phương pháp nào sau đây là phù hợp nhất?",
    choices: ["Kết tinh.", "Chiết.", "Chưng cất.", "Lọc."],
    correctIndex: 2,
    explanation: "Ethanol và nước là hai chất lỏng tan lẫn hoàn toàn nhưng có nhiệt độ sôi khác nhau, nên phương pháp chưng cất là phù hợp nhất để tách chúng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phenol và ethanol đều phản ứng được với",
    choices: ["Na.", "dung dịch NaOH.", "dung dịch bromine loãng.", "dung dịch Na2CO3."],
    correctIndex: 0,
    explanation: "Cả phenol và ethanol đều có nhóm -OH với H linh động nên đều phản ứng với Na. NaOH, dung dịch bromine và Na2CO3 chỉ phản ứng với phenol (do tính acid và ảnh hưởng hoạt hoá vòng thơm), không phản ứng với ethanol.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phát biểu nào sau đây không đúng?",
    choices: [
      "Alcohol và phenol đều tham gia phản ứng với Na.",
      "Cho phenol phản ứng với dung dịch NaOH, sau đó nhỏ vài giọt HCl vào dung dịch thì lại thu được phenol.",
      "Alcohol đa chức có nhóm –OH liền kề phản ứng được với Cu(OH)2 còn alcohol đơn chức thì không phản ứng.",
      "Đun nóng alcohol với H2SO4 đặc chỉ thu được alkene.",
    ],
    correctIndex: 3,
    explanation: "Đun alcohol với H2SO4 đặc có thể cho alkene (tách nước nội phân tử, nhiệt độ cao hơn) HOẶC ether (tách nước liên phân tử, nhiệt độ thấp hơn), không phải \"chỉ thu được alkene\" như phát biểu D.",
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
        source: "SBT Hóa 11 - Kết nối tri thức (Chương 5 - Dẫn xuất halogen - Alcohol - Phenol)",
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
