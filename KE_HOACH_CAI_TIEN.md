# Kế hoạch chỉnh sửa & cải tiến — Hóa Học Cùng Em

_Dựa trên việc đọc trực tiếp code hiện tại (không chỉ dựa vào PROJECT_STATUS.md) ngày 2026-07-10._

## Phát hiện quan trọng: PROJECT_STATUS.md đang ghi sai một số điểm

Status doc ghi "middleware chặn route theo vai trò" nhưng thực tế **không có file `middleware.ts`** trong source (chỉ có bản build cũ trong `.next/`). Việc phân quyền hiện chỉ nằm rải rác trong từng file, và có lỗ hổng thật sự — chi tiết bên dưới.

---

## Ưu tiên 1 — Lỗ hổng phân quyền (nên sửa trước tiên)

**Vấn đề:** 4 trang admin sau **không hề gọi `auth()` hay kiểm tra role** trước khi truy vấn và render dữ liệu:
- `app/(app)/admin/documents/page.tsx`
- `app/(app)/admin/quizzes/page.tsx`
- `app/(app)/admin/flashcards/page.tsx`
- `app/(app)/admin/students/page.tsx`

Các server actions (`createStudent`, `deleteQuiz`...) có kiểm tra `role !== "ADMIN"` và throw lỗi — nhưng đó chỉ chặn *hành động ghi*. Việc **đọc** thì không chặn: bất kỳ học sinh nào đã đăng nhập, chỉ cần gõ thẳng URL `/admin/students`, đều xem được toàn bộ danh sách học sinh, đề kiểm tra (kèm đáp án đúng), form tạo/sửa tài liệu...

**Nguyên nhân gốc:** không có `middleware.ts` toàn cục, và layout `app/(app)/layout.tsx` chỉ ẩn link admin trên sidebar (`isAdmin` dùng để hiện/ẩn UI) chứ không redirect.

**Cách sửa đề xuất:**
1. Thêm `middleware.ts` ở root: dùng `auth()` (NextAuth v5 hỗ trợ middleware qua `auth` export) để
   - Chưa đăng nhập → redirect `/login`.
   - Đã đăng nhập nhưng role `STUDENT` mà vào `/admin/*` → redirect `/dashboard`.
2. Đồng thời thêm guard ở đầu mỗi trang `admin/*/page.tsx` (defense-in-depth, phòng trường hợp middleware bị bypass hoặc cấu hình matcher sai) — 3 dòng giống `requireAdmin()` đã có trong `actions.ts`, tách thành hàm dùng chung trong `lib/auth.ts`.

**Việc cần làm khi triển khai:** viết `requireAdmin()`/`requireUser()` dùng chung trong `lib/auth.ts`, thay `session!.user` (non-null assertion) bằng redirect thật ở mọi page — hiện nhiều trang (`dashboard`, `documents`, `games`, `documents/[id]`) dùng `session!.user.id` nên nếu không có session sẽ **crash** thay vì chuyển hướng về `/login`.

---

## Ưu tiên 2 — Tính giờ bài kiểm tra chưa thực sự chống gian lận phía server

CLAUDE.md mục 9 yêu cầu rõ: server phải so `submittedAt` với `startedAt + durationSec` và khóa câu trả lời/đánh dấu nộp trễ khi hết giờ.

Thực tế trong `app/(app)/quizzes/actions.ts`:
- `saveQuizAnswer` — không kiểm tra thời gian, lưu bất kể đã hết giờ hay chưa.
- `submitQuizAttempt` — chấm điểm ngay khi gọi, không so `now` với `startedAt + durationSec`.

Việc tự nộp khi hết giờ **chỉ chạy ở client** (`setInterval` trong `quiz-runner.tsx`). Học sinh chỉ cần tạm dừng tab/tắt JS là có thể trả lời quá giờ mà vẫn được tính điểm đầy đủ — đúng kiểu rủi ro mà mục 9 muốn tránh.

**Cách sửa:** trong cả hai action, tính `deadline = attempt.startedAt.getTime() + quiz.durationSec * 1000 + bufferMs` (buffer vài giây do độ trễ mạng); nếu `Date.now() > deadline` thì `saveQuizAnswer` bỏ qua (không lưu thêm), và `submitQuizAttempt` chấm điểm dựa trên đáp án đã lưu tại thời điểm hết giờ, đánh dấu thêm cờ `late: true` nếu cần hiển thị "nộp trễ".

---

## Ưu tiên 3 — Chưa có version control

Thư mục dự án **không phải git repo** (`git status` báo "not a git repository"). Có `.gitignore` soạn sẵn nhưng chưa từng `git init`. Nghĩa là toàn bộ lịch sử sửa đổi hiện không được lưu — rủi ro mất code nếu thao tác nhầm.

Lưu ý: `.gitignore` hiện **chưa loại trừ thư mục `Tài liệu/`** (~4GB tài liệu thô). Nếu `git init` ngay bây giờ mà không sửa `.gitignore` trước, lần commit đầu sẽ kéo theo toàn bộ 4GB đó vào repo.

**Cách sửa:** thêm `/Tài liệu/` và `interfere.com_.png` (ảnh tham chiếu design, không phải asset cần deploy) vào `.gitignore`, rồi `git init` + commit đầu tiên.

---

## Ưu tiên 4 — Việc còn thiếu (đã biết, giữ nguyên trong roadmap)

Những mục PROJECT_STATUS.md đã tự liệt kê đúng, không cần điều tra thêm, nhắc lại để đưa vào kế hoạch:

- Điền `ANTHROPIC_API_KEY` thật vào `.env` và test luồng chat AI đầu-cuối (route đã code đúng, có rate-limit đơn giản 15 req/phút/user hợp lý với quy mô <10 người — phần này ổn, không cần sửa).
- Chưa có unit test cho logic chấm điểm/tính giờ — CLAUDE.md mục 3 khuyến nghị nên có vì "dễ sai và khó phát hiện bằng mắt". Nên thêm cùng lúc với việc sửa Ưu tiên 2 (test sẽ tự nhiên bọc quanh logic mới sửa).
- Chưa có backup tự động cho `prisma/dev.db`.
- Loại `Tài liệu/` khỏi phạm vi deploy (Vercel) — xử lý cùng lúc với Ưu tiên 3.

---

## Ưu tiên 5 — Skill hỗ trợ soạn tài liệu chính xác (làm được ngay)

Bạn muốn có một **Skill Claude** (dùng trong Cowork/Claude Code) để tăng độ chính xác khi soạn/tra tài liệu, câu hỏi, flashcard mới — thay vì tự nhớ và dễ gõ sai số liệu, công thức.

**Skill này nên làm gì khi được gọi:**
- Khi soạn nội dung mới (bài học, câu hỏi trắc nghiệm, flashcard) cho một chủ đề Hóa học, đối chiếu số liệu/công thức/phương trình với nguồn tham khảo đáng tin (SGK Kết nối tri thức, hoặc file thô trong `Tài liệu/`) trước khi ghi vào seed script.
- Kiểm tra các lỗi hay gặp: cân bằng phương trình sai hệ số, nhầm hóa trị/khối lượng mol, đáp án đúng (`correctIndex`) không khớp với `choices`, công thức không hiển thị đúng chuẩn subscript (phải qua component `<ChemicalFormula>` chứ không gõ Unicode tay).
- Trả về danh sách các điểm nghi ngờ cần người soạn (bạn) xác nhận lại, thay vì tự ý sửa âm thầm — vì đây là nội dung học thuật, sai sót ảnh hưởng trực tiếp đến học sinh.

**Cách tạo:** dùng skill `skill-creator` có sẵn để dựng khung `SKILL.md`, sau đó tinh chỉnh phần kiểm tra chuyên biệt cho Hóa học (danh sách nguyên tố/hóa trị chuẩn, mẫu phương trình phổ biến theo từng lớp 8–12). Đây là việc làm ngay được, không phụ thuộc vào các ưu tiên sửa lỗi ở trên.

---

## Ưu tiên 6 (roadmap tương lai — chưa cần làm ngay) — Mở rộng quy mô & thu phí

Hiện tại bạn chỉ có vài học sinh nhỏ lẻ, sau này muốn mở rộng và **thu một khoản phí nhỏ**. Việc này kéo theo thay đổi vượt ra ngoài phạm vi "nhóm nhỏ <10 người, admin tạo tài khoản thủ công" mà CLAUDE.md hiện đang định hướng — nên **không cần đổi kiến trúc ngay bây giờ**, nhưng cần lưu lại để không phải thiết kế lại từ đầu:

1. **Luồng đăng ký học sinh mới** — hiện chỉ admin tạo tài khoản thủ công (`/admin/students`); khi mở rộng cần cân nhắc form tự đăng ký (có thể vẫn giữ bước admin duyệt để kiểm soát chất lượng, tránh spam).
2. **Thanh toán** — cần chọn cổng thanh toán phù hợp (vd MoMo/VNPay cho học sinh Việt Nam, hoặc Stripe nếu cần thẻ quốc tế) và mô hình giá (theo tháng/theo khóa học). Đây là quyết định kinh doanh/pháp lý, tôi có thể hỗ trợ mặt kỹ thuật tích hợp nhưng bạn nên tự quyết định mô hình giá và tự kiểm tra nghĩa vụ thuế/pháp lý liên quan (tôi không phải chuyên gia tài chính/pháp lý).
3. **Cân nhắc đổi SQLite → PostgreSQL (Supabase)** khi số người dùng đồng thời tăng — SQLite khóa ghi (write lock) sẽ thành điểm nghẽn khi có hàng chục người dùng cùng lúc làm bài kiểm tra.
4. **Theo dõi chi phí AI chat theo user** — rate-limit hiện tại (15 req/phút/user, in-memory) đủ cho <10 người dùng một instance server; khi thu phí và có nhiều học sinh hơn, nên thêm giới hạn theo tháng/gói để kiểm soát chi phí API.
5. Khi sửa Ưu tiên 1 (guard cho trang admin), nên viết theo hướng **không giả định cố định số lượng nhỏ** (vd không hard-code danh sách học sinh, dùng phân trang thay vì load hết một lần) — để việc mở rộng sau này ít phải sửa lại phần vừa làm.

---

## Thứ tự triển khai đề xuất

1. Sửa `.gitignore` → `git init` + commit đầu tiên (an toàn trước khi đổi gì khác).
2. Thêm `middleware.ts` + `requireAdmin()`/`requireUser()` dùng chung, thay các `session!.user` bằng guard thật — viết theo hướng không giả định số lượng nhỏ cố định (mục Ưu tiên 6.5).
3. Sửa `saveQuizAnswer`/`submitQuizAttempt` để chấm giờ phía server, thêm 1-2 unit test cho hàm tính điểm/tính giờ.
4. Cập nhật lại PROJECT_STATUS.md cho khớp thực tế sau khi sửa (mục "Đăng nhập/phân quyền" đang ghi sai).
5. Điền API key thật, test AI chat.
6. Tạo Skill hỗ trợ soạn nội dung chính xác (độc lập, có thể làm song song hoặc bất cứ lúc nào).
7. Khi thực sự cần mở rộng + thu phí: quay lại Ưu tiên 6, làm từng mục theo thứ tự 1 → 4 ở trên.

Các mục 1–3 là lỗi/rủi ro thật đang tồn tại trong code, nên ưu tiên trước phần nội dung/tính năng mới. Ưu tiên 6 chỉ là roadmap tham khảo, chưa cần triển khai cho tới khi bạn quyết định mở rộng thật.
