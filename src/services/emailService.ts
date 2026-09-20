import nodemailer from 'nodemailer';

export const emailService = {
  sendPdf: async (to: string, pdfBuffer: Buffer | Uint8Array) => {
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
      from: 'ton.email@gmail.com',
      to,
      subject: 'Votre rapport PDF',
      text: 'Veuillez trouver ci-joint le rapport.',
      attachments: [
        {
          filename: 'rapport.pdf',
          content: Buffer.from(pdfBuffer),
        },
      ],
    });
  },
};