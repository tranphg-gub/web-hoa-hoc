import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-X: bổ sung 2 mục còn thiếu theo khung mục cố định mới (skill chem-theory) mà bản
// upgrade-lop8-bai11-muoi.mjs trước đó chưa có: "Trạng thái tự nhiên" (đứng ngay sau Khái
// niệm) và "Bị nhiệt phân" (phần tính chất hóa học hay bị bỏ sót nhất, theo file "Ôn tập
// kiến thức cấp 2(2).docx" mục V.5).
const DOC_ID = "cmrel0o1p000fvhd8gapzh2tn"; // Lớp 8 - Bài 11. Muối

const TRANG_THAI_TU_NHIEN = `## Trạng thái tự nhiên
- Sodium chloride (NaCl, muối ăn) có nhiều trong nước biển, mỏ muối.
- Calcium carbonate (CaCO3) có trong đá vôi, đá phấn, đá hoa cương, vỏ trứng, vỏ sò, san hô.
- Nhiều muối khoáng khác tồn tại trong lòng đất dưới dạng quặng (potassium chloride, calcium sulfate...).`;

const NHIET_PHAN = `- Bị nhiệt phân: nhiều muối bị phân hủy khi nung nóng.
CaCO3 -> CaO + CO2
2NaHCO3 -> Na2CO3 + CO2 + H2O
(phản ứng nhiệt phân NaHCO3 giải thích vì sao dùng baking soda làm bột nở: khí CO2 sinh ra khi nướng làm bánh nở xốp)`;

async function main() {
  const doc = await prisma.document.findUnique({ where: { id: DOC_ID } });
  if (!doc) throw new Error("Không tìm thấy document " + DOC_ID);

  let content = doc.content;
  let changed = false;

  if (!content.includes("## Trạng thái tự nhiên")) {
    const marker = "## Tên gọi các gốc acid thường gặp";
    const idx = content.indexOf(marker);
    if (idx === -1) throw new Error("Không tìm thấy marker chèn Trạng thái tự nhiên");
    content = content.slice(0, idx) + TRANG_THAI_TU_NHIEN + "\n\n" + content.slice(idx);
    changed = true;
  }

  if (!content.includes("Bị nhiệt phân")) {
    const marker = "## Ứng dụng nhận biết ion sulfate";
    const idx = content.indexOf(marker);
    if (idx === -1) throw new Error("Không tìm thấy marker chèn Bị nhiệt phân");
    content = content.slice(0, idx) + NHIET_PHAN + "\n\n" + content.slice(idx);
    changed = true;
  }

  if (!changed) {
    console.log("Bỏ qua: đã có đủ 2 mục từ trước.");
    return;
  }

  await prisma.document.update({ where: { id: DOC_ID }, data: { content } });
  console.log(`Đã bổ sung mục còn thiếu vào "${doc.title}" —`, content.length, "ký tự (trước:", doc.content.length, "ký tự).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
