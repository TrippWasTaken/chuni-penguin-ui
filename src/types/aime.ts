import { aimeCard, aimeUser } from "@/drizzle/schema";

export interface AimeCard {
  id: number;
  username: string | null;
  cardNumber: string;
  createdDate: string;
  lastUsed: string;
  isActive: boolean;
}

export interface NewAime {
  accessCode: typeof aimeCard.accessCode;
}
export interface NewUser {
  username: typeof aimeUser.username;
  password: string;
  confirmPassword: string;
  accessCode?: NewAime;
}
