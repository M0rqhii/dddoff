import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  name: string;
  email: string;
  phone: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Wszystkie pola są wymagane." },
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
      subject: `Nowe zapytanie ze strony od ${body.name}`,
      html: `
        <h2>Nowe zapytanie ze strony DDDoff</h2>
        <table style="border-collapse:collapse;font-family:Arial,sans-serif;">
          <tr>
            <td style="padding:8px 16px;font-weight:bold;color:#163a66;">Imię i nazwisko:</td>
            <td style="padding:8px 16px;">${body.name}</td>
          </tr>
          <tr>
            <td style="padding:8px 16px;font-weight:bold;color:#163a66;">E-mail:</td>
            <td style="padding:8px 16px;"><a href="mailto:${body.email}">${body.email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 16px;font-weight:bold;color:#163a66;">Telefon:</td>
            <td style="padding:8px 16px;"><a href="tel:${body.phone}">${body.phone}</a></td>
          </tr>
        </table>
        <br>
        <p style="color:#64748b;font-size:12px;">Wiadomość wysłana automatycznie z formularza na stronie DDDoff.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd wysyłki maila:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości." },
      { status: 500 },
    );
  }
}
