import { sendEmail } from "@/app/lib/nodemailer";
import { NextResponse } from "next/server";


export async function POST(request) {
  const { email, otp } = await request.json();
  const subject = "Registration OTP"
  // const otp = Math.floor(Math.random() * 9000) + 1000;
  const message = "Hi User. Your registraion otp is : " + otp
  
  if (!email || !subject || !message) {
    return NextResponse.json({
        success : false,
        message : "Missing field required."
    })
  }

  try {
    await sendEmail({
      to: email,
      subject: subject,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({
        success : true,
        message : "Email sent successfully."
    })
  } catch (error) {
    return NextResponse.json({
        success : false,
        message : "Something went wrong",
        error : error
    })
  }
}
