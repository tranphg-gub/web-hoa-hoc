import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AH: tiếp tục bổ sung ảnh minh họa Wikimedia Commons (đã curl -I xác nhận HTTP 200 +
// content-type đúng trước khi dùng) cho 8 bài học nữa, tiếp nối MR-R/MR-V/MR-AE.
const INSERTIONS = [
  {
    id: "cmrelkksm001dvhusou63z41d", // Lớp 12 - Bài 22. Sự ăn mòn kim loại
    marker: "## Khái niệm",
    imgLine:
      "![Bề mặt sắt bị gỉ sét màu nâu đỏ đặc trưng do quá trình ăn mòn khi tiếp xúc với hơi ẩm và oxygen trong không khí](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Rust_on_iron.jpg/960px-Rust_on_iron.jpg)",
  },
  {
    id: "cmrelkksm001cvhuseidgcyg6", // Lớp 12 - Bài 21. Hợp kim
    marker: "## Khái niệm",
    imgLine:
      "![Sơ đồ mạng tinh thể hợp kim thay thế (substitutional alloy): nguyên tử của kim loại thứ hai thay thế một số vị trí nguyên tử kim loại gốc trong mạng tinh thể](https://upload.wikimedia.org/wikipedia/commons/3/36/Alloy_Substitutional.svg)",
  },
  {
    id: "cmrel87nl000evhnok4nzlaxu", // Lớp 10 - Bài 10. Quy tắc octet
    marker: "## Ví dụ minh họa",
    imgLine:
      "![Sơ đồ Lewis mô tả quá trình hình thành liên kết ion NaCl: nguyên tử Na nhường 1 electron cho nguyên tử Cl, cả hai đạt cấu hình bền 8 electron lớp ngoài cùng](https://upload.wikimedia.org/wikipedia/commons/d/da/NaCl_Formation_Lewis.svg)",
  },
  {
    id: "cmrf58j2p002lvhtgaor1mia9", // Lớp 7 - Bài 9. Nguyên tố hóa học, đồng vị, nguyên tử khối trung bình
    marker: "## Đồng vị",
    imgLine:
      "![Sơ đồ so sánh hạt nhân 3 đồng vị của hydrogen: protium (1 proton), deuterium (1 proton + 1 neutron), tritium (1 proton + 2 neutron)](https://upload.wikimedia.org/wikipedia/commons/6/66/Hydrogen_Deuterium_Tritium_Nuclei_Schmatic-en.svg)",
  },
  {
    id: "cmrf58hbb001tvhtg0536ei1v", // Lớp 6 - Bài 6. Chất tinh khiết và hỗn hợp
    marker: "## Hỗn hợp",
    imgLine:
      "![Mẫu đá granite: một hỗn hợp tự nhiên gồm nhiều khoáng vật (thạch anh, fenspat, mica) với màu sắc khác nhau xen lẫn, có thể phân biệt bằng mắt thường](https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Granite.jpg/960px-Granite.jpg)",
  },
  {
    id: "cmrelkhrj000svhuslofpiao6", // Lớp 11 - Bài 19. Dẫn xuất halogen
    marker: "## Ứng dụng và lưu ý",
    imgLine:
      "![Ảnh vệ tinh NASA thể hiện lỗ thủng tầng ozone ở Nam Cực (vùng màu xanh/tím là nơi nồng độ ozone thấp) — hậu quả của các chất CFC (chlorofluorocarbon) từng dùng phổ biến làm chất làm lạnh](https://upload.wikimedia.org/wikipedia/commons/a/a1/Ozon_hole_AntOzone.jpg)",
  },
  {
    id: "cmrelkjxx0015vhusrhsg9yds", // Lớp 12 - Bài 12. Đại cương về polymer
    marker: "## Cấu trúc mạch",
    imgLine:
      "![Công thức cấu tạo polyethylene (PE): mắt xích -CH2-CH2- lặp lại n lần, minh họa cấu trúc chuỗi polymer hình thành từ monomer ethylene](https://upload.wikimedia.org/wikipedia/commons/5/59/Chemical_structural_formula_of_polyethylene.svg)",
  },
  {
    id: "cmrelkksm0019vhus6rjw01dr", // Lớp 12 - Bài 18. Cấu tạo và liên kết trong tinh thể kim loại
    marker: "## Cấu tạo tinh thể kim loại",
    imgLine:
      "![Sơ đồ liên kết kim loại: mạng lưới các ion dương kim loại (cation) được bao quanh bởi \"biển electron\" tự do di chuyển (mô hình electron sea)](https://upload.wikimedia.org/wikipedia/commons/8/85/Metallic_bonding.svg)",
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
