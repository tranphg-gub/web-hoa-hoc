import type { QuizKind } from "@prisma/client";

export const QUIZ_KIND_LABELS: Record<QuizKind, string> = {
  REGULAR: "Đề thường",
  PLACEMENT: "Test đầu vào",
  MONTHLY_CHECK: "Đánh giá định kỳ hàng tháng",
};

export const QUIZ_KIND_ORDER: QuizKind[] = ["REGULAR", "PLACEMENT", "MONTHLY_CHECK"];
