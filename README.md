# Hóa Học Cùng Em

Website học Hóa học lớp 6–12 (Next.js App Router + TypeScript + Prisma/PostgreSQL).

- **Bức tranh toàn cảnh hiện tại** (tính năng đã xong, nội dung trong database, việc còn dang dở): xem [`PROJECT_STATUS.md`](./PROJECT_STATUS.md).
- **Quy ước code, kiến trúc, đối tượng sử dụng**: xem [`CLAUDE.md`](./CLAUDE.md).
- **Lịch sử các đợt mở rộng tính năng**: xem [`KE_HOACH_MO_RONG.md`](./KE_HOACH_MO_RONG.md).

## Chạy thử

```bash
npm install
npm run dev           # http://localhost:3000
npx tsc --noEmit      # kiểm tra kiểu
npm run test          # unit test
npm run build         # build production
```

Cần file `.env` với `DATABASE_URL`, `DIRECT_URL` (Supabase Postgres), `AUTH_SECRET`, và `GEMINI_API_KEY` (lấy miễn phí tại https://aistudio.google.com/apikey) để bật các tính năng AI.
