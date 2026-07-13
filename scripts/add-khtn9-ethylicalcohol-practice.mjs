import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AK: bài tập mining từ KHTN 9 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx (Tài liệu/Lớp 6-9 (THCS)/
// Mới upload (Lớp 6,7,8,9)/). Tài liệu này KHÔNG có bảng đáp án — mọi đáp án tự giải bằng kiến thức
// hóa học (độ rượu/pha loãng, phản ứng với Na/K, đốt cháy alcohol, lên men glucose, hiệu suất phản
// ứng nhiều giai đoạn) và kiểm chứng lại trước khi đưa vào.
// Chỉ mining phần "Ethylic alcohol" của Bài 26 (Chương 8. Ethylic alcohol và Acetic acid) trong đợt
// này — phần Acetic acid cùng bài để lại đợt tiếp theo (tài liệu rất lớn).
// Đã loại khi đọc: câu thiếu phương án do lỗi trích xuất numbering docx (Câu 4,5,6 không có đủ 4
// phương án — mất do lỗi khôi phục danh sách đánh số), câu phụ thuộc hình ảnh mô hình phân tử không
// có trong text (Câu 8), câu bị garbled/mất phương án A,B do lỗi công thức phản ứng (Câu 26,27,28),
// câu không đủ căn cứ hóa học rõ ràng để chọn 1 đáp án chắc chắn trong 4 lựa chọn cho sẵn (Câu 34 —
// chất làm khan alcohol, SGK thường dùng CaO không có trong 4 phương án).
// Đích: ngân hàng luyện tập /practice (PracticeQuestion) Chương 8 Lớp 9.
const CHAPTER_ID = "cmrel0nbq0004vhd8h2hf628n"; // Lớp 9 - Chương 8. Ethylic alcohol và Acetic acid

const QUESTIONS = [
  {
    content: "Tính chất vật lý của ethylic alcohol là",
    choices: [
      "chất lỏng không màu, nhẹ hơn nước, tan vô hạn trong nước, hòa tan được nhiều chất như iodine, benzene,…",
      "chất lỏng màu hồng, nhẹ hơn nước, tan vô hạn trong nước, hòa tan được nhiều chất như: iodine, benzen,…",
      "chất lỏng không màu, không tan trong nước, hòa tan được nhiều chất như: iodine, benzene,…",
      "chất lỏng không màu, nặng hơn nước, tan vô hạn trong nước, hòa tan được nhiều chất như: iodine, benzene,…",
    ],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhiệt độ sôi của ethylic alcohol là",
    choices: ["78,3°C.", "87,3°C.", "73,8°C.", "83,7°C."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Độ rượu là",
    choices: [
      "số mL ethylic alcohol nguyên chất có trong 100 mL hỗn hợp rượu với nước.",
      "số mL nước có trong 100 mL hỗn hợp rượu với nước.",
      "số gam ethylic alcohol nguyên chất có trong 100 mL hỗn hợp rượu với nước.",
      "số gam nước có trong 100 gam hỗn hợp rượu với nước.",
    ],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức cấu tạo của rượu etylic là",
    choices: ["CH2 – CH3 – OH.", "CH3 – O – CH3.", "CH2 – CH2 – OH2.", "CH3 – CH2 – OH."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây là ethylic alcohol?",
    choices: ["C2H5OH.", "CH3COOH.", "CH3OH.", "HCHO."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Lạm dụng rượu quá nhiều là không tốt, gây nguy hiểm cho bản thân và gánh nặng cho gia đình và toàn xã hội. Những người sử dụng nhiều rượu, bia có nguy cơ cao mắc bệnh ung thư nào sau đây?",
    choices: ["Ung thư phổi.", "Ung thư vú.", "Ung thư vòm họng.", "Ung thư gan."],
    correctIndex: 3,
    explanation: "Rượu bia được chuyển hóa chủ yếu tại gan, lạm dụng lâu ngày gây tổn thương và tăng nguy cơ ung thư gan.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Muốn điều chế 100 mL ethylic alcohol 65° ta dùng",
    choices: [
      "100 mL nước hòa với 65 mL rượu nguyên chất.",
      "100 mL ethylic alcohol nguyên chất có 65 mL nước.",
      "65 mL ethylic alcohol nguyên chất hòa với 35 mL nước.",
      "35 mL rượu nguyên chất với 65 mL nước.",
    ],
    correctIndex: 2,
    explanation: "Độ rượu 65° nghĩa là 100mL dung dịch chứa 65mL alcohol nguyên chất, còn lại 35mL là nước.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hòa tan 30 mL ethylic alcohol nguyên chất vào 90 mL nước cất thu được",
    choices: ["ethylic alcohol có độ rượu là 20°.", "ethylic alcohol có độ rượu là 25°.", "ethylic alcohol có độ rượu là 30°.", "ethylic alcohol có độ rượu là 35°."],
    correctIndex: 1,
    explanation: "Tổng thể tích dung dịch = 30+90=120mL. Độ rượu = 30/120×100 = 25°.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Muốn điều chế 20 mL ethylic alcohol 60° số mL ethylic alcohol và số mL nước cần dùng là",
    choices: [
      "10 mL ethylic alcohol và 10 mL nước.",
      "12 mL ethylic alcohol và 8 mL nước.",
      "14 mL ethylic alcohol và 6 mL nước.",
      "8 mL ethylic alcohol và 12 mL nước.",
    ],
    correctIndex: 1,
    explanation: "Alcohol nguyên chất = 60%×20 = 12mL, nước = 20-12=8mL.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Pha loãng 10 mL ethylic alcohol 90° bằng nước nguyên chất thành 20 mL thì độ rượu của dung dịch rượu là",
    choices: ["50°.", "40°.", "45°.", "55°."],
    correctIndex: 2,
    explanation: "Alcohol nguyên chất = 90%×10=9mL (không đổi khi pha loãng). Độ rượu mới = 9/20×100=45°.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Hợp chất Y là chất lỏng không màu, có nhóm –OH trong phân tử, tác dụng với kali nhưng không tác dụng với kẽm. Y là",
    choices: ["NaOH.", "CH3COOH.", "Ca(OH)2.", "C2H5OH."],
    correctIndex: 3,
    explanation: "NaOH và Ca(OH)2 (base mạnh) đều phản ứng được với Zn (kim loại lưỡng tính); chỉ alcohol (C2H5OH) mới có tính chất tác dụng được với kim loại kiềm (K) mà không phản ứng với Zn.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Số liên kết trong phân tử ethylic alcohol là",
    choices: ["8.", "7.", "6.", "9."],
    correctIndex: 0,
    explanation: "CH3-CH2-OH có: 1 liên kết C-C, 5 liên kết C-H (3+2), 1 liên kết C-O, 1 liên kết O-H. Tổng = 8 liên kết.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Số công thức cấu tạo của C2H6O là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 1,
    explanation: "C2H6O có 2 đồng phân: ethanol (CH3CH2OH) và dimethyl ether (CH3OCH3).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Số công thức cấu tạo của C3H8O là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 2,
    explanation: "C3H8O có 3 đồng phân: 1-propanol, 2-propanol (2 alcohol) và methyl ethyl ether (1 ether).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Ứng với công thức phân tử C4H10O có bao nhiêu alcohol là công thức cấu tạo?",
    choices: ["3.", "5.", "4.", "2."],
    correctIndex: 2,
    explanation: "C4H10O có 4 alcohol đồng phân: butan-1-ol, butan-2-ol, 2-methylpropan-1-ol, 2-methylpropan-2-ol.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Ethylic alcohol cháy trong không khí, hiện tượng quan sát được là",
    choices: [
      "ngọn lửa màu đỏ, tỏa nhiều nhiệt.",
      "ngọn lửa màu vàng, tỏa nhiều nhiệt.",
      "ngọn lửa màu xanh, tỏa nhiều nhiệt.",
      "ngọn lửa màu xanh, không tỏa nhiệt.",
    ],
    correctIndex: 2,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nhóm –OH trong phân tử ethylic alcohol có tính chất hóa học đặc trưng là",
    choices: [
      "tác dụng được với kim loại giải phóng khí hydrogen.",
      "tác dụng được với Na, K giải phóng khí hydrogen.",
      "tác dụng được với Mg, Na giải phóng khí hydrogen.",
      "tác dụng được với K, Zn giải phóng khí hydrogen.",
    ],
    correctIndex: 1,
    explanation: "Nhóm -OH của alcohol chỉ phản ứng được với kim loại kiềm mạnh (Na, K), không phản ứng với kim loại thường như Mg, Zn.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ethylic alcohol phản ứng được với natri vì",
    choices: [
      "Trong phân tử có nguyên tử oxygen.",
      "Trong phân tử có nguyên tử H và nguyên tử O.",
      "Trong phân tử có nguyên tử C, H, O.",
      "Trong phân tử có nhóm –OH.",
    ],
    correctIndex: 3,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho ethylic alcohol nguyên chất tác dụng với potassium. Số phản ứng hóa học xảy ra là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 0,
    explanation: "Alcohol nguyên chất (không lẫn nước) chỉ có 1 phản ứng: 2C2H5OH+2K→2C2H5OK+H2.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ethylic alcohol không tác dụng với chất nào sau đây?",
    choices: ["Na.", "KOH.", "CuO.", "O2."],
    correctIndex: 1,
    explanation: "Alcohol không phản ứng với base (KOH) vì không có tính acid. Alcohol phản ứng với Na (kim loại kiềm), CuO (oxi hóa khi đun nóng), O2 (cháy).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Khi đốt cháy ethylic alcohol, sản phẩm chiếm chủ yếu là khí X. Khí X là nguyên nhân của hiện tượng hiệu ứng nhà kính – làm cho nhiệt độ của Trái Đất tăng dần. Khí X là",
    choices: ["N2O.", "CO.", "H2O hơi.", "CO2."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong số các chất sau, chất nào tác dụng được với Na?",
    choices: ["CH3–CH3.", "CH3–CH2–OH.", "C6H6.", "CH3–O–CH3."],
    correctIndex: 1,
    explanation: "Chỉ CH3-CH2-OH (ethanol) có nhóm -OH phản ứng được với Na; ether (CH3-O-CH3) và hydrocarbon không phản ứng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho ethylic alcohol 90° tác dụng với natri. Số phản ứng hóa học có thể xảy ra là",
    choices: ["1.", "2.", "3.", "4."],
    correctIndex: 1,
    explanation: "Alcohol 90° là hỗn hợp alcohol+nước, Na phản ứng với cả 2: 2 phản ứng (với C2H5OH và với H2O).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho một mẫu natri vào ống nghiệm đựng ethylic alcohol. Hiện tượng quan sát được là",
    choices: [
      "có bọt khí màu nâu thoát ra.",
      "mẫu natri tan dần không có bọt khí thoát ra.",
      "mẫu natri nằm dưới bề mặt chất lỏng và không tan.",
      "có bọt khí không màu thoát ra và natri tan dần.",
    ],
    correctIndex: 3,
    explanation: "Na phản ứng với alcohol sinh khí H2 (không màu) và Na tan dần.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Để phân biệt hai chất lỏng không màu là benzene và ethylic alcohol ta dùng",
    choices: ["iron.", "copper.", "sodium.", "zinc."],
    correctIndex: 2,
    explanation: "Na phản ứng với ethylic alcohol (sinh khí H2) nhưng không phản ứng với benzene, dùng để phân biệt.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Ethylic alcohol tác dụng được với dãy hóa chất là",
    choices: [
      "KOH; Na; CH3COOH; O2.",
      "Na; K; CH3COOH; O2.",
      "C2H4; Na; CH3COOH; O2.",
      "Ca(OH)2; K; CH3COOH; O2.",
    ],
    correctIndex: 1,
    explanation: "Alcohol không phản ứng với base (KOH, Ca(OH)2) và không phản ứng với hydrocarbon (C2H4); chỉ phản ứng với kim loại kiềm, acid hữu cơ (ester hóa) và O2 (cháy).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Để phân biệt ethylic alcohol tinh khiết và ethylic alcohol có lẫn nước, có thể dùng chất nào sau đây?",
    choices: ["Na.", "CuO, t°", "CuSO4 khan.", "H2SO4 đặc."],
    correctIndex: 2,
    explanation: "CuSO4 khan (màu trắng) chuyển thành CuSO4.5H2O (màu xanh) khi có nước, dùng để phát hiện alcohol có lẫn nước hay không.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hợp chất hữu cơ X được điều chế bằng cách cho C2H4 phản ứng với nước có acid làm xúc tác. Vậy X là chất nào trong các chất sau?",
    choices: ["CH3COOH.", "C3H7OH.", "C2H5OH.", "CH3OH."],
    correctIndex: 2,
    explanation: "CH2=CH2 + H2O (xúc tác acid) → C2H5OH (phản ứng hydrat hóa ethylene).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phương pháp điều chế ethylic alcohol từ chất nào sau đây là phương pháp sinh hóa?",
    choices: ["Ethane.", "Ethylchloride.", "Tinh bột.", "Ethylene."],
    correctIndex: 2,
    explanation: "Điều chế từ tinh bột qua lên men (phương pháp sinh hóa/vi sinh vật); từ ethylene là phương pháp hóa học (hydrat hóa).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Khi ủ men rượu, người ta thu được một hỗn hợp chủ yếu gồm nước, ethylic alcohol và bã rượu. Muốn thu được ethylic alcohol người ta dùng phương pháp nào sau đây?",
    choices: ["Phương pháp chiết lỏng – lỏng.", "phương pháp chưng cất.", "Phương pháp kết tinh.", "Phương pháp chiết lỏng – rắn."],
    correctIndex: 1,
    explanation: "Chưng cất tách alcohol khỏi nước dựa vào sự khác biệt nhiệt độ sôi (78,3°C so với 100°C của nước).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Không thể điều chế ethylic alcohol bằng phản ứng nào sau đây?",
    choices: [
      "Cho hỗn hợp khí ethylene và hơi nước đi qua tháp chứa H3PO4.",
      "Lên men glucose.",
      "Cho ethylene tác dụng với dung dịch H2SO4 loãng nóng.",
      "Cho acetylene tác dụng với dung dịch chứa H2SO4 loãng, nóng và HgSO4.",
    ],
    correctIndex: 3,
    explanation: "Acetylene + H2O (xúc tác HgSO4/H2SO4) theo quy tắc Markovnikov cho acetaldehyde (CH3CHO), không phải alcohol — đây là phản ứng hydrat hóa alkyne tạo hợp chất carbonyl.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Hiện nay, ở Việt Nam xăng E5 RON92 (còn gọi là xăng sinh học E5) là hỗn hợp thu được khi trộn xăng RON92 với cồn sinh học có thành phần chủ yếu là chất (X). Tên gọi của chất (X) là",
    choices: ["ethylene.", "ethylic alcohol.", "ethylene glycol.", "ethane."],
    correctIndex: 1,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi cho 9,2 gam ethylic alcohol tác dụng với Na vừa đủ, thu được V lít H2 (đkc). Giá trị của V là",
    choices: ["2,479.", "7,437.", "4,958.", "3,7185."],
    correctIndex: 0,
    explanation: "n(C2H5OH)=9,2/46=0,2mol. 2C2H5OH+2Na→2C2H5ONa+H2, n(H2)=0,1mol. V=0,1×24,79=2,479 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho 23 gam ethylic alcohol nguyên chất tác dụng với natri dư. Thể tích khí H2 thoát ra (đkc) là",
    choices: ["3,09875 lít.", "6,1975 lít.", "8,4 lít.", "11,2 lít."],
    correctIndex: 1,
    explanation: "n(C2H5OH)=23/46=0,5mol → n(H2)=0,25mol → V=0,25×24,79=6,1975 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Hòa tan một mẫu kali dư vào ethylic alcohol nguyên chất (D = 0,8 g/mL), thu được 2,479 lít khí H2 (đkc). Thể tích ethylic alcohol đã dùng là",
    choices: ["11,0 mL.", "11,5 mL.", "12,0 mL.", "12,5 mL."],
    correctIndex: 1,
    explanation: "n(H2)=2,479/24,79=0,1mol → n(alcohol)=0,2mol → m=0,2×46=9,2g → V=9,2/0,8=11,5mL.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Trong điều kiện có xúc tác, V lít ethylene (đkc) hợp nước thành ethylic alcohol, lượng rượu thu được tác dụng hết với Na tạo thành 12,395 lít H2 (đkc). Giá trị của V là",
    choices: ["12,395.", "24,79.", "37,185.", "4,4958."],
    correctIndex: 1,
    explanation: "n(H2)=12,395/24,79=0,5mol → n(alcohol)=1mol (tỉ lệ 2:1) → n(ethylene)=n(alcohol)=1mol (hydrat hóa 1:1) → V=1×24,79=24,79 lít.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Khi cho hỗn hợp các alcohol tác dụng với m gam K (vừa đủ), thu được 4,958 lít H2 (đkc). Giá trị của m là",
    choices: ["7,8.", "3,9.", "9,75.", "15,6."],
    correctIndex: 3,
    explanation: "n(H2)=4,958/24,79=0,2mol → n(K)=2×0,2=0,4mol (mỗi 2K tạo 1H2) → m=0,4×39=15,6g.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Khi cho 7,8 gam hỗn hợp X gồm methylic alcohol và ethylic alcohol tác dụng với K vừa đủ, thu được 2,479 lít H2 (đkc). Phần trăm khối lượng của ancol etylic trong X là",
    choices: ["41,03%.", "48,82%.", "51,18%.", "58,97%."],
    correctIndex: 3,
    explanation:
      "n(H2)=0,1mol → tổng n(OH)=0,2mol=n(CH3OH)+n(C2H5OH). Đặt x=CH3OH,y=C2H5OH: x+y=0,2; 32x+46y=7,8. Giải: y=0,1,x=0,1. %C2H5OH=46×0,1/7,8×100%=58,97%.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Alcohol no, mạch hở X chứa n nguyên tử C và m nhóm OH trong phân tử. Cho 7,6 gam X tác dụng hết với Na, thu được 2,479 lít H2 (đkc). Mối quan hệ giữa n và m là",
    choices: ["2m = 2n + 1.", "m = 2n + 2.", "11m = 7n + 1.", "7n = 14m + 2."],
    correctIndex: 2,
    explanation:
      "n(H2)=0,1mol → n(nhóm OH)=0,2mol. M(X)=14n+2+16m. n(X)=0,2/m. M=7,6/(0,2/m)=38m. Vậy 14n+2+16m=38m → 7n+1=11m.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Cho 0,1 lít ethylic alcohol 95° tác dụng với Na dư, thu được V lít khí H2 (đkc). Biết rằng ethylic alcohol nguyên chất có khối lượng riêng là 0,8 g/mL, khối lượng riêng của nước là 1 g/mL. Giá trị của V là",
    choices: ["43,23.", "40,95.", "20,473.", "23,921."],
    correctIndex: 3,
    explanation:
      "Alcohol nguyên chất=95mL×0,8=76g→n=1,6522mol→H2=0,8261mol. Nước=5mL×1=5g→n=0,2778mol→H2=0,1389mol. Tổng H2=0,965mol→V=0,965×24,79=23,921 lít.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Cho 10 mL ethylic alcohol 46° phản ứng hết với kim loại Na (dư), thu được V lít khí H2 (đkc). Biết khối lượng riêng của ethylic alcohol nguyên chất bằng 0,8 g/mL. Giá trị của V là",
    choices: ["4,7101.", "0,9916.", "3,715.", "2,128."],
    correctIndex: 0,
    explanation:
      "Alcohol nguyên chất=46%×10=4,6mL×0,8=3,68g→n=0,08mol→H2=0,04mol. Nước=5,4mL×1=5,4g→n=0,3mol→H2=0,15mol. Tổng H2=0,19mol→V=0,19×24,79=4,7101 lít.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Hòa tan m gam ethylic alcohol (d = 0,8 g/mL) vào 108 mL nước (d = 1 g/mL) tạo thành dung dịch X. Cho X tác dụng với Na dư, thu được 94,202 lít (đkc) khí H2. Dung dịch X có độ alcohol bằng",
    choices: ["8°.", "41°.", "46°.", "92°."],
    correctIndex: 2,
    explanation:
      "n(H2)=94,202/24,79=3,8mol. H2 từ nước(108g,n=6mol)=3mol. H2 từ alcohol=3,8-3=0,8mol→n(alcohol)=1,6mol→m=73,6g→V=73,6/0,8=92mL. Độ rượu=92/(92+108)×100=46°.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Cho Na dư vào dung dịch ethylic alcohol (dung môi là nước), thấy khối lượng H2 bay ra bằng 3% khối lượng cồn đã dùng. Dung dịch cồn có nồng độ phần trăm là",
    choices: ["68,57%.", "70,57%.", "72,57%.", "75,57%."],
    correctIndex: 3,
    explanation:
      "Xét 100g dung dịch, C%=nồng độ alcohol. m(H2)=2×[C/92+(100-C)/36]=3 → giải ra C≈75,57%.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Cho 16,4 gam dung dịch alcohol X (dung môi nước) có nồng độ 56,1% tác dụng với một lượng Na (dư), thu được 7,437 lít khí (đkc). Tỉ khối hơi của X so với H2 bằng 23. Vậy X là",
    choices: ["Glycerol.", "Benzylic alcohol.", "Ethylic alcohol.", "methylic alcohol."],
    correctIndex: 2,
    explanation: "M(X)=23×2=46 → X là C2H5OH (ethylic alcohol). Kiểm tra: m(X)=16,4×0,561=9,2g→n=0,2mol→H2(từ X)=0,1mol; nước=7,2g→n=0,4mol→H2=0,2mol; tổng=0,3mol=7,437/24,79 ✓ khớp.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Đốt cháy hoàn toàn 57,5 mL ethylic alcohol (D = 0,8 g/mL). Thể tích khí CO2 (đkc) thu được là",
    choices: ["2,479 lít.", "24,79 lít.", "4,958 lít.", "49,58 lít."],
    correctIndex: 3,
    explanation: "m=57,5×0,8=46g→n=1mol. C2H5OH+3O2→2CO2+3H2O: n(CO2)=2mol→V=2×24,79=49,58 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Đốt cháy hoàn toàn 20 mL ethylic alcohol x° (D = 0,8 g/mL), dẫn sản phẩm khí thu được qua dung dịch nước vôi trong dư, thu được 60 gam kết tủa. Giá trị của x là",
    choices: ["68,25.", "86,25.", "25,86.", "25,68."],
    correctIndex: 1,
    explanation:
      "n(CaCO3)=60/100=0,6mol=n(CO2)→n(alcohol)=0,3mol→m(alcohol nguyên chất)=13,8g→V=13,8/0,8=17,25mL. x=17,25/20×100=86,25°.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Thể tích không khí (đkc) (O2 chiếm 1/5 thể tích) cần để đốt cháy hết 2,3 gam ethylic alcohol là",
    choices: ["3,7185 lít.", "0,7347 lít.", "24 lít.", "18,585 lít."],
    correctIndex: 3,
    explanation: "n=2,3/46=0,05mol→n(O2)=3×0,05=0,15mol→V(O2)=3,7185 lít→V(kk)=5×3,7185=18,585 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thể tích khí oxygen (đkc) cần để đốt cháy 23 gam ethylic alcohol là",
    choices: ["37,185 lít.", "11,2 lít.", "6,1975 lít.", "24,79 lít."],
    correctIndex: 0,
    explanation: "n=23/46=0,5mol→n(O2)=1,5mol→V=1,5×24,79=37,185 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thể tích khí oxygen (đkc) cần dùng để đốt cháy hoàn toàn 13,8 gam ethylic alcohol nguyên chất là",
    choices: ["16,20 lít.", "20,14 lít.", "22,311 lít.", "22,16 lít."],
    correctIndex: 2,
    explanation: "n=13,8/46=0,3mol→n(O2)=0,9mol→V=0,9×24,79=22,311 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Thể tích không khí (đkc) (chứa 20% thể tích oxygen) cần dùng để đốt cháy hoàn toàn 9,2 gam ethylic alcohol nguyên chất là",
    choices: ["7,437 lít.", "74,37 lít.", "14,874 lít.", "1,4874 lít."],
    correctIndex: 1,
    explanation: "n=9,2/46=0,2mol→n(O2)=0,6mol→V(O2)=14,874 lít→V(kk,20%)=14,874/0,2=74,37 lít.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn m gam alcohol đơn chức X, thu được 6,6 gam CO2 và 3,6 gam H2O. Giá trị m là",
    choices: ["10,2.", "2.", "2,8.", "3."],
    correctIndex: 3,
    explanation: "nCO2=0,15mol, nH2O=0,2mol. Tỉ lệ nCO2/nH2O=n/(n+1)=0,75 → n=3 (C3H8O, M=60). n(X)=0,15/3=0,05mol→m=3g.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn a gam hỗn hợp gồm CH3OH và C4H9OH, thu được 30,8 gam CO2 và 18 gam H2O. Giá trị a là",
    choices: ["30,4.", "16.", "15,2.", "7,6."],
    correctIndex: 2,
    explanation:
      "nCO2=0,7mol, nH2O=1mol. Đặt x=CH3OH,y=C4H9OH: x+4y=0,7; 2x+5y=1. Giải: y=2/15, x=1/6. a=32x+74y=15,2g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Đốt cháy hoàn toàn 3,9 gam hỗn hợp X gồm CH3OH, C2H5OH, C3H7OH, thu được m gam H2O và 3,7185 lít khí CO2 (ở đkc). Giá trị của m là",
    choices: ["6,75.", "8,1.", "4,5.", "10,8."],
    correctIndex: 2,
    explanation:
      "nCO2=0,15mol. Bảo toàn khối lượng qua công thức chung CnH2n+2O: m=14×nCO2+18×n(alcohol)→3,9=14(0,15)+18n(alcohol)→n(alcohol)=0,1mol. nH2O=nCO2+n(alcohol)=0,25mol→m(H2O)=4,5g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Đốt cháy hoàn toàn 0,4 mol hỗn hợp X gồm ancol CH3OH, C2H5OH, C3H7OH rồi hấp thụ toàn bộ sản phẩm cháy vào nước vôi trong dư được 80 gam kết tủa. Thể tích oxygen (đkc) tối thiểu cần dùng là",
    choices: ["29,748 lít.", "26,0295 lít.", "23,5505 lít.", "18,5925 lít."],
    correctIndex: 0,
    explanation:
      "n(CaCO3)=0,8mol=nCO2. nH2O=nCO2+n(X)=0,8+0,4=1,2mol. Bảo toàn O: 2n(O2)+n(O trong X,=0,4)=2(0,8)+1,2=2,8→n(O2)=1,2mol→V=29,748 lít.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Đốt cháy hoàn toàn 9 gam hợp chất hữu cơ X chứa C, H và O, thu được 19,8 gam khí CO2 và 10,8 gam H2O. Công thức phân tử của X là",
    choices: ["C2H6O.", "C4H10O.", "C3H8O.", "CH4O."],
    correctIndex: 2,
    explanation:
      "nCO2=0,45mol(nC=0,45), nH2O=0,6mol(nH=1,2). mO=9-0,45×12-1,2×1=2,4g→nO=0,15mol. Tỉ lệ C:H:O=0,45:1,2:0,15=3:8:1 → C3H8O.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đốt cháy hoàn toàn hợp chất hữu cơ X, thu được CO2 và H2O với số mol theo tỉ lệ 2:3. X là chất nào?",
    choices: ["C2H5OH.", "CH3COOH.", "CH3OH.", "C6H12O6."],
    correctIndex: 0,
    explanation: "C2H5OH (C2H6O) đốt cháy tạo 2CO2+3H2O, đúng tỉ lệ 2:3.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đốt cháy hoàn toàn 5,8 gam alcohol đơn chức X, thu được 13,2 gam CO2 và 5,4 gam H2O. Công thức của của X là",
    choices: ["C4H7OH.", "C2H5OH.", "C3H5OH.", "C3H3OH."],
    correctIndex: 2,
    explanation:
      "nCO2=0,3mol=nH2O(0,3mol) → alcohol có 1 độ bất bão hòa (k=1). Thử C3H5OH (M=58): n=5,8/58=0,1mol→nCO2=3×0,1=0,3mol ✓ khớp.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Đốt cháy hoàn toàn alcohol X, thu được CO2 và H2O có tỉ lệ mol tương ứng là 3 : 4, thể tích oxygen cần dùng để đốt cháy X bằng 1,5 lần thể tích CO2 thu được (đo cùng điều kiện). Công thức phân tử của X là",
    choices: ["C3H8O.", "C3H8O2.", "C3H8O3.", "C3H4O."],
    correctIndex: 0,
    explanation:
      "Đặt nCO2=3a,nH2O=4a,n(O2)=4,5a. Bảo toàn O: 2(4,5a)+nO(X)=2(3a)+4a → nO(X)=a. Với 1 oxygen/phân tử: n(X)=a, C=3a/a=3, H=8a/a=8 → C3H8O.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Đốt cháy hoàn toàn 1 thể tích hơi alcohol no, đơn chức X, thu được CO2 và H2O có tổng thể tích gấp 5 lần thể tích hơi alcohol X đã dùng (ở cùng điều kiện). Vậy X là",
    choices: ["C2H5OH.", "C4H9OH.", "CH3OH.", "C3H7OH."],
    correctIndex: 0,
    explanation: "CnH2n+2O: 1 mol X→n CO2+(n+1)H2O, tổng=2n+1=5→n=2 → C2H5OH.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Lên men rượu từ glucose, thu được 18,5925 lít khí CO2 (đkc). Thể tích rượu (D = 0,8 g/mL) thu được là",
    choices: ["27,6 mL.", "86,25 mL.", "43,125 mL.", "34,125 mL."],
    correctIndex: 2,
    explanation: "C6H12O6→2C2H5OH+2CO2. n(CO2)=0,75mol=n(alcohol). m=34,5g→V=34,5/0,8=43,125mL.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Khi lên men 360 gam glucose với hiệu suất 100%, khối lượng ethylic alcohol thu được là",
    choices: ["138 gam.", "184 gam.", "276 gam.", "92 gam."],
    correctIndex: 1,
    explanation: "n(glucose)=2mol→n(alcohol)=4mol(mỗi glucose cho 2 alcohol)→m=4×46=184g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho 25,2 gam glucose lên men rượu. Khối lượng rượu và thể tích khí CO2 (đkc) thu được lần lượt là (hiệu suất 100%)",
    choices: ["12,88 gam và 13,6345 lít.", "12,88 gam và 6,9412 lít.", "128,8 gam và 62,72 lít.", "12,88 gam và 69,412 lít."],
    correctIndex: 1,
    explanation: "n(glucose)=25,2/180=0,14mol→n(alcohol)=n(CO2)=0,28mol→m(alcohol)=12,88g; V(CO2)=0,28×24,79=6,9412 lít.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Lên men rượu từ glucose sinh ra 4,958 lít khí carbon dioxide (đkc). Lượng natri cần lấy để tác dụng hết với lượng rượu sinh ra là",
    choices: ["46 gam.", "2,3 gam.", "6,4 gam.", "4,6 gam."],
    correctIndex: 3,
    explanation: "n(CO2)=0,2mol=n(alcohol) (tỉ lệ 1:1 khi lên men). n(Na)=n(alcohol)=0,2mol→m=4,6g.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Cho 360 gam glucose lên men tạo thành ethylic alcohol, khí sinh ra được dẫn vào nước vôi trong dư, thu được m gam kết tủa. Biết hiệu suất của quá trình lên men đạt 80%. Giá trị của m là",
    choices: ["320.", "200.", "160.", "400."],
    correctIndex: 0,
    explanation: "n(glucose)=2mol→n(CO2 lý thuyết)=4mol→thực tế(80%)=3,2mol→n(CaCO3)=3,2mol→m=320g.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Cho m gam glucose lên men thành ethylic alcohol. Khí sinh ra cho vào nước vôi trong dư thu được 120 gam kết tủa, biết hiệu suất quá trình lên men đạt 60%. Giá trị m là",
    choices: ["225.", "180.", "112,5.", "120."],
    correctIndex: 1,
    explanation: "n(CaCO3)=1,2mol=n(CO2 thực tế)→n(CO2 lý thuyết)=1,2/0,6=2mol→n(glucose)=1mol→m=180g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Lên men 45 gam glucose để điều chế ethylic alcohol, hiệu suất phản ứng 80% thu được V lít khí CO2 (đkc). Giá trị của V là",
    choices: ["11,20.", "9,916.", "2,479.", "6,1975."],
    correctIndex: 1,
    explanation: "n(glucose)=0,25mol→n(CO2 thực tế)=2×0,25×0,8=0,4mol→V=0,4×24,79=9,916 lít.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Lên men dung dịch chứa 300 gam glucose thu được 92 gam ethylic alcohol. Hiệu suất quá trình lên men tạo thành ancol etylic là",
    choices: ["60%.", "40%.", "54%.", "80%."],
    correctIndex: 0,
    explanation: "n(glucose)=300/180=1,6667mol→n(alcohol lý thuyết)=3,3333mol. n(alcohol thực tế)=92/46=2mol. Hiệu suất=2/3,3333×100%=60%.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Khi lên men 1 tấn tinh bột chứa 5% tạp chất trơ thành ethylic alcohol. Hiệu suất của mỗi quá trình lên men là 85%. Khối lượng rượu thu được sẽ là",
    choices: ["400 kg.", "398,8 kg.", "389,8 kg.", "390 kg."],
    correctIndex: 2,
    explanation:
      "Tinh bột thật=950kg. m(alcohol lý thuyết)=950×92/162=539,5kg. Với 2 giai đoạn mỗi 85%: hiệu suất tổng=0,85×0,85=0,7225. m(thực tế)=539,5×0,7225=389,8kg.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho 24,79 lít khí ethylene (đkc) tác dụng với nước có H2SO4 làm xúc tác, thu được 13,8 gam ethylic alcohol. Hiệu suất phản ứng cộng nước của ethylene là",
    choices: ["30%.", "20%.", "35%.", "25%."],
    correctIndex: 0,
    explanation: "n(ethylene)=1mol. n(alcohol thực tế)=13,8/46=0,3mol. Hiệu suất=0,3/1×100%=30%.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho 12,395 lít khí ethylene (đkc) tác dụng với nước có H2SO4 làm xúc tác, thu được 9,2 gam ethylic alcohol. Hiệu suất phản ứng là",
    choices: ["40%.", "45%.", "50%.", "55%."],
    correctIndex: 0,
    explanation: "n(ethylene)=0,5mol. n(alcohol)=0,2mol. Hiệu suất=0,2/0,5×100%=40%.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Người ta sản xuất rượu vang từ nho với hiệu suất 95%. Biết trong loại nho này chứa 60% glucose, khối lượng riêng của ethylic alcohol là 0,8 g/mL. Để sản xuất 100 lít rượu vang 10° cần khối lượng nho là",
    choices: ["20,59 kg.", "26,09 kg.", "27,46 kg.", "10,29 kg."],
    correctIndex: 2,
    explanation:
      "Alcohol nguyên chất=10L=8000g→n=173,913mol. Lý thuyết(chia 95%)=183,067mol→n(glucose)=91,533mol→m(glucose)=16,476kg→m(nho, chia 60%)=27,46kg.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Trong thực tế người ta thường nấu rượu (ethylic alcohol) từ gạo. Tinh bột chuyển hóa thành ethylic alcohol qua 2 giai đoạn: Tinh bột → glucose → ethylic alcohol. Tính thể tích ethylic alcohol 46° thu được từ 10 kg gạo (chứa 81% tinh bột). Biết hiệu suất mỗi giai đoạn là 80%, khối lượng riêng của C2H5OH là 0,8 g/mL.",
    choices: ["6 lít.", "10 lít.", "4 lít.", "8 lít."],
    correctIndex: 3,
    explanation:
      "Tinh bột thật=8,1kg. m(alcohol lý thuyết)=8,1×92/162=4,6kg. Hiệu suất tổng=0,8×0,8=0,64→thực tế=2,944kg=2944g→V nguyên chất=3680mL. Dung dịch 46°: V=3680/0,46=8000mL=8 lít.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Cho 100 kg gạo chứa 81% tinh bột có thể điều chế được V lít ethylic alcohol 46°. Biết hiệu suất quá trình điều chế 75% và ethylic alcohol nguyên chất có D = 0,8 g/mL. Giá trị của V là",
    choices: ["43,125.", "50,12.", "93,75.", "100."],
    correctIndex: 2,
    explanation:
      "Tinh bột thật=81kg. m(alcohol lý thuyết)=81×92/162=46kg. Thực tế(75%)=34,5kg=34500g→V nguyên chất=43125mL. Dung dịch 46°: V=43125/0,46=93750mL=93,75 lít.",
    difficulty: "VAN_DUNG_CAO",
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
        explanation: q.explanation ?? null,
        difficulty: q.difficulty,
        source: "KHTN 9 - Tài liệu học tập 2024 (VEAgroup) — Chương 8. Ethylic alcohol",
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
