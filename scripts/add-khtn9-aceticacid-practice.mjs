import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AK: bài tập mining từ KHTN 9 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx (Tài liệu/Lớp 6-9 (THCS)/
// Mới upload (Lớp 6,7,8,9)/). Tài liệu này KHÔNG có bảng đáp án — mọi đáp án tự giải bằng kiến thức
// hóa học (tính acid yếu, phản ứng với kim loại/oxide/base/carbonate, phản ứng ester hóa nhiều bài
// toán hiệu suất). Đây là phần "Acetic acid" của Bài 26 (Chương 8), tiếp nối phần Ethylic alcohol đã
// mining trước đó cùng chương.
// Đã loại khi đọc: Câu 5 (phụ thuộc hình ảnh mô hình phân tử, mất phương án A/B do lỗi trích xuất),
// Câu 6-7 (mất hoàn toàn do lỗi đánh số khi trích xuất docx), Câu 32 (phương trình lên men giấm bị
// garbled/mất cấu trúc phương án rõ ràng), Câu 36 (so sánh acetic acid với Na2SO3 — về mặt hóa học
// chính xác thì H2SO3 mạnh hơn acetic acid nên không đủ căn cứ chắc chắn cho đáp án, tránh đưa kiến
// thức có thể sai), Câu 56 (thiếu dữ kiện — chỉ cho 1 nồng độ muối, không đủ để tính nồng độ muối
// còn lại nếu không có thêm ràng buộc khối lượng/tỉ lệ mol cụ thể).
// Đích: ngân hàng luyện tập /practice (PracticeQuestion) Chương 8 Lớp 9.
const CHAPTER_ID = "cmrel0nbq0004vhd8h2hf628n"; // Lớp 9 - Chương 8. Ethylic alcohol và Acetic acid

const QUESTIONS = [
  {
    content: "Trong các chất dưới đây, chất nào có tính chất hóa học đặc trưng giống acetic acid?",
    choices: ["CH3OH.", "CH3CHO.", "HCOOH.", "CH3COOC2H5."],
    correctIndex: 2,
    explanation: "HCOOH (formic acid) cũng có nhóm -COOH nên có tính chất hóa học đặc trưng (tính acid) giống acetic acid.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Một số ấm đun nước lâu ngày có thể có một lớp chất cặn (chứa CaCO3) màu trắng bám vào đáy ấm. Dung dịch nào sau đây có thể hoà tan được lớp cặn nói trên?",
    choices: ["Cồn 70°.", "Giấm ăn.", "Nước vôi trong.", "Nước muối."],
    correctIndex: 1,
    explanation: "Giấm ăn chứa acetic acid, phản ứng được với CaCO3 (acid + muối carbonate) hòa tan lớp cặn.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Nhận định nào sau đây đúng?",
    choices: [
      "Những chất có nhóm –OH hoặc –COOH tác dụng được với NaOH.",
      "Những chất có nhóm –OH tác dụng được với NaOH.",
      "Những chất có nhóm –COOH tác dụng được với NaOH nhưng không tác dụng với Na.",
      "Những chất có nhóm –OH tác dụng được với Na, còn những chất có nhóm –COOH vừa tác dụng được với Na vừa tác dụng được với NaOH.",
    ],
    correctIndex: 3,
    explanation: "Nhóm -OH của alcohol chỉ phản ứng với Na (kim loại kiềm), không phản ứng với NaOH (base). Nhóm -COOH có tính acid nên phản ứng được cả với Na và NaOH.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Tính chất vật lý của acetic acid là",
    choices: [
      "chất lỏng, không màu, vị chua, tan vô hạn trong nước.",
      "chất lỏng, màu trắng, vị chua, tan vô hạn trong nước.",
      "chất lỏng, không màu, vị đắng, tan vô hạn trong nước.",
      "chất lỏng, không màu, vị chua, không tan trong nước.",
    ],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Acetic acid có vị chua của",
    choices: ["giấm.", "chanh.", "me.", "khế."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Giấm ăn là dung dịch acetic acid có nồng độ là",
    choices: ["2% – 5%.", "5% – 9%.", "9% –12%.", "12% –15%."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Acid có trong giấm ăn là",
    choices: ["Acetic acid.", "Formic acid.", "Butyric acid.", "Oxalic acid."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Số liên kết đơn và đôi trong phân tử acetic acid lần lượt là",
    choices: ["6 và 1.", "5 và 1.", "6 và 2.", "5 và 2."],
    correctIndex: 0,
    explanation: "CH3-COOH: 3 liên kết C-H (CH3) + 1 C-C + 1 C-O(H) + 1 O-H = 6 liên kết đơn; 1 liên kết đôi C=O.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Chất nào sau đây làm quì tím đổi màu?",
    choices: ["CH3COOH.", "CH3CH2OH.", "CH2 = CH2.", "CH3OH."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Acetic acid tác dụng với kẽm giải phóng khí",
    choices: ["hydrogen (H2).", "hydrogen chloride (HCl).", "hydrogen sulfide (H2S).", "ammonia (NH3)."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Acetic acid tác dụng với muối carbonate giải phóng khí",
    choices: ["carbon dioxide.", "sulfur dioxide.", "sulfur trioxide.", "carbon monoxide."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Sản phẩm phản ứng giữa rượu và acid hữu cơ được gọi là",
    choices: ["methyl chloride.", "ester.", "sodium acetate.", "ethylene."],
    correctIndex: 1,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Acetic acid không phản ứng với chất nào sau đây?",
    choices: ["ZnO.", "CaCO3.", "MgCl2.", "NaOH."],
    correctIndex: 2,
    explanation: "MgCl2 là muối trung tính của acid mạnh (HCl); acetic acid (acid yếu hơn) không đẩy được Cl- ra khỏi muối này.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất nào sau đây không phản ứng được với dung dịch acetic acid?",
    choices: ["NaOH.", "Cu.", "Zn.", "CaCO3."],
    correctIndex: 1,
    explanation: "Cu đứng sau H trong dãy hoạt động hóa học, không phản ứng với acid yếu như acetic acid.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dung dịch acetic acid không phản ứng được với",
    choices: ["Mg", "NaOH", "NaHCO3", "NaNO3"],
    correctIndex: 3,
    explanation: "NaNO3 là muối trung tính của acid mạnh (HNO3); acetic acid không đẩy được NO3- ra khỏi muối này.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dung dịch acetic acid phản ứng được với tất cả các chất trong dãy nào sau đây?",
    choices: ["NaOH, Na, CaCO3.", "Na, CuO, HCl.", "Na, NaCl, CuO.", "NaOH, Cu, NaCl."],
    correctIndex: 0,
    explanation: "NaOH, Na, CaCO3 đều phản ứng được với acetic acid. Các dãy khác đều lẫn chất không phản ứng (HCl, NaCl, Cu).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Dung dịch acetic acid phản ứng được với tất cả các chất trong dãy nào sau đây?",
    choices: ["Cu, CuO, HCl.", "NaOH, Cu, NaCl.", "Na, NaCl, CuO.", "NaOH, Na, CaCO3."],
    correctIndex: 3,
    explanation: "NaOH, Na, CaCO3 đều phản ứng được với acetic acid (cùng nội dung câu trước, đổi thứ tự phương án).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Chất X (có M = 60 và chứa C, H, O). Chất X phản ứng được với Na, NaOH, NaHCO3, tên gọi của X là",
    choices: ["formic acid.", "methyl formate.", "acetic acid.", "proplic alcohol."],
    correctIndex: 2,
    explanation: "M=60 và phản ứng được với Na, NaOH, NaHCO3 (tính acid) khớp với acetic acid CH3COOH (M=60).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho quì tím vào dung dịch acetic acid, quì tím",
    choices: ["Bị mất màu.", "Không đổi màu.", "Đổi sang màu hồng.", "Đổi sang màu xanh."],
    correctIndex: 2,
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Formic acid có trong nọc kiến. Khi bị kiến cắn, nên chọn chất nào sau đây bôi vào vết thương để giảm sưng tấy?",
    choices: ["Vôi tôi.", "Muối ăn.", "Giấm ăn.", "Nước."],
    correctIndex: 0,
    explanation: "Vôi tôi (base yếu Ca(OH)2) trung hòa formic acid (acid) trong nọc kiến, giảm sưng tấy.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Acetic acid có tính acid vì",
    choices: [
      "Phân tử chứa ba nguyên tố C, H, O.",
      "Phân tử có chứa đồng thời nhóm – OH và nhóm C = O.",
      "Phân tử có chứa nhóm – COOH.",
      "Acetic acid có công thức phân tử là C2H4O2.",
    ],
    correctIndex: 2,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phản ứng nào dưới đây cho thấy acetic acid có tính acid?",
    choices: [
      "2CH3COOH + 2Na → 2CH3COONa + H2.",
      "CH3COOH + 2O2 → 2CO2 + 2H2O.",
      "CH3COOH + NaOH → CH3COONa + H2O.",
      "C2H5OH + O2 →(men) CH3COOH + H2O.",
    ],
    correctIndex: 2,
    explanation: "Phản ứng với base (NaOH) tạo muối và nước là phản ứng trung hòa, thể hiện rõ nhất tính acid đặc trưng.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dung dịch nào sau đây tác dụng được với CaO, CaCO3 nhưng không tác dụng được với dung dịch AgNO3?",
    choices: ["NaOH.", "HCl.", "CH3COOH.", "C2H5OH."],
    correctIndex: 2,
    explanation: "CH3COOH phản ứng với CaO/CaCO3 (tính acid) nhưng không tạo kết tủa với AgNO3 (không có gốc halide). HCl thì có phản ứng với AgNO3 (tạo AgCl↓) nên loại.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cặp chất nào sau đây phản ứng với nhau, thu được khí CO2?",
    choices: ["CH3COOH và ZnO.", "CH3COOH và Zn(OH)2.", "CH3COOH và CaCO3.", "CH3COONa và K2CO3."],
    correctIndex: 2,
    explanation: "CH3COOH + CaCO3 → (CH3COO)2Ca + CO2 + H2O — phản ứng acid với muối carbonate sinh khí CO2.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dãy chất tác dụng với acetic acid là",
    choices: [
      "CuO; Cu(OH)2; Cu; CuSO4; C2H5OH.",
      "CuO; Cu(OH)2; Zn; Na2CO3; C2H5OH.",
      "CuO; Cu(OH)2; Zn; H2SO4; C2H5OH.",
      "CuO; Cu(OH)2; C2H5OH; C6H6; CaCO3.",
    ],
    correctIndex: 1,
    explanation: "CuO (oxide base), Cu(OH)2 (base), Zn (kim loại hoạt động), Na2CO3 (muối carbonate), C2H5OH (ester hóa) đều phản ứng được. Các dãy khác lẫn chất không phản ứng (Cu, CuSO4, H2SO4, C6H6).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Chỉ ra điều sai khi nói về acetic acid",
    choices: [
      "Có phân tử khối là 60 amu.",
      "Tác dụng được với Na, NaOH, Na2CO3, ZnO, C2H5OH.",
      "Có tính acid mạnh hơn carbonic acid.",
      "Đẩy được H2SO4 ra khỏi dung dịch Na2SO4.",
    ],
    correctIndex: 3,
    explanation: "Acetic acid là acid YẾU hơn H2SO4 (acid mạnh), acid yếu không thể đẩy acid mạnh ra khỏi muối của nó — đây là phát biểu sai.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Khi bị ong đốt, để giảm đau, giảm sưng, kinh nghiệm dân gian thường dùng chất nào sau đây để bôi trực tiếp lên vết thương?",
    choices: ["nước vôi.", "nước muối.", "Cồn.", "giấm."],
    correctIndex: 3,
    explanation: "Nọc ong có tính base, dùng giấm (acid yếu) để trung hòa, giảm sưng đau.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phương pháp lên men dung dịch ethylic alcohol loãng dùng để điều chế",
    choices: ["ethylene.", "acetic acid.", "sodium acetate.", "ethyl acetate."],
    correctIndex: 1,
    explanation: "Lên men giấm: C2H5OH + O2 →(men giấm) CH3COOH + H2O.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi để rượu lâu ngày ngoài không khí sẽ có vị chua chứng tỏ đã tạo ra acid nào sau đây?",
    choices: ["Lactic acid.", "Arcrylic acid.", "Acetic acid.", "Sulfuric acid."],
    correctIndex: 2,
    explanation: "Vi khuẩn giấm oxi hóa ethylic alcohol trong không khí tạo acetic acid.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Rót 1 – 2 mL dung dịch chất (X) đậm đặc vào ống nghiệm đựng 1 – 2 mL dung dịch NaHCO3. Đưa que diêm đang cháy vào miệng ống nghiệm thì que diêm tắt. Chất (X) có thể là chất nào sau đây?",
    choices: ["Ethanol.", "Acetaldehyde.", "Acetic acid.", "Phenol."],
    correctIndex: 2,
    explanation: "Acetic acid (có tính acid đủ mạnh) phản ứng với NaHCO3 sinh khí CO2 làm tắt que diêm. Ethanol/acetaldehyde không có tính acid; phenol là acid quá yếu, không đủ để đẩy CO2 từ NaHCO3.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Khẳng định nào sau đây không đúng khi nói về đặc điểm của phản ứng ester hóa?",
    choices: [
      "Phản ứng ester hóa là phản ứng thuận nghịch.",
      "Phản ứng ester hóa là phản ứng một chiều.",
      "Phản ứng ester hóa luôn có hiệu suất < 100%",
      "Phản ứng ester hóa giữa acid và alcohol thường dùng xúc tác là H2SO4 đặc.",
    ],
    correctIndex: 1,
    explanation: "Phản ứng ester hóa là phản ứng thuận nghịch, KHÔNG phải một chiều — đây là phát biểu sai.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho các chất sau: Zn, Cu, CuO, NaCl, C2H5OH, Ca(OH)2. Số chất tác dụng được với dung dịch acetic acid là",
    choices: ["3.", "4.", "5.", "6."],
    correctIndex: 1,
    explanation: "Zn (kim loại hoạt động), CuO (oxide base), C2H5OH (ester hóa), Ca(OH)2 (base) đều phản ứng được — 4 chất. Cu (kim loại yếu) và NaCl (muối trung tính từ acid mạnh) không phản ứng.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Giấm ăn được dùng phổ biến trong chế biến thực phẩm, có chứa acetic acid với hàm lượng 4 – 8% về thể tích. Một chai giấm ăn thể tích 500 mL có hàm lượng acetic acid là 5%, thể tích acetic acid có trong chai giấm ăn đó là",
    choices: ["5 mL.", "25 mL.", "50 mL.", "100 mL."],
    correctIndex: 1,
    explanation: "V(acetic acid) = 5%×500 = 25 mL.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Hòa tan hoàn toàn 6,5 gam Zn vào dung dịch CH3COOH. Thể tích khí H2 thoát ra (đkc) là",
    choices: ["0,61975 lít.", "1,2395 lít.", "2,479 lít.", "3,7185 lít."],
    correctIndex: 2,
    explanation: "n(Zn)=6,5/65=0,1mol. Zn+2CH3COOH→(CH3COO)2Zn+H2, n(H2)=n(Zn)=0,1mol→V=0,1×24,79=2,479 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thể tích dung dịch NaOH 1M cần để trung hòa vừa đủ 200 gam dung dịch acetic acid 6% là",
    choices: ["100 mL.", "200 mL.", "300 mL.", "400 mL."],
    correctIndex: 1,
    explanation: "m(acid)=12g→n=0,2mol. n(NaOH)=n(acid)=0,2mol→V=0,2/1=200mL.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trung hòa 400 mL dung dịch acetic acid 0,5M bằng dung dịch NaOH 0,5M. Thể tích dung dịch NaOH cần dùng là",
    choices: ["100 mL.", "200 mL.", "300 mL.", "400 mL."],
    correctIndex: 3,
    explanation: "n(acid)=0,4×0,5=0,2mol=n(NaOH)→V=0,2/0,5=400mL.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Để trung hòa 10 mL dung dịch CH3COOH cần 15,2 mL dung dịch NaOH 0,2M. Vậy nồng độ của dung dịch CH3COOH là",
    choices: ["0,05 M.", "0,10 M.", "0,304 M.", "0,215 M."],
    correctIndex: 2,
    explanation: "n(NaOH)=0,0152×0,2=0,00304mol=n(acid)→CM=0,00304/0,01=0,304M.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Để trung hòa 40 mL giấm ăn cần 25 mL dung dịch NaOH 1M. Biết khối lượng riêng của giấm là 1 g/mL. Vậy mẫu giấm ăn này có nồng độ là",
    choices: ["3,5%.", "3,75%.", "4%.", "5%."],
    correctIndex: 1,
    explanation: "n(NaOH)=0,025mol=n(acid)→m(acid)=1,5g. m(giấm)=40g. C%=1,5/40×100%=3,75%.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho 9 gam CH3COOH tác dụng vừa đủ với dung dịch NaOH, thu được dung dịch chứa m gam muối. Giá trị của m là",
    choices: ["8,2.", "12,5.", "12,3.", "15,0."],
    correctIndex: 2,
    explanation: "n(CH3COOH)=9/60=0,15mol=n(CH3COONa)→m=0,15×82=12,3g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho dung dịch chứa 10 gam CH3COOH tác dụng với dung dịch chứa 10 gam KOH. Sau khi phản ứng hoàn toàn dung dịch chứa các chất tan là",
    choices: ["CH3COOK và KOH.", "CH3COOK và CH3COOH.", "CH3COOK.", "CH3COOK, CH3COOH và KOH."],
    correctIndex: 0,
    explanation: "n(CH3COOH)=10/60=0,1667mol; n(KOH)=10/56=0,1786mol. KOH dư (0,1786>0,1667) nên dung dịch chứa CH3COOK và KOH dư.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho 100 mL dung dịch CH3COOH 0,1M vào 100 mL dung dịch Ca(OH)2 0,1M. Dung dịch sau phản ứng có khả năng",
    choices: ["làm quỳ tím hóa xanh.", "làm quỳ tím hóa đỏ.", "không làm quỳ tím đổi màu.", "tác dụng với Mg giải phóng khí H2."],
    correctIndex: 0,
    explanation: "n(acid)=0,01mol; n(OH⁻)=2×0,01=0,02mol. Base dư (Ca(OH)2 dư) nên dung dịch có tính base, quỳ tím hóa xanh.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Hòa tan 20 gam CaCO3 vào dung dịch CH3COOH dư. Thể tích CO2 thoát ra (đkc) là",
    choices: ["2,479 lít.", "3,7185 lít.", "4,958 lít.", "6,1975 lít."],
    correctIndex: 2,
    explanation: "n(CaCO3)=20/100=0,2mol=n(CO2)→V=0,2×24,79=4,958 lít.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho dung dịch CH3COOH 0,5M tác dụng với Na2CO3 vừa đủ, thu được 4,958 lít khí CO2 (đkc). Thể tích của dung dịch CH3COOH đã phản ứng là",
    choices: ["400 mL.", "800 mL.", "600 mL.", "1000 mL."],
    correctIndex: 1,
    explanation: "n(CO2)=0,2mol. 2CH3COOH+Na2CO3→2CH3COONa+CO2+H2O, n(acid)=2×0,2=0,4mol→V=0,4/0,5=800mL.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho 200 gam dung dịch CH3COOH 9% tác dụng vừa đủ với Na2CO3. Thể tích khí CO2 (đkc) thu được là",
    choices: ["4,958 lít.", "3,3 lít.", "3,7185 lít.", "2,479 lít."],
    correctIndex: 2,
    explanation: "m(acid)=18g→n=0,3mol→n(CO2)=0,3/2=0,15mol→V=0,15×24,79=3,7185 lít.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Cho 10 gam hỗn hợp gồm ethylic alcohol và acetic acid tham gia phản ứng vừa đủ với 7,42 gam Na2CO3. Thành phần phần trăm khối lượng mỗi chất có trong hỗn hợp ban đầu là",
    choices: ["CH3COOH (16%), C2H5OH (84%).", "CH3COOH (58%), C2H5OH (42%).", "CH3COOH (84%), C2H5OH (16%).", "CH3COOH (42%), C2H5OH (58%)."],
    correctIndex: 2,
    explanation: "n(Na2CO3)=7,42/106=0,07mol. Chỉ CH3COOH phản ứng: n(CH3COOH)=2×0,07=0,14mol→m=8,4g. %CH3COOH=84%, %C2H5OH=16%.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Hòa tan hoàn toàn 24 gam CuO vào dung dịch CH3COOH 10%. Khối lượng dung dịch CH3COOH cần dùng là",
    choices: ["360 gam.", "380 gam.", "340 gam.", "320 gam."],
    correctIndex: 0,
    explanation: "n(CuO)=0,3mol. CuO+2CH3COOH→(CH3COO)2Cu+H2O, n(acid)=0,6mol→m(acid)=36g→m(dd 10%)=360g.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Cho dung dịch chứa 10 gam hỗn hợp C2H5OH và CH3COOH tác dụng với Zn dư, thu được 1,2395 lít khí H2 (đkc). Thành phần phần trăm theo khối lượng của ethylic alcohol và acetic acid lần lượt là",
    choices: ["30% và 70%.", "40% và 60%.", "70% và 30%.", "60% và 40%."],
    correctIndex: 1,
    explanation: "n(H2)=0,05mol. Chỉ CH3COOH phản ứng Zn: n(CH3COOH)=2×0,05=0,1mol→m=6g→%CH3COOH=60%,%C2H5OH=40%.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho 16,6 gam hỗn hợp gồm HCOOH, CH3COOH tác dụng hết với Mg, thu được 3,7185 lít H2 (đkc). Khối lượng CH3COOH là",
    choices: ["12 gam.", "9 gam.", "6 gam.", "4,6 gam."],
    correctIndex: 0,
    explanation:
      "n(H2)=0,15mol→tổng n(acid)=0,3mol. Đặt x=HCOOH,y=CH3COOH: x+y=0,3; 46x+60y=16,6. Giải: y=0,2,x=0,1. m(CH3COOH)=12g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Để trung hòa hoàn toàn 4,8 gam hỗn hợp X gồm hai acid hữu cơ Y, Z cần x mol NaOH, thu được 6,78 gam muối. Giá trị của x là",
    choices: ["0,05.", "0,07.", "0,09.", "0,07."],
    correctIndex: 2,
    explanation: "Δm = m(muối)-m(acid) = 22×n(NaOH) (mỗi mol NaOH thay 1H bằng 1Na, tăng 22g). (6,78-4,8)/22=0,09mol.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho dung dịch acetic acid có nồng độ x% tác dụng vừa đủ với dung dịch NaOH 10%, thu được dung dịch muối có nồng độ 10,25%. Giá trị của x là",
    choices: ["20.", "16.", "15.", "13."],
    correctIndex: 2,
    explanation:
      "Với 100g NaOH 10% (n=0,25mol): n(acid)=0,25mol→m(acid)=15g→m(dd acid)=1500/x. m(muối)=0,25×82=20,5g. C%=20,5/(1500/x+100)=10,25% → giải ra x=15.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho Na dư tác dụng với a gam dung dịch CH3COOH. Kết thúc phản ứng, thấy khối lượng H2 sinh ra là 11a/240 gam. Vậy nồng độ C% dung dịch acid là",
    choices: ["10%.", "25%.", "4,58%.", "36%."],
    correctIndex: 1,
    explanation: "Giải phương trình 2×[aC/12000+(a-aC/100)/36]=11a/240 (H2 từ cả acid và nước) → C=25%.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Muốn trung hòa 6,72 gam một acid hữu cơ X cần dùng 200 gam dung dịch NaOH 2,24%. Công thức của X là",
    choices: ["CH3COOH.", "CH3CH2COOH.", "HCOOH.", "CH2=CHCOOH."],
    correctIndex: 0,
    explanation: "n(NaOH)=4,48/40=0,112mol. Nếu X đơn chức: n(X)=0,112mol→M=6,72/0,112=60→CH3COOH.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Cho acetic acid tác dụng với ethylic alcohol có mặt H2SO4 đặc làm xúc tác và đun nóng. Sau phản ứng thu được 44 gam ethyl acetate. Khối lượng CH3COOH và C2H5OH đã phản ứng là",
    choices: ["60 gam và 46 gam.", "30 gam và 23 gam.", "15 gam và 11,5 gam.", "45 gam và 34,5 gam."],
    correctIndex: 1,
    explanation: "n(ester)=44/88=0,5mol (100% hiệu suất). m(CH3COOH)=0,5×60=30g; m(C2H5OH)=0,5×46=23g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho 30 gam acetic acid CH3COOH tác dụng với ethylic alcohol dư có mặt H2SO4 đặc làm xúc tác (hiệu suất 100%). Khối lượng ethyl acetate tạo thành là",
    choices: ["33 gam.", "44 gam.", "55 gam.", "66 gam."],
    correctIndex: 1,
    explanation: "n(acid)=0,5mol (chất giới hạn vì alcohol dư). n(ester)=0,5mol→m=0,5×88=44g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho 23 gam ethylic alcohol vào dung dịch acetic acid dư. Khối lượng ethyl acetate thu được là (biết hiệu suất phản ứng 30%)",
    choices: ["26,4 gam.", "13,2 gam.", "36,9 gam.", "32,1 gam."],
    correctIndex: 1,
    explanation: "n(alcohol)=0,5mol (chất giới hạn). n(ester lý thuyết)=0,5mol→thực tế(30%)=0,15mol→m=13,2g.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Đốt cháy hết x gam C2H5OH, thu được 0,25 mol CO2. Đốt cháy hết y gam CH3COOH, thu được 0,25 mol CO2. Cho x gam C2H5OH tác dụng với y gam CH3COOH (giả sử hiệu suất phản ứng là 100%). Khối lượng ester thu được là",
    choices: ["9 gam.", "10 gam.", "11 gam.", "12 gam."],
    correctIndex: 2,
    explanation: "n(C2H5OH)=0,25/2=0,125mol; n(CH3COOH)=0,25/2=0,125mol (bằng nhau). n(ester)=0,125mol→m=0,125×88=11g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Đun nóng hỗn hợp gồm 3 gam ethylic alcohol và 3 gam acetic acid với H2SO4 đặc làm xúc tác (hiệu suất 100%), khối lượng ester thu được là",
    choices: ["3,3 gam.", "4,4 gam.", "6,6 gam.", "3,6 gam."],
    correctIndex: 1,
    explanation: "n(alcohol)=3/46=0,0652mol; n(acid)=3/60=0,05mol (giới hạn). n(ester)=0,05mol→m=4,4g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho 12 gam acetic acid tác dụng với 9,2 gam ethylic alcohol đun nóng và có mặt H2SO4 đặc làm xúc tác (hiệu suất 100%) khối lượng ethyl acetate là",
    choices: ["8,8 gam.", "88 gam.", "17,6 gam.", "176 gam."],
    correctIndex: 2,
    explanation: "n(acid)=0,2mol; n(alcohol)=0,2mol (bằng nhau). n(ester)=0,2mol→m=17,6g.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đun 3,0 gam CH3COOH với C2H5OH dư (xúc tác H2SO4 đặc), thu được 2,2 gam CH3COOC2H5. Hiệu suất của phản ứng ester hóa tính theo acid là",
    choices: ["25,00%.", "50,00%.", "36,67%.", "20,75%."],
    correctIndex: 1,
    explanation: "n(acid)=0,05mol (lý thuyết, chất giới hạn). n(ester thực tế)=2,2/88=0,025mol. Hiệu suất=0,025/0,05×100%=50%.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho 120 gam CH3COOH tác dụng với 46 gam C2H5OH được 52,8 gam CH3COOC2H5. Hiệu suất ester hóa là",
    choices: ["10%.", "20%.", "30%.", "60%."],
    correctIndex: 3,
    explanation: "n(acid)=2mol; n(alcohol)=1mol (chất giới hạn, lý thuyết n(ester)=1mol). n(ester thực tế)=52,8/88=0,6mol. Hiệu suất=0,6/1×100%=60%.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho 60 gam acetic acid tác dụng với 55,2 gam ethylic alcohol tạo ra 55 gam ethyl acetate. Hiệu suất của phản ứng là",
    choices: ["65,2%.", "62,5%.", "56,2%.", "72,5%."],
    correctIndex: 1,
    explanation: "n(acid)=1mol (giới hạn); n(alcohol)=1,2mol dư. n(ester thực tế)=55/88=0,625mol. Hiệu suất=0,625/1×100%=62,5%.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Đun nóng 6 gam CH3COOH với 9,2 gam C2H5OH (có H2SO4 đặc làm xúc tác) đến khi phản ứng đạt tới trạng thái cân bằng thì được 5,5 gam ester. Hiệu suất phản ứng ester hóa là",
    choices: ["62,5%.", "55%.", "75%.", "80%."],
    correctIndex: 0,
    explanation: "n(acid)=0,1mol (giới hạn); n(alcohol)=0,2mol dư. n(ester thực tế)=5,5/88=0,0625mol. Hiệu suất=0,0625/0,1×100%=62,5%.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Trộn 20 mL ethylic alcohol 92° với 300 mL acetic acid 1M, thu được hỗn hợp X. Cho H2SO4 đặc vào X rồi đun nóng, sau một thời gian thu được 21,12 gam ester. Biết khối lượng riêng của ethylic alcohol nguyên chất là 0,8 gam/mL. Hiệu suất phản ứng ester hoá là",
    choices: ["75%.", "80%.", "85%.", "60%."],
    correctIndex: 1,
    explanation:
      "n(acid)=0,3mol. V(alcohol nguyên chất)=92%×20=18,4mL→m=14,72g→n=0,32mol. Acid là chất giới hạn (0,3<0,32). n(ester lý thuyết)=0,3mol. n(ester thực tế)=21,12/88=0,24mol. Hiệu suất=0,24/0,3×100%=80%.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content:
      "Khi đun nóng 25,8 gam hỗn hợp ethylic alcohol và acetic acid có H2SO4 đặc làm xúc tác thu được 14,08 gam ester. Nếu đốt cháy hoàn toàn lượng hỗn hợp ban đầu đó thu được 23,4 gam nước. Hiệu suất của phản ứng ester hóa là",
    choices: ["70%.", "80%.", "75%.", "85%."],
    correctIndex: 1,
    explanation:
      "Đặt x=n(C2H5OH),y=n(CH3COOH): 46x+60y=25,8. Đốt cháy: C2H5OH→3H2O, CH3COOH→2H2O: 3x+2y=1,3(=23,4/18). Giải: x=0,3,y=0,2 (acid là chất giới hạn). n(ester lý thuyết)=0,2mol. n(ester thực tế)=14,08/88=0,16mol. Hiệu suất=0,16/0,2×100%=80%.",
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
        source: "KHTN 9 - Tài liệu học tập 2024 (VEAgroup) — Chương 8. Acetic acid",
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
