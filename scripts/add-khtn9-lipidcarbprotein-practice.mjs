import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AK: bài tập mining từ KHTN 9 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx (Tài liệu/Lớp 6-9 (THCS)/
// Mới upload (Lớp 6,7,8,9)/). Tài liệu này KHÔNG có bảng đáp án — mọi đáp án tự giải bằng kiến thức
// hóa học. Đây là toàn bộ Chương 9 (Lipid - Carbohydrate - Protein - Polymer), hoàn tất luôn 4 chương
// KHTN 9 TLHT còn thiếu (nối tiếp Chương 6 Kim loại, Chương 7 Hydrocarbon, Chương 8 Ethylic
// alcohol/Acetic acid đã mining trước đó).
// Đã loại khi đọc: câu thiếu phương án/garbled do lỗi trích xuất numbering docx (Lipid câu 2,16,20;
// Carbohydrate câu 8-11,18,30; Protein câu 16; Polymer câu 4,7), câu không đủ căn cứ hóa học chắc
// chắn trong phạm vi lớp 9 (Polymer câu 4 — "polymer tổng hợp từ quá trình quang hóa" là thuật ngữ
// mơ hồ không chuẩn hóa).
// Đích: ngân hàng luyện tập /practice (PracticeQuestion) Chương 9 Lớp 9.
const CHAPTER_ID = "cmrel0nom0005vhd8xqy5iwe1"; // Lớp 9 - Chương 9. Lipid - Carbohydrate - Protein - Polymer

const QUESTIONS = [
  // ==================== LIPID ====================
  {
    content: "Chọn câu đúng nhất trong các câu sau:",
    choices: [
      "Dầu ăn là ester.",
      "Dầu ăn là ester của glycerol.",
      "Dầu ăn là một ester của glycerol và acid béo.",
      "Dầu ăn là hỗn hợp nhiều ester của glycerol và các acid béo.",
    ],
    correctIndex: 3,
    explanation: "Dầu ăn thực tế là hỗn hợp nhiều loại triglyceride (ester của glycerol với các acid béo khác nhau), không chỉ một ester đơn lẻ.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Trường hợp nào sau đây không thể là acid béo?",
    choices: ["C15H31COOH.", "C17H35COOH.", "C17H33OH.", "C17H33COOH."],
    correctIndex: 2,
    explanation: "C17H33OH là alcohol (nhóm -OH), không phải acid béo (cần nhóm -COOH).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Công thức chung của chất béo là",
    choices: ["RCOOH.", "C3H5(OH)3.", "(RCOO)3C3H5.", "RCOONa."],
    correctIndex: 2,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trường hợp nào sau đây chứa thành phần chính là chất béo?",
    choices: ["trứng gà.", "tóc.", "dầu oliu.", "Dầu hỏa."],
    correctIndex: 2,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trường hợp nào sau đây không chứa chất béo?",
    choices: ["dầu dừa.", "mỡ gà.", "mỡ lợn.", "Dầu hỏa."],
    correctIndex: 3,
    explanation: "Dầu hỏa là hỗn hợp hydrocarbon từ dầu mỏ, không phải ester của glycerol.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Thủy phân chất béo trong môi trường acid thu được",
    choices: [
      "glycerol và một loại acid béo.",
      "glycerol và một số loại acid béo.",
      "glycerol và một muối của acid béo.",
      "glycerol và xà phòng.",
    ],
    correctIndex: 1,
    explanation: "Các gốc R trong chất béo có thể khác nhau nên thủy phân cho glycerol và một số (nhiều) loại acid béo khác nhau.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đun nóng chất béo với nước (acid làm xúc tác), thu được sản phẩm là",
    choices: ["Glycerol và acid béo.", "Glycerol và muối của các acid béo.", "Acid béo.", "Muối của các acid béo."],
    correctIndex: 0,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thủy phân chất béo trong môi trường kiềm thu được",
    choices: [
      "glycerol và muối của một acid béo.",
      "glycerol và acid béo.",
      "glycerol và xà phòng.",
      "glycerol và muối của các acid béo",
    ],
    correctIndex: 3,
    explanation: "Môi trường kiềm trung hòa ngay acid béo tạo thành, cho ra glycerol và muối (thường nhiều loại acid béo khác nhau).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Phản ứng thủy phân chất béo trong môi trường kiềm còn gọi là phản ứng",
    choices: ["thủy phân hóa.", "xà phòng hóa.", "ester hóa.", "hydrogen hóa."],
    correctIndex: 1,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong công nghiệp, chất béo chủ yếu được dùng để điều chế",
    choices: ["nước hoa.", "Dầu ăn.", "ethylic alcohol.", "Xà phòng và glycerol."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào sau đây không phải là chất béo?",
    choices: ["(C17H35COO)3C3H5.", "(C15H31COO)3C3H5.", "(C17H33COO)3C3H5.", "(CH3COO)3C3H5."],
    correctIndex: 3,
    explanation: "Gốc CH3COO- quá ngắn, không phải acid béo thực (acid béo cần mạch carbon dài).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Một chất béo có công thức (C17H35COO)3C3H5 có khối lượng phân tử là",
    choices: ["890 amu.", "422 amu.", "372 amu.", "980 amu."],
    correctIndex: 0,
    explanation: "Tristearin C57H110O6: M=57×12+110×1+6×16=684+110+96=890.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Công thức cấu tạo của acetic acid khác với ethylic alcohol là",
    choices: [
      "có nhóm –CH3.",
      "có nhóm –OH.",
      "có hai nguyên tử oxygen.",
      "có nhóm –OH kết hợp với nhóm C = O tạo thành nhóm –COOH.",
    ],
    correctIndex: 3,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Điểm chung của ethylic alcohol và acetic acid và chất béo là",
    choices: ["đều không tan trong nước.", "đều tan trong nước.", "đều tác dụng với Na.", "đều chứa các nguyên tố C, H, O."],
    correctIndex: 3,
    explanation: "Chất béo không tan trong nước và không phản ứng với Na (không có nhóm -OH/-COOH tự do), nên chỉ có đáp án về thành phần nguyên tố là đúng cho cả 3.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho ethylic alcohol, acetic acid, chất béo lần lượt tác dụng với Na, dung dịch NaOH, O2. Số phản ứng xảy ra là",
    choices: ["5.", "7.", "6.", "8."],
    correctIndex: 1,
    explanation:
      "Alcohol: +Na(✓),+NaOH(✗),+O2(✓)=2. Acid: +Na(✓),+NaOH(✓),+O2(✓)=3. Chất béo: +Na(✗),+NaOH(✓,xà phòng hóa),+O2(✓)=2. Tổng=2+3+2=7.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho các phát biểu sau: Ethylic alcohol có tên gọi khác là ethanol. Acetic acid là chất lỏng, không màu, vị ngọt, tan tốt trong nước. Chất béo là chất lỏng hoặc rắn, nhẹ hơn nước, không tan trong nước. Ethylic alcohol và acetic acid đều làm đổi màu quỳ tím. Acetic acid và chất béo đều tác dụng với dung dịch NaOH. Số phát biểu đúng là",
    choices: ["2.", "3.", "4.", "5."],
    correctIndex: 1,
    explanation: "Đúng: (1) ethylic alcohol=ethanol; (3) chất béo lý tính đúng; (5) acid+chất béo đều +NaOH. Sai: (2) acetic acid vị chua không phải ngọt; (4) alcohol không làm đổi màu quỳ tím. Tổng 3 phát biểu đúng.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Đun nóng 4,45 gam chất béo (C17H35COO)3C3H5 với dung dịch NaOH. Khối lượng glycerol thu được là",
    choices: ["0,46 gam.", "1,2 gam.", "0,75 gam.", "2 gam."],
    correctIndex: 0,
    explanation: "n(tristearin)=4,45/890=0,005mol=n(glycerol)→m=0,005×92=0,46g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Xà phòng hóa hoàn toàn 178 gam chất béo X trong dung dịch KOH, thu được m gam muối Potassium stearate (C17H35COOK). Giá trị của m là",
    choices: ["200,8.", "183,6.", "211,6.", "193,2."],
    correctIndex: 3,
    explanation: "n(X)=178/890=0,2mol→n(muối)=3×0,2=0,6mol(M=322)→m=193,2g.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Xà phòng hóa hoàn toàn 17,8 gam chất béo X cần vừa đủ dung dịch chứa 0,06 mol NaOH. Cô cạn dung dịch sau phản ứng thu được m gam muối khan. Giá trị của m là",
    choices: ["19,12.", "18,36.", "19,04.", "14,68."],
    correctIndex: 1,
    explanation: "n(X)=0,02mol(=0,06/3)→M=890(tristearin). n(glycerol)=0,02mol→m=1,84g. Bảo toàn khối lượng: m(muối)=17,8+0,06×40-1,84=18,36g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Xà phòng hoá hoàn toàn 17,24 gam chất béo cần vừa đủ 0,06 mol NaOH. Cô cạn dung dịch sau phản ứng thu được khối lượng xà phòng là",
    choices: ["17,80 gam.", "18,24 gam.", "16,68 gam.", "18,38 gam."],
    correctIndex: 0,
    explanation: "n(glycerol)=0,02mol→m=1,84g. m(NaOH)=2,4g. Bảo toàn khối lượng: m(xà phòng)=17,24+2,4-1,84=17,8g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Thủy phân hoàn toàn m gam chất béo bằng dung dịch NaOH, đun nóng thu được 9,2 gam glycerol và 91,8 gam muối. Giá trị của m là",
    choices: ["89.", "101.", "85.", "93."],
    correctIndex: 0,
    explanation: "n(glycerol)=0,1mol→n(NaOH)=0,3mol(12g). Bảo toàn khối lượng: m=91,8+9,2-12=89g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Đun 26,7 kg chất béo có công thức hóa học (C17H35COO)3C3H5 với dung dịch NaOH dư (giả sử hiệu suất phản ứng đạt 100%), khối lượng glycerol thu được là",
    choices: ["1,2 kg.", "2,76 kg.", "3,6 kg.", "4,8 kg."],
    correctIndex: 1,
    explanation: "n=26700g/890=30mol=n(glycerol)→m=30×92=2760g=2,76kg.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Thủy phân hoàn toàn 34,32 kg một loại chất béo cần vừa đủ 4,8 kg NaOH, sản phẩm thu được gồm 3,68 kg glycerol và hỗn hợp muối của các acid béo. Khối lượng hỗn hợp các muối là",
    choices: ["17,72 kg.", "35,44 kg.", "37,92 kg.", "32,77 kg."],
    correctIndex: 1,
    explanation: "Bảo toàn khối lượng: m(muối)=34,32+4,8-3,68=35,44kg.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Thủy phân hoàn toàn 89 gam chất béo bằng dung dịch NaOH để điều chế xà phòng thu được 9,2 gam glycerol. Khối lượng xà phòng thu được là (biết muối của acid béo chiếm 60% khối lượng xà phòng)",
    choices: ["153 gam.", "58,92 gam.", "55,08 gam.", "91,8 gam."],
    correctIndex: 0,
    explanation: "n(glycerol)=0,1mol→n(NaOH)=0,3mol(12g). Bảo toàn khối lượng: m(muối tinh khiết)=89+12-9,2=91,8g. Xà phòng: m=91,8/0,6=153g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Thủy phân chất béo (C17H35COO)3C3H5 cần dùng 1,2 kg NaOH. Biết hiệu suất phản ứng đạt 80%. Khối lượng glycerol thu được là",
    choices: ["8,1 kg.", "0,75 kg.", "0,736 kg.", "6,9kg."],
    correctIndex: 2,
    explanation: "n(NaOH)=1,2/40=0,03kmol→n(glycerol lý thuyết)=0,01kmol. Thực tế(80%)=0,008kmol→m=0,008×92=0,736kg.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Thủy phân 17,8 gam tristearin (C17H35COO)3C3H5 bằng 350 mL dung dịch KOH 0,2M thu được glycerol và dung dịch Y. Cô cạn Y thu được m gam chất rắn. Giá trị của m là",
    choices: ["19,88.", "19,32.", "18,76.", "7,00."],
    correctIndex: 0,
    explanation:
      "n(tristearin)=17,8/890=0,02mol; n(KOH)=0,07mol (dư so với cần 0,06mol). Muối C17H35COOK(0,06mol,M=322)+KOH dư(0,01mol,M=56). m(rắn)=0,06×322+0,01×56=19,32+0,56=19,88g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Để thủy phân hoàn toàn 8,58 kg một loại chất béo cần vừa đủ 1,2 kg NaOH thu được 0,368kg glycerol và m kg hỗn hợp muối của các acid béo. Khối lượng xà phòng bánh thu được là bao nhiêu? Biết muối của các acid béo chiếm 60% khối lượng xà phòng.",
    choices: ["15,69 kg.", "20 kg.", "17 kg.", "18 kg."],
    correctIndex: 0,
    explanation: "Bảo toàn khối lượng: m(muối)=8,58+1,2-0,368=9,412kg. Xà phòng: m=9,412/0,6=15,69kg.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Để điều chế được 2 tấn C17H33COONa dùng làm xà phòng, thì khối lượng chất béo (C17H33COO)3C3H5 đem dùng là bao nhiêu? Biết hiệu suất phản ứng là 84%.",
    choices: ["2 tấn.", "3 tấn.", "2,31 tấn.", "3,31 tấn."],
    correctIndex: 2,
    explanation: "n(muối,M=304)=2000/304=6,5789kmol. n(chất béo lý thuyết,M=884)=6,5789/3=2,193kmol. Thực tế(chia 84%)=2,6107kmol→m=2,6107×884=2308,2kg≈2,31 tấn.",
    difficulty: "VAN_DUNG_CAO",
  },
  // ==================== CARBOHYDRATE (Glucose, Saccharose) ====================
  {
    content: "Tính chất nào là tính chất vật lí của glucose?",
    choices: [
      "Chất kết tinh, không màu, vị ngọt, dễ tan trong nước.",
      "Chất rắn màu trắng, vị ngọt, dễ tan trong nước.",
      "Chất rắn không màu, vị ngọt, dễ tan trong nước.",
      "Chất kết tinh, màu trắng, vị ngọt, dễ tan trong nước.",
    ],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức phân tử của glucose là",
    choices: ["C6H12O6.", "C6H12O7.", "C12H22O11.", "(–C6H10O5–)n."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Số nguyên tử oxygen trong phân tử glucose là",
    choices: ["12.", "6.", "5.", "10."],
    correctIndex: 1,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Số nguyên tử hydrogen trong phân tử glucose là",
    choices: ["11.", "22.", "6.", "12."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất hữu cơ X có các tính chất sau: Ở điều kiện thường là chất rắn kết tinh. Tan nhiều trong nước. Vậy X là",
    choices: ["ethylene.", "glucose.", "chất béo.", "acetic acid."],
    correctIndex: 1,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi bị ốm, mất sức, nhiều người bệnh thường được truyền dịch đường để bổ sung nhanh năng lượng. Chất trong dịch truyền có tác dụng trên là",
    choices: ["Glucose.", "Saccharose.", "Fructose.", "Maltose."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Bệnh nhân phải tiếp đường (tiêm hoặc truyền dung dịch đường vào tĩnh mạch), đó là loại đường nào?",
    choices: ["Saccharose.", "Glucose.", "Fructose.", "Maltose."],
    correctIndex: 1,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Glucose tham gia phản ứng hóa học nào sau đây?",
    choices: ["Phản ứng trùng hợp.", "Phản ứng lên men rượu.", "Phản ứng xà phòng hóa.", "Phản ứng ester hóa."],
    correctIndex: 1,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất không tham gia phản ứng thủy phân là",
    choices: ["Tinh bột.", "Cellulose.", "Chất béo.", "Glucose."],
    correctIndex: 3,
    explanation: "Glucose là monosaccharide đơn giản nhất, không thể thủy phân thêm.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Glucose có thể tác dụng với chất nào sau đây?",
    choices: ["Dung dịch AgNO3 trong NH3.", "Dung dịch nước bromine.", "Dung dịch nước vôi trong.", "Dung dịch AgNO3."],
    correctIndex: 0,
    explanation: "Glucose có phản ứng tráng bạc đặc trưng với AgNO3 trong dung dịch NH3.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong công nghiệp chế tạo ruột phích, người ta thường sử dụng phản ứng hoá học nào sau đây?",
    choices: [
      "Cho ethylene tác dụng với dung dịch AgNO3/NH3.",
      "Cho ethylic alcohol tác dụng với dung dịch AgNO3/NH3.",
      "Cho acetic acid tác dụng với dung dịch AgNO3/NH3.",
      "Cho glucose tác dụng với dung dịch AgNO3/NH3.",
    ],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phản ứng tráng gương là phản ứng nào sau đây?",
    choices: [
      "2CH3COOH + Ba(OH)2 → (CH3COO)2Ba + H2.",
      "2C2H5OH + 2K → 2C2H5OK + H2.",
      "C6H12O6 →(men) 2C2H5OH + 2CO2.",
      "C6H12O6 + Ag2O →(NH3) C6H12O7 + 2Ag↓.",
    ],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong điều kiện thích hợp glucose lên men tạo thành khí CO2 và",
    choices: ["CH3CHO.", "HCOOH.", "CH3COOH.", "C2H5OH."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Đường mía dùng trong gia đình là đường",
    choices: ["glucose.", "fructose.", "saccharose.", "cellulose."],
    correctIndex: 2,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Đường mía là loại đường nào sau đây?",
    choices: ["maltose.", "glucose.", "fructose.", "saccharose."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Nồng độ saccharose trong mía có thể đạt tới",
    choices: ["10%.", "13%.", "16%.", "23%."],
    correctIndex: 1,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Công thức phân tử của saccharose là",
    choices: ["C6H12O6.", "C6H12O7.", "C12H22O11.", "(–C6H10O5–)n."],
    correctIndex: 2,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Saccharose có những ứng dụng trong thực tế là",
    choices: [
      "nguyên liệu trong công nghiệp thực phẩm, thức ăn cho người, pha chế thuốc.",
      "nguyên liệu sản xuất thuốc nhuộm, sản xuất giấy, là thức ăn cho người.",
      "làm thức ăn cho người, tráng gương, tráng ruột phích.",
      "làm thức ăn cho người, sản xuất gỗ, giấy, thuốc nhuộm.",
    ],
    correctIndex: 0,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Saccharose tham gia phản ứng hóa học nào sau đây?",
    choices: ["Phản ứng tráng gương.", "Phản ứng thủy phân.", "Phản ứng xà phòng hóa.", "Phản ứng ester hóa."],
    correctIndex: 1,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chọn câu đúng nhất trong các câu sau:",
    choices: [
      "Saccharose bị thuỷ phân tạo ra 2 phân tử fructose.",
      "Saccharose bị thuỷ phân khi đun nóng trong dung dịch.",
      "Saccharose không bị thuỷ phân khi đun nóng trong dung dịch acid.",
      "Khi đun nóng trong dung dịch acid, saccharose bị thuỷ phân thành glucose và fructose.",
    ],
    correctIndex: 3,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Chất X là một gluxit có phản ứng thủy phân: X + H2O → Y + Z. X có công thức phân tử nào sau đây?",
    choices: ["Glucose.", "Tinh bột.", "Saccharose.", "Cellulose."],
    correctIndex: 2,
    explanation: "Saccharose thủy phân cho 2 sản phẩm khác nhau (glucose và fructose); tinh bột/cellulose thủy phân chỉ cho glucose (1 loại sản phẩm); glucose không thủy phân được.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho các phát biểu sau về saccharose: Có trong thân cây mía, củ cải đường,… Có công thức phân tử là C12H22O11. Là chất kết tinh, không màu, vị ngọt, tan tốt trong nước. Có phản ứng tráng bạc. Có phản ứng với dung dịch H2SO4, đun nóng. Dùng để pha chế thuốc. Số phát biểu đúng về saccharose là",
    choices: ["6.", "3.", "4.", "5."],
    correctIndex: 3,
    explanation: "Sai duy nhất: saccharose không có phản ứng tráng bạc trực tiếp (chỉ sản phẩm thủy phân của nó mới có). Còn lại 5 phát biểu đều đúng.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Đun nóng dung dịch chứa 18,0 gam glucose với lượng dư dung dịch AgNO3 trong NH3, đến khi phản ứng xảy ra hoàn toàn thu được m gam Ag. Giá trị của m là",
    choices: ["10,8.", "21,6.", "32,4.", "16,2."],
    correctIndex: 1,
    explanation: "n(glucose)=18/180=0,1mol→n(Ag)=2×0,1=0,2mol→m=21,6g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đun 100 mL dung dịch glucose với một lượng dư dung dịch Ag2O/NH3, thu được 5,4 gam Ag. Nồng độ mol của dung dịch glucose là",
    choices: ["0,025M.", "0,05M.", "0,25M.", "0,725M."],
    correctIndex: 2,
    explanation: "n(Ag)=0,05mol→n(glucose)=0,025mol→CM=0,025/0,1=0,25M.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Cho 50 mL dung dịch glucose chưa rõ nồng độ tác dụng với một lượng dư AgNO3 (hoặc Ag2O) trong dung dịch NH3, thu được 2,16 gam Ag kết tủa. Nồng độ mol của dung dịch glucose đã dùng là",
    choices: ["0,10M.", "0,20M.", "0,01M.", "0,02M."],
    correctIndex: 0,
    explanation: "n(Ag)=0,02mol→n(glucose)=0,01mol→CM=0,01/0,05=0,2M.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đun nóng 50 gam dung dịch glucose với lượng dung dịch AgNO3/NH3 dư thu được 4,32 gam Ag. Nồng độ % của dung dịch glucose là",
    choices: ["13,4%.", "7,2%.", "12,4%.", "14,4%."],
    correctIndex: 1,
    explanation: "n(Ag)=0,04mol→n(glucose)=0,02mol→m=3,6g→C%=3,6/50×100%=7,2%.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Đun nóng 250 gam dung dịch glucose với dung dịch AgNO3/NH3 thu được 15 gam Ag, nồng độ của dung dịch glucose là",
    choices: ["5%.", "10%.", "15%.", "30%."],
    correctIndex: 0,
    explanation: "n(Ag)=0,1389mol→n(glucose)=0,0694mol→m=12,5g→C%=12,5/250×100%=5%.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Người ta dùng glucose để tráng ruột phích. Trung bình cần dùng 0,75 gam glucose cho một ruột phích. Tính khối lượng Ag có trong ruột phích biết hiệu suất phản ứng là 80%.",
    choices: ["0,36.", "0,72.", "0,9.", "0,45."],
    correctIndex: 1,
    explanation: "n(glucose)=0,004167mol. n(Ag lý thuyết)=0,008333mol. Thực tế(80%)=0,006667mol→m=0,72g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Trong quá trình sản xuất đường glucose thường còn lẫn 10% tạp chất (không tham gia phản ứng tráng bạc). Người ta lấy a gam đường glucose cho phản ứng hoàn toàn với dung dịch AgNO3/NH3 (dư) thấy tạo thành 10,8 gam Ag. Giá trị của a là",
    choices: ["9.", "10.", "18.", "20."],
    correctIndex: 1,
    explanation: "n(Ag)=0,1mol→n(glucose thật)=0,05mol→m(glucose thật)=9g→a(tổng,90% thật)=9/0,9=10g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho m gam glucose tác dụng với lượng dư dung dịch AgNO3/NH3, thu được 86,4 gam Ag. Nếu lên men hoàn toàn m gam glucose rồi cho khí CO2 thu được hấp thụ vào nước vôi trong dư thì lượng kết tủa thu được là",
    choices: ["20 gam.", "60 gam.", "40 gam.", "80 gam."],
    correctIndex: 3,
    explanation: "n(Ag)=0,8mol→n(glucose)=0,4mol. Lên men: n(CO2)=2×0,4=0,8mol→n(CaCO3)=0,8mol→m=80g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cho 5 kg glucose chứa 20% tạp chất lên men thành ethylic alcohol. Khối lượng ethylic alcohol thu được (biết hiệu suất của phản ứng đạt được 90%) là",
    choices: ["920 gam.", "2044,4 gam.", "1840 gam.", "925 gam."],
    correctIndex: 2,
    explanation: "m(glucose thật)=4kg=4000g→n=22,222mol. n(alcohol lý thuyết)=44,444mol. Thực tế(90%)=40mol→m=1840g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Tráng bạc hoàn toàn m gam glucose thu được 86,4 gam Ag. Nếu lên men hoàn toàn m gam glucose rồi cho khí CO2 thu được hấp thụ vào nước vôi trong dư thì lượng kết tủa thu được là",
    choices: ["60 gam.", "20 gam.", "40 gam.", "80 gam."],
    correctIndex: 3,
    explanation: "n(Ag)=0,8mol→n(glucose)=0,4mol→n(CO2 lên men)=0,8mol→n(CaCO3)=0,8mol→m=80g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Thủy phân 5,13 kg saccharose trong môi trường acid với hiệu suất 100%, khối lượng sản phẩm thu được là",
    choices: [
      "2,2 kg glucose và 2,2 kg fructose.",
      "3,4 kg glucose và 3,4 kg fructose.",
      "2,7 kg glucose và 2,7 kg fructose.",
      "1,7 kg glucose và 1,7 kg fructose.",
    ],
    correctIndex: 2,
    explanation: "n(saccharose)=5130/342=15mol→n(glucose)=n(fructose)=15mol mỗi loại→m=15×180=2700g=2,7kg mỗi loại (glucose và fructose cùng M=180).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Thuỷ phân hoàn toàn m gam saccharose thu được 270 gam hỗn hợp gồm glucose và fructose. Giá trị của m là",
    choices: ["270,0.", "229,5.", "243,0.", "256,5."],
    correctIndex: 3,
    explanation: "Bảo toàn khối lượng: m(saccharose)+m(H2O)=270. n(glucose)=n(fructose)=x: 2x×180=270→x=0,75mol=n(saccharose)→m=0,75×342=256,5g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Cần bao nhiêu gam saccharose để pha thành 500mL dung dịch saccharose 1M?",
    choices: ["85,5 gam.", "171 gam.", "342 gam.", "684 gam."],
    correctIndex: 1,
    explanation: "n=0,5mol→m=0,5×342=171g.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Thông thường nước mía chứa 13% saccharose. Nếu tinh chế 1 tấn nước mía trên thì hàm lượng saccharose thu được là bao nhiêu? Biết hiệu suất tinh chế đạt 80%",
    choices: ["105 kg.", "104 kg.", "110 kg.", "114 kg."],
    correctIndex: 1,
    explanation: "m(lý thuyết)=130kg. Thực tế(80%)=104kg.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Để tráng bạc một số ruột phích, người ta phải thuỷ phân 34,2 gam saccharose rồi tiến hành phản ứng tráng gương. Tính lượng Ag tạo thành sau phản ứng, biết hiệu suất cả quá trình tráng gương là 80%?",
    choices: ["27,64 gam.", "43,90 gam.", "34,56 gam.", "56,34 gam."],
    correctIndex: 2,
    explanation: "n(saccharose)=0,1mol→0,1mol glucose+0,1mol fructose (cả 2 đều tráng bạc). n(Ag lý thuyết)=2×0,2=0,4mol. Thực tế(80%)=0,32mol→m=34,56g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Thuỷ phân hoàn toàn 62,5 gam dung dịch saccharose 17,1% trong môi trường acid (vừa đủ) ta thu được dung dịch A. Cho dung dịch AgNO3 trong ammonia vào dung dịch A và đun nhẹ thu được bao nhiêu gam Ag?",
    choices: ["6,75 gam.", "13,5 gam.", "7,65 gam.", "6,65 gam."],
    correctIndex: 1,
    explanation: "m(saccharose)=62,5×0,171=10,6875g→n=0,03125mol→0,03125mol glucose+0,03125mol fructose. n(Ag)=2×0,0625=0,125mol→m=13,5g.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Nếu dùng một tấn khoai chứa 20% tinh bột để sản xuất glucose thì lượng glucose sẽ thu được là (hiệu suất là 70%)",
    choices: ["160,5 kg.", "150,64 kg.", "155,56 kg.", "165,6 kg."],
    correctIndex: 2,
    explanation: "m(tinh bột)=200kg. m(glucose lý thuyết)=200×180/162=222,22kg. Thực tế(70%)=155,56kg.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Muốn có 1462,5 gam glucose thì khối lượng saccharose cần đem thủy phân là (hiệu suất của phản ứng là 100%)",
    choices: ["2778,75 gam.", "2697,5 gam.", "2877,75 gam.", "2967,5 gam."],
    correctIndex: 0,
    explanation: "n(glucose)=1462,5/180=8,125mol=n(saccharose)→m=8,125×342=2778,75g.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Khi thuỷ phân 1 kg bột gạo có 80% tinh bột, thì khối lượng glucose thu được là bao nhiêu? Giả thiết rằng phản ứng xảy ra hoàn toàn.",
    choices: ["0,80 kg.", "0,90 kg.", "0,99 kg.", "0,89 kg."],
    correctIndex: 3,
    explanation: "m(tinh bột)=800g. m(glucose)=800×180/162=888,89g≈0,89kg.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Thuỷ phân 324 gam tinh bột với hiệu suất của phản ứng 75%, khối lượng glucose thu được là",
    choices: ["270 gam.", "360 gam.", "250 gam.", "300 gam."],
    correctIndex: 0,
    explanation: "m(lý thuyết)=324×180/162=360g. Thực tế(75%)=270g.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Sử dụng 1 tấn khoai (chứa 20% tinh bột) để điều chế glucose. Tính khối lượng glucose thu được, biết hiệu suất phản ứng đạt 70%.",
    choices: ["162 kg.", "155,56 kg.", "143,33 kg.", "133,33 kg."],
    correctIndex: 1,
    explanation: "m(tinh bột)=200kg. m(glucose lý thuyết)=222,22kg. Thực tế(70%)=155,56kg.",
    difficulty: "VAN_DUNG_CAO",
  },
  {
    content: "Khi đốt cháy một loại carbohydrate có công thức Cn(H2O)m, người ta thu được khối lượng H2O và CO2 theo tỉ lệ 33 : 88. Vậy carbohydrate là",
    choices: ["C6H12O6.", "C12H22O11.", "(C6H10O5)n.", "C6H10O5."],
    correctIndex: 1,
    explanation: "Tỉ lệ khối lượng 18m:44n=33:88 → m:n=11:12, khớp C12H22O11 (n=12,m=11) — saccharose.",
    difficulty: "VAN_DUNG_CAO",
  },
  // ==================== PROTEIN ====================
  {
    content: "Protein có trong",
    choices: ["Cơ thể người.", "Động vật.", "Thực vật.", "Cả A, B, C đều đúng."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong thành phần cấu tạo phân tử của protein ngoài các nguyên tố C, H, O thì nhất thiết phải có nguyên tố",
    choices: ["sulfur.", "iron.", "chlorine.", "nitrogen."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Các phân tử protein đều phải có chứa nguyên tố",
    choices: ["carbon, hydrogen.", "carbon, oxygen.", "carbon, hydrogen, oxygen.", "carbon, hydrogen, oxygen, nitrogen."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Protein được tạo từ",
    choices: ["các amino acid.", "các ethylic alcohol.", "các acid hữu cơ.", "các acetic acid."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chọn nhận xét đúng:",
    choices: [
      "Protein có khối lượng phân tử lớn và cấu tạo đơn giản.",
      "Protein có khối lượng phân tử lớn và do nhiều phân tử amino axit giống nhau tạo nên.",
      "Protein có khối lượng phân tử rất lớn và cấu tạo cực kì phức tạp do nhiều loại amino acid tạo nên.",
      "Protein có khối lượng phân tử lớn do nhiều phân tử Alanine tạo nên.",
    ],
    correctIndex: 2,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trứng là loại thực phẩm chứa nhiều",
    choices: ["chất béo.", "chất đường.", "chất bột.", "protein."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi đốt cháy hoàn toàn m gam một chất hữu cơ X, sản phẩm tạo ra có khí nitrogen. Chất X có thể là",
    choices: ["tinh bột.", "saccharose.", "ethylic alcohol.", "protein."],
    correctIndex: 3,
    explanation: "Chỉ protein chứa nguyên tố nitrogen trong cấu trúc, nên đốt cháy mới sinh ra khí chứa N.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Dấu hiệu để nhận biết protein là",
    choices: [
      "làm dung dịch iodine đổi màu xanh.",
      "có phản ứng đông tụ trắng khi đun nóng.",
      "thủy phân trong dung dịch acid.",
      "đốt cháy có mùi khét và có phản ứng đông tụ khi đun nóng.",
    ],
    correctIndex: 3,
    explanation: "Làm iodine đổi xanh là dấu hiệu của tinh bột, không phải protein. Dấu hiệu đặc trưng nhất của protein là mùi khét khi đốt và đông tụ khi đun nóng.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Để phân biệt vải dệt bằng tơ tằm và vải dệt bằng sợi bông. Chúng ta có thể",
    choices: [
      "gia nhiệt để thực hiện phản ứng đông tụ.",
      "đốt và ngửi nếu có mùi khét là vải bằng tơ tằm.",
      "dùng quỳ tím.",
      "dùng phản ứng thủy phân.",
    ],
    correctIndex: 1,
    explanation: "Tơ tằm là protein, khi đốt có mùi khét đặc trưng; sợi bông là cellulose không có mùi này.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho chanh vào sữa bò sẽ xảy ra hiện tượng",
    choices: ["kết tủa.", "đông tụ.", "sủi bọt khí.", "kết tủa và sủi bọt khí."],
    correctIndex: 1,
    explanation: "Acid citric trong chanh làm đông tụ protein (casein) trong sữa.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Một số protein tan được trong nước tạo thành dung dịch keo, khi đun nóng hoặc cho thêm hóa chất vào dung dịch này thường xảy ra kết tủa protein. Hiện tượng đó gọi là",
    choices: ["Sự oxi hóa.", "Sự khử.", "Sự cháy.", "Sự đông tụ."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Hiện tượng xảy ra khi cho giấm vào sữa đậu nành là",
    choices: [
      "Sữa đậu nành bị vón cục.",
      "Sữa đậu nành và giấm hòa tan vào nhau.",
      "Sữa đậu nành chuyển sang đỏ.",
      "Có bọt khí xuất hiện.",
    ],
    correctIndex: 0,
    explanation: "Giấm (acid) làm đông tụ protein trong sữa đậu nành, tạo thành khối vón cục (tương tự làm đậu phụ).",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Tính chất hóa học của protein là",
    choices: ["Phản ứng thủy phân.", "Sự phân hủy bởi nhiệt.", "Sự đông tụ.", "Cả A, B, C đều đúng."],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Chất nào không thủy phân?",
    choices: ["Tinh bột.", "Protein.", "Saccharose.", "Glucose."],
    correctIndex: 3,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Tính chất nào sau đây không phải là tính chất đặc trưng của protein?",
    choices: [
      "Có khả năng tham gia phản ứng thủy phân.",
      "Bị đông tụ.",
      "Bị phân hủy bởi nhiệt.",
      "Có khả năng tham gia phản ứng tráng gương.",
    ],
    correctIndex: 3,
    explanation: "Protein không có nhóm -CHO nên không tham gia phản ứng tráng gương (đó là tính chất của glucose).",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Điểm giống nhau giữa amino acid và acetic acid là",
    choices: [
      "Đều có các nguyên tố C, H, O và phân tử có nhóm –COOH.",
      "Đều có các nguyên tố C, H, O.",
      "Đều có các nguyên tố C, H, N.",
      "Đều có các nguyên tố C, H, N và có phân tử nhóm –COOH.",
    ],
    correctIndex: 0,
    difficulty: "THONG_HIEU",
  },
  {
    content: "Đun nóng protein trong dung dịch acid hoặc base đến khi phản ứng xảy ra hoàn toàn thu được sản phẩm là",
    choices: ["Ester và nước.", "Hỗn hợp amino acid.", "Chất bay hơi có mùi khét.", "Các acid béo."],
    correctIndex: 1,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cho các phát biểu sau: Thành phần nguyên tố chủ yếu của protein là C, H, O, N và một lượng nhỏ S, P, kim loại... Khi đun nóng protein trong dung dịch acid hoặc base, protein bị thủy phân sinh ra các amino acid. Khi đun nóng mạnh hoặc đốt cháy, protein bị phân hủy tạo thành những chất bay hơi và có mùi khét. Ứng dụng chính của protein là làm thức ăn, ngoài ra protein còn có các ứng dụng khác trong công nghiệp dệt (len, tơ tằm), da, mĩ nghệ (sừng, ngà)… Dấu hiệu để nhận biết protein là làm dung dịch iodine đổi màu xanh. Số phát biểu đúng là",
    choices: ["2.", "3.", "4.", "5."],
    correctIndex: 2,
    explanation: "4 phát biểu đầu đều đúng; riêng phát biểu cuối sai (làm iodine đổi xanh là dấu hiệu nhận biết tinh bột, không phải protein).",
    difficulty: "VAN_DUNG_CAO",
  },
  // ==================== POLYMER ====================
  {
    content: "Polymer là",
    choices: [
      "những chất chỉ có trong công nghiệp, không có trong tự nhiên.",
      "những hợp chất vô cơ có khối lượng phân tử lớn.",
      "những chất có phân tử khối rất lớn do nhiều loại nguyên tử liên kết với nhau tạo nên.",
      "những chất có phân tử khối rất lớn do nhiều mắt xích liên kết với nhau tạo nên.",
    ],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Loại tơ có nguồn gốc từ cellulose là",
    choices: ["tơ tằm, bông vải.", "tơ tằm, sợi đay.", "bông vải, sợi đay.", "tơ tằm, tơ nilon–6,6."],
    correctIndex: 2,
    explanation: "Bông vải và sợi đay đều có thành phần chính là cellulose thực vật; tơ tằm là protein (fibroin), tơ nilon là polymer tổng hợp.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Các loại thực phẩm nào là hợp chất cao phân tử?",
    choices: ["Nước uống, đường.", "Tinh bột, chất béo.", "Acetic acid.", "Tinh bột, đạm."],
    correctIndex: 3,
    explanation: "Tinh bột (polysaccharide) và đạm/protein (polypeptide) đều là polymer sinh học thật sự (đại phân tử với mắt xích lặp lại); chất béo không phải polymer theo nghĩa này.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Trong các phát biểu dưới đây, phát biểu đúng là",
    choices: [
      "polymer là chất dễ bay hơi.",
      "polymer là những chất dễ tan trong nước.",
      "polymer chỉ được tạo ra bởi con người và không có trong tự nhiên.",
      "polymer là những chất rắn, không bay hơi, thường không tan trong nước.",
    ],
    correctIndex: 3,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Tính chất chung của polymer là",
    choices: [
      "Chất lỏng, không màu, không tan trong nước.",
      "Chất khí, không màu, không tan trong nước.",
      "Chất rắn, không bay hơi, không tan trong nước.",
      "Chất rắn, không màu, không mùi.",
    ],
    correctIndex: 2,
    difficulty: "NHAN_BIET",
  },
  {
    content: "PVC là chất rắn vô định hình, cách điện tốt, bền với acid, được dùng làm vật liệu cách điện, ống dẫn nước, vải che mưa,... PVC được tổng hợp trực tiếp từ monome nào sau đây?",
    choices: ["vinyl chloride.", "acrilonitrin.", "propylene.", "vinyl acetate."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Dãy nào sau đây đều gồm các chất thuộc loại polymer?",
    choices: [
      "Methane, ethylene, polyethylene.",
      "Methane, tinh bột, polyethylene.",
      "Poly (vinyl chloride), ethylene, polyethylene.",
      "Poly (vinyl chloride), tinh bột, polyethylene.",
    ],
    correctIndex: 3,
    explanation: "Methane và ethylene là các monomer/phân tử nhỏ, không phải polymer.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Mắt xích của PE là",
    choices: ["Methane.", "Amino acid.", "Ethylene.", "Ethylic alcohol."],
    correctIndex: 2,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cao su Buna là cao su tổng hợp rất phổ biến, có công thức cấu tạo như sau: …–CH2–CH=CH–CH2–CH2–CH=CH–CH2–CH2–CH=CH–CH2–… Công thức một mắt xích và công thức tổng quát của cao su Buna là",
    choices: [
      "–CH2–CH=CH– và [–CH2–CH=CH–]n",
      "–CH2–CH=CH–CH2– và [–CH2–CH=CH–CH2–CH2–]n",
      "–CH2–CH=CH–CH2– và [–CH2–CH=CH–CH2–]n",
      "–CH2–CH=CH–CH2–CH2– và [–CH2–CH=CH–CH2–CH2–]n",
    ],
    correctIndex: 2,
    explanation: "Đơn vị lặp lại tối thiểu trong mạch cho là -CH2-CH=CH-CH2- (4 carbon), lặp lại đúng khớp với cấu trúc mạch đã cho.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Phân tử tinh bột được tạo thành do nhiều nhóm –C6H10O5– (gọi là mắt xích) liên kết với nhau. Số mắt xích trong phân tử tinh bột trong khoảng",
    choices: ["1200 – 6000.", "6000 – 10000.", "10000 –14000.", "12000 – 14000."],
    correctIndex: 0,
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phân tử khối của tinh bột khoảng 299700 đvC. Số mắt xích (–C6H10O5–) trong phân tử tinh bột là",
    choices: ["1850.", "1900.", "1950.", "2100."],
    correctIndex: 0,
    explanation: "Mắt xích C6H10O5 có M=162. n=299700/162=1850.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Polyethylene có khối lượng phân tử 14000 amu. Hệ số trùng hợp n là",
    choices: ["300", "500", "200", "100"],
    correctIndex: 1,
    explanation: "Mắt xích ethylene M=28. n=14000/28=500.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Khối lượng phân tử trung bình của PVC là 750000. Hệ số polime hóa của PVC là bao nhiêu?",
    choices: ["10000.", "13000.", "12000.", "15000."],
    correctIndex: 2,
    explanation: "Mắt xích C2H3Cl có M=62,5. n=750000/62,5=12000.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Để thu được 1 tấn PVC thì khối lượng vinyl chloride cần dùng là (hiệu suất phản ứng là 90%)",
    choices: ["1 tấn.", "0,9 tấn.", "0,1 tấn.", "1,11 tấn."],
    correctIndex: 3,
    explanation: "Trùng hợp bảo toàn khối lượng (không sinh sản phẩm phụ). Khối lượng vinyl chloride cần = 1/0,9=1,11 tấn.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Trùng hợp 0,5 tấn ethylene với hiệu suất 90% thì khối lượng polyethylene thu được là",
    choices: ["0,5 tấn.", "5 tấn.", "4,5 tấn.", "0,45 tấn."],
    correctIndex: 3,
    explanation: "Trùng hợp bảo toàn khối lượng, hiệu suất chỉ ảnh hưởng lượng chuyển hóa: m(PE)=0,5×0,9=0,45 tấn.",
    difficulty: "VAN_DUNG",
  },
  {
    content: "Trùng hợp 2,479 lít C2H4 (đkc), nếu hiệu suất phản ứng là 80% thì khối lượng polymer thu được là bao nhiêu? Biết hệ số trùng hợp là 500.",
    choices: ["2,24 gam.", "4,48 gam.", "2,80 gam.", "3,36 gam."],
    correctIndex: 0,
    explanation: "n(C2H4)=0,1mol. Thực tế phản ứng(80%)=0,08mol. n(PE)=0,08/500=0,00016mol. M(PE)=500×28=14000. m=0,00016×14000=2,24g.",
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
        source: "KHTN 9 - Tài liệu học tập 2024 (VEAgroup) — Chương 9. Lipid - Carbohydrate - Protein - Polymer",
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
