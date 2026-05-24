import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = "autosa.org@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, subject } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return NextResponse.json({ success: false, error: "A valid email is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Message is required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Autosa Website" <${process.env.GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: subject?.trim() ? `[Contact] ${subject.trim()}` : `[Contact] New message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#c8905a;margin-bottom:4px">New Contact Message</h2>
          <p style="color:#666;font-size:13px;margin-top:0">via autosa.net</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr><td style="padding:8px 0;color:#999;font-size:13px;width:80px">Name</td><td style="padding:8px 0;font-size:14px">${name.trim()}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:13px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email.trim()}">${email.trim()}</a></td></tr>
            ${subject?.trim() ? `<tr><td style="padding:8px 0;color:#999;font-size:13px">Subject</td><td style="padding:8px 0;font-size:14px">${subject.trim()}</td></tr>` : ""}
          </table>
          <div style="background:#f5f5f5;border-radius:8px;padding:16px">
            <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${message.trim()}</p>
          </div>
          <p style="color:#bbb;font-size:11px;margin-top:20px">Reply directly to this email to respond to ${name.trim()}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ success: false, error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
