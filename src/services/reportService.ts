import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { emailService } from './emailService.js';
import puppeteer, { Browser } from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { accountService } from './accountService.js';
import { ReportTemplate } from '../models/report.model.js';
import { operationService } from './operationService.js';
import { noteRepository } from '../repositories/noteRepository.js';
import Handlebars from '../utils/pdfGenerator';


export const reportService = {

    createAndSendReport: async (user: User) => {
        if (user.email) {

            const data: ReportTemplate = { login: user.login, firstName: user.firstName, lastName: user.lastName };
            const account: Account | null = await accountService.findByUser(user);
            data.account = account;
            if (account) {
                data.liveCredits = await operationService.getLiveCredit(account);
                data.liveDebits = await operationService.getLiveDebit(account);
                data.monthlyCredits = await operationService.getMonthlyCredit(account);
                data.monthlyDebits = await operationService.getMonthlyDebit(account);
            }
            data.note = await noteRepository.findByUser(user);

            const pdfBuffer = await reportService.generatePdfFromHtml(data);

            // 3) Envoyer le PDF par email

            await emailService.sendPdf(user.email, 'Monthly report', 'Attached the report for ' + new Date(), pdfBuffer as Buffer)
        }
    },

    generatePdfFromHtml: async (data: any) => {
        const templatePath = path.resolve(__dirname, '../templates/report.html');
        const html = fs.readFileSync(templatePath, 'utf8');
        const template = Handlebars.compile(html);
        const finalHtml = template(data);


        const browser = await puppeteer.launch({
            // Indique explicitement à Puppeteer d'exécuter la version shell (ancienne méthode headless mais ultra performante)
            headless: 'shell',
            timeout: 60000,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage', // Indispensable sous Docker pour éviter les crashs de mémoire
            ]
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
    },


}
