import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isLoginLocked, recordFailedLogin, clearFailedLogins } from "@/lib/login-rate-limit";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!username || !password) return null;

        if (isLoginLocked(username)) {
          throw new Error("Tài khoản tạm khóa do đăng nhập sai nhiều lần. Vui lòng thử lại sau 15 phút.");
        }

        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
          recordFailedLogin(username);
          return null;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          recordFailedLogin(username);
          return null;
        }

        clearFailedLogins(username);

        return {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
          grade: user.grade ?? undefined,
          mustChangePassword: user.mustChangePassword,
          paymentStatus: user.paymentStatus,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.grade = user.grade;
        token.mustChangePassword = user.mustChangePassword;
        token.paymentStatus = user.paymentStatus;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as "ADMIN" | "STUDENT";
        session.user.username = token.username as string;
        session.user.grade = token.grade as number | undefined;
        session.user.mustChangePassword = token.mustChangePassword as boolean;
        session.user.paymentStatus = token.paymentStatus as "FREE" | "PENDING" | "PAID";
      }
      return session;
    },
  },
});
