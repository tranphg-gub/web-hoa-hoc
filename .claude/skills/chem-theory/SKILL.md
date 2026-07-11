---
name: chem-theory
description: Soạn/nâng cấp nội dung lý thuyết (Document) cho website Hóa học lớp 6-12 — tham khảo SGK/tài liệu thật, trình bày khoa học, có ví dụ số liệu cụ thể, cấu trúc heading rõ ràng để sơ đồ tư duy tự sinh đẹp. Dùng khi được giao soạn/viết lại/mở rộng nội dung 1 bài học (Document) cụ thể.
---

# Soạn lý thuyết Hóa học (Document)

Mục tiêu: mỗi bài học phải **chi tiết, chính xác, dễ hiểu, trực quan** — không phải tạo bản trình chiếu (tính năng Trình chiếu đã có sẵn, tự chia slide theo heading `##`), mà là nội dung Document gốc phải đủ tốt để cả 2 chế độ xem (Bài viết + Trình chiếu) và sơ đồ tư duy (tự sinh từ heading) đều rõ ràng.

## 1. Tìm nguồn tham khảo TRƯỚC khi viết

Không tự bịa kiến thức. Thứ tự ưu tiên nguồn (thư mục `Tài liệu/`, gitignored, không push git):
1. SGK chính thức đúng lớp/bộ sách đang dùng trong DB (thường Kết nối tri thức — kiểm tra `CHEM_NOTATION_RULES` trong `lib/ai/generation-context.ts` để biết quy ước danh pháp đang áp dụng). Ví dụ Lớp 8: `Tài liệu/Lớp 6-9 (THCS)/SGK KHTN 8 - KNTT.pdf`. Lớp 12: `Tài liệu/Lớp 12/EBOOK Nguyễn Anh Phong/` (ebook tổng ôn), `Tài liệu/Lớp 12/Hóa 12 theo chuyên đề/*.zip` (theo chương, có cả SBT).
2. Tài liệu giáo viên/người dùng tự soạn đã upload (VD `KHTN 8 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx` — đã dùng để mining câu hỏi ở MR-T, có thể còn phần lý thuyết chưa khai thác).
3. Nội dung Document hiện có trong DB (đọc qua Prisma hoặc trang admin) — không viết đè lên nếu đã đúng, chỉ bổ sung/làm rõ hơn.
4. Kiến thức nền tảng hóa học phổ thông đã được kiểm chứng — CHỈ dùng khi 1-3 không có, và phải tự kiểm tra lại (cân bằng PTHH, đúng danh pháp, đúng số liệu).

Nếu PDF là ảnh scan (không chọn được text), dùng `pdftoppm` render trang rồi đọc bằng thị giác (đã dùng ở MR-N) — không bỏ qua chỉ vì khó đọc, nhưng cũng không đoán mò nếu chữ quá mờ.

## 2. Quy tắc trình bày nội dung (theo `components/chemistry/document-content.tsx`)

Content là 1 chuỗi text, các đoạn cách nhau bằng dòng trống `\n\n`. Trong 1 đoạn, mỗi dòng được xử lý riêng:
- `## Tiêu đề` → heading phụ (in hoa, xám) — **đây là nguồn dữ liệu duy nhất cho sơ đồ tư duy tự sinh** (`components/chemistry/mind-map-view.tsx` đọc các dòng `##` để dựng cây/vòng tròn/timeline). Bài học cần 3-6 heading `##` theo đúng mạch logic (VD: "Khái niệm" → "Tính chất" → "Ví dụ minh họa" → "Ứng dụng thực tế" → "Bài tập áp dụng nhanh"), không quá ít (mind map trơ trọi) và không quá vụn (mind map rối).
- `- Nội dung` → gộp thành danh sách gạch đầu dòng.
- Dòng chứa `->`, `=>`, `⇌` → tự nhận diện là phương trình phản ứng, hiển thị dạng khối monospace riêng (component `ReactionEquation`). Viết PTHH dạng thường: `Fe + 2HCl -> FeCl2 + H2` — hệ thống tự thêm subscript/mũi tên khoa học, KHÔNG tự gõ ký tự Unicode.
- `![Mô tả ảnh](url)` → ảnh minh họa (xem skill `chem-images` để tìm ảnh thật trước khi chèn).
- Bảng `| ... |` theo cú pháp markdown chuẩn (dòng phân cách `|---|---|`) → tự nhận diện thành bảng HTML dù đứng chung đoạn với dòng `##` phía trước (đã sửa ở MR-V) — dùng khi so sánh nhiều đối tượng (VD 3 thể của chất, các loại liên kết).
- Công thức hóa học trong câu văn thường (không phải dòng phản ứng riêng) vẫn tự nhận diện qua `ChemProseText` — cứ viết `H2O`, `CaCO3`, `Fe^3+` bình thường trong đoạn văn.

## 3. Nội dung phải có

- **Ví dụ số liệu cụ thể**: không chỉ nêu khái niệm suông — có ít nhất 1 ví dụ tính toán/số liệu thật mỗi bài (nồng độ, khối lượng mol, nhiệt độ sôi/nóng chảy...).
- **Ứng dụng thực tế**: liên hệ đời sống (VD: NaCl trong muối ăn, CaCO3 trong đá vôi/vỏ trứng) — giúp học sinh nhớ lâu hơn.
- **Ảnh minh họa thật** ở ít nhất 1-2 vị trí quan trọng nhất bài (không phải trang trí — phải minh họa đúng khái niệm đang nói tới). Xem skill `chem-images`.
- **Bài tập áp dụng nhanh cuối bài** (theo CLAUDE.md mục 5.1) — 1-2 câu ngắn để học sinh tự kiểm tra ngay, không cần tính giờ/điểm.
- Danh pháp: dùng chuẩn Kết nối tri thức (xem `CHEM_NOTATION_RULES`) — sulfuric acid, sodium hydroxide, iron(III) oxide... không dùng danh pháp cũ (axit sunfuric, natri hiđroxit).

## 4. Cách ghi vào DB

Viết script Node dùng `PrismaClient`, cập nhật `prisma.document.update({ where: { id }, data: { content } })`. Script phải **idempotent** — kiểm tra `doc.content.includes(...)` hoặc so khớp trước khi ghi đè, để chạy lại an toàn không nhân đôi nội dung (theo đúng quy ước các script `add-*.mjs` trong `scripts/`). Không xoá nội dung cũ nếu nó đã đúng — chỉ bổ sung/viết rõ hơn.

Sau khi ghi, LUÔN kiểm tra lại bằng ảnh chụp trình duyệt thật (Chrome CDP headless, xem hướng dẫn trong `KE_HOACH_MO_RONG.md`/lịch sử phiên trước) — không chỉ tin vào code, phải thấy hình render đúng, bảng đúng, heading đúng thứ tự trước khi báo hoàn thành.

## 5. Việc KHÔNG làm

- Không tạo bản trình chiếu riêng — trình chiếu đã tự sinh từ heading `##` của Document, không cần component/trang mới.
- Không viết nội dung chung chung kiểu SGK tóm tắt 3 dòng — mục tiêu là "chi tiết và đúng đắn" theo đúng yêu cầu người dùng, không phải rút gọn.
- Không bịa số liệu/ví dụ nếu không chắc chắn — thà ít ví dụ nhưng đúng, còn hơn nhiều ví dụ sai.
