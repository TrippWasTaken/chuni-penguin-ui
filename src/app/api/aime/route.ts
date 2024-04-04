import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { aimeCard, aimeUser } from "@/drizzle/schema";
import { eq, exists } from "drizzle-orm";
import { NewUser } from "@/types/aime";

export async function GET(req: NextRequest) {
  const aimeUsers = await db
    .select({
      id: aimeUser.id,
      username: aimeUser.username,
      cardNumber: aimeCard.accessCode,
      createdDate: aimeUser.createdDate,
      lastUsed: aimeCard.lastLoginDate,
    })
    .from(aimeUser)
    .leftJoin(aimeCard, eq(aimeUser.id, aimeCard.user))
    .catch((err) => {
      return NextResponse.json(
        { error: `Something broke along the way ${err}` },
        { status: 500 }
      );
    });
  return NextResponse.json(aimeUsers, { status: 200 });
}

export async function POST(req: NextRequest) {
  // make an access code for when a user has none
  const generateAccessCode = () => {
    let aime = "";
    for (let i = 0; i < 20; i++) {
      let digit = Math.floor(Math.random() * 10);
      if (aime.length === 0) {
        digit = 4;
      }

      aime += digit.toString();
    }
    return aime;
  };
  const data: NewUser = await req.json();
  console.log(data.username);

  const existingUser = await db
    .select()
    .from(aimeUser)
    .where(eq(aimeUser.username, data.username));
  if (existingUser.length < 0) {
    return NextResponse.json("User already exists", { status: 400 });
  }
  if (data.password !== data.confirmPassword) {
    return NextResponse.json("Passwords are not matching", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const accessCode = generateAccessCode();
}

export async function PUT() {}

export async function DELETE() {}
