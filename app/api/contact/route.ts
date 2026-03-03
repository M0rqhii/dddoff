import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  name: string;
  email: string;
  phone: string;
  packageName: string;
  description?: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    if (!body.name || !body.email || !body.phone || !body.packageName) {
      return NextResponse.json(
        { error: "Wszystkie pola s\u0105 wymagane." },
        { status: 400 },
      );
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } =
      process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL_TO) {
      console.error("Brak konfiguracji SMTP w .env.local");
      return NextResponse.json(
        { error: "Serwer mail nie jest skonfigurowany." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DDDoff - Formularz kontaktowy" <${SMTP_USER}>`,
      to: CONTACT_EMAIL_TO,
      subject: `Nowe zapytanie ze strony od ${body.name} (${body.packageName})`,
      html: `
        <h2>Nowe zapytanie ze strony DDDoff</h2>
        <table style="border-collapse:collapse;font-family:Arial,sans-serif;">
          <tr>
            <td style="padding:8px 16px;font-weight:bold;color:#163a66;">Imi\u0119 i nazwisko:</td>
            <td style="padding:8px 16px;">${escapeHtml(body.name)}</td>
          </tr>
          <tr>
            <td style="padding:8px 16px;font-weight:bold;color:#163a66;">E-mail:</td>
            <td style="padding:8px 16px;"><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 16px;font-weight:bold;color:#163a66;">Telefon:</td>
            <td style="padding:8px 16px;"><a href="tel:${escapeHtml(body.phone)}">${escapeHtml(body.phone)}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 16px;font-weight:bold;color:#163a66;">Pakiet:</td>
            <td style="padding:8px 16px;">${escapeHtml(body.packageName)}</td>
          </tr>
          <tr>
            <td style="padding:8px 16px;font-weight:bold;color:#163a66;">Kr\u00f3tki opis:</td>
            <td style="padding:8px 16px;">${body.description ? escapeHtml(body.description) : "Brak opisu"}</td>
          </tr>
        </table>
        <br>
        <p style="color:#64748b;font-size:12px;">Wiadomo\u015b\u0107 wys\u0142ana automatycznie z formularza na stronie DDDoff.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("B\u0142\u0105d wysy\u0142ki maila:", error);
    return NextResponse.json(
      { error: "Nie uda\u0142o si\u0119 wys\u0142a\u0107 wiadomo\u015bci." },
      { status: 500 },
    );
  }
}
