import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user.id, name: user.name, email: user.email, created_at: user.created_at };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user object is available (on login), add additional fields to the token
      if (user) {
        token.id = user.id;
        token.created_at = user.created_at;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Add additional fields from the token to the session object
      session.user.id = token.id;
      session.user.created_at = token.created_at;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/components/login", // Redirect to custom login page
  },
});

export { handler as GET, handler as POST };
