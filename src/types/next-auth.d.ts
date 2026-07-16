import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: UserRole;
    fullName: string;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      fullName: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    fullName: string;
  }
}