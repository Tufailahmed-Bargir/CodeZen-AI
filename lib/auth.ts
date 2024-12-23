import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import prisma from "@/lib/db";

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email || !user.name || !user.image) {
        return false;
      }

      // Check if user exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      // If user doesn't exist, create a new record
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            githubId: user.id,
          },
        });
      }

      return true; // Allow sign-in
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to a custom login page
    error: "/login", // Redirect to the login page on error
  },
};
