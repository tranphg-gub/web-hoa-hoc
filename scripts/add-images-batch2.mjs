import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AE: mở rộng ảnh minh họa sang các lớp còn thiếu. Với các bài có cùng khái niệm hóa
// học đã minh họa ở lớp khác (nguyên tử, bảng tuần hoàn, liên kết ion, liên kết cộng hóa
// trị), tái sử dụng luôn URL đã xác minh trước đó (cùng 1 khái niệm thật, không cần tìm/
// xác minh lại) — tiết kiệm thời gian so với tìm ảnh mới cho từng bài.
const INSERTIONS = [
  {
    id: "cmrel86s10007vhnozlln42uu", // Lớp 10 - Bài 1. Thành phần của nguyên tử
    marker: "## Kích thước và khối lượng nguyên tử",
    imgLine:
      "![Mô hình cấu tạo nguyên tử theo Rutherford - Bohr: hạt nhân ở giữa, electron chuyển động thành lớp xung quanh](https://upload.wikimedia.org/wikipedia/commons/8/80/Atom_Diagram.svg)",
  },
  {
    id: "cmrel877q000avhnobz0ek2ts", // Lớp 10 - Bài 5. Cấu tạo của bảng tuần hoàn
    marker: "## Ví dụ minh họa",
    imgLine:
      "![Bảng tuần hoàn các nguyên tố hóa học dạng đơn giản](https://upload.wikimedia.org/wikipedia/commons/2/2e/Simple_Periodic_Table_Chart-en.svg)",
  },
  {
    id: "cmrel87nl000fvhno453c51hs", // Lớp 10 - Bài 11. Liên kết ion
    marker: "## Tính chất của hợp chất ion",
    imgLine:
      "![Sơ đồ hình thành liên kết ion trong NaCl: nguyên tử Na nhường 1 electron cho nguyên tử Cl](https://upload.wikimedia.org/wikipedia/commons/d/da/NaCl_Formation_Lewis.svg)",
  },
  {
    id: "cmrel87nl000gvhnosstx6sbx", // Lớp 10 - Bài 12. Liên kết cộng hóa trị
    marker: "## Ví dụ minh họa",
    imgLine:
      "![Mô hình phân tử nước H2O dạng đặc (space-filling), minh họa 2 liên kết cộng hóa trị O-H](https://upload.wikimedia.org/wikipedia/commons/1/1c/Water_molecule_3D.svg)",
  },
];

async function main() {
  for (const { id, marker, imgLine } of INSERTIONS) {
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) {
      console.log("Bỏ qua: không tìm thấy document", id);
      continue;
    }
    if (doc.content.includes(imgLine)) {
      console.log(`Bỏ qua "${doc.title}": ảnh đã có sẵn.`);
      continue;
    }
    const idx = doc.content.indexOf(marker);
    let newContent;
    if (idx === -1) {
      console.log(`Cảnh báo "${doc.title}": không tìm thấy marker "${marker}", nối vào cuối.`);
      newContent = doc.content.trimEnd() + "\n\n" + imgLine;
    } else {
      newContent = doc.content.slice(0, idx) + imgLine + "\n\n" + doc.content.slice(idx);
    }
    await prisma.document.update({ where: { id }, data: { content: newContent } });
    console.log(`Đã thêm ảnh vào "${doc.title}"`);
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
