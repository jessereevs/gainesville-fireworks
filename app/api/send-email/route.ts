import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

const sendgridApiKey = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(sendgridApiKey);

export async function POST(req: NextRequest) {
  const { to, subject, text, html } = await req.json();

  const msg = {
    to, // Change to your recipient
    from: 'jessereevs@gmail.com', // Change to your verified sender
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
