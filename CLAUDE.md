# CLAUDE.md

Hướng dẫn cho Claude Code khi làm việc trong dự án này.

> **Cập nhật 2026-07-10**: Người dùng đã yêu cầu mở rộng phạm vi vượt ngoài các non-goal ở mục 13 (học phí, cộng đồng/bảng xếp hạng, diễn đàn, phân luồng học tập bằng AI, public deploy, đóng gói app). Xem `KE_HOACH_MO_RONG.md` để biết kế hoạch chi tiết và các ràng buộc an toàn tự đặt ra (không tích hợp cổng thanh toán thật, không tự public deploy một mình, bảng xếp hạng chỉ nội bộ). Các mục ở phần 13 liên quan đến thanh toán/cộng đồng coi như đã được ghi đè có chủ đích — phần còn lại của tài liệu này (kiến trúc, design system, quy ước code) vẫn giữ nguyên giá trị.

## 1. Tổng quan dự án

Website học tập môn **Hóa học lớp 8–12**, phục vụ nhóm nhỏ học sinh (**< 10 người**, tài khoản do giáo viên/admin tạo sẵn thủ công, không có đăng ký công khai). Mục tiêu: một công cụ gọn nhẹ, cá nhân hóa, giúp học sinh học lý thuyết, luyện đề có tính giờ, ghi nhớ qua trò chơi, và hỏi đáp tức thời với AI.

Đây là dự án quy mô nhỏ (cá nhân/gia sư dùng cho lớp học riêng) — mọi quyết định kỹ thuật nên ưu tiên **đơn giản, dễ bảo trì, chi phí vận hành thấp**, không tối ưu cho việc mở rộng lớn.

## 2. Đối tượng & phạm vi sử dụng

- Học sinh lớp 8–12, số lượng nhỏ (<10), do giáo viên quản lý thủ công (tạo tài khoản, gán lớp, giao bài).
- 2 vai trò:
  - **Admin/Giáo viên**: tạo/sửa/xoá tài liệu, đề kiểm tra, bộ flashcard/game, xem kết quả và tiến độ từng học sinh, quản lý danh sách tài khoản học sinh.
  - **Học sinh**: xem tài liệu, làm bài kiểm tra, chơi game ghi nhớ, hỏi AI, xem lại điểm/lịch sử của chính mình.
- Không cần: đăng ký công khai, quên mật khẩu qua email tự động phức tạp, mạng xã hội/kết bạn, bảng xếp hạng công khai giữa nhiều lớp/trường.

## 3. Tech stack đề xuất

Vì quy mô nhỏ và cần triển khai nhanh, đề xuất mặc định (có thể điều chỉnh khi bắt đầu code):

- **Framework**: Next.js (App Router) + TypeScript — gộp frontend/backend trong một dự án, dễ deploy (Vercel), phù hợp quy mô nhỏ.
- **UI**: Tailwind CSS + shadcn/ui làm nền tảng component (card, button, badge, dialog...) rồi tuỳ biến theo design system ở mục 7. shadcn/ui phù hợp vì component tối giản, dễ style lại, đúng tinh thần "minimal, khoa học".
- **Database**: SQLite (qua Prisma ORM) — đủ dùng cho <10 người dùng, không cần server DB riêng. Có thể nâng cấp lên PostgreSQL (Supabase) nếu sau này cần truy cập từ nhiều nơi/backup dễ hơn.
- **Auth**: Auth.js (NextAuth) với **Credentials provider** (username/password do giáo viên cấp) — không cần OAuth/mạng xã hội. Mật khẩu hash bằng bcrypt.
- **AI hỏi đáp**: Anthropic API (Claude) qua server route riêng (không gọi thẳng từ client để giữ API key an toàn). Vì số lượng người dùng nhỏ, không cần cấu trúc queue phức tạp — rate limit đơn giản theo user là đủ.
- **Hosting**: Vercel (frontend + API routes) hoặc VPS nhỏ nếu muốn tự chủ dữ liệu học sinh.
- **Testing**: không cần bộ test coverage lớn; ưu tiên test thủ công qua trình duyệt cho các luồng chính (đăng nhập, làm bài tính giờ, chấm điểm, chat AI). Có thể thêm vài unit test cho logic chấm điểm và tính giờ vì đây là phần dễ sai và khó phát hiện bằng mắt.

> Nếu người dùng đã có stack khác đang dùng/quen thuộc, ưu tiên theo stack đó — phần này chỉ là gợi ý mặc định hợp lý cho quy mô dự án.

## 4. Cấu trúc thư mục đề xuất

```
app/
  (auth)/login/                 # trang đăng nhập
  (student)/
    dashboard/                  # tổng quan: tiến độ, bài sắp tới
    documents/[grade]/[topic]/  # tài liệu học tập theo lớp/chủ đề
    quizzes/[quizId]/           # làm bài kiểm tra (có timer)
    quizzes/[quizId]/result/    # xem lại kết quả
    games/[gameId]/             # trò chơi ghi nhớ
    ask-ai/                     # giao diện chat AI
  (admin)/
    admin/documents/            # CRUD tài liệu
    admin/quizzes/              # CRUD đề kiểm tra + câu hỏi
    admin/games/                # CRUD bộ flashcard/game
    admin/students/             # quản lý tài khoản học sinh, xem tiến độ
  api/
    ai/chat/route.ts            # proxy gọi Anthropic API
    quizzes/[id]/submit/route.ts
components/
  ui/                           # shadcn/ui base components đã tuỳ biến theo design system
  chemistry/                    # ChemicalFormula, ReactionEquation, PeriodicTableMini...
  quiz/                         # Timer, QuestionCard, ResultSummary
  games/                        # FlashcardDeck, MatchingGame, QuickQuiz
lib/
  auth.ts
  prisma.ts
  ai/systemPrompt.ts            # system prompt cho AI gia sư hóa học
prisma/
  schema.prisma
```

## 5. Các module chức năng chính

### 5.1. Tài liệu học tập
- Tổ chức theo **Lớp (8–12) → Chương → Bài/Chủ đề**.
- Mỗi tài liệu: tiêu đề, nội dung lý thuyết (rich text, hỗ trợ công thức hóa học), có thể đính kèm hình ảnh (sơ đồ, bảng tuần hoàn, mô hình phân tử), ví dụ minh họa, bài tập áp dụng nhanh cuối bài.
- Học sinh có thể đánh dấu "đã học" để theo dõi tiến độ cá nhân trên dashboard.
- Giáo viên (admin) có giao diện tạo/sửa tài liệu (không cần WYSIWYG phức tạp — markdown mở rộng hỗ trợ ký hiệu hóa học là đủ).

### 5.2. Bài kiểm tra có tính giờ
- Đề gồm câu trắc nghiệm (nhiều lựa chọn) và có thể có câu tự luận ngắn (tự chấm bằng cách so sánh đáp án mẫu, hoặc admin chấm tay).
- Cấu hình mỗi đề: thời gian làm bài, số câu, lớp áp dụng, độ khó.
- Đồng hồ đếm ngược hiển thị rõ, cảnh báo khi còn ít thời gian (ví dụ đổi màu khi <2 phút).
- Hết giờ tự động nộp bài.
- Sau khi nộp: hiển thị điểm, số câu đúng/sai, xem lại từng câu kèm giải thích đáp án đúng (nếu admin có nhập giải thích).
- Lưu lịch sử các lần làm bài để học sinh/giáo viên xem tiến bộ theo thời gian.

### 5.3. Trò chơi ghi nhớ
Đề xuất tối thiểu 2–3 dạng game, dữ liệu dùng chung một "bộ thẻ" (term + definition/formula):
- **Flashcard lật thẻ**: xem mặt trước (tên nguyên tố/hợp chất), lật xem mặt sau (ký hiệu, hóa trị, công thức). Có nút "nhớ rồi / chưa nhớ" để lặp lại thẻ khó (spaced repetition đơn giản).
- **Ghép cặp (matching)**: kéo/click ghép tên ↔ ký hiệu hoặc công thức ↔ tên gọi, tính giờ + đếm số lượt sai.
- **Đố nhanh (quick quiz)**: câu hỏi trắc nghiệm ngắn random từ bộ thẻ, dạng "chạy đua với thời gian" để tạo cảm giác trò chơi hơn là bài kiểm tra.
- Kết quả chơi game chỉ mang tính luyện tập, không tính vào điểm số chính thức — mục đích là ghi nhớ, giảm áp lực.

### 5.4. AI hỏi đáp
- Chatbox cho học sinh hỏi tự do về hóa học (lý thuyết, cách giải bài tập, giải thích khái niệm).
- AI đóng vai **gia sư**: ưu tiên gợi mở, giải thích từng bước, khuyến khích học sinh tự suy nghĩ thay vì chỉ đưa đáp số cuối cùng (đặc biệt với bài tập có trong đề kiểm tra — tránh AI trở thành công cụ "giải hộ" trong lúc đang thi).
- Có system prompt riêng (xem mục 9) giới hạn phạm vi trả lời trong môn Hóa học, phù hợp lứa tuổi lớp 8–12.
- Lưu lịch sử chat theo từng học sinh để giáo viên có thể xem lại (minh bạch, hỗ trợ giám sát vì đây là nhóm học sinh nhỏ giáo viên quản lý trực tiếp).

## 6. Data model đề xuất (Prisma-style, tham khảo)

```prisma
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String   // hashed
  name      String
  role      Role     // ADMIN | STUDENT
  grade     Int?     // 8-12, chỉ áp dụng cho STUDENT
  createdAt DateTime @default(now())
  quizAttempts QuizAttempt[]
  chatMessages ChatMessage[]
}

model Document {
  id       String @id @default(cuid())
  grade    Int
  chapter  String
  title    String
  content  String   // markdown mở rộng, hỗ trợ cú pháp công thức hóa học
  order    Int
}

model Quiz {
  id         String     @id @default(cuid())
  title      String
  grade      Int
  durationSec Int
  questions  Question[]
  attempts   QuizAttempt[]
}

model Question {
  id            String   @id @default(cuid())
  quizId        String
  content       String
  choices       Json     // ["A. ...", "B. ...", ...]
  correctIndex  Int
  explanation   String?
}

model QuizAttempt {
  id         String   @id @default(cuid())
  userId     String
  quizId     String
  startedAt  DateTime
  submittedAt DateTime?
  answers    Json     // { questionId: chosenIndex }
  score      Float?
}

model FlashcardSet {
  id    String @id @default(cuid())
  grade Int
  topic String
  cards Flashcard[]
}

model Flashcard {
  id    String @id @default(cuid())
  setId String
  term  String   // vd: "NaCl"
  meaning String // vd: "Natri clorua (muối ăn)"
}

model ChatMessage {
  id        String   @id @default(cuid())
  userId    String
  role      String   // user | assistant
  content   String
  createdAt DateTime @default(now())
}

enum Role {
  ADMIN
  STUDENT
}
```

## 7. Design system chi tiết

Phong cách tham chiếu: **interfere.com_.png** — tối giản, hiện đại, khoa học, chuyên nghiệp (dạng SaaS/dashboard cao cấp, không phải giao diện "trẻ em học tập" nhiều màu sắc).

### 7.1. Màu sắc
- Nền chính: trắng tinh (`#FFFFFF`) hoặc xám rất nhạt (`#FAFAFA`).
- Nền phụ/section xen kẽ: `#F5F5F7`.
- Viền card: xám nhạt `#E5E5E8` (1px, không dùng shadow đậm).
- Chữ chính: gần đen `#161618`.
- Chữ phụ: xám `#6B6B70`.
- Accent gradient (chỉ dùng cho hero, nút CTA chính, blob trang trí nền, tối đa 1–2 khu vực/trang): dải hồng-tím-xanh nhạt pastel, ví dụ `from-[#FFD9E8] via-[#E5D4FF] to-[#D4E9FF]`, độ mờ thấp (opacity/blur cao) để không lấn nội dung.
- Trạng thái: Đúng/thành công dùng xanh lá nhạt, Sai/cảnh báo dùng đỏ cam nhạt, Đang làm/pending dùng vàng nhạt — tất cả dạng pill nền nhạt + chữ đậm cùng tông, không dùng màu chói.

### 7.2. Typography
- Font chính: sans-serif hiện đại (Inter, Geist, hoặc tương đương) cho toàn bộ UI và nội dung.
- Điểm nhấn tiêu đề: 1 từ/cụm từ trong heading lớn có thể dùng kiểu nghiêng (italic) hoặc font serif nhẹ xen kẽ (giống chữ "breaks" nghiêng trong ảnh mẫu) — dùng có chọn lọc ở landing/dashboard header, không lạm dụng trong toàn bộ nội dung học tập.
- Công thức hóa học, phương trình phản ứng, code/markdown kỹ thuật: font monospace, đặt trong card riêng nền `#F5F5F7`, viền mảnh.
- Kích thước: heading lớn 32–48px đậm (bold/semibold), body 14–16px, phụ chú 12–13px màu xám phụ.

### 7.3. Spacing, bo góc, shadow
- Bo góc: card lớn `rounded-2xl` (16px), button/badge `rounded-full` (pill).
- Khoảng cách: padding card 24–32px, khoảng cách giữa các section 64–96px (whitespace rộng rãi, không nhồi nhét).
- Shadow: rất nhẹ hoặc không có (`shadow-sm`), ưu tiên viền 1px thay vì đổ bóng để tạo cảm giác phẳng, sạch.

### 7.4. Component conventions
- **Button chính**: nền đen/xám đậm, chữ trắng, bo pill, hover chuyển nhẹ sang xám đậm hơn.
- **Button phụ**: nền trong suốt, viền mảnh, chữ đen.
- **Badge trạng thái**: pill nhỏ, nền nhạt + chữ đậm cùng tông màu (vd độ khó Dễ/Trung bình/Khó; trạng thái Đã nộp/Đang làm/Hết giờ).
- **Card**: viền 1px `#E5E5E8`, bo góc lớn, không icon minh họa màu mè — icon nếu có thì đơn sắc, tối giản (outline style).
- **Transition**: 150–250ms ease, không hiệu ứng nảy/bounce mạnh.
- Ưu tiên dùng Tailwind CSS + token ở trên để nhất quán, tránh style rời rạc từng trang.

## 8. Yêu cầu kỹ thuật đặc thù cho nội dung Hóa học

- Công thức hóa học và phương trình phản ứng phải hiển thị đúng định dạng khoa học: subscript cho chỉ số nguyên tử (H₂O, CaCO₃), mũi tên phản ứng `→`, điều kiện phản ứng (nhiệt độ, xúc tác) ghi phía trên mũi tên khi cần. Input có thể cho phép gõ dạng thường (H2O, ->) rồi tự động convert sang hiển thị khoa học — không bắt học sinh/giáo viên tự gõ ký tự Unicode subscript.
- Nên có 1 component dùng chung `<ChemicalFormula>` / `<ReactionEquation>` để đảm bảo hiển thị nhất quán mọi nơi (tài liệu, câu hỏi, flashcard, phản hồi AI).
- Dữ liệu câu hỏi/đề/flashcard tách khỏi code (DB, không hardcode trong component) để giáo viên cập nhật qua giao diện admin mà không cần sửa code.

## 9. Bài kiểm tra tính giờ — chi tiết logic

- Khi bắt đầu làm bài: ghi `startedAt` (server time) vào `QuizAttempt`, không chỉ dựa vào `setInterval` phía client.
- Thời gian còn lại luôn tính lại từ `durationSec - (now - startedAt)` mỗi lần render/mount — để nếu học sinh refresh hoặc rời tab quay lại, đồng hồ vẫn đúng, không bị reset hay "cheat" bằng cách tải lại trang.
- Nộp bài: server kiểm tra `submittedAt` so với `startedAt + durationSec`; nếu vượt quá thời gian cho phép (có thể cho buffer vài giây do độ trễ mạng), vẫn chấp nhận nộp nhưng đánh dấu "nộp trễ"/tự động khóa câu trả lời tại thời điểm hết giờ.
- Vì nhóm học sinh nhỏ và tin cậy, **không cần** cơ chế chống gian lận nặng (khóa tab, giám sát webcam...) — chỉ cần tính giờ chính xác và đáng tin cậy là đủ.

## 10. AI hỏi đáp — chi tiết triển khai

- Gọi Anthropic API từ **server route**, không expose API key ra client.
- System prompt gợi ý (điều chỉnh khi code thật):
  > "Bạn là gia sư Hóa học thân thiện cho học sinh lớp 8–12. Luôn giải thích từng bước, khuyến khích học sinh tự suy luận thay vì chỉ đưa đáp số. Nếu câu hỏi liên quan đến bài kiểm tra đang làm, gợi ý cách tiếp cận thay vì giải trọn vẹn. Dùng ngôn ngữ đơn giản, phù hợp lứa tuổi. Chỉ trả lời trong phạm vi môn Hóa học; nếu ngoài phạm vi, nhắc nhở nhẹ nhàng và hướng học sinh quay lại chủ đề học tập."
- Vì quy mô nhỏ (<10 người), không cần rate-limit phức tạp hay hàng đợi — giới hạn đơn giản (vd tối đa N tin nhắn/phút/user) để tránh lỗi phát sinh do spam nhầm là đủ.
- Lưu lịch sử chat theo user để giáo viên xem lại nếu cần (minh bạch, hỗ trợ giám sát học tập).

## 11. Authentication & phân quyền

- 2 role: `ADMIN` (giáo viên) và `STUDENT`.
- Tài khoản học sinh do admin tạo trong trang quản lý (`/admin/students`) — đặt username/mật khẩu ban đầu, học sinh có thể đổi mật khẩu sau khi đăng nhập lần đầu.
- Không cần đăng ký công khai, không cần xác thực email/OTP.
- Route `(admin)/*` chỉ truy cập được bởi role ADMIN; route `(student)/*` cần đăng nhập (cả 2 role có thể xem, nhưng giao diện admin ẩn với student).

## 12. Quy mô & ràng buộc dự án

- Số người dùng nhỏ (<10 học sinh) → **không cần** thiết kế cho khả năng mở rộng lớn: không cần queue, cache phân tán, multi-tenant, load balancing.
- Không cần hệ thống đăng ký công khai/quên mật khẩu tự động phức tạp.
- Tránh over-engineering: không thêm microservices, không thêm abstraction cho tính năng chưa được yêu cầu, không tối ưu sớm cho lượng truy cập lớn.

## 13. Việc KHÔNG làm (non-goals)

Để tránh Claude tự thêm tính năng thừa khi code:
- Không cần đa ngôn ngữ (i18n) — chỉ tiếng Việt.
- Không cần ứng dụng di động riêng — web responsive là đủ.
- Không cần thanh toán/gói trả phí.
- Không cần mạng xã hội, kết bạn, bảng xếp hạng công khai liên trường.
- Không cần real-time collaboration (nhiều người sửa cùng lúc) cho phần admin.
- Không cần chống gian lận phức tạp cho bài kiểm tra (khóa màn hình, webcam...).

## 14. Quy ước code

- TypeScript strict mode, tránh `any`.
- Component đặt tên theo chức năng rõ ràng (`ChemicalFormula`, `QuizTimer`, `FlashcardDeck`), không viết tắt khó hiểu.
- Không viết comment giải thích code làm gì (tên biến/hàm đã đủ rõ) — chỉ comment khi có lý do ẩn, không hiển nhiên (vd: vì sao tính lại thời gian từ server thay vì client).
- Dữ liệu mẫu/seed nên phản ánh nội dung Hóa học thật (không dùng "Lorem ipsum") để dễ kiểm tra hiển thị công thức/ký hiệu đúng ngay từ đầu.

## 15. Ngôn ngữ

- Giao diện: tiếng Việt.
- Thuật ngữ hóa học giữ ký hiệu quốc tế chuẩn (nguyên tố, công thức hóa học viết đúng chuẩn IUPAC/SGK Việt Nam).
