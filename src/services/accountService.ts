import { accountRepository } from '../repositories/accountRepository.js';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { operationRepository } from '../repositories/operationRepository.js';
import prisma from '../config/db.js';
import { operationService } from './operationService.js';

export const accountService = {

    findByUser: async (user: User): Promise<Account | null> => {
        return await accountRepository.findByUser(user);

    },

    totalCurrentAmount: async (user: User): Promise<number> => {
        const account: Account | null = await accountRepository.findByUser(user);
        if (account) {
            const amount: number = await bankAccountRepository.totalAmountForAllAccount(user);
            return account.currentAmount ? account.currentAmount + amount : amount;
        }
        return 0;
    },

    reset: async (account: Account) => {
        let amountDebit: number = 0;
        let amountCredit: number = 0;
        await prisma.$transaction(async (tx) => {
            const monthlyDebits = await operationRepository.getMonthlyDebit(account);
            if (monthlyDebits) {
                for (const monthlyDebit of monthlyDebits) {
                    amountDebit = amountDebit + (monthlyDebit.amount ?? 0);
                    await operationRepository.updateMonthlyDebit(monthlyDebit.id,{debited: 0},tx)
                }
            }

            const liveDebits = await operationRepository.getLiveDebit(account);
            if (liveDebits) {
                for (const liveDebit of liveDebits) {
                    if (liveDebit.debited) {
                           await operationService.deleteLiveDebit(liveDebit.id);
                    } else {
                        amountDebit = amountDebit + (liveDebit.amount ?? 0);
                    }
                }
            }

            const monthlyCredits = await operationRepository.getMonthlyCredit(account);
            if (monthlyCredits) {
                for (const monthlyCredit of monthlyCredits) {
                    amountCredit = amountCredit + (monthlyCredit.amount ?? 0);
                    await operationRepository.updateMonthlyCredit(monthlyCredit.id, {
                        credited : 0
                    },tx)
                }
            }

            const liveCredits = await operationRepository.getLiveCredit(account);
            if (liveCredits) {
                for (const liveCredit of liveCredits) {
                    if (liveCredit.credited) {
                        await operationService.deleteLiveCredit(liveCredit.id);
                    } else {
                        amountCredit = amountCredit + (liveCredit.amount ?? 0);
                    }
                }
            }

            account.futureAmountWithCredit = account.currentAmount ?? 0 - amountDebit + amountCredit;
            account.futureAmountWithoutCredit = account.currentAmount ?? 0 - amountDebit;
            await accountRepository.update(account.id, {
                currentAmount: Number(account.currentAmount),
                futureAmountWithCredit: Number(account.futureAmountWithCredit),
                futureAmountWithoutCredit: Number(account.futureAmountWithoutCredit),
            }, tx);


        });
    }
}