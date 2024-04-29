import { chuniProfileData } from "@/drizzle/schema";

export interface rankingEntry {
  id: typeof chuniProfileData.$inferSelect.user;
  username: typeof chuniProfileData.$inferSelect.userName;
  currRating: typeof chuniProfileData.$inferSelect.playerRating;
  highestRating: typeof chuniProfileData.$inferSelect.highestRating;
  playCount: typeof chuniProfileData.$inferSelect.playCount;
  level: typeof chuniProfileData.$inferSelect.level;
}
