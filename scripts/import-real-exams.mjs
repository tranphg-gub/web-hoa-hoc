import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getOrCreateChapter(grade, title, order) {
  const existing = await prisma.chapter.findFirst({ where: { grade, title } });
  if (existing) return existing;
  return prisma.chapter.create({ data: { grade, title, order } });
}

// Mỗi phần tử: { title, grade, chapterTitle, durationSec, questions: [{ content, choices: [4], correctIndex, explanation? }] }
// Nguồn: Tài liệu/Lớp 11/Đề kiểm tra và ôn tập/Ôn tập học kì 1/ĐỀ SỐ 1, 2 (khóa LIVEVIP Hóa 11 - Thầy Ngọc Anh TYHH)
const exams = [
  {
    title: "Đề ôn tập học kì 1 - Đề số 1 (Lớp 11, sưu tầm)",
    grade: 11,
    chapterTitle: "Ôn tập tổng hợp Học kì 1",
    durationSec: 2520,
    questions: [
      { content: "Phản ứng nào sau đây là phản ứng thuận nghịch?", choices: ["2H2 + O2 -> 2H2O", "Fe + 2HCl -> FeCl2 + H2", "H2 + Cl2 -> 2HCl", "N2 + 3H2 ⇌ 2NH3"], correctIndex: 3 },
      { content: "Chất nào sau đây thuộc loại chất điện li mạnh?", choices: ["CH3COOH", "C2H5OH", "H2O", "KCl"], correctIndex: 3 },
      { content: "Trong ammonia, nitrogen có số oxi hoá là", choices: ["-3", "+4", "+5", "+3"], correctIndex: 0 },
      { content: "Chất nào sau đây không thuộc loại hợp chất hữu cơ?", choices: ["CH3COONa", "CO2", "CH4", "CH3Cl"], correctIndex: 1 },
      { content: "Chất nào sau đây khi nhiệt phân không thu được khí NH3?", choices: ["NH4NO3", "NH4HCO3", "(NH4)2CO3", "NH4Cl"], correctIndex: 0, explanation: "NH4NO3 nhiệt phân tạo N2O và H2O, không tạo NH3." },
      { content: "Chất phản ứng với bột S ở điều kiện thường là", choices: ["H2", "O2", "Hg", "Fe"], correctIndex: 2, explanation: "Hg + S -> HgS ngay ở điều kiện thường, dùng để xử lý thủy ngân rơi vãi." },
      { content: "Cho sơ đồ: (X) + HNO3 -> Fe(NO3)3 + H2O. Chất (X) trong sơ đồ là", choices: ["Fe", "Fe(OH)3", "Fe(OH)2", "FeO"], correctIndex: 1 },
      { content: "Phương pháp tách biệt và tinh chế nào sau đây được ứng dụng để ngâm hoa quả làm siro?", choices: ["Chiết", "Chưng cất", "Sắc kí cột", "Kết tinh"], correctIndex: 0 },
      { content: "Kim loại bị thụ động trong dung dịch H2SO4 đặc, nguội là", choices: ["Cu, Ag", "Al, Fe", "Fe, Ag", "Au, Pt"], correctIndex: 1 },
      { content: "Hóa chất được sử dụng để phân biệt dung dịch H2SO4 loãng và HCl loãng là", choices: ["NaNO3", "Ba(NO3)2", "Fe(NO3)3", "Cu(NO3)2"], correctIndex: 1, explanation: "Ba(NO3)2 tạo kết tủa trắng BaSO4 với H2SO4 nhưng không phản ứng với HCl." },
      { content: "Từ phổ MS của benzene, xác định được ion phân tử [C6H6]+ có giá trị m/z bằng 78. Phân tử khối của benzene là", choices: ["77", "76", "78", "79"], correctIndex: 2 },
      { content: "Để xác định phân tử khối của hợp chất hữu cơ bằng phổ khối lượng MS, phân tử khối của chất là giá trị m/z của", choices: ["peak có cường độ tương đối lớn nhất", "peak [M+] lớn nhất", "peak [M+] nhỏ nhất", "peak xuất hiện nhiều nhất"], correctIndex: 1 },
      { content: "Phản ứng nào sau đây nitrogen thể hiện tính khử?", choices: ["N2 + O2 -> 2NO", "N2 + 3H2 ⇌ 2NH3", "N2 + 6Li -> 2Li3N", "N2 + 3Ca -> Ca3N2"], correctIndex: 0, explanation: "Ở phản ứng này số oxi hóa N tăng từ 0 lên +2, N2 nhường electron nên thể hiện tính khử." },
      { content: "Phân tử khối của chất hữu cơ nào sau đây là 92?", choices: ["CH2OH-CHOH-CH2OH", "C4H7-NH2", "HOCH2-CH2OH", "C2H5-CHO"], correctIndex: 0, explanation: "Glycerol CH2OH-CHOH-CH2OH có M = 92 g/mol." },
      { content: "Khí sulfur dioxide có mùi hắc, rất độc, là tác nhân chủ yếu gây mưa acid. Công thức của khí này là", choices: ["CO2", "NO2", "NO", "SO2"], correctIndex: 3 },
      { content: "Cho hỗn hợp các chất: A sôi ở 36°C, B sôi ở 98°C, C sôi ở 126°C, D sôi ở 151°C. Có thể tách riêng các chất bằng cách nào?", choices: ["Chiết", "Thăng hoa", "Chưng cất", "Kết tinh"], correctIndex: 2 },
      { content: "Trong số các khí sau: H2, O2, NH3, Cl2. Những khí có thể làm khô bằng sulfuric acid đặc là", choices: ["H2, O2, NH3", "Cl2, O2, NH3", "NH3, Cl2", "H2, O2, Cl2"], correctIndex: 3, explanation: "NH3 phản ứng với H2SO4 đặc (tính base) nên không thể làm khô bằng chất này." },
      { content: "Cặp hợp chất hữu cơ nào sau đây là đồng phân của nhau?", choices: ["CH3-CO-CH3 và CH3-CH2-OH", "CH3-O-CH3 và C2H5OH", "CH3OH và C2H5OH", "CH3-CO-CH3 và CH3-O-CH3"], correctIndex: 1, explanation: "CH3-O-CH3 và C2H5OH cùng công thức phân tử C2H6O nên là đồng phân." },
      { content: "Sau khi chưng cất cây sả bằng hơi nước, người ta dùng phương pháp chiết để tách riêng lớp tinh dầu ra khỏi nước. Phát biểu không đúng là", choices: ["Có thể dùng phễu chiết để tách riêng lớp tinh dầu khỏi nước.", "Tinh dầu có khối lượng riêng nặng hơn nước nên nằm phía dưới.", "Dùng phương pháp chiết lỏng - lỏng để tách riêng lớp tinh dầu ra khỏi nước.", "Hỗn hợp thu được tách thành hai lớp."], correctIndex: 1, explanation: "Tinh dầu thường nhẹ hơn nước nên nổi lên trên, không phải chìm xuống dưới." },
      { content: "Cân bằng hoá học là?", choices: ["Một trạng thái cân bằng động vì khi hệ đạt cân bằng hoá học, phản ứng thuận vẫn xảy ra và phản ứng nghịch dừng lại.", "Một trạng thái cân bằng động vì khi hệ đạt cân bằng hoá học, phản ứng thuận dừng lại còn phản ứng nghịch vẫn xảy ra.", "Một trạng thái cân bằng động vì khi hệ đạt cân bằng hoá học, cả phản ứng thuận và phản ứng nghịch vẫn xảy ra.", "Một cân bằng tĩnh vì khi đó, cả phản ứng thuận và phản ứng nghịch đều dừng lại."], correctIndex: 2 },
      { content: "Công thức phân tử của chất Y có công thức cấu tạo dạng khung phân tử: Cl-CH(Cl)-CH2-CH2-COOH là", choices: ["C3H4O2Cl2", "C3H5O2Cl2", "C2H5O2Cl2", "C3H3O2Cl2"], correctIndex: 0 },
      { content: "Dựa vào phổ IR của hợp chất X thuộc loại ester có công thức CH3COOCH3, hãy chỉ ra peak nào giúp dự đoán X có nhóm C=O?", choices: ["A", "B", "C", "D"], correctIndex: 1, explanation: "Peak hấp thụ đặc trưng của nhóm C=O nằm ở khoảng 1700 cm-1." },
      { content: "Cho biết phổ khối lượng của benzaldehyde. Phân tử khối của benzaldehyde là", choices: ["50", "105", "77", "106"], correctIndex: 3 },
      { content: "Cho phương trình hoá học: N2(g) + O2(g) ⇌ 2NO(g); ΔrH°298 > 0. Cặp yếu tố nào sau đây đều ảnh hưởng đến sự chuyển dịch cân bằng hoá học trên?", choices: ["Nồng độ và chất xúc tác", "Chất xúc tác và nhiệt độ", "Nhiệt độ và nồng độ", "Áp suất và chất xúc tác"], correctIndex: 2, explanation: "Chất xúc tác không làm chuyển dịch cân bằng; nhiệt độ và nồng độ đều ảnh hưởng." },
      { content: "Có bao nhiêu chất thuộc loại hydrocarbon trong dãy sau: (1) CH2=CHCl (2) CH3-CH(CH3)2 (3) HCHO (4) C2H5Br (5) CH3COOH (6) C6H6?", choices: ["2", "1", "4", "3"], correctIndex: 0, explanation: "Chỉ (2) và (6) chỉ chứa C, H (hydrocarbon); các chất còn lại có thêm Cl, O, Br." },
      { content: "Dãy chất sau đây gồm những chất đều tác dụng được với dung dịch H2SO4 loãng là", choices: ["Mg, ZnO, Ba(OH)2, CaCO3", "CuO, Fe(OH)2, Al, NaCl", "Cu, ZnO, NaOH, MgCl2", "Na, CaCO3, Mg(OH)2, BaSO4"], correctIndex: 0 },
      { content: "Tiến hành đo pH của dung dịch X thấy giá trị pH = 9. Phát biểu nào dưới đây không đúng?", choices: ["Dung dịch X làm phenolphtalein chuyển sang màu hồng.", "Dung dịch X có môi trường kiềm.", "Dung dịch X là một dung dịch có [H+] < 10^-7 M.", "Dung dịch X là một acid mạnh."], correctIndex: 3, explanation: "pH = 9 > 7 là môi trường base (kiềm), không phải acid." },
      { content: "Cho các phản ứng: (1) H2(g)+I2(g)⇌2HI(g) (2) 2SO2(g)+O2(g)⇌2SO3(g) (3) 3H2(g)+N2(g)⇌2NH3(g) (4) N2O4(g)⇌2NO2(g). Các phản ứng chuyển dịch theo chiều nghịch khi giảm áp suất của hệ là:", choices: ["(1), (2)", "(2), (4)", "(3), (4)", "(2), (3)"], correctIndex: 3, explanation: "Giảm áp suất làm cân bằng chuyển dịch theo chiều tăng số mol khí; (2) và (3) đều giảm mol ở chiều thuận nên khi giảm áp sẽ chuyển dịch nghịch." },
    ],
  },
  {
    title: "Đề ôn tập học kì 1 - Đề số 2 (Lớp 11, sưu tầm)",
    grade: 11,
    chapterTitle: "Ôn tập tổng hợp Học kì 1",
    durationSec: 2520,
    questions: [
      { content: "Chất điện li mạnh là", choices: ["C2H5OH (ethanol)", "H2S", "NaCl", "Mg(OH)2"], correctIndex: 2 },
      { content: "Pha loãng dung dịch HCl có pH = 3 bao nhiêu lần để được dung dịch mới có pH = 4?", choices: ["4", "9", "10", "5"], correctIndex: 2, explanation: "Độ pha loãng = 10^(pH mới - pH cũ) = 10^(4-3) = 10 lần." },
      { content: "Các dung dịch acid, base, muối dẫn điện được là do trong dung dịch của chúng có các", choices: ["ion trái dấu", "anion (ion âm)", "cation (ion dương)", "chất"], correctIndex: 0 },
      { content: "H2SO4 loãng và H2SO4 đặc, nóng cùng tác dụng chất nào sau đây đều thuộc phản ứng oxi hóa khử?", choices: ["S", "Fe(OH)2", "Fe", "Cu"], correctIndex: 2, explanation: "Với Fe, cả 2 trường hợp Fe đều bị oxi hóa (loãng: Fe->Fe2+; đặc nóng: Fe->Fe3+), còn Fe(OH)2 với H2SO4 loãng chỉ là phản ứng trao đổi thông thường (không đổi số oxi hóa)." },
      { content: "Cho phương trình hoá học: N2(g) + O2(g) ⇌ 2NO(g). Cặp yếu tố nào sau đây ảnh hưởng đến sự chuyển dịch cân bằng hoá học trên?", choices: ["Nhiệt độ và nồng độ", "Nồng độ và chất xúc tác", "Áp suất và nồng độ", "Chất xúc tác và nhiệt độ"], correctIndex: 0 },
      { content: "Khi hạ nhiệt độ của một dung dịch bão hoà thường thu được", choices: ["Tinh thể chất tan và tinh thể dung môi", "Một dung môi mới", "Dung dịch bão hoà ban đầu và tinh thể chất tan", "Dung dịch bão hoà mới và tinh thể chất tan"], correctIndex: 3 },
      { content: "H2SO4 loãng và H2SO4 đặc, nóng cùng tác dụng chất nào sau đây thu được 1 muối duy nhất?", choices: ["Fe", "Cu", "Fe(OH)2", "CuO"], correctIndex: 3, explanation: "CuO phản ứng với cả 2 loại acid đều chỉ tạo CuSO4 (không có phản ứng oxi hóa khử)." },
      { content: "Phản ứng thuận nghịch đạt cân bằng khi", choices: ["Nhiệt độ của phản ứng thuận và nghịch bằng nhau", "Tốc độ phản ứng thuận và nghịch bằng nhau", "Hiệu suất phản ứng thuận và nghịch bằng nhau", "Nồng độ các chất tham gia và sản phẩm bằng nhau"], correctIndex: 1 },
      { content: "Nước cường toan là hỗn hợp của dung dịch HNO3 đậm đặc với", choices: ["HCl và H2SO4", "H2SO4 đặc", "NaOH đậm đặc", "HCl đậm đặc"], correctIndex: 3, explanation: "Nước cường toan (tỉ lệ 1:3) hòa tan được cả vàng, platinum nhờ hỗn hợp HNO3 và HCl đặc." },
      { content: "Nitrogen tương đối trơ về mặt hoá học ở nhiệt độ thường là do", choices: ["phân tử N2 có liên kết ion", "phân tử N2 có liên kết ba với năng lượng liên kết lớn", "nitrogen có độ âm điện lớn", "phân tử N2 có liên kết cộng hoá trị không phân cực"], correctIndex: 1 },
      { content: "Phản ứng nào sau đây có chất tham gia là sulfuric acid loãng?", choices: ["2H2SO4 + C -> 2SO2 + CO2 + 2H2O", "H2SO4 + FeO -> FeSO4 + H2O", "6H2SO4 + 2Fe -> Fe2(SO4)3 + 6H2O + 3SO2", "4H2SO4 + 2Fe(OH)2 -> Fe2(SO4)3 + 6H2O + SO2"], correctIndex: 1, explanation: "Đây là phản ứng trao đổi thông thường của acid loãng; các phương trình còn lại thể hiện tính oxi hóa mạnh của H2SO4 đặc." },
      { content: "Phương trình hóa học nào sau đây sai?", choices: ["NH4HCO3 -> NH3 + CO2 + H2O", "NH4Cl -> NH3 + HCl", "(NH4)2CO3 -> 2NH3 + CO2 + H2O", "NH4NO3 -> NH3 + HNO3"], correctIndex: 3, explanation: "NH4NO3 khi nhiệt phân thực tế tạo N2O và H2O, không tạo lại NH3 và HNO3." },
      { content: "Trường hợp nào sau đây biểu diễn công thức cấu tạo ở dạng khung phân tử (công thức cấu tạo thu gọn nhất)?", choices: ["Dạng khung zigzag propane", "H3C-O-CH3", "Công thức khai triển đầy đủ propane", "H3C-CH2-CH2-CH3"], correctIndex: 0 },
      { content: "Hydrocarbon A có tỉ khối so với Helium bằng 14. Công thức phân tử của A là", choices: ["C4H10", "C4H6", "C4H4", "C4H8"], correctIndex: 3, explanation: "M(A) = 14 x 4 = 56 g/mol, tương ứng C4H8." },
      { content: "Theo thuyết cấu tạo hoá học, chất nào sau đây sai về hoá trị của carbon?", choices: ["CH3-O-CH-CH3 (carbon chỉ có 3 liên kết)", "CH3-CH(CH3)-CH3", "CH3Cl", "CH3-CH=O"], correctIndex: 0, explanation: "Carbon luôn có hóa trị IV; công thức A vẽ carbon chỉ có 3 liên kết là sai." },
      { content: "Tỉ lệ số nguyên tử C : H : O trong phân tử glucose C6H12O6 tương ứng là", choices: ["1 : 2 : 1", "2 : 1 : 1", "1 : 1 : 2", "1 : 3 : 1"], correctIndex: 0 },
      { content: "Hợp chất X có công thức phân tử là C3H6. Số đồng phân của X là", choices: ["3", "4", "1", "2"], correctIndex: 3, explanation: "C3H6 có 2 đồng phân: propene (CH2=CH-CH3) và cyclopropane (vòng 3 cạnh)." },
      { content: "Sơ đồ thí nghiệm dùng phễu chiết tách lớp ester/nước/alcohol/carboxylic acid dùng để tách và tinh chế hợp chất hữu cơ theo phương pháp nào?", choices: ["Sắc kí cột", "Kết tinh", "Chiết", "Chưng cất"], correctIndex: 2 },
      { content: "Hợp chất hữu cơ H-C(OH)H-C(=O)OH thể hiện tính chất đặc trưng của nhóm chức nào?", choices: ["aldehyde", "ester", "alcohol", "carboxylic acid"], correctIndex: 3, explanation: "Nhóm -COOH quyết định tính chất đặc trưng (tính acid) của phân tử." },
      { content: "Các chất nào sau đây thuộc dãy đồng đẳng có công thức chung CnH2n+2?", choices: ["C2H6, C3H8, C4H8, C5H12", "CH4, C2H4, C3H4, C4H4", "CH4, C2H6, C4H10, C5H12", "C2H4, C3H6, C4H8, C5H10"], correctIndex: 2, explanation: "CH4, C2H6, C4H10, C5H12 đều là alkane, ứng với công thức chung CnH2n+2." },
      { content: "Phương trình ion gọn sau: H+ + OH- -> H2O tương ứng với phản ứng nào?", choices: ["3HNO3 + Fe(OH)3 -> Fe(NO3)3 + 3H2O", "2HNO3 + Cu(OH)2 -> Cu(NO3)2 + 2H2O", "H2SO4 + Ba(OH)2 -> BaSO4 + 2H2O", "2HCl + Ba(OH)2 -> BaCl2 + 2H2O"], correctIndex: 3, explanation: "Phản ứng với H2SO4 tạo kết tủa BaSO4 nên phương trình ion rút gọn không chỉ đơn giản là H+ + OH- -> H2O." },
      { content: "Cân bằng nào sau đây sẽ chuyển dịch theo chiều thuận khi giảm áp suất của hệ phản ứng?", choices: ["N2(g) + 3H2(g) ⇌ 2NH3(g)", "CH4(g) + H2O(g) ⇌ CO(g) + 3H2(g)", "2SO2(g) + O2(g) ⇌ 2SO3(g)", "N2(g) + O2(g) ⇌ 2NO(g)"], correctIndex: 1, explanation: "Chiều thuận của phản ứng B làm tăng số mol khí (2 mol -> 4 mol) nên khi giảm áp suất, cân bằng chuyển dịch theo chiều thuận." },
      { content: "Phản ứng nào sau đây sulfur đóng vai trò là chất oxi hóa?", choices: ["S + 6HNO3 -> H2SO4 + 6NO2 + 2H2O", "S + 2H2SO4 -> 3SO2 + 2H2O", "S + O2 -> SO2", "S + H2 -> H2S"], correctIndex: 3, explanation: "Ở phản ứng này, S nhận electron (0 xuống -2) nên đóng vai trò chất oxi hóa." },
      { content: "Phát biểu nào sau đây không đúng?", choices: ["NH3 là chất khí không màu, không mùi, tan nhiều trong nước.", "Dung dịch NH3 là một base yếu.", "Phản ứng tổng hợp NH3 từ N2 và H2 là phản ứng thuận nghịch.", "Đốt cháy NH3 không có xúc tác thu được N2 và H2O."], correctIndex: 0, explanation: "NH3 thực tế có mùi khai đặc trưng, không phải không mùi." },
      { content: "Dãy gồm tất cả các chất khi tác dụng với HNO3 thì HNO3 chỉ thể hiện tính acid là", choices: ["Fe(OH)3, Na2CO3, Fe2O3, NH3", "KOH, FeS, K2CO3, Cu(OH)2", "CaCO3, Cu(OH)2, Fe(OH)2, FeO", "CuO, NaOH, FeCO3, Fe2O3"], correctIndex: 0, explanation: "Fe trong các chất này đã ở số oxi hóa +3 (cao nhất) nên phản ứng với HNO3 không xảy ra oxi hóa khử." },
      { content: "CO2 có lẫn SO2. Trong các hóa chất: dung dịch NaOH, dung dịch Br2, dung dịch KMnO4, dung dịch H2S, nước vôi trong. Có bao nhiêu hóa chất có thể dùng để loại bỏ riêng SO2 (không hấp thụ CO2)?", choices: ["2", "3", "5", "4"], correctIndex: 1, explanation: "Br2, KMnO4, H2S phản ứng chọn lọc với SO2 mà không hấp thụ CO2; NaOH và nước vôi trong hấp thụ cả hai khí nên không chọn lọc." },
      { content: "Cho cân bằng: 2SO2(g) + O2(g) ⇌ 2SO3(g); ΔrH°298 < 0. Biện pháp nào làm cân bằng chuyển dịch theo chiều thuận: (1) tăng nhiệt độ (2) tăng áp suất chung (3) hạ nhiệt độ (4) dùng xúc tác V2O5 (5) giảm nồng độ SO3 (6) giảm áp suất chung?", choices: ["(1), (2), (4), (5)", "(2), (3), (5)", "(2), (3), (4), (6)", "(1), (2), (4)"], correctIndex: 1, explanation: "Tăng áp suất, hạ nhiệt độ (phản ứng tỏa nhiệt) và giảm nồng độ sản phẩm đều làm cân bằng chuyển dịch thuận; xúc tác không làm chuyển dịch cân bằng." },
      { content: "Thí nghiệm đốt cháy sulfur với bột iron. Phát biểu nào sau đây không đúng?", choices: ["Sau bước 1, chưa thấy hiện tượng gì xảy ra.", "Sau bước 2, thấy hỗn hợp cháy sáng, kết thúc phản ứng hỗn hợp chuyển thành chất bột màu đen.", "Sản phẩm tạo thành sau bước 2 là muối iron(III) sulfide.", "Phương trình phản ứng xảy ra ở bước 2 là: S + Fe -> FeS."], correctIndex: 2, explanation: "Sản phẩm đúng là iron(II) sulfide (FeS), không phải iron(III) sulfide." },
    ],
  },
  {
    title: "Đề ôn tập học kì 1 - Đề số 3 (Lớp 11, sưu tầm)",
    grade: 11,
    chapterTitle: "Ôn tập tổng hợp Học kì 1",
    durationSec: 2520,
    questions: [
      { content: "Chất nào sau đây là chất không điện li?", choices: ["Na2SO4", "HCl", "C12H22O11 (Saccharose)", "NaOH"], correctIndex: 2 },
      { content: "Chất thủy phân trong nước tạo môi trường acid là", choices: ["NaCl", "Al2(SO4)3", "NaOH", "Na2SO4"], correctIndex: 1, explanation: "Al3+ + H2O ⇌ Al(OH)2+ + H+ làm dung dịch có môi trường acid." },
      { content: "Khi có tia lửa điện hoặc ở nhiệt độ cao, nitrogen tác dụng trực tiếp với oxygen tạo ra hợp chất X. Công thức của X là", choices: ["N2O", "NO2", "NO", "N2O5"], correctIndex: 2 },
      { content: "Chất nào sau đây không có cùng công thức đơn giản nhất với C2H2?", choices: ["C3H6", "C6H6", "C8H8", "C4H4"], correctIndex: 0, explanation: "C2H2, C6H6, C8H8, C4H4 đều có công thức đơn giản nhất là CH; riêng C3H6 có công thức đơn giản nhất là CH2." },
      { content: "Trong phản ứng: S + H2 --t°--> H2S. Sulfur đóng vai trò là", choices: ["chất khử", "chất bị khử", "chất bị oxi hóa", "vừa là chất khử, vừa là chất oxi hóa"], correctIndex: 1, explanation: "S nhận electron (0 xuống -2) nên là chất oxi hóa, đồng thời cũng là chất bị khử." },
      { content: "Nguyên tố sulfur có số hiệu nguyên tử là 16, trong bảng tuần hoàn, sulfur thuộc nhóm nào?", choices: ["nhóm VIIA", "nhóm IIA", "nhóm IVA", "nhóm VIA"], correctIndex: 3 },
      { content: "Số nguyên tử H trong hợp chất hữu cơ nào sau đây không đúng?", choices: ["C5H12", "C3H8", "C5H10", "C2H8"], correctIndex: 3, explanation: "C2H8 có độ bất bão hòa âm (không hợp lệ), công thức này không tồn tại." },
      { content: "H2SO4 loãng tác dụng chất nào sau đây thuộc phản ứng oxi hóa khử?", choices: ["Fe2O3", "Fe3O4", "Fe", "BaCl2"], correctIndex: 2, explanation: "Fe + H2SO4 loãng -> FeSO4 + H2 có sự thay đổi số oxi hóa của cả Fe và H." },
      { content: "Nhỏ từ từ dung dịch NH3 cho đến dư vào ống nghiệm đựng dung dịch Al2(SO4)3. Hiện tượng quan sát được là", choices: ["có kết tủa màu xanh nhạt xuất hiện, sau đó kết tủa lại tan dần.", "không có hiện tượng gì.", "có kết tủa keo trắng xuất hiện, sau đó kết tủa lại tan tạo dung dịch trong suốt.", "có kết tủa keo màu trắng xuất hiện."], correctIndex: 3, explanation: "Al(OH)3 là hydroxide lưỡng tính nhưng không tan trong base yếu NH3 dư (khác với NaOH dư)." },
      { content: "Cho cân bằng sau trong bình kín: 2NO2(g) ⇌ N2O4(g) (màu nâu đỏ chuyển thành không màu). Biết khi hạ nhiệt độ của bình thì màu nâu đỏ nhạt dần. Phản ứng thuận có", choices: ["ΔrH°298 > 0, phản ứng thu nhiệt.", "ΔrH°298 < 0, phản ứng tỏa nhiệt.", "ΔrH°298 < 0, phản ứng thu nhiệt.", "ΔrH°298 > 0, phản ứng tỏa nhiệt."], correctIndex: 1, explanation: "Hạ nhiệt độ làm cân bằng chuyển dịch thuận (màu nhạt dần) nên chiều thuận là chiều tỏa nhiệt." },
      { content: "Cho FeCO3 tác dụng với H2SO4 đặc nóng dư. Sản phẩm khí thu được là", choices: ["CO2", "H2S và CO2", "SO2", "CO2 và SO2"], correctIndex: 3 },
      { content: "Pha loãng 1 lít dung dịch NaOH có pH = 9 bằng nước để được dung dịch mới có pH = 8. Thể tích nước cần dùng là", choices: ["4 lít", "9 lít", "10 lít", "5 lít"], correctIndex: 1, explanation: "Giảm 1 đơn vị pH (base) cần pha loãng 10 lần, tức thể tích cuối là 10 lít, vậy cần thêm 9 lít nước." },
      { content: "Cho từng chất: Fe, FeO, Fe(OH)2, Fe(OH)3, Fe3O4 lần lượt phản ứng với HNO3 đặc, nóng. Số phản ứng thuộc loại phản ứng oxi hoá - khử là", choices: ["2", "3", "5", "4"], correctIndex: 3, explanation: "4 chất Fe, FeO, Fe(OH)2, Fe3O4 có Fe chưa đạt số oxi hóa +3 nên phản ứng oxi hóa khử; riêng Fe(OH)3 đã ở +3 nên chỉ là phản ứng trao đổi." },
      { content: "Dãy chất nào sau đây là hợp chất hữu cơ?", choices: ["(NH4)2CO3, CO2, CH4, C2H6", "C2H4, CH4, C2H6O, C3H9N", "CO2, K2CO3, NaHCO3, C2H5Cl", "NH4HCO3, CH3OH, CH4, CCl4"], correctIndex: 1 },
      { content: "Oleum có công thức tổng quát là", choices: ["H2SO4.nSO2", "H2SO4.nH2O", "H2SO4.nSO3", "H2SO4 đặc"], correctIndex: 2 },
      { content: "Trong khí thải của quy trình sản xuất thuốc trừ sâu, phân bón hóa học có lẫn khí NH3 rất độc. Để xử lí NH3 lẫn trong khí thải, người ta có thể dẫn khí thải qua một bể lọc chứa hóa chất nào sau đây?", choices: ["Dung dịch Ca(OH)2", "Dung dịch HCl", "Dung dịch NaOH", "Nước"], correctIndex: 1, explanation: "NH3 + HCl -> NH4Cl; dùng acid để hấp thụ khí base." },
      { content: "Xét cân bằng Fe2O3(s) + 3CO(g) ⇌ 2Fe(s) + 3CO2(g). Nếu tăng áp suất thì", choices: ["cân bằng sẽ đứng yên.", "không ảnh hưởng đến sự chuyển dịch cân bằng.", "cân bằng sẽ chuyển dời sang chiều thuận.", "cân bằng sẽ chuyển dời sang chiều nghịch."], correctIndex: 1, explanation: "Tổng số mol khí hai vế bằng nhau (3 = 3) nên áp suất không ảnh hưởng đến cân bằng." },
      { content: "Số đồng phân cấu tạo ứng với công thức phân tử C3H5Cl là", choices: ["6", "3", "4", "5"], correctIndex: 2 },
      { content: "Khi cho kim loại Cu phản ứng với HNO3 tạo thành khí độc hại. Biện pháp nào xử lý tốt nhất để chống ô nhiễm môi trường?", choices: ["Nút ống nghiệm bằng bông tẩm giấm.", "Nút ống nghiệm bằng bông tẩm nước vôi.", "Nút ống nghiệm bằng bông tẩm nước.", "Nút ống nghiệm bằng bông tẩm cồn."], correctIndex: 1, explanation: "Nước vôi (Ca(OH)2) hấp thụ tốt các khí NOx độc hại thoát ra." },
      { content: "Phản ứng sau đây đang ở trạng thái cân bằng: H2(g) + 1/2O2(g) ⇌ H2O(g); ΔrH°298 < 0. Tác động làm thay đổi hằng số cân bằng là:", choices: ["Thay đổi áp suất.", "Cho thêm O2.", "Thay đổi nhiệt độ.", "Cho chất xúc tác."], correctIndex: 2, explanation: "Chỉ nhiệt độ mới làm thay đổi giá trị hằng số cân bằng K; các yếu tố khác chỉ làm chuyển dịch cân bằng mà không đổi K." },
      { content: "Phản ứng hóa học của các hợp chất hữu cơ có đặc điểm là", choices: ["thường xảy ra rất chậm, nhưng hoàn toàn, không theo một hướng xác định.", "thường xảy ra chậm, không hoàn toàn, không theo một hướng nhất định.", "thường xảy ra rất nhanh, không hoàn toàn, không theo một hướng nhất định.", "thường xảy ra rất nhanh và cho một sản phẩm duy nhất."], correctIndex: 1 },
      { content: "Phương trình ion: Ca2+ + CO3^2- -> CaCO3 là của phản ứng xảy ra giữa cặp chất nào sau đây? (1) CaCl2 + Na2CO3; (2) Ca(OH)2 + CO2; (3) Ca(HCO3)2 + NaOH; (4) Ca(NO3)2 + (NH4)2CO3", choices: ["(2) và (4)", "(2) và (3)", "(1) và (4)", "(1) và (2)"], correctIndex: 2, explanation: "(2) tạo ra HCO3- chứ không phải CO3^2- trực tiếp; (3) tạo CaCO3 nhưng qua HCO3-; chỉ (1) và (4) cho đúng phương trình ion rút gọn này." },
      { content: "Sulfur tác dụng với sulfuric acid đặc, nóng: S + 2H2SO4 -> 3SO2 + 2H2O. Trong phản ứng này có tỉ lệ số nguyên tử sulfur bị khử : số nguyên tử sulfur bị oxi hoá là", choices: ["3 : 1", "1 : 2", "1 : 3", "2 : 1"], correctIndex: 1, explanation: "1 nguyên tử S (từ H2SO4) bị khử từ +6 xuống +4, 2 nguyên tử S (1 từ đơn chất S, 1 từ H2SO4) bị oxi hóa/khử theo tỉ lệ tính toán cho ra 1:2." },
      { content: "Các chất trong nhóm chất nào dưới đây đều là dẫn xuất của hydrocarbon?", choices: ["CH2Cl2, CH2Br-CH2Br, NaCl, CH3Br", "CH2Cl2, CH2Br-CH2Br, CH3Br, CH2=CHCOOH, CH3CH2OH", "CH2Br-CH2Br, CH2=CHBr, CH3Br, CH3CH3", "HgCl2, CH2Br-CH2Br, CH2=CHBr, CH3CH2Br"], correctIndex: 1 },
      { content: "Phát biểu nào sau đây là đúng?", choices: ["Ở dạng phân tử, sulfur gồm 6 nguyên tử liên kết cộng hóa trị tạo mạch vòng (S6).", "Trong phản ứng hóa học của sulfur với aluminium, iron, mercury, oxygen, Sulfur đóng vai trò là chất oxi hóa.", "Đơn chất sulfur vừa có tính oxi hóa, vừa có tính khử.", "Ở điều kiện thường, sulfur là chất rắn, màu trắng, không tan trong nước, tan nhiều trong các dung môi hữu cơ."], correctIndex: 2, explanation: "A sai vì phân tử sulfur là S8 chứ không phải S6; B sai vì với oxygen sulfur là chất khử; D sai vì sulfur có màu vàng chứ không phải màu trắng." },
      { content: "Hình dưới biểu thị sự phân li của acid có dạng HX có cùng nồng độ (X là các gốc acid khác nhau) trong nước: cốc A acid phân li yếu (1 phần), cốc B acid phân li mạnh (hoàn toàn). Phát biểu nào dưới đây không đúng?", choices: ["Dung dịch acid trong cốc A là acid yếu.", "Trong cốc B, acid HX phân li hoàn toàn tạo ion H3O+ và X-.", "Trong cốc A, acid HX phân li một phần thành các ion.", "Dung dịch acid trong cốc A có pH thấp hơn pH của cốc B."], correctIndex: 3, explanation: "Cốc A là acid yếu, ít ion H+ hơn nên pH cao hơn (không thấp hơn) so với cốc B là acid mạnh." },
      { content: "Cho sơ đồ chuyển hoá sau: X là đơn chất; qua các bước tạo Y, G, Z, W là một acid mạnh, các chất X, Y, G, Z, W cùng chứa một nguyên tố hoá học. X có thể là", choices: ["Nitrogen và sulfur.", "Carbon và nitrogen.", "Sulfur và carbon.", "Chlorine và carbon."], correctIndex: 0, explanation: "Sơ đồ phù hợp cả với chuỗi N2->NO->NO2->HNO3 và S->SO2->SO3->H2SO4." },
      { content: "Cho dòng điện chạy qua dung dịch nước của một chất (X), thấy đèn sáng tỏ. Cho các phát biểu sau: (a) Dung dịch chất (X) là chất điện li mạnh. (b) Trong dung dịch (X) có các ion dương và âm. (c) Chất (X) ở dạng rắn khan cũng dẫn điện. (d) Dung dịch (X) có thể là acid mạnh, base mạnh, muối tan. Phát biểu không đúng là", choices: ["(d)", "(a)", "(b)", "(c)"], correctIndex: 3, explanation: "Chất rắn khan không có ion tự do di chuyển nên không dẫn điện, chỉ dẫn điện khi ở dạng dung dịch hoặc nóng chảy." },
    ],
  },
  {
    title: "Đề ôn tập học kì 1 - Đề số 4 (Lớp 11, sưu tầm)",
    grade: 11,
    chapterTitle: "Ôn tập tổng hợp Học kì 1",
    durationSec: 2520,
    questions: [
      { content: "Acid nào sau đây là acid 2 nấc?", choices: ["HCl", "HNO3", "H2SO3", "H3PO4"], correctIndex: 2 },
      { content: "Cho phản ứng tổng hợp ammonia: N2(g) + 3H2(g) ⇌ 2NH3(g). Khi giảm nồng độ NH3 (các yếu tố khác giữ nguyên) thì phản ứng sẽ chuyển dịch theo chiều", choices: ["thuận", "nghịch", "không thay đổi", "không xác định"], correctIndex: 0 },
      { content: "Chất thủy phân trong nước tạo môi trường base là", choices: ["H2SO4", "Na2SO4", "KNO3", "Na2CO3"], correctIndex: 3 },
      { content: "Tác nhân chủ yếu gây mưa axit là", choices: ["CO và CH4", "CH4 và NH3", "SO2 và NO2", "CO và CO2"], correctIndex: 2 },
      { content: "Hợp chất nào sau đây của nitrogen không được tạo ra khi cho HNO3 tác dụng với kim loại?", choices: ["NO", "NH4NO3", "NO2", "N2O5"], correctIndex: 3 },
      { content: "Chất có tính chất lưỡng tính là", choices: ["NaHCO3", "NaCl", "HCl", "NaOH"], correctIndex: 0 },
      { content: "Công thức đơn giản nhất CH là của hợp chất hữu cơ nào sau đây?", choices: ["C6H6", "C4H8", "C4H6", "C5H10"], correctIndex: 0 },
      { content: "Theo thuyết cấu tạo hóa học, nguyên tử carbon có hóa trị?", choices: ["1", "2", "3", "4"], correctIndex: 3 },
      { content: "H2SO4 đặc không được dùng để làm khô khí nào sau đây?", choices: ["O2", "CO2", "Cl2", "H2S"], correctIndex: 3, explanation: "H2SO4 đặc có tính oxi hóa mạnh, phản ứng oxi hóa H2S nên không thể dùng làm khô khí này." },
      { content: "Theo thuyết cấu tạo hóa học, các nguyên tử carbon có thể liên kết với nhau tạo thành mạch carbon nào?", choices: ["Mạch nhánh; không nhánh; mạch vòng.", "Mạch không nhánh; mạch vòng.", "Mạch nhánh; mạch vòng.", "Mạch nhánh; mạch vòng."], correctIndex: 0 },
      { content: "Công thức nào sau đây không thể là công thức phân tử của một hợp chất hữu cơ?", choices: ["C5H10", "C3H3", "C4H8O", "C2H6"], correctIndex: 1, explanation: "Với C3H3, độ bất bão hòa tính ra không phải số nguyên nên công thức này không hợp lệ." },
      { content: "Chất nào sau đây có thể làm khô khí NH3 có lẫn hơi nước?", choices: ["H2SO4 đặc", "HCl đặc", "NaOH rắn", "P2O5"], correctIndex: 2, explanation: "H2SO4 đặc và HCl đặc, P2O5 đều phản ứng với NH3 (base); chỉ NaOH rắn hút ẩm mà không phản ứng với NH3." },
      { content: "Chất nào sau đây không dẫn điện được?", choices: ["NaOH nóng chảy", "HBr hòa tan trong nước", "KCl rắn, khan", "CaCl2 nóng chảy"], correctIndex: 2 },
      { content: "Saccharose là hợp chất hữu cơ có nhiều trong các cây mía nên thường được gọi là đường mía. Công thức phân tử của saccharose là C12H22O11. Công thức đơn giản nhất của saccharose là", choices: ["C12H22O11", "C3H6O3", "C2HO2", "C6H11O11"], correctIndex: 0, explanation: "12, 22, 11 không có ước chung lớn hơn 1 nên công thức đơn giản nhất trùng với công thức phân tử." },
      { content: "Trong các hợp chất hoá học sau, hợp chất nào nitrogen có số oxi hóa thấp nhất?", choices: ["(NH4)2SO4", "N2", "NO2", "HNO2"], correctIndex: 0, explanation: "N trong NH4+ có số oxi hóa -3, thấp nhất trong các phương án." },
      { content: "Cho ZnO tác dụng với HNO3 thì sản phẩm thu được là", choices: ["Zn(NO3)2, N2", "Zn(NO3)2, NO2, H2O", "Zn(NO3)2, NO, H2O", "Zn(NO3)2, H2O"], correctIndex: 3, explanation: "ZnO là oxide base thông thường (Zn đã ở số oxi hóa +2 ổn định), phản ứng chỉ là trao đổi, không phải oxi hóa khử." },
      { content: "Hợp chất hữu cơ nào sau đây có mạch carbon phân nhánh?", choices: ["H3C-CH(CH3)-CH3 (isobutane)", "Vòng benzene", "H3C-CH2-CH2-CH3", "Cyclobutane (vòng 4 cạnh)"], correctIndex: 0 },
      { content: "Theo thuyết cấu tạo hóa học, chất nào sau đây là đúng về hóa trị của carbon?", choices: ["HO-CH3-CH=O", "CH3-CH=CH2-CH3", "CH≡CH-CH2-CH3", "CH3-CH2-CH2-CH(CH3)2"], correctIndex: 3, explanation: "Các công thức A, B, C vẽ carbon với số liên kết không đúng hóa trị IV." },
      { content: "Xét cân bằng C(s) + CO2(g) ⇌ 2CO(g). Yếu tố nào sau đây không ảnh hưởng tới cân bằng của hệ?", choices: ["khối lượng carbon", "nồng độ CO2", "Áp suất", "nhiệt độ"], correctIndex: 0, explanation: "Carbon là chất rắn, không có mặt trong biểu thức hằng số cân bằng nên khối lượng của nó không ảnh hưởng đến cân bằng." },
      { content: "Phương trình 2H+ + S2- -> H2S là phương trình ion rút gọn của phản ứng", choices: ["K2S + HCl -> H2S + KCl", "BaS + H2SO4 -> BaSO4 + H2S", "FeS + HCl -> FeCl2 + H2S", "H2SO4 + Mg -> MgSO4 + H2S + H2O"], correctIndex: 0, explanation: "K2S tan hoàn toàn trong nước nên phản ứng với HCl cho đúng phương trình ion rút gọn này; các phương án khác có chất rắn không tan tham gia." },
      { content: "Dựa vào phổ hồng ngoại (IR) của hợp chất X có công thức CH3COCH3 dưới đây, hãy chỉ ra peak nào giúp dự đoán X có nhóm C=O?", choices: ["(4)", "(1)", "(2)", "(3)"], correctIndex: 1 },
      { content: "Có 4 dung dịch trong 4 lọ mất nhãn: ammonium sulfate, ammonium chloride, sodium sulfate, sodium hidroxide. Nếu chỉ được phép dùng một thuốc thử để nhận biết 4 chất lỏng trên ta có thể dùng thuốc thử nào sau đây?", choices: ["dung dịch Ba(OH)2", "dung dịch KOH", "dung dịch BaCl2", "dung dịch AgNO3"], correctIndex: 0, explanation: "Ba(OH)2 vừa tạo khí mùi khai với 2 muối ammonium, vừa tạo kết tủa trắng với sodium sulfate, phân biệt được cả 4 chất." },
      { content: "Nung một hợp chất hữu cơ X với lượng dư chất oxi hóa CuO thấy thoát ra khí CO2, hơi nước và khí N2. Chọn kết luận đúng nhất.", choices: ["X là hợp chất chứa nguyên tố C, H, N, O.", "X là hợp chất chỉ chứa nguyên tố C, H, N.", "X luôn có chứa C, H và có thể không có N.", "X chắc chắn chứa C, H, N và có thể có O."], correctIndex: 3, explanation: "Oxygen trong sản phẩm có thể đến từ CuO (chất oxi hóa dùng dư) nên không thể khẳng định chắc chắn X có O." },
      { content: "Cho sơ đồ chuyển hoá sau: X --+O2(Pt)--> Y --O2--> Z --+O2+H2O--> W. Biết rằng X, Y, Z, W đều chứa nitrogen; X và W có thể phản ứng với nhau tạo thành muối tan trong nước. Chất X phù hợp với sơ đồ trên là", choices: ["NO2", "NH3", "NO", "HNO3"], correctIndex: 1, explanation: "Sơ đồ tương ứng NH3->NO->NO2->HNO3, và NH3 + HNO3 -> NH4NO3 (muối tan)." },
      { content: "Một bình kín chứa đầy chất khí X, đậy kín bình bằng nút cao su có ống dẫn buộc một quả bóng bay. Mở nút cao su, cho nhanh chất lỏng Y vào, đậy nút ngay lập tức, quan sát thấy quả bóng dần được thổi căng lên. Chất X và Y phù hợp với thí nghiệm là", choices: ["N2 và NaOH.", "NH3 và H2SO4.", "H2 và nước.", "CO2 và HCl."], correctIndex: 1, explanation: "NH3 phản ứng mạnh và tan nhanh trong H2SO4 làm giảm đột ngột áp suất khí trong bình, hút quả bóng bay phồng lên." },
      { content: "Số đồng phân mạch hở ứng với công thức phân tử C3H6O là", choices: ["5", "2", "3", "4"], correctIndex: 3 },
      { content: "Cho sơ đồ chuyển hoá giữa nitrogen và hợp chất như sau (mỗi mũi tên là một phản ứng): N2 <-(2)-> NH3, NH3 -(3)+O2(Pt)-> NO, NO -(4)+O2-> NO2, NO2 -(1)-> N2. Phản ứng không thể thực hiện được trong sơ đồ trên là", choices: ["(4)", "(1)", "(2)", "(3)"], correctIndex: 1, explanation: "Không có phản ứng thông thường nào chuyển trực tiếp NO2 thành N2." },
      { content: "Cho hình vẽ của bộ dụng cụ chưng cất thường với các chi tiết đánh số 1-5. Tên các chi tiết ứng với các chữ số trong hình vẽ là", choices: ["1-Nhiệt kế, 2-đèn cồn, 3-bình cầu có nhánh, 4-sinh hàn, 5-bình hứng (erlen).", "1-Đèn cồn, 2-bình cầu có nhánh, 3-nhiệt kế, 4-sinh hàn, 5-bình hứng (erlen).", "1-Đèn cồn, 2-nhiệt kế, 3-sinh hàn, 4-bình hứng (erlen), 5-bình cầu có nhánh.", "1-Nhiệt kế, 2-bình cầu có nhánh, 3-đèn cồn, 4-sinh hàn, 5-bình hứng (erlen)."], correctIndex: 1 },
    ],
  },
  {
    title: "Đề ôn tập học kì 1 - Đề số 5 (Lớp 11, sưu tầm)",
    grade: 11,
    chapterTitle: "Ôn tập tổng hợp Học kì 1",
    durationSec: 2520,
    questions: [
      { content: "Dung dịch nào sau đây có khả năng dẫn điện?", choices: ["Dung dịch đường", "Dung dịch rượu", "Dung dịch muối ăn", "Dung dịch benzene trong alcohol"], correctIndex: 2 },
      { content: "Trong dung dịch nitric acid (bỏ qua sự phân li của H2O) có những phần tử nào?", choices: ["H+, NO3-, HNO3, H2O", "H+, NO3-", "H+, NO3-, H2O", "H+, NO3-, HNO3"], correctIndex: 2, explanation: "HNO3 là chất điện li mạnh, phân li hoàn toàn trong nước nên không còn tồn tại ở dạng phân tử." },
      { content: "Người bị đau dạ dày thường bị dư thừa acid. Người bị đau dạ dày không nên sử dụng nhiều sản phẩm nào sau đây?", choices: ["Sữa (pH = 6,5)", "Nước sô đa (pH = 8,5)", "Nước tinh khiết (pH = 7)", "Nước chanh (pH ≈ 2,5)"], correctIndex: 3, explanation: "Nước chanh có pH thấp (tính acid mạnh) sẽ làm dạ dày dư acid thêm trầm trọng." },
      { content: "Sulfuric acid đặc, nguội có thể đựng trong bình chứa làm bằng", choices: ["Al", "Ag", "Ca", "Cu"], correctIndex: 0, explanation: "Al (và Fe) bị thụ động hóa trong H2SO4 đặc nguội nên có thể dùng làm bình chứa." },
      { content: "Sulfur dioxide thể hiện tính chất của một acidic oxide khi tác dụng với dung dịch nào sau đây?", choices: ["CH3OH", "KOH", "HCl", "KCl"], correctIndex: 1 },
      { content: "Để biết rõ số lượng nguyên tử, thứ tự liên kết của các nguyên tử trong phân tử hợp chất hữu cơ người ta dùng công thức nào sau đây?", choices: ["Công thức đơn giản nhất", "Công thức phân tử", "Công thức tổng quát", "Công thức cấu tạo"], correctIndex: 3 },
      { content: "Muối Na2SO3 có tên là", choices: ["Sodium sulfate", "Sodium sulfide", "Sodium sulfuric", "Sodium sulfurous"], correctIndex: 3 },
      { content: "HNO3 tinh khiết là chất lỏng không màu, nhưng dung dịch HNO3 để lâu thường ngả sang màu vàng là do", choices: ["Dung dịch HNO3 có tính oxi hóa mạnh.", "Dung dịch HNO3 có hoà tan một lượng nhỏ NO2.", "HNO3 tan nhiều trong nước.", "Khi để lâu thì HNO3 bị khử bởi các chất của môi trường"], correctIndex: 1, explanation: "HNO3 phân hủy một phần dưới ánh sáng tạo NO2 hòa tan trở lại, gây màu vàng." },
      { content: "Chọn hiện tượng đúng khi nhỏ vài giọt H2SO4 đặc lên tờ giấy trắng?", choices: ["Giấy có màu vàng của S.", "Giấy chỉ bị ướt, không thay đổi màu.", "Giấy không bị thấm ướt.", "Giấy có màu đen của carbon."], correctIndex: 3, explanation: "H2SO4 đặc có tính háo nước mạnh, than hóa cellulose trong giấy thành carbon màu đen." },
      { content: "Hợp chất hữu cơ có nhóm -NH2 (amine, ví dụ CH3-NH2) thể hiện tính chất đặc trưng của nhóm chức nào?", choices: ["amine", "carboxylic acid", "alcohol", "ester"], correctIndex: 0 },
      { content: "Dựa vào phổ hồng ngoại (IR) của hợp chất X có công thức CH3CH(OH)CH3 dưới đây, hãy chỉ ra peak nào giúp dự đoán X có nhóm -OH?", choices: ["(1)", "(2)", "(3)", "(4)"], correctIndex: 0 },
      { content: "Theo thuyết cấu tạo hóa học, chất nào sau đây là đúng về hóa trị của carbon?", choices: ["HO-CH3-CH=O", "CH3-CH=CH2-CH3", "CH≡CH-CH2-CH3", "CH3-CH2-CH2-CH(CH3)2"], correctIndex: 3 },
      { content: "Cho công thức cấu tạo của X: CH3-CH=CH-CH2-OH. Vậy công thức phân tử của chất X là", choices: ["C4H8O", "C5H8O", "C4H10O", "C5H10O"], correctIndex: 0 },
      { content: "Hấp phụ là quá trình xảy ra khi", choices: ["Chất A bị chất rắn B thay đổi trạng thái tồn tại từ lỏng sang khí.", "Chất A hoà tan vào dung môi tốt hơn nhờ chất rắn", "Chất A bị giữ lại bên trong chất rắn B làm tăng nồng độ chất A bên trong chất rắn", "Chất A bị giữ lại trên bề mặt chất rắn B."], correctIndex: 3 },
      { content: "Trong các dãy chất sau đây, dãy nào gồm các chất là đồng đẳng của nhau?", choices: ["C2H4, C3H6, C4H6", "HCOOCH3, HCOOC2H5, CH3COOC2H5", "C2H5OH, C4H9OH", "CH3-CO-CH3, CH3CH=O"], correctIndex: 1, explanation: "3 ester này hơn kém nhau nguyên nhóm CH2 và cùng một loại nhóm chức (ester) nên là đồng đẳng của nhau." },
      { content: "Hiện tượng xảy ra khi cho giấy quỳ tím khô vào bình đựng khí ammonia là", choices: ["giấy quỳ chuyển sang màu đỏ.", "giấy quỳ chuyển sang màu xanh.", "giấy quỳ mất màu.", "giấy quỳ không chuyển màu."], correctIndex: 3, explanation: "Quỳ tím khô, không có nước nên NH3 chưa ion hóa được để đổi màu giấy quỳ." },
      { content: "Phát biểu nào dưới đây là đúng?", choices: ["NH3 là chất khử mạnh, tính base yếu.", "NH3 có tính oxi hóa mạnh, tính base yếu.", "NH3 là chất oxi hóa mạnh, tính acid mạnh.", "NH3 có tính khử mạnh, tính base mạnh."], correctIndex: 0 },
      { content: "Hình dưới đây mô tả một số ứng dụng: chất trung gian sản xuất sulfuric acid, tẩy trắng bột giấy/khử màu sản xuất đường/chống nấm mốc, dung môi phân cực. Vậy chất X là", choices: ["Sulfuric acid", "Sodium sulfate", "Sulfur", "Sulfur dioxide"], correctIndex: 3 },
      { content: "Cho biết phổ khối lượng (MS) của naphtalene có peak lớn nhất tại m/z = 128. Phân tử khối của naphtalene là", choices: ["128", "51", "64", "102"], correctIndex: 0 },
      { content: "Trong các hợp chất sau: C2H2, CH3COOH, Al4C3, CH4, CCl4, CaC2, CO2, CH3Cl, C2H5OH. Dãy gồm các chất hữu cơ là", choices: ["C2H2, CH3COOH, CH4, CH3Cl, C2H5OH, CaC2", "C2H2, CH3COOH, Al4C3, CH4, CH3Cl, C2H5OH", "C2H2, CH3COOH, CH4, CCl4, CH3Cl, C2H5OH", "C2H2, CH3COOH, CO2, CH3Cl, C2H5OH"], correctIndex: 2, explanation: "Al4C3, CaC2, CO2 là các hợp chất vô cơ (carbide kim loại và carbon dioxide), không phải hợp chất hữu cơ." },
      { content: "Hình vẽ mô tả điều chế khí SO2 trong phòng thí nghiệm từ rắn X và dung dịch H2SO4. Trong thí nghiệm trên, X là chất nào?", choices: ["X là NaHSO4", "X là Na2SO3", "X là FeS", "X là Na2SO4"], correctIndex: 1 },
      { content: "Cho các dung dịch muối: Na2CO3 (1), NaNO3 (2), NaNO2 (3), NaCl (4), Na2SO4 (5), CH3COONa (6), NH4HSO4 (7), Na2S (8). Những dung dịch muối làm quỳ hoá xanh là", choices: ["(1), (3), (5), (6)", "(1), (3), (6), (8)", "(2), (5), (6), (7)", "(1), (2), (3), (4)"], correctIndex: 1, explanation: "Na2CO3, NaNO2, CH3COONa, Na2S đều là muối của base mạnh - acid yếu, thủy phân tạo môi trường base." },
      { content: "Cho FeS tác dụng với dung dịch H2SO4 loãng, thu được khí (A); nếu dùng dung dịch H2SO4 đặc, nóng thì thu được khí (B). Dẫn khí (B) vào dung dịch của (A) thu được rắn (C). Các chất (A), (B), (C) lần lượt là", choices: ["H2, SO2, S", "O2, SO2, SO3", "H2, H2S, S", "H2S, SO2, S"], correctIndex: 3, explanation: "FeS + H2SO4 loãng -> H2S; FeS + H2SO4 đặc nóng -> SO2; 2H2S + SO2 -> 3S + 2H2O." },
      { content: "Dãy chất nào sau đây khi tan trong nước đều là chất điện li mạnh?", choices: ["NaOH, NaCl, Na2SO4, HNO3", "CH3COOH, NaOH, CH3COONa, Ba(OH)2", "Cu(OH)2, NaCl, C2H5OH, HCl", "C6H12O6, Na2SO4, NaNO3, H2SO4"], correctIndex: 0 },
      { content: "Cho sulfur lần lượt phản ứng với các chất sau ở điều kiện thích hợp: iron, hydrogen, fluorine, mercury, potassium chlorate. Số phản ứng mà sulfur là chất oxi hóa là", choices: ["4", "3", "2", "1"], correctIndex: 1, explanation: "Với iron, hydrogen, mercury: S nhận electron (là chất oxi hóa) tạo FeS, H2S, HgS — 3 phản ứng; với fluorine và potassium chlorate, S bị oxi hóa (là chất khử)." },
      { content: "Số đồng phân của hợp chất có công thức phân tử C4H9Cl là", choices: ["2", "3", "4", "5"], correctIndex: 2 },
      { content: "Cho sơ đồ chuyển hoá giữa nitrogen và hợp chất: N2 -> NH3 -(1)-> NO -(2)-> NO2 -(3)-> HNO3. Phát biểu nào sau đây không đúng?", choices: ["Nitrogen dioxide có thể trực tiếp tạo thành khi nitrogen phản ứng với oxygen dư.", "Quá trình (I) -> (II) -> (III) giải thích sự tạo thành nitric acid khi mưa dông kèm sấm chớp.", "Các phản ứng trong sơ đồ đều là phản ứng oxi hoá - khử.", "Quá trình (1) -> (2) -> (3) dùng sản xuất nitric acid trong công nghiệp."], correctIndex: 0, explanation: "Nitrogen phản ứng với oxygen (dù dư) chỉ tạo trực tiếp NO, không tạo thẳng NO2." },
      { content: "Tiến hành thí nghiệm nạp khí ammonia vào bình thủy tinh, nhúng đầu ống vào chậu nước có pha phenolphthalein. Cho các phát biểu: (1) Một lát sau nước trong chậu phun vào bình thành những tia có màu hồng. (2) Phenolphthalein chuyển sang màu hồng, chứng tỏ dung dịch thu được có tính acid. (3) Khí ammonia tan nhiều trong nước, làm giảm áp suất trong bình và nước bị hút vào bình. (4) Nếu thay khí NH3 bằng HCl thì hiện tượng thu được ở bước hai xảy ra tương tự. (5) Thí nghiệm này chứng minh, ammonia là một chất có tính khử mạnh. Số phát biểu đúng là", choices: ["2", "4", "3", "5"], correctIndex: 0, explanation: "Chỉ (1) và (3) đúng: (2) sai vì màu hồng chứng tỏ tính base chứ không phải acid; (4) sai vì HCl tạo dung dịch acid, không làm phenolphthalein hồng; (5) sai vì thí nghiệm thể hiện độ tan/tính base, không phải tính khử." },
    ],
  },
];

async function main() {
  const l11ReviewHk1 = await getOrCreateChapter(11, "Ôn tập tổng hợp Học kì 1", 7);
  const chapterMap = {
    "Ôn tập tổng hợp Học kì 1": l11ReviewHk1,
  };

  let totalQuestions = 0;
  for (const exam of exams) {
    const chapter = chapterMap[exam.chapterTitle];
    if (!chapter) throw new Error(`Không tìm thấy chương: ${exam.chapterTitle}`);

    const existing = await prisma.quiz.findFirst({ where: { title: exam.title } });
    if (existing) {
      console.log(`Bỏ qua (đã tồn tại): ${exam.title}`);
      continue;
    }

    await prisma.quiz.create({
      data: {
        title: exam.title,
        grade: exam.grade,
        chapterId: chapter.id,
        durationSec: exam.durationSec ?? 2700,
        questions: {
          create: exam.questions.map((q, i) => ({
            order: i + 1,
            content: q.content,
            choices: JSON.stringify(q.choices),
            correctIndex: q.correctIndex,
            explanation: q.explanation ?? null,
          })),
        },
      },
    });
    totalQuestions += exam.questions.length;
    console.log(`Đã thêm: ${exam.title} (${exam.questions.length} câu)`);
  }

  console.log(`\nTổng: ${exams.length} đề, ${totalQuestions} câu hỏi.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
