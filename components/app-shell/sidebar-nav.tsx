"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Timer,
  Brain,
  Sparkles,
  Users,
  FileText,
  ListChecks,
  Layers,
  BookMarked,
  Wallet,
  Trophy,
  MessageSquare,
  PenLine,
  Flag,
} from "lucide-react";

const studentLinks = [
  { href: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/documents", label: "Tài liệu", icon: BookOpen },
  { href: "/practice", label: "Bài tập", icon: PenLine },
  { href: "/quizzes", label: "Bài kiểm tra", icon: Timer },
  { href: "/games", label: "Trò chơi ghi nhớ", icon: Brain },
  { href: "/leaderboard", label: "Xếp hạng", icon: Trophy },
  { href: "/forum", label: "Diễn đàn", icon: MessageSquare },
  { href: "/ask-ai", label: "Hỏi AI", icon: Sparkles },
];

const adminLinks = [
  { href: "/admin/students", label: "Học sinh", icon: Users },
  { href: "/admin/payments", label: "Thanh toán", icon: Wallet },
  { href: "/admin/chapters", label: "Chương", icon: BookMarked },
  { href: "/admin/documents", label: "Quản lý tài liệu", icon: FileText },
  { href: "/admin/practice", label: "Quản lý bài tập", icon: PenLine },
  { href: "/admin/quizzes", label: "Quản lý đề kiểm tra", icon: ListChecks },
  { href: "/admin/flashcards", label: "Bộ flashcard", icon: Layers },
  { href: "/admin/reports", label: "Báo lỗi từ học sinh", icon: Flag },
];

export function SidebarNav({
  isAdmin,
  direction = "col",
}: {
  isAdmin: boolean;
  direction?: "col" | "row";
}) {
  const pathname = usePathname();

  function renderLink(link: (typeof studentLinks)[number]) {
    const active = pathname === link.href || pathname.startsWith(link.href + "/");
    return (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          "flex items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-foreground text-background"
            : "text-foreground-muted hover:bg-background-subtle"
        )}
      >
        <link.icon className="h-4 w-4" strokeWidth={1.75} />
        {link.label}
      </Link>
    );
  }

  if (!isAdmin) {
    return (
      <nav className={cn("flex gap-1", direction === "col" ? "flex-col" : "flex-row")}>
        {studentLinks.map(renderLink)}
      </nav>
    );
  }

  // Tài khoản giáo viên/admin thấy cả 2 nhóm — phân tách rõ bằng heading (chỉ ở sidebar dọc,
  // hàng ngang trên mobile chỉ nối tiếp cho gọn) và đổi tên nhóm quản trị để không trùng chữ
  // với nhóm xem nội dung (VD "Tài liệu" xem vs "Quản lý tài liệu" CRUD).
  return (
    <nav className={cn("flex gap-1", direction === "col" ? "flex-col" : "flex-row")}>
      {direction === "col" && (
        <span className="mb-1 mt-2 px-4 text-xs font-semibold uppercase tracking-wide text-foreground-muted first:mt-0">
          Học tập
        </span>
      )}
      {studentLinks.map(renderLink)}
      {direction === "col" && (
        <span className="mb-1 mt-4 px-4 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
          Quản trị
        </span>
      )}
      {adminLinks.map(renderLink)}
    </nav>
  );
}
