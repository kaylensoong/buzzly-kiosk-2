import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import BuzzlySignupEmail from '@/emails/buzzlysignupemail';

const resend = new Resend(process.env.RESEND_API_KEY); // 🔐 Use env var

export async function POST(req: Request) {
  try {
    const { email, phone, personalityType, description } = await req.json();

    // Optional: Save to DB here, if needed

    const data = await resend.emails.send({
      from: 'Buzzly <onboarding@resend.dev>',
      to: email,
      subject: 'Sign up to Buzzly.nz!',
      react: <BuzzlySignupEmail personalityType={personalityType} description={description} />,
    });

    console.log('Email sent:', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}