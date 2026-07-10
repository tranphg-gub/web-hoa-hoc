import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
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
          <CardTitle>Đăng ký tài khoản</CardTitle>
          <CardDescription className="mt-1 mb-6">
            Học phí 99.000đ/lớp. Tài khoản do giáo viên tạo sẵn thì miễn phí — nếu bạn đã có tài khoản, hãy{" "}
            <Link href="/login" className="underline">
              đăng nhập
            </Link>{" "}
            thay vì đăng ký ở đây.
          </CardDescription>
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
}
