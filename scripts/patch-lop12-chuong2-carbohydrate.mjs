import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-Z: bổ sung Trạng thái tự nhiên, Tính chất vật lí, Ứng dụng thực tế, Bài tập áp dụng
// nhanh cho 3 bài Chương 2 Carbohydrate (Lớp 12) — nội dung hóa học cốt lõi (công thức,
// tính chất hóa học) đã đúng và khá đầy đủ từ trước, chỉ thiếu phần liên hệ thực tế.

const PATCHES = [
  {
    id: "cmrelkj4d000zvhusle9lcwou", // Bài 4. Giới thiệu về carbohydrate. Glucose và fructose
    insertions: [
      {
        marker: "## Glucose",
        text: `## Trạng thái tự nhiên và tính chất vật lí
- Glucose và fructose đều là chất rắn kết tinh không màu, dễ tan trong nước, có vị ngọt (fructose ngọt hơn glucose).
- Glucose có nhiều trong quả chín (nho, chuối...), mật ong, và trong máu người (nồng độ khoảng 4,4-7,2 mmol/L ở người khỏe mạnh).
- Fructose có nhiều trong mật ong (khoảng 40% fructose, 30% glucose) và quả chín.

`,
      },
    ],
    append: `## Ứng dụng thực tế
- Glucose được dùng làm dịch truyền tĩnh mạch trong y tế (cung cấp năng lượng nhanh cho cơ thể khi cần), làm nguyên liệu lên men sản xuất ethanol.
- Fructose có trong mật ong, trái cây, được dùng làm chất tạo ngọt tự nhiên.

## Bài tập áp dụng nhanh
1. Vì sao dung dịch glucose có thể tham gia phản ứng tráng bạc dù chủ yếu tồn tại ở dạng mạch vòng?
2. Glucose và fructose có cùng công thức phân tử C6H12O6 nhưng khác nhau ở điểm nào?
3. Lên men 36 gam glucose (M = 180 g/mol) với hiệu suất 90%. Tính khối lượng ethanol thu được.`,
  },
  {
    id: "cmrelkj4d0010vhusdtxfig9a", // Bài 5. Saccharose và maltose
    insertions: [],
    append: `## Trạng thái tự nhiên
- Saccharose có nhiều trong mía, củ cải đường, thốt nốt — đường ăn hàng ngày (đường trắng, đường phèn) chính là saccharose đã tinh chế.
- Maltose có trong mạch nha (mầm lúa mạch), hình thành khi tinh bột bị thủy phân một phần nhờ enzyme amylase.

## Ứng dụng thực tế
- Saccharose (đường mía, đường củ cải) là chất tạo ngọt phổ biến nhất trong thực phẩm.
- Maltose là nguyên liệu quan trọng trong sản xuất kẹo mạch nha, và hình thành trong quá trình đường hóa tinh bột khi sản xuất bia, rượu.

## Bài tập áp dụng nhanh
1. Vì sao saccharose không tham gia phản ứng tráng bạc còn maltose thì có?
2. Viết phương trình thủy phân saccharose trong môi trường acid (ghi rõ sản phẩm).
3. Đường ăn hàng ngày (đường mía) chủ yếu là loại đường nào: glucose, fructose, saccharose hay maltose?`,
  },
];

// Bài 6 xử lý riêng vì id đúng khác placeholder ở trên
const BAI6_ID = "cmrelkj4d0011vhuswrhu3udj";
const BAI6_APPEND = `## Trạng thái tự nhiên
- Tinh bột có nhiều trong hạt (gạo, ngô, lúa mì), củ (khoai tây, khoai lang, sắn).
- Cellulose là thành phần chính của thành tế bào thực vật, có nhiều trong gỗ, bông, tre, nứa, rơm rạ.

## Tính chất vật lí
- Tinh bột là chất rắn vô định hình, màu trắng, không tan trong nước lạnh; trong nước nóng, tinh bột trương lên tạo dung dịch keo gọi là hồ tinh bột.
- Cellulose là chất rắn dạng sợi, màu trắng, không tan trong nước kể cả khi đun nóng.

## Ứng dụng thực tế
- Tinh bột (cơm, bánh mì, khoai...) là nguồn cung cấp năng lượng chính trong khẩu phần ăn hàng ngày.
- Cellulose là thành phần chính của chất xơ thực phẩm — dù cơ thể người không tiêu hóa trực tiếp được cellulose, chất xơ vẫn hỗ trợ quá trình tiêu hóa; cellulose còn là nguyên liệu sản xuất giấy và tơ sợi (tơ visco, tơ acetate).

## Bài tập áp dụng nhanh
1. Vì sao tinh bột và cellulose có cùng công thức (C6H10O5)n nhưng tính chất vật lí lại khác nhau nhiều (tinh bột tạo hồ trong nước nóng, cellulose thì không tan)?
2. Nêu phản ứng dùng để nhận biết tinh bột (thuốc thử và hiện tượng).
3. Kể tên 2 thực phẩm giàu tinh bột và 2 nguồn cellulose thường gặp trong đời sống.`;

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

  // Bài 6
  const bai6 = await prisma.document.findUnique({ where: { id: BAI6_ID } });
  if (!bai6) throw new Error("Không tìm thấy Bài 6");
  if (!bai6.content.includes("## Bài tập áp dụng nhanh")) {
    const newContent = bai6.content.trimEnd() + "\n\n" + BAI6_APPEND;
    await prisma.document.update({ where: { id: BAI6_ID }, data: { content: newContent } });
    console.log(`Đã cập nhật "${bai6.title}" —`, newContent.length, "ký tự (trước:", bai6.content.length, "ký tự).");
  } else {
    console.log(`Bỏ qua "${bai6.title}": đã đủ.`);
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
