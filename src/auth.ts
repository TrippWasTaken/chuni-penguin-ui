import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { aimeUser, chuniProfileData } from "./drizzle/schema";
import { eq } from "drizzle-orm";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AdapterUser } from "next-auth/adapters";
import axios from "axios";
import { getUserChuniProfileData } from "./app/common/utilities/getUserChuniProfileData";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: {
      label: "username",
      type: "text",
    },
    password: { label: "password", type: "password" },
  },

  // @ts-ignore
  async authorize(credentials) {
    console.log(credentials);
    const { password, username } = credentials;
    const user = await db
      .select({
        id: aimeUser.id,
        password: aimeUser.password,
      })
      .from(aimeUser)
      .where(eq(aimeUser.username, username as string));

    const passMatch = await bcrypt.compare(
      password as unknown as string,
      user[0].password as string
    );
    console.log("password verified", passMatch);
    if (user[0] && passMatch) {
      const { id } = user[0];

      return await getUserChuniProfileData(id, true);
    } else return null;
  },
});

const config = {
  adapter: DrizzleAdapter(db),
  providers: [credentialsConfig],
  callbacks: {
    // This feels very incorrect but for now it will have to do
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      // @ts-ignore
      session.user = token.user;
      return session;
    },
  },

  // debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(config);
