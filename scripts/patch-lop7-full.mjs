import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AC: nâng cấp Lớp 7 (6 bài, 4 chương) — thêm Bài tập áp dụng nhanh (chưa bài nào có).
// Nội dung lý thuyết đã khá đầy đủ từ MR-O (950-1960 ký tự/bài).

const PATCHES = [
  {
    id: "cmrf58j2p002kvhtg4wiei2ex", // Bài 8. Nguyên tử
    append: `## Bài tập áp dụng nhanh
1. Nguyên tử gồm những loại hạt nào? Hạt nào mang điện dương, hạt nào mang điện âm?
2. Vì sao nguyên tử trung hòa về điện?
3. Nguyên tử carbon có 6 proton. Nguyên tử này có bao nhiêu electron?`,
  },
  {
    id: "cmrf58j2p002lvhtgaor1mia9", // Bài 9. Nguyên tố hóa học, đồng vị, nguyên tử khối trung bình
    append: `## Bài tập áp dụng nhanh
1. Nguyên tố hóa học là gì?
2. Các đồng vị của cùng 1 nguyên tố giống và khác nhau ở điểm nào?
3. Vì sao nguyên tử khối trung bình của 1 nguyên tố thường không phải là số nguyên?`,
  },
  {
    id: "cmrf58kwk003dvhtgoduw70hs", // Bài 10. Sơ lược về bảng tuần hoàn các nguyên tố hóa học
    append: `## Bài tập áp dụng nhanh
1. Bảng tuần hoàn sắp xếp các nguyên tố theo nguyên tắc nào?
2. Ô nguyên tố cho biết những thông tin gì?
3. Nêu tên 2 nguyên tố cùng thuộc 1 nhóm trong bảng tuần hoàn.`,
  },
  {
    id: "cmrf58mnv0043vhtgyok76b2l", // Bài 11. Phân tử, đơn chất, hợp chất
    append: `## Bài tập áp dụng nhanh
1. Phân biệt đơn chất và hợp chất bằng 1 ví dụ cho mỗi loại.
2. Khí oxygen (O2) là đơn chất hay hợp chất?
3. Nước (H2O) là đơn chất hay hợp chất? Giải thích.`,
  },
  {
    id: "cmrf58mnv0044vhtg3bx74i1p", // Bài 12. Giới thiệu về liên kết hóa học
    append: `## Bài tập áp dụng nhanh
1. Liên kết ion và liên kết cộng hóa trị khác nhau cơ bản ở điểm nào?
2. Muối ăn (NaCl) được hình thành nhờ loại liên kết nào?
3. Phân tử nước (H2O) được hình thành nhờ loại liên kết nào?`,
  },
  {
    id: "cmrf58of9004wvhtgt4sakaet", // Bài 13. Hóa trị và công thức hóa học
    append: `## Bài tập áp dụng nhanh
1. Lập công thức hóa học của hợp chất tạo bởi Al (hóa trị III) và O (hóa trị II).
2. Tính phân tử khối của CaCO3 (biết Ca = 40, C = 12, O = 16).
3. Hóa trị của một nguyên tố là gì?`,
  },
];

async function main() {
  let updated = 0;
  for (const patch of PATCHES) {
    const doc = await prisma.document.findUnique({ where: { id: patch.id } });
    if (!doc) throw new Error("Không tìm thấy document " + patch.id);
    if (doc.content.includes("## Bài tập áp dụng nhanh")) {
      console.log(`Bỏ qua "${doc.title}": đã đủ.`);
      continue;
    }
    const content = doc.content.trimEnd() + "\n\n" + patch.append;
    await prisma.document.update({ where: { id: patch.id }, data: { content } });
    console.log(`Đã cập nhật "${doc.title}" —`, content.length, "ký tự (trước:", doc.content.length, "ký tự).");
    updated++;
  }
  console.log(`\nHoàn tất: cập nhật ${updated}/${PATCHES.length} bài.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
