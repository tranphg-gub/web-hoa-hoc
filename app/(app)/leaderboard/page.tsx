import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function LeaderboardPage() {
  const session = await requireUser();

  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { points: "desc" },
    select: { id: true, name: true, grade: true, points: true },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bảng xếp hạng</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Điểm thưởng tích lũy từ các bài kiểm tra đã làm. Chỉ hiển thị nội bộ trong hệ thống.
        </p>
      </div>

      <Card className="p-0">
        <ul className="divide-y divide-border-subtle">
          {students.map((s, idx) => {
            const isMe = s.id === session.user.id;
            return (
              <li
                key={s.id}
                className={cn(
                  "flex items-center justify-between px-6 py-4",
                  isMe && "bg-background-subtle"
                )}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                      idx === 0 && "bg-warning-bg text-warning-fg",
                      idx === 1 && "bg-background-subtle text-foreground-muted",
                      idx === 2 && "bg-orange-bg text-orange-fg",
                      idx > 2 && "text-foreground-muted"
                    )}
                  >
                    {idx < 3 ? <Trophy className="h-4 w-4" /> : idx + 1}
                  </span>
                  <div>
                    <span className="font-medium">
                      {s.name}
                      {isMe && <span className="ml-2 text-xs text-foreground-muted">(bạn)</span>}
                    </span>
                    <div>
                      <Badge tone="neutral">Lớp {s.grade ?? "-"}</Badge>
                    </div>
                  </div>
                </div>
                <span className="text-lg font-semibold">{s.points}</span>
              </li>
            );
          })}
          {students.length === 0 && (
            <li className="px-6 py-8 text-center text-sm text-foreground-muted">
              Chưa có dữ liệu xếp hạng.
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
}
