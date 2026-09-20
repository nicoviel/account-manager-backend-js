import { accountRepository } from '../repositories/accountRepository.js';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { emailService } from './emailService.js';
import puppeteer from 'puppeteer';

export const reportService = {

    createAndSendReport: async (user: User) => {
     if(user.email) {
          const html = `
    <h1>Rapport</h1>
    <p>Voici votre rapport généré automatiquement.</p>
  `;

  // 2) Générer le PDF
  const pdfBuffer = await reportService.generatePdfFromHtml(html);

  // 3) Envoyer le PDF par email

  await emailService.sendPdf(user.email, pdfBuffer as Buffer)

        }
    },

generatePdfFromHtml: async (html: string) => {
    const browser = await puppeteer.launch({
      headless: 'shell',
      timeout: 60000,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'load' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
}
}