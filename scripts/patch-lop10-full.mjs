import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AB: nâng cấp Lớp 10 (16 bài, 7 chương) — nội dung cốt lõi đã rất tốt từ trước (nhiều
// bài đã có sẵn Ứng dụng thực tế), gap chính là KHÔNG bài nào có "Bài tập áp dụng nhanh".
// Riêng Bài 7 quá thiếu (313 ký tự, 1 heading) nên mở rộng thêm phần hydride theo chu kì
// (đúng nội dung SGK KNTT Hóa 10, trước đó chỉ có oxide/hydroxide).

const PATCHES = [
  {
    id: "cmrel86s10007vhnozlln42uu", // Bài 1. Thành phần của nguyên tử
    append: `## Bài tập áp dụng nhanh
1. Nguyên tử X có 12 proton và 12 neutron. Tính số khối của X.
2. Vì sao nguyên tử trung hòa về điện dù được cấu tạo từ các hạt mang điện?
3. Nêu 2 điểm khác nhau cơ bản giữa proton và electron.`,
  },
  {
    id: "cmrel86s10008vhnobtytqcs8", // Bài 2. Nguyên tố hóa học
    append: `## Bài tập áp dụng nhanh
1. Nguyên tử Y có số hiệu nguyên tử Z = 17 và số khối A = 35. Tính số proton, electron, neutron của Y.
2. Vì sao các đồng vị của cùng 1 nguyên tố có cùng tính chất hóa học?
3. Copper trong tự nhiên có 2 đồng vị: 63Cu (chiếm 73%) và 65Cu (chiếm 27%). Tính nguyên tử khối trung bình của Cu.`,
  },
  {
    id: "cmrel86s10009vhno7ye5tc5t", // Bài 3. Cấu trúc lớp vỏ electron nguyên tử
    append: `## Bài tập áp dụng nhanh
1. Viết cấu hình electron của nguyên tử magnesium (Mg, Z = 12).
2. Nguyên tử có cấu hình electron 1s2 2s2 2p6 3s2 3p4 có bao nhiêu electron lớp ngoài cùng?
3. Vì sao số electron tối đa ở lớp thứ n được tính bằng công thức 2n²?`,
  },
  {
    id: "cmrel877q000avhnobz0ek2ts", // Bài 5. Cấu tạo của bảng tuần hoàn
    append: `## Bài tập áp dụng nhanh
1. Nguyên tử X có cấu hình electron 1s2 2s2 2p6 3s2 3p1. Xác định chu kì và nhóm của X.
2. Vì sao các nguyên tố trong cùng 1 nhóm A lại có tính chất hóa học tương tự nhau?
3. Bảng tuần hoàn hiện có bao nhiêu chu kì? Chu kì nào là chu kì nhỏ?`,
  },
  {
    id: "cmrel877q000bvhno1dc1bco9", // Bài 6. Xu hướng biến đổi một số tính chất của nguyên tử
    append: `## Bài tập áp dụng nhanh
1. So sánh độ âm điện của F, Cl, Br (cùng nhóm VIIA).
2. Vì sao tính kim loại giảm dần từ trái sang phải trong 1 chu kì?
3. Sắp xếp theo chiều tăng dần tính phi kim: P, S, Cl (cùng chu kì 3).`,
  },
  {
    id: "cmrel877q000cvhnodev8dt79", // Bài 7. Xu hướng biến đổi thành phần và tính chất của hợp chất
    append: `## Hydride theo chu kì
Trong một chu kì, theo chiều tăng điện tích hạt nhân, hoá trị cao nhất với hydrogen của nguyên tố (nếu có) biến đổi, đồng thời tính chất của hydride cũng biến đổi rõ rệt: hydride kim loại đầu chu kì (NaH, MgH2) có tính base khi tan trong nước; hydride phi kim cuối chu kì (SiH4, PH3, H2S, HCl) khi tan trong nước cho dung dịch có tính acid tăng dần, mạnh nhất là HCl (acid mạnh).

## Bài tập áp dụng nhanh
1. Trong chu kì 3, oxide nào có tính base mạnh nhất và oxide nào có tính acid mạnh nhất?
2. Vì sao Al2O3 được gọi là oxide lưỡng tính?
3. So sánh tính acid của dung dịch tạo bởi H2S và HCl (cùng chu kì 3, cùng là hydride phi kim).`,
  },
  {
    id: "cmrel877q000dvhno8pomlx71", // Bài 8. Định luật tuần hoàn. Ý nghĩa của bảng tuần hoàn
    append: `## Bài tập áp dụng nhanh
1. Nguyên tố Y ở chu kì 2, nhóm VIA. Xác định số lớp electron và số electron lớp ngoài cùng của Y.
2. Từ vị trí của 1 nguyên tố trong bảng tuần hoàn, có thể suy ra được những thông tin gì về nguyên tử của nó?
3. Nêu ý nghĩa thực tiễn của việc dự đoán tính chất nguyên tố qua bảng tuần hoàn.`,
  },
  {
    id: "cmrel87nl000evhnok4nzlaxu", // Bài 10. Quy tắc octet
    append: `## Bài tập áp dụng nhanh
1. Nguyên tử Na (11 electron) đạt cấu hình bền của khí hiếm nào sau khi nhường electron?
2. Vì sao nguyên tử helium chỉ cần 2 electron lớp ngoài cùng để đạt cấu hình bền (không phải 8)?
3. Nguyên tử O (6 electron lớp ngoài cùng) cần nhận thêm bao nhiêu electron để đạt quy tắc octet?`,
  },
  {
    id: "cmrel87nl000fvhno453c51hs", // Bài 11. Liên kết ion
    append: `## Bài tập áp dụng nhanh
1. Vì sao hợp chất ion có nhiệt độ nóng chảy cao?
2. Viết quá trình hình thành liên kết ion trong phân tử MgO.
3. Vì sao hợp chất ion dẫn điện được khi nóng chảy nhưng không dẫn điện ở trạng thái rắn?`,
  },
  {
    id: "cmrel87nl000gvhnosstx6sbx", // Bài 12. Liên kết cộng hóa trị
    append: `## Bài tập áp dụng nhanh
1. Phân tử Cl2 có liên kết cộng hóa trị có cực hay không cực? Giải thích.
2. Vì sao liên kết O-H trong phân tử nước là liên kết cộng hóa trị có cực?
3. Kể tên 1 phân tử có liên kết cộng hóa trị không cực và 1 phân tử có liên kết cộng hóa trị có cực.`,
  },
  {
    id: "cmrel87nl000hvhnofoa6k02k", // Bài 13. Liên kết hydrogen và tương tác van der Waals
    append: `## Bài tập áp dụng nhanh
1. Vì sao nước đá nhẹ hơn nước lỏng (nổi trên mặt nước)? (gợi ý: liên quan đến cấu trúc liên kết hydrogen)
2. Phân tử nào sau đây có thể tạo liên kết hydrogen với nước: CH4, NH3, CO2?
3. Vì sao nhiệt độ sôi của các halogen tăng dần từ F2 đến I2?`,
  },
  {
    id: "cmrel884h000ivhnow2x13jou", // Bài 15. Phản ứng oxi hóa - khử
    append: `## Bài tập áp dụng nhanh
1. Xác định số oxi hóa của S trong các chất: H2S, SO2, H2SO4.
2. Trong phản ứng Fe + CuSO4 -> FeSO4 + Cu, chất nào là chất khử, chất nào là chất oxi hóa?
3. Cân bằng phương trình oxi hóa - khử sau bằng phương pháp thăng bằng electron: Fe2O3 + CO -> Fe + CO2.`,
  },
  {
    id: "cmrel88mh000jvhnogbi34jbv", // Bài 17. Biến thiên enthalpy trong các phản ứng hóa học
    append: `## Bài tập áp dụng nhanh
1. Phản ứng có ΔrH° < 0 là phản ứng tỏa nhiệt hay thu nhiệt?
2. Vì sao enthalpy tạo thành chuẩn của đơn chất bền (như O2, H2) bằng 0?
3. Tính ΔrH° của phản ứng C(s) + O2(g) -> CO2(g), biết ΔfH°(CO2) = -393,5 kJ/mol.`,
  },
  {
    id: "cmrel8928000kvhnokq75m9w0", // Bài 19. Tốc độ phản ứng
    append: `## Bài tập áp dụng nhanh
1. Vì sao thực phẩm để trong tủ lạnh lâu hỏng hơn để ở ngoài không khí?
2. Nêu 2 yếu tố có thể làm tăng tốc độ của 1 phản ứng hóa học.
3. Vì sao đập nhỏ đá vôi trước khi nung lại giúp phản ứng nung vôi xảy ra nhanh hơn?`,
  },
  {
    id: "cmrel89hi000lvhnobgglxaqj", // Bài 21. Nhóm halogen
    append: `## Bài tập áp dụng nhanh
1. Sắp xếp các đơn chất halogen theo chiều giảm dần tính oxi hóa.
2. Vì sao ở điều kiện thường, F2 và Cl2 là chất khí, Br2 là chất lỏng còn I2 là chất rắn?
3. Viết phương trình hoá học của phản ứng giữa khí chlorine và khí hydrogen.`,
  },
  {
    id: "cmrel89hi000mvhno37uv50ip", // Bài 22. Hydrogen halide. Muối halide
    append: `## Bài tập áp dụng nhanh
1. Vì sao HF là acid yếu trong khi HCl, HBr, HI đều là acid mạnh?
2. Nêu hiện tượng khi nhỏ dung dịch AgNO3 vào dung dịch NaCl.
3. Kể tên 1 ứng dụng thực tế của muối halide trong đời sống.`,
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
