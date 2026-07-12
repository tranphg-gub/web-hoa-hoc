import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AF: bài tập mining từ SBT Hóa 12 - Kết nối tri thức thật (Tài liệu/Lớp 12/Hóa 12 theo
// chuyên đề/KL chuyển tiếp_Phức chất.zip -> "(TỜ SÁCH BT-KNTTT) Chương VIII - BT Hoá 12 -
// KNTT.pdf", đọc bằng pdftoppm + thị giác vì PDF lỗi text layer). Chỉ lấy câu SINGLE_CHOICE
// (NHẬN BIẾT/THÔNG HIỂU/VẬN DỤNG) — bỏ qua các câu Đúng/Sai nhóm, câu tự luận/tính toán không
// có đáp án trắc nghiệm, câu 27.42 (thiếu dữ kiện nồng độ ban đầu để giải), và câu 29.1/29.2
// (màu sắc phức chất Cu2+ giữa các nguồn không thống nhất đủ để khẳng định chắc chắn) vì
// PracticeQuestion chỉ hỗ trợ trắc nghiệm 1 đáp án và mọi đáp án phải kiểm chứng được. File
// SBT không in đáp án ở các trang đã đọc — mọi đáp án dưới đây tự giải bằng kiến thức hóa học
// (cấu hình electron kim loại chuyển tiếp, số oxi hoá, phức chất) và kiểm chứng lại trước khi
// đưa vào. Ion điện tích ≥2 dùng cú pháp "Fe^2+" (dấu ^) để hiển thị đúng dạng số mũ (bài học
// từ Chương 5).
const CHAPTER_ID = "cmrelkfnv000dvhuszgu3hjbi"; // Lớp 12 - Chương 8. Kim loại chuyển tiếp và phức chất

const QUESTIONS = [
  // Bài 27. Đại cương về kim loại chuyển tiếp dãy thứ nhất
  {
    content: "Kim loại nào sau đây thuộc dãy kim loại chuyển tiếp thứ nhất?",
    choices: ["Ti.", "Al.", "Ba.", "Na."],
    correctIndex: 0,
    explanation: "Ti là kim loại chuyển tiếp dãy thứ nhất (khối d, chu kì 4); Al thuộc nhóm IIIA, Ba nhóm IIA, Na nhóm IA — đều không phải kim loại chuyển tiếp.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kim loại được mạ lên sắt để bảo vệ sắt và dùng để chế tạo thép không gỉ (dùng làm thìa, dao, dụng cụ y tế,...) là",
    choices: ["Na.", "Mg.", "Cr.", "Ca."],
    correctIndex: 2,
    explanation: "Chromium được mạ lên bề mặt kim loại để chống ăn mòn và là thành phần chính tạo thép không gỉ (inox).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nguyên tử manganese có số oxi hoá +4 trong hợp chất nào sau đây?",
    choices: ["KMnO4.", "K2MnO4.", "MnO2.", "MnSO4."],
    correctIndex: 2,
    explanation: "Trong MnO2: O có số oxi hoá −2, tổng bằng 0 nên Mn có số oxi hoá +4.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong hợp chất K2Cr2O7, số oxi hoá của nguyên tử Cr là",
    choices: ["+6.", "+3.", "+2.", "0."],
    correctIndex: 0,
    explanation: "2×(+1) + 2×x + 7×(−2) = 0 → 2x = 12 → x = +6.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Sắt được sử dụng để sản xuất nam châm trong các máy phát điện và nhiều thiết bị điện (loa, chuông, ti vi, máy tính, điện thoại,...) dựa trên tính chất nào sau đây?",
    choices: ["Tính dẫn điện.", "Tính dẫn nhiệt.", "Tính dẻo.", "Tính nhiễm từ."],
    correctIndex: 3,
    explanation: "Sắt có tính nhiễm từ (từ tính) mạnh, được dùng làm lõi nam châm trong các thiết bị điện.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Đồng kim loại được sử dụng để chế tạo dây dẫn điện, thiết bị điện,... dựa trên tính chất vật lí đặc trưng nào sau đây?",
    choices: ["Dẫn điện tốt.", "Tính dẻo.", "Dẫn nhiệt tốt.", "Ánh kim."],
    correctIndex: 0,
    explanation: "Đồng dẫn điện rất tốt (chỉ kém bạc), nên được dùng phổ biến làm dây dẫn điện.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở trạng thái cơ bản, cấu hình electron của nguyên tử nào sau đây có phân lớp 3d bão hoà?",
    choices: ["Sc (Z = 21).", "Cu (Z = 29).", "Ni (Z = 28).", "Mn (Z = 25)."],
    correctIndex: 1,
    explanation: "Cu có cấu hình [Ar]3d10 4s1, phân lớp 3d có đủ 10 electron (bão hoà); Sc có 3d1, Ni có 3d8, Mn có 3d5 — đều chưa bão hoà.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nguyên tố nào sau đây KHÔNG thể hiện xu hướng có nhiều số oxi hoá trong hợp chất?",
    choices: ["Cr.", "Mn.", "Fe.", "Mg."],
    correctIndex: 3,
    explanation: "Mg (kim loại nhóm IIA) chỉ có một số oxi hoá +2 duy nhất; Cr, Mn, Fe là kim loại chuyển tiếp có nhiều số oxi hoá khác nhau.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nguyên tố kim loại có trong hemoglobin làm nhiệm vụ vận chuyển oxygen, duy trì sự sống là",
    choices: ["sodium.", "magnesium.", "nhôm.", "sắt."],
    correctIndex: 3,
    explanation: "Sắt (Fe) là nguyên tử trung tâm trong hemoglobin, đảm nhiệm chức năng vận chuyển oxygen.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong dãy kim loại chuyển tiếp thứ nhất, kim loại có độ cứng cao nhất là",
    choices: ["Ti.", "Fe.", "Cr.", "Cu."],
    correctIndex: 2,
    explanation: "Cr có độ cứng cao nhất trong dãy kim loại chuyển tiếp thứ nhất.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong dãy kim loại chuyển tiếp thứ nhất, hai kim loại nào sau đây đều là kim loại nhẹ (D < 5 g/cm3)?",
    choices: ["Cr, Mn.", "Fe, Co.", "Sc, Ti.", "Ni, Cu."],
    correctIndex: 2,
    explanation: "Sc (~2,99 g/cm3) và Ti (~4,5 g/cm3) đều có khối lượng riêng dưới 5 g/cm3; Cr, Mn, Fe, Co, Ni, Cu đều có khối lượng riêng trên 7 g/cm3.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cấu hình electron của nguyên tử vanadium ở trạng thái cơ bản là [Ar]3d34s2. Trong bảng tuần hoàn, nguyên tố vanadium thuộc nhóm",
    choices: ["VB.", "IB.", "VIB.", "IIB."],
    correctIndex: 0,
    explanation: "Vanadium có 5 electron hoá trị (3d3 4s2 = 3+2 = 5) thuộc khối d nên ở nhóm VB.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Muối nào sau đây có khả năng làm mất màu thuốc tím trong môi trường sulfuric acid loãng?",
    choices: ["Na2SO4.", "FeSO4.", "MgSO4.", "Fe2(SO4)3."],
    correctIndex: 1,
    explanation: "FeSO4 chứa Fe^2+ có tính khử, phản ứng khử KMnO4 (thuốc tím, chất oxi hoá mạnh) làm mất màu tím; Na2SO4, MgSO4 không có tính khử; Fe2(SO4)3 chứa Fe^3+ đã ở mức oxi hoá cao, không khử được KMnO4.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Từ cấu hình electron của nguyên tử Cu ở trạng thái cơ bản là [Ar]3d104s1, xác định được cấu hình electron của ion Cu^2+ là",
    choices: ["[Ar]3d9.", "[Ar]3d84s1.", "[Ar]3d10.", "[Ar]3d8."],
    correctIndex: 0,
    explanation: "Khi tạo ion, kim loại chuyển tiếp mất electron 4s trước rồi mới đến 3d: Cu mất 1e ở 4s1 (còn 3d10) rồi mất thêm 1e ở 3d (còn 3d9) để tạo Cu^2+, cho cấu hình [Ar]3d9.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong dãy kim loại chuyển tiếp thứ nhất, kim loại có tính dẫn điện tốt nhất là",
    choices: ["Fe.", "Ti.", "Cu.", "Mn."],
    correctIndex: 2,
    explanation: "Cu dẫn điện tốt nhất trong dãy kim loại chuyển tiếp thứ nhất.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Nguyên tử Cr có cấu hình electron ở trạng thái cơ bản là [Ar]3d54s1. Trong phản ứng hoá học, khi nguyên tử Cr nhường đi 3 electron để tạo thành ion Cr^3+, số electron còn lại trên phân lớp 3d là",
    choices: ["5.", "4.", "3.", "2."],
    correctIndex: 2,
    explanation: "Cr mất 1 electron ở 4s1 trước, rồi mất thêm 2 electron ở 3d5 (còn 3d3) để đủ nhường 3 electron tạo Cr^3+, nên phân lớp 3d còn lại 3 electron.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nguyên tố nào sau đây được mệnh danh là \"nguyên tố của màu sắc\" do có khả năng thể hiện màu sắc phong phú?",
    choices: ["Sắt.", "Đồng.", "Nickel.", "Chromium."],
    correctIndex: 3,
    explanation: "Chromium tạo nhiều hợp chất với màu sắc đa dạng (Cr2O3 xanh lá, CrO3 đỏ, Cr2O7^2- cam, CrO4^2- vàng, Cr^3+ tím,...) nên được gọi là \"nguyên tố của màu sắc\".",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dung dịch nào sau đây có màu vàng chanh?",
    choices: ["CuSO4.", "FeCl3.", "KMnO4.", "FeSO4."],
    correctIndex: 1,
    explanation: "Dung dịch FeCl3 có màu vàng nâu/vàng chanh đặc trưng của Fe^3+; CuSO4 màu xanh lam, KMnO4 màu tím, FeSO4 màu xanh lục nhạt.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dãy kim loại nào sau đây sắp xếp theo thứ tự tăng dần nhiệt độ nóng chảy?",
    choices: ["Na, Fe, Mg.", "Na, Mg, Fe.", "Fe, Mg, Na.", "Mg, Fe, Na."],
    correctIndex: 1,
    explanation: "Nhiệt độ nóng chảy: Na (~98°C) < Mg (~650°C) < Fe (~1538°C).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Sự hình thành các nguyên tố chuyển tiếp dãy thứ nhất là do có sự sắp xếp lần lượt các electron vào phân lớp",
    choices: ["3d.", "4s.", "4p.", "3p."],
    correctIndex: 0,
    explanation: "Dãy kim loại chuyển tiếp thứ nhất ứng với việc electron điền dần vào phân lớp 3d.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ion nào sau đây không có electron trên phân lớp 3d và không có màu trong dung dịch nước?",
    choices: ["Fe^3+.", "Cr^3+.", "Ti^3+.", "Sc^3+."],
    correctIndex: 3,
    explanation: "Sc ([Ar]3d14s2) mất 3 electron (2 ở 4s, 1 ở 3d) tạo Sc^3+ có cấu hình [Ar], không còn electron 3d nào nên không màu; Fe^3+ (3d5), Cr^3+ (3d3), Ti^3+ (3d1) đều còn electron 3d và có màu.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Oxide nào sau đây có màu trắng?",
    choices: ["Fe2O3.", "Cr2O3.", "Al2O3.", "CuO."],
    correctIndex: 2,
    explanation: "Al2O3 có màu trắng vì Al^3+ không có electron d; Fe2O3 màu nâu đỏ, Cr2O3 màu xanh lá, CuO màu đen.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ion nào sau đây vừa có khả năng thể hiện tính khử, vừa có khả năng thể hiện tính oxi hoá?",
    choices: ["Cr^3+.", "CrO4^2-.", "AlO2-.", "Sc^3+."],
    correctIndex: 0,
    explanation: "Cr^3+ ở mức oxi hoá trung gian (+3) của Cr nên có thể bị oxi hoá lên Cr(+6) (thể hiện tính khử) hoặc bị khử xuống mức thấp hơn (thể hiện tính oxi hoá); CrO4^2- đã ở mức oxi hoá cao nhất (+6) chỉ có tính oxi hoá; AlO2-, Sc^3+ chỉ có một mức oxi hoá ổn định.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhỏ vài giọt dung dịch NaOH vào dung dịch FeCl3, thu được kết tủa có màu",
    choices: ["keo trắng.", "nâu đỏ.", "xanh lam.", "tím đen."],
    correctIndex: 1,
    explanation: "Fe(OH)3 kết tủa có màu nâu đỏ.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong dung dịch muối sulfate, ion kim loại nào sau đây có màu xanh?",
    choices: ["Mn^2+.", "Fe^3+.", "Ti^3+.", "Cu^2+."],
    correctIndex: 3,
    explanation: "Cu^2+ trong dung dịch có màu xanh lam đặc trưng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Sắt là kim loại phổ biến thứ hai (sau nhôm) trên vỏ Trái Đất do nguyên tử sắt thuộc loại nguyên tử bền. Số neutron có trong một nguyên tử sắt 56/26 Fe là",
    choices: ["30.", "26.", "56.", "28."],
    correctIndex: 0,
    explanation: "Số neutron = số khối − số proton = 56 − 26 = 30.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Kim loại nào sau đây thể hiện hai hoá trị khi tác dụng với dung dịch HCl và khí Cl2 (t°)?",
    choices: ["Nhôm.", "Sắt.", "Đồng.", "Magnesium."],
    correctIndex: 1,
    explanation: "Fe + HCl → FeCl2 (hoá trị II); 2Fe + 3Cl2 → 2FeCl3 (hoá trị III) — Fe thể hiện hai hoá trị khác nhau tuỳ chất phản ứng; Al, Mg chỉ có một hoá trị cố định, Cu không phản ứng với HCl loãng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hợp chất iron(III) có khả năng thể hiện tính oxi hoá khi tác dụng với chất khử. Quá trình khử ion Fe^3+ được biểu diễn là",
    choices: ["Fe^3+ + 1e → Fe^2+.", "Fe^2+ → Fe^3+ + 1e.", "Fe^2+ + 2e → Fe.", "Fe → Fe^2+ + 2e."],
    correctIndex: 0,
    explanation: "Quá trình khử là quá trình nhận electron: Fe^3+ + 1e → Fe^2+.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong không khí ẩm, gang và thép bị ăn mòn điện hoá. Trong quá trình ăn mòn, sắt bị oxi hoá ở anode tạo thành ion Fe^2+ theo quá trình",
    choices: ["Fe^2+ + 2e → Fe.", "Fe → Fe^2+ + 2e.", "Fe^3+ + 1e → Fe^2+.", "Fe^2+ → Fe^3+ + 1e."],
    correctIndex: 1,
    explanation: "Quá trình oxi hoá là quá trình nhường electron: Fe → Fe^2+ + 2e.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Muối nào sau đây vừa có khả năng thể hiện tính oxi hoá (trong môi trường acid), vừa có khả năng thể hiện tính khử (trong môi trường kiềm)?",
    choices: ["K2Cr2O7.", "Cr2(SO4)3.", "K2CrO4.", "Na2CrO4."],
    correctIndex: 1,
    explanation:
      "Cr2(SO4)3 chứa Cr^3+ ở mức oxi hoá trung gian: trong môi trường kiềm, Cr^3+ dễ bị oxi hoá lên Cr(+6) (CrO4^2-) nên thể hiện tính khử; K2Cr2O7, K2CrO4, Na2CrO4 đều chứa Cr ở mức oxi hoá cao nhất (+6), chỉ có thể thể hiện tính oxi hoá, không thể bị oxi hoá thêm.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi so sánh kim loại Fe với Ca, nhận định nào sau đây KHÔNG đúng?",
    choices: ["Có khối lượng riêng lớn hơn.", "Có độ cứng cao hơn.", "Có tính khử mạnh hơn.", "Có nhiệt độ nóng chảy cao hơn."],
    correctIndex: 2,
    explanation: "Fe là kim loại chuyển tiếp có tính khử YẾU hơn Ca (kim loại kiềm thổ mạnh, đứng trước Fe trong dãy điện hoá) — đây là phát biểu sai; Fe có khối lượng riêng, độ cứng và nhiệt độ nóng chảy đều cao hơn Ca.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi so sánh nguyên tử Ti với K, nhận định nào sau đây KHÔNG đúng?",
    choices: ["Có bán kính lớn hơn.", "Có số electron hoá trị nhiều hơn.", "Có số electron độc thân nhiều hơn.", "Có độ âm điện lớn hơn."],
    correctIndex: 0,
    explanation: "Ti có bán kính nguyên tử NHỎ hơn K (không phải lớn hơn) vì Ti là kim loại chuyển tiếp có điện tích hạt nhân hiệu dụng lớn hơn nhiều so với kim loại kiềm K.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong dãy nguyên tử Sc (Z = 21), Ti (Z = 22), V (Z = 23), Cr (Z = 24), bán kính nguyên tử biến đổi như thế nào?",
    choices: ["Tăng dần.", "Không đổi.", "Giảm dần.", "Không có quy luật."],
    correctIndex: 2,
    explanation: "Trong cùng chu kì, từ trái sang phải điện tích hạt nhân tăng dần trong khi electron vẫn ở cùng lớp ngoài, làm bán kính nguyên tử giảm dần.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Các hợp chất ứng với số oxi hoá cao nhất của Cr có tính oxi hoá mạnh. Giá trị thế điện cực chuẩn nào sau đây thuộc về cặp Cr2O7^2-/Cr^3+?",
    choices: ["–0,44 V.", "–2,93 V.", "0 V.", "+1,36 V."],
    correctIndex: 3,
    explanation: "Cặp Cr2O7^2-/Cr^3+ trong môi trường acid có thế điện cực chuẩn dương lớn (khoảng +1,33 đến +1,36 V), thể hiện tính oxi hoá mạnh.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Trong dung dịch K2Cr2O7 tồn tại cân bằng: Cr2O7^2- (da cam) + H2O ⇌ 2CrO4^2- (vàng) + 2H+. Cho vài giọt dung dịch chất X vào dung dịch K2Cr2O7 thì dung dịch chuyển dần từ màu da cam sang màu vàng. Chất phù hợp với X là",
    choices: ["K2SO4.", "H2SO4.", "KCl.", "KOH."],
    correctIndex: 3,
    explanation:
      "Theo nguyên lí Le Chatelier, thêm KOH (base) trung hoà bớt H+ sinh ra, làm cân bằng chuyển dịch theo chiều thuận (tạo thêm CrO4^2- màu vàng) để bù lại lượng H+ đã mất; H2SO4 sẽ làm ngược lại; K2SO4, KCl trung tính không ảnh hưởng cân bằng.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Dung dịch FeCl3 có môi trường acid do sự thuỷ phân của ion Fe^3+ theo phản ứng đơn giản hoá: Fe^3+(aq) + H2O(l) ⇌ [Fe(OH)]^2+(aq) + H+(aq), Ka = 10^-2,19. Giá trị pH của dung dịch FeCl3 0,1 M là",
    choices: ["2,19.", "1,66.", "0,22.", "1,22."],
    correctIndex: 1,
    explanation:
      "Đặt x=[H+]=[FeOH^2+]. Ka=x²/(0,1−x)=10^-2,19≈0,00646. Giải phương trình bậc hai được x≈0,0224 M, suy ra pH=−log(0,0224)≈1,65, gần nhất với 1,66.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Khi làm lạnh dung dịch FeCl3 thu được tinh thể FeCl3·6H2O. Cho độ tan của FeCl3·6H2O trong nước ở một số nhiệt độ như sau: 0°C: 74,4; 20°C: 91,8; 30°C: 106,8 (g/100 g nước). Dung dịch bão hoà của FeCl3 ở 0°C có nồng độ phần trăm là",
    choices: ["22,2%.", "17,4%.", "18,2%.", "25,6%."],
    correctIndex: 3,
    explanation:
      "Trong 174,4 g dung dịch bão hoà (100 g nước + 74,4 g FeCl3·6H2O), khối lượng FeCl3 nguyên chất = 74,4 × (162,2/270,2) ≈ 44,66 g (do phân tử khối FeCl3=162,2 và FeCl3·6H2O=270,2). C% = 44,66/174,4 × 100% ≈ 25,6%.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Thuốc tím dễ bị phân huỷ khi bảo quản nên trước khi sử dụng thuốc tím pha sẵn cần xác định lại nồng độ bằng cách chuẩn độ với dung dịch H2C2O4. Bước 1: Cân chính xác lượng oxalic acid ngậm nước (H2C2O4·2H2O, M=126,07) để pha chế được 100 mL dung dịch H2C2O4 có nồng độ chuẩn 0,05 M. Bước 2: Dùng pipette hút 5,00 mL dung dịch H2C2O4 vừa pha chế cho vào bình tam giác. Chuyển dung dịch KMnO4 nồng độ a×10^-2 mol/L vào burette rồi tiến hành chuẩn độ đến khi dung dịch trong bình tam giác có màu hồng nhạt bền khoảng 10 giây thì vừa hết 5,10 mL. Giá trị của a là",
    choices: ["2,04.", "1,84.", "2,12.", "1,96."],
    correctIndex: 3,
    explanation:
      "n(H2C2O4) = 0,05×0,005 = 2,5×10^-4 mol. Theo tỉ lệ 2KMnO4:5H2C2O4, n(KMnO4) = (2/5)×2,5×10^-4 = 1×10^-4 mol. Nồng độ KMnO4 = 1×10^-4/0,00510 ≈ 1,96×10^-2 mol/L, vậy a ≈ 1,96.",
    difficulty: "VAN_DUNG",
  },
  // Bài 28. Sơ lược về phức chất
  {
    content: "Phối tử trong phức chất [PtCl4]2- và [Fe(CO)5] lần lượt là",
    choices: ["Cl và C.", "Pt và Fe.", "Cl- và CO.", "Cl và CO."],
    correctIndex: 3,
    explanation: "Phối tử trong [PtCl4]2- là Cl (chloride); phối tử trong [Fe(CO)5] là CO (carbonyl).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Số lượng phối tử có trong mỗi phức chất [PtCl4]2-, [Fe(CO)5] lần lượt là",
    choices: ["4 và 5.", "5 và 6.", "2 và 5.", "1 và 2."],
    correctIndex: 0,
    explanation: "[PtCl4]2- có 4 phối tử Cl; [Fe(CO)5] có 5 phối tử CO.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nguyên tử trung tâm của phức chất [PtCl4]2- và [Fe(CO)5] lần lượt là",
    choices: ["Pt^4+ và Fe^2+.", "Pt^2+ và Fe^2+.", "Cl và CO.", "Pt^2+ và Fe."],
    correctIndex: 3,
    explanation: "[PtCl4]2-: 4×(−1)+x=−2 → Pt=+2. [Fe(CO)5]: CO trung hoà, phức không mang điện (không ghi điện tích) nên Fe ở trạng thái oxi hoá 0 (nguyên tử Fe).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Điện tích của phức chất [PtCl4]2- và [Fe(CO)5] lần lượt là",
    choices: ["+2 và +5.", "+2 và 0.", "–1 và 0.", "–2 và 0."],
    correctIndex: 3,
    explanation: "Điện tích của phức là số ghi ngoài dấu ngoặc vuông: [PtCl4]2- có điện tích −2; [Fe(CO)5] không ghi điện tích nên trung hoà (0).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức tổng quát của phức chất (với nguyên tử trung tâm M và phối tử L) có dạng tứ diện và bát diện lần lượt là",
    choices: ["[ML2] và [ML4].", "[ML4] và [ML6].", "[ML6] và [ML2].", "[ML6] và [ML4]."],
    correctIndex: 1,
    explanation: "Tứ diện có 4 đỉnh nên ứng với phối trí 4: [ML4]; bát diện có 6 đỉnh nên ứng với phối trí 6: [ML6].",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chọn đáp án đúng nhất về dạng hình học có thể có của phức chất có công thức tổng quát [ML4].",
    choices: ["Tứ diện.", "Bát diện.", "Vuông phẳng.", "Tứ diện hoặc vuông phẳng."],
    correctIndex: 3,
    explanation: "Phức chất phối trí 4 có thể có dạng hình học tứ diện hoặc vuông phẳng tuỳ vào nguyên tử trung tâm và phối tử.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phức chất [Cu(H2O)6]2+ có dạng hình học là",
    choices: ["vuông phẳng.", "tứ diện.", "bát diện.", "đường thẳng."],
    correctIndex: 2,
    explanation: "Phối trí 6 ứng với dạng hình học bát diện.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chọn đáp án đúng nhất sau về liên kết trong phức chất [PtCl4]2-.",
    choices: [
      "Là liên kết cộng hoá trị được hình thành do sự cho cặp electron chưa liên kết từ phối tử Cl- vào nguyên tử trung tâm Pt^2+.",
      "Là liên kết cộng hoá trị được hình thành do sự cho cặp electron chưa liên kết từ nguyên tử trung tâm Pt^2+ vào phối tử Cl-.",
      "Là liên kết tĩnh điện giữa nguyên tử trung tâm Pt^2+ và phối tử Cl-.",
      "Là liên kết cộng hoá trị được hình thành do sự ghép đôi cặp electron của phối tử Cl- và nguyên tử trung tâm Pt^2+.",
    ],
    correctIndex: 0,
    explanation: "Liên kết trong phức chất là liên kết cho – nhận: phối tử Cl- cho cặp electron chưa liên kết vào nguyên tử trung tâm Pt^2+ (nhận).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Điện tích của nguyên tử trung tâm trong phức chất [Co(NH3)6]3+ và [FeF6]3- lần lượt là",
    choices: ["+3 và +3.", "+3 và +2.", "+6 và –6.", "+3 và –3."],
    correctIndex: 0,
    explanation: "[Co(NH3)6]3+: NH3 trung hoà nên Co=+3. [FeF6]3-: 6×(−1)+x=−3 → Fe=+3.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dạng hình học có thể có của phức chất [FeF6]3- là",
    choices: ["tứ diện.", "bát diện.", "vuông phẳng.", "tứ diện hoặc vuông phẳng."],
    correctIndex: 1,
    explanation: "Phối trí 6 ứng với dạng hình học bát diện.",
    difficulty: "THONG_HIEU",
  },
  // Bài 29. Một số tính chất và ứng dụng của phức chất
  {
    content:
      "Nhỏ vài giọt dung dịch HCl đặc vào dung dịch CuSO4 tạo thành phức chất [CuCl4]2-. Dấu hiệu nào sau đây chứng tỏ phức chất [CuCl4]2- tạo thành?",
    choices: ["Hoà tan kết tủa.", "Đổi màu dung dịch từ màu xanh sang màu vàng.", "Xuất hiện kết tủa.", "Đổi màu dung dịch từ màu xanh lam sang màu vàng."],
    correctIndex: 3,
    explanation: "Dung dịch CuSO4 có màu xanh lam (phức aqua [Cu(H2O)6]2+); khi tạo phức [CuCl4]2- màu vàng, dung dịch chuyển từ xanh lam sang vàng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho lượng dư dung dịch NH3 tác dụng với AgCl. Phát biểu nào sau đây đúng?",
    choices: [
      "Kết tủa trắng tan dần, phức chất [Ag(NH3)2]+ không màu được tạo thành.",
      "Không có hiện tượng gì xảy ra.",
      "Kết tủa trắng tan dần, phức chất [Ag(NH3)2]+ màu xanh được tạo thành.",
      "Kết tủa trắng tan dần, phức chất [Ag(NH3)4]+ không màu được tạo thành.",
    ],
    correctIndex: 0,
    explanation: "AgCl kết tủa trắng tan dần trong NH3 dư, tạo phức [Ag(NH3)2]+ không màu (Ag+ có phối trí đặc trưng là 2, dạng đường thẳng).",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Nhỏ vài giọt dung dịch NaOH loãng vào dung dịch CuSO4 tạo thành phức chất [Cu(OH)2(H2O)4]. Dấu hiệu nào sau đây chứng tỏ phức chất [Cu(OH)2(H2O)4] tạo thành?",
    choices: ["Xuất hiện kết tủa màu xanh lam.", "Hoà tan kết tủa.", "Dung dịch chuyển từ màu xanh sang màu vàng.", "Xuất hiện kết tủa màu xanh nhạt."],
    correctIndex: 3,
    explanation: "Phức chất [Cu(OH)2(H2O)4] xuất hiện dưới dạng kết tủa màu xanh nhạt, khác với màu xanh lam của dung dịch phức aqua ban đầu.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu nào sau đây đúng?",
    choices: [
      "Phức chất aqua là phức chất chứa phối tử NH3.",
      "Phức chất của kim loại chuyển tiếp đều tan trong dung dịch.",
      "Muối CuSO4 khan màu trắng khi tan vào nước tạo thành dung dịch có màu xanh do tạo thành phức chất aqua [Cu(H2O)6]2+.",
      "Phức chất của kim loại chuyển tiếp đều có màu.",
    ],
    correctIndex: 2,
    explanation:
      "CuSO4 khan màu trắng, khi tan trong nước tạo phức aqua [Cu(H2O)6]2+ màu xanh lam. Phức aqua là phức chứa phối tử H2O (không phải NH3); không phải mọi phức đều tan (có phức kết tủa); không phải mọi phức kim loại chuyển tiếp đều có màu.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu nào sau đây KHÔNG đúng?",
    choices: [
      "Trong dung dịch, các ion kim loại chuyển tiếp đều tạo phức chất aqua.",
      "Các phối tử H2O trong phức chất aqua không thể bị thế bởi các phối tử khác.",
      "Phức chất aqua của các ion kim loại chuyển tiếp hầu hết có dạng hình học bát diện.",
      "Các phối tử trong phức chất có thể bị thay thế một phần hoặc thay thế hết bởi các phối tử khác.",
    ],
    correctIndex: 1,
    explanation: "Phối tử H2O trong phức aqua hoàn toàn có thể bị thế bởi các phối tử khác (như NH3, Cl-,...) — đây là phát biểu sai.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Các phối tử H2O trong phức chất [Ni(H2O)6]2+ có thể bị thế hết bởi sáu phối tử NH3 tạo thành phức chất là",
    choices: ["[Ni(NH3)6]2+.", "[Ni(NH3)2(H2O)4]2+.", "[Ni(NH3)(H2O)5]2+.", "[Ni(NH3)5(H2O)]2+."],
    correctIndex: 0,
    explanation: "Thế hết cả 6 phối tử H2O bởi NH3, tất cả phối tử đều là NH3: [Ni(NH3)6]2+.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phối tử H2O trong phức chất aqua [Cu(H2O)6]2+ có thể bị thế bởi 1 phối tử NH3 tạo thành phức chất là",
    choices: ["[Cu(NH3)6]2+.", "[Cu(NH3)2(H2O)5]2+.", "[Cu(NH3)(H2O)5]2+.", "[Cu(NH3)(H2O)5]+."],
    correctIndex: 2,
    explanation: "Thế 1 trong 6 phối tử H2O bởi NH3 (trung hoà, không đổi điện tích tổng): còn 1 NH3 và 5 H2O, điện tích vẫn +2: [Cu(NH3)(H2O)5]2+.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu nào sau đây đúng?",
    choices: [
      "Các phối tử trong phức chất chỉ có thể bị thế một phần bởi các phối tử khác.",
      "Các phối tử trong phức chất chỉ có thể bị thế tất cả bởi các phối tử khác.",
      "Tất cả các phức chất aqua đều kém tan trong nước.",
      "Phức chất được dùng làm thuốc chữa bệnh ung thư với tên gọi thương phẩm là cisplatin có công thức hoá học là [PtCl2(NH3)2].",
    ],
    correctIndex: 3,
    explanation:
      "Cisplatin — thuốc điều trị ung thư nổi tiếng — có công thức [PtCl2(NH3)2]. Các phối tử trong phức có thể bị thế một phần hoặc toàn bộ (không chỉ một trong hai khả năng); phức aqua thường tan tốt trong nước.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Phức chất [Cu(H2O)6]2+ có màu xanh; phức chất [Cu(NH3)4(H2O)2] có màu xanh lam và phức chất [CuCl4]2- có màu vàng. Màu sắc của ba phức chất khác nhau là do chúng khác nhau về",
    choices: ["nguyên tử trung tâm.", "phối tử.", "cả nguyên tử trung tâm và phối tử.", "số lượng phối tử."],
    correctIndex: 1,
    explanation: "Cả ba phức đều có cùng nguyên tử trung tâm Cu^2+, chỉ khác nhau về phối tử (H2O, NH3+H2O, Cl-) nên màu sắc khác nhau do phối tử khác nhau.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Trong phức chất [Co(H2O)6]2+, 2 phối tử H2O có thể bị thế bởi 2 phối tử OH-. Phát biểu nào sau đây KHÔNG đúng?",
    choices: [
      "Phức chất tạo thành có 4 phối tử nước và 2 phối tử OH-.",
      "Phức chất tạo thành có điện tích +2.",
      "Phức chất tạo thành có nguyên tử trung tâm là Co^2+.",
      "Phức chất tạo thành là [Co(OH)2(H2O)4].",
    ],
    correctIndex: 1,
    explanation: "Điện tích phức mới = (+2 của Co^2+) + 4×0 (H2O) + 2×(−1) (OH-) = 0, không phải +2 — đây là phát biểu sai.",
    difficulty: "THONG_HIEU",
  },
  // Bài 30. Ôn tập chương VIII
  {
    content: "Cấu hình electron của Cu^2+ là",
    choices: ["[Ar]3d94s2.", "[Ar]3d104s1.", "[Ar]3d84s1.", "[Ar]3d9."],
    correctIndex: 3,
    explanation: "Cu ([Ar]3d104s1) mất 2 electron (1 ở 4s, 1 ở 3d) tạo Cu^2+: [Ar]3d9.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu nào sau đây KHÔNG đúng?",
    choices: [
      "Các nguyên tố kim loại chuyển tiếp dãy thứ nhất thuộc khối d.",
      "Zn là nguyên tử kim loại chuyển tiếp dãy thứ nhất duy nhất có phân lớp 3d đã điền đầy electron.",
      "Nguyên tử của các kim loại chuyển tiếp dãy thứ nhất đều có lớp vỏ bên trong của khí hiếm Ar.",
      "Kim loại chuyển tiếp dãy thứ nhất thường tạo thành các hợp chất với nhiều số oxi hoá khác nhau.",
    ],
    correctIndex: 1,
    explanation: "Cu ([Ar]3d104s1) cũng có phân lớp 3d điền đầy electron, nên Zn không phải là nguyên tử DUY NHẤT có đặc điểm này — đây là phát biểu sai.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Số lượng phối tử có trong phức chất [PtCl4(NH3)2] là",
    choices: ["6.", "2.", "4.", "7."],
    correctIndex: 0,
    explanation: "Tổng số phối tử = 4 Cl + 2 NH3 = 6.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Xét phức chất [PtCl2(NH3)4]2+ và [FeF6]3-. Phát biểu nào sau đây đúng?",
    choices: [
      "Số lượng phối tử có trong mỗi phức chất lần lượt là 4 và 6.",
      "Điện tích của mỗi phức chất lần lượt là +4 và +3.",
      "Nguyên tử trung tâm trong mỗi phức chất là Pt^4+ và Fe^3+.",
      "Cả 2 phức chất đều ít tan trong nước.",
    ],
    correctIndex: 2,
    explanation:
      "[PtCl2(NH3)4]2+: 2×(−1)+x=+2 → Pt=+4. [FeF6]3-: 6×(−1)+x=−3 → Fe=+3. (Số phối tử thực tế của phức thứ nhất là 6, không phải 4; điện tích lần lượt là +2 và −3, không phải +4 và +3.)",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phát biểu nào sau đây KHÔNG đúng?",
    choices: [
      "Tất cả các nguyên tố thuộc nhóm B đều là nguyên tố chuyển tiếp dãy thứ nhất.",
      "Các nguyên tố chuyển tiếp dãy thứ nhất thường có nhiệt độ nóng chảy cao hơn các kim loại nhóm IA và IIA.",
      "Số oxi hoá của nguyên tử nguyên tố chromium trong hợp chất K2CrO4 và K2Cr2O7 bằng nhau.",
      "Trạng thái oxi hoá thường gặp của Mn là +2, +4, +7.",
    ],
    correctIndex: 0,
    explanation:
      "Nhóm B bao gồm nhiều dãy chuyển tiếp khác nhau (dãy thứ nhất, thứ hai, thứ ba tương ứng chu kì 4, 5, 6), không chỉ riêng dãy thứ nhất — đây là phát biểu sai. Cr trong cả K2CrO4 và K2Cr2O7 đều có số oxi hoá +6.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phức chất của Cr(0) có dạng hình học bát diện chỉ chứa phối tử CO có công thức hoá học là",
    choices: ["[Cr(CO)4].", "[Cr(CO)6].", "[Cr(CO)4]2+.", "[Cr(CO)6]2+."],
    correctIndex: 1,
    explanation: "Cr(0) có điện tích 0; phối trí bát diện ứng với 6 phối tử; CO trung hoà nên phức tổng điện tích bằng 0, không ghi điện tích: [Cr(CO)6].",
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
        source: "SBT Hóa 12 - Kết nối tri thức (Chương 8 - Kim loại chuyển tiếp và phức chất)",
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
