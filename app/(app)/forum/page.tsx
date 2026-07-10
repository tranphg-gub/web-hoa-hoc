import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { createForumPost } from "./actions";

export default async function ForumPage() {
  await requireUser();

  const posts = await prisma.forumPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, _count: { select: { comments: true } } },
    take: 50,
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Diễn đàn</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Hỏi đáp với các bạn học sinh khác, hoặc nhờ AI gia sư giải thích ngay trong bài đăng.
        </p>
      </div>

      <Card>
        <CardTitle>Đăng câu hỏi mới</CardTitle>
        <CardDescription className="mt-1 mb-4">
          Gõ công thức hóa học dạng thường (H2O, Fe^3+...) — hệ thống sẽ tự hiển thị đúng ký hiệu khoa học.
        </CardDescription>
        <form action={createForumPost} className="grid gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="content">Nội dung</Label>
            <textarea
              id="content"
              name="content"
              rows={4}
              required
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            />
          </div>
          <div>
            <Button type="submit">Đăng bài</Button>
          </div>
        </form>
      </Card>

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/forum/${post.id}`}>
            <Card className="flex flex-col gap-2 transition-colors hover:bg-background-subtle">
              <div className="flex items-center gap-2">
                {post.grade && <Badge tone="neutral">Lớp {post.grade}</Badge>}
                <span className="font-medium">{post.title}</span>
              </div>
              <p className="line-clamp-2 text-sm text-foreground-muted">{post.content}</p>
              <div className="flex items-center gap-3 text-xs text-foreground-muted">
                <span>{post.user.name}</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" /> {post._count.comments}
                </span>
              </div>
            </Card>
          </Link>
        ))}
        {posts.length === 0 && (
          <Card>
            <p className="text-sm text-foreground-muted">Chưa có bài đăng nào. Hãy là người đầu tiên đặt câu hỏi!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
