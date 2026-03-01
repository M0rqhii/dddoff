import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "@/lib/session";
import { getContent, saveContent } from "@/lib/content";
import { NextResponse } from "next/server";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const content = await request.json();
  await saveContent(content);
  return NextResponse.json({ ok: true });
}
