---
name: chem-exam-import
description: Nhập nguyên một đề kiểm tra Hóa học thật (PDF scan, có đáp án khoanh tay của giáo viên) vào ngân hàng Quiz, gần như giữ nguyên không cần tự giải lại từng câu. Dùng khi được giao "lấy nguyên đề" / "tăng số đề kiểm tra" từ kho `Tài liệu/` — khác `chem-exercises` (bank /practice, luôn tự giải từng câu độc lập).
---

# Import nguyên đề kiểm tra thật vào Quiz

Mục tiêu: nạp nhanh một đề thi thật (thường có 2 file PDF: 1 bản sạch + 1 bản có đáp án khoanh tay/lời giải viết tay của giáo viên) vào bảng `Quiz`/`Question`, KHÔNG cần tự giải lại từng câu như quy trình `chem-exercises` — người dùng đã xác nhận chấp nhận cách làm nhẹ hơn này riêng cho Quiz (2026-07-13: "đề kiểm tra có thể lấy nguyên đề k cần thay đổi nhiều").

## 0. Trước khi bắt đầu — xác định đúng file

- Mỗi bộ đề thường có 2 PDF cùng thư mục: 1 file **ít trang hơn** (bản sạch, chỉ đề) và 1 file **nhiều trang hơn** (bản có đáp án khoanh tay + lời giải viết tay ở lề). Copy cả 2 sang scratchpad trước khi xử lý, không sửa file gốc trong `Tài liệu/`.
- **Không tin tên thư mục về lớp học** — nội dung thật mới quyết định. Đã gặp nhiều lần (kho `Tài liệu/Lớp 10/Đề kiểm tra và ôn tập/Khảo sát đầu năm/` và `Giữa kì 1/`) là đề "khảo sát đầu năm cho học sinh vào Lớp 11" — trộn ôn tập Lớp 10 (oxi hóa-khử, halogen, enthalpy) với nội dung mới Lớp 11 Chương 1 (Kc, pH, độ điện li, thủy phân muối). Dấu hiệu nhận biết: xuất hiện bất kỳ nội dung nào chỉ dạy ở Lớp 11 (cân bằng hóa học/Kc, pH định lượng, độ điện li α, Ka) → đây là đề Lớp 11, dù nằm trong thư mục "Lớp 10". Luôn đọc lướt qua nội dung trước khi quyết định `grade` và `chapterId`.
- 2 file `ĐỀ TỰ LUẬN` trong cùng kho — mở kiểm tra trước khi bỏ qua (đừng suy đoán theo tên): nếu đúng là tự luận hoàn toàn (không có 4 phương án A/B/C/D) thì bỏ qua vì schema `Question` hiện tại (`SINGLE_CHOICE`) không phù hợp; nếu có cả phần trắc nghiệm thì vẫn lấy phần đó.

## 1. Trích xuất nội dung — luôn render ảnh, không tin `pdftotext`

Các PDF dạng này (TYHH/Worldocs và tương tự) hầu hết dùng font nhúng lỗi encoding — `pdftotext` ra ký tự garbled mất dấu tiếng Việt (`Syntax Warning: Bad bounding box in Type 3 glyph` khi render cũng là dấu hiệu). Luôn dùng:

```bash
pdftoppm -png -r 150 "<file-sạch>.pdf" A
pdftoppm -png -r 150 "<file-đáp-án>.pdf" B
```

rồi đọc từng trang bằng `Read` (thị giác). Dùng bản **sạch (A)** để lấy văn bản câu hỏi/phương án chính xác (không bị nét bút đè lên), dùng bản **có đáp án (B)** để lấy đáp án khoanh tròn — hai bản có thể ngắt trang khác nhau nên **đối chiếu cả hai** khi 1 câu bị cắt ngang trang (phương án D bị mất vì nằm sát mép trang) — file còn lại thường còn nguyên câu đó ở vị trí khác.

## 2. Chiến lược kiểm chứng "tin nhưng vẫn xác minh"

KHÔNG tự giải lại toàn bộ đề (đi ngược yêu cầu "không cần thay đổi nhiều"). Thay vào đó:
- Lấy đáp án trực tiếp từ khoanh tròn tay của giáo viên cho toàn bộ câu.
- Tự giải độc lập **4-7 câu tính toán khó nhất** (thường là các câu cuối đề — bài toán nhiều bước, bảo toàn electron/khối lượng, cân bằng Kc...). Nếu khớp 100% → đủ căn cứ tin phần còn lại. Nếu có sai lệch → dừng lại, giải toàn bộ đề để rà soát kỹ hơn (dấu hiệu nguồn không đáng tin).
- Câu có ghi chú "gần nhất" (giá trị không tròn, chọn đáp án gần đúng nhất) là bình thường ở dòng đề TYHH — verify bằng cách thử ngược từng phương án vào phương trình, không coi là lỗi nếu không phương án nào khớp tuyệt đối.

## 3. Cú pháp điện tích ion — dùng ký tự Unicode, KHÔNG dùng cú pháp `^`

**Phát hiện quan trọng (2026-07-13)**: trang admin (`/admin/quizzes/[id]`) hiển thị `content`/`choices`/`explanation` dạng **văn bản thô, KHÔNG chạy qua `ChemProseText`/`parseChemText`** (chỉ trang học sinh làm bài `quiz-runner.tsx` và trang xem kết quả mới parse). Vì vậy:
- Dùng ký tự Unicode superscript thật (`⁺ ⁻ ² ³ ⁴ ⁶ ⁷`...) cho MỌI điện tích ion và số mũ khoa học (`Fe²⁺`, `Cu²⁺`, `SO4²⁻`, `1,805.10⁻⁴`) — hiển thị đúng ở CẢ hai nơi (admin đọc raw text thấy đúng ký tự; học sinh qua parser cũng không bị đụng tới vì parser chỉ xử lý dấu `^` và chữ số ASCII, bỏ qua ký tự Unicode).
- KHÔNG dùng cú pháp `Fe^3+` cho đề Quiz (khác với `/practice` nơi `ChemicalFormula` luôn được dùng để hiển thị) — vì trang admin sẽ hiện nguyên dấu `^` trên màn hình, không đẹp.
- Vẫn phải tránh lỗi gốc đã biết: điện tích độ lớn ≥2 viết dạng số-rồi-dấu thuần ASCII (`Fe3+`, `Mg2+`, `Al3+`) mà KHÔNG có `^` hay Unicode sẽ bị hiểu nhầm thành subscript ở phía học sinh — nhưng vì quy tắc trên đã yêu cầu luôn dùng Unicode, lỗi này tự động không xảy ra. Trước khi lưu, quét lại bằng `Grep` pattern `[A-Za-z][0-9]+[+-]` để bắt các trường hợp bị sót (điện tích độ lớn 1 như `H+`, `Cl-`, `NH4+` viết ASCII thuần vẫn AN TOÀN, không bắt buộc đổi).
- Số mũ khoa học thuần túy (`10^-4`, không phải điện tích ion) cũng nên đổi sang Unicode (`10⁻⁴`) để tránh hiện dấu `^` trên trang admin, dù không gây lỗi parse sai (vì token không bắt đầu bằng chữ hoa nên `ChemProseText` bỏ qua, giữ nguyên literal).

## 4. Bản quyền — script import đề người khác CHỈ lưu local

**Quy tắc bắt buộc (từ 2026-07-13)**: repo GitHub đang **public**. Mọi script chứa nguyên văn đề thi/câu hỏi của giáo viên/nguồn khác (TYHH, Worldocs, hay bất kỳ ai không phải mình tự soạn) — **không bao giờ push lên GitHub**, dù đã sửa tên nguồn:
- Bỏ mọi tên/thương hiệu nguồn cụ thể khỏi title quiz, comment, và nội dung giải thích trong script (không viết "TYHH", tên giáo viên...).
- Commit riêng, message có hậu tố `(chỉ lưu local, không push)`, giống quy ước đã áp dụng cho `PROJECT_STATUS.md`.
- Nếu lỡ đã push, cần thông báo ngay cho người dùng — không tự ý force-push xóa lịch sử.
- Dữ liệu vẫn nạp bình thường vào DB (Postgres/SQLite riêng của dự án) — chỉ script nguồn trên git là vấn đề, không phải việc học sinh dùng đề trong app.

## 5. Cấu trúc script + kiểm tra sau khi chạy

Theo đúng mẫu `scripts/import-lop10-khaosat-de1.mjs`/`import-lop10-khaosat-de2.mjs`:
- `CHAPTER_ID` cố định theo chương phù hợp (Query DB trước nếu chưa biết id đúng).
- Idempotent: `findFirst({ where: { chapterId, title } })` — bỏ qua nếu đã tồn tại.
- Toàn bộ câu `SINGLE_CHOICE` (bỏ qua câu tự luận/Đúng-Sai nếu đề có trộn dạng, trừ khi đã hỗ trợ).
- `durationSec` tính theo công thức chuẩn của `chem-exercises` (1,5 phút/câu SINGLE_CHOICE), làm tròn lên bội 5 phút, tối thiểu 10 phút.
- Sau khi chạy: `npx tsc --noEmit`, `npm run test`, và ít nhất 1 ảnh chụp Chrome (trang admin xem đề) xác nhận không còn dấu `^` hiển thị lộ và điện tích ion đúng dạng số mũ.
- Cập nhật `PROJECT_STATUS.md` (mục lịch sử + bảng đếm câu hỏi Lớp tương ứng) — commit riêng, cũng gắn hậu tố "chỉ lưu local, không push" vì lý do tương tự (nội dung liệt kê chi tiết nguồn/đề của người khác).
