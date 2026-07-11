import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AD: nâng cấp Lớp 11 (19 bài, 6 chương) — thêm Bài tập áp dụng nhanh (chưa bài nào
// có). Nội dung lý thuyết đã seed từ trước, cốt lõi đúng và đủ.

const PATCHES = [
  {
    id: "cmrelkg2s000evhus58czpex1", // Bài 1. Khái niệm về cân bằng hóa học
    append: `## Bài tập áp dụng nhanh
1. Phản ứng thuận nghịch là gì? Cho 1 ví dụ.
2. Ở trạng thái cân bằng, tốc độ phản ứng thuận và tốc độ phản ứng nghịch có bằng nhau không?
3. Nêu 1 yếu tố có thể làm chuyển dịch cân bằng hóa học.`,
  },
  {
    id: "cmrelkg2s000fvhuseeoo886p", // Bài 2. Cân bằng trong dung dịch nước
    append: `## Bài tập áp dụng nhanh
1. Nước tinh khiết có môi trường acid, base hay trung tính?
2. Dung dịch có pH = 3 có môi trường acid hay base?
3. Chất chỉ thị nào thường dùng để nhận biết môi trường acid/base trong phòng thí nghiệm?`,
  },
  {
    id: "cmrelkghp000gvhus4clvkw03", // Bài 4. Nitrogen
    append: `## Bài tập áp dụng nhanh
1. Khí nitrogen chiếm khoảng bao nhiêu phần trăm thể tích không khí?
2. Vì sao nitrogen khá trơ về mặt hóa học ở điều kiện thường?
3. Nêu 1 ứng dụng thực tế của khí nitrogen.`,
  },
  {
    id: "cmrelkghq000hvhus7x4083o1", // Bài 5. Ammonia - Muối ammonium
    append: `## Bài tập áp dụng nhanh
1. Vì sao dung dịch ammonia làm quỳ tím chuyển sang màu xanh?
2. Viết phương trình hoá học giữa ammonia và dung dịch HCl.
3. Nêu 1 ứng dụng của muối ammonium trong nông nghiệp.`,
  },
  {
    id: "cmrelkghq000ivhus198u995w", // Bài 6. Một số hợp chất của nitrogen với oxygen
    append: `## Bài tập áp dụng nhanh
1. Khí NO2 có màu gì?
2. Vì sao mưa acid có liên quan đến các oxide của nitrogen thải ra từ khí thải xe cộ, nhà máy?
3. Viết công thức của 2 oxide của nitrogen thường gặp.`,
  },
  {
    id: "cmrelkghq000jvhusmpua5m0l", // Bài 7. Sulfur và sulfur dioxide
    append: `## Bài tập áp dụng nhanh
1. Sulfur dioxide (SO2) có mùi đặc trưng gì?
2. Vì sao SO2 là một trong các khí gây mưa acid?
3. Viết phương trình hoá học đốt cháy sulfur trong khí oxygen.`,
  },
  {
    id: "cmrelkghq000kvhusbo46i1gq", // Bài 8. Sulfuric acid và muối sulfate
    append: `## Bài tập áp dụng nhanh
1. Vì sao khi pha loãng H2SO4 đặc phải đổ từ từ acid vào nước?
2. Nêu 1 ứng dụng công nghiệp quan trọng của sulfuric acid.
3. Thuốc thử nào dùng để nhận biết ion sulfate (SO4²⁻) trong dung dịch?`,
  },
  {
    id: "cmrelkgx0000lvhusxvt68k9o", // Bài 10. Hợp chất hữu cơ và hóa học hữu cơ
    append: `## Bài tập áp dụng nhanh
1. Hợp chất hữu cơ là hợp chất của nguyên tố nào (trừ 1 số ngoại lệ đơn giản)?
2. Kể tên 2 đặc điểm chung của hợp chất hữu cơ so với hợp chất vô cơ.
3. Hydrocarbon là gì? Cho 1 ví dụ.`,
  },
  {
    id: "cmrelkgx0000mvhus2lzqnct2", // Bài 11. Phương pháp tách biệt và tinh chế hợp chất hữu cơ
    append: `## Bài tập áp dụng nhanh
1. Kể tên 2 phương pháp thường dùng để tách/tinh chế hợp chất hữu cơ.
2. Phương pháp chưng cất dựa trên sự khác nhau về tính chất nào của các chất?
3. Phương pháp chiết dùng để tách các chất như thế nào?`,
  },
  {
    id: "cmrelkgx0000nvhusy6w8sf85", // Bài 12. Công thức phân tử hợp chất hữu cơ
    append: `## Bài tập áp dụng nhanh
1. Công thức phân tử cho biết thông tin gì về 1 hợp chất?
2. Một hợp chất hữu cơ có công thức đơn giản nhất là CH2. Viết 2 công thức phân tử có thể có.
3. Phân biệt công thức phân tử và công thức đơn giản nhất.`,
  },
  {
    id: "cmrelkgx0000ovhuseop8xudt", // Bài 13. Cấu tạo hóa học hợp chất hữu cơ
    append: `## Bài tập áp dụng nhanh
1. Đồng phân là gì? Cho 1 ví dụ.
2. Vì sao các chất đồng phân có cùng công thức phân tử nhưng tính chất khác nhau?
3. Công thức cấu tạo cho biết thông tin gì mà công thức phân tử không thể hiện được?`,
  },
  {
    id: "cmrelkhc3000pvhus4j8w4gwz", // Bài 15. Alkane
    append: `## Bài tập áp dụng nhanh
1. Viết công thức chung của dãy đồng đẳng alkane.
2. Alkane có phản ứng đặc trưng nào với halogen?
3. Đốt cháy hoàn toàn 1 alkane thu được CO2 và H2O theo tỉ lệ mol như thế nào là đặc trưng cho alkane?`,
  },
  {
    id: "cmrelkhc3000qvhuspjmso606", // Bài 16. Hydrocarbon không no
    append: `## Bài tập áp dụng nhanh
1. Vì sao alkene và alkyne làm mất màu dung dịch bromine còn alkane thì không?
2. Viết công thức chung của dãy đồng đẳng alkene và alkyne.
3. Phản ứng trùng hợp thường xảy ra với loại hydrocarbon nào: no hay không no?`,
  },
  {
    id: "cmrelkhc3000rvhus05sivsf0", // Bài 17. Arene (Hydrocarbon thơm)
    append: `## Bài tập áp dụng nhanh
1. Benzene có công thức phân tử là gì?
2. Vì sao benzene khó tham gia phản ứng cộng hơn alkene dù có các liên kết đôi trong công thức?
3. Nêu 1 ứng dụng thực tế của benzene hoặc các arene khác.`,
  },
  {
    id: "cmrelkhrj000svhuslofpiao6", // Bài 19. Dẫn xuất halogen
    append: `## Bài tập áp dụng nhanh
1. Dẫn xuất halogen là hợp chất hữu cơ có chứa nguyên tố nào thay thế nguyên tử H?
2. Nêu 1 ứng dụng thực tế của dẫn xuất halogen (VD trong công nghiệp lạnh, nhựa...).
3. Vì sao một số dẫn xuất halogen (như CFC) bị hạn chế sử dụng?`,
  },
  {
    id: "cmrelkhrj000tvhusjnuh36f7", // Bài 20. Alcohol
    append: `## Bài tập áp dụng nhanh
1. Viết công thức cấu tạo của ethanol (C2H5OH).
2. Alcohol tác dụng được với kim loại kiềm (Na, K) tạo ra khí gì?
3. Nêu 1 ứng dụng thực tế của ethanol.`,
  },
  {
    id: "cmrelkhrj000uvhusrnytcfdz", // Bài 21. Phenol
    append: `## Bài tập áp dụng nhanh
1. Phenol có nhóm chức gì và nhóm đó gắn trực tiếp vào đâu?
2. Vì sao phenol có tính acid yếu, khác với alcohol thông thường?
3. Phenol phản ứng với dung dịch bromine cho hiện tượng gì?`,
  },
  {
    id: "cmrelki76000vvhusr8tsz7mw", // Bài 23. Hợp chất carbonyl
    append: `## Bài tập áp dụng nhanh
1. Hợp chất carbonyl gồm những nhóm chức nào?
2. Phân biệt aldehyde và ketone dựa vào vị trí nhóm carbonyl.
3. Aldehyde có phản ứng đặc trưng nào để nhận biết (gợi ý: liên quan tới bạc)?`,
  },
  {
    id: "cmrelki76000wvhusgvwneeuq", // Bài 24. Carboxylic acid
    append: `## Bài tập áp dụng nhanh
1. Carboxylic acid có nhóm chức đặc trưng là gì?
2. Viết phương trình hoá học của phản ứng ester hóa giữa acetic acid và ethanol.
3. Vì sao carboxylic acid có tính acid mạnh hơn phenol và alcohol?`,
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
