import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request: NextRequest) {
  const { name, email, message, subject } = await request.json();

  if (!name || !email || !message || !subject) {
    return NextResponse.json(
      { message: "We need more information to send an email!" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'hotmail', 
    auth: {
      user: process.env.NEXT_PUBLIC_USER, 
      pass: process.env.NEXT_PUBLIC_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_USER,
    to: email,
    subject: subject,
    html: ` 
            <p>Hello ${name}!</p>
            <p>${message}</p>
            `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "COULT NOT SEND THE MESSAGE" },
      { status: 500 }
    );
  }
}
