// /app/api/send-email/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { renderSignupEmail } from "@/emails/renderEmail";

export async function POST(req: Request) {
  try {
    console.log("📨 Request received to send email");

    const { email, personalityType, description } = await req.json();

    if (!email || !personalityType || !description) {
      return NextResponse.json(
        { ok: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const htmlContent = renderSignupEmail(personalityType, description);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: "hello@buzzly.nz",
          name: "Buzzly.nz",
        },
        to: [{ email }], // ✅ Brevo expects an array of objects
        subject: "New Message from Give Us a Buzz Contact Form",
        htmlContent,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY ?? "",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent!", response.data);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("❌ Error sending email:", error.response?.data || error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}