import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createStudent, deleteStudent, resetStudentPassword } from "./actions";

export default async function AdminStudentsPage() {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { grade: "asc" },
    include: {
      _count: { select: { quizAttempts: true, readDocuments: true } },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Quản lý học sinh
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Tạo tài khoản, xem tiến độ và đặt lại mật khẩu cho học sinh.
        </p>
      </div>

      <Card>
        <CardTitle>Thêm học sinh mới</CardTitle>
        <CardDescription className="mt-1 mb-4">
          Đặt tên đăng nhập và mật khẩu ban đầu cho học sinh.
        </CardDescription>
        <form action={createStudent} className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Họ tên</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input id="username" name="username" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="grade">Lớp</Label>
            <select
              id="grade"
              name="grade"
              required
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
              defaultValue=""
            >
              <option value="" disabled>
                Chọn lớp
              </option>
              {[8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Mật khẩu ban đầu</Label>
            <Input id="password" name="password" type="text" required />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">Tạo tài khoản</Button>
          </div>
        </form>
      </Card>

      <div className="flex flex-col gap-3">
        {students.map((s) => (
          <Card key={s.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{s.name}</span>
                <Badge tone="neutral">Lớp {s.grade}</Badge>
              </div>
              <p className="mt-1 text-sm text-foreground-muted">
                @{s.username} · {s._count.readDocuments} tài liệu đã đọc ·{" "}
                {s._count.quizAttempts} lượt làm bài
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <form
                action={async (formData: FormData) => {
                  "use server";
                  const password = String(formData.get("password") ?? "");
                  if (password) await resetStudentPassword(s.id, password);
                }}
                className="flex items-center gap-2"
              >
                <Input
                  name="password"
                  placeholder="Mật khẩu mới"
                  className="w-36"
                />
                <Button type="submit" size="sm" variant="secondary">
                  Đặt lại
                </Button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await deleteStudent(s.id);
                }}
              >
                <Button type="submit" size="sm" variant="ghost">
                  Xóa
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
