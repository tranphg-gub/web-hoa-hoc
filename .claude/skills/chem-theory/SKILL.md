---
name: chem-theory
description: Soạn/nâng cấp nội dung lý thuyết (Document) cho website Hóa học lớp 6-12 — tham khảo SGK/tài liệu thật, trình bày khoa học, có ví dụ số liệu cụ thể, cấu trúc heading rõ ràng để sơ đồ tư duy tự sinh đẹp. Dùng khi được giao soạn/viết lại/mở rộng nội dung 1 bài học (Document) cụ thể.
---

# Soạn lý thuyết Hóa học (Document)

Mục tiêu: mỗi bài học phải **chi tiết, chính xác, dễ hiểu, trực quan** — không phải tạo bản trình chiếu (tính năng Trình chiếu đã có sẵn, tự chia slide theo heading `##`), mà là nội dung Document gốc phải đủ tốt để cả 2 chế độ xem (Bài viết + Trình chiếu) và sơ đồ tư duy (tự sinh từ heading) đều rõ ràng.

## 1. Tìm nguồn tham khảo TRƯỚC khi viết

Không tự bịa kiến thức. Thứ tự ưu tiên nguồn (thư mục `Tài liệu/`, gitignored, không push git):
1. SGK chính thức đúng lớp/bộ sách đang dùng trong DB (thường Kết nối tri thức — kiểm tra `CHEM_NOTATION_RULES` trong `lib/ai/generation-context.ts` để biết quy ước danh pháp đang áp dụng). Ví dụ Lớp 8: `Tài liệu/Lớp 6-9 (THCS)/SGK KHTN 8 - KNTT.pdf` (bản scan, dùng `pdftoppm` + đọc thị giác). Lớp 12: `Tài liệu/Lớp 12/EBOOK Nguyễn Anh Phong/` (ebook tổng ôn), `Tài liệu/Lớp 12/Hóa 12 theo chuyên đề/*.zip` (theo chương, có cả SBT).
2. **`Tài liệu/Lớp 6-9 (THCS)/Hóa cấp 2 - Bài tập PTHH và tính toán/Ôn tập kiến thức cấp 2(2).docx`** — file ôn tập THCS do giáo viên tự soạn, text sạch (đọc bằng `python-docx`, không cần OCR), cực kỳ súc tích nhưng đầy đủ: Kim loại, Oxide (base/acid), Acid (kể cả H2SO4 đặc/HNO3 tính oxi hóa mạnh), Base, Muối (kể cả phần bị nhiệt phân, cách nhận biết độ tan) — nguồn tham khảo chính cho MỌI bài về 1 loại chất/hợp chất vô cơ ở Lớp 8-9, dùng cùng với SGK KNTT (mục 1) chứ không thay thế.
3. Tài liệu giáo viên/người dùng tự soạn đã upload khác (VD `KHTN 8 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx` — đã dùng để mining câu hỏi ở MR-T, có thể còn phần lý thuyết chưa khai thác).
4. Nội dung Document hiện có trong DB (đọc qua Prisma hoặc trang admin) — không viết đè lên nếu đã đúng, chỉ bổ sung/làm rõ hơn.
5. Kiến thức nền tảng hóa học phổ thông đã được kiểm chứng — CHỈ dùng khi 1-4 không có, và phải tự kiểm tra lại (cân bằng PTHH, đúng danh pháp, đúng số liệu).

Nếu PDF là ảnh scan (không chọn được text), dùng `pdftoppm` render trang rồi đọc bằng thị giác (đã dùng ở MR-N) — không bỏ qua chỉ vì khó đọc, nhưng cũng không đoán mò nếu chữ quá mờ. Nếu file `.docx` báo lỗi encoding khi đọc bằng Python trên Windows, bọc `sys.stdout` bằng `io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")` trước khi in.

## 2. Quy tắc trình bày nội dung (theo `components/chemistry/document-content.tsx`)

Content là 1 chuỗi text, các đoạn cách nhau bằng dòng trống `\n\n`. Trong 1 đoạn, mỗi dòng được xử lý riêng:
- `## Tiêu đề` → heading phụ (in hoa, xám) — **đây là nguồn dữ liệu duy nhất cho sơ đồ tư duy tự sinh** (`components/chemistry/mind-map-view.tsx` đọc các dòng `##` để dựng cây/vòng tròn/timeline). Bài học cần 3-6 heading `##` theo đúng mạch logic (VD: "Khái niệm" → "Tính chất" → "Ví dụ minh họa" → "Ứng dụng thực tế" → "Bài tập áp dụng nhanh"), không quá ít (mind map trơ trọi) và không quá vụn (mind map rối).
- `- Nội dung` → gộp thành danh sách gạch đầu dòng.
- Dòng chứa `->`, `=>`, `⇌` → tự nhận diện là phương trình phản ứng, hiển thị dạng khối monospace riêng (component `ReactionEquation`). Viết PTHH dạng thường: `Fe + 2HCl -> FeCl2 + H2` — hệ thống tự thêm subscript/mũi tên khoa học, KHÔNG tự gõ ký tự Unicode.
- `![Mô tả ảnh](url)` → ảnh minh họa (xem skill `chem-images` để tìm ảnh thật trước khi chèn).
- Bảng `| ... |` theo cú pháp markdown chuẩn (dòng phân cách `|---|---|`) → tự nhận diện thành bảng HTML dù đứng chung đoạn với dòng `##` phía trước (đã sửa ở MR-V) — dùng khi so sánh nhiều đối tượng (VD 3 thể của chất, các loại liên kết).
- Công thức hóa học trong câu văn thường (không phải dòng phản ứng riêng) vẫn tự nhận diện qua `ChemProseText` — cứ viết `H2O`, `CaCO3`, `Fe^3+` bình thường trong đoạn văn.
- **KHÔNG dùng `**in đậm**` kiểu markdown chuẩn** — parser này KHÔNG hỗ trợ in đậm inline, dấu `**` sẽ hiển thị literal trên trang (đã gặp lỗi này thật, phải sửa lại). Muốn nhấn mạnh 1 cụm từ đầu bullet, chỉ cần viết thường kèm dấu `:` (VD "Acid mạnh, acid yếu: ...").

## 3. Khung mục CỐ ĐỊNH khi bài học nói về 1 loại chất/hợp chất

Yêu cầu trực tiếp từ người dùng: bài nào giới thiệu 1 "dạng chất" (acid, base, oxide, muối, ester, carbohydrate, kim loại, phi kim...) PHẢI đủ các mục sau (bỏ mục nào không áp dụng được cho đúng chất đó, nhưng không bỏ vì lười tra cứu):

1. **Giới thiệu/Khái niệm** — định nghĩa, phân loại, công thức chung.
2. **Trạng thái tự nhiên** — chất đó tồn tại ở đâu ngoài tự nhiên/đời sống (VD: NaCl trong nước biển, CaCO3 trong đá vôi, glucose trong quả chín...). Hay bị bỏ sót nhất — LUÔN kiểm tra đã có mục này chưa trước khi báo hoàn thành.
3. **Tính chất vật lí** (TCVL) — trạng thái (rắn/lỏng/khí), màu sắc, mùi, tính tan, khối lượng riêng, nhiệt độ sôi/nóng chảy nếu có số liệu đáng chú ý.
4. **Tính chất hóa học** (TCHH) — đầy đủ các phản ứng đặc trưng, MỖI phản ứng có PTHH minh họa thật (không chỉ nêu tên phản ứng suông). Với acid/base/muối, tham khảo file "Ôn tập kiến thức cấp 2(2).docx" (mục 1.2) để không bỏ sót phản ứng nào (VD: muối còn có phản ứng "bị nhiệt phân" hay bị bỏ quên).
5. **Điều chế** (cách điều chế/sản xuất) — trong phòng thí nghiệm và/hoặc trong công nghiệp nếu khác nhau.
6. **Ứng dụng thực tế** — liên hệ đời sống, kèm ảnh minh họa (xem skill `chem-images`).
7. **Bài tập áp dụng nhanh** cuối bài.

Ví dụ áp dụng: bài về Acid không chỉ dừng ở "tác dụng quỳ tím, kim loại, oxide base, base, muối" — còn cần nói tới acid mạnh/yếu (thang so sánh), và với acid đặc biệt như H2SO4 đặc/HNO3 phải có riêng phần "tính chất vật lí đặc biệt" (háo nước, tỏa nhiệt mạnh khi pha loãng) và "tính oxi hóa mạnh" (oxi hóa được kim loại đứng sau H, phi kim) — đây là nội dung THCS/THPT thật, không phải chi tiết thừa.

## 4. Nội dung phải có (mọi loại bài, không riêng bài về 1 chất)

- **Ví dụ số liệu cụ thể**: không chỉ nêu khái niệm suông — có ít nhất 1 ví dụ tính toán/số liệu thật mỗi bài (nồng độ, khối lượng mol, nhiệt độ sôi/nóng chảy...).
- **Ứng dụng thực tế**: liên hệ đời sống (VD: NaCl trong muối ăn, CaCO3 trong đá vôi/vỏ trứng) — giúp học sinh nhớ lâu hơn.
- **Ảnh minh họa thật** ở ít nhất 1-2 vị trí quan trọng nhất bài (không phải trang trí — phải minh họa đúng khái niệm đang nói tới). Xem skill `chem-images`.
- **Bài tập áp dụng nhanh cuối bài** (theo CLAUDE.md mục 5.1) — 1-2 câu ngắn để học sinh tự kiểm tra ngay, không cần tính giờ/điểm.
- Danh pháp: dùng chuẩn Kết nối tri thức (xem `CHEM_NOTATION_RULES`) — sulfuric acid, sodium hydroxide, iron(III) oxide... không dùng danh pháp cũ (axit sunfuric, natri hiđroxit).

## 5. Cách ghi vào DB

Viết script Node dùng `PrismaClient`, cập nhật `prisma.document.update({ where: { id }, data: { content } })`. Script phải **idempotent** — kiểm tra `doc.content.includes(...)` hoặc so khớp trước khi ghi đè, để chạy lại an toàn không nhân đôi nội dung (theo đúng quy ước các script `add-*.mjs` trong `scripts/`). Không xoá nội dung cũ nếu nó đã đúng — chỉ bổ sung/viết rõ hơn.

Sau khi ghi, LUÔN kiểm tra lại bằng ảnh chụp trình duyệt thật (Chrome CDP headless, xem hướng dẫn trong `KE_HOACH_MO_RONG.md`/lịch sử phiên trước) — không chỉ tin vào code, phải thấy hình render đúng, bảng đúng, heading đúng thứ tự trước khi báo hoàn thành.

## 6. Việc KHÔNG làm

- Không tạo bản trình chiếu riêng — trình chiếu đã tự sinh từ heading `##` của Document, không cần component/trang mới.
- Không viết nội dung chung chung kiểu SGK tóm tắt 3 dòng — mục tiêu là "chi tiết và đúng đắn" theo đúng yêu cầu người dùng, không phải rút gọn.
- Không bịa số liệu/ví dụ nếu không chắc chắn — thà ít ví dụ nhưng đúng, còn hơn nhiều ví dụ sai.
