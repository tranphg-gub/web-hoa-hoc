import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-X: bổ sung các mục còn thiếu theo khung mục cố định mới (skill chem-theory) cho
// Bài 9 (Base) và Bài 10 (Oxide) Lớp 8 — Trạng thái tự nhiên/nguồn gốc, thêm phản ứng
// còn thiếu trong Tính chất hóa học, Điều chế, Bài tập áp dụng nhanh. Tham khảo file
// "Ôn tập kiến thức cấp 2(2).docx" (mục II. Oxide, IV. Base).

async function patchBase() {
  const DOC_ID = "cmrel0o1p000dvhd8muvlb80b"; // Bài 9. Base - Thang pH
  const doc = await prisma.document.findUnique({ where: { id: DOC_ID } });
  if (!doc) throw new Error("Không tìm thấy Bài 9");
  let content = doc.content;
  let changed = false;

  if (!content.includes("## Trạng thái tự nhiên")) {
    const marker = "## Tính chất hóa học";
    const idx = content.indexOf(marker);
    const insertion = `## Trạng thái tự nhiên
- Base hầu như không tồn tại sẵn ở dạng tinh khiết trong tự nhiên (khác với acid/muối) mà chủ yếu được điều chế/sản xuất.
- Calcium hydroxide (Ca(OH)2, vôi tôi) có nguồn gốc từ đá vôi (CaCO3) tự nhiên qua quá trình nung vôi.
- Magnesium hydroxide (Mg(OH)2) là thành phần chính trong một số thuốc kháng acid dạ dày (sữa magnesia).

`;
    content = content.slice(0, idx) + insertion + content.slice(idx);
    changed = true;
  }

  if (!content.includes("tác dụng với oxide acid")) {
    const marker = "- Base không tan bị nhiệt phân";
    const idx = content.indexOf(marker);
    const insertion = `- Tác dụng với oxide acid tạo thành muối và nước: Ca(OH)2 + CO2 -> CaCO3 + H2O (phản ứng này dùng để nhận biết khí CO2 — làm đục nước vôi trong).
- Tác dụng với dung dịch muối tạo muối mới và base mới (điều kiện: 2 chất tham gia tan, sản phẩm có chất không tan): 2NaOH + CuCl2 -> 2NaCl + Cu(OH)2
`;
    content = content.slice(0, idx) + insertion + content.slice(idx);
    changed = true;
  }

  if (!content.includes("## Điều chế")) {
    const marker = "## Thang pH";
    const idx = content.indexOf(marker);
    const insertion = `## Điều chế
- Base tan (kiềm) như NaOH được sản xuất trong công nghiệp bằng phương pháp điện phân dung dịch sodium chloride bão hòa có màng ngăn.
- Base không tan được điều chế bằng phản ứng giữa dung dịch muối tương ứng với dung dịch kiềm: CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4

`;
    content = content.slice(0, idx) + insertion + content.slice(idx);
    changed = true;
  }

  if (!content.includes("## Bài tập áp dụng nhanh")) {
    content =
      content.trimEnd() +
      `

## Bài tập áp dụng nhanh
1. Vì sao dẫn khí CO2 vào dung dịch nước vôi trong (Ca(OH)2) lại thấy xuất hiện vẩn đục?
2. Base nào sau đây làm quỳ tím chuyển xanh: NaOH, Cu(OH)2, Fe(OH)3, KOH? Giải thích.
3. Viết phương trình hoá học điều chế Cu(OH)2 từ dung dịch CuSO4 và dung dịch NaOH.`;
    changed = true;
  }

  if (!changed) {
    console.log("Bài 9: bỏ qua, đã đủ.");
    return;
  }
  await prisma.document.update({ where: { id: DOC_ID }, data: { content } });
  console.log(`Đã cập nhật "${doc.title}" —`, content.length, "ký tự (trước:", doc.content.length, "ký tự).");
}

async function patchOxide() {
  const DOC_ID = "cmrel0o1p000evhd849xgytgg"; // Bài 10. Oxide
  const doc = await prisma.document.findUnique({ where: { id: DOC_ID } });
  if (!doc) throw new Error("Không tìm thấy Bài 10");
  let content = doc.content;
  let changed = false;

  if (!content.includes("## Trạng thái tự nhiên")) {
    const marker = "## Tính chất hóa học";
    const idx = content.indexOf(marker);
    const insertion = `## Trạng thái tự nhiên
- Carbon dioxide (CO2) có trong khí quyển (khoảng 0,04%), sinh ra từ hô hấp, đốt cháy nhiên liệu; được cây xanh hấp thụ trong quang hợp.
- Iron(III) oxide (Fe2O3) là thành phần chính của quặng hematite và của gỉ sắt.
- Aluminium oxide (Al2O3) là thành phần chính của quặng bauxite, nguyên liệu sản xuất nhôm.

`;
    content = content.slice(0, idx) + insertion + content.slice(idx);
    changed = true;
  }

  if (!content.includes("lưỡng tính")) {
    const marker = "## Ví dụ minh họa";
    const idx = content.indexOf(marker);
    const insertion = `- Oxide base tác dụng với oxide acid tạo thành muối: CaO + CO2 -> CaCO3
- Oxide lưỡng tính (Al2O3, ZnO) tác dụng được với CẢ dung dịch acid và dung dịch base: Al2O3 + 6HCl -> 2AlCl3 + 3H2O; Al2O3 + 2NaOH -> 2NaAlO2 + H2O

## Điều chế
- Nhiều oxide base được điều chế bằng cách đốt cháy kim loại trong oxygen, hoặc nhiệt phân muối carbonate/hydroxide tương ứng: CaCO3 -> CaO + CO2 (nung vôi).
- Nhiều oxide acid được điều chế bằng cách đốt cháy phi kim trong oxygen: S + O2 -> SO2.

`;
    content = content.slice(0, idx) + insertion + content.slice(idx);
    changed = true;
  }

  if (!content.includes("## Bài tập áp dụng nhanh")) {
    content =
      content.trimEnd() +
      `

## Bài tập áp dụng nhanh
1. Oxide nào sau đây tác dụng được với cả dung dịch HCl và dung dịch NaOH: CaO, Al2O3, CO2, SO2? Giải thích.
2. Viết phương trình hoá học của phản ứng giữa CO2 và dung dịch Ca(OH)2 dư.
3. Đốt cháy hoàn toàn 3,2 gam sulfur (S, M = 32 g/mol) trong khí oxygen dư. Tính thể tích khí SO2 sinh ra ở đkc.`;
    changed = true;
  }

  if (!changed) {
    console.log("Bài 10: bỏ qua, đã đủ.");
    return;
  }
  await prisma.document.update({ where: { id: DOC_ID }, data: { content } });
  console.log(`Đã cập nhật "${doc.title}" —`, content.length, "ký tự (trước:", doc.content.length, "ký tự).");
}

async function main() {
  await patchBase();
  await patchOxide();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
