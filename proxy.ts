import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isChangePasswordRoute = nextUrl.pathname.startsWith("/change-password");
  const isPaymentPendingRoute = nextUrl.pathname.startsWith("/payment-pending");
  const isAppRoute =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/documents") ||
    nextUrl.pathname.startsWith("/quizzes") ||
    nextUrl.pathname.startsWith("/games") ||
    nextUrl.pathname.startsWith("/ask-ai") ||
    nextUrl.pathname.startsWith("/leaderboard") ||
    nextUrl.pathname.startsWith("/forum") ||
    isChangePasswordRoute ||
    isPaymentPendingRoute ||
    isAdminRoute;

  if (isAppRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  if (
    isAppRoute &&
    isLoggedIn &&
    req.auth?.user?.paymentStatus === "PENDING" &&
    !isPaymentPendingRoute &&
    role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/payment-pending", nextUrl.origin));
  }

  if (isAppRoute && isLoggedIn && req.auth?.user?.mustChangePassword && !isChangePasswordRoute) {
    return NextResponse.redirect(new URL("/change-password", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/documents/:path*",
    "/quizzes/:path*",
    "/games/:path*",
    "/ask-ai/:path*",
    "/leaderboard/:path*",
    "/forum/:path*",
    "/admin/:path*",
    "/change-password/:path*",
    "/payment-pending/:path*",
  ],
};
