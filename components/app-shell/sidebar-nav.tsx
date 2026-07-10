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
} from "lucide-react";

const studentLinks = [
  { href: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/documents", label: "Tài liệu", icon: BookOpen },
  { href: "/quizzes", label: "Bài kiểm tra", icon: Timer },
  { href: "/games", label: "Trò chơi ghi nhớ", icon: Brain },
  { href: "/leaderboard", label: "Xếp hạng", icon: Trophy },
  { href: "/ask-ai", label: "Hỏi AI", icon: Sparkles },
];

const adminLinks = [
  { href: "/admin/students", label: "Học sinh", icon: Users },
  { href: "/admin/payments", label: "Thanh toán", icon: Wallet },
  { href: "/admin/chapters", label: "Chương", icon: BookMarked },
  { href: "/admin/documents", label: "Tài liệu", icon: FileText },
  { href: "/admin/quizzes", label: "Đề kiểm tra", icon: ListChecks },
  { href: "/admin/flashcards", label: "Bộ flashcard", icon: Layers },
];

export function SidebarNav({
  isAdmin,
  direction = "col",
}: {
  isAdmin: boolean;
  direction?: "col" | "row";
}) {
  const pathname = usePathname();
  const links = isAdmin ? [...studentLinks, ...adminLinks] : studentLinks;

  return (
    <nav className={cn("flex gap-1", direction === "col" ? "flex-col" : "flex-row")}>
      {links.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(link.href + "/");
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
      })}
    </nav>
  );
}
