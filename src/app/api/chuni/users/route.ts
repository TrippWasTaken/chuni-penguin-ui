import { getUserChuniProfileData } from "@/app/common/utilities/getUserChuniProfileData";
import { db } from "@/db";
import { chuniProfileData } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userBasedId = req.nextUrl.searchParams.get("userId");
  const chuniBasedId = req.nextUrl.searchParams.get("chuniId");

  const idToPass: string | null = userBasedId ?? chuniBasedId;
  const data = await getUserChuniProfileData(Number(idToPass), !!userBasedId);
  if (data) {
    return NextResponse.json(data, { status: 200 });
  } else {
    return NextResponse.json(
      { error: `Seems this user doesnt exist` },
      { status: 500 }
    );
  }
}
