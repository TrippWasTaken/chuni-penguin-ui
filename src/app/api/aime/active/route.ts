import { readFile, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

const aimeURL: string = process.env.AIME_TXT as unknown as string; //ew

export async function GET() {
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
export async function PUT(req: NextRequest) {
  const body = await req.json();
  try {
    await writeFile(aimeURL, body.cardNumber, { flag: "w+" });
    return NextResponse.json(body.cardNumber, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `Something broke along the way ${err}` },
      { status: 500 }
    );
  }
}
export async function POST() {}
export async function DELETE() {}
