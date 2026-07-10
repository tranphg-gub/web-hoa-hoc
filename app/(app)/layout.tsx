import Link from "next/link";
import { auth } from "@/lib/auth";
import { SidebarNav } from "@/components/app-shell/sidebar-nav";
import { LogoutButton } from "@/components/app-shell/logout-button";
import { Badge } from "@/components/ui/badge";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <div className="flex flex-1">
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-border-subtle px-5 py-6 md:flex">
        <div>
          <div className="mb-8 px-2 text-sm font-semibold tracking-tight">
            Hóa Học Cùng Em
          </div>
          <SidebarNav isAdmin={isAdmin} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-2">
            <span className="text-sm font-medium">{session?.user.name}</span>
            <Badge tone="neutral">
              {isAdmin ? "Giáo viên" : `Lớp ${session?.user.grade ?? "-"}`}
            </Badge>
          </div>
          <Link
            href="/change-password"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-background-subtle"
          >
            Đổi mật khẩu
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex flex-col gap-3 border-b border-border-subtle px-5 py-4 md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">
              Hóa Học Cùng Em
            </span>
            <LogoutButton />
          </div>
          <div className="-mx-1 overflow-x-auto">
            <div className="flex w-max gap-1 px-1">
              <SidebarNav isAdmin={isAdmin} direction="row" />
            </div>
          </div>
        </header>
        <main className="flex-1 px-5 py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  );
}
