import { requireUser } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { changePassword } from "./actions";

export default async function ChangePasswordPage() {
  const session = await requireUser();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Đổi mật khẩu</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Tài khoản: {session.user.username}
        </p>
      </div>

      <Card>
        {session.user.mustChangePassword && (
          <CardDescription className="mb-4 text-warning-fg">
            Bạn cần đổi mật khẩu trước khi tiếp tục sử dụng.
          </CardDescription>
        )}
        <CardTitle className="sr-only">Đổi mật khẩu</CardTitle>
        <form action={changePassword} className="grid gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <Input id="currentPassword" name="currentPassword" type="password" required autoComplete="current-password" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <Input id="newPassword" name="newPassword" type="password" required minLength={6} autoComplete="new-password" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">Nhập lại mật khẩu mới</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={6} autoComplete="new-password" />
          </div>
          <div>
            <Button type="submit">Đổi mật khẩu</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
