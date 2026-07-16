import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.fullName = user.fullName;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.fullName = token.fullName;
        session.user.image = token.image;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const email =
          typeof credentials.email === "string" ? credentials.email : "";
        const password =
          typeof credentials.password === "string" ? credentials.password : "";

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;
        return {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
