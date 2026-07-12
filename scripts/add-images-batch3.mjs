import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AE (tiếp): 3 ảnh mới xác minh qua WebSearch + WebFetch + curl -I (đều public domain).
const INSERTIONS = [
  {
    id: "cmrel0ost000mvhd8g0knercu", // Lớp 9 - Bài 23. Alkane
    marker: "## Ứng dụng",
    imgLine:
      "![Mô hình phân tử methane (CH4) dạng đặc (space-filling): 1 nguyên tử carbon liên kết với 4 nguyên tử hydrogen](https://upload.wikimedia.org/wikipedia/commons/4/4b/Methane-3D-space-filling.svg)",
  },
  {
    id: "cmrel0ost000nvhd8qknt4dmu", // Lớp 9 - Bài 24. Alkene
    marker: "## Ứng dụng",
    imgLine:
      "![Công thức cấu tạo ethylene (C2H4): 2 nguyên tử carbon liên kết đôi, mỗi carbon liên kết thêm 2 nguyên tử hydrogen](https://upload.wikimedia.org/wikipedia/commons/e/e9/Ethene_structural.svg)",
  },
  {
    id: "cmrel0o1p000evhd849xgytgg", // Lớp 8 - Bài 10. Oxide
    marker: "## Ứng dụng thực tế",
    imgLine:
      "![Mẫu iron(III) oxide (Fe2O3) - thành phần chính của gỉ sắt và quặng hematite](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Iron%28III%29-oxide-sample.jpg/960px-Iron%28III%29-oxide-sample.jpg)",
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
