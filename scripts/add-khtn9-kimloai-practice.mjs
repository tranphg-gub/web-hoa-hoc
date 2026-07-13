import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AI: bài tập mining từ KHTN 9 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx (Tài liệu/Lớp 6-9 (THCS)/
// Mới upload (Lớp 6,7,8,9)/). Tài liệu này KHÔNG có bảng đáp án (khác KHTN 6/8) — mọi đáp án được
// tự giải bằng kiến thức hóa học (dãy hoạt động hóa học K,Na,Ca,Mg,Al,Zn,Fe,Pb,(H),Cu,Ag,Au theo
// đúng tài liệu gốc; tính chất vật lí kim loại: độ cứng/dẻo/dẫn điện-nhiệt/khối lượng riêng/nhiệt độ
// nóng chảy; phản ứng kim loại-acid/muối/nước/base) và kiểm chứng lại trước khi đưa vào.
// Chỉ mining chương "Kim loại" (Bài 18-19, phần lí thuyết + phần dãy hoạt động hóa học) trong đợt
// này — 3 chương còn lại của Lớp 9 (Hydrocarbon, Ethylic alcohol-Acetic acid, Lipid-Carbohydrate-
// Protein-Polymer) chưa mining, để lại cho đợt tiếp theo do tài liệu rất lớn (28MB/~7500 dòng text).
// Đã loại khi đọc: câu thiếu lựa chọn do lỗi trích xuất (VD Câu 24, 41-43, 67, 76 bị mất 1 phần nội
// dung/lựa chọn giữa chừng), câu tham chiếu bảng số liệu không có trong text (Câu 18 về điện trở).
// Đích: ngân hàng luyện tập /practice (PracticeQuestion) Chương 6 Lớp 9.
const CHAPTER_ID = "cmrel0mlq0002vhd8g5c1yfwu"; // Lớp 9 - Chương 6. Kim loại

const QUESTIONS = [
  // ---- Bài 18. Tính chất chung của kim loại ----
  {
    content: "Kim loại có những tính chất vật lý chung nào sau đây?",
    choices: [
      "Tính dẻo, tính dẫn điện, nhiệt độ nóng chảy cao.",
      "Tính dẫn điện, tính dẫn nhiệt, có khối lượng riêng lớn và có ánh kim.",
      "Tính dẻo, tính dẫn điện, tính dẫn nhiệt và có ánh kim.",
      "Tính dẻo, có ánh kim, rất cứng.",
    ],
    correctIndex: 2,
    explanation: "4 tính chất vật lí chung của mọi kim loại: tính dẻo, tính dẫn điện, tính dẫn nhiệt và có ánh kim. Nhiệt độ nóng chảy, độ cứng, khối lượng riêng khác nhau rất nhiều giữa các kim loại (VD Hg lỏng ở thường, Na rất mềm) nên không phải tính chất chung.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong các kim loại sau đây, kim loại dẻo nhất là",
    choices: ["đồng (Cu).", "nhôm (Al).", "bạc (Ag).", "vàng (Au)."],
    correctIndex: 3,
    explanation: "Vàng (Au) là kim loại có tính dẻo cao nhất, có thể dát mỏng thành lá vàng rất mỏng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây dẫn điện tốt nhất?",
    choices: ["Au.", "Cu.", "Fe.", "Ag."],
    correctIndex: 3,
    explanation: "Bạc (Ag) dẫn điện tốt nhất trong các kim loại, sau đó đến đồng (Cu), vàng (Au), nhôm (Al).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại được dùng phổ biến để tạo trang sức, có tác dụng bảo vệ sức khỏe là",
    choices: ["Đồng.", "Bạc.", "Sắt.", "Sắt tây."],
    correctIndex: 1,
    explanation: "Bạc thường được dùng làm trang sức và theo kinh nghiệm dân gian có tác dụng bảo vệ sức khoẻ.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây nhẹ nhất (có khối lượng riêng nhỏ nhất)?",
    choices: ["Li.", "Na.", "K.", "Rb."],
    correctIndex: 0,
    explanation: "Lithium (Li) có khối lượng riêng khoảng 0,53 g/cm³, nhỏ nhất trong các kim loại kiềm được liệt kê.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại có khối lượng riêng lớn nhất là",
    choices: ["W.", "Pb.", "Os.", "Cr."],
    correctIndex: 2,
    explanation: "Osmium (Os) có khối lượng riêng khoảng 22,6 g/cm³, lớn nhất trong số các nguyên tố kim loại.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho dãy các kim loại Mg, Cr, K, Li. Kim loại mềm nhất trong dãy là",
    choices: ["Cr.", "Mg.", "K.", "Li."],
    correctIndex: 2,
    explanation: "Potassium (K) là kim loại kiềm rất mềm, mềm hơn cả Li trong dãy này.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại cứng nhất là",
    choices: ["Cr.", "Os.", "Pb.", "W."],
    correctIndex: 0,
    explanation: "Chromium (Cr) là kim loại cứng nhất trong tự nhiên.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây có nhiệt độ nóng chảy thấp nhất?",
    choices: ["Li.", "Cu.", "Ag.", "Hg."],
    correctIndex: 3,
    explanation: "Thuỷ ngân (Hg) có nhiệt độ nóng chảy khoảng -38,8°C, ở thể lỏng ngay tại điều kiện thường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở điều kiện thường, kim loại nào sau đây ở trạng thái lỏng?",
    choices: ["Hg.", "Ag.", "Cu.", "Al."],
    correctIndex: 0,
    explanation: "Thuỷ ngân (Hg) là kim loại duy nhất ở thể lỏng tại điều kiện thường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào có nhiệt độ nóng chảy cao nhất thường được sử dụng để làm dây tóc bóng đèn?",
    choices: ["tungsten (W).", "đồng (Cu).", "sắt (Fe).", "kẽm (Zn)."],
    correctIndex: 0,
    explanation: "Tungsten (W) có nhiệt độ nóng chảy cao nhất trong các kim loại (~3422°C), được dùng làm dây tóc bóng đèn.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây nhẹ nhất (có khối lượng riêng nhỏ nhất) trong các kim loại: Lithium (Li), Sodium (Natri), Potassium (K), Calcium (Ca)?",
    choices: ["Lithium (Li).", "Sodium (Natri).", "Potassium (K).", "Calcium (Ca)."],
    correctIndex: 0,
    explanation: "Lithium có khối lượng riêng nhỏ nhất trong 4 kim loại này (~0,53 g/cm³).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Một trong những chất liệu làm nên vẻ đẹp kì ảo của tranh sơn mài là những mảnh màu vàng lấp lánh cực mỏng. Đó chính là những lá vàng có chiều dày 1.10⁻⁴ mm. Người ta đã ứng dụng tính chất vật lí gì của vàng khi làm tranh sơn mài?",
    choices: [
      "Có khả năng khúc xạ ánh sáng.",
      "Tính dẻo và có ánh kim.",
      "Tính dẻo, tính dẫn nhiệt.",
      "Mềm, có tỉ khối lớn.",
    ],
    correctIndex: 1,
    explanation: "Nhờ tính dẻo, vàng được dát thành lá cực mỏng; ánh kim tạo nên vẻ lấp lánh đặc trưng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kim loại X được sử dụng trong nhiệt kế, áp kế và một số thiết bị khác. Ở điều kiện thường, X là chất lỏng. Kim loại X là",
    choices: ["W.", "Cr.", "Hg.", "Pb."],
    correctIndex: 2,
    explanation: "Thuỷ ngân (Hg) ở thể lỏng tại điều kiện thường, được dùng trong nhiệt kế/áp kế truyền thống.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại X là kim loại cứng nhất, được sử dụng để mạ các dụng cụ kim loại, chế tạo các loại thép chống gỉ, không gỉ… Kim loại X là",
    choices: ["Fe.", "Ag.", "Cr.", "W."],
    correctIndex: 2,
    explanation: "Chromium (Cr) là kim loại cứng nhất, dùng để mạ crôm và chế tạo thép không gỉ (thép chứa Cr).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho các kim loại: Cr; W; Fe; Cu; Cs. Sắp xếp theo chiều tăng dần độ cứng từ trái sang phải?",
    choices: [
      "Cs < Cu < Fe < Cr < W.",
      "Cu < Cs < Fe < W < Cr.",
      "Cs < Cu < Fe < W < Cr.",
      "Cu < Cs < Fe < Cr < W.",
    ],
    correctIndex: 0,
    explanation: "Độ cứng tăng dần: Cs (kim loại kiềm, rất mềm) < Cu < Fe < Cr < W (rất cứng).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy so sánh tính chất vật lý của kim loại nào dưới đây là không đúng?",
    choices: [
      "Dẫn điện và nhiệt Ag > Cu > Al > Fe.",
      "Tỉ khối Li < Fe < Os.",
      "Nhiệt độ nóng chảy Hg < Al < W.",
      "Tính cứng Cs < Fe < Al < Cu < Cr.",
    ],
    correctIndex: 3,
    explanation: "Thứ tự độ cứng đúng phải là Cs < Al < Cu < Fe < Cr (Al mềm hơn Fe, không phải Fe mềm hơn Al như phát biểu D nêu), nên D sai.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Trong số các kim loại Al, Zn, Fe, Ag. Kim loại nào không tác dụng được với O2 ở nhiệt độ thường?",
    choices: ["Ag.", "Zn.", "Al.", "Fe."],
    correctIndex: 0,
    explanation: "Bạc (Ag) hầu như không phản ứng với oxygen ở nhiệt độ thường; Al, Zn, Fe đều bị oxi hoá dần trong không khí.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ở điều kiện thường, kim loại nào sau đây tác dụng mạnh với H2O?",
    choices: ["Fe.", "Ba.", "Cu.", "Mg."],
    correctIndex: 1,
    explanation: "Barium (Ba), kim loại kiềm thổ mạnh, phản ứng mạnh với nước ở nhiệt độ thường: Ba + 2H2O → Ba(OH)2 + H2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây tan trong nước ở điều kiện thường?",
    choices: ["Cu.", "Fe.", "Na.", "Al."],
    correctIndex: 2,
    explanation: "Sodium (Na) phản ứng mạnh với nước ở nhiệt độ thường, tan hết tạo dung dịch NaOH và khí H2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây tan hết trong nước dư ở nhiệt độ thường?",
    choices: ["Mg.", "Fe.", "Al.", "Na."],
    correctIndex: 3,
    explanation: "Na phản ứng hoàn toàn với nước dư ở nhiệt độ thường; Mg, Al, Fe không phản ứng (hoặc phản ứng không đáng kể) với nước ở điều kiện thường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây tác dụng với nước thu được dung dịch base?",
    choices: ["Al.", "K.", "Ag.", "Fe."],
    correctIndex: 1,
    explanation: "Potassium (K) phản ứng với nước tạo dung dịch base KOH và khí H2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây tác dụng với dung dịch H2SO4 loãng, thu được khí H2?",
    choices: ["Au.", "Cu.", "Mg.", "Ag."],
    correctIndex: 2,
    explanation: "Mg đứng trước H trong dãy hoạt động hoá học nên phản ứng với H2SO4 loãng giải phóng khí H2; Au, Cu, Ag đều đứng sau H, không phản ứng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây không tan được trong dung dịch HCl?",
    choices: ["Al.", "Ag.", "Zn.", "Mg."],
    correctIndex: 1,
    explanation: "Bạc (Ag) đứng sau H trong dãy hoạt động hoá học nên không phản ứng với HCl.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây không tan được trong dung dịch H2SO4 loãng?",
    choices: ["Mg.", "Al.", "Cu.", "Fe."],
    correctIndex: 2,
    explanation: "Đồng (Cu) đứng sau H, không phản ứng với H2SO4 loãng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây phản ứng với dung dịch H2SO4 loãng?",
    choices: ["Cu.", "Mg.", "Ag.", "Au."],
    correctIndex: 1,
    explanation: "Mg đứng trước H nên phản ứng với H2SO4 loãng giải phóng khí H2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại phản ứng được với dung dịch HCl loãng là",
    choices: ["Ag.", "Au.", "Cu.", "Al."],
    correctIndex: 3,
    explanation: "Al đứng trước H nên phản ứng với HCl loãng; Ag, Au, Cu đều đứng sau H.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại Fe không phản ứng với dung dịch nào sau đây?",
    choices: ["HCl.", "AgNO3.", "CuSO4.", "NaNO3."],
    correctIndex: 3,
    explanation: "Na hoạt động hoá học mạnh hơn Fe nên Fe không thể đẩy Na ra khỏi muối NaNO3.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kim loại nào sau đây không tác dụng với dung dịch CuSO4?",
    choices: ["Ag.", "Mg.", "Fe.", "Al."],
    correctIndex: 0,
    explanation: "Ag hoạt động hoá học yếu hơn Cu nên không đẩy được Cu ra khỏi muối CuSO4.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Các kim loại tác dụng được với nước ở nhiệt độ thường tạo thành dung dịch base và giải phóng khí hydrogen là",
    choices: ["K, Ca.", "Zn, Ag.", "Mg, Ag.", "Cu, Ba."],
    correctIndex: 0,
    explanation: "K và Ca đều là kim loại mạnh, phản ứng với nước ở nhiệt độ thường tạo base (KOH, Ca(OH)2) và khí H2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dãy gồm các kim loại đều phản ứng với nước ở nhiệt độ thường tạo ra dung dịch có môi trường base là",
    choices: ["Na, Fe, K.", "Na, Cr, K.", "Na, Ba, K.", "Be, Na, Ca."],
    correctIndex: 2,
    explanation: "Na, Ba, K đều là kim loại kiềm/kiềm thổ mạnh phản ứng với nước ở nhiệt độ thường; Fe, Cr, Be không phản ứng với nước ở điều kiện thường.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kim loại nào sau đây phản ứng dung dịch CuSO4 tạo thành 2 chất kết tủa?",
    choices: ["Na.", "Fe.", "Ba.", "Zn."],
    correctIndex: 2,
    explanation: "Ba phản ứng với nước trong dung dịch tạo Ba(OH)2, sau đó Ba(OH)2 phản ứng với CuSO4 tạo đồng thời 2 kết tủa: BaSO4 (trắng) và Cu(OH)2 (xanh lam).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Kim loại nào sau đây khi tác dụng với HCl và tác dụng với Cl2 cho cùng một loại muối chloride?",
    choices: ["Fe.", "Ag.", "Zn.", "Cu."],
    correctIndex: 2,
    explanation: "Zn chỉ có hoá trị II duy nhất nên phản ứng với HCl và Cl2 đều cho ZnCl2. Fe cho FeCl2 (với HCl) khác FeCl3 (với Cl2); Ag, Cu không phản ứng với HCl.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho các kim loại Fe, Cu, Ag, Al, Mg. Kết luận nào sau đây là sai?",
    choices: [
      "Kim loại không tác dụng với H2SO4 đặc, nguội là Al, Fe.",
      "Kim loại tác dụng với dung dịch H2SO4 loãng, HCl là Cu, Ag.",
      "Kim loại tác dụng với dung dịch NaOH là Al.",
      "Cả 5 kim loại không tan trong nước ở nhiệt độ thường.",
    ],
    correctIndex: 1,
    explanation: "Cu và Ag đứng sau H nên KHÔNG phản ứng với H2SO4 loãng hay HCl — phát biểu B sai. Al, Fe đúng là bị thụ động hoá bởi H2SO4 đặc nguội; Al phản ứng với NaOH; cả 5 kim loại đều không tan trong nước ở nhiệt độ thường.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho hỗn hợp bột 3 kim loại sắt, bạc, đồng vào dung dịch HCl, thấy có bọt khí thoát ra. Phản ứng xảy ra xong, khối lượng kim loại không bị giảm là",
    choices: ["sắt, bạc, đồng.", "bạc, đồng.", "sắt, đồng.", "sắt, bạc."],
    correctIndex: 1,
    explanation: "Chỉ Fe phản ứng với HCl (tạo bọt khí H2) và tan bớt; Ag, Cu đứng sau H nên không phản ứng, khối lượng không đổi.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Người ta có thể dát mỏng được nhôm thành thìa, xoong, chậu, giấy gói bánh kẹo là do nhôm có tính …",
    choices: ["dẻo.", "dẫn điện.", "dẫn nhiệt.", "ánh kim."],
    correctIndex: 0,
    explanation: "Tính dẻo cho phép nhôm được dát mỏng, kéo sợi thành các vật dụng khác nhau.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại được dùng làm vật liệu chế tạo vỏ máy bay do có tính bền và nhẹ là",
    choices: ["K.", "Na.", "Zn.", "Al."],
    correctIndex: 3,
    explanation: "Nhôm (Al) nhẹ và bền (có lớp oxide bảo vệ), được dùng rộng rãi làm vỏ máy bay.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây phản ứng với dung dịch NaOH?",
    choices: ["Fe.", "Ag.", "Al.", "Cu."],
    correctIndex: 2,
    explanation: "Nhôm (Al) phản ứng được với dung dịch base mạnh như NaOH, giải phóng khí H2; Fe, Ag, Cu không phản ứng với NaOH.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở nhiệt độ thường, kim loại Al tan hoàn toàn trong lượng dư dung dịch nào sau đây?",
    choices: ["HCl.", "NaNO3.", "NaCl.", "KCl."],
    correctIndex: 0,
    explanation: "Al phản ứng với acid HCl, tan hoàn toàn giải phóng khí H2; NaNO3, NaCl, KCl là muối trung tính không phản ứng với Al.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở nhiệt độ thường, kim loại Al hòa tan trong lượng dư dung dịch nào sau đây?",
    choices: ["NaNO3.", "Na2SO4.", "KOH.", "KCl."],
    correctIndex: 2,
    explanation: "Al phản ứng với dung dịch base mạnh KOH, tan hoàn toàn giải phóng khí H2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở nhiệt độ thường, kim loại Al tan hoàn toàn trong lượng dư dung dịch nào sau đây?",
    choices: ["H2SO4 loãng.", "NaCl.", "NaNO3.", "Na2SO4."],
    correctIndex: 0,
    explanation: "Al phản ứng với acid H2SO4 loãng, tan hoàn toàn giải phóng khí H2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở nhiệt độ thường, kim loại Al tan hoàn toàn trong lượng dư dung dịch nào sau đây?",
    choices: ["MgCl2.", "KCl.", "KOH.", "NaNO3."],
    correctIndex: 2,
    explanation: "Al phản ứng với dung dịch base mạnh KOH, tan hoàn toàn.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Sản phẩm của phản ứng giữa kim loại nhôm với khí oxygen là",
    choices: ["AlCl3.", "Al2O3.", "Al(OH)3.", "Al(NO3)3."],
    correctIndex: 1,
    explanation: "4Al + 3O2 → 2Al2O3, tạo lớp oxide nhôm bảo vệ bề mặt kim loại.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại Al không tan được trong dung dịch nào sau đây?",
    choices: ["NaOH.", "BaCl2.", "HCl.", "Ba(OH)2."],
    correctIndex: 1,
    explanation: "BaCl2 là muối trung tính, không có tính acid hay base nên không phản ứng với Al; NaOH, HCl, Ba(OH)2 đều phản ứng được với Al.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kim loại nào sau đây vừa phản ứng được với dung dịch HCl, vừa phản ứng được với dung dịch NaOH?",
    choices: ["Fe.", "Al.", "Cu.", "Ag."],
    correctIndex: 1,
    explanation: "Al phản ứng được với cả acid (HCl) lẫn base mạnh (NaOH), thể hiện tính chất đặc trưng của nhôm.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ở nhiệt độ thường, kim loại X không tan trong nước nhưng tan trong dung dịch kiềm. Kim loại X là",
    choices: ["Al.", "Mg.", "Ca.", "Na."],
    correctIndex: 0,
    explanation: "Al không phản ứng với nước ở điều kiện thường nhưng tan được trong dung dịch kiềm (NaOH, KOH...).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ở nhiệt độ thường, kim loại Fe tác dụng với dung dịch nào sau đây?",
    choices: ["NaOH.", "Na2SO4.", "Mg(NO3)2.", "HCl."],
    correctIndex: 3,
    explanation: "Fe đứng trước H nên phản ứng với HCl giải phóng khí H2; Fe không phản ứng với NaOH, Na2SO4, Mg(NO3)2 (Mg hoạt động mạnh hơn Fe).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Không được dùng chậu nhôm để chứa nước vôi trong vì",
    choices: [
      "nhôm tác dụng được với dung dịch acid.",
      "nhôm tác dụng được với dung dịch base.",
      "nhôm đẩy được kim loại yếu hơn nó ra khỏi dung dịch muối.",
      "nhôm là kim loại hoạt động hóa học mạnh.",
    ],
    correctIndex: 1,
    explanation: "Nước vôi trong là dung dịch base Ca(OH)2; nhôm phản ứng được với dung dịch base nên bị ăn mòn dần nếu dùng chậu nhôm chứa nước vôi trong.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kim loại nào sau đây tác dụng với Cl2 và HCl tạo ra cùng một muối là",
    choices: ["Cu.", "Mg.", "Fe.", "Ag."],
    correctIndex: 1,
    explanation: "Mg chỉ có hoá trị II nên phản ứng với Cl2 và HCl đều cho MgCl2; Fe cho FeCl3 (với Cl2) khác FeCl2 (với HCl); Cu, Ag không phản ứng với HCl.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Nhôm được dùng làm vật liệu chế tạo máy bay là do nhôm",
    choices: ["có nhiệt độ nóng chảy cao.", "nhẹ và bền.", "dẫn điện tốt.", "có tính dẻo."],
    correctIndex: 1,
    explanation: "Nhôm nhẹ (khối lượng riêng nhỏ) và bền (có lớp oxide bảo vệ chống ăn mòn) nên phù hợp làm vỏ máy bay.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi còn đương vị, Napoleon III (1808 – 1873) đã nảy ra một ý thích kỳ quái là cần phải có một chiếc vương miện làm bằng kim loại còn quý hơn cả vàng với ngọc. Với sự giúp đỡ của các nhà hóa học Pháp lúc đó, nguyên tố này đã được tìm ra. Đó là nguyên tố nào sau đây?",
    choices: ["Al.", "Cu.", "Ag.", "Au."],
    correctIndex: 0,
    explanation: "Trước khi có phương pháp điện phân sản xuất hàng loạt, nhôm (Al) từng quý hơn cả vàng do khó tách chiết; Napoleon III từng cho làm bộ dao dĩa bằng nhôm để đãi khách quý.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "X là một kim loại nhẹ, màu trắng bạc, được ứng dụng rộng rãi trong đời sống. X là",
    choices: ["Cu.", "Fe.", "Al.", "Ag."],
    correctIndex: 2,
    explanation: "Nhôm (Al) là kim loại nhẹ, màu trắng bạc, được sử dụng rất phổ biến (đồ gia dụng, xây dựng, hàng không...).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhôm là kim loại",
    choices: [
      "dẫn điện và nhiệt tốt nhất trong số tất cả kim loại.",
      "dẫn điện và nhiệt đều kém.",
      "dẫn điện tốt nhưng dẫn nhiệt kém.",
      "dẫn điện và nhiệt tốt nhưng kém hơn đồng.",
    ],
    correctIndex: 3,
    explanation: "Nhôm dẫn điện và nhiệt khá tốt (đứng thứ 4 sau Ag, Cu, Au) nhưng kém hơn đồng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dụng cụ không dùng để đựng dung dịch nước vôi trong là",
    choices: ["cốc thủy tinh.", "cốc sắt.", "cốc nhôm.", "cốc nhựa."],
    correctIndex: 2,
    explanation: "Nhôm phản ứng với base Ca(OH)2 trong nước vôi trong nên không dùng cốc nhôm; thuỷ tinh, sắt, nhựa đều không phản ứng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Có một mẫu Fe bị lẫn tạp chất là nhôm, làm sạch mẫu sắt này bằng cách ngâm nó với",
    choices: [
      "dung dịch NaOH dư.",
      "dung dịch H2SO4 loãng.",
      "dung dịch HCl dư.",
      "dung dịch HNO3 loãng.",
    ],
    correctIndex: 0,
    explanation: "NaOH dư hoà tan hết Al (tạp chất) mà không phản ứng với Fe, nên còn lại Fe tinh khiết; H2SO4 loãng và HCl dư sẽ hoà tan cả Fe lẫn Al.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Chỉ dùng dung dịch NaOH, có thể phân biệt được cặp kim loại",
    choices: ["Fe, Cu.", "Mg, Fe.", "Al, Fe.", "Fe, Ag."],
    correctIndex: 2,
    explanation: "Al phản ứng với NaOH (tan, sủi bọt khí) còn Fe thì không — dựa vào đó phân biệt được cặp Al, Fe.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Hoà tan hỗn hợp gồm Fe và Cu vào dung dịch HCl (vừa đủ). Các sản phẩm thu được sau phản ứng là",
    choices: [
      "FeCl2 và khí H2.",
      "FeCl2, Cu và khí H2.",
      "Cu và khí H2.",
      "FeCl2 và Cu.",
    ],
    correctIndex: 1,
    explanation: "Chỉ Fe phản ứng với HCl (vừa đủ với Fe): Fe + 2HCl → FeCl2 + H2; Cu không phản ứng với HCl nên còn nguyên vẹn trong sản phẩm.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho dây sắt (iron) quấn hình lò xo (đã được nung nóng đỏ) vào lọ đựng khí chlorine. Hiện tượng xảy ra là",
    choices: [
      "Sắt cháy tạo thành khói trắng dày đặc bám vào thành bình.",
      "Không thấy hiện tượng phản ứng.",
      "Sắt cháy sáng tạo thành khói màu nâu đỏ.",
      "Sắt cháy sáng tạo thành khói màu đen.",
    ],
    correctIndex: 2,
    explanation: "2Fe + 3Cl2 →(t°) 2FeCl3; FeCl3 tạo thành ở dạng khói/hạt mịn màu nâu đỏ đặc trưng, đây là thí nghiệm kinh điển minh hoạ phản ứng của sắt với chlorine.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trường hợp nào không có phản ứng hóa học khi cho dây sắt tiếp xúc với",
    choices: [
      "Khí oxygen ở nhiệt độ cao.",
      "Khí chlorine ở nhiệt độ cao.",
      "Dung dịch NaOH.",
      "Dung dịch H2SO4.",
    ],
    correctIndex: 2,
    explanation: "Fe không phản ứng với dung dịch NaOH (base); Fe phản ứng với O2 và Cl2 ở nhiệt độ cao, và phản ứng với H2SO4 (loãng, đứng trước H).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chọn phương án đúng.",
    choices: [
      "Tất cả các kim loại đều phản ứng được với dung dịch HCl, H2SO4 loãng.",
      "Kim loại sắt (iron) khi tác dụng với dung dịch HCl và khí Cl2 cho cùng một loại muối.",
      "Có thể đựng acid HCl trong bình bằng nhôm do nhôm không tác dụng với HCl.",
      "Kim loại đồng (Cu) không tác dụng được với dung dịch H2SO4 loãng do hoạt động hóa học yếu.",
    ],
    correctIndex: 3,
    explanation: "Cu đứng sau H trong dãy hoạt động hoá học nên không phản ứng với H2SO4 loãng — đây là phát biểu đúng. Các phát biểu còn lại sai: không phải mọi kim loại đều phản ứng với acid (Cu, Ag, Au không); Fe cho FeCl2 với HCl nhưng FeCl3 với Cl2 (khác nhau); nhôm THỰC RA có phản ứng với HCl nên không thể dùng bình nhôm đựng HCl.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Chọn phương án không chính xác?",
    choices: [
      "Sắt bị hòa tan trong dung dịch HCl còn vàng thì không.",
      "Nhôm và sắt đều tác dụng được với dung dịch HCl, H2SO4 loãng.",
      "Nhôm, sắt và vàng đều bền trong không khí và nước.",
      "Nhôm và sắt đều tác dụng với khí chlorine theo cùng tỉ lệ mol kim loại : Cl2 (2:3).",
    ],
    correctIndex: 2,
    explanation: "Sắt KHÔNG bền trong không khí và nước — sắt bị gỉ (ăn mòn) khi tiếp xúc lâu với không khí ẩm, khác với nhôm (có lớp oxide bảo vệ) và vàng (rất bền) — đây là phát biểu không chính xác.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho các phát biểu về tính chất vật lý của sắt: (1) Sắt là kim loại màu trắng xám, có ánh kim, dẫn điện, dẫn nhiệt tốt nhưng kém hơn nhôm; (2) Sắt có tính nhiễm từ; (3) Sắt là kim loại nặng; (4) Sắt nóng chảy ở 660°C. Số phát biểu đúng là",
    choices: ["3.", "2.", "1.", "4."],
    correctIndex: 0,
    explanation: "(1), (2), (3) đúng. (4) sai vì 660°C là nhiệt độ nóng chảy của nhôm (Al), sắt nóng chảy ở khoảng 1538°C. Vậy có 3 phát biểu đúng.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho dãy các kim loại: Al, Cu, Fe, Ag. Số kim loại trong dãy phản ứng được với dung dịch H2SO4 loãng là",
    choices: ["3.", "4.", "1.", "2."],
    correctIndex: 3,
    explanation: "Al và Fe đứng trước H nên phản ứng với H2SO4 loãng; Cu, Ag đứng sau H nên không phản ứng. Vậy có 2 kim loại phản ứng được.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho dãy các kim loại: K, Mg, Cu, Al. Số kim loại trong dãy phản ứng được với dung dịch HCl là",
    choices: ["4.", "1.", "2.", "3."],
    correctIndex: 3,
    explanation: "K, Mg, Al đều đứng trước H nên phản ứng được với HCl; chỉ Cu (đứng sau H) không phản ứng. Vậy có 3 kim loại phản ứng được.",
    difficulty: "THONG_HIEU",
  },
  // ---- Bài 19. Dãy hoạt động hóa học ----
  {
    content: "Kim loại nào trong số các kim loại Al, Fe, Ag, Cu hoạt động hóa học mạnh nhất?",
    choices: ["Al.", "Fe.", "Ag.", "Cu."],
    correctIndex: 0,
    explanation: "Theo dãy hoạt động hoá học K,Na,Ca,Mg,Al,Zn,Fe,Pb,(H),Cu,Ag,Au, Al đứng trước Fe, Cu, Ag nên hoạt động hoá học mạnh nhất trong 4 kim loại này.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong các kim loại Ag, Cu, Al, Mg. Kim loại trong dãy hoạt động hóa học yếu nhất là?",
    choices: ["Cu.", "Mg.", "Al.", "Ag."],
    correctIndex: 3,
    explanation: "Ag đứng cuối dãy hoạt động hoá học trong 4 kim loại này, hoạt động hoá học yếu nhất.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dãy chất gồm các kim loại được sắp xếp theo chiều tăng dần về hoạt động hóa học là",
    choices: [
      "Cu; Fe; Zn; Al; Na; K.",
      "Al; Na; Fe; Cu; K; Zn.",
      "Fe; Al; Cu; Zn; K; Na.",
      "Fe; Cu; Al; K; Na; Zn.",
    ],
    correctIndex: 0,
    explanation: "Theo dãy hoạt động hoá học (giảm dần: K,Na,Ca,Mg,Al,Zn,Fe,Pb,(H),Cu,Ag,Au), chiều tăng dần là Cu < Fe < Zn < Al < Na < K, khớp với đáp án A.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy kim loại Fe, Al, Mg sắp xếp theo chiều hoạt động hóa học tăng dần từ trái sang phải là",
    choices: ["Fe, Al, Mg.", "Al, Mg, Fe.", "Fe, Mg, Al.", "Mg, Al, Fe."],
    correctIndex: 0,
    explanation: "Theo dãy hoạt động hoá học, Mg > Al > Fe (giảm dần), nên tăng dần là Fe < Al < Mg.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy kim loại Pb, Ni, Sn, Zn sắp xếp theo chiều hoạt động hóa học tăng dần từ trái sang phải là",
    choices: ["Pb, Ni, Sn, Zn.", "Pb, Sn, Ni, Zn.", "Ni, Sn, Zn, Pb.", "Ni, Zn, Pb, Sn."],
    correctIndex: 1,
    explanation: "Theo dãy hoạt động hoá học đầy đủ (Zn, Fe, Ni, Sn, Pb giảm dần), tăng dần là Pb < Sn < Ni < Zn.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy gồm kim loại Cu, Zn, Al, Mg được sắp xếp theo chiều hoạt động hóa học tăng dần từ trái sang phải là",
    choices: ["Cu, Zn, Al, Mg.", "Mg, Cu, Zn, Al.", "Cu, Mg, Zn, Al.", "Al, Zn, Mg, Cu."],
    correctIndex: 0,
    explanation: "Theo dãy hoạt động hoá học, Mg > Al > Zn > Cu (giảm dần), nên tăng dần là Cu < Zn < Al < Mg.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy kim loại Al, Mg, K, Ca nào sau đây được sắp xếp theo chiều hoạt động hóa học tăng dần từ trái sang phải là",
    choices: ["Al, Mg, K, Ca.", "Ca, K, Mg, Al.", "K, Ca, Mg, Al.", "Al, Mg, Ca, K."],
    correctIndex: 3,
    explanation: "Theo dãy hoạt động hoá học, K > Ca > Mg > Al (giảm dần), nên tăng dần là Al < Mg < Ca < K.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy kim loại Na, Mg, Zn được sắp xếp theo chiều hoạt động hóa học giảm dần là",
    choices: ["Na, Mg, Zn.", "Al, Zn, Na.", "Mg, Al, Na.", "Pb, Al, Mg."],
    correctIndex: 0,
    explanation: "Theo dãy hoạt động hoá học, Na > Mg > Zn (giảm dần), khớp trực tiếp với đáp án A.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy kim loại Mg, K, Fe, Cu được sắp xếp theo chiều hoạt động hóa học tăng dần từ trái sang phải là",
    choices: ["Mg, K, Fe, Cu.", "Cu, Fe, K, Mg.", "K, Mg, Fe, Cu.", "Cu, Fe, Mg, K."],
    correctIndex: 3,
    explanation: "Theo dãy hoạt động hoá học, K > Mg > Fe > Cu (giảm dần), nên tăng dần là Cu < Fe < Mg < K.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy kim loại Al, Mg, K, Ca nào sau đây được sắp xếp theo chiều hoạt động hóa học giảm dần từ trái sang phải là",
    choices: ["Al, Mg, K, Ca.", "Ca, K, Mg, Al.", "K, Ca, Mg, Al.", "Al, Mg, Ca, K."],
    correctIndex: 2,
    explanation: "Theo dãy hoạt động hoá học, K > Ca > Mg > Al (giảm dần), khớp trực tiếp với đáp án C.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kim loại nào sau đây không phản ứng với dung dịch CuSO4?",
    choices: ["Ag.", "Al.", "Fe.", "Zn."],
    correctIndex: 0,
    explanation: "Ag hoạt động hoá học yếu hơn Cu nên không đẩy được Cu ra khỏi dung dịch muối CuSO4.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dung dịch muối không phản ứng với Fe là",
    choices: ["CuSO4.", "AgNO3.", "FeCl3.", "MgCl2."],
    correctIndex: 3,
    explanation: "Mg hoạt động hoá học mạnh hơn Fe nên Fe không thể đẩy Mg ra khỏi muối MgCl2.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hai dung dịch đều phản ứng được với kim loại Cu là",
    choices: [
      "MgSO4 và ZnCl2.",
      "FeCl3 và AgNO3.",
      "FeCl2 và ZnCl2.",
      "AlCl3 và HCl.",
    ],
    correctIndex: 1,
    explanation: "Cu phản ứng với FeCl3 (Cu + 2FeCl3 → CuCl2 + 2FeCl2, do Fe³⁺ oxi hoá được Cu) và với AgNO3 (Cu hoạt động mạnh hơn Ag, đẩy được Ag ra khỏi muối).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Hỗn hợp X gồm 2 kim loại Fe – Cu. Có thể dùng dung dịch nào sau đây để thu được kim loại Cu từ X?",
    choices: [
      "Dung dịch Cu(NO3)2 dư.",
      "Dung dịch MgSO4 dư.",
      "Dung dịch Fe(NO3)2 dư.",
      "Dung dịch FeCl3 dư.",
    ],
    correctIndex: 0,
    explanation: "Cu(NO3)2 dư: Fe phản ứng (Fe + Cu(NO3)2 → Fe(NO3)2 + Cu, hoà tan hết Fe và tạo thêm Cu), còn Cu ban đầu không phản ứng với muối của chính nó — lọc thu được Cu tinh khiết. FeCl3 dư lại hoà tan CẢ Cu (Cu + 2FeCl3 → CuCl2 + 2FeCl2) nên không tách được.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Dãy kim loại Al, Zn, Fe nào tác dụng được với dung dịch Cu(NO3)2 tạo thành kim loại Cu?",
    choices: ["Al, Zn, Fe.", "Mg, Fe, Ag.", "Zn, Pb, Au.", "Na, Mg, Al."],
    correctIndex: 0,
    explanation: "Al, Zn, Fe đều hoạt động hoá học mạnh hơn Cu và không phản ứng trực tiếp với nước ở điều kiện thường, nên đẩy được Cu ra khỏi dung dịch muối.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hai kim loại đều phản ứng với dung dịch AgNO3 giải phóng kim loại Ag là",
    choices: ["Fe và Au.", "Al và Ag.", "Cr và Ag.", "Al và Fe."],
    correctIndex: 3,
    explanation: "Al và Fe đều hoạt động hoá học mạnh hơn Ag nên đẩy được Ag ra khỏi dung dịch AgNO3.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Các kim loại Al, Zn, Cu tác dụng được với dung dịch AgNO3 tạo thành Ag là",
    choices: ["Al, Zn, Cu.", "Mg, Fe, Ag.", "Zn, Pb, Au.", "Na, Mg, Al."],
    correctIndex: 0,
    explanation: "Al, Zn, Cu đều hoạt động hoá học mạnh hơn Ag (kể cả Cu) nên đẩy được Ag ra khỏi dung dịch AgNO3.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ở nhiệt độ thường, kim loại Al tác dụng được với dung dịch",
    choices: ["Mg(NO3)2.", "Ca(NO3)2.", "KNO3.", "Cu(NO3)2."],
    correctIndex: 3,
    explanation: "Al hoạt động hoá học mạnh hơn Cu nên đẩy được Cu ra khỏi dung dịch Cu(NO3)2; Al không đẩy được Mg, Ca, K vì các kim loại này hoạt động mạnh hơn Al.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kim loại Fe phản ứng được với dung dịch nào trong số CuSO4, Al2(SO4)3, MgSO4, ZnSO4?",
    choices: ["CuSO4.", "Al2(SO4)3.", "MgSO4.", "ZnSO4."],
    correctIndex: 0,
    explanation: "Fe hoạt động hoá học mạnh hơn Cu nên đẩy được Cu ra khỏi CuSO4; Al, Mg, Zn đều mạnh hơn Fe nên Fe không đẩy được các kim loại này.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Một kim loại phản ứng với dung dịch CuSO4 tạo ra Cu. Kim loại đó là",
    choices: ["Na.", "Ag.", "Cu.", "Fe."],
    correctIndex: 3,
    explanation: "Fe hoạt động hoá học mạnh hơn Cu nên đẩy được Cu ra khỏi dung dịch CuSO4 theo phản ứng thế đơn giản; Na sẽ phản ứng với nước trước chứ không thế trực tiếp, Ag yếu hơn Cu.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở nhiệt độ thường, kim loại Fe tác dụng được với dung dịch nào trong số Mg(NO3)2, NaCl, NaOH, AgNO3?",
    choices: ["Mg(NO3)2.", "NaCl.", "NaOH.", "AgNO3."],
    correctIndex: 3,
    explanation: "Fe hoạt động hoá học mạnh hơn Ag nên đẩy được Ag ra khỏi dung dịch AgNO3; Fe không phản ứng với Mg(NO3)2 (Mg mạnh hơn Fe), NaCl hay NaOH.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại Fe không phản ứng với chất nào trong số MgCl2, FeCl3, AgNO3, CuSO4?",
    choices: ["MgCl2.", "FeCl3.", "AgNO3.", "CuSO4."],
    correctIndex: 0,
    explanation: "Mg hoạt động hoá học mạnh hơn Fe nên Fe không đẩy được Mg ra khỏi MgCl2; Fe phản ứng được với FeCl3 (Fe + 2FeCl3 → 3FeCl2), AgNO3 và CuSO4.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hai dung dịch CuSO4, HCl đều tác dụng được với kim loại Fe?",
    choices: ["CuSO4, HCl.", "HCl, CaCl2.", "CuSO4, ZnCl2.", "MgCl2, FeCl3."],
    correctIndex: 0,
    explanation: "Fe phản ứng với CuSO4 (đẩy Cu) và với HCl (đứng trước H, giải phóng khí H2) — cả hai đều phản ứng được.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kim loại có thể vừa phản ứng với dung dịch HCl vừa phản ứng với Al2(SO4)3 là",
    choices: ["Fe.", "Mg.", "Cu.", "Ni."],
    correctIndex: 1,
    explanation: "Mg hoạt động hoá học mạnh hơn Al nên đẩy được Al ra khỏi Al2(SO4)3, đồng thời Mg cũng phản ứng với HCl; Fe, Ni yếu hơn Al nên không đẩy được Al, Cu không phản ứng với HCl.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Để làm sạch mẫu chì bị lẫn kẽm, người ta ngâm mẫu chì này vào một lượng dư dung dịch",
    choices: ["ZnSO4.", "Pb(NO3)2.", "CuCl2.", "Na2CO3."],
    correctIndex: 1,
    explanation: "Zn (tạp chất) hoạt động hoá học mạnh hơn Pb nên phản ứng với Pb(NO3)2 dư, chuyển hoá Zn thành Zn(NO3)2 tan trong dung dịch đồng thời giải phóng thêm Pb — thu được Pb tinh khiết.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Dung dịch FeCl2 có lẫn tạp chất là CuCl2 có thể dùng kim loại nào sau đây để làm sạch dung dịch FeCl2 trên?",
    choices: ["Zn.", "Fe.", "Mg.", "Ag."],
    correctIndex: 1,
    explanation: "Dùng Fe dư: Fe + CuCl2 → FeCl2 + Cu, loại bỏ Cu²⁺ mà không đưa thêm ion kim loại lạ vào dung dịch (chỉ tạo thêm FeCl2, đúng là chất cần giữ lại).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho hỗn hợp các kim loại Fe, Mg, Zn vào cốc đựng dung dịch CuSO4 dư, thứ tự các kim loại tác dụng với muối là:",
    choices: ["Fe, Zn, Mg.", "Mg, Zn, Fe.", "Mg, Fe, Zn.", "Zn, Mg, Fe."],
    correctIndex: 1,
    explanation: "Kim loại hoạt động hoá học càng mạnh phản ứng càng trước: theo dãy hoạt động hoá học Mg > Zn > Fe, nên thứ tự phản ứng là Mg, Zn, Fe.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Hỗn hợp kim loại gồm Fe, Cu, Ag. Có thể thu được Ag tinh khiết bằng cách nào sau đây?",
    choices: [
      "Hoà tan hỗn hợp vào dung dịch HCl.",
      "Hoà tan hỗn hợp vào H2SO4 loãng.",
      "Hoà tan hỗn hợp kim loại vào dung dịch AgNO3.",
      "Dùng nam châm tách Fe và Cu ra khỏi Ag.",
    ],
    correctIndex: 2,
    explanation: "Ngâm hỗn hợp vào dung dịch AgNO3 dư: Fe và Cu (đều mạnh hơn Ag) tan hết vào dung dịch dưới dạng muối, đồng thời giải phóng thêm Ag — lọc thu được Ag tinh khiết. HCl/H2SO4 loãng chỉ hoà tan Fe, còn lẫn Cu+Ag; nam châm chỉ tách được Fe, còn lẫn Cu+Ag.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Dãy hoạt động hóa học của kim loại không cho biết?",
    choices: [
      "Mức độ hoạt động hoá học của các kim loại giảm dần từ trái qua phải.",
      "Kim loại kiềm và kim loại kiềm thổ đều phản ứng với nước ở điều kiện thường tạo thành base và giải phóng khí H2.",
      "Kim loại đứng trước H phản ứng với một số dung dịch acid (HCl, H2SO4 loãng, …) giải phóng khí H2.",
      "Kim loại đứng trước (trừ Na, K,…) đẩy kim loại đứng sau ra khỏi dung dịch muối.",
    ],
    correctIndex: 1,
    explanation: "Không phải mọi kim loại kiềm thổ đều phản ứng với nước ở điều kiện thường (Be không phản ứng, Mg phản ứng rất chậm/không đáng kể) — đây là điểm dãy hoạt động hoá học không khẳng định chung chung như vậy.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Khi cho mẫu Zn vào bình đựng dung dịch X, thì thấy khối lượng chất rắn trong bình từ từ tăng lên. Dung dịch X là",
    choices: ["Cu(NO3)2.", "AgNO3.", "KNO3.", "Fe(NO3)3."],
    correctIndex: 1,
    explanation: "Zn + 2AgNO3 → Zn(NO3)2 + 2Ag: cứ 1 mol Zn (65g) tan ra thì có 2 mol Ag (216g) bám vào, khối lượng rắn tăng mạnh. Với Cu(NO3)2, khối lượng rắn thực ra giảm nhẹ (1 mol Zn 65g tan, chỉ 1 mol Cu 64g bám vào); Zn không phản ứng với KNO3.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Thả một mảnh nhôm vào ống nghiệm chứa dung dịch CuSO4, hiện tượng xảy ra là",
    choices: [
      "Nhôm bị hòa tan và có khí thoát ra khỏi dung dịch.",
      "Có chất rắn màu trắng bám ngoài lá nhôm, màu xanh của dung dịch CuSO4 nhạt dần.",
      "Có chất rắn màu đỏ bám ngoài lá nhôm, màu xanh của dung dịch CuSO4 nhạt dần.",
      "Có chất khí bay ra, dung dịch không đổi màu.",
    ],
    correctIndex: 2,
    explanation: "2Al + 3CuSO4 → Al2(SO4)3 + 3Cu: đồng (màu đỏ) bám vào lá nhôm, đồng thời màu xanh lam của Cu²⁺ nhạt dần do bị tiêu thụ. Phản ứng không sinh khí.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho một lá Fe vào dung dịch CuSO4, sau một thời gian lấy lá sắt ra, khối lượng dung dịch thay đổi như thế nào?",
    choices: [
      "Tăng so với ban đầu.",
      "Không tăng, không giảm so với ban đầu.",
      "Giảm so với ban đầu.",
      "Tăng gấp đôi so với ban đầu.",
    ],
    correctIndex: 2,
    explanation: "Fe + CuSO4 → FeSO4 + Cu: cứ 1 mol Fe (56g) tan vào dung dịch thì có 1 mol Cu (64g) tách ra khỏi dung dịch (bám vào lá sắt) — khối lượng dung dịch thay đổi = +56 - 64 = -8g mỗi mol phản ứng, tức là GIẢM.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho y gam kim loại M vào dung dịch Fe2(SO4)3, sau phản ứng hoàn toàn khối lượng phần dung dịch tăng thêm y gam. Kim loại M là",
    choices: ["Cu.", "Ba.", "Na.", "Ag."],
    correctIndex: 0,
    explanation: "Cu + Fe2(SO4)3 → CuSO4 + 2FeSO4: phản ứng không tạo kết tủa, toàn bộ khối lượng y gam Cu tan hết vào dung dịch nên khối lượng dung dịch tăng đúng bằng y gam. Ba tạo kết tủa BaSO4 (mất bớt khối lượng ra khỏi dung dịch); Na phản ứng với nước trước và tạo kết tủa Fe(OH)3; Ag không phản ứng với Fe2(SO4)3 (thế điện cực Ag+/Ag cao hơn Fe^3+/Fe^2+).",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Nếu hoà tan hết cùng một khối lượng Al và Zn bởi dung dịch HCl thì",
    choices: [
      "Al giải phóng hydrogen nhiều hơn Zn.",
      "Zn giải phóng hydrogen nhiều hơn Al.",
      "Al và Zn giải phóng cùng một lượng hydrogen.",
      "Lượng hydrogen do Al sinh ra bằng 2,5 lần do Zn sinh ra.",
    ],
    correctIndex: 0,
    explanation: "Với cùng khối lượng: 2Al + 6HCl → 2AlCl3 + 3H2 cho 1 mol H2/18g Al; Zn + 2HCl → ZnCl2 + H2 cho 1 mol H2/65g Zn. Vì 1/18 > 1/65, Al giải phóng nhiều H2 hơn Zn với cùng khối lượng.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho 1 viên natri (Na) vào dung dịch CuSO4, hiện tượng xảy ra là",
    choices: [
      "Viên natri tan dần, sủi bọt khí, dung dịch không đổi màu.",
      "Viên natri tan dần, không có khí thoát ra, có kết tủa màu xanh.",
      "Viên natri tan, có khí không màu thoát ra, xuất hiện kết tủa màu xanh.",
      "Không có hiện tượng.",
    ],
    correctIndex: 2,
    explanation: "Na phản ứng với nước trước: 2Na + 2H2O → 2NaOH + H2 (khí không màu thoát ra); NaOH sinh ra phản ứng tiếp với CuSO4: 2NaOH + CuSO4 → Cu(OH)2↓ (kết tủa xanh) + Na2SO4.",
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
        source: "KHTN 9 - Tài liệu học tập 2024 (VEAgroup) — Chương 6. Kim loại",
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
