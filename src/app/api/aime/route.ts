import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { aimeCard, aimeUser } from "@/drizzle/schema";
import { eq, exists, sql } from "drizzle-orm";
import { NewUser } from "@/types/aime";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";

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
  const data: NewUser & { createNew: boolean } = await req.json();
  const generateAccessCode = async (): Promise<string> => {
    const generateNum = (len: number): number => {
      const digit = Math.floor(Math.random() * 9);
      if (len === 0 && digit === 3) return generateNum(len);
      return digit;
    };

    let aime = "";
    for (let i = 0; i < 20; i++) {
      let digit = generateNum(aime.length);
      aime += digit.toString();
    }

    //dont want to insert doubles into the db
    const checkDuplicateCode = await db
      .select()
      .from(aimeCard)
      .where(eq(aimeCard.accessCode, aime));

    if (checkDuplicateCode.length > 0) {
      return generateAccessCode();
    }
    return aime;
  };

  const createNewUser = async (data: any) => {
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
    const accessCode = await generateAccessCode();

    const userToInsert: typeof aimeUser.$inferInsert = {
      username: data.username,
      password: hashedPassword,
      permissions: 1,
    };

    const query: MySqlRawQueryResult = await db
      .insert(aimeUser)
      .values(userToInsert);

    const linkCard: typeof aimeCard.$inferInsert = {
      user: query[0].insertId,
      accessCode: accessCode,
    };

    await db.insert(aimeCard).values(linkCard);

    return NextResponse.json(query[0].insertId, { status: 200 });
  };

  if (data.createNew) {
    return await createNewUser(data);
  }
}

export async function PUT() {}

export async function DELETE() {}
