import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { aimeCard, aimeUser } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

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
  if (req.body) console.log(req.body);
}

export async function PUT() {}

export async function DELETE() {}
