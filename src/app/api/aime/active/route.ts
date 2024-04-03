import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const aimeURL: string = process.env.AIME_TXT as unknown as string; //ew
  try {
    const activeAime = await readFile(aimeURL, { encoding: "utf-8" });
    return NextResponse.json(activeAime.trim(), { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `Something broke along the way ${err}` },
      { status: 500 }
    );
  }
}
export async function PUT() {}
export async function POST() {}
export async function DELETE() {}
