import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-V: mở rộng thêm ảnh minh họa (Wikimedia Commons, đã curl -I xác nhận content-type
// image/svg+xml trước khi dùng) cho 5 bài học nữa, tiếp nối MR-R (5 bài đầu tiên).
const INSERTIONS = [
  {
    id: "cmrf58dsb0009vhtgogzkbgy9", // Lớp 6 - Bài 3. Oxygen và không khí
    marker: "## Vai trò của không khí",
    imgLine:
      "![Biểu đồ thành phần các khí trong không khí: khoảng 78% nitrogen, 21% oxygen, còn lại là các khí khác](https://upload.wikimedia.org/wikipedia/commons/2/26/Composition_of_Earth%27s_atmosphere_en.svg)",
  },
  {
    id: "cmrf58mnv0044vhtg3bx74i1p", // Lớp 7 - Bài 12. Giới thiệu về liên kết hóa học
    marker: "## Liên kết cộng hóa trị",
    imgLine:
      "![Sơ đồ hình thành liên kết ion trong NaCl: nguyên tử Na nhường 1 electron cho nguyên tử Cl](https://upload.wikimedia.org/wikipedia/commons/d/da/NaCl_Formation_Lewis.svg)",
  },
  {
    id: "cmrf58mnv0043vhtgyok76b2l", // Lớp 7 - Bài 11. Phân tử, đơn chất, hợp chất
    marker: "## Đơn chất",
    imgLine:
      "![Mô hình phân tử nước H2O dạng đặc (space-filling)](https://upload.wikimedia.org/wikipedia/commons/1/1c/Water_molecule_3D.svg)",
  },
  {
    id: "cmrel86s10009vhno7ye5tc5t", // Lớp 10 - Bài 3. Cấu trúc lớp vỏ electron nguyên tử
    marker: "## Cấu hình electron",
    imgLine:
      "![Hình dạng đám mây electron của phân lớp s (hình cầu) và p (hình số 8 nổi)](https://upload.wikimedia.org/wikipedia/commons/0/0f/S-p-Orbitals.svg)",
  },
  {
    id: "cmrelkkd90017vhuswrby0moo", // Lớp 12 - Bài 15. Thế điện cực và nguồn điện hóa học
    marker: null, // thêm vào cuối
    imgLine:
      "![Sơ đồ pin điện hóa Zn-Cu: 2 điện cực, dung dịch chất điện li và cầu muối](https://upload.wikimedia.org/wikipedia/commons/8/8e/Galvanic_Cell.svg)",
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
    let newContent;
    if (marker) {
      const idx = doc.content.indexOf(marker);
      if (idx === -1) {
        console.log(`Bỏ qua "${doc.title}": không tìm thấy marker "${marker}".`);
        continue;
      }
      newContent = doc.content.slice(0, idx) + imgLine + "\n\n" + doc.content.slice(idx);
    } else {
      newContent = doc.content.trimEnd() + "\n\n" + imgLine;
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
