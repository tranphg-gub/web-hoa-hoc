import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AF: bài tập mining từ SBT Hóa 12 - Kết nối tri thức thật (Tài liệu/Lớp 12/Hóa 12 theo
// chuyên đề/Pin_Điện Phân.zip -> "(TỜ SÁCH BT-KNTT) Chương V - BT Hoá 12 - KNTT.pdf", đọc bằng
// pdftoppm + thị giác vì PDF lỗi text layer). Chỉ lấy câu SINGLE_CHOICE (NHẬN BIẾT/THÔNG HIỂU/
// VẬN DỤNG) — bỏ qua các câu Đúng/Sai nhóm và câu tự luận vì PracticeQuestion chỉ hỗ trợ trắc
// nghiệm 1 đáp án. Câu 15.11 trong sách gốc có lỗi in ấn (2 đáp án A và D trùng nội dung) nên
// bị loại khỏi bộ câu hỏi này. File SBT không in đáp án ở các trang đã đọc — mọi đáp án dưới
// đây tự giải bằng kiến thức hóa học (dãy điện hoá, quy tắc alpha, điện phân) và kiểm chứng
// lại trước khi đưa vào.
const CHAPTER_ID = "cmrelkec1000avhuszsl9chvt"; // Lớp 12 - Chương 5. Pin điện và điện phân

const QUESTIONS = [
  // Bài 15. Thế điện cực và nguồn điện hoá học
  {
    content: "Mối liên hệ giữa dạng oxi hoá và dạng khử của kim loại M được biểu diễn ở dạng quá trình khử là",
    choices: ["M ⇌ Mn+ + ne.", "Mn+ + ne ⇌ M.", "Mn- ⇌ M + ne.", "M + ne ⇌ Mn-."],
    correctIndex: 1,
    explanation: "Quá trình khử là quá trình nhận electron: Mn+ + ne ⇌ M.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kí hiệu cặp oxi hoá – khử ứng với quá trình khử: Fe^3+ + 1e ⇌ Fe^2+ là",
    choices: ["Fe^3+/Fe^2+.", "Fe^2+/Fe.", "Fe^3+/Fe.", "Fe^2+/Fe^3+."],
    correctIndex: 0,
    explanation: "Cặp oxi hoá – khử được kí hiệu là dạng oxi hoá/dạng khử tương ứng: Fe^3+/Fe^2+.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Giá trị thế điện cực chuẩn của cặp oxi hoá – khử nào được quy ước bằng 0 V?",
    choices: ["Na+/Na.", "2H+/H2.", "Al^3+/Al.", "Cl2/2Cl-."],
    correctIndex: 1,
    explanation: "Thế điện cực chuẩn của cặp 2H+/H2 (điện cực hydrogen chuẩn) được quy ước bằng 0,000 V, dùng làm mốc so sánh.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Cặp oxi hoá – khử nào sau đây có giá trị thế điện cực chuẩn lớn hơn 0?",
    choices: ["K+/K.", "Li+/Li.", "Ba^2+/Ba.", "Cu^2+/Cu."],
    correctIndex: 3,
    explanation: "Cu^2+/Cu có E° = +0,340 V > 0; K, Li, Ba đều là kim loại kiềm/kiềm thổ có thế điện cực chuẩn rất âm.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong số các ion: Ag+, Al^3+, Fe^2+, Cu^2+, ion nào có tính oxi hoá mạnh nhất ở điều kiện chuẩn?",
    choices: ["Cu^2+.", "Fe^2+.", "Ag+.", "Al^3+."],
    correctIndex: 2,
    explanation: "Ag+/Ag có thế điện cực chuẩn cao nhất (+0,799 V) trong 4 cặp này nên Ag+ có tính oxi hoá mạnh nhất.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở điều kiện chuẩn, Fe khử được ion kim loại nào sau đây trong dung dịch?",
    choices: ["Mg^2+.", "Al^3+.", "Na+.", "Ag+."],
    correctIndex: 3,
    explanation:
      "E°(Fe^2+/Fe) = –0,44 V thấp hơn E°(Ag+/Ag) = +0,799 V nên Fe khử được Ag+; Mg^2+, Al^3+, Na+ đều có thế điện cực chuẩn thấp hơn Fe nên Fe không khử được.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ở điều kiện chuẩn, kim loại nào sau đây khử được ion H+ thành H2?",
    choices: ["Mg.", "Cu.", "Hg.", "Au."],
    correctIndex: 0,
    explanation:
      "E°(Mg^2+/Mg) < 0 V (thấp hơn cặp 2H+/H2) nên Mg khử được H+; Cu, Hg, Au đều có thế điện cực chuẩn dương hơn 2H+/H2 nên không khử được H+.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Cho các cặp oxi hoá – khử của kim loại và thế điện cực chuẩn tương ứng: Li+/Li (–3,040 V), Mg^2+/Mg (–2,356 V), Zn^2+/Zn (–0,762 V), Ag+/Ag (+0,799 V). Trong số các kim loại trên, kim loại có tính khử mạnh nhất là",
    choices: ["Mg.", "Zn.", "Ag.", "Li."],
    correctIndex: 3,
    explanation: "Li+/Li có thế điện cực chuẩn nhỏ nhất (–3,040 V) trong bảng nên Li có tính khử mạnh nhất.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Cho dãy sắp xếp các kim loại theo chiều giảm dần tính khử: Na, Mg, Al, Fe. Trong số các cặp oxi hoá – khử sau, cặp nào có giá trị thế điện cực chuẩn nhỏ nhất?",
    choices: ["Mg^2+/Mg.", "Fe^2+/Fe.", "Na+/Na.", "Al^3+/Al."],
    correctIndex: 2,
    explanation:
      "Na có tính khử mạnh nhất trong dãy (Na, Mg, Al, Fe giảm dần) nên cặp Na+/Na có thế điện cực chuẩn nhỏ nhất.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Cho các cặp oxi hoá – khử của các halogen và thế điện cực chuẩn tương ứng: F2/2F- (+2,87 V), Cl2/2Cl- (+1,358 V), Br2/2Br- (+1,087 V), I2/2I- (+0,621 V). Dãy sắp xếp các ion halide theo thứ tự giảm dần tính khử là",
    choices: ["F-, Cl-, Br-, I-.", "Cl-, F-, Br-, I-.", "I-, Br-, Cl-, F-.", "Br-, I-, F-, Cl-."],
    correctIndex: 2,
    explanation:
      "Ion halide có tính khử càng mạnh khi thế điện cực chuẩn của cặp X2/2X- càng nhỏ; thứ tự giảm dần: I- (0,621) > Br- (1,087) > Cl- (1,358) > F- (2,87).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong quá trình hoạt động của pin điện Zn – Cu, dòng electron di chuyển từ",
    choices: [
      "cực kẽm sang cực đồng.",
      "cực bên phải sang cực bên trái.",
      "cathode sang anode.",
      "cực dương sang cực âm.",
    ],
    correctIndex: 0,
    explanation:
      "Zn là anode (cực âm), electron sinh ra do Zn bị oxi hoá di chuyển qua dây dẫn ngoài sang Cu (cathode, cực dương).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong quá trình hoạt động của pin điện Ni – Cu, quá trình xảy ra ở anode là",
    choices: ["Ni → Ni^2+ + 2e.", "Cu → Cu^2+ + 2e.", "Cu^2+ + 2e → Cu.", "Ni^2+ + 2e → Ni."],
    correctIndex: 0,
    explanation:
      "E°(Ni^2+/Ni) = –0,257 V thấp hơn E°(Cu^2+/Cu) = +0,340 V nên Ni có tính khử mạnh hơn, đóng vai trò anode và bị oxi hoá: Ni → Ni^2+ + 2e.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong quá trình hoạt động của pin điện Cu – Ag, điện cực đồng là",
    choices: ["điện cực dương.", "cathode.", "điện cực bị giảm dần khối lượng.", "nơi xảy ra quá trình khử."],
    correctIndex: 2,
    explanation:
      "E°(Cu^2+/Cu) = +0,340 V thấp hơn E°(Ag+/Ag) = +0,799 V nên Cu là anode, bị oxi hoá dần (Cu → Cu^2+ + 2e) khiến khối lượng điện cực đồng giảm dần.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Trong quá trình hoạt động của pin điện hoá Zn – Cu, nhận định về vai trò của cầu muối nào sau đây KHÔNG đúng?",
    choices: [
      "Ngăn cách hai dung dịch chất điện li.",
      "Cho dòng electron chạy qua.",
      "Trung hoà điện ở mỗi dung dịch điện li.",
      "Đóng kín mạch điện.",
    ],
    correctIndex: 1,
    explanation:
      "Cầu muối cho các ion di chuyển qua để trung hoà điện tích ở hai bên dung dịch, KHÔNG cho electron chạy qua — electron di chuyển qua dây dẫn ở mạch ngoài.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Trong nước, thế điện cực chuẩn của kim loại Mn+/M càng nhỏ thì dạng khử có tính khử ...(I)... và dạng oxi hoá có tính oxi hoá ...(II)... Các cụm từ cần điền vào (I) và (II) lần lượt là",
    choices: ["càng mạnh và càng yếu.", "càng mạnh và càng mạnh.", "càng yếu và càng yếu.", "càng yếu và càng mạnh."],
    correctIndex: 0,
    explanation:
      "Thế điện cực chuẩn càng nhỏ (càng âm) thì kim loại M có tính khử càng mạnh, đồng thời ion Mn+ tương ứng có tính oxi hoá càng yếu.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho phản ứng hoá học: Cu + 2Ag+ → Cu^2+ + 2Ag. Phát biểu nào sau đây về phản ứng trên là đúng?",
    choices: [
      "Ag+ khử Cu thành Cu^2+.",
      "Cu^2+ có tính oxi hoá mạnh hơn Ag+.",
      "Cu có tính khử yếu hơn Ag.",
      "Cu là chất khử, Ag+ là chất oxi hoá.",
    ],
    correctIndex: 3,
    explanation: "Cu nhường electron (chất khử), Ag+ nhận electron (chất oxi hoá).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các cặp oxi hoá – khử của kim loại và thế điện cực chuẩn tương ứng: Na+/Na (–2,713 V), Ca^2+/Ca (–2,84 V), Ni^2+/Ni (–0,257 V), Au^3+/Au (+1,52 V). Trong các kim loại trên, số kim loại tác dụng được với dung dịch HCl ở điều kiện chuẩn, giải phóng khí H2 là",
    choices: ["1.", "4.", "2.", "3."],
    correctIndex: 3,
    explanation:
      "Kim loại tác dụng với HCl giải phóng H2 cần có thế điện cực chuẩn nhỏ hơn 0 V: Na (–2,713), Ca (–2,84), Ni (–0,257) đều thoả mãn; Au (+1,52) không phản ứng. Vậy có 3 kim loại.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho thế điện cực chuẩn của các cặp oxi hoá – khử: Fe^2+/Fe; Na+/Na; Ag+/Ag; Mg^2+/Mg; Cu^2+/Cu lần lượt là –0,44 V; –2,713 V; +0,799 V; –2,353 V; +0,340 V. Ở điều kiện chuẩn, kim loại Cu khử được ion kim loại nào sau đây?",
    choices: ["Na+.", "Mg^2+.", "Ag+.", "Fe^2+."],
    correctIndex: 2,
    explanation:
      "E°(Cu^2+/Cu) = +0,340 V thấp hơn E°(Ag+/Ag) = +0,799 V nên Cu khử được Ag+ thành Ag; Na+, Mg^2+, Fe^2+ đều có thế điện cực chuẩn thấp hơn Cu^2+/Cu nên Cu không khử được.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho thứ tự sắp xếp một số cặp oxi hoá – khử trong dãy điện hoá: Al^3+/Al; Fe^2+/Fe; Sn^2+/Sn; Cu^2+/Cu. Kim loại nào sau đây có phản ứng với dung dịch muối tương ứng?",
    choices: ["Fe và CuSO4.", "Fe và Al2(SO4)3.", "Sn và FeSO4.", "Cu và SnSO4."],
    correctIndex: 0,
    explanation:
      "Theo quy tắc alpha, kim loại đứng trước trong dãy điện hoá khử được ion kim loại đứng sau. Fe đứng trước Cu nên Fe khử được Cu^2+ (phản ứng với CuSO4); các cặp còn lại đều ngược thứ tự nên không xảy ra.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho thứ tự sắp xếp các cặp oxi hoá – khử trong dãy điện hoá: Mg^2+/Mg; H2O/H2, OH-; 2H+/H2; Ag+/Ag. Cặp oxi hoá – khử có giá trị thế điện cực chuẩn lớn nhất trong dãy là",
    choices: ["2H+/H2.", "Ag+/Ag.", "H2O/H2, OH-.", "Mg^2+/Mg."],
    correctIndex: 1,
    explanation: "Ag+/Ag đứng cuối dãy điện hoá được liệt kê nên có thế điện cực chuẩn lớn nhất (+0,799 V).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Sức điện động chuẩn của pin điện hoá H2 – Cu (gồm hai điện cực ứng với hai cặp oxi hoá – khử 2H+/H2 và Cu^2+/Cu) đo được bằng vôn kế có điện trở vô cùng lớn là 0,340 V. Từ đó, xác định được thế điện cực chuẩn của cặp Cu^2+/Cu là",
    choices: ["–0,340 V.", "0,000 V.", "0,680 V.", "+0,340 V."],
    correctIndex: 3,
    explanation:
      "Vì E°(2H+/H2) = 0 V theo quy ước, sức điện động chuẩn = E°(Cu^2+/Cu) – 0 = 0,340 V, suy ra E°(Cu^2+/Cu) = +0,340 V.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Thế điện cực chuẩn của các cặp oxi hoá – khử của kim loại M+/M và R^2+/R lần lượt là +0,799 V và +0,34 V. Nhận xét nào sau đây là đúng ở điều kiện chuẩn?",
    choices: [
      "M có tính khử mạnh hơn R.",
      "M+ có tính oxi hoá yếu hơn R^2+.",
      "M khử được ion H+ thành H2.",
      "R khử được ion M+ thành M.",
    ],
    correctIndex: 3,
    explanation:
      "E°(R^2+/R) = +0,34 V nhỏ hơn E°(M+/M) = +0,799 V nên R có tính khử mạnh hơn M, do đó R khử được M+ thành M.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Phản ứng hoá học xảy ra trong pin điện hoá Sn – Cu: Sn + Cu^2+ → Sn^2+ + Cu. Trong quá trình hoạt động của pin điện hoá, nhận định nào sau đây là đúng?",
    choices: [
      "Khối lượng của điện cực Sn tăng.",
      "Nồng độ Sn^2+ trong dung dịch tăng.",
      "Khối lượng của điện cực Cu giảm.",
      "Nồng độ Cu^2+ trong dung dịch tăng.",
    ],
    correctIndex: 1,
    explanation:
      "Sn bị oxi hoá tan vào dung dịch tạo Sn^2+ nên nồng độ Sn^2+ tăng (khối lượng điện cực Sn giảm); Cu^2+ bị khử bám vào điện cực Cu nên khối lượng Cu tăng và nồng độ Cu^2+ giảm.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Thiết lập pin điện hoá ở điều kiện chuẩn gồm hai điện cực tạo bởi các cặp oxi hoá – khử Ni^2+/Ni (E° = –0,257 V) và Cd^2+/Cd (E° = –0,403 V). Sức điện động chuẩn của pin điện hoá trên là",
    choices: ["+0,146 V.", "0,000 V.", "–0,146 V.", "+0,660 V."],
    correctIndex: 0,
    explanation:
      "Sức điện động chuẩn = E°(cathode, lớn hơn) – E°(anode, nhỏ hơn) = –0,257 – (–0,403) = 0,146 V (luôn lấy giá trị dương).",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Một pin điện hoá có điện cực Zn nhúng trong dung dịch ZnSO4 và điện cực Cu nhúng trong dung dịch CuSO4. Sau một thời gian pin đó phóng điện thì",
    choices: [
      "khối lượng điện cực Zn giảm còn khối lượng điện cực Cu tăng.",
      "khối lượng điện cực Zn tăng còn khối lượng điện cực Cu giảm.",
      "khối lượng cả hai điện cực Zn và Cu đều tăng.",
      "khối lượng cả hai điện cực Zn và Cu đều giảm.",
    ],
    correctIndex: 0,
    explanation:
      "Zn là anode, bị oxi hoá tan vào dung dịch nên khối lượng giảm; Cu là cathode, Cu^2+ bị khử bám vào điện cực nên khối lượng tăng.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các cặp oxi hoá – khử và thế điện cực chuẩn tương ứng: Cu^2+/Cu (+0,34 V), Zn^2+/Zn (–0,762 V), Fe^2+/Fe (–0,44 V), Ag+/Ag (+0,799 V). Pin điện hoá có sức điện động lớn nhất là",
    choices: ["Pin Zn – Cu.", "Pin Fe – Cu.", "Pin Cu – Ag.", "Pin Fe – Ag."],
    correctIndex: 3,
    explanation:
      "Sức điện động = hiệu hai thế điện cực chuẩn: Zn–Cu = 1,102 V; Fe–Cu = 0,78 V; Cu–Ag = 0,459 V; Fe–Ag = 0,34–(–0,44)... = 1,239 V lớn nhất, ứng với pin Fe – Ag.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Cho các pin điện hoá và sức điện động chuẩn tương ứng: Cu – X (0,46 V), Y – Cu (1,1 V), Z – Cu (1,47 V) (X, Y, Z là ba kim loại; tên pin viết theo thứ tự cực âm – cực dương). Biết E°(Cu^2+/Cu) = +0,34 V. Dãy các kim loại xếp theo chiều tăng dần tính khử từ trái sang phải là",
    choices: ["X, Cu, Z, Y.", "Y, Z, Cu, X.", "Z, Y, Cu, X.", "X, Cu, Y, Z."],
    correctIndex: 3,
    explanation:
      "Từ pin Cu–X: E°(X) = 0,34 + 0,46 = 0,80 V. Từ pin Y–Cu: E°(Y) = 0,34 – 1,1 = –0,76 V. Từ pin Z–Cu: E°(Z) = 0,34 – 1,47 = –1,13 V. Thế điện cực chuẩn giảm dần: X (0,80) > Cu (0,34) > Y (–0,76) > Z (–1,13), nên tính khử tăng dần theo thứ tự X, Cu, Y, Z.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Cho các cặp oxi hoá – khử và thế điện cực chuẩn tương ứng: Cr^2+/Cr (–0,91 V), Cr^3+/Cr^2+ (–0,41 V), Zn^2+/Zn (–0,76 V), Ni^2+/Ni (–0,26 V). Phản ứng nào sau đây đúng?",
    choices: [
      "Zn + 2Cr^3+ → Zn^2+ + 2Cr^2+.",
      "Zn + Cr^2+ → Zn^2+ + Cr.",
      "3Zn + 2Cr^3+ → 3Zn^2+ + 2Cr.",
      "Ni + 2Cr^3+ → Ni^2+ + 2Cr^2+.",
    ],
    correctIndex: 0,
    explanation:
      "E°(Cr^3+/Cr^2+) = –0,41 V lớn hơn E°(Zn^2+/Zn) = –0,76 V nên Zn khử được Cr^3+ thành Cr^2+; nhưng E°(Cr^2+/Cr) = –0,91 V nhỏ hơn E°(Zn^2+/Zn) nên Zn không khử tiếp được Cr^2+ thành Cr. Với Ni: E°(Cr^3+/Cr^2+) = –0,41 V nhỏ hơn E°(Ni^2+/Ni) = –0,26 V nên Ni không khử được Cr^3+.",
    difficulty: "VAN_DUNG",
  },
  // Bài 16. Điện phân
  {
    content: "Ion kim loại nào sau đây bị điện phân trong dung dịch (với điện cực graphite)?",
    choices: ["Na+.", "Cu^2+.", "Ca^2+.", "K+."],
    correctIndex: 1,
    explanation:
      "Cu^2+ có thế điện cực chuẩn dương, dễ bị khử tại cathode trong dung dịch; Na+, Ca^2+, K+ là kim loại kiềm/kiềm thổ mạnh, trong dung dịch nước sẽ nhường chỗ cho H2O bị điện phân thay vì bản thân bị khử.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Ion halide hầu như KHÔNG bị điện phân trong dung dịch là",
    choices: ["Br-.", "I-.", "F-.", "Cl-."],
    correctIndex: 2,
    explanation:
      "F- có tính khử rất yếu (thế điện cực chuẩn F2/2F- rất cao, +2,87 V) nên hầu như không bị oxi hoá tại anode trong dung dịch nước; nước bị điện phân trước.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phương trình hoá học nào sau đây biểu diễn quá trình điều chế kim loại bằng phương pháp điện phân nóng chảy?",
    choices: [
      "CaCl2 → Ca + Cl2.",
      "Fe2O3 + 3CO → 2Fe + 3CO2.",
      "Mg + CuSO4 → MgSO4 + Cu.",
      "2NaCl + 2H2O → 2NaOH + H2 + Cl2.",
    ],
    correctIndex: 0,
    explanation:
      "Điện phân nóng chảy CaCl2 tạo Ca kim loại tại cathode; phương án B là nhiệt luyện, C là thuỷ luyện, D là điện phân dung dịch (không tạo ra kim loại).",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phương trình hoá học nào sau đây biểu diễn quá trình điều chế kim loại bằng phương pháp điện phân dung dịch?",
    choices: [
      "2Al2O3 → 4Al + 3O2.",
      "2Al + Cr2O3 → Al2O3 + 2Cr.",
      "Zn + CuSO4 → ZnSO4 + Cu.",
      "CuCl2 → Cu + Cl2.",
    ],
    correctIndex: 3,
    explanation:
      "Điện phân dung dịch CuCl2 tạo Cu kim loại tại cathode và Cl2 tại anode; A là điện phân nóng chảy, B là phản ứng nhiệt nhôm, C là phương pháp thuỷ luyện.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong công nghiệp, quá trình điện phân dung dịch NaCl bão hoà (điện cực trơ, có màng ngăn xốp) tạo ra khí nào sau đây ở cathode?",
    choices: ["Hydrogen.", "Chlorine.", "Oxygen.", "Hydrogen chloride."],
    correctIndex: 0,
    explanation: "Tại cathode xảy ra quá trình khử nước: 2H2O + 2e → H2 + 2OH-, sinh ra khí hydrogen.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi điện phân dung dịch gồm NaCl 1 M và NaBr 1 M, quá trình oxi hoá đầu tiên xảy ra ở anode là",
    choices: ["2H2O → 4H+ + O2 + 4e.", "2Cl- → Cl2 + 2e.", "2Br- → Br2 + 2e.", "Na → Na+ + 1e."],
    correctIndex: 2,
    explanation:
      "Br- có tính khử mạnh hơn Cl- (E°(Br2/2Br-) = +1,087 V < E°(Cl2/2Cl-) = +1,358 V) nên Br- bị oxi hoá trước tại anode.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong quá trình điện phân dung dịch CuSO4 với anode bằng graphite, ở anode xảy ra quá trình",
    choices: ["2H2O + 2e → H2 + 2OH-.", "2H2O → 4H+ + O2 + 4e.", "Cu^2+ + 2e → Cu.", "Cu → Cu^2+ + 2e."],
    correctIndex: 1,
    explanation:
      "Anode graphite (trơ), gốc sulfate không bị oxi hoá trong điều kiện này nên nước bị oxi hoá tạo khí O2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi điện phân dung dịch gồm Cu(NO3)2 0,1 M và AgNO3 0,1 M, quá trình khử đầu tiên xảy ra ở cathode là",
    choices: ["Ag+ + 1e → Ag.", "Cu^2+ + 2e → Cu.", "2H2O + 2e → H2 + 2OH-.", "2H+ + 2e → H2."],
    correctIndex: 0,
    explanation:
      "E°(Ag+/Ag) = +0,799 V cao hơn E°(Cu^2+/Cu) = +0,340 V nên Ag+ dễ bị khử hơn, bị điện phân trước tại cathode.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Phản ứng hoá học chính xảy ra trong quá trình điện phân nóng chảy Al2O3 trong 3NaF·AlF3 là",
    choices: ["2AlF3 → 2Al + 3F2.", "2NaF → Na + F2.", "2H2O → 2H2 + O2.", "2Al2O3 → 4Al + 3O2."],
    correctIndex: 3,
    explanation:
      "Criolite (3NaF·AlF3) chỉ đóng vai trò chất trợ dung làm giảm nhiệt độ nóng chảy, không bị điện phân; phản ứng chính là điện phân Al2O3: 2Al2O3 → 4Al + 3O2.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Việc duy trì điện áp thấp (~5 V) trong quá trình điện phân nóng chảy Al2O3 trong 3NaF·AlF3 nhằm ngăn cản quá trình nào sau đây xảy ra ở cathode?",
    choices: ["Al^3+ + 3e → Al.", "Na+ + 1e → Na.", "F2 + 2e → 2F-.", "O2 + 4e → 2O^2-."],
    correctIndex: 1,
    explanation:
      "Điện áp thấp giúp chỉ đủ để khử Al^3+ (dễ khử hơn) mà không làm Na+ (khó khử hơn nhiều) bị khử thành Na kim loại tại cathode.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong công nghiệp, phương pháp điện phân dung dịch được sử dụng để sản xuất một lượng đáng kể kim loại nào sau đây?",
    choices: ["Zn.", "Al.", "Fe.", "Mg."],
    correctIndex: 0,
    explanation: "Zn được sản xuất phổ biến trong công nghiệp bằng điện phân dung dịch ZnSO4; Al và Mg cần điện phân nóng chảy, Fe được sản xuất bằng phương pháp nhiệt luyện.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong công nghiệp, việc tinh chế đồng từ đồng thô được thực hiện bằng phương pháp điện phân dung dịch với anode làm bằng",
    choices: ["graphite.", "platinum.", "thép.", "đồng thô."],
    correctIndex: 3,
    explanation: "Anode chính là khối đồng thô cần tinh chế; Cu bị oxi hoá tan vào dung dịch còn Cu tinh khiết bám vào cathode.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Điện phân dung dịch chất nào sau đây (dùng điện cực trơ), thu được dung dịch có khả năng làm quỳ tím chuyển sang màu đỏ?",
    choices: ["NaBr.", "NaCl.", "CuSO4.", "CuCl2."],
    correctIndex: 2,
    explanation:
      "Điện phân CuSO4 với điện cực trơ: cathode khử Cu^2+ thành Cu, anode oxi hoá nước tạo O2 và H+, làm dung dịch dư acid (quỳ tím hoá đỏ); NaBr, NaCl tạo dung dịch kiềm (quỳ hoá xanh), CuCl2 không sinh acid dư.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Điện phân dung dịch chất nào sau đây (với điện cực trơ, không có màng ngăn điện cực), thu được dung dịch có khả năng tẩy màu?",
    choices: ["CuSO4.", "NaCl.", "K2SO4.", "AgNO3."],
    correctIndex: 1,
    explanation:
      "Điện phân NaCl không màng ngăn: khí Cl2 sinh ra phản ứng ngay với NaOH tạo nước Javel (hỗn hợp NaCl, NaClO) có tính tẩy màu.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong quá trình mạ bạc cho một chiếc vòng bằng thép thì ở anode xảy ra quá trình",
    choices: ["Ag → Ag+ + 1e.", "Fe → Fe^2+ + 2e.", "2H2O → 4H+ + O2 + 4e.", "C → C^4+ + 4e."],
    correctIndex: 0,
    explanation: "Trong mạ điện, anode là kim loại mạ (Ag), bị oxi hoá tan ra liên tục bổ sung ion Ag+ cho dung dịch: Ag → Ag+ + 1e.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Xét quá trình điện phân dung dịch NaCl 20% bằng dòng điện một chiều (với điện cực trơ, có màng ngăn xốp). Quá trình khử xảy ra ở cathode là",
    choices: [
      "2H2O + 2e → H2 + 2OH-.",
      "Cl2 + 2e → 2Cl-.",
      "2Cl- → Cl2 + 2e.",
      "H2O → 2H+ + 1/2O2 + 2e.",
    ],
    correctIndex: 0,
    explanation: "Cathode luôn xảy ra quá trình khử; trong dung dịch NaCl, nước bị khử tạo khí H2: 2H2O + 2e → H2 + 2OH-.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Trong quá trình điện phân KCl nóng chảy với các điện cực trơ, ở cathode xảy ra quá trình",
    choices: ["oxi hoá ion K+.", "khử ion K+.", "oxi hoá ion Cl-.", "khử ion Cl-."],
    correctIndex: 1,
    explanation: "Cathode luôn xảy ra quá trình khử; trong điện phân nóng chảy KCl, K+ + 1e → K tại cathode.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi điện phân dung dịch gồm CuSO4 1,0 M và H2SO4 0,5 M, quá trình khử đầu tiên xảy ra ở cathode là",
    choices: [
      "2H2O + 2e → H2 + 2OH-.",
      "Cu^2+ + 2e → Cu.",
      "SO4^2- + 4H+ + 2e → SO2 + 2H2O.",
      "2H+ + 2e → H2.",
    ],
    correctIndex: 1,
    explanation: "E°(Cu^2+/Cu) = +0,34 V cao hơn E°(2H+/H2) = 0 V nên Cu^2+ bị khử trước tại cathode.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các cặp oxi hoá – khử và thế điện cực chuẩn tương ứng: F2/2F- (+2,87 V), Cl2/2Cl- (+1,358 V), Br2/2Br- (+1,087 V), I2/2I- (+0,621 V). Khi điện phân dung dịch chứa đồng thời bốn loại ion halide ở trên với nồng độ mol bằng nhau, ion halide bị điện phân đầu tiên ở anode là",
    choices: ["Cl-.", "Br-.", "F-.", "I-."],
    correctIndex: 3,
    explanation: "I- có thế điện cực chuẩn của cặp I2/2I- nhỏ nhất (0,621 V) nên có tính khử mạnh nhất, bị oxi hoá đầu tiên tại anode.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các cặp oxi hoá – khử và thế điện cực chuẩn tương ứng: 2H+/H2 (0,00 V), Cu^2+/Cu (+0,34 V), Fe^2+/Fe (–0,44 V), Ag+/Ag (+0,799 V). Khi điện phân dung dịch chứa đồng thời bốn loại cation trên với nồng độ mol bằng nhau, cation bị điện phân đầu tiên ở cathode là",
    choices: ["Cu^2+.", "Ag+.", "H+.", "Fe^2+."],
    correctIndex: 1,
    explanation: "Ag+ có thế điện cực chuẩn cao nhất (+0,799 V) nên dễ bị khử nhất, bị điện phân đầu tiên tại cathode.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi điện phân dung dịch gồm Cu(NO3)2 1 M và AgNO3 1 M, thứ tự điện phân ở cathode là",
    choices: ["Cu^2+, Ag+, H2O.", "Ag+, Cu^2+, H2O.", "H2O, Cu^2+, Ag+.", "Cu^2+, H2O, Ag+."],
    correctIndex: 1,
    explanation: "Ag+ có thế điện cực chuẩn cao hơn Cu^2+ nên bị khử trước; tiếp theo là Cu^2+; cuối cùng mới đến nước.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi điện phân dung dịch gồm CuCl2 1,0 M và H2SO4 0,5 M, thứ tự bị điện phân ở anode là",
    choices: ["H2O, Cl-.", "Cl-, H2O.", "SO4^2-, Cl-, H2O.", "Cl-, SO4^2-, H2O."],
    correctIndex: 1,
    explanation:
      "Ion Cl- bị oxi hoá trước tại anode trơ; gốc SO4^2- rất bền, hầu như không bị điện phân nên nước bị oxi hoá sau cùng khi Cl- đã hết.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Khi điện phân dung dịch gồm CuSO4 và HCl (sử dụng điện cực trơ, có màng ngăn xốp), chất khí đầu tiên thoát ra ở anode là",
    choices: ["O2.", "Cl2.", "H2.", "SO2."],
    correctIndex: 1,
    explanation: "Cl- trong HCl dễ bị oxi hoá hơn nước nên khí Cl2 thoát ra đầu tiên ở anode.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Điện phân dung dịch CuSO4 với điện cực trơ. Sau một thời gian, ở cathode thu được 1,28 g Cu và ở anode có V mL khí O2 (25 °C, 1 bar) bay ra. Giá trị của V là",
    choices: ["495,8.", "124,0.", "247,9.", "743,7."],
    correctIndex: 2,
    explanation:
      "n(Cu) = 1,28/64 = 0,02 mol → n(e) = 0,04 mol. Tại anode: 2H2O → O2 + 4H+ + 4e nên n(O2) = 0,04/4 = 0,01 mol. V = 0,01 × 24790 = 247,9 mL.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Điện phân 500 mL dung dịch CuSO4 0,2 M (điện cực trơ) cho đến khi ở cathode thu được 3,2 g kim loại thì thể tích khí (đkc) thu được ở anode là",
    choices: ["1,24 lít.", "2,48 lít.", "0,62 lít.", "3,72 lít."],
    correctIndex: 2,
    explanation:
      "n(Cu) = 3,2/64 = 0,05 mol → n(e) = 0,1 mol. Tại anode: 2H2O → O2 + 4H+ + 4e nên n(O2) = 0,1/4 = 0,025 mol. V = 0,025 × 24,79 = 0,62 lít.",
    difficulty: "VAN_DUNG",
  },
  {
    content:
      "Điện phân dung dịch M(NO3)n (điện cực trơ, cường độ dòng điện không đổi), ở cathode chỉ thu được 5,4 g kim loại M và ở anode thu được 0,31 lít khí (đkc). Kim loại M là",
    choices: ["Fe.", "Cu.", "Ag.", "Pb."],
    correctIndex: 2,
    explanation:
      "n(O2) = 0,31/24,79 ≈ 0,0125 mol → n(e) = 4×0,0125 = 0,05 mol. n(M) = 0,05/n; khối lượng mol M = 5,4n/0,05 = 108n. Với n = 1, M = 108 ≈ Ag — phù hợp với muối AgNO3.",
    difficulty: "VAN_DUNG",
  },
  // Bài 17. Ôn tập chương V
  {
    content: "Cặp oxi hoá – khử nào sau đây có giá trị thế điện cực chuẩn nhỏ hơn 0?",
    choices: ["Ag+/Ag.", "Na+/Na.", "Hg^2+/Hg.", "Cu^2+/Cu."],
    correctIndex: 1,
    explanation: "Na+/Na có thế điện cực chuẩn –2,713 V (âm); Ag+/Ag, Hg^2+/Hg, Cu^2+/Cu đều có thế điện cực chuẩn dương.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Kí hiệu cặp oxi hoá – khử tương ứng với quá trình khử: Fe(OH)3 + 1e ⇌ Fe(OH)2 + OH- là",
    choices: ["Fe^3+/Fe^2+.", "Fe^2+/Fe.", "Fe^3+/Fe.", "Fe(OH)3/Fe(OH)2."],
    correctIndex: 3,
    explanation: "Cặp oxi hoá – khử được kí hiệu theo đúng dạng oxi hoá/dạng khử xuất hiện trong quá trình khử, ở đây là Fe(OH)3/Fe(OH)2.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong dãy điện hoá của kim loại, khi đi từ trái sang phải, tính oxi hoá của các ion kim loại biến đổi như thế nào?",
    choices: ["Không đổi.", "Tuần hoàn.", "Giảm dần.", "Tăng dần."],
    correctIndex: 3,
    explanation: "Dãy điện hoá sắp xếp theo chiều tăng dần thế điện cực chuẩn từ trái sang phải, tương ứng tính oxi hoá của ion kim loại tăng dần.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Trong pin điện hoá Zn – Cu, ở anode (cực âm) xảy ra quá trình",
    choices: [
      "oxi hoá Zn thành ion Zn^2+.",
      "khử ion Cu^2+ thành Cu.",
      "khử Cu thành ion Cu^2+.",
      "oxi hoá ion Zn^2+ thành Zn.",
    ],
    correctIndex: 0,
    explanation: "Zn là anode (cực âm), tại đây xảy ra quá trình oxi hoá: Zn → Zn^2+ + 2e.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi điện phân dung dịch NaCl bằng dòng điện một chiều (với điện cực trơ, có màng ngăn xốp) thì ở cathode xảy ra quá trình",
    choices: [
      "oxi hoá H2O thành H+ và O2.",
      "khử Cl- thành Cl2.",
      "oxi hoá Cl- thành Cl2.",
      "khử H2O thành H2 và OH-.",
    ],
    correctIndex: 3,
    explanation: "Cathode luôn xảy ra quá trình khử; trong dung dịch NaCl, nước bị khử tạo H2 và OH-.",
    difficulty: "NHAN_BIET",
  },
  {
    content: "Khi điện phân dung dịch CuSO4 bằng dòng điện một chiều (với điện cực anode bằng Cu) thì ở anode xảy ra quá trình",
    choices: [
      "oxi hoá H2O thành H+ và O2.",
      "khử Cu^2+ thành Cu.",
      "oxi hoá Cu thành Cu^2+.",
      "khử H2O thành H2 và OH-.",
    ],
    correctIndex: 2,
    explanation: "Anode làm bằng Cu (anode tan) nên chính Cu bị oxi hoá trước: Cu → Cu^2+ + 2e, thay vì nước bị oxi hoá.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Trong nước, thế điện cực chuẩn của kim loại Mn+/M càng lớn thì dạng khử có tính khử ...(1)... và dạng oxi hoá có tính oxi hoá ...(2)... Cụm từ cần điền vào (1) và (2) lần lượt là",
    choices: ["càng mạnh và càng yếu.", "càng mạnh và càng mạnh.", "càng yếu và càng yếu.", "càng yếu và càng mạnh."],
    correctIndex: 3,
    explanation: "Thế điện cực chuẩn càng lớn (càng dương) thì kim loại M có tính khử càng yếu, còn ion Mn+ có tính oxi hoá càng mạnh.",
    difficulty: "NHAN_BIET",
  },
  {
    content:
      "Cho thứ tự sắp xếp các cặp oxi hoá – khử trong dãy điện hoá: Mg^2+/Mg; H2O/H2, OH-; 2H+/H2; Ag+/Ag. Thí nghiệm nào sau đây KHÔNG xảy ra phản ứng ở điều kiện chuẩn?",
    choices: [
      "Cho sợi phoi bào Mg vào nước.",
      "Cho lá Mg vào dung dịch HCl.",
      "Cho lá Ag vào dung dịch H2SO4.",
      "Cho sợi Mg vào dung dịch AgNO3.",
    ],
    correctIndex: 2,
    explanation:
      "Ag đứng sau cặp 2H+/H2 trong dãy điện hoá (thế điện cực chuẩn dương hơn) nên không phản ứng được với dung dịch acid loãng giải phóng H2; Mg đứng trước tất cả nên phản ứng được với nước, HCl và AgNO3.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Xét phản ứng hoá học giữa hai cặp oxi hoá – khử của kim loại: R + 2M+ → R^2+ + 2M. Biết giá trị thế điện cực chuẩn các cặp oxi hoá – khử M+/M và R^2+/R lần lượt là x (V) và y (V). Nhận xét nào sau đây đúng?",
    choices: ["x < y.", "x > y.", "x = y.", "2x = y."],
    correctIndex: 1,
    explanation:
      "Phản ứng xảy ra tự phát theo chiều M+ (chất oxi hoá) oxi hoá R (chất khử), nên cặp M+/M phải có thế điện cực chuẩn lớn hơn cặp R^2+/R, tức x > y.",
    difficulty: "THONG_HIEU",
  },
  {
    content: "Cho phản ứng hoá học: Cu + 2Fe^3+ → Cu^2+ + 2Fe^2+. Phát biểu nào sau đây về phản ứng trên KHÔNG đúng?",
    choices: [
      "Cu bị Fe^3+ oxi hoá thành Cu^2+.",
      "Cu^2+ có tính oxi hoá mạnh hơn Fe^3+.",
      "Fe^3+ bị Cu khử thành Fe^2+.",
      "Cu là chất khử, Fe^3+ là chất oxi hoá.",
    ],
    correctIndex: 1,
    explanation:
      "Phát biểu B sai vì chính Fe^3+ có tính oxi hoá mạnh hơn Cu^2+ (đó là lý do phản ứng xảy ra theo chiều Fe^3+ oxi hoá Cu), không phải ngược lại.",
    difficulty: "THONG_HIEU",
  },
  {
    content:
      "Cho các cặp oxi hoá – khử và thế điện cực chuẩn tương ứng: Na+/Na (–2,713 V), Mg^2+/Mg (–2,356 V), Al^3+/Al (–1,676 V), Cu^2+/Cu (+0,340 V). Ion kim loại nào sau đây bị khử tại cathode khi điện phân (với điện cực graphite) dung dịch muối sulfate tương ứng?",
    choices: ["Mg^2+.", "Na+.", "Cu^2+.", "Al^3+."],
    correctIndex: 2,
    explanation:
      "Chỉ có Cu^2+ có thế điện cực chuẩn dương, dễ bị khử trong dung dịch nước; Na+, Mg^2+, Al^3+ đều có thế điện cực chuẩn rất âm nên nước bị khử ưu tiên hơn.",
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
        source: "SBT Hóa 12 - Kết nối tri thức (Chương 5 - Pin điện và điện phân)",
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
