import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AU: bổ sung bộ flashcard "Trò chơi ghi nhớ" cho Lớp 12 (8 chương có nội dung, bỏ qua Chương 9
// "Ôn tập tổng hợp" vì không có Document/FlashcardSet riêng) — trước đó mỗi chương chỉ có 1-4 thẻ.
// Term/meaning tự soạn dựa trên nội dung lý thuyết + hàng trăm câu /practice đã tự giải trong
// phiên làm việc này, không chép nguyên văn nguồn ngoài.

const SETS = [
  {
    chapterId: "cmrelkcle0006vhus7ep6c6jk", // Chương 1. Ester - Lipid
    cards: [
      ["Ester", "Sản phẩm thế nhóm -OH ở nhóm carboxyl của acid bằng nhóm -OR' của alcohol"],
      ["Phản ứng ester hóa", "Acid carboxylic + alcohol, xúc tác H2SO4 đặc, tạo ester + nước, thuận nghịch"],
      ["Phản ứng xà phòng hóa", "Thủy phân ester (đặc biệt chất béo) trong môi trường kiềm, tạo alcohol/glycerol + muối"],
      ["Chất béo (triglyceride)", "Trieste của glycerol với các acid béo"],
      ["Acid béo no", "Acid béo không có liên kết đôi C=C, ví dụ palmitic acid, stearic acid"],
      ["Acid béo không no", "Acid béo có liên kết đôi C=C, ví dụ oleic acid, linoleic acid"],
      ["Tristearin", "(C17H35COO)3C3H5 — chất béo no, thể rắn ở điều kiện thường"],
      ["Triolein", "(C17H33COO)3C3H5 — chất béo không no, thể lỏng ở điều kiện thường"],
      ["Chỉ số iodine", "Số gam iodine phản ứng tối đa với 100g chất béo, đánh giá mức độ không no"],
      ["Xà phòng", "Muối sodium/potassium của các acid béo"],
      ["Chất giặt rửa tổng hợp", "Chất có cấu tạo tương tự xà phòng nhưng tổng hợp từ dầu mỏ, không phải từ chất béo"],
      ["Phần kị nước", "Gốc hydrocarbon dài trong phân tử xà phòng/chất giặt rửa, không tan trong nước"],
      ["Phần ưa nước", "Nhóm carboxylate/sulfate/sulfonate trong phân tử xà phòng/chất giặt rửa, tan trong nước"],
      ["Danh pháp ester RCOOR'", "Tên gốc R' + tên anion RCOO- (đổi đuôi -ic → -at), ví dụ methyl acetate"],
      ["Sáp (wax)", "Ester của acid béo với alcohol có mạch carbon dài (không phải glycerol)"],
      ["Isoamyl acetate", "Ester tạo mùi thơm đặc trưng của quả chuối"],
      ["Ethyl butyrate", "Ester tạo mùi thơm đặc trưng của quả dứa"],
      ["Benzyl acetate", "Ester tạo mùi thơm đặc trưng của hoa nhài"],
      ["Số C của ester đơn chức no CnH2nO2", "Công thức tổng quát của ester no, đơn chức, mạch hở"],
      ["Phản ứng cộng H2 vào chất béo lỏng", "Chuyển chất béo không no (lỏng) thành chất béo no (rắn) — nguyên tắc sản xuất bơ thực vật"],
    ],
  },
  {
    chapterId: "cmrelkd130007vhusmuwsjq5q", // Chương 2. Carbohydrate
    cards: [
      ["Carbohydrate", "Hợp chất hữu cơ tạp chức chứa nhiều nhóm -OH và nhóm carbonyl (C=O)"],
      ["Monosaccharide", "Carbohydrate đơn giản nhất, không bị thủy phân, ví dụ glucose, fructose"],
      ["Disaccharide", "Carbohydrate tạo bởi 2 monosaccharide liên kết, thủy phân cho 2 monosaccharide"],
      ["Polysaccharide", "Carbohydrate tạo bởi nhiều monosaccharide liên kết, ví dụ tinh bột, cellulose"],
      ["Glucose", "Monosaccharide C6H12O6, dạng aldehyde, có nhiều trong quả nho chín"],
      ["Fructose", "Monosaccharide C6H12O6, dạng ketone, có nhiều trong mật ong, ngọt hơn glucose"],
      ["Saccharose", "Disaccharide C12H22O11, tạo bởi glucose + fructose, không có phản ứng tráng bạc"],
      ["Maltose", "Disaccharide C12H22O11, tạo bởi 2 phân tử glucose, có phản ứng tráng bạc"],
      ["Tinh bột", "Polysaccharide (C6H10O5)n, gồm amylose và amylopectin, dự trữ năng lượng ở thực vật"],
      ["Cellulose", "Polysaccharide (C6H10O5)n, thành phần chính của thành tế bào thực vật, không phân nhánh"],
      ["Amylose", "Thành phần tinh bột mạch không phân nhánh, tan trong nước nóng"],
      ["Amylopectin", "Thành phần tinh bột mạch phân nhánh, không tan trong nước nóng"],
      ["Phản ứng tráng bạc", "Glucose + AgNO3/NH3 → Ag kết tủa, do glucose có nhóm -CHO"],
      ["Phản ứng màu với iodine", "Hồ tinh bột + I2 → màu xanh tím đặc trưng"],
      ["Phản ứng với Cu(OH)2 ở nhiệt độ thường", "Carbohydrate có nhiều nhóm -OH liền kề hòa tan Cu(OH)2 tạo dung dịch xanh lam"],
      ["Thủy phân saccharose", "Saccharose + H2O (xúc tác acid/enzyme) → glucose + fructose"],
      ["Thủy phân tinh bột/cellulose", "(C6H10O5)n + nH2O → n C6H12O6 (glucose)"],
      ["Lên men rượu", "C6H12O6 (men rượu) → 2C2H5OH + 2CO2"],
      ["Vai trò của cellulose", "Nguyên liệu sản xuất giấy, tơ nhân tạo, không tiêu hóa được bởi người"],
      ["Vai trò của glucose trong y học", "Dùng làm dịch truyền tĩnh mạch (huyết thanh ngọt) cho bệnh nhân"],
    ],
  },
  {
    chapterId: "cmrelkdgl0008vhustpmmwfxa", // Chương 3. Hợp chất chứa nitrogen
    cards: [
      ["Amine", "Hợp chất hữu cơ khi thay thế 1 hoặc nhiều H trong NH3 bằng gốc hydrocarbon"],
      ["Amine bậc 1", "R-NH2, một gốc hydrocarbon gắn vào N"],
      ["Amine bậc 2", "R-NH-R', hai gốc hydrocarbon gắn vào N"],
      ["Amine bậc 3", "R-N(R')(R''), ba gốc hydrocarbon gắn vào N"],
      ["Aniline", "C6H5NH2, amine thơm đơn giản nhất, tính base rất yếu"],
      ["Tính base của amine", "Do cặp electron tự do trên N, amine béo có tính base mạnh hơn amine thơm"],
      ["Amino acid", "Hợp chất tạp chức chứa đồng thời nhóm -NH2 và nhóm -COOH"],
      ["Tính lưỡng tính của amino acid", "Vừa phản ứng được với acid (nhóm NH2) vừa phản ứng được với base (nhóm COOH)"],
      ["Điểm đẳng điện (pI)", "Giá trị pH mà amino acid tồn tại chủ yếu ở dạng ion lưỡng cực, không di chuyển trong điện trường"],
      ["Ion lưỡng cực (zwitterion)", "Dạng amino acid có cả nhóm NH3+ và COO- trong cùng phân tử"],
      ["Peptide", "Hợp chất tạo bởi các gốc amino acid liên kết với nhau qua liên kết peptide (-CO-NH-)"],
      ["Liên kết peptide", "Liên kết -CO-NH- giữa nhóm carboxyl của amino acid này với nhóm amino của amino acid kia"],
      ["Phản ứng màu biuret", "Peptide có từ 2 liên kết peptide trở lên tạo phức màu tím với Cu(OH)2"],
      ["Glycine", "Amino acid đơn giản nhất, H2N-CH2-COOH"],
      ["Alanine", "Amino acid CH3-CH(NH2)-COOH"],
      ["Lysine", "Amino acid base (2 nhóm NH2, 1 nhóm COOH), pI cao"],
      ["Glutamic acid", "Amino acid acid (1 nhóm NH2, 2 nhóm COOH), pI thấp, dùng làm mì chính (bột ngọt)"],
      ["Protein", "Polypeptide có khối lượng phân tử lớn (thường >10.000 amu), có cấu trúc không gian xác định"],
      ["Phản ứng thủy phân protein/peptide", "Xảy ra trong môi trường acid, base hoặc nhờ enzyme, cắt liên kết peptide"],
      ["Enzyme", "Chất xúc tác sinh học có bản chất protein, tăng tốc độ phản ứng sinh hóa"],
    ],
  },
  {
    chapterId: "cmrelkdwb0009vhuszp5bua8z", // Chương 4. Polymer
    cards: [
      ["Polymer", "Hợp chất có phân tử khối rất lớn, tạo bởi nhiều mắt xích liên kết với nhau"],
      ["Monomer", "Phân tử nhỏ ban đầu dùng để tổng hợp polymer"],
      ["Mắt xích (đơn vị lặp lại)", "Phần cấu trúc lặp đi lặp lại trong mạch polymer"],
      ["Hệ số trùng hợp (n)", "Số lượng mắt xích trong một phân tử polymer"],
      ["Phản ứng trùng hợp", "Nhiều phân tử monomer có liên kết bội kết hợp với nhau tạo polymer, không giải phóng phân tử nhỏ"],
      ["Phản ứng trùng ngưng", "Nhiều phân tử monomer có ít nhất 2 nhóm chức kết hợp với nhau tạo polymer, giải phóng phân tử nhỏ (H2O)"],
      ["Polyethylene (PE)", "Trùng hợp từ CH2=CH2, dùng làm túi nylon, màng bọc thực phẩm"],
      ["Polyvinyl chloride (PVC)", "Trùng hợp từ CH2=CHCl, dùng làm ống nước, vật liệu cách điện"],
      ["Polystyrene (PS)", "Trùng hợp từ C6H5-CH=CH2, dùng làm hộp xốp, đồ nhựa gia dụng"],
      ["Nylon-6,6", "Trùng ngưng từ hexamethylenediamine và adipic acid, thuộc loại tơ polyamide"],
      ["Tơ nitron (olon)", "Trùng hợp từ CH2=CH-CN (acrylonitrile), tơ tổng hợp giữ nhiệt tốt"],
      ["Cao su thiên nhiên", "Polymer của isoprene, có tính đàn hồi"],
      ["Cao su lưu hóa", "Cao su được xử lý với sulfur, tăng độ bền và độ đàn hồi"],
      ["Tơ thiên nhiên", "Tơ có sẵn trong tự nhiên như tơ tằm, bông"],
      ["Tơ tổng hợp", "Tơ tổng hợp hoàn toàn từ các monomer, ví dụ nylon, nitron"],
      ["Tơ bán tổng hợp (nhân tạo)", "Tơ chế biến từ polymer thiên nhiên bằng phương pháp hóa học, ví dụ tơ visco"],
      ["Chất dẻo", "Vật liệu polymer có tính dẻo, có thể tạo hình dưới nhiệt độ/áp suất"],
      ["Vật liệu composite", "Vật liệu tổng hợp từ 2 hay nhiều thành phần, thường polymer + vật liệu gia cường"],
      ["Phản ứng giữ nguyên mạch polymer", "Phản ứng chỉ làm biến đổi nhóm thế, không phá vỡ mạch chính, ví dụ cộng Br2 vào cao su"],
      ["Phản ứng cắt mạch polymer", "Phản ứng phá vỡ mạch chính polymer, ví dụ thủy phân hoặc nhiệt phân polymer"],
    ],
  },
  {
    chapterId: "cmrelkec1000avhuszsl9chvt", // Chương 5. Pin điện và điện phân
    cards: [
      ["Pin điện hóa (pin Galvani)", "Thiết bị chuyển hóa năng lượng hóa học thành điện năng nhờ phản ứng oxi hóa - khử tự xảy ra"],
      ["Điện cực âm (anode) trong pin", "Nơi xảy ra sự oxi hóa (kim loại hoạt động hơn nhường electron)"],
      ["Điện cực dương (cathode) trong pin", "Nơi xảy ra sự khử (ion kim loại nhận electron)"],
      ["Cầu muối", "Cầu nối 2 dung dịch điện phân, giúp cân bằng điện tích, hoàn thành mạch điện"],
      ["Thế điện cực chuẩn (E°)", "Đại lượng đặc trưng cho khả năng oxi hóa/khử chuẩn của một cặp oxi hóa - khử"],
      ["Sức điện động chuẩn của pin (E°pin)", "E°pin = E°(cathode) - E°(anode), luôn dương khi pin hoạt động tự phát"],
      ["Dãy điện hóa kim loại", "Sắp xếp các cặp oxi hóa - khử theo chiều tăng dần thế điện cực chuẩn"],
      ["Điện phân", "Quá trình dùng dòng điện một chiều để thực hiện phản ứng oxi hóa - khử không tự xảy ra"],
      ["Anode trong điện phân", "Điện cực nối với cực dương nguồn điện, xảy ra sự oxi hóa"],
      ["Cathode trong điện phân", "Điện cực nối với cực âm nguồn điện, xảy ra sự khử"],
      ["Điện phân nóng chảy", "Điện phân hợp chất ở trạng thái nóng chảy, dùng điều chế kim loại mạnh (Na, Al)"],
      ["Điện phân dung dịch", "Điện phân dung dịch chất điện li trong nước, nước cũng có thể tham gia điện cực"],
      ["Định luật Faraday", "m = (A.I.t)/(n.F), tính khối lượng chất thu được ở điện cực"],
      ["Hằng số Faraday (F)", "F = 96485 C/mol, điện lượng của 1 mol electron"],
      ["Mạ điện", "Dùng điện phân để phủ một lớp kim loại mỏng lên bề mặt vật khác, chống ăn mòn/tạo vẻ đẹp"],
      ["Tinh chế kim loại bằng điện phân", "Anode là kim loại thô, cathode là kim loại tinh khiết lắng đọng"],
      ["Ứng dụng điện phân sản xuất Al", "Điện phân nóng chảy Al2O3 hòa tan trong cryolite"],
      ["Ứng dụng điện phân dung dịch NaCl", "Điện phân dung dịch NaCl có màng ngăn tạo Cl2, H2 và NaOH"],
      ["Ắc quy chì", "Pin sạc lại được (pin thứ cấp), dùng cực Pb và PbO2 trong dung dịch H2SO4"],
      ["Pin (nguyên) không sạc lại được", "Pin sơ cấp, ví dụ pin Zn-MnO2 (pin khô)"],
    ],
  },
  {
    chapterId: "cmrelkes5000bvhuscyioqkoh", // Chương 6. Đại cương về kim loại
    cards: [
      ["Liên kết kim loại", "Lực hút tĩnh điện giữa các cation kim loại và các electron hóa trị tự do trong tinh thể"],
      ["Tính chất vật lý chung của kim loại", "Dẻo, dẫn điện, dẫn nhiệt tốt, có ánh kim — do electron tự do"],
      ["Tính khử của kim loại", "Kim loại dễ nhường electron để tạo thành ion dương"],
      ["Dãy hoạt động hóa học kim loại", "Sắp xếp kim loại theo chiều giảm dần tính khử"],
      ["Kim loại dẫn điện tốt nhất", "Bạc (Ag) > Đồng (Cu) > Vàng (Au) > Nhôm (Al)"],
      ["Kim loại có tính dẻo cao nhất", "Vàng (Au) — có thể dát mỏng, kéo sợi dễ dàng nhất"],
      ["Phương pháp thủy luyện", "Dùng dung dịch để hòa tan hợp chất kim loại rồi khử ion kim loại bằng kim loại mạnh hơn"],
      ["Phương pháp nhiệt luyện", "Dùng chất khử (C, CO, H2, Al) để khử oxide kim loại ở nhiệt độ cao"],
      ["Phương pháp điện phân điều chế kim loại", "Dùng điện phân nóng chảy hoặc dung dịch để khử ion kim loại thành kim loại"],
      ["Hợp kim", "Vật liệu kim loại chứa một kim loại cơ bản và một hoặc nhiều nguyên tố khác"],
      ["Gang", "Hợp kim của Fe với C (2-5%C) và một số nguyên tố khác"],
      ["Thép", "Hợp kim của Fe với C (dưới 2%C), độ bền cao hơn gang"],
      ["Ăn mòn hóa học", "Kim loại phản ứng trực tiếp với chất oxi hóa trong môi trường, không phát sinh dòng điện"],
      ["Ăn mòn điện hóa", "Ăn mòn kim loại do hình thành pin điện hóa (2 điện cực khác nhau tiếp xúc trong dung dịch điện li)"],
      ["Điều kiện xảy ra ăn mòn điện hóa", "Có 2 điện cực khác bản chất, tiếp xúc trực tiếp hoặc gián tiếp, cùng nhúng vào dung dịch điện li"],
      ["Phương pháp bảo vệ điện hóa (bảo vệ hi sinh)", "Gắn kim loại hoạt động mạnh hơn vào vật cần bảo vệ, kim loại đó bị ăn mòn thay"],
      ["Phương pháp phủ bề mặt chống ăn mòn", "Sơn, mạ kim loại, bôi dầu mỡ để cách li kim loại khỏi môi trường"],
      ["Tính chất hóa học chung của kim loại", "Tác dụng với phi kim, acid, và một số dung dịch muối"],
      ["Kim loại tác dụng với dung dịch muối", "Kim loại mạnh hơn đẩy kim loại yếu hơn ra khỏi dung dịch muối"],
      ["Độ dẫn điện giảm khi nhiệt độ tăng", "Do ion dương dao động mạnh hơn, cản trở dòng electron tự do di chuyển"],
    ],
  },
  {
    chapterId: "cmrelkf8d000cvhuseifdze82", // Chương 7. Nguyên tố nhóm IA và nhóm IIA
    cards: [
      ["Kim loại nhóm IA (kim loại kiềm)", "Li, Na, K, Rb, Cs — có 1 electron lớp ngoài cùng, tính khử rất mạnh"],
      ["Kim loại nhóm IIA (kim loại kiềm thổ)", "Be, Mg, Ca, Sr, Ba — có 2 electron lớp ngoài cùng, tính khử mạnh"],
      ["Cấu trúc tinh thể kim loại kiềm", "Lập phương tâm khối"],
      ["Số oxi hóa của kim loại kiềm", "Luôn là +1 trong hợp chất"],
      ["Số oxi hóa của kim loại kiềm thổ", "Luôn là +2 trong hợp chất"],
      ["Điều chế kim loại kiềm", "Điện phân nóng chảy muối halide của kim loại kiềm"],
      ["Sodium carbonate (Na2CO3)", "Soda, nguyên liệu quan trọng trong sản xuất thủy tinh, xà phòng"],
      ["Sodium hydrogencarbonate (NaHCO3)", "Baking soda, dùng làm bột nở, thuốc giảm acid dạ dày"],
      ["Sodium hydroxide (NaOH)", "Base mạnh, xút ăn da, dùng sản xuất xà phòng, giấy, tơ nhân tạo"],
      ["Nước cứng", "Nước chứa nhiều ion Ca2+ và Mg2+"],
      ["Nước cứng tạm thời", "Nước cứng chứa ion HCO3- của Ca2+/Mg2+, mất cứng khi đun sôi"],
      ["Nước cứng vĩnh cửu", "Nước cứng chứa ion Cl-, SO42- của Ca2+/Mg2+, không mất cứng khi đun sôi"],
      ["Tác hại của nước cứng", "Đóng cặn trong ấm đun, giảm hiệu quả xà phòng, hại thiết bị công nghiệp"],
      ["Phương pháp làm mềm nước cứng", "Dùng Na2CO3, Na3PO4, hoặc phương pháp trao đổi ion"],
      ["Calcium oxide (CaO)", "Vôi sống, sản xuất từ nung đá vôi CaCO3, phản ứng thu nhiệt mạnh"],
      ["Calcium hydroxide (Ca(OH)2)", "Vôi tôi, dùng khử chua đất, xử lý nước thải"],
      ["Calcium carbonate (CaCO3)", "Đá vôi, đá phấn, thành phần chính của vỏ trứng, vỏ sò"],
      ["Thạch cao nung (CaSO4.0,5H2O)", "Dùng bó bột trong y học, khi trộn nước đông cứng nhanh"],
      ["Màu ngọn lửa kim loại kiềm/kiềm thổ", "Li: đỏ tía, Na: vàng, K: tím nhạt, Ca: đỏ cam, Ba: lục vàng"],
      ["Phản ứng của kim loại kiềm với nước", "Phản ứng mãnh liệt tạo dung dịch base và khí H2"],
    ],
  },
  {
    chapterId: "cmrelkfnv000dvhuszgu3hjbi", // Chương 8. Kim loại chuyển tiếp và phức chất
    cards: [
      ["Kim loại chuyển tiếp", "Nguyên tố có electron cuối cùng điền vào phân lớp d, thường có nhiều số oxi hóa"],
      ["Đặc điểm kim loại chuyển tiếp dãy thứ nhất", "Từ Sc đến Zn, có bán kính nguyên tử giảm dần rồi tăng nhẹ, nhiều màu sắc hợp chất"],
      ["Phức chất", "Hợp chất gồm nguyên tử/ion trung tâm liên kết với các phối tử qua liên kết cho - nhận"],
      ["Nguyên tử trung tâm", "Ion kim loại (thường là kim loại chuyển tiếp) nhận cặp electron từ phối tử"],
      ["Phối tử (ligand)", "Phân tử hoặc ion có cặp electron tự do, cho vào nguyên tử trung tâm"],
      ["Liên kết cho - nhận trong phức chất", "Phối tử cho cặp electron, nguyên tử trung tâm nhận, tạo liên kết phối trí"],
      ["Số phối trí", "Tổng số liên kết cho - nhận mà nguyên tử trung tâm tạo ra với các phối tử"],
      ["Cầu nội (ion phức)", "Phần gồm nguyên tử trung tâm và các phối tử, đặt trong dấu ngoặc vuông"],
      ["Cầu ngoại", "Các ion nằm ngoài cầu nội, cân bằng điện tích với ion phức"],
      ["Phối tử aqua", "Phối tử H2O trong phức chất, ví dụ [Cu(H2O)6]2+"],
      ["Phối tử ammine", "Phối tử NH3 trong phức chất, ví dụ [Cu(NH3)4]2+"],
      ["Màu xanh của dung dịch CuSO4", "Do sự tạo thành phức chất [Cu(H2O)6]2+"],
      ["Màu xanh lam đậm khi thêm NH3 dư vào Cu2+", "Do tạo phức [Cu(NH3)4(H2O)2]2+"],
      ["Thuốc thử Tollens", "Phức [Ag(NH3)2]OH, dùng nhận biết aldehyde qua phản ứng tráng bạc"],
      ["Ứng dụng phức chất trong y học", "Cisplatin (phức chứa Pt) dùng làm thuốc điều trị ung thư"],
      ["Ứng dụng phức chất trong sinh học", "Hemoglobin chứa phức Fe, chlorophyll chứa phức Mg"],
      ["Fe2+ và hợp chất", "Có tính khử, dễ bị oxi hóa thành Fe3+ trong không khí"],
      ["Fe3+ và hợp chất", "Có tính oxi hóa, dung dịch màu vàng nâu"],
      ["Cr2O3 và Cr(OH)3", "Oxide và hydroxide lưỡng tính của chromium"],
      ["Ứng dụng của kim loại chuyển tiếp", "Xúc tác công nghiệp, hợp kim chịu nhiệt/chống ăn mòn, pin, nam châm"],
    ],
  },
];

async function main() {
  let totalAdded = 0;
  for (const { chapterId, cards } of SETS) {
    const set = await prisma.flashcardSet.findFirst({ where: { chapterId } });
    if (!set) {
      console.warn(`[SKIP] Không tìm thấy FlashcardSet cho chapterId=${chapterId}`);
      continue;
    }
    const existing = await prisma.flashcard.findMany({ where: { setId: set.id }, select: { term: true, order: true } });
    const existingTerms = new Set(existing.map((c) => c.term.trim().toLowerCase()));
    let nextOrder = existing.reduce((max, c) => Math.max(max, c.order), 0) + 1;

    let added = 0;
    for (const [term, meaning] of cards) {
      if (existingTerms.has(term.trim().toLowerCase())) continue;
      await prisma.flashcard.create({
        data: { setId: set.id, term, meaning, order: nextOrder++ },
      });
      added++;
    }
    console.log(`${set.topic}: +${added} thẻ (trùng bỏ qua: ${cards.length - added}).`);
    totalAdded += added;
  }
  console.log(`\nTổng cộng: +${totalAdded} thẻ flashcard Lớp 12.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
