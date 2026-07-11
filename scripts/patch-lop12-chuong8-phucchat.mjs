import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PATCHES = [
  {
    id: "cmrelkln5001gvhusjldrb5pq", // Bài 27. Đại cương về kim loại chuyển tiếp dãy thứ nhất
    append: `## Ứng dụng thực tế
Iron (Fe) là kim loại chuyển tiếp được sử dụng nhiều nhất (thép xây dựng, chế tạo máy); copper (Cu) dùng làm dây điện, ống dẫn nhiệt; zinc (Zn) dùng mạ chống gỉ cho thép (tôn mạ kẽm), làm vật hi sinh bảo vệ điện hóa.

## Bài tập áp dụng nhanh
1. Vì sao hợp chất của kim loại chuyển tiếp thường có màu sắc, trong khi hợp chất của kim loại nhóm A (như Na, Ca) hầu hết không màu?
2. Kể tên 3 kim loại chuyển tiếp dãy thứ nhất và 1 ứng dụng của mỗi kim loại.
3. Vì sao kim loại chuyển tiếp thường có nhiều số oxi hóa khác nhau?`,
  },
  {
    id: "cmrelkln5001hvhusn6gyue1t", // Bài 28. Sơ lược về phức chất
    append: `## Bài tập áp dụng nhanh
1. Phức chất [Cu(NH3)4]^2+ có nguyên tử trung tâm và phối tử nào? Số phối trí là bao nhiêu?
2. Vì sao phức chất được tạo thành nhờ liên kết cho - nhận chứ không phải liên kết ion hay cộng hóa trị thông thường?
3. Nêu 1 ví dụ về phức chất thường gặp trong phòng thí nghiệm hoặc đời sống.`,
  },
  {
    id: "cmrelkln5001ivhuskymmhgtv", // Bài 29. Một số tính chất và ứng dụng của phức chất
    append: `## Bài tập áp dụng nhanh
1. Nêu 1 phản ứng tạo phức dùng để nhận biết ion kim loại trong phòng thí nghiệm.
2. Vì sao hemoglobin (chứa phức chất của iron) có vai trò quan trọng trong việc vận chuyển oxygen của cơ thể?
3. Kể tên 1 ứng dụng của phức chất trong y học.`,
  },
];

async function main() {
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
