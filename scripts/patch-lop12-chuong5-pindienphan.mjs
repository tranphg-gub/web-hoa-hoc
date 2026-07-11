import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PATCHES = [
  {
    id: "cmrelkkd90017vhuswrby0moo", // Bài 15. Thế điện cực và nguồn điện hóa học
    insertions: [],
    append: `## Ứng dụng thực tế
Pin điện hóa là nguyên lí hoạt động của pin và ắc quy dùng trong đời sống: pin tiểu (AA, AAA) dùng cho đồ chơi, đèn pin, remote; pin lithium-ion dùng cho điện thoại, laptop; ắc quy chì-acid dùng khởi động động cơ ô tô, xe máy.

## Bài tập áp dụng nhanh
1. Biết E°(Ag+/Ag) = +0,80 V và E°(Zn2+/Zn) = -0,76 V. Tính suất điện động chuẩn của pin Zn-Ag.
2. Trong pin điện hóa Zn-Cu, điện cực nào là cực âm (anode), điện cực nào là cực dương (cathode)?
3. Vì sao giá trị E° của pin điện hóa luôn dương?`,
  },
  {
    id: "cmrelkkd90018vhusaidtrmnr", // Bài 16. Điện phân
    insertions: [
      {
        marker: "## Ví dụ minh họa",
        text: `## Ứng dụng thực tế
- Điện phân nóng chảy Al2O3 (hòa tan trong cryolite nóng chảy) là phương pháp sản xuất nhôm trong công nghiệp.
- Điện phân dung dịch NaCl bão hòa (có màng ngăn) là phương pháp sản xuất NaOH, khí Cl2 và H2 trong công nghiệp.
- Mạ điện (mạ vàng, mạ bạc, mạ chrome lên bề mặt kim loại khác) dùng nguyên lí điện phân để tạo lớp phủ kim loại mỏng, chống gỉ và tăng tính thẩm mỹ.

`,
      },
    ],
    append: `## Bài tập áp dụng nhanh
1. Viết quá trình xảy ra tại cathode và anode khi điện phân dung dịch NaCl có màng ngăn.
2. Điện phân nóng chảy Al2O3 dùng để sản xuất kim loại nào? Vì sao không dùng điện phân dung dịch để sản xuất kim loại này?
3. Điện phân dung dịch AgNO3 với cường độ dòng điện I = 2A trong 965 giây. Tính khối lượng Ag bám vào cathode.`,
  },
];

async function main() {
  for (const patch of PATCHES) {
    const doc = await prisma.document.findUnique({ where: { id: patch.id } });
    if (!doc) throw new Error("Không tìm thấy document " + patch.id);
    let content = doc.content;
    let changed = false;

    for (const ins of patch.insertions) {
      if (content.includes(ins.text.trim().split("\n")[0])) continue;
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
