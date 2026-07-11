import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AC: nâng cấp Lớp 6 (7 bài, 3 chương) — thêm Bài tập áp dụng nhanh (chưa bài nào có).
// Nội dung lý thuyết đã khá đầy đủ từ MR-O (1000-1700 ký tự/bài).

const PATCHES = [
  {
    id: "cmrf58dsb0007vhtgqqc4ecly", // Bài 1. Sự đa dạng của chất
    append: `## Bài tập áp dụng nhanh
1. Kể tên 3 chất mà em thường gặp trong đời sống hàng ngày.
2. Nước, muối ăn, đường là chất hay là vật thể?
3. Nêu 1 ví dụ về vật thể tự nhiên và 1 ví dụ về vật thể nhân tạo.`,
  },
  {
    id: "cmrf58dsb0008vhtgl6ndsveu", // Bài 2. Các thể của chất và sự chuyển thể
    append: `## Bài tập áp dụng nhanh
1. Nước đá, nước lỏng, hơi nước lần lượt ở thể nào?
2. Quá trình nước đá tan thành nước lỏng gọi là quá trình gì?
3. Kể tên 1 chất ở thể rắn, 1 chất ở thể lỏng và 1 chất ở thể khí tại điều kiện thường.`,
  },
  {
    id: "cmrf58dsb0009vhtgogzkbgy9", // Bài 3. Oxygen và không khí
    append: `## Bài tập áp dụng nhanh
1. Oxygen chiếm khoảng bao nhiêu phần trăm thể tích không khí?
2. Vì sao khi đốt cháy, cần có đủ oxygen để phản ứng cháy xảy ra hoàn toàn?
3. Nêu 1 biện pháp bảo vệ không khí trong lành mà em có thể thực hiện.`,
  },
  {
    id: "cmrf58fk00011vhtgzrnb0nkw", // Bài 4. Vật liệu, nhiên liệu, nguyên liệu
    append: `## Bài tập áp dụng nhanh
1. Phân biệt vật liệu, nhiên liệu và nguyên liệu bằng 1 ví dụ cho mỗi loại.
2. Vì sao cần sử dụng nhiên liệu tiết kiệm và hiệu quả?
3. Kể tên 1 vật liệu có thể tái chế được.`,
  },
  {
    id: "cmrf58fk00012vhtgbry6z93a", // Bài 5. Một số lương thực, thực phẩm
    append: `## Bài tập áp dụng nhanh
1. Kể tên 2 loại lương thực và 2 loại thực phẩm thường gặp.
2. Vì sao cần bảo quản lương thực, thực phẩm đúng cách?
3. Nêu 1 dấu hiệu cho thấy thực phẩm đã bị hỏng, không nên sử dụng.`,
  },
  {
    id: "cmrf58hbb001tvhtg0536ei1v", // Bài 6. Chất tinh khiết và hỗn hợp
    append: `## Bài tập áp dụng nhanh
1. Nước cất và nước muối, chất nào là chất tinh khiết, chất nào là hỗn hợp?
2. Không khí là chất tinh khiết hay hỗn hợp? Giải thích.
3. Kể tên 1 hỗn hợp đồng nhất và 1 hỗn hợp không đồng nhất thường gặp trong đời sống.`,
  },
  {
    id: "cmrf58hbb001uvhtgr6mugfal", // Bài 7. Tách chất khỏi hỗn hợp
    append: `## Bài tập áp dụng nhanh
1. Muốn tách cát ra khỏi hỗn hợp cát và nước, nên dùng phương pháp nào?
2. Muốn tách muối ăn ra khỏi dung dịch nước muối, nên dùng phương pháp nào?
3. Kể tên 1 phương pháp tách chất mà em đã từng thấy hoặc thực hiện trong đời sống.`,
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
