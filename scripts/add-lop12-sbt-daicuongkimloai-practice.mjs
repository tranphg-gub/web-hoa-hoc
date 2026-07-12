import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AF: bài tập mining từ SBT Hóa 12 - Kết nối tri thức thật (Tài liệu/Lớp 12/Hóa 12 theo
// chuyên đề/Đại cương KL.zip -> "(TỜ SÁCH BÀI TẬP-KNTT) Chương VI - BT Hoá 12 - KNTT.pdf", đọc
// bằng pdftoppm + thị giác vì PDF lỗi text layer). Chỉ lấy câu SINGLE_CHOICE (NHẬN BIẾT/THÔNG
// HIỂU/VẬN DỤNG) — bỏ qua các câu Đúng/Sai nhóm, câu tự luận/tính toán không có đáp án trắc
// nghiệm, và câu 18.3 (đáp án là hình vẽ, không phải văn bản) vì PracticeQuestion chỉ hỗ trợ
// trắc nghiệm 1 đáp án dạng văn bản. File SBT không in đáp án ở các trang đã đọc — mọi đáp án
// dưới đây tự giải bằng kiến thức hóa học (dãy điện hoá, ăn mòn điện hoá, hợp kim) và kiểm
// chứng lại trước khi đưa vào. Ion điện tích ≥2 dùng cú pháp "Fe^2+" (dấu ^) để hiển thị đúng
// dạng số mũ, tránh bị hiểu nhầm thành chỉ số dưới (bài học từ Chương 5).
const CHAPTER_ID = "cmrelkes5000bvhuscyioqkoh"; // Lớp 12 - Chương 6. Đại cương về kim loại

const QUESTIONS = [
  // Bài 18. Cấu tạo và liên kết trong tinh thể kim loại
  {
    content: "Cho biết số thứ tự của Mg trong bảng tuần hoàn là 12. Vị trí của Mg trong bảng tuần hoàn là",
    choices: ["chu kì 3, nhóm IIIA.", "chu kì 3, nhóm IIB.", "chu kì 3, nhóm IIA.", "chu kì 2, nhóm IIA."],
    correctIndex: 2,
    explanation: "Mg (Z=12): cấu hình electron 1s2 2s2 2p6 3s2, có 3 lớp electron (chu kì 3) và 2 electron hoá trị ở phân lớp s (nhóm IIA).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho biết số thứ tự của Al trong bảng tuần hoàn là 13. Số electron ở lớp ngoài cùng của Al là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 2,
    explanation: "Al (Z=13): cấu hình electron 1s2 2s2 2p6 3s2 3p1, lớp ngoài cùng (lớp thứ 3) có 3 electron (2 ở 3s, 1 ở 3p).",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Trong định nghĩa về liên kết kim loại: \"Liên kết kim loại là liên kết hình thành do lực hút tĩnh điện giữa các electron ...(1)... với các ion ...(2)... kim loại ở các nút mạng.\" Các từ cần điền vào vị trí (1), (2) lần lượt là",
    choices: ["ngoài cùng, dương.", "tự do, dương.", "hoá trị, lưỡng cực.", "hoá trị, âm."],
    correctIndex: 1,
    explanation: "Liên kết kim loại hình thành do lực hút tĩnh điện giữa các electron tự do với các ion dương kim loại ở các nút mạng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Những tính chất vật lí chung của kim loại (dẫn điện, dẫn nhiệt, dẻo, ánh kim) gây nên chủ yếu bởi",
    choices: [
      "các electron tự do trong tinh thể kim loại.",
      "kiểu cấu tạo mạng tinh thể của kim loại.",
      "khối lượng riêng của kim loại.",
      "tính chất của kim loại.",
    ],
    correctIndex: 0,
    explanation: "Các electron tự do chuyển động trong toàn mạng tinh thể là nguyên nhân chính gây nên tính dẫn điện, dẫn nhiệt, dẻo và ánh kim của kim loại.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các phát biểu sau đây về vị trí và cấu tạo của kim loại: (1) Hầu hết các kim loại chỉ có từ 1 electron đến 3 electron lớp ngoài cùng. (2) Tất cả các nguyên tố phân nhóm B (phân nhóm phụ) đều là kim loại. (3) Ở trạng thái rắn, đơn chất kim loại có cấu tạo tinh thể. (4) Các kim loại đều có bán kính nhỏ hơn các phi kim thuộc cùng một chu kì. (5) Liên kết kim loại là liên kết được hình thành giữa các nguyên tử và ion dương kim loại trong mạng tinh thể do sự tham gia của các electron tự do. Những phát biểu đúng là",
    choices: ["(1), (2), (3), (5).", "(1), (2), (3), (4), (5).", "(1), (2), (3).", "(1), (3), (5)."],
    correctIndex: 0,
    explanation:
      "(1), (2), (3), (5) đều là phát biểu đúng về kim loại. (4) sai vì trong cùng một chu kì, kim loại (ở đầu chu kì) có bán kính LỚN HƠN phi kim (ở cuối chu kì), không phải nhỏ hơn.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phát biểu nào sau đây đúng? Trong tinh thể kim loại,",
    choices: [
      "các ion dương kim loại nằm ở các nút mạng tinh thể và các electron hoá trị chuyển động tự do xung quanh.",
      "các electron hoá trị ở các nút mạng và các ion dương kim loại chuyển động tự do.",
      "các electron hoá trị và các ion dương kim loại đều chuyển động tự do trong toàn bộ mạng tinh thể.",
      "các electron hoá trị nằm ở giữa các nguyên tử kim loại cạnh nhau.",
    ],
    correctIndex: 0,
    explanation:
      "Mô hình \"biển electron\": các ion dương kim loại cố định ở các nút mạng tinh thể, còn các electron hoá trị tách khỏi nguyên tử, chuyển động tự do xung quanh.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phát biểu nào sau đây đúng? Trong tinh thể kim loại, liên kết kim loại được hình thành do",
    choices: [
      "sự góp chung electron của các nguyên tử kim loại cạnh nhau.",
      "lực hút tĩnh điện giữa các electron hoá trị ở các nút mạng với các ion dương kim loại chuyển động tự do.",
      "lực hút tĩnh điện giữa các electron hoá trị tự do với các ion dương kim loại chuyển động tự do trong toàn bộ mạng tinh thể.",
      "lực hút tĩnh điện giữa các electron hoá trị tự do với các ion dương kim loại ở các nút mạng.",
    ],
    correctIndex: 3,
    explanation:
      "Trong tinh thể kim loại, các ion dương kim loại cố định ở các nút mạng, còn electron hoá trị tự do chuyển động xung quanh; liên kết kim loại là lực hút tĩnh điện giữa hai thành phần này.",
    difficulty: "THONG_HIEU",
  },
  // Bài 19. Tính chất vật lí và tính chất hoá học của kim loại
  {
    content: "Dãy kim loại nào sau đây sắp xếp theo thứ tự độ dẫn điện giảm dần?",
    choices: ["Au, Ag, Cu, Al.", "Ag, Au, Al, Cu.", "Cu, Al, Ag, Au.", "Ag, Cu, Au, Al."],
    correctIndex: 3,
    explanation: "Độ dẫn điện giảm dần theo thứ tự: Ag > Cu > Au > Al.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dây điện cao thế thường được làm bằng nhôm là do nhôm",
    choices: [
      "là kim loại dẫn điện tốt và nhẹ.",
      "là kim loại dẫn điện tốt nhất.",
      "có giá thành rẻ.",
      "có tính trơ về mặt hoá học.",
    ],
    correctIndex: 0,
    explanation: "Nhôm không dẫn điện tốt nhất (kém hơn Ag, Cu) nhưng nhẹ hơn nhiều so với đồng, nên phù hợp làm dây điện cao thế cần treo trên cột dài.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi lựa chọn kim loại để làm vỏ hộp kim loại nhẹ chứa nước ngọt hoặc bia, tính chất nào sau đây thường KHÔNG được xét đến?",
    choices: ["Tính độc.", "Khối lượng riêng.", "Tính dễ dát mỏng.", "Nhiệt độ nóng chảy."],
    correctIndex: 3,
    explanation: "Nhiệt độ nóng chảy không phải là yếu tố quan trọng khi chọn kim loại làm vỏ hộp đựng đồ uống; độ độc, khối lượng riêng và tính dễ dát mỏng mới là các tiêu chí chính.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ứng dụng nào dưới đây là ứng dụng phổ biến của đồng?",
    choices: [
      "Làm những bộ phận cấy ghép vào cơ thể người.",
      "Chế tạo thân máy bay siêu thanh.",
      "Làm đồ trang sức.",
      "Làm lõi dây dẫn điện.",
    ],
    correctIndex: 3,
    explanation: "Đồng dẫn điện tốt, giá thành hợp lý nên được dùng phổ biến làm lõi dây dẫn điện.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong trường hợp phải sử dụng kim loại làm đường ống dẫn nước, kim loại nào sau đây là phù hợp nhất để làm đường ống dẫn nước?",
    choices: ["Kẽm.", "Sắt.", "Chì.", "Đồng."],
    correctIndex: 3,
    explanation: "Đồng bền, ít bị ăn mòn trong nước và an toàn (không độc như chì) nên phù hợp làm ống dẫn nước; sắt dễ gỉ, chì độc hại.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây KHÔNG phản ứng với dung dịch HCl loãng?",
    choices: ["Đồng.", "Calcium.", "Magnesium.", "Kẽm."],
    correctIndex: 0,
    explanation: "Đồng đứng sau hydrogen trong dãy điện hoá nên không phản ứng với dung dịch HCl loãng; Ca, Mg, Zn đều đứng trước hydrogen nên phản ứng được, giải phóng khí H2.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Cho bột Fe vào dung dịch gồm AgNO3 và Cu(NO3)2. Sau khi các phản ứng xảy ra hoàn toàn, thu được dung dịch X gồm hai muối và chất rắn Y gồm hai kim loại. Hai muối trong X và hai kim loại trong Y lần lượt là",
    choices: [
      "Cu(NO3)2; Fe(NO3)2 và Cu; Fe.",
      "Cu(NO3)2; Fe(NO3)2 và Ag; Cu.",
      "Fe(NO3)2; Fe(NO3)3 và Cu; Ag.",
      "Cu(NO3)2; AgNO3 và Cu; Ag.",
    ],
    correctIndex: 1,
    explanation:
      "Fe khử Ag+ trước (dễ khử hơn), rồi mới khử Cu^2+. Vì chất rắn Y gồm đúng 2 kim loại (Ag và Cu, không còn Fe dư), Fe đã phản ứng hết với toàn bộ Ag+ và một phần Cu^2+; dung dịch X còn lại Fe(NO3)2 (mới tạo ra) và Cu(NO3)2 dư (chưa phản ứng hết).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho 0,02 mol Na vào 1 000 mL dung dịch chứa CuSO4 0,05 M và H2SO4 0,005 M. Hiện tượng của thí nghiệm trên là",
    choices: [
      "có khí bay lên và có kết tủa màu xanh lam.",
      "chỉ có khí bay lên.",
      "chỉ có kết tủa màu xanh lam.",
      "có khí bay lên và có kết tủa sau đó kết tủa tan.",
    ],
    correctIndex: 0,
    explanation:
      "Na phản ứng với nước trước tiên tạo NaOH và khí H2 (luôn có khí bay lên). NaOH sinh ra (0,02 mol) trung hoà hết H+ dư (0,01 mol), phần dư (0,01 mol) phản ứng với Cu^2+ tạo một phần kết tủa Cu(OH)2 màu xanh lam (không đủ NaOH dư để hoà tan lại kết tủa này).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kẽm khử được các cation kim loại trong dãy muối nào sau đây?",
    choices: [
      "Cu(NO3)2, Pb(NO3)2, Ni(NO3)2.",
      "AlCl3, MgCl2, Pb(NO3)2.",
      "AlCl3, Ni(NO3)2, Pb(NO3)2.",
      "MgCl2, NaCl, Cu(NO3)2.",
    ],
    correctIndex: 0,
    explanation: "Zn khử được các cation có thế điện cực chuẩn cao hơn Zn^2+/Zn: Cu^2+, Pb^2+, Ni^2+ đều thoả mãn; Al^3+, Mg^2+, Na+ đều có thế điện cực chuẩn thấp hơn Zn nên không bị Zn khử.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Tiến hành 2 thí nghiệm sau: Thí nghiệm 1: cho m gam bột Fe (dư) vào V1 lít dung dịch Cu(NO3)2 1 M. Thí nghiệm 2: cho m gam bột Fe (dư) vào V2 lít dung dịch AgNO3 0,1 M. Sau khi các phản ứng xảy ra hoàn toàn, khối lượng chất rắn thu được ở hai thí nghiệm đều bằng nhau. Giá trị của V1 so với V2 là",
    choices: ["V1 = V2.", "V1 = 10V2.", "V1 = 5V2.", "V1 = 2V2."],
    correctIndex: 0,
    explanation:
      "TN1: mỗi mol Cu(NO3)2 phản ứng làm khối lượng rắn tăng 64−56=8 g, khối lượng tăng thêm = 8V1. TN2: mỗi mol AgNO3 phản ứng (tỉ lệ Fe:AgNO3=1:2) làm khối lượng rắn tăng ứng với 8 g cho mỗi 0,1 mol AgNO3 phản ứng hết, quy đổi theo V2 cũng cho khối lượng tăng thêm = 8V2. Vì hai độ tăng khối lượng bằng nhau nên V1 = V2.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Nhúng một thanh Zn vào 100 mL dung dịch CuSO4, sau một thời gian phản ứng lấy thanh Zn ra khỏi dung dịch, làm khô và đem cân thấy khối lượng thanh Zn giảm 0,01 g. Cho dung dịch loãng NaOH dư vào dung dịch sau phản ứng thu được 0,49 g kết tủa. Nồng độ mol của dung dịch CuSO4 ban đầu là",
    choices: ["0,15 M.", "0,015 M.", "0,1 M.", "0,05 M."],
    correctIndex: 0,
    explanation:
      "Mỗi mol Zn phản ứng với Cu^2+ làm khối lượng thanh giảm 65−64=1 g nên số mol đã phản ứng = 0,01 mol. Với NaOH dư, Zn(OH)2 tan lại (lưỡng tính) nên kết tủa 0,49 g chỉ là Cu(OH)2 từ CuSO4 CÒN DƯ: n = 0,49/98 = 0,005 mol. Tổng CuSO4 ban đầu = 0,01+0,005 = 0,015 mol, nồng độ = 0,015/0,1 = 0,15 M.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Cho 0,35 mol hỗn hợp X gồm Cl2 và O2 phản ứng vừa đủ với 11,1 g hỗn hợp Y gồm Mg và Al, thu được 30,1 g hỗn hợp Z. Phần trăm khối lượng của Al trong Y là",
    choices: ["75,68%.", "24,32%.", "51,35%.", "48,65%."],
    correctIndex: 1,
    explanation:
      "Đặt a, b là mol Cl2, O2: a+b=0,35; 71a+32b=30,1−11,1=19 → a=0,2; b=0,15. Số mol electron nhận = 2a+4b=1,0 mol. Đặt x, y là mol Mg, Al: 24x+27y=11,1; 2x+3y=1,0 → x=0,35; y=0,1. %Al = 27×0,1/11,1×100% ≈ 24,32%.",
    difficulty: "VAN_DUNG",
  },
  // Bài 20. Kim loại trong tự nhiên và phương pháp tách kim loại
  {
    content: "Chất nào dưới đây là thành phần chính của quặng hematite?",
    choices: ["Iron(II) oxide.", "Iron(III) oxide.", "Iron.", "Iron(II) sulfide."],
    correctIndex: 1,
    explanation: "Quặng hematite có thành phần chính là Fe2O3 (iron(III) oxide).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây thường có ở dạng đơn chất trong tự nhiên?",
    choices: ["Đồng.", "Kẽm.", "Vàng.", "Sắt."],
    correctIndex: 2,
    explanation: "Vàng rất kém hoạt động hoá học (kim loại quý, trơ) nên tồn tại ở dạng đơn chất (vàng tự sinh) trong tự nhiên; Cu, Zn, Fe chủ yếu tồn tại dưới dạng hợp chất trong quặng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại nào sau đây có thể được điều chế từ hợp chất của nó bằng cách chỉ dùng nhiệt (đun nóng)?",
    choices: ["Bạc.", "Nhôm.", "Sắt.", "Kẽm."],
    correctIndex: 0,
    explanation: "Hợp chất của bạc (như Ag2O) kém bền nhiệt do Ag rất kém hoạt động, dễ bị phân huỷ chỉ bằng cách đun nóng thành Ag kim loại; Al, Fe, Zn cần phương pháp mạnh hơn (điện phân hoặc nhiệt luyện với chất khử).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phương pháp thích hợp để điều chế Mg từ MgCl2 là",
    choices: [
      "dùng kali khử ion Mg^2+ trong dung dịch.",
      "điện phân MgCl2 nóng chảy.",
      "điện phân dung dịch MgCl2.",
      "nhiệt phân MgCl2.",
    ],
    correctIndex: 1,
    explanation: "Mg là kim loại hoạt động mạnh, chỉ có thể điều chế bằng điện phân nóng chảy hợp chất của nó; điện phân dung dịch sẽ chỉ điện phân nước, không thu được Mg.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Có thể thu được kim loại nào trong số các kim loại sau: Cu, Na, Ca, Al bằng cả ba phương pháp điều chế kim loại phổ biến?",
    choices: ["Na.", "Ca.", "Cu.", "Al."],
    correctIndex: 2,
    explanation: "Cu là kim loại kém hoạt động, có thể điều chế bằng cả nhiệt luyện, thuỷ luyện và điện phân dung dịch; Na, Ca, Al là kim loại mạnh, chỉ điều chế được bằng điện phân nóng chảy.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phản ứng nào sau đây KHÔNG điều chế được kim loại Cu?",
    choices: [
      "Cho Fe tác dụng với dung dịch CuSO4.",
      "Cho Na tác dụng với dung dịch CuSO4.",
      "Điện phân dung dịch CuSO4 (điện cực trơ).",
      "Cho H2 tác dụng với CuO, đun nóng.",
    ],
    correctIndex: 1,
    explanation: "Na phản ứng với nước trong dung dịch trước tiên tạo NaOH, sau đó NaOH phản ứng với CuSO4 chỉ tạo kết tủa Cu(OH)2, không sinh ra kim loại Cu.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong công nghiệp, nhôm được tách ra từ quặng bauxite bằng cách nào sau đây?",
    choices: ["Nung nóng quặng bauxite.", "Nung nóng quặng bauxite với carbon.", "Nung nóng quặng bauxite với hydrogen.", "Điện phân nóng chảy quặng bauxite."],
    correctIndex: 3,
    explanation: "Nhôm oxide tinh chế từ quặng bauxite được điện phân nóng chảy (hoà tan trong criolite) để thu được Al kim loại.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phương pháp nào sau đây có thể tách được sodium kim loại?",
    choices: [
      "Nung nóng mạnh quặng sodium trong không khí.",
      "Nung nóng quặng sodium với carbon.",
      "Điện phân nước muối.",
      "Điện phân muối sodium chloride nóng chảy.",
    ],
    correctIndex: 3,
    explanation: "Na là kim loại hoạt động rất mạnh, chỉ điều chế được bằng điện phân nóng chảy NaCl (phương pháp Downs).",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Cho ba kim loại được tách từ quặng của chúng theo các cách tương ứng sau: X — điện phân; Y — nhiệt phân, nung nóng trực tiếp; Z — nung nóng với carbon. Khả năng hoạt động hoá học của các kim loại giảm dần theo thứ tự nào sau đây?",
    choices: ["X, Z, Y.", "Y, Z, X.", "X, Y, Z.", "Z, Y, X."],
    correctIndex: 0,
    explanation:
      "Điện phân dùng cho kim loại hoạt động mạnh nhất (X); nung với carbon (nhiệt luyện) dùng cho kim loại hoạt động trung bình (Z); nhiệt phân trực tiếp không cần chất khử chỉ áp dụng cho kim loại kém hoạt động nhất (Y). Vậy thứ tự giảm dần: X, Z, Y.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các oxide kim loại sau: (1) Silver oxide; (2) Calcium oxide và (3) Mercury(II) oxide. Nung nóng oxide kim loại nào ở trên thu được kim loại?",
    choices: ["(1).", "(2).", "(1); (3).", "(2); (3)."],
    correctIndex: 2,
    explanation: "Ag2O và HgO là oxide của kim loại kém hoạt động, dễ bị nhiệt phân trực tiếp thành kim loại khi nung nóng; CaO rất bền, không bị nhiệt phân thành Ca kim loại bằng cách nung.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các phát biểu về tách kim loại: (1) Đồng có thể được tách từ copper(II) oxide bằng cách nung nóng. (2) Trong phương pháp điện phân nóng chảy aluminium oxide, có thể thu được nhôm nóng chảy ở điện cực âm của bình điện phân. (3) Kẽm có thể được tách từ zinc oxide bằng cách nung nóng zinc oxide với carbon. Các phát biểu đúng là",
    choices: ["(1) và (2).", "(1) và (3).", "(2) và (3).", "(1), (2) và (3)."],
    correctIndex: 2,
    explanation:
      "(1) sai vì CuO khá bền nhiệt, không tự phân huỷ thành Cu chỉ bằng cách nung nóng suông (cần chất khử như CO, H2). (2) đúng: tại cathode (điện cực âm) của bình điện phân nóng chảy Al2O3 thu được Al nóng chảy. (3) đúng: ZnO + C → Zn + CO là phương pháp nhiệt luyện chuẩn cho kẽm.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Để khử hoàn toàn một lượng oxide kim loại thành kim loại cần vừa đủ V lít khí H2. Hoà tan lượng kim loại tạo thành bằng H2SO4 loãng, dư thu được V lít H2 (các khí đo cùng điều kiện). Oxide kim loại đó là",
    choices: ["MgO.", "Fe2O3.", "FeO.", "CuO."],
    correctIndex: 2,
    explanation:
      "MgO không bị khử bởi H2 (Mg quá hoạt động); CuO bị khử tạo Cu nhưng Cu không phản ứng với H2SO4 loãng để sinh khí H2; Fe2O3 bị khử tạo Fe (Fe^3+ nhận 3e/Fe) nhưng khi Fe hoà tan trong acid loãng chỉ lên Fe^2+ (nhận 2e/Fe), số mol electron không cân bằng giữa hai quá trình. Chỉ FeO thoả mãn: khử FeO (Fe^2+ nhận 2e/Fe) và hoà tan Fe trong acid loãng tạo Fe^2+ (nhường 2e/Fe) — cùng 2e nên thể tích H2 hai giai đoạn bằng nhau.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho khí CO (dư) đi qua ống sứ nung nóng đựng hỗn hợp X gồm Al2O3, MgO, Fe3O4 và CuO, thu được chất rắn Y. Cho Y vào dung dịch NaOH dư, khuấy kĩ, thấy còn lại phần không tan Z. Giả sử các phản ứng xảy ra hoàn toàn. Phần không tan Z gồm",
    choices: ["MgO, Fe, Cu.", "Mg, Fe, Cu.", "MgO, Fe3O4, Cu.", "Mg, Al, Fe, Cu."],
    correctIndex: 0,
    explanation:
      "CO chỉ khử được oxide của kim loại đứng sau Al (Fe3O4, CuO), không khử được Al2O3 và MgO. Y gồm Al2O3, MgO, Fe, Cu. Al2O3 là oxide lưỡng tính, tan trong NaOH dư; MgO, Fe, Cu không tan trong NaOH nên phần Z còn lại gồm MgO, Fe, Cu.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho 14 g bột Fe vào 400 mL dung dịch X gồm AgNO3 0,5 M và Cu(NO3)2 x M. Khuấy nhẹ cho tới khi phản ứng kết thúc thu được dung dịch Y và 30,4 g chất rắn Z. Giá trị của x là",
    choices: ["0,15.", "0,125.", "0,2.", "0,1."],
    correctIndex: 1,
    explanation:
      "n(Fe)=0,25 mol; n(AgNO3)=0,2 mol. Fe phản ứng hết với Ag+ trước (dùng 0,1 mol Fe, tạo 0,2 mol Ag, 21,6 g), còn 0,15 mol Fe phản ứng tiếp với Cu^2+. Giả sử Fe dư sau khi Cu^2+ hết: khối lượng rắn Z = 21,6 + 64×0,4x + 56×(0,15−0,4x) = 30+3,2x. Với Z=30,4 g → x=0,125 (kiểm tra: 0,4×0,125=0,05 mol Cu^2+ < 0,15 mol Fe còn lại, hợp lí).",
    difficulty: "VAN_DUNG",
  },
  // Bài 21. Hợp kim
  {
    content: "Hợp kim là",
    choices: [
      "một kim loại tinh khiết.",
      "hỗn hợp các kim loại có thành phần tuỳ ý.",
      "hỗn hợp của kim loại nền với kim loại khác hoặc phi kim, có thành phần xác định.",
      "hỗn hợp hai phi kim.",
    ],
    correctIndex: 2,
    explanation: "Hợp kim là vật liệu kim loại gồm kim loại nền kết hợp với một hoặc nhiều nguyên tố khác (kim loại hoặc phi kim) theo thành phần xác định.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Đồng đỏ hay đồng thiếc là một hợp kim của",
    choices: ["đồng và nickel.", "đồng và sắt.", "đồng và thiếc.", "đồng và aluminium."],
    correctIndex: 2,
    explanation: "Đồng thiếc (bronze) là hợp kim của đồng và thiếc (Sn).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Đồng thau là một hợp kim của",
    choices: ["Đồng và thiếc.", "Đồng và nickel.", "Đồng và aluminium.", "Đồng và kẽm."],
    correctIndex: 3,
    explanation: "Đồng thau (brass) là hợp kim của đồng và kẽm.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất hay hỗn hợp chất nào sau đây KHÔNG phải là hợp kim?",
    choices: ["Thép.", "Đồng.", "Đồng thau.", "Đồng thiếc."],
    correctIndex: 1,
    explanation: "Đồng nguyên chất là một kim loại đơn chất, không phải hợp kim; thép, đồng thau, đồng thiếc đều là hợp kim.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Thêm chromium vào thép thì tính chất nào sau đây được tăng cường?",
    choices: ["Chống ăn mòn.", "Tính dẫn điện.", "Tính chất từ.", "Tính dễ kéo sợi."],
    correctIndex: 0,
    explanation: "Thêm chromium vào thép tạo thép không gỉ (inox), tăng cường khả năng chống ăn mòn.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Duralumin là hợp kim của nhôm có thành phần chính là",
    choices: ["nhôm và đồng.", "nhôm và sắt.", "nhôm và carbon.", "nhôm và thuỷ ngân."],
    correctIndex: 0,
    explanation: "Duralumin là hợp kim của nhôm với thành phần chính là đồng (cùng một lượng nhỏ Mg, Mn).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chọn phát biểu đúng nhất trong số các phát biểu sau.",
    choices: [
      "Hợp kim là hỗn hợp các kim loại.",
      "Hợp kim là hỗn hợp các phi kim.",
      "Hợp kim là hỗn hợp của một kim loại cơ bản và phi kim hoặc kim loại khác.",
      "Hợp kim là kim loại nguyên chất được chế tạo thành các vật dụng hoặc chi tiết máy có cấu trúc khác nhau.",
    ],
    correctIndex: 2,
    explanation: "Định nghĩa đúng và đầy đủ nhất: hợp kim là hỗn hợp của một kim loại cơ bản (kim loại nền) với phi kim hoặc kim loại khác.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hợp kim nào sau đây được sử dụng để làm cấu trúc thân vỏ máy bay?",
    choices: ["Duralumin.", "Đồng thau (Brass).", "Đồng thiếc (Bronze).", "Manganin."],
    correctIndex: 0,
    explanation: "Duralumin (hợp kim Al-Cu) nhẹ và bền, được dùng phổ biến làm khung, vỏ máy bay.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Thép là hợp kim của sắt và carbon, có thể chứa chromium và nickel. Tính chất của thép phụ thuộc vào hàm lượng các nguyên tố pha tạp. Loại thép nào sau đây được sử dụng để làm dụng cụ y tế?",
    choices: ["Thép có hàm lượng carbon cao.", "Thép có hàm lượng carbon thấp.", "Thép không gỉ.", "Thép silicon."],
    correctIndex: 2,
    explanation: "Thép không gỉ (chứa Cr, Ni) có khả năng chống ăn mòn cao, an toàn vệ sinh nên được dùng làm dụng cụ y tế.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đồng thau là hợp kim chứa khoảng 70% đồng và 30% kẽm. Ứng dụng nào sau đây KHÔNG phải là ứng dụng của đồng thau?",
    choices: ["Làm thiết bị dẫn điện.", "Làm dụng cụ nấu ăn.", "Làm thân vỏ máy bay.", "Làm nhạc cụ."],
    correctIndex: 2,
    explanation: "Thân vỏ máy bay cần vật liệu nhẹ (thường dùng duralumin), không phải đồng thau vốn khá nặng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nguyên nhân chủ yếu làm cho hợp kim cứng hơn các kim loại thành phần là do",
    choices: [
      "hợp kim chứa các nguyên tử của các nguyên tố khác nhau làm cho các lớp tinh thể kim loại trong hợp kim khó trượt lên nhau.",
      "hợp kim chứa các kim loại pha trộn cứng hơn kim loại cơ bản.",
      "trong hợp kim, các nguyên tố khác nhau tạo nên hợp chất hoá học.",
      "hợp kim được chế tạo ở nhiệt độ cao làm cho hợp kim cứng hơn kim loại nguyên chất.",
    ],
    correctIndex: 0,
    explanation: "Nguyên tử của nguyên tố khác (kích thước khác nhau) xen vào mạng tinh thể kim loại nền làm biến dạng mạng, cản trở các lớp nguyên tử trượt lên nhau, khiến hợp kim cứng hơn.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Khi chế tạo thép từ gang, có thể làm giảm tỉ lệ phần trăm carbon trong gang bằng cách nào sau đây?",
    choices: [
      "Sử dụng oxygen để đốt cháy carbon trong gang nóng chảy.",
      "Lọc carbon ra khỏi gang.",
      "Hoà tan carbon trong dung dịch sulfuric acid.",
      "Cạo carbon ra khỏi bề mặt kim loại.",
    ],
    correctIndex: 0,
    explanation: "Trong luyện thép từ gang, người ta thổi oxygen vào gang nóng chảy để oxi hoá bớt carbon (và tạp chất khác) thành khí thoát ra, làm giảm hàm lượng carbon.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Nhôm nguyên chất là kim loại nhẹ nhưng không được sử dụng để chế tạo thân vỏ máy bay là do",
    choices: ["nhôm kim loại giòn.", "nhôm bị ăn mòn dễ dàng.", "nhôm mềm, không phù hợp làm thân vỏ máy bay.", "nhôm dẫn điện."],
    correctIndex: 2,
    explanation: "Nhôm nguyên chất khá mềm, độ bền cơ học không đủ để làm thân vỏ máy bay, nên phải hợp kim hoá (ví dụ duralumin) mới đủ cứng và bền.",
    difficulty: "VAN_DUNG",
  },
  // Bài 22. Sự ăn mòn kim loại
  {
    content: "Hiện tượng nào sau đây KHÔNG phải là hiện tượng ăn mòn kim loại?",
    choices: ["Ống thép bị gỉ sắt màu nâu đỏ.", "Vòng bạc bị xỉn màu.", "Công trình bằng đá bị ăn mòn bởi mưa acid.", "Chuông đồng bị gỉ đồng màu xanh."],
    correctIndex: 2,
    explanation: "Đá không phải là kim loại nên hiện tượng đá bị ăn mòn bởi mưa acid không phải là ăn mòn kim loại; ba trường hợp còn lại đều là ăn mòn kim loại thực sự.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu về hiện tượng ăn mòn kim loại nào sau đây đúng?",
    choices: [
      "Khi kim loại bị ăn mòn, các đặc tính hữu ích của kim loại như tính dẻo, dễ dát mỏng, dễ kéo sợi và tính dẫn điện bị suy giảm.",
      "Khi kim loại bị ăn mòn, các đặc tính hữu ích của kim loại như tính dẻo, dễ dát mỏng, dễ kéo sợi và tính dẫn điện không bị ảnh hưởng.",
      "Khi kim loại bị ăn mòn, các đặc tính hữu ích của kim loại như tính dẻo, dễ dát mỏng, dễ kéo sợi và tính dẫn điện được tăng cường.",
      "Khi kim loại bị ăn mòn, các kim loại không phản ứng với dung dịch acid.",
    ],
    correctIndex: 0,
    explanation: "Ăn mòn phá huỷ cấu trúc tinh thể kim loại nên làm suy giảm các đặc tính hữu ích như tính dẻo, dễ dát mỏng, dễ kéo sợi và tính dẫn điện.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong hiện tượng ăn mòn kim loại xảy ra quá trình nào sau đây?",
    choices: ["Quá trình oxi hoá kim loại.", "Quá trình khử kim loại.", "Quá trình điện phân.", "Sự mài mòn kim loại."],
    correctIndex: 0,
    explanation: "Ăn mòn kim loại là quá trình kim loại bị oxi hoá (nhường electron) thành ion kim loại.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trường hợp nào sau đây kim loại bị ăn mòn điện hoá học?",
    choices: ["Đốt dây sắt trong khí oxygen khô.", "Thép carbon để trong không khí ẩm.", "Kim loại kẽm trong dung dịch HCl.", "Kim loại sắt trong dung dịch HNO3 loãng."],
    correctIndex: 1,
    explanation: "Thép carbon (hợp kim Fe-C) tiếp xúc với không khí ẩm (dung dịch điện li yếu từ hơi ẩm và CO2) tạo pin điện hoá vi mô giữa Fe và C, gây ăn mòn điện hoá; các trường hợp còn lại chỉ là ăn mòn hoá học đơn thuần.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Đinh sắt bị ăn mòn nhanh khi gắn với kim loại nào sau đây?",
    choices: ["Magnesium.", "Nhôm.", "Kẽm.", "Đồng."],
    correctIndex: 3,
    explanation: "Đồng kém hoạt động hơn Fe; khi ghép với Cu, Fe trở thành cực âm (anode) trong pin điện hoá và bị ăn mòn nhanh hơn. Mg, Al, Zn đều hoạt động hơn Fe nên nếu ghép với các kim loại này, chúng sẽ là anode hi sinh, bảo vệ Fe.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi một vật bằng sắt tây (sắt tráng thiếc) bị xây xát sâu tới lớp sắt bên trong để lâu trong không khí ẩm sẽ xảy ra quá trình nào sau đây?",
    choices: ["Sn bị ăn mòn điện hoá.", "Fe bị ăn mòn điện hoá.", "Fe bị ăn mòn hoá học.", "Sn bị ăn mòn hoá học."],
    correctIndex: 1,
    explanation: "Sn kém hoạt động hơn Fe; khi lớp Sn bị xước lộ Fe ra, Fe đóng vai trò cực âm (anode) trong pin điện hoá vi mô, bị ăn mòn điện hoá nhanh chóng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Để bảo vệ vỏ tàu biển làm bằng thép người ta thường gắn vào vỏ tàu (phần ngâm dưới nước) những tấm kim loại nào sau đây?",
    choices: ["Sn.", "Pb.", "Zn.", "Cu."],
    correctIndex: 2,
    explanation: "Zn hoạt động hơn Fe, đóng vai trò điện cực hi sinh (anode), bảo vệ vỏ tàu bằng thép khỏi bị ăn mòn — đây là phương pháp bảo vệ điện hoá phổ biến nhất.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phương pháp nào sau đây KHÔNG dùng để bảo vệ vật làm sắt thép khỏi bị ăn mòn?",
    choices: ["Gắn thêm kẽm.", "Gắn thêm magnesium.", "Gắn thêm chì.", "Phủ sơn hoặc dầu mỡ."],
    correctIndex: 2,
    explanation: "Chì kém hoạt động hơn Fe; nếu gắn Pb vào Fe, chính Fe sẽ trở thành anode bị ăn mòn nhanh hơn thay vì được bảo vệ. Zn, Mg đều hoạt động hơn Fe nên bảo vệ được Fe; phủ sơn/dầu mỡ cách li vật lý cũng có tác dụng bảo vệ.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Điều kiện nào sau đây là điều kiện cần thiết để xảy ra hiện tượng gỉ sắt?",
    choices: ["Môi trường có oxygen và nước.", "Môi trường có oxygen và nhiệt độ cao.", "Môi trường có nước và nhiệt độ cao.", "Môi trường có oxygen, nước và nhiệt độ cao."],
    correctIndex: 0,
    explanation: "Gỉ sắt cần đồng thời có oxygen và nước (độ ẩm); nhiệt độ cao không phải điều kiện bắt buộc, chỉ làm tăng tốc độ ăn mòn.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Trong những ống nghiệm nào sau đây, đinh sắt sẽ bị gỉ sau vài ngày: a) không khí và nước; b) nước, không có không khí (có lớp dầu hoả phủ trên); c) không khí khô, không có nước (có calcium chloride hút ẩm)?",
    choices: ["chỉ có ống nghiệm a).", "chỉ có ống nghiệm b).", "ống nghiệm a) và c).", "ống nghiệm b) và c)."],
    correctIndex: 0,
    explanation: "Chỉ ống a) có đủ cả nước và oxygen (không khí) đồng thời nên đinh sắt gỉ; ống b) có nước nhưng bị dầu hoả cách li không khí; ống c) có không khí nhưng khô, không có nước — cả hai đều thiếu một điều kiện cần thiết.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các trường hợp sau: (1) Bọc đinh sắt bằng dây đồng; (2) Bọc đinh sắt bằng dây kẽm; (3) Nhúng đinh sắt vào dung dịch acid. Trường hợp đinh sắt bị rỉ nhanh hơn là",
    choices: ["(1) và (2).", "(1) và (3).", "(2) và (3).", "(1), (2) và (3)."],
    correctIndex: 1,
    explanation:
      "(1) Cu kém hoạt động hơn Fe nên Fe là anode, bị ăn mòn nhanh hơn bình thường. (2) Zn hoạt động hơn Fe nên Zn là anode hi sinh, Fe được bảo vệ (không rỉ nhanh hơn). (3) Acid ăn mòn hoá học trực tiếp Fe, chắc chắn làm Fe bị ăn mòn nhanh hơn. Vậy (1) và (3) làm đinh sắt rỉ nhanh hơn.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Lần lượt nối thanh Zn với mỗi kim loại sau đây và cho vào dung dịch HCl. Quá trình ăn mòn thanh Zn xảy ra nhanh nhất khi nối với",
    choices: ["Mg.", "Pb.", "Ag.", "Cu."],
    correctIndex: 2,
    explanation: "Ag là kim loại kém hoạt động nhất trong 4 lựa chọn; chênh lệch hoạt động hoá học giữa Zn và Ag lớn nhất nên pin điện hoá Zn-Ag có sức điện động lớn nhất, làm Zn bị ăn mòn nhanh nhất.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho một thanh Fe tiếp xúc với một thanh Cu, sau đó nhúng vào dung dịch HCl, hiện tượng sẽ quan sát được là",
    choices: [
      "thanh Fe tan và bọt khí chỉ thoát ra từ thanh Cu.",
      "cả 2 thanh tan đồng thời và khí thoát ra từ 2 thanh.",
      "thanh Fe tan trước và bọt khí thoát ra trên thanh Fe.",
      "thanh Fe tan và bọt khí thoát ra từ cả thanh Fe và thanh Cu.",
    ],
    correctIndex: 0,
    explanation: "Fe là anode, bị oxi hoá tan ra; Cu là cathode, nơi H+ bị khử thành khí H2 — đặc trưng của ăn mòn điện hoá là quá trình oxi hoá và khử xảy ra tách biệt ở hai điện cực.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các cặp kim loại nguyên chất tiếp xúc trực tiếp với nhau: Fe và Pb; Fe và Zn; Fe và Sn; Fe và Ni. Khi nhúng các cặp kim loại trên vào dung dịch acid, số cặp kim loại trong đó Fe bị phá huỷ trước là",
    choices: ["1.", "3.", "2.", "4."],
    correctIndex: 1,
    explanation:
      "Fe hoạt động hơn Pb, Sn, Ni (đứng trước trong dãy điện hoá) nên khi ghép với các kim loại này, Fe là anode, bị phá huỷ trước — có 3 cặp (Fe-Pb, Fe-Sn, Fe-Ni). Riêng Zn hoạt động hơn Fe nên khi ghép Fe-Zn, chính Zn mới là anode bị phá huỷ trước, Fe được bảo vệ.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho một số phương pháp bảo vệ kim loại khỏi bị ăn mòn: (1) Cách li kim loại với môi trường xung quanh; (2) Dùng hợp kim chống gỉ; (3) Dùng chất kìm hãm; (4) Ngâm kim loại trong H2O; (5) Dùng phương pháp điện hoá. Các phương pháp đúng là",
    choices: ["(1), (3), (4), (5).", "(1), (2), (3), (4).", "(2), (3), (4), (5).", "(1), (2), (3), (5)."],
    correctIndex: 3,
    explanation: "Ngâm kim loại trong nước (4) không phải là phương pháp bảo vệ — nước (cùng oxygen hoà tan) chính là một tác nhân gây ăn mòn, không phải biện pháp chống ăn mòn.",
    difficulty: "THONG_HIEU",
  },
  // Bài 23. Ôn tập chương VI
  {
    content:
      "Phát biểu nào sau đây về đặc điểm của nguyên tử kim loại đúng? Trong cùng một chu kì, so với các nguyên tử nguyên tố phi kim thì",
    choices: [
      "nguyên tử kim loại có điện tích hạt nhân nhỏ hơn và bán kính lớn hơn nên dễ nhường electron hoá trị hơn.",
      "nguyên tử kim loại có điện tích hạt nhân lớn hơn và bán kính lớn hơn nên dễ nhường electron hoá trị hơn.",
      "nguyên tử kim loại có điện tích hạt nhân nhỏ hơn và bán kính nhỏ hơn nên dễ nhường electron hoá trị hơn.",
      "nguyên tử kim loại có điện tích hạt nhân nhỏ hơn và bán kính lớn hơn nên khó nhường electron hoá trị hơn.",
    ],
    correctIndex: 0,
    explanation: "Kim loại thường ở đầu chu kì (điện tích hạt nhân nhỏ hơn, bán kính nguyên tử lớn hơn phi kim ở cuối chu kì) nên electron hoá trị bị hút yếu hơn, dễ nhường hơn.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong bảng tuần hoàn, các nguyên tố",
    choices: ["khối s, d, f thường là phi kim.", "khối s, d, f thường là kim loại.", "khối s, p thường là kim loại.", "khối s, p thường là phi kim."],
    correctIndex: 1,
    explanation: "Các nguyên tố khối s (trừ H, He), d và f hầu hết là kim loại; khối p có cả kim loại lẫn phi kim nên không thể khái quát là \"thường là kim loại\" hay \"thường là phi kim\".",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại dẫn điện tốt, thường dùng làm lõi dây điện là",
    choices: ["bạc.", "vàng.", "đồng.", "sắt."],
    correctIndex: 2,
    explanation: "Đồng dẫn điện tốt (chỉ kém bạc) nhưng có giá thành hợp lý hơn nhiều, nên được dùng phổ biến làm lõi dây điện.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Gang là vật liệu kim loại có thành phần chính là",
    choices: ["nhôm và magnesium.", "sắt và carbon.", "đồng và kẽm.", "đồng và thiếc."],
    correctIndex: 1,
    explanation: "Gang là hợp kim của sắt với carbon (hàm lượng carbon cao hơn thép).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Duralumin là vật liệu kim loại chứa nguyên tố kim loại cơ bản nào sau đây?",
    choices: ["Nhôm.", "Kẽm.", "Sắt.", "Nickel."],
    correctIndex: 0,
    explanation: "Duralumin là hợp kim có nền là nhôm (Al), pha thêm đồng và một lượng nhỏ Mg, Mn.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Au, Ag có thể tồn tại được ở dạng đơn chất trong tự nhiên vì chúng là kim loại",
    choices: ["hoạt động hoá học mạnh.", "hoạt động hoá học trung bình.", "có khối lượng riêng lớn.", "rất kém hoạt động hoá học."],
    correctIndex: 3,
    explanation: "Au, Ag rất kém hoạt động hoá học (kim loại quý, trơ) nên không dễ bị oxi hoá thành hợp chất, tồn tại được ở dạng đơn chất trong tự nhiên.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại có khả năng dẫn điện vì",
    choices: [
      "chúng có cấu tạo tinh thể.",
      "trong tinh thể kim loại, các electron liên kết yếu với hạt nhân, chuyển động tự do trong toàn bộ mạng tinh thể.",
      "trong mạng tinh thể kim loại, các anion chuyển động tự do.",
      "trong mạng tinh thể kim loại có các cation kim loại.",
    ],
    correctIndex: 1,
    explanation: "Các electron hoá trị liên kết yếu với hạt nhân, tách ra và chuyển động tự do trong toàn mạng tinh thể, tạo dòng electron khi có điện trường — đây là nguyên nhân kim loại dẫn điện.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu nào sau đây KHÔNG đúng? Tính dẻo của kim loại là do",
    choices: [
      "kim loại ở trạng thái rắn có cấu trúc tinh thể.",
      "sự trượt của các lớp nguyên tử trong mạng tinh thể kim loại.",
      "các electron tự do luôn chuyển động và giữ các nguyên tử kim loại liên kết với nhau.",
      "kim loại ở trạng thái rắn không có cấu trúc tinh thể.",
    ],
    correctIndex: 3,
    explanation: "Kim loại ở trạng thái rắn LUÔN có cấu trúc tinh thể; đây chính là phát biểu sai cần chọn.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dãy kim loại nào sau đây có phản ứng với dung dịch sulfuric acid đặc, nóng tạo thành khí sulfur dioxide?",
    choices: ["Na, K, Au.", "Al, Fe, Cu.", "Ag, Au, Pt.", "Cu, Ag, Au."],
    correctIndex: 1,
    explanation: "Al, Fe, Cu đều phản ứng được với H2SO4 đặc nóng tạo khí SO2; các dãy còn lại đều chứa Au hoặc Pt — những kim loại rất trơ, không phản ứng với acid đặc nóng thông thường.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy kim loại nào sau đây KHÔNG đẩy đồng ra khỏi dung dịch copper(II) sulfate?",
    choices: ["Na, K, Ag.", "Al, Fe, Mg.", "Al, Zn, Pb.", "Mg, Zn, Fe."],
    correctIndex: 0,
    explanation: "Na, K phản ứng với nước trước (không trực tiếp đẩy Cu); Ag kém hoạt động hơn Cu nên không đẩy được Cu ra khỏi muối của nó. Các dãy còn lại đều là kim loại hoạt động hơn Cu, đẩy được Cu bình thường.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong công nghiệp, kim loại natri thường được điều chế bằng phương pháp nào sau đây?",
    choices: ["Điện phân nóng chảy.", "Điện phân dung dịch.", "Nhiệt luyện.", "Thuỷ luyện."],
    correctIndex: 0,
    explanation: "Na là kim loại hoạt động rất mạnh, được điều chế trong công nghiệp bằng điện phân nóng chảy NaCl.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ngâm các mẫu sau vào dung dịch acid rồi để ngoài không khí, mẫu nào KHÔNG xảy ra ăn mòn điện hoá?",
    choices: ["Miếng gang.", "Lá đồng.", "Miếng tôn.", "Đinh sắt."],
    correctIndex: 1,
    explanation: "Lá đồng là kim loại đơn chất, không có hai thành phần dẫn điện khác nhau tiếp xúc nên không hình thành pin điện hoá; miếng gang (Fe-C), miếng tôn (Fe-Zn) và đinh sắt (thường lẫn tạp chất) đều có thể tạo pin điện hoá vi mô.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Để bảo vệ khung xe đạp khỏi bị ăn mòn có thể dùng cách nào sau đây?",
    choices: ["Ngâm trong dung dịch acid.", "Bọc dây đồng quanh khung xe.", "Phủ kín bề mặt bằng lớp sơn.", "Để trong không khí ẩm."],
    correctIndex: 2,
    explanation: "Phủ sơn cách li kim loại khỏi môi trường, ngăn ăn mòn; ngâm acid và để trong không khí ẩm đều làm tăng ăn mòn; bọc dây đồng (kém hoạt động hơn Fe) sẽ khiến khung xe bị ăn mòn nhanh hơn thay vì được bảo vệ.",
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
        source: "SBT Hóa 12 - Kết nối tri thức (Chương 6 - Đại cương về kim loại)",
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
