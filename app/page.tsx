import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ReactionEquation } from "@/components/chemistry/chemical-formula";
import { BookOpen, Timer, Brain, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Tài liệu học tập",
    description:
      "Lý thuyết theo từng lớp 6-12, trình bày công thức và phương trình phản ứng đúng chuẩn khoa học.",
  },
  {
    icon: Timer,
    title: "Bài kiểm tra tính giờ",
    description:
      "Luyện đề trắc nghiệm có đồng hồ đếm ngược, chấm điểm tự động và xem lại lời giải.",
  },
  {
    icon: Brain,
    title: "Trò chơi ghi nhớ",
    description:
      "Flashcard, ghép cặp, đố nhanh giúp ghi nhớ nguyên tố, hóa trị, công thức một cách nhẹ nhàng.",
  },
  {
    icon: Sparkles,
    title: "AI gia sư hỏi đáp",
    description:
      "Hỏi đáp tức thời, giải thích từng bước, khuyến khích tự tư duy thay vì chỉ đưa đáp số.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <span className="text-sm font-semibold tracking-tight">
          Hóa Học Cùng Em
        </span>
        <nav className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="secondary" size="sm">
              Đăng nhập
            </Button>
          </Link>
        </nav>
      </header>

      <section className="relative overflow-hidden px-6 pb-20 pt-16 md:px-12 md:pt-24">
        <div className="hero-gradient pointer-events-none absolute inset-x-0 -top-32 h-[520px]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center rounded-full border border-border-subtle bg-background px-4 py-1.5 text-xs font-medium text-foreground-muted">
            Dành cho học sinh lớp 6 – 12
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Học Hóa học <span className="accent-italic">thật dễ</span>,
            <br />
            nhớ lâu, hiểu sâu
          </h1>
          <p className="mt-6 max-w-xl text-base text-foreground-muted md:text-lg">
            Một không gian học tập gọn gàng: tài liệu rõ ràng, bài kiểm tra
            tính giờ, trò chơi ghi nhớ và AI gia sư luôn sẵn sàng giải đáp.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link href="/login">
              <Button size="lg">Vào học ngay</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {features.map((f) => (
            <Card key={f.title}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-background-subtle">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription className="mt-2">
                {f.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-3xl">
          <Card className="bg-background-subtle">
            <CardTitle>Ví dụ: hiển thị phương trình phản ứng</CardTitle>
            <CardDescription className="mt-2 mb-4">
              Công thức và phương trình luôn hiển thị đúng chuẩn khoa học,
              không cần gõ ký tự đặc biệt.
            </CardDescription>
            <ReactionEquation text="CaCO3 -> CaO + CO2" />
          </Card>
        </div>
      </section>

      <footer className="border-t border-border-subtle px-6 py-8 text-center text-xs text-foreground-muted md:px-12">
        Hóa Học Cùng Em — công cụ học tập dành cho nhóm nhỏ học sinh, do giáo viên quản lý.
      </footer>
    </div>
  );
}
