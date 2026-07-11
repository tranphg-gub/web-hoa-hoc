import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PATCHES = [
  {
    id: "cmrelkksm0019vhus6rjw01dr", // Bài 18. Cấu tạo và liên kết trong tinh thể kim loại
    append: `## Ứng dụng thực tế
Hiểu cấu tạo tinh thể kim loại giúp giải thích vì sao vàng, bạc dễ dát mỏng kéo sợi để làm trang sức, dây dẫn điện thường làm bằng đồng hoặc nhôm (dẫn điện tốt, giá thành hợp lý).

## Bài tập áp dụng nhanh
1. Vì sao kim loại có tính dẻo, dễ dát mỏng, kéo sợi?
2. Vì sao kim loại dẫn điện, dẫn nhiệt tốt?
3. Kể tên 2 kiểu mạng tinh thể kim loại thường gặp.`,
  },
  {
    id: "cmrelkksm001avhusfi9ol9u9", // Bài 19. Tính chất vật lí và tính chất hóa học của kim loại
    append: `## Ứng dụng thực tế
Tính khử của kim loại được ứng dụng trong nhiều phản ứng thực tế: kim loại kiềm/kiềm thổ dùng làm chất khử trong một số quá trình luyện kim; phản ứng kim loại với acid được dùng để tẩy gỉ (rửa bề mặt kim loại trước khi sơn, mạ).

## Bài tập áp dụng nhanh
1. Vì sao tính chất hóa học chung của kim loại là tính khử?
2. Kim loại nào sau đây phản ứng được với dung dịch CuSO4: Fe, Ag, Au? Viết phương trình hoá học.
3. Cho 5,4 gam Al tác dụng hết với dung dịch H2SO4 loãng, dư. Tính thể tích khí H2 thoát ra ở đkc.`,
  },
  {
    id: "cmrelkksm001bvhusjn0p42xb", // Bài 20. Kim loại trong tự nhiên và phương pháp tách kim loại
    append: `## Ứng dụng thực tế
Việc lựa chọn đúng phương pháp tách kim loại giúp tiết kiệm chi phí sản xuất: nhôm được sản xuất bằng điện phân nóng chảy quặng bauxite (Al2O3) — đây là lý do nhôm có giá thành cao hơn sắt dù trữ lượng trong vỏ Trái Đất nhiều hơn (do tốn nhiều điện năng để điện phân).

## Bài tập áp dụng nhanh
1. Vì sao vàng, bạc thường tồn tại ở dạng đơn chất trong tự nhiên còn sắt, nhôm lại tồn tại chủ yếu ở dạng hợp chất?
2. Phương pháp nào dùng để điều chế kim loại Na? Vì sao không dùng phương pháp nhiệt luyện cho kim loại này?
3. Khử hoàn toàn 24 gam Fe2O3 bằng khí CO dư. Tính khối lượng Fe thu được.`,
  },
  {
    id: "cmrelkksm001cvhuseidgcyg6", // Bài 21. Hợp kim
    append: `## Ứng dụng thực tế
Thép (hợp kim Fe-C) là vật liệu xây dựng, chế tạo máy móc phổ biến nhất; thép không gỉ (thêm Cr, Ni) dùng làm dao kéo, dụng cụ y tế, đồ gia dụng nhờ khả năng chống ăn mòn tốt. Duralumin (nhẹ, bền) được dùng trong chế tạo khung máy bay nhờ tỉ lệ độ bền/khối lượng cao.

## Bài tập áp dụng nhanh
1. Vì sao hợp kim thường cứng hơn kim loại thành phần?
2. Kể tên hợp kim chính dùng để chế tạo khung máy bay và giải thích vì sao chọn hợp kim đó.
3. Thép và gang khác nhau chủ yếu ở điểm nào?`,
  },
  {
    id: "cmrelkksm001dvhusou63z41d", // Bài 22. Sự ăn mòn kim loại
    append: `## Ứng dụng thực tế
Phương pháp bảo vệ điện hóa (gắn khối kẽm hi sinh) được dùng phổ biến để bảo vệ vỏ tàu biển, ống dẫn dầu khí chôn ngầm, chân cầu bằng thép khỏi bị ăn mòn bởi nước biển/đất ẩm. Mạ kẽm (tôn mạ kẽm) cũng là ứng dụng phổ biến để bảo vệ mái tôn, hàng rào thép khỏi gỉ sét.

## Bài tập áp dụng nhanh
1. Vì sao đinh sắt bị gỉ nhanh hơn khi để ở nơi ẩm ướt so với nơi khô ráo?
2. Vì sao gắn khối kẽm vào vỏ tàu biển bằng thép lại giúp bảo vệ vỏ tàu khỏi bị ăn mòn?
3. Phân biệt ăn mòn hóa học và ăn mòn điện hóa.`,
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
