import type { Difficulty } from "@prisma/client";

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  NHAN_BIET: "Nhận biết",
  THONG_HIEU: "Thông hiểu",
  VAN_DUNG: "Vận dụng",
  VAN_DUNG_CAO: "Vận dụng cao",
};

export const DIFFICULTY_TONES: Record<Difficulty, "success" | "warning" | "orange" | "danger"> = {
  NHAN_BIET: "success",
  THONG_HIEU: "warning",
  VAN_DUNG: "orange",
  VAN_DUNG_CAO: "danger",
};

export const DIFFICULTY_ORDER: Difficulty[] = ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"];
