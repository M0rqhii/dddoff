import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { login, password } = body;

  if (
    login === process.env.ADMIN_LOGIN &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );
    session.isLoggedIn = true;
    await session.save();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { error: "Nieprawidłowy login lub hasło" },
    { status: 401 }
  );
}
