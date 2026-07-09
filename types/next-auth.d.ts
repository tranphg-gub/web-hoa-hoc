import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "STUDENT";
    username: string;
    grade?: number;
  }

  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "STUDENT";
      username: string;
      grade?: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "STUDENT";
    username: string;
    grade?: number;
  }
}
