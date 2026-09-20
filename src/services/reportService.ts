import { accountRepository } from '../repositories/accountRepository.js';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { emailService } from './emailService.js';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';



export const reportService = {

    createAndSendReport: async (user: User) => {
     if(user.email) {

  // 2) Générer le PDF
  const pdfBuffer = await reportService.generatePdfFromHtml(    {
      name: "Nicolas",
      date: new Date().toLocaleDateString(),
      amount: 42,
      items: [
    { name: "Produit A", value: 42 },
    { name: "Produit B", value: 99 },
    { name: "Produit C", value: 12 }
  ]
    });

  // 3) Envoyer le PDF par email

  await emailService.sendPdf(user.email, pdfBuffer as Buffer)

        }
    },

generatePdfFromHtml: async (data:any) => {
  const templatePath = path.resolve(__dirname, '../templates/report.html');
  const html = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(html);
  const finalHtml = template(data);

    const browser = await puppeteer.launch({
      headless: 'shell',
      timeout: 60000,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(finalHtml, { waitUntil: 'load' });

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
 