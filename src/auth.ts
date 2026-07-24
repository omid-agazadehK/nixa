import bcrypt from "bcryptjs";
import type { Session } from "next-auth";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        if (typeof user.id === "string") {
          token.id = user.id;
        }
        token.role = user.role;
        token.fullName = user.fullName;
        token.email = user.email;
      }
      if (trigger === "update") {
        if (session.fullName) token.fullName = session.fullName;
        if (session.email) token.email = session.email;
        if (session.role) token.role = session.role;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.fullName = token.fullName;
        session.user.email = token.email;
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
