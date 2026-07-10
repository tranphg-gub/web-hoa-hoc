"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { registerStudent } from "./actions";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await registerStudent(formData);
      } catch (err) {
        const digest = (err as { digest?: string })?.digest;
        if (digest?.startsWith("NEXT_REDIRECT")) {
          throw err;
        }
        setError(err instanceof Error ? err.message : "Đăng ký thất bại, vui lòng thử lại.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Họ và tên</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="grade">Lớp</Label>
        <select
          id="grade"
          name="grade"
          required
          defaultValue=""
          className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
        >
          <option value="" disabled>
            Chọn lớp
          </option>
          {[6, 7, 8, 9, 10, 11, 12].map((g) => (
            <option key={g} value={g}>
              Lớp {g}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="username">Tên đăng nhập</Label>
        <Input id="username" name="username" autoComplete="username" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input id="password" name="password" type="password" minLength={6} autoComplete="new-password" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="paymentNote">Ghi chú chuyển khoản (tùy chọn)</Label>
        <Input
          id="paymentNote"
          name="paymentNote"
          placeholder="Vd: mã giao dịch, thời gian chuyển khoản..."
        />
      </div>

      {error && <p className="text-sm text-danger-fg">{error}</p>}

      <Button type="submit" className="mt-2 w-full" disabled={isPending}>
        {isPending ? "Đang đăng ký..." : "Đăng ký"}
      </Button>
    </form>
  );
}
