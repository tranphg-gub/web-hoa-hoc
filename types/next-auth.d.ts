import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "STUDENT";
    username: string;
    grade?: number;
    mustChangePassword: boolean;
    paymentStatus: "FREE" | "PENDING" | "PAID";
  }

  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "STUDENT";
      username: string;
      grade?: number;
      mustChangePassword: boolean;
      paymentStatus: "FREE" | "PENDING" | "PAID";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "STUDENT";
    username: string;
    grade?: number;
    mustChangePassword: boolean;
    paymentStatus: "FREE" | "PENDING" | "PAID";
  }
}
