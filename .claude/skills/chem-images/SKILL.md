---
name: chem-images
description: Tìm và chèn ảnh minh họa thật (Wikimedia Commons, có giấy phép rõ ràng) vào nội dung Document môn Hóa học lớp 6-12. Dùng khi cần thêm hình ảnh trực quan cho 1 bài học cụ thể — KHÔNG bao giờ tự đoán/bịa URL ảnh.
---

# Tìm và chèn ảnh minh họa Hóa học

Mục tiêu: kiến thức phải **trực quan sinh động** bằng ảnh thật, đúng nội dung, có giấy phép hợp lệ — không phải ảnh trang trí, không phải ảnh đoán URL (rủi ro 404/sai nội dung/vi phạm bản quyền).

## 1. Quy trình bắt buộc (không được bỏ bước)

1. **`WebSearch`** tìm trang File: liên quan trên Wikimedia Commons theo đúng khái niệm hóa học cần minh họa (tiếng Anh thường cho kết quả tốt hơn — VD "sodium chloride crystal structure wikimedia commons").
2. **`WebFetch`** trang File: đó để lấy URL gốc dạng `https://upload.wikimedia.org/wikipedia/commons/.../Tên_file.svg` (hoặc .png) và xác nhận giấy phép — ưu tiên **CC0/Public Domain**, chấp nhận CC-BY/CC-BY-SA nếu không có lựa chọn tốt hơn.
3. **`curl -I <url>`** xác nhận HTTP 200 và `content-type: image/svg+xml` (hoặc `image/png`, `image/jpeg`) TRƯỚC khi dùng — không tin vào URL suy đoán từ tên file.
4. Chỉ sau khi cả 3 bước trên pass mới chèn ảnh vào content.

Không bao giờ tự viết ra 1 URL `upload.wikimedia.org/...` mà không qua bước WebFetch xác nhận trực tiếp — tên file/hash trên Wikimedia không đoán được.

**Ảnh chụp thật (JPEG dung lượng lớn, vài MB)**: dùng URL dạng thumbnail `.../commons/thumb/x/xx/Tên_file.jpg/960px-Tên_file.jpg` thay vì file gốc full-resolution — vừa tải nhanh hơn cho học sinh, vừa tránh bị Wikimedia chặn (đã gặp lỗi "Too many requests"/403 khi dùng URL gốc dung lượng lớn, nhưng cùng ảnh ở kích thước thumbnail thì tải bình thường). Lấy số px hợp lệ từ trang File: (mục các độ phân giải có sẵn, vd 960×540) — không phải số bất kỳ, `curl -I` sẽ trả 400 nếu chọn sai kích thước. Ảnh vector `.svg` từ Commons thường không gặp vấn đề này (dung lượng nhỏ), dùng URL gốc bình thường.

## 2. Chèn ảnh vào Document

Cú pháp: `![Mô tả ảnh bằng tiếng Việt, đủ chi tiết để dùng làm chú thích](https://upload.wikimedia.org/...)`— xem `components/chemistry/document-content.tsx`, component `DocumentImage`. Mô tả ảnh (`alt`) hiển thị làm `<figcaption>` nên viết đầy đủ, dễ hiểu, không chỉ 1-2 từ.

Vị trí chèn: ngay TRƯỚC hoặc sau đoạn văn nói về đúng khái niệm đó (không chèn hàng loạt ở đầu/cuối bài không liên quan). Nếu bài có heading `## Tên mục`, chèn ảnh ngay sau dòng heading liên quan nhất.

## 3. Script chèn ảnh (idempotent)

Theo mẫu `scripts/add-more-images.mjs` — mảng `INSERTIONS` gồm `{ id, marker, imgLine }`:
- `id`: id Document trong DB (lấy qua Prisma hoặc trang admin).
- `marker`: chuỗi heading `## ...` để chèn ảnh ngay trước đó, hoặc `null` để nối vào cuối content nếu không có mục con phù hợp.
- `imgLine`: dòng markdown ảnh đầy đủ.

Script phải kiểm tra `doc.content.includes(imgLine)` trước khi ghi — chạy lại an toàn, không chèn trùng ảnh.

## 4. Kiểm tra lại bằng ảnh chụp trình duyệt thật

Sau khi chạy script, PHẢI chụp màn hình trang `/documents/[id]` thật (Chrome CDP headless — xem các script mẫu trong thư mục scratchpad của phiên trước, hoặc dựng script mới theo cùng pattern: spawn Chrome `--headless=new`, kết nối WebSocket `webSocketDebuggerUrl`, `Page.navigate`, `Page.captureScreenshot`) để xác nhận ảnh hiển thị đúng vị trí, không vỡ layout, chú thích đúng — không chỉ tin vào việc script chạy không lỗi.

## 5. Việc KHÔNG làm

- Không dùng ảnh từ nguồn không rõ giấy phép (Google Images ngẫu nhiên, Pinterest...) — chỉ Wikimedia Commons (hoặc nguồn tương đương có giấy phép rõ ràng, cần xác nhận riêng nếu khác Wikimedia).
- Không dùng `next/image` cho ảnh ngoài — dự án cố tình dùng `<img>` thường để tránh phải khai báo domain allowlist trong `next.config.js` (đơn giản hơn cho quy mô nhỏ của dự án).
- Không chèn ảnh chỉ để "cho có" — mỗi ảnh phải minh họa đúng 1 khái niệm cụ thể đang được nói tới trong bài.
