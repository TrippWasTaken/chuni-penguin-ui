import { chuniProfileData } from "@/drizzle/schema";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: typeof chuniProfileData.$inferSelect;
  }
}
