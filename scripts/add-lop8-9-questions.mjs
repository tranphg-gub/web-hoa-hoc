import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Nguồn: Tài liệu/Lớp 6-9 (THCS)/Mới upload (Lớp 6,7,8,9)/440 BAI TAP TRAC NGHIEM...LOP 9.doc
// (bộ trắc nghiệm có sẵn đáp án, đọc bằng antiword -m UTF-8.txt). Nội dung Oxide/Acid/Base/Muối
// theo chương trình cũ ghi "lớp 9" nhưng khớp đúng chủ đề Chương II lớp 8 (KNTT 2018) hiện có trong DB,
// nên được thêm vào các quiz lớp 8 tương ứng. Phần Kim loại (tính chất vật lí + hóa học) thêm vào lớp 9.

const lop8ChuongII = {
  quizId: "cmrel0qky0018vhd8grpcucry", // Kiểm tra: Một số hợp chất thông dụng (Chương II - Lớp 8)
  startOrder: 10,
  questions: [
    // --- Oxide ---
    { content: "Oxide là gì?", choices: ["Hỗn hợp của nguyên tố oxygen với một nguyên tố hoá học khác.", "Hợp chất của nguyên tố phi kim với một nguyên tố hoá học khác.", "Hợp chất của oxygen với một nguyên tố hoá học khác.", "Hợp chất của nguyên tố kim loại với một nguyên tố hoá học khác."], correctIndex: 2 },
    { content: "Oxide acid là những oxide", choices: ["tác dụng với dung dịch acid tạo thành muối và nước.", "tác dụng với dung dịch base tạo thành muối và nước.", "không tác dụng với dung dịch base và dung dịch acid.", "chỉ tác dụng được với muối."], correctIndex: 1 },
    { content: "Oxide base là những oxide", choices: ["tác dụng với dung dịch acid tạo thành muối và nước.", "tác dụng với dung dịch base tạo thành muối và nước.", "không tác dụng với dung dịch base và dung dịch acid.", "chỉ tác dụng được với muối."], correctIndex: 0 },
    { content: "Oxide lưỡng tính là những oxide", choices: ["tác dụng với dung dịch acid tạo thành muối và nước.", "tác dụng với cả dung dịch base và dung dịch acid đều tạo thành muối và nước.", "tác dụng với dung dịch base tạo thành muối và nước.", "chỉ tác dụng được với muối."], correctIndex: 1 },
    { content: "Chất tác dụng với nước tạo ra dung dịch base là", choices: ["CO2.", "Na2O.", "SO2.", "P2O5."], correctIndex: 1 },
    { content: "Chất tác dụng với nước tạo ra dung dịch acid là", choices: ["K2O.", "CuO.", "P2O5.", "CaO."], correctIndex: 2 },
    { content: "Dãy chất sau đây chỉ gồm các oxide là", choices: ["MgO, Ba(OH)2, CaSO4, HCl.", "MgO, CaO, CuO, FeO.", "SO2, CO2, NaOH, CaSO4.", "CaO, Ba(OH)2, MgSO4, BaO."], correctIndex: 1 },
    { content: "Dãy chất gồm các oxide acid là", choices: ["CO2, SO2, NO, P2O5.", "CO2, SO3, Na2O, NO2.", "SO2, P2O5, CO2, SO3.", "H2O, CO, NO, Al2O3."], correctIndex: 2 },
    { content: "Dãy chất gồm các oxide base là", choices: ["CuO, NO, MgO, CaO.", "CuO, CaO, MgO, Na2O.", "CaO, CO2, K2O, Na2O.", "K2O, FeO, P2O5, Mn2O7."], correctIndex: 1 },
    { content: "Dãy chất sau đều là oxide lưỡng tính là", choices: ["Al2O3, ZnO, PbO2, Cr2O3.", "Al2O3, MgO, PbO, SnO2.", "CaO, ZnO, Na2O, Cr2O3.", "PbO2, Al2O3, K2O, SnO2."], correctIndex: 0 },
    { content: "Dãy oxide tác dụng với nước tạo ra dung dịch kiềm là", choices: ["CuO, CaO, K2O, Na2O.", "CaO, Na2O, K2O, BaO.", "Na2O, BaO, CuO, MnO.", "MgO, Fe2O3, ZnO, PbO."], correctIndex: 1 },
    { content: "Hai oxide tác dụng với nhau tạo thành muối là", choices: ["CO2 và BaO.", "K2O và NO.", "Fe2O3 và SO3.", "MgO và CO."], correctIndex: 0 },
    { content: "Một oxide của phosphorus có thành phần phần trăm của P bằng 43,66%. Biết phân tử khối của oxide bằng 142 amu. Công thức hoá học của oxide là", choices: ["P2O3.", "P2O5.", "PO2.", "P2O4."], correctIndex: 1, explanation: "142×0,4366/31≈2 (số nguyên tử P); còn lại là O: (142-2×31)/16=5 → P2O5." },
    { content: "Hoà tan 2,4 g một oxide kim loại hoá trị II cần dùng 30g dung dịch HCl 7,3%. Công thức của oxide kim loại là", choices: ["CaO.", "CuO.", "FeO.", "ZnO."], correctIndex: 1, explanation: "n(HCl)=30×0,073/36,5=0,06 mol → n(oxide)=0,03 mol → M(oxide)=2,4/0,03=80 → CuO (M=80)." },
    { content: "Hoà tan 6,2 g sodium oxide (Na2O) vào 193,8 g nước thì được dung dịch A. Nồng độ phần trăm của dung dịch A là", choices: ["4%.", "6%.", "4,5%.", "10%."], correctIndex: 0, explanation: "n(Na2O)=0,1 mol → tạo 0,2 mol NaOH (8g); m(dd)=6,2+193,8=200g → C%=8/200×100%=4%." },
    // --- Acid ---
    { content: "Dãy gồm các kim loại tác dụng được với dung dịch H2SO4 loãng là", choices: ["Fe, Cu, Mg.", "Zn, Fe, Cu.", "Zn, Fe, Al.", "Fe, Zn, Ag."], correctIndex: 2 },
    { content: "Dãy các chất không tác dụng được với dung dịch H2SO4 loãng là", choices: ["Zn, ZnO, Zn(OH)2.", "Cu, CuO, Cu(OH)2.", "Na2O, NaOH, Na2CO3.", "MgO, MgCO3, Mg(OH)2."], correctIndex: 1 },
    { content: "Dãy các chất không tác dụng được với dung dịch HCl là", choices: ["Al, Fe, Pb.", "Al2O3, Fe2O3, Na2O.", "Al(OH)3, Fe(OH)3, Cu(OH)2.", "BaCl2, Na2SO4, CuSO4."], correctIndex: 3 },
    { content: "Chất tác dụng với dung dịch HCl tạo thành chất khí nhẹ hơn không khí là", choices: ["Mg.", "CaCO3.", "MgCO3.", "Na2SO3."], correctIndex: 0, explanation: "Mg + 2HCl -> MgCl2 + H2 (khí H2 nhẹ hơn không khí); các chất còn lại tạo khí CO2/SO2 nặng hơn không khí." },
    { content: "CuO tác dụng với dung dịch H2SO4 tạo thành dung dịch có", choices: ["màu không màu.", "màu lục nhạt.", "màu xanh lam.", "màu vàng nâu."], correctIndex: 2 },
    { content: "Kẽm (Zn) tác dụng với dung dịch hydrochloric acid sinh ra", choices: ["dung dịch có màu xanh lam và chất khí màu nâu.", "dung dịch không màu và chất khí có mùi hắc.", "dung dịch có màu vàng nâu và chất khí không màu.", "dung dịch không màu và chất khí cháy được trong không khí."], correctIndex: 3, explanation: "Zn + 2HCl -> ZnCl2 (không màu) + H2 (khí cháy được)." },
    { content: "Dùng giấy quỳ tím có thể phân biệt được cặp chất nào sau đây?", choices: ["Dung dịch HCl và dung dịch KOH.", "Dung dịch HCl và dung dịch H2SO4.", "Dung dịch Na2SO4 và dung dịch NaCl.", "Dung dịch NaOH và dung dịch KOH."], correctIndex: 0 },
    { content: "Để phân biệt hai dung dịch HCl và H2SO4 loãng, ta dùng kim loại", choices: ["Mg.", "Ba.", "Cu.", "Zn."], correctIndex: 1, explanation: "Ba tác dụng H2SO4 tạo kết tủa trắng BaSO4, còn với HCl chỉ tạo dung dịch BaCl2 tan, không kết tủa." },
    { content: "Thuốc thử dùng để nhận biết 3 dung dịch HCl, HNO3, H2SO4 đựng trong 3 lọ mất nhãn là", choices: ["Dung dịch AgNO3 và giấy quỳ tím.", "Dung dịch BaCl2 và dung dịch AgNO3.", "Dùng quỳ tím và dung dịch NaOH.", "Dung dịch BaCl2 và dung dịch phenolphtalein."], correctIndex: 1 },
    { content: "Khi cho từ từ dung dịch NaOH đến dư vào ống nghiệm đựng dung dịch hỗn hợp gồm HCl và một ít phenolphthalein, hiện tượng quan sát được là", choices: ["Màu đỏ mất dần.", "Không có sự thay đổi màu.", "Màu đỏ từ từ xuất hiện.", "Màu xanh từ từ xuất hiện."], correctIndex: 2, explanation: "Ban đầu môi trường acid (không màu với phenolphthalein), khi thêm NaOH dư đến khi trung hòa và dư base thì phenolphthalein chuyển màu đỏ (hồng)." },
    { content: "Cho 300 mL dung dịch HCl 1M vào 300 mL dung dịch NaOH 0,5M. Nếu cho quỳ tím vào dung dịch sau phản ứng thì quỳ tím chuyển sang", choices: ["Màu xanh.", "Không đổi màu.", "Màu đỏ.", "Màu vàng nhạt."], correctIndex: 2, explanation: "n(HCl)=0,3 mol > n(NaOH)=0,15 mol nên HCl dư, dung dịch có tính acid, quỳ chuyển đỏ." },
    { content: "Trộn lẫn dung dịch X chứa 1 mol HCl vào dung dịch Y chứa 1,5 mol NaOH được dung dịch Z. Dung dịch Z làm quỳ tím chuyển sang", choices: ["Màu đỏ.", "Màu xanh.", "Không màu.", "Màu tím."], correctIndex: 1, explanation: "NaOH dư (1,5 mol > 1 mol HCl) nên dung dịch có tính base, quỳ chuyển xanh." },
    // --- Base ---
    { content: "Dung dịch KOH phản ứng với dãy oxide nào sau đây?", choices: ["CO2, SO2, P2O5, Fe2O3.", "Fe2O3, SO2, SO3, MgO.", "P2O5, CO2, Al2O3, SO3.", "P2O5, CO2, CuO, SO3."], correctIndex: 2 },
    { content: "Dãy các base bị nhiệt phân huỷ tạo thành oxide base tương ứng và nước là", choices: ["Cu(OH)2, Zn(OH)2, Al(OH)3, Mg(OH)2.", "Cu(OH)2, Zn(OH)2, Al(OH)3, NaOH.", "Fe(OH)3, Cu(OH)2, KOH, Mg(OH)2.", "Fe(OH)3, Cu(OH)2, Ba(OH)2, Mg(OH)2."], correctIndex: 0 },
    { content: "Nhóm các dung dịch có pH > 7 là", choices: ["HCl, HNO3.", "NaCl, KNO3.", "NaOH, Ba(OH)2.", "Nước cất, nước muối."], correctIndex: 2 },
    { content: "Nhóm base vừa tác dụng được với dung dịch HCl, vừa tác dụng được với dung dịch KOH là", choices: ["Ba(OH)2 và NaOH.", "NaOH và Cu(OH)2.", "Al(OH)3 và Zn(OH)2.", "Zn(OH)2 và Mg(OH)2."], correctIndex: 2, explanation: "Al(OH)3 và Zn(OH)2 là các hydroxide lưỡng tính, tác dụng được với cả acid và base mạnh." },
    { content: "Có những base: Ba(OH)2, Mg(OH)2, Cu(OH)2, Ca(OH)2. Nhóm các base làm quỳ tím hoá xanh là", choices: ["Ba(OH)2, Cu(OH)2.", "Ba(OH)2, Ca(OH)2.", "Mg(OH)2, Ca(OH)2.", "Mg(OH)2, Ba(OH)2."], correctIndex: 1, explanation: "Chỉ base tan (kiềm) mới làm quỳ hóa xanh; Ba(OH)2 và Ca(OH)2 đều tan tốt, còn Mg(OH)2, Cu(OH)2 không tan." },
    { content: "Dung dịch Ba(OH)2 không phản ứng được với", choices: ["Dung dịch Na2CO3.", "Dung dịch MgSO4.", "Dung dịch CuCl2.", "Dung dịch KNO3."], correctIndex: 3 },
    { content: "Dung dịch NaOH phản ứng được với kim loại nào sau đây?", choices: ["Mg.", "Al.", "Fe.", "Cu."], correctIndex: 1, explanation: "Al là kim loại lưỡng tính, phản ứng được với dung dịch kiềm mạnh như NaOH." },
    { content: "Cho 1g NaOH rắn tác dụng với dung dịch chứa 1g HNO3. Dung dịch sau phản ứng có môi trường", choices: ["Trung tính.", "Base.", "Acid.", "Lưỡng tính."], correctIndex: 1, explanation: "n(NaOH)=1/40=0,025 mol; n(HNO3)=1/63≈0,0159 mol. NaOH dư nên môi trường base." },
    { content: "Nhỏ một giọt quỳ tím vào dung dịch KOH, dung dịch có màu xanh. Nhỏ từ từ dung dịch HCl cho tới dư vào dung dịch màu xanh trên thì", choices: ["Màu xanh vẫn không thay đổi.", "Màu xanh nhạt dần rồi mất hẳn.", "Màu xanh nhạt dần, mất hẳn rồi chuyển sang màu đỏ.", "Màu xanh đậm thêm dần."], correctIndex: 2 },
    // --- Muối ---
    { content: "Các cặp chất nào sau đây cùng tồn tại trong 1 dung dịch (không phản ứng với nhau)? (1) CuSO4 và HCl; (2) H2SO4 và Na2SO3; (3) KOH và NaCl; (4) MgSO4 và BaCl2", choices: ["(1) và (2)", "(3) và (4)", "(2) và (4)", "(1) và (3)"], correctIndex: 3 },
    { content: "Cho dung dịch sulfuric acid loãng tác dụng với muối sodium sulfite (Na2SO3). Chất khí nào sinh ra?", choices: ["Khí hydrogen.", "Khí oxygen.", "Khí sulfur dioxide.", "Khí hydrogen sulfide."], correctIndex: 2 },
    { content: "Cho phương trình phản ứng: Na2CO3 + 2HCl -> 2NaCl + X + H2O. X là", choices: ["CO.", "CO2.", "H2.", "Cl2."], correctIndex: 1 },
    { content: "Cho 50 g CaCO3 vào dung dịch HCl dư. Thể tích khí CO2 thu được ở đktc là", choices: ["11,2 lít.", "1,12 lít.", "2,24 lít.", "22,4 lít."], correctIndex: 0, explanation: "n(CaCO3)=0,5 mol -> n(CO2)=0,5 mol -> V=0,5×22,4=11,2 lít." },
    { content: "Cho dung dịch KOH vào ống nghiệm đựng dung dịch FeCl3, hiện tượng quan sát được là", choices: ["Có kết tủa trắng xanh.", "Có khí thoát ra.", "Có kết tủa đỏ nâu.", "Kết tủa màu trắng."], correctIndex: 2, explanation: "3KOH + FeCl3 -> Fe(OH)3 (kết tủa đỏ nâu) + 3KCl." },
    { content: "Dung dịch của chất X có pH > 7 và khi tác dụng với dung dịch potassium sulfate (K2SO4) tạo ra chất không tan (kết tủa). Chất X là", choices: ["BaCl2.", "NaOH.", "Ba(OH)2.", "H2SO4."], correctIndex: 2, explanation: "Ba(OH)2 có pH>7 (base mạnh) và tạo kết tủa BaSO4 với K2SO4." },
    { content: "Dung dịch nào sau đây tác dụng được với cả hai dung dịch Fe(NO3)2 và CuCl2?", choices: ["Dung dịch NaOH.", "Dung dịch HCl.", "Dung dịch AgNO3.", "Dung dịch BaCl2."], correctIndex: 0, explanation: "NaOH tạo kết tủa hydroxide với cả Fe2+ và Cu2+." },
    { content: "Để làm sạch dung dịch copper(II) nitrate Cu(NO3)2 có lẫn tạp chất silver nitrate AgNO3, ta dùng kim loại", choices: ["Mg.", "Cu.", "Fe.", "Au."], correctIndex: 1, explanation: "Cu đẩy Ag ra khỏi dung dịch AgNO3 (Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag) mà không đưa thêm tạp chất kim loại khác vào." },
  ],
};

const lop9KimLoai = {
  quizId: "cmrel0r8u001jvhd8y8fbeg1f", // Kiểm tra: Kim loại (Chương 6 - Lớp 9)
  startOrder: 9,
  questions: [
    { content: "Trong các kim loại sau đây, kim loại dẫn điện tốt nhất là", choices: ["Nhôm (Al).", "Bạc (Ag).", "Đồng (Cu).", "Sắt (Fe)."], correctIndex: 1 },
    { content: "Trong các kim loại sau đây, kim loại có nhiệt độ nóng chảy cao nhất là", choices: ["Vonfram (W).", "Đồng (Cu).", "Sắt (Fe).", "Kẽm (Zn)."], correctIndex: 0 },
    { content: "Trong các kim loại sau đây, kim loại dẻo nhất là", choices: ["Đồng (Cu).", "Nhôm (Al).", "Bạc (Ag).", "Vàng (Au)."], correctIndex: 3 },
    { content: "Kim loại nào sau đây nhẹ nhất (có khối lượng riêng nhỏ nhất)?", choices: ["Lithium (Li).", "Sodium (Na).", "Potassium (K).", "Rubidium (Rb)."], correctIndex: 0 },
    { content: "Kim loại được dùng làm vật liệu chế tạo vỏ máy bay do có tính bền và nhẹ, đó là kim loại", choices: ["Na.", "Zn.", "Al.", "K."], correctIndex: 2 },
    { content: "Kim loại được dùng làm đồ trang sức vì có ánh kim rất đẹp, đó là các kim loại", choices: ["Ag, Cu.", "Au, Pt.", "Au, Al.", "Ag, Al."], correctIndex: 1 },
    { content: "Đơn chất tác dụng với dung dịch H2SO4 loãng giải phóng khí hydrogen là", choices: ["Đồng (Cu).", "Lưu huỳnh (S).", "Kẽm (Zn).", "Thuỷ ngân (Hg)."], correctIndex: 2 },
    { content: "Các kim loại tác dụng được với dung dịch Cu(NO3)2 tạo thành kim loại đồng là", choices: ["Al, Zn, Fe.", "Mg, Fe, Ag.", "Zn, Pb, Au.", "Na, Mg, Al."], correctIndex: 0, explanation: "Al, Zn, Fe đứng trước Cu trong dãy hoạt động hóa học nên đẩy được Cu ra khỏi dung dịch muối." },
    { content: "Để làm sạch mẫu chì (Pb) bị lẫn kẽm (Zn), người ta ngâm mẫu chì này vào một lượng dư dung dịch", choices: ["ZnSO4.", "Pb(NO3)2.", "CuCl2.", "Na2CO3."], correctIndex: 1, explanation: "Zn phản ứng với Pb(NO3)2 dư (Zn đứng trước Pb trong dãy hoạt động), còn Pb không phản ứng, giữ nguyên." },
    { content: "Dung dịch FeCl2 có lẫn tạp chất là CuCl2. Có thể dùng kim loại nào sau đây để làm sạch dung dịch FeCl2?", choices: ["Zn.", "Fe.", "Mg.", "Ag."], correctIndex: 1, explanation: "Fe đẩy Cu ra khỏi CuCl2 (Fe + CuCl2 -> FeCl2 + Cu) mà không đưa thêm ion kim loại lạ vào dung dịch." },
    { content: "Kim loại vừa tác dụng với dung dịch HCl vừa tác dụng được với dung dịch KOH là", choices: ["Fe, Al.", "Ag, Zn.", "Al, Cu.", "Al, Zn."], correctIndex: 3, explanation: "Al và Zn là các kim loại lưỡng tính, phản ứng được với cả acid và dung dịch kiềm mạnh." },
    { content: "Đồng (Cu) kim loại có thể phản ứng được với", choices: ["Dung dịch HCl.", "Dung dịch H2SO4 loãng.", "H2SO4 đặc, nóng.", "Dung dịch NaOH."], correctIndex: 2, explanation: "Cu đứng sau H trong dãy hoạt động nên không phản ứng với acid loãng thường, chỉ phản ứng với acid có tính oxi hóa mạnh như H2SO4 đặc nóng." },
    { content: "Các kim loại tác dụng được với nước ở nhiệt độ thường tạo thành dung dịch kiềm và giải phóng khí hydrogen là", choices: ["K, Ca.", "Zn, Ag.", "Mg, Ag.", "Cu, Ba."], correctIndex: 0 },
    { content: "Khi thả một cây đinh sắt sạch vào dung dịch CuSO4 loãng, có hiện tượng", choices: [
      "Sủi bọt khí, màu xanh của dung dịch nhạt dần.",
      "Có một lớp đồng màu đỏ phủ lên đinh sắt, màu xanh của dung dịch đậm dần.",
      "Có một lớp đồng màu đỏ phủ lên đinh sắt, dung dịch không đổi màu.",
      "Có một lớp đồng màu đỏ phủ lên đinh sắt, màu xanh của dung dịch nhạt dần.",
    ], correctIndex: 3, explanation: "Fe + CuSO4 -> FeSO4 + Cu: đồng đỏ bám lên đinh sắt, dung dịch CuSO4 (xanh) nhạt dần vì Cu2+ chuyển thành Fe2+ (lục nhạt)." },
    { content: "Có hỗn hợp kim loại gồm Fe, Cu, Ag. Có thể thu được Ag tinh khiết bằng cách", choices: [
      "Hoà tan hỗn hợp vào dung dịch HCl.",
      "Hoà tan hỗn hợp vào HNO3 đặc nguội.",
      "Hoà tan hỗn hợp kim loại vào dung dịch AgNO3 dư.",
      "Dùng nam châm tách Fe và Cu ra khỏi Ag.",
    ], correctIndex: 2, explanation: "AgNO3 dư sẽ hoà tan hết Fe và Cu (đẩy thêm Ag ra), chỉ còn lại Ag không tan (Ag không phản ứng với muối của chính nó)." },
    { content: "Hiện tượng xảy ra khi đốt sắt (Fe) trong bình khí chlorine là", choices: ["Khói màu trắng sinh ra.", "Xuất hiện những tia sáng chói.", "Tạo chất bột trắng bám xung quanh thành bình.", "Có khói màu nâu đỏ tạo thành."], correctIndex: 3, explanation: "2Fe + 3Cl2 -> 2FeCl3, FeCl3 tạo thành dạng khói/bụi màu nâu đỏ." },
    { content: "Nung 6,4 g Cu ngoài không khí thu được 6,4 g CuO. Hiệu suất phản ứng là", choices: ["100%.", "80%.", "70%.", "60%."], correctIndex: 1, explanation: "n(Cu ban đầu)=0,1 mol (lý thuyết tạo 0,1 mol CuO = 8g); thực tế chỉ thu 6,4g CuO tương ứng 0,08 mol -> hiệu suất=0,08/0,1=80%." },
    { content: "Hoà tan hoàn toàn 3,25 g một kim loại X (hoá trị II) bằng dung dịch H2SO4 loãng thu được 1,12 lít khí H2 (đktc). X là kim loại nào?", choices: ["Fe.", "Mg.", "Ca.", "Zn."], correctIndex: 3, explanation: "n(H2)=0,05 mol=n(X) -> M(X)=3,25/0,05=65 -> Zn." },
    { content: "Hoà tan hết 2,3 g Na kim loại vào 97,8 g nước thu được dung dịch có nồng độ", choices: ["2,4%.", "4,0%.", "23,0%.", "5,8%."], correctIndex: 1, explanation: "n(Na)=0,1 mol -> tạo 0,1 mol NaOH (4g) + 0,05 mol H2 (0,1g) bay ra. m(dd)=2,3+97,8-0,1=100g -> C%=4/100×100%=4,0%." },
    { content: "Hoà tan hết 12 g một kim loại (hoá trị II) bằng dung dịch H2SO4 loãng thu được 6,72 lít khí H2 (đktc). Kim loại này là", choices: ["Zn.", "Fe.", "Ca.", "Mg."], correctIndex: 2, explanation: "n(H2)=0,3 mol=n(kim loại) -> M=12/0,3=40 -> Ca." },
    { content: "Cho 4,6 g một kim loại M (hoá trị I) phản ứng với khí chlorine tạo thành 11,7 g muối. M là kim loại nào?", choices: ["Li.", "K.", "Na.", "Ag."], correctIndex: 2, explanation: "2M + Cl2 -> 2MCl. Khối lượng Cl thêm vào = 11,7-4,6=7,1g -> n(Cl)=0,2 mol=n(M) -> M(kim loại)=4,6/0,2=23 -> Na." },
  ],
};

async function main() {
  for (const batch of [lop8ChuongII, lop9KimLoai]) {
    const quiz = await prisma.quiz.findUnique({ where: { id: batch.quizId } });
    if (!quiz) {
      console.log("Bỏ qua: không tìm thấy quiz", batch.quizId);
      continue;
    }
    const existingCount = await prisma.question.count({ where: { quizId: batch.quizId } });
    if (existingCount > batch.startOrder) {
      console.log(`Bỏ qua "${quiz.title}": đã có ${existingCount} câu (>= ${batch.startOrder}), có vẻ đã chạy script này rồi.`);
      continue;
    }
    let order = batch.startOrder;
    for (const q of batch.questions) {
      await prisma.question.create({
        data: {
          quizId: batch.quizId,
          order: order++,
          content: q.content,
          choices: JSON.stringify(q.choices),
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        },
      });
    }
    console.log(`Đã thêm ${batch.questions.length} câu vào "${quiz.title}"`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
