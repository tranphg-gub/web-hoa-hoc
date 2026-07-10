import { requireUser } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function PaymentPendingPage() {
  const session = await requireUser();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Đang chờ xác nhận thanh toán</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Tài khoản: {session.user.username} · Lớp {session.user.grade}
        </p>
      </div>

      <Card>
        <Badge tone="warning">Chưa thanh toán</Badge>
        <CardTitle className="mt-3">Học phí 99.000đ / lớp</CardTitle>
        <CardDescription className="mt-2">
          Vui lòng liên hệ giáo viên để nhận thông tin chuyển khoản và xác nhận thanh toán.
          Sau khi giáo viên xác nhận, hãy đăng xuất và đăng nhập lại để bắt đầu học.
        </CardDescription>
      </Card>
    </div>
  );
}
