"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-background-subtle"
    >
      <LogOut className="h-4 w-4" strokeWidth={1.75} />
      Đăng xuất
    </button>
  );
}
