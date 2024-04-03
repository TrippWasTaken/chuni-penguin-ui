import { aimeCard, aimeUser } from "@/drizzle/schema";

export interface AimeCard {
  id: number;
  username: string | null;
  cardNumber: string;
  createdDate: string;
  lastUsed: string;
  isActive: boolean;
}
