import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER, // Sender address
      to,                          // List of receivers
      subject,                     // Subject line
      html,                        // HTML content
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};
