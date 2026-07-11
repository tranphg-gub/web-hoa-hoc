"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

type LoginAs = "STUDENT" | "ADMIN";

const COPY: Record<LoginAs, { description: string; usernameLabel: string; defaultCallback: string }> = {
  STUDENT: {
    description: "Đăng nhập bằng tài khoản do giáo viên cấp cho bạn.",
    usernameLabel: "Tên đăng nhập học sinh",
    defaultCallback: "/dashboard",
  },
  ADMIN: {
    description: "Đăng nhập bằng tài khoản quản trị/giáo viên.",
    usernameLabel: "Tên đăng nhập giáo viên",
    defaultCallback: "/admin",
  },
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const explicitCallbackUrl = searchParams.get("callbackUrl");

  const passwordChanged = searchParams.get("passwordChanged") === "1";

  const [loginAs, setLoginAs] = useState<LoginAs>("STUDENT");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Sai tên đăng nhập hoặc mật khẩu.");
        return;
      }

      const session = await getSession();
      const actualRole = session?.user?.role;

      const target =
        explicitCallbackUrl ||
        (actualRole ? COPY[actualRole].defaultCallback : COPY[loginAs].defaultCallback);
      router.push(target);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-2 rounded-full border border-border-subtle bg-background-subtle p-1">
        {(["STUDENT", "ADMIN"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setLoginAs(option)}
            className={
              loginAs === option
                ? "rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors"
                : "rounded-full px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
            }
          >
            {option === "STUDENT" ? "Học sinh" : "Giáo viên"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-sm text-foreground-muted">{COPY[loginAs].description}</p>

        {passwordChanged && (
          <p className="text-sm text-success-fg">
            Đổi mật khẩu thành công, hãy đăng nhập lại.
          </p>
        )}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="username">{COPY[loginAs].usernameLabel}</Label>
          <Input
            id="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-danger-fg">{error}</p>}

        <Button type="submit" className="mt-2 w-full" disabled={isPending}>
          {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>
    </div>
  );
}
