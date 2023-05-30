import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ account, profile }): Promise<boolean> {
      if (account?.provider === "google") {
        return profile?.email?.endsWith("katyisd.org") ?? false;
      }
      return false;
    },
  },
  adapter: MongoDBAdapter(clientPromise, {databaseName: "auth"}),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
}


export default NextAuth(authOptions);
