import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AG: bài tập mining từ SBT Hóa 11 - Kết nối tri thức thật (Tài liệu/Lớp 11/Đại cương hóa
// hữu cơ/Đại cương hữu cơ.zip -> "(TỜ 17) Chuong III - BT Hoa 11 - KNTT.pdf", đọc bằng
// pdftoppm + thị giác). Chỉ lấy câu SINGLE_CHOICE — bỏ qua Đúng/Sai nhóm, câu hỏi cần hình vẽ
// công thức cấu tạo/phổ để xác định số liệu, và câu tự luận. Đáp án tự giải bằng kiến thức
// hóa học và kiểm chứng lại trước khi đưa vào (SBT không in đáp án).
const CHAPTER_ID = "cmrelkaw60002vhuscsw7libn"; // Lớp 11 - Chương 3. Đại cương về hóa học hữu cơ

const QUESTIONS = [
  // Bài 10. Hợp chất hữu cơ và hoá học hữu cơ
  {
    content: "Hợp chất hữu cơ là các hợp chất của ......... (trừ các oxide của carbon, muối carbonate, cyanide, carbide,...). Từ thích hợp điền vào chỗ trống trong định nghĩa trên là",
    choices: ["carbon.", "hydrogen.", "oxygen.", "nitrogen."],
    correctIndex: 0,
    explanation: "Hợp chất hữu cơ là hợp chất của carbon (trừ CO, CO2, muối carbonate, cyanide, carbide,...).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Xét phản ứng quang hợp: 6CO2 + 6H2O → C6H12O6 + 6O2. Chất nào trong phản ứng này thuộc loại hợp chất hữu cơ?",
    choices: ["CO2.", "H2O.", "C6H12O6.", "O2."],
    correctIndex: 2,
    explanation: "C6H12O6 (glucose) là hợp chất hữu cơ; CO2, H2O, O2 đều là hợp chất/đơn chất vô cơ.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hoá học hữu cơ là ngành hoá học chuyên nghiên cứu về các ........... Cụm từ thích hợp điền vào chỗ trống trong định nghĩa trên là",
    choices: ["hợp chất hữu cơ.", "hợp chất vô cơ.", "hợp chất thiên nhiên.", "hợp chất phức."],
    correctIndex: 0,
    explanation: "Hoá học hữu cơ là ngành hoá học nghiên cứu về các hợp chất hữu cơ.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhận xét nào dưới đây về đặc điểm chung của các chất hữu cơ KHÔNG đúng?",
    choices: [
      "Các hợp chất hữu cơ thường khó bay hơi, bền với nhiệt và khó cháy.",
      "Liên kết hoá học chủ yếu trong các phân tử hợp chất hữu cơ là liên kết cộng hoá trị.",
      "Các hợp chất hữu cơ thường không tan hoặc ít tan trong nước, tan trong dung môi hữu cơ.",
      "Các phản ứng hoá học của hợp chất hữu cơ thường xảy ra chậm và theo nhiều hướng khác nhau tạo ra một hỗn hợp các sản phẩm.",
    ],
    correctIndex: 0,
    explanation: "Trái lại, hợp chất hữu cơ thường dễ bay hơi, kém bền với nhiệt (dễ phân huỷ) và dễ cháy do nhiệt độ nóng chảy/sôi thấp.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hydrocarbon là loại hợp chất hữu cơ mà thành phần phân tử có các nguyên tố nào sau đây?",
    choices: ["C và H.", "C, H và O.", "C, H và N.", "C, H, O và N."],
    correctIndex: 0,
    explanation: "Hydrocarbon chỉ chứa 2 nguyên tố carbon và hydrogen.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhóm chức là ......... gây ra những phản ứng đặc trưng của phân tử hợp chất hữu cơ. Cụm từ thích hợp điền vào chỗ trống trong phát biểu trên là",
    choices: ["nguyên tử.", "phân tử.", "nhóm nguyên tử.", "nguyên tử hoặc nhóm nguyên tử."],
    correctIndex: 3,
    explanation: "Nhóm chức là nguyên tử hoặc nhóm nguyên tử gây ra những phản ứng hoá học đặc trưng của phân tử hợp chất hữu cơ (vd -OH, -COOH đều được gọi là nhóm chức dù chỉ 1 hay nhiều nguyên tử).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phổ hồng ngoại là phương pháp vật lí rất quan trọng và phổ biến để nghiên cứu về",
    choices: [
      "thành phần nguyên tố chất hữu cơ.",
      "thành phần phân tử hợp chất hữu cơ.",
      "cấu tạo hợp chất hữu cơ.",
      "cấu trúc không gian hợp chất hữu cơ.",
    ],
    correctIndex: 2,
    explanation: "Phổ hồng ngoại (IR) giúp xác định các nhóm chức có trong phân tử, qua đó cho biết thông tin về cấu tạo hợp chất hữu cơ.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Xét các chất CH4, HCN, CO2, CH2=CH2, CH3CH=O, Na2CO3, CH3COONa, H2NCH2COOH và Al4C3. Trong các chất này, số hợp chất hữu cơ là",
    choices: ["3.", "4.", "5.", "6."],
    correctIndex: 2,
    explanation: "Hợp chất hữu cơ gồm: CH4, CH2=CH2, CH3CH=O, CH3COONa, H2NCH2COOH (5 chất). HCN, CO2, Na2CO3, Al4C3 bị loại trừ theo định nghĩa (cyanide, oxide của carbon, carbonate, carbide).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phân tử chất nào sau đây không chỉ chứa liên kết cộng hoá trị?",
    choices: ["CH3CH2OH.", "CH3CH=O.", "CH≡CH.", "CH3COONa."],
    correctIndex: 3,
    explanation: "CH3COONa có liên kết ion giữa Na+ và gốc CH3COO-, còn lại đều là hợp chất hữu cơ trung hoà chỉ chứa liên kết cộng hoá trị.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong các chất sau đây, chất nào dễ cháy nhất?",
    choices: ["CO2.", "C2H5OH.", "Na2CO3.", "N2."],
    correctIndex: 1,
    explanation: "C2H5OH (ethanol) là hợp chất hữu cơ dễ cháy; CO2, Na2CO3, N2 đều không cháy được (CO2 là sản phẩm cháy, N2 trơ, Na2CO3 là muối vô cơ).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các hợp chất sau: CH4; NH3; C2H2; CCl4; C2H4; C6H6. Số hợp chất thuộc loại hydrocarbon là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 3,
    explanation: "Hydrocarbon (chỉ chứa C và H): CH4, C2H2, C2H4, C6H6 (4 chất). NH3 không chứa C, CCl4 không chứa H nên đều không phải hydrocarbon.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhận định nào sau đây không đúng?",
    choices: [
      "CH4, CH2=CH2 và CH≡CH là những hydrocarbon.",
      "CH3OH và HOCH2–CH2OH là những alcohol.",
      "CH3COOH và CH2(COOH)2 là những carboxylic acid.",
      "CH3CH=O và CH3COCH3 là những aldehyde.",
    ],
    correctIndex: 3,
    explanation: "CH3COCH3 (acetone) là ketone chứ không phải aldehyde nên nhận định D sai; ba nhận định còn lại đều đúng.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Xét các chất: CH3-CH2OH (1); CH2(OH)-CH2(OH) (2); CH2(OH)-CH(OH)-CH2(OH) (3); CH3-CH(OH)-COOH (4); H2N-[CH2]6-NH2 (5); HOOC-[CH2]2-CH(NH2)-COOH (6); HOOC-[CH2]3-COOH (7). Nhận định nào sau đây không đúng?",
    choices: [
      "Số hợp chất hữu cơ đa chức (có 2 nhóm chức giống nhau trở lên) bằng 4.",
      "Số hợp chất hữu cơ tạp chức (có 2 nhóm chức khác nhau trở lên) bằng 2.",
      "Số hợp chất hữu cơ thuộc loại alcohol bằng 3.",
      "Số hợp chất hữu cơ thuộc loại carboxylic acid bằng 3.",
    ],
    correctIndex: 3,
    explanation: "Chỉ có chất (7) HOOC[CH2]3COOH thuộc loại carboxylic acid thuần (2 nhóm COOH giống nhau) → chỉ 1 chất, không phải 3 (chất (4), (6) là tạp chức nên không tính riêng là carboxylic acid). Đa chức: (2),(3),(5),(7) = 4 (đúng). Tạp chức: (4),(6) = 2 (đúng). Alcohol thuần: (1),(2),(3) = 3 (đúng).",
    difficulty: "VAN_DUNG",
  },
  // Bài 11. Phương pháp tách biệt và tinh chế hợp chất hữu cơ
  {
    content: "Chưng cất là phương pháp tách chất dựa vào sự khác nhau về tính chất vật lí (ở một áp suất nhất định) nào sau đây của các chất trong hỗn hợp?",
    choices: ["Nhiệt độ sôi.", "Nhiệt độ nóng chảy.", "Độ tan.", "Màu sắc."],
    correctIndex: 0,
    explanation: "Chưng cất tách các chất lỏng dựa vào sự khác nhau về nhiệt độ sôi ở áp suất xác định.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chiết là phương pháp dùng một dung môi thích hợp hoà tan chất cần tách chuyển sang pha lỏng (gọi là dịch chiết) và chất này được tách ra khỏi hỗn hợp các chất còn lại. Tách lấy dịch chiết, giải phóng dung môi sẽ thu được",
    choices: ["chất cần tách.", "các chất còn lại.", "hỗn hợp ban đầu.", "hợp chất khí."],
    correctIndex: 0,
    explanation: "Sau khi loại bỏ dung môi khỏi dịch chiết, chất cần tách (đã hoà tan trong dung môi) sẽ được thu lại.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dung môi thích hợp được lựa chọn trong phương pháp kết tinh thường là dung môi trong đó độ tan của chất cần tinh chế",
    choices: [
      "không thay đổi khi thay đổi nhiệt độ của dung dịch.",
      "tăng nhanh khi tăng nhiệt độ, tan kém ở nhiệt độ thường.",
      "giảm nhanh khi tăng nhiệt độ, tan tốt ở nhiệt độ thường.",
      "lớn ở nhiệt độ thường và nhỏ ở nhiệt độ cao.",
    ],
    correctIndex: 1,
    explanation: "Cần dung môi có độ tan tăng mạnh theo nhiệt độ để hoà tan hết chất ở nhiệt độ cao, sau đó chất kết tinh trở lại khi hạ nhiệt độ do tan kém ở nhiệt độ thường.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong phương pháp sắc kí, hỗn hợp lỏng hoặc khí của các chất cần tách là pha động. Pha động tiếp xúc liên tục với pha tĩnh là một chất rắn có diện tích bề mặt rất lớn, có khả năng hấp phụ ...(1)... với các chất trong hỗn hợp cần tách, khiến cho các chất trong hỗn hợp di chuyển với tốc độ ...(2)... và tách ra khỏi nhau. Cụm từ thích hợp điền vào chỗ trống (1) và (2) lần lượt là",
    choices: [
      "(1) giống nhau và (2) giống nhau.",
      "(1) khác nhau và (2) khác nhau.",
      "(1) khác nhau và (2) giống nhau.",
      "(1) giống nhau và (2) khác nhau.",
    ],
    correctIndex: 1,
    explanation: "Pha tĩnh hấp phụ khác nhau đối với từng chất (ái lực hấp phụ khác nhau) nên các chất di chuyển với tốc độ khác nhau qua pha tĩnh, nhờ đó tách được ra khỏi nhau.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong quá trình chưng cất dầu thô, người ta thu được nhiều phân đoạn dầu mỏ, trong đó có xăng (thành phần chính là hỗn hợp hydrocarbon có số nguyên tử C từ 4 đến 12, nhiệt độ sôi khoảng từ 40°C đến 200°C) và dầu hoả (thành phần chính là hỗn hợp hydrocarbon có số nguyên tử C từ 12 đến 16, nhiệt độ sôi khoảng từ 200°C đến 250°C). Sản phẩm thu được ở 150°C đến 200°C là",
    choices: ["xăng.", "dầu hoả.", "xăng và dầu hoả.", "dầu hoả và xăng."],
    correctIndex: 0,
    explanation: "Khoảng 150°C-200°C nằm trọn trong khoảng sôi của xăng (40-200°C), chưa chạm ngưỡng bắt đầu của dầu hoả (200°C), nên sản phẩm thu được ở đoạn này là xăng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thêm benzene vào ống nghiệm đựng dung dịch nước bromine. Sau một thời gian quan sát thấy màu đỏ nâu của bromine",
    choices: [
      "chủ yếu trong lớp nước.",
      "chủ yếu trong lớp benzene.",
      "phân bố đồng đều ở hai lớp.",
      "bị mất màu hoàn toàn.",
    ],
    correctIndex: 1,
    explanation: "Bromine tan tốt hơn nhiều trong dung môi hữu cơ không phân cực (benzene) so với nước, nên bị chiết và tập trung ở lớp benzene, làm lớp này chuyển màu đỏ nâu đậm hơn lớp nước.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Xét ba yêu cầu: (a) không hoà tan tạp chất; (b) không có tương tác hoá học với chất kết tinh; (c) dễ bay hơi, dễ kiếm, rẻ tiền. Trong ba yêu cầu này, có bao nhiêu yêu cầu là cần thiết đối với dung môi được lựa chọn trong phương pháp kết tinh?",
    choices: ["0.", "1.", "2.", "3."],
    correctIndex: 3,
    explanation: "Cả ba yêu cầu (a), (b), (c) đều là tiêu chí cần thiết khi lựa chọn dung môi kết tinh phù hợp.",
    difficulty: "THONG_HIEU",
  },
  // Bài 12. Công thức phân tử hợp chất hữu cơ
  {
    content: "Công thức phân tử cho biết thông tin nào sau đây về phân tử hợp chất hữu cơ?",
    choices: [
      "Thành phần nguyên tố và số lượng nguyên tử của mỗi nguyên tố.",
      "Thành phần nguyên tố và tỉ lệ số lượng nguyên tử của mỗi nguyên tố.",
      "Số lượng nguyên tử mỗi nguyên tố và trật tự liên kết giữa các nguyên tử.",
      "Tỉ lệ số lượng nguyên tử của mỗi nguyên tố và trật tự liên kết giữa các nguyên tử.",
    ],
    correctIndex: 0,
    explanation: "Công thức phân tử cho biết đúng thành phần nguyên tố và số lượng nguyên tử thực của mỗi nguyên tố trong phân tử (khác công thức đơn giản nhất chỉ cho tỉ lệ).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức nào sau đây là công thức phân tử của acetic acid?",
    choices: ["CH3–COOH.", "C2H4O2.", "CH2O.", "CxHyOz."],
    correctIndex: 1,
    explanation: "Acetic acid có công thức phân tử C2H4O2 (CH3-COOH là công thức cấu tạo, CH2O chỉ là công thức đơn giản nhất).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức phân tử của methyl formate và glucose lần lượt là C2H4O2 và C6H12O6. Công thức đơn giản nhất của hai chất này là",
    choices: ["CH2O.", "C2H4O2.", "C4H8O4.", "C6H12O6."],
    correctIndex: 0,
    explanation: "Rút gọn tỉ lệ tối giản: C2H4O2 → CH2O (chia 2); C6H12O6 → CH2O (chia 6). Cả hai đều có cùng công thức đơn giản nhất CH2O.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong phương pháp phổ khối lượng, đối với các hợp chất đơn giản, thường mảnh có giá trị m/z lớn nhất ứng với mảnh ion phân tử [M+] và giá trị này bằng giá trị ....... của chất nghiên cứu. Cụm từ thích hợp điền vào chỗ trống là",
    choices: ["phân tử khối.", "nguyên tử khối.", "điện tích ion.", "khối lượng."],
    correctIndex: 0,
    explanation: "Giá trị m/z của mảnh ion phân tử [M+] (thường là mảnh có m/z lớn nhất) bằng đúng phân tử khối của chất nghiên cứu.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phổ khối lượng của phân tử acetic acid có các peak (mảnh ion) tại các giá trị m/z gồm 15, 29, 43, 45 và 60 (peak lớn nhất là ion phân tử). Phân tử khối của acetic acid bằng",
    choices: ["43.", "45.", "60.", "29."],
    correctIndex: 2,
    explanation: "Acetic acid CH3COOH có phân tử khối 60 (12×2+1×4+16×2=60), ứng với peak m/z=60 là mảnh ion phân tử [M+] lớn nhất trên phổ.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phổ khối lượng của phân tử benzene có peak ion phân tử (peak có m/z lớn nhất) tại giá trị 78. Phân tử khối của benzene bằng",
    choices: ["76.", "77.", "78.", "79."],
    correctIndex: 2,
    explanation: "Benzene C6H6 có phân tử khối = 6×12 + 6×1 = 78, khớp với peak ion phân tử [M+] tại m/z=78.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một hợp chất hữu cơ A chứa 32% C, 4% H và 64% O về khối lượng. Biết một phân tử A có 6 nguyên tử oxygen, công thức phân tử của A là",
    choices: ["C2H3O3.", "C4H6O6.", "C6H12O6.", "C6H4O6."],
    correctIndex: 1,
    explanation: "Trong 100 g A: nC=32/12≈2,667 mol; nH=4 mol; nO=64/16=4 mol → tỉ lệ C:H:O = 2,667:4:4 = 2:3:3 → công thức đơn giản nhất C2H3O3. Vì phân tử có 6 O (gấp đôi 3 O trong CT đơn giản), công thức phân tử là C4H6O6 (kiểm tra: %C=48/150=32%, %H=6/150=4%, %O=96/150=64% — khớp đề bài).",
    difficulty: "VAN_DUNG",
  },
  // Bài 13. Cấu tạo hoá học hợp chất hữu cơ
  {
    content: "Cấu tạo hoá học là ..... giữa các nguyên tử trong phân tử. Cụm từ thích hợp điền vào chỗ trống là",
    choices: ["thứ tự liên kết.", "phản ứng.", "liên kết.", "tỉ lệ số lượng."],
    correctIndex: 0,
    explanation: "Cấu tạo hoá học là thứ tự liên kết (trật tự và cách thức liên kết) giữa các nguyên tử trong phân tử.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Có 4 loại cấu tạo mạch phân tử: (a) mạch hở không phân nhánh; (b) mạch hở phân nhánh; (c) mạch vòng không phân nhánh và (d) mạch vòng phân nhánh. Trong phân tử hợp chất hữu cơ, các nguyên tử carbon có thể liên kết với chính nó hình thành bao nhiêu loại mạch?",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 3,
    explanation: "Carbon có thể tạo cả 4 loại mạch: hở không phân nhánh, hở phân nhánh, vòng không phân nhánh, vòng phân nhánh.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong các yếu tố: (a) thành phần nguyên tố; (b) số lượng nguyên tử mỗi nguyên tố và (c) thứ tự liên kết của các nguyên tử trong phân tử, thì tính chất của phân tử hợp chất hữu cơ phụ thuộc vào các yếu tố",
    choices: ["(a) và (b).", "(b) và (c).", "(a) và (c).", "(a), (b) và (c)."],
    correctIndex: 3,
    explanation: "Tính chất của hợp chất hữu cơ phụ thuộc đồng thời vào cả thành phần nguyên tố, số lượng nguyên tử mỗi nguyên tố (thành phần phân tử) và cấu tạo hoá học (thứ tự liên kết).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Những hợp chất hữu cơ khác nhau nhưng có cùng công thức phân tử được gọi là các chất",
    choices: ["đồng phân của nhau.", "đồng đẳng của nhau.", "đồng vị của nhau.", "đồng khối của nhau."],
    correctIndex: 0,
    explanation: "Đồng phân là các chất có cùng công thức phân tử nhưng khác nhau về cấu tạo hoá học.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Các chất hữu cơ có tính chất hoá học tương tự nhau và thành phần phân tử hơn kém nhau một hay nhiều nhóm CH2 được gọi là các chất",
    choices: ["đồng phân của nhau.", "đồng đẳng của nhau.", "đồng vị của nhau.", "đồng khối của nhau."],
    correctIndex: 1,
    explanation: "Đồng đẳng là các chất có cấu tạo và tính chất hoá học tương tự nhau, thành phần phân tử hơn kém nhau một hay nhiều nhóm CH2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức nào dưới đây là công thức cấu tạo?",
    choices: ["HOCH2CH2OH.", "C2H6O2.", "CH2O.", "CnH3nOn."],
    correctIndex: 0,
    explanation: "HOCH2CH2OH biểu diễn rõ trật tự liên kết giữa các nguyên tử nên là công thức cấu tạo; C2H6O2 là công thức phân tử, CH2O là công thức đơn giản nhất, CnH3nOn là công thức tổng quát.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cặp chất nào dưới đây là đồng đẳng của nhau?",
    choices: [
      "CH3CH=CH2 và CH3–CH2–CH2–CH3.",
      "CH2=CH–CH=CH2 và CH3C≡CH.",
      "CH3CH2CH2CH3 và (CH3)2CHCH3.",
      "CH2=CH–CH=CH2 và CH2=C(CH3)–CH=CH2.",
    ],
    correctIndex: 3,
    explanation: "Hai chất ở đáp án D đều là hydrocarbon diene (mạch chứa 2 liên kết đôi), hơn kém nhau đúng 1 nhóm CH2 → đồng đẳng. A là alkene và alkane (khác loại), B là diene và alkyne (khác loại), C có cùng công thức phân tử C4H10 nên là đồng phân chứ không phải đồng đẳng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cặp chất nào dưới đây là đồng đẳng của nhau?",
    choices: [
      "CH3OH và CH3CH2CH2CH2OH.",
      "CH3CH2OH và HOCH2CH2OH.",
      "CH3CH2CHO và CH3COCH2CH3.",
      "CH3COOH và CH3COOCH3.",
    ],
    correctIndex: 0,
    explanation: "CH3OH và CH3CH2CH2CH2OH đều là alcohol đơn chức, hơn kém nhau 3 nhóm CH2 → đồng đẳng. B là alcohol đơn chức và đa chức (khác loại), C là aldehyde và ketone (khác loại), D là acid và ester (khác loại).",
    difficulty: "THONG_HIEU",
  },
  // Bài 14. Ôn tập chương 3
  {
    content: "Cho các phát biểu sau: (1) Phân tử hợp chất hữu cơ nhất thiết phải chứa carbon; (2) Liên kết chủ yếu trong phân tử hợp chất hữu cơ là liên kết ion; (3) Hợp chất hữu cơ thường khó nóng chảy và khó bay hơi; (4) Hợp chất hữu cơ thường không tan hoặc ít tan trong nước; (5) Phản ứng của các hợp chất hữu cơ thường chậm, không hoàn toàn, không theo một hướng nhất định; (6) Các hợp chất hữu cơ thường khó cháy và khó bị phân huỷ dưới tác dụng của nhiệt. Số phát biểu đúng là",
    choices: ["3.", "4.", "5.", "6."],
    correctIndex: 0,
    explanation: "Đúng: (1), (4), (5). Sai: (2) liên kết chủ yếu là cộng hoá trị chứ không phải ion; (3) hợp chất hữu cơ thường dễ nóng chảy, dễ bay hơi; (6) hợp chất hữu cơ thường dễ cháy, dễ bị phân huỷ bởi nhiệt.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho hợp chất hữu cơ X là L-serine, có công thức cấu tạo HOCH2-CH(NH2)-COOH. X không chứa loại nhóm chức nào sau đây?",
    choices: ["Alcohol.", "Aldehyde.", "Amine.", "Carboxyl."],
    correctIndex: 1,
    explanation: "L-serine chứa nhóm -OH (alcohol), -NH2 (amine) và -COOH (carboxyl), nhưng không có nhóm -CHO (aldehyde).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các hợp chất hữu cơ sau: (1) CH4; (2) CH3OH; (3) CH2=CH2; (4) CH2OH-CHOH-CH2OH; (5) CH≡CH; (6) CH3CH=O; (7) CH3COOH; (8) HOOC[CH2]4COOH; (9) C6H6 (benzene); (10) H2NCH2COOH; (11) CH2OH[CHOH]4CH=O. Nhận định nào sau đây không đúng?",
    choices: [
      "Có hai hợp chất hữu cơ đa chức và hai hợp chất hữu cơ tạp chức.",
      "Có hai hợp chất thuộc loại alcohol và ba hợp chất thuộc loại carboxylic acid.",
      "Có bốn hợp chất thuộc loại hydrocarbon, trong đó có hai hydrocarbon không no.",
      "Có bảy hợp chất thuộc loại dẫn xuất của hydrocarbon, trong đó ba hợp chất đơn chức.",
    ],
    correctIndex: 1,
    explanation: "Chỉ có (7) CH3COOH và (8) HOOC[CH2]4COOH thuộc loại carboxylic acid thuần (2 chất, không phải 3); (10) và (11) là tạp chức nên không tính là carboxylic acid riêng. Alcohol thuần: (2), (4) = 2 (đúng). Đa chức: (4),(8)=2; tạp chức: (10) NH2+COOH, (11) OH+CHO =2 (đúng, khớp A). Hydrocarbon: (1),(3),(5),(9)=4, trong đó (3),(5) không no =2 (đúng, khớp C). Dẫn xuất hydrocarbon: 11-4=7, đơn chức: (2),(6),(7)=3 (đúng, khớp D).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho các phát biểu sau: (1) Cấu tạo hoá học là trật tự liên kết giữa các nguyên tử trong phân tử; (2) Cấu tạo hoá học khác nhau tạo ra các chất khác nhau; (3) Trong phân tử hợp chất hữu cơ, nguyên tử carbon luôn có hoá trị bốn; (4) Trong phân tử hợp chất hữu cơ, các nguyên tử carbon chỉ liên kết với nguyên tử của nguyên tố khác; (5) Tính chất vật lí và tính chất hoá học của hợp chất hữu cơ phụ thuộc vào thành phần phân tử và cấu tạo hoá học. Số phát biểu đúng là",
    choices: ["2.", "3.", "4.", "5."],
    correctIndex: 2,
    explanation: "Đúng: (1), (2), (3), (5). Sai: (4) — carbon còn có thể liên kết với chính nguyên tử carbon khác để tạo mạch (nếu không thì không thể có mạch carbon).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các phát biểu sau: (1) Công thức cấu tạo biểu diễn kiểu liên kết và trật tự liên kết giữa các nguyên tử trong phân tử; (2) Chất đồng phân có cùng công thức phân tử nhưng có thể khác nhau về loại nhóm chức, mạch carbon, vị trí liên kết pi (π) hoặc vị trí nhóm chức; (3) Chất đồng đẳng có cấu tạo và tính chất tương tự, nhưng thành phần phân tử khác nhau một hay nhiều nhóm CH2. Số phát biểu đúng là",
    choices: ["0.", "1.", "2.", "3."],
    correctIndex: 3,
    explanation: "Cả ba phát biểu đều đúng theo đúng định nghĩa công thức cấu tạo, đồng phân và đồng đẳng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhận định nào sau đây không đúng?",
    choices: [
      "Người ta có thể chiết tách các chất hữu cơ hữu ích từ thuốc Bắc bằng cách ngâm thuốc Bắc trong dung dịch ethanol.",
      "Sau khi ép cây mía và làm sạch các chất bẩn rắn cũng như chất bẩn màu, người ta thu được dung dịch nước đường. Cô cạn nước đường ở áp suất thấp sẽ tách được đường.",
      "Sau khi chưng cất cây sả bằng hơi nước, người ta thu được lớp tinh dầu (chứa terpene) nổi trên mặt nước. Dùng phương pháp chiết sẽ tách riêng được lớp tinh dầu.",
      "Để tách ethanol (ethylic alcohol) từ hỗn hợp với nước và bã rượu, dùng kĩ thuật lọc sẽ tách riêng được ethanol ra khỏi hỗn hợp này.",
    ],
    correctIndex: 3,
    explanation: "Ethanol tan hoàn toàn (miscible) trong nước nên không thể tách bằng lọc (lọc chỉ loại được chất rắn không tan như bã rượu); muốn tách ethanol khỏi nước phải dùng phương pháp chưng cất.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các cặp chất sau: (a) CH≡CH và CH2=C=CH2; (b) CH≡CH và CH3CH2C≡CH; (c) CH3CH2OH và (CH3)2CHCH2OH; (d) C6H5OH và C6H4(OH)2; (e) HCH=O và CH3COCH3. Số cặp chất là đồng đẳng của nhau là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 1,
    explanation: "Đồng đẳng: (b) hai alkyne hơn kém 2 nhóm CH2; (c) hai alcohol đơn chức hơn kém 2 nhóm CH2. (a) alkyne và allene khác loại; (d) phenol đơn chức và đa chức khác loại; (e) aldehyde và ketone khác loại. Vậy có 2 cặp đồng đẳng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các cặp chất sau: (a) CH≡CH và CH3-C≡CH; (b) (CH3)2C=CH2 và CH3CH2CH=CH2; (c) CH3CH2CH=O và CH3COCH3; (d) CH3CH2CH2OH và CH3CH(OH)CH3; (e) CH2=CH-CH2-CH3 và CH2=CH-CH=CH2. Số cặp chất là đồng phân của nhau là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 2,
    explanation: "Đồng phân (cùng công thức phân tử, khác cấu tạo): (b) đều C4H8; (c) đều C3H6O (aldehyde/ketone); (d) đều C3H8O (alcohol bậc 1/bậc 2). (a) C2H2 và C3H4 khác công thức phân tử; (e) C4H8 và C4H6 khác công thức phân tử. Vậy có 3 cặp đồng phân.",
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
        source: "SBT Hóa 11 - Kết nối tri thức (Chương 3 - Đại cương về hoá học hữu cơ)",
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
