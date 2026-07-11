import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-Y: bổ sung Ứng dụng thực tế + Bài tập áp dụng nhanh (và vài mục còn thiếu so với SGK
// KHTN 8 - KNTT trang 11-33) cho 6 bài Chương I Lớp 8 — các bài này là khái niệm/kỹ năng
// (không phải "1 loại chất") nên không áp dụng khung 7 mục của chem-theory, chỉ cần đủ
// ví dụ thực tế + bài tập cuối bài theo yêu cầu chung.

const PATCHES = [
  {
    id: "cmrel0o1p0006vhd8ge8qu3gv", // Bài 2. Phản ứng hóa học
    insertions: [
      {
        after: "## Ví dụ minh họa",
        marker: "## Lưu ý",
        text: `## Phản ứng tỏa nhiệt và thu nhiệt
- Phản ứng tỏa nhiệt: giải phóng năng lượng (dạng nhiệt) ra môi trường trong suốt quá trình phản ứng, ví dụ: đốt cháy than, xăng, dầu.
- Phản ứng thu nhiệt: nhận năng lượng (dạng nhiệt) từ môi trường trong suốt quá trình phản ứng.
- Than, xăng, dầu (nhiên liệu hóa thạch) được dùng rộng rãi trong sản xuất và đời sống nhờ phản ứng cháy tỏa nhiệt mạnh.

## Ứng dụng thực tế
- Đốt cháy nhiên liệu hóa thạch luôn cần đủ khí oxygen; nếu thiếu oxygen, quá trình cháy sinh thêm khí carbon monoxide (CO) — khí độc, không màu, không mùi, rất nguy hiểm vì khó nhận biết. Đây là lý do không nên đốt than, củi để sưởi ấm trong phòng kín, đóng kín cửa.

`,
      },
    ],
    append: `## Bài tập áp dụng nhanh
1. Hiện tượng nào sau đây là biến đổi hóa học: đun sôi nước, đốt cháy tờ giấy, hòa tan đường vào nước, đinh sắt bị gỉ? Liệt kê đầy đủ và giải thích.
2. Vì sao không nên đốt than, củi để sưởi ấm trong phòng kín, đóng kín cửa?
3. Nêu 2 dấu hiệu giúp nhận biết một phản ứng hóa học đã xảy ra.`,
  },
  {
    id: "cmrel0o1p0007vhd8u5dcegea", // Bài 3. Mol và tỉ khối chất khí
    insertions: [
      {
        after: "Ví dụ khối lượng mol của H2O là 18 g/mol.",
        marker: "## Công thức tính số mol",
        text: `- Ví dụ: 12 gam carbon, 254 gam iodine (I2), hay 18 gam nước (H2O) đều chứa NA hạt vi mô tương ứng — nghĩa là đều bằng 1 mol chất đó.

`,
      },
    ],
    append: `## Ứng dụng thực tế
Tỉ khối giúp giải thích nhiều hiện tượng an toàn trong đời sống: khí carbon dioxide (CO2, M = 44 g/mol) nặng hơn không khí nên dễ tích tụ ở đáy hang sâu, giếng cạn — gây ngạt nếu nồng độ oxygen ở đó giảm thấp; khí methane (CH4, M = 16 g/mol) nhẹ hơn không khí nên dễ bay lên và tích tụ ở phần trên của không gian kín (hầm biogas, hầm chứa chất hữu cơ phân hủy).

## Bài tập áp dụng nhanh
1. Tính khối lượng của 0,25 mol khí oxygen (O2, M = 32 g/mol).
2. Khí carbon dioxide (CO2) nặng hay nhẹ hơn không khí bao nhiêu lần? Vì sao khi xuống hang sâu/giếng cạn lâu ngày không sử dụng cần thận trọng?
3. Tính thể tích (ở đkc) của 4,4 gam khí CO2 (M = 44 g/mol).`,
  },
  {
    id: "cmrel0o1p0008vhd8qx8mhed1", // Bài 4. Dung dịch và nồng độ
    insertions: [
      {
        after: "- CM = n / V (n: số mol chất tan; V: thể tích dung dịch, lít; đơn vị CM là mol/lít).",
        marker: "## Ví dụ minh họa",
        text: `- Ví dụ: Hòa tan 0,2 mol NaOH vào nước để được 500 mL dung dịch. Nồng độ mol: CM = n/V = 0,2/0,5 = 0,4 mol/L.

`,
      },
    ],
    append: `## Ứng dụng thực tế
- Nước muối sinh lý dùng trong y tế (nhỏ mắt, nhỏ mũi, rửa vết thương) có nồng độ NaCl 0,9% — xấp xỉ nồng độ muối trong dịch cơ thể người nên không gây hại tế bào.
- Pha chế dung dịch theo đúng nồng độ cho trước là kĩ năng thực hành quan trọng trong phòng thí nghiệm và sản xuất.

## Bài tập áp dụng nhanh
1. Hòa tan 15 gam NaCl vào 135 gam nước. Tính nồng độ phần trăm của dung dịch thu được.
2. Cần bao nhiêu gam NaCl để pha chế 200 gam dung dịch nước muối sinh lý nồng độ 0,9%?
3. Tính nồng độ mol của dung dịch chứa 0,05 mol NaOH trong 250 mL dung dịch.`,
  },
  {
    id: "cmrel0o1p0009vhd864p5ysjx", // Bài 5. Bảo toàn khối lượng và PTHH
    insertions: [],
    append: `## Ứng dụng thực tế
Định luật bảo toàn khối lượng là cơ sở để tính lượng nguyên liệu cần dùng và lượng sản phẩm thu được trong sản xuất hóa học, xây dựng, luyện kim. Ví dụ: khi để vôi sống (CaO) ngoài không khí ẩm, khối lượng vôi tăng lên do CaO hấp thụ hơi nước và khí CO2 tạo thành Ca(OH)2, CaCO3 — khối lượng tăng thêm chính bằng khối lượng H2O, CO2 đã phản ứng, không hề vi phạm định luật bảo toàn khối lượng.

## Bài tập áp dụng nhanh
1. Đốt cháy hoàn toàn 3 gam carbon trong khí oxygen, thu được 11 gam khí CO2. Tính khối lượng oxygen đã phản ứng.
2. Cân bằng phương trình hóa học sau: Al + O2 -> Al2O3.
3. Trong phản ứng A + B -> C + D, biết m(A) = 5,6 gam, m(B) = 3,2 gam, m(D) = 4,4 gam. Tính m(C).`,
  },
  {
    id: "cmrel0o1p000avhd831rwupo9", // Bài 6. Tính theo PTHH
    insertions: [],
    append: `## Hiệu suất phản ứng
Trong thực tế, lượng sản phẩm thu được thường ít hơn lượng tính theo lí thuyết (do phản ứng không hoàn toàn, thất thoát khi thao tác...). Hiệu suất phản ứng (kí hiệu H) được tính bằng:
H% = (lượng sản phẩm thực tế / lượng sản phẩm lí thuyết) x 100%
Ví dụ: Nung 20 gam đá vôi (CaCO3, M = 100 g/mol), lí thuyết thu được 11,2 gam CaO nhưng thực tế chỉ thu được 10,08 gam CaO. Hiệu suất phản ứng: H% = (10,08/11,2) x 100% = 90%.

## Ứng dụng thực tế
Tính theo phương trình hóa học được dùng để tính lượng nguyên liệu cần chuẩn bị và dự đoán lượng sản phẩm thu được trong sản xuất công nghiệp, giúp tiết kiệm chi phí và tránh lãng phí hóa chất.

## Bài tập áp dụng nhanh
1. Đốt cháy hoàn toàn 4,8 gam magnesium (Mg, M = 24 g/mol) trong khí oxygen dư. Tính khối lượng MgO tạo thành.
2. Cho 100 mL dung dịch HCl 1M tác dụng vừa đủ với CaCO3. Tính khối lượng CaCO3 đã phản ứng.
3. Nung 10 gam CaCO3, thu được 5,04 gam CaO. Tính hiệu suất phản ứng.`,
  },
  {
    id: "cmrel0o1p000bvhd8pxghibef", // Bài 7. Tốc độ phản ứng và chất xúc tác
    insertions: [],
    append: `## Ứng dụng thực tế
![Bu lông bằng sắt bị gỉ (ăn mòn) sau thời gian dài tiếp xúc với không khí ẩm](https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Corroded_Bolt.jpg/960px-Corroded_Bolt.jpg)

- Phản ứng đốt cháy (cồn, gas, xăng) xảy ra rất nhanh, tỏa nhiệt và phát sáng ngay lập tức; trong khi phản ứng sắt bị gỉ (ăn mòn kim loại) xảy ra rất chậm, phải sau thời gian dài mới quan sát được.
- Bảo quản thực phẩm trong tủ lạnh (giảm nhiệt độ) hoặc đóng gói hút chân không (giảm nồng độ oxygen tiếp xúc) đều là cách làm chậm tốc độ phản ứng gây hư hỏng thực phẩm.

## Bài tập áp dụng nhanh
1. Vì sao khi nhóm bếp than, người ta thường đập nhỏ than tổ ong thay vì để nguyên cục?
2. Enzyme trong nước bọt và dịch tiêu hóa có vai trò gì đối với tốc độ phản ứng chuyển hóa thức ăn trong cơ thể?
3. Kể tên 2 cách làm chậm tốc độ phản ứng oxi hóa (ôi thiu) của thực phẩm trong đời sống hàng ngày.`,
  },
];

async function main() {
  for (const patch of PATCHES) {
    const doc = await prisma.document.findUnique({ where: { id: patch.id } });
    if (!doc) throw new Error("Không tìm thấy document " + patch.id);
    let content = doc.content;
    let changed = false;

    for (const ins of patch.insertions) {
      if (content.includes(ins.text.trim().split("\n")[0])) continue; // đã có
      const idx = content.indexOf(ins.marker);
      if (idx === -1) {
        console.log(`Cảnh báo: không tìm thấy marker "${ins.marker}" trong "${doc.title}"`);
        continue;
      }
      content = content.slice(0, idx) + ins.text + content.slice(idx);
      changed = true;
    }

    if (!content.includes("## Bài tập áp dụng nhanh")) {
      content = content.trimEnd() + "\n\n" + patch.append;
      changed = true;
    }

    if (!changed) {
      console.log(`Bỏ qua "${doc.title}": đã đủ.`);
      continue;
    }
    await prisma.document.update({ where: { id: patch.id }, data: { content } });
    console.log(`Đã cập nhật "${doc.title}" —`, content.length, "ký tự (trước:", doc.content.length, "ký tự).");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
