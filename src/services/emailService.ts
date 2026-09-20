import nodemailer from 'nodemailer';

export const emailService = {
  sendPdf: async (to: string,subject:string, content:string, pdfBuffer: Buffer | Uint8Array) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: subject,
      text: content,
      attachments: [
        {
          filename: 'rapport.pdf',
          content: Buffer.from(pdfBuffer),
        },
      ],
    });
  },
};