import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { confirmPayment, rejectPayment } from "./actions";

export default async function AdminPaymentsPage() {
  await requireAdmin();

  const payments = await prisma.payment.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Xác nhận thanh toán</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {payments.length} yêu cầu đang chờ · Học sinh tự đăng ký cần xác nhận đã chuyển khoản 99.000đ/lớp trước khi được vào học.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {payments.map((p) => (
          <Card key={p.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone="neutral">Lớp {p.grade}</Badge>
                <span className="font-medium">{p.user.name}</span>
                <span className="text-sm text-foreground-muted">({p.user.username})</span>
              </div>
              <CardDescription className="mt-1">
                {p.amountVnd.toLocaleString("vi-VN")}đ
                {p.note && <> · Ghi chú: {p.note}</>}
                {" · "}Đăng ký lúc {p.createdAt.toLocaleString("vi-VN")}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <form action={async () => { "use server"; await confirmPayment(p.id); }}>
                <Button type="submit" size="sm">
                  Xác nhận đã thanh toán
                </Button>
              </form>
              <form action={async () => { "use server"; await rejectPayment(p.id); }}>
                <Button type="submit" size="sm" variant="ghost">
                  Từ chối
                </Button>
              </form>
            </div>
          </Card>
        ))}
        {payments.length === 0 && (
          <Card>
            <CardTitle className="text-base">Không có yêu cầu nào đang chờ</CardTitle>
            <CardDescription className="mt-1">
              Tất cả học sinh tự đăng ký đã được xử lý.
            </CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
}
