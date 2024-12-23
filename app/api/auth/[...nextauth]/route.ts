import prisma from "../../../../lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      authorization: {
        params: {
          scope: "repo user read:user",
        },
      },
    }),
  ],

  callbacks: {
    async signIn(params) {
      if (!params.user.email || !params.user.name || !params.user.image) {
        return false;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: params.user.email,
        },
      });

      if (user) {
        return true;
      }

      await prisma.user.create({
        data: {
          email: params.user.email,
          name: params.user.name,
          image: params.user.image,
          githubId: params.user.id,
        },
      });

      return true;
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.githubId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      session.githubId = token.githubIdm as string;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
