# Kế hoạch nâng cấp tổng hợp — Hóa Học Cùng Em

_Cập nhật 2026-07-10, dựa trên đọc trực tiếp code. Gộp kế hoạch sửa lỗi cũ + kế hoạch nâng cấp mới về độ chính xác nội dung, phân cấp chương trình, và phân mức độ khó bài tập._

## Hiện trạng — đã làm xong so với plan cũ

- ✅ **Phân quyền**: đã có `proxy.ts` (middleware) chặn route theo role + `lib/require-auth.ts` (`requireUser`/`requireAdmin`) làm lớp bảo vệ thứ hai ở từng trang admin.
- ✅ **Git**: đã `git init` + commit đầu tiên.
- ❌ **Tính giờ server**: `saveQuizAnswer`/`submitQuizAttempt` vẫn CHƯA kiểm tra deadline — vẫn là lỗi cần sửa (Giai đoạn 1).
- ❌ **Schema**: chưa có trường độ khó, chưa có phân cấp Chương/Bài (chapter vẫn là chuỗi text tự do).

---

## Giai đoạn 1 — Sửa nốt lỗi còn tồn (làm trước tiên)

### 1.1. Tính giờ bài kiểm tra phía server (từ plan cũ, chưa làm)

Trong `app/(app)/quizzes/actions.ts`:

- Cả hai action tính `deadline = attempt.startedAt.getTime() + quiz.durationSec * 1000 + BUFFER_MS` (buffer ~5s cho độ trễ mạng).
- `saveQuizAnswer`: nếu `Date.now() > deadline` → bỏ qua, không lưu thêm.
- `submitQuizAttempt`: nếu quá deadline → vẫn chấm nhưng chỉ dựa trên đáp án đã lưu trước deadline, đánh dấu `late: true` để hiển thị "nộp trễ".
- Viết 2–3 unit test cho hàm chấm điểm + tính deadline (tách logic thuần ra `lib/quiz-scoring.ts` để test được không cần DB).

### 1.2. Việc nhỏ kèm theo

- Cập nhật `PROJECT_STATUS.md` cho khớp thực tế (mục phân quyền đã sửa xong, mục timer sau khi sửa 1.1).
- Điền `ANTHROPIC_API_KEY` thật, test luồng chat AI đầu-cuối.
- Backup tự động `prisma/dev.db` (script copy theo ngày là đủ cho quy mô này).

---

## Giai đoạn 2 — Phân cấp nội dung rõ ràng (Lớp → Chương → Bài)

Hiện `Document.chapter` là chuỗi tự do → không sắp xếp/lọc/thống kê tiến độ theo chương được, dễ gõ lệch tên ("Chương 1" vs "Chuong 1").

### 2.1. Schema mới

```prisma
model Chapter {
  id     String @id @default(cuid())
  grade  Int          // 8-12
  title  String       // vd: "Phản ứng hóa học"
  order  Int
  documents Document[]
  quizzes   Quiz[]
  flashcardSets FlashcardSet[]
}
```

- `Document`, `Quiz`, `FlashcardSet` thêm `chapterId` (thay chuỗi `chapter`/`topic` tự do).
- Seed danh mục Chương theo đúng mục lục **SGK Kết nối tri thức** (chương trình GDPT 2018): KHTN 8, KHTN 9 (phần Hóa), Hóa 10, 11, 12 — đây là "khung xương" cố định, giáo viên chỉ thêm Bài vào trong.
- Migration: viết script map dữ liệu cũ (chuỗi chapter) sang Chapter record, không xóa dữ liệu.

### 2.2. UI

- Trang tài liệu: chọn Lớp → danh sách Chương (card, đúng thứ tự SGK) → danh sách Bài trong chương, kèm tiến độ "đã học x/y bài" từng chương.
- Trang quiz + flashcard lọc theo Chương tương tự.
- Admin: dropdown chọn Chương thay vì ô text tự do; trang quản lý danh mục Chương riêng (thêm/sửa/sắp xếp).

---

## Giai đoạn 3 — Phân mức độ khó bài tập (4 mức chuẩn Bộ GD)

Theo đúng thang dùng trong ma trận đề thi thật: **Nhận biết – Thông hiểu – Vận dụng – Vận dụng cao**.

### 3.1. Schema

```prisma
enum Difficulty {
  NHAN_BIET
  THONG_HIEU
  VAN_DUNG
  VAN_DUNG_CAO
}
```

- `Question` thêm `difficulty Difficulty @default(THONG_HIEU)`.
- `Quiz` không cần trường độ khó riêng — độ khó đề suy ra từ tỉ lệ câu hỏi các mức (hiển thị badge tổng hợp).

### 3.2. Soạn đề theo ma trận

- Form admin tạo đề: chọn mức độ cho từng câu; hiển thị bảng ma trận đếm số câu mỗi mức (vd 40% NB / 30% TH / 20% VD / 10% VDC — tỉ lệ phổ biến của đề thật) để giáo viên tự cân đối.
- Tùy chọn "tạo đề ngẫu nhiên từ ngân hàng câu hỏi theo ma trận": chọn Chương + số câu mỗi mức → hệ thống random từ Question bank. (Cần tách Question khỏi Quiz thành ngân hàng câu hỏi dùng chung — làm ở bước này luôn để tránh migrate 2 lần.)

### 3.3. Hiển thị & luyện tập theo mức

- Badge độ khó dạng pill (đúng design system mục 7.4 CLAUDE.md): NB xanh lá nhạt, TH vàng nhạt, VD cam nhạt, VDC đỏ nhạt.
- Kết quả bài làm: thống kê đúng/sai **theo từng mức độ** ("Em đúng 9/10 câu Nhận biết nhưng chỉ 1/3 câu Vận dụng") — đây là thông tin giá trị nhất cho cả học sinh lẫn giáo viên.
- Dashboard học sinh: biểu đồ mức độ thành thạo theo Chương × Mức độ; gợi ý "nên luyện thêm Vận dụng chương X".
- Chế độ "Luyện theo mức": học sinh tự chọn Chương + mức độ, làm bài không tính giờ, không lưu điểm chính thức (giống game — giảm áp lực).

---

## Giai đoạn 4 — Độ chính xác nội dung (quan trọng nhất với web học tập)

Nguồn chuẩn đối chiếu: **SGK Kết nối tri thức** (+ file thô trong `Tài liệu/` khi cần).

### 4.1. Kiểm tra tự động (validation script)

Viết `scripts/validate-content.ts` chạy được bất cứ lúc nào trên DB/seed, kiểm tra máy làm được:

- `correctIndex` nằm trong phạm vi `choices`, không có 2 choices trùng nhau, không có câu hỏi trùng lặp.
- Công thức hóa học parse được qua `lib/chem.ts` (ký hiệu nguyên tố hợp lệ, không gõ Unicode subscript tay — phải để `<ChemicalFormula>` render).
- **Cân bằng phương trình**: parser đếm nguyên tử 2 vế của mọi phương trình xuất hiện trong nội dung/đáp án — sai hệ số là lỗi hay gặp nhất và máy bắt được 100%.
- Khối lượng mol trong lời giải khớp bảng nguyên tử khối chuẩn (hard-code bảng ~40 nguyên tố phổ thông vào `lib/chem.ts`).
- Chạy validation trong CI/pre-commit hoặc đơn giản là trước mỗi lần seed.

### 4.2. Quy trình duyệt nội dung (con người)

- Thêm trạng thái `published Boolean @default(false)` cho Document/Quiz/FlashcardSet: nội dung mới soạn ở dạng nháp, học sinh chỉ thấy nội dung đã duyệt. Giáo viên xem lại → bấm "Xuất bản".
- Nội dung AI hỗ trợ soạn **luôn** vào trạng thái nháp, không bao giờ publish thẳng.

### 4.3. Skill hỗ trợ soạn nội dung (từ plan cũ, giữ nguyên)

Tạo Skill Claude (dùng `skill-creator`) cho quy trình soạn: đối chiếu số liệu/phương trình với SGK Kết nối tri thức trước khi ghi vào seed; kiểm tra các lỗi hay gặp (hệ số cân bằng, hóa trị, mol, correctIndex); **trả về danh sách điểm nghi ngờ để giáo viên xác nhận** thay vì tự sửa âm thầm. Bổ sung vào skill: bảng nguyên tử khối + hóa trị chuẩn, thuật ngữ đúng theo chương trình 2018 (vd "sulfur" thay "lưu huỳnh" ở tên nguyên tố tiếng Anh, danh pháp IUPAC mới mà SGK KNTT đang dùng).

### 4.4. AI hỏi đáp chính xác hơn

- Bổ sung vào system prompt: yêu cầu AI dùng danh pháp theo SGK KNTT/GDPT 2018, luôn viết phương trình đã cân bằng, và **nói rõ khi không chắc chắn** thay vì đoán.
- Cân nhắc (sau này): nhét nội dung bài học liên quan vào context khi học sinh hỏi (RAG đơn giản theo Chương học sinh đang học) — chính xác hơn hẳn vì AI trả lời bám sát tài liệu của chính lớp học.

---

## Giai đoạn 5 — Roadmap mở rộng & thu phí (giữ từ plan cũ, chưa làm)

Chỉ quay lại khi quyết định mở rộng thật:

1. Luồng đăng ký học sinh mới (form tự đăng ký + admin duyệt).
2. Thanh toán (MoMo/VNPay hoặc Stripe) — mô hình giá và nghĩa vụ thuế/pháp lý bạn cần tự quyết/tự kiểm tra.
3. SQLite → PostgreSQL (Supabase) khi có hàng chục người dùng đồng thời.
4. Giới hạn chi phí AI theo tháng/gói thay vì chỉ rate-limit theo phút.

---

## Thứ tự triển khai đề xuất

1. **Giai đoạn 1** — sửa tính giờ server + unit test (lỗi thật, nhỏ, xong nhanh).
2. **Giai đoạn 2** — schema Chapter + migrate dữ liệu + UI phân cấp (nền tảng cho mọi thứ sau).
3. **Giai đoạn 3** — độ khó 4 mức + ngân hàng câu hỏi + thống kê theo mức (phụ thuộc Giai đoạn 2 vì random đề cần lọc theo Chương).
4. **Giai đoạn 4.1 + 4.2** — validation script + trạng thái nháp/xuất bản (làm song song Giai đoạn 3 được).
5. **Giai đoạn 4.3 + 4.4** — Skill soạn nội dung + cải thiện AI (độc lập, làm bất cứ lúc nào).
6. Commit git sau mỗi giai đoạn; cập nhật PROJECT_STATUS.md khi xong mỗi mục.

Nguyên tắc xuyên suốt: đúng tinh thần CLAUDE.md — không over-engineer (không RAG phức tạp ngay, không review workflow nhiều bước), nhưng **không thỏa hiệp về độ chính xác nội dung** vì đây là công cụ học tập.
