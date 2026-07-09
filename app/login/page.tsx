import Link from "next/link";
import { Suspense } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center px-6 py-16">
      <div className="hero-gradient pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="relative w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold tracking-tight"
        >
          Hóa Học Cùng Em
        </Link>
        <Card>
          <CardTitle>Đăng nhập</CardTitle>
          <CardDescription className="mt-1 mb-6">
            Sử dụng tài khoản do giáo viên cấp cho bạn.
          </CardDescription>
          <Suspense>
            <LoginForm />
          </Suspense>
        </Card>
      </div>
    </div>
  );
}
