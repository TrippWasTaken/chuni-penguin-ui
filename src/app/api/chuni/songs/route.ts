import { db } from "@/db";
import { chuniStaticMusic } from "@/drizzle/schema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  //   const { title } = await req.json();

  const musicList = await db
    .select()
    .from(chuniStaticMusic)
    .catch((err) => {
      return NextResponse.json(
        { error: `Something broke along the way ${err}` },
        { status: 500 }
      );
    });
  return NextResponse.json(musicList, { status: 200 });
}
