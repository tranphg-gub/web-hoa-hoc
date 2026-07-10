"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Không có service worker vẫn dùng web bình thường được, bỏ qua nếu lỗi.
      });
    }
  }, []);

  return null;
}
