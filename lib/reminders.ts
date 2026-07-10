const INACTIVITY_DAYS = 3;

export interface Reminder {
  id: string;
  message: string;
}

export function buildReminders({
  lastActivityAt,
  now,
  unattemptedQuizTitles,
}: {
  lastActivityAt: Date | null;
  now: Date;
  unattemptedQuizTitles: string[];
}): Reminder[] {
  const reminders: Reminder[] = [];

  const daysSinceActivity = lastActivityAt
    ? Math.floor((now.getTime() - lastActivityAt.getTime()) / (24 * 60 * 60 * 1000))
    : null;

  if (daysSinceActivity === null || daysSinceActivity >= INACTIVITY_DAYS) {
    reminders.push({
      id: "inactivity",
      message:
        daysSinceActivity === null
          ? "Bạn chưa học bài nào cả — hãy bắt đầu với một tài liệu bất kỳ nhé!"
          : `Đã ${daysSinceActivity} ngày bạn chưa học bài nào, hãy dành chút thời gian ôn tập nhé.`,
    });
  }

  if (unattemptedQuizTitles.length > 0) {
    const preview = unattemptedQuizTitles.slice(0, 3).join(", ");
    const rest = unattemptedQuizTitles.length > 3 ? ` và ${unattemptedQuizTitles.length - 3} đề khác` : "";
    reminders.push({
      id: "new-quiz",
      message: `Bạn có ${unattemptedQuizTitles.length} đề kiểm tra chưa làm thử: ${preview}${rest}.`,
    });
  }

  return reminders;
}
