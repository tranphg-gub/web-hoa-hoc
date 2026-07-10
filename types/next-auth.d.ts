import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "STUDENT";
    username: string;
    grade?: number;
    mustChangePassword: boolean;
  }

  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "STUDENT";
      username: string;
      grade?: number;
      mustChangePassword: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "STUDENT";
    username: string;
    grade?: number;
    mustChangePassword: boolean;
  }
}
