import { accountRepository } from '../repositories/accountRepository.js';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { historyRepository } from '../repositories/historyRepository.js';
import { operationRepository } from '../repositories/operationRepository.js';
import { History } from '../models/history.model.js';
import { accessSync } from 'fs';
import { Prisma } from '@prisma/client';

export const historyService = {

    updateHistory: async (accountId: number) => {
        const account: Account | null = await accountRepository.findById(accountId);
        if (account) {
            const histories = await historyRepository.findByAccountIdOrderByDescId(account.id);

            if (histories && histories.length > 0) {
                const history = histories[0];


                let totalDebits = 0;
                let savingAmount = 0;
                const liveDebits = await operationRepository.getLiveDebit(account);
                for (const op of liveDebits) {
                    if (op.debited) {
                        if (op.internal) {
                            savingAmount = savingAmount + (op.amount ?? 0);
                        }
                        totalDebits = totalDebits + (op.amount ?? 0);
                    }
                }
                const monthlyDebits = await operationRepository.getMonthlyDebit(account);
                for (const op of monthlyDebits) {
                    if (op.debited) {
                        if (op.internal) {
                            savingAmount = savingAmount + (op.amount ?? 0);
                        }
                        totalDebits = totalDebits + (op.amount ?? 0);
                    }
                }
                history.amount_of_debit = totalDebits;



                let totalCredits = 0;



                const liveCredits = await operationRepository.getLiveCredit(account);
                for (const op of liveCredits) {
                    if (op.credited) {
                        if (op.internal) {
                            savingAmount = savingAmount - (op.amount ?? 0);
                        }
                        totalCredits = totalCredits + (op.amount ?? 0);
                    }
                }

                const monthlyCredits = await operationRepository.getMonthlyCredit(account);
                for (const op of monthlyCredits) {
                    if (op.credited) {
                        if (op.internal) {
                            savingAmount = savingAmount - (op.amount ?? 0);
                        }
                        totalCredits = totalCredits + (op.amount ?? 0);
                    }
                }

                history.amount_of_credit = totalCredits;
                history.end_month_amount = Number(account.currentAmount ?? 0) + savingAmount;
                history.saving_amount = savingAmount;

                if (account.user) {
                    const totalAmount = await accountRepository.getTotalCurrentAmount(account.user);
                    history.total_amount = totalAmount;
                    await historyRepository.update(history);
                }

            }
        }
    },

    createHistory: async (account: Account) => {
        const currentAmount = Number(account.currentAmount ?? 0);

        const historyData: Prisma.historyCreateInput = {
            date: new Date(),
            account_id: account.id,
            start_month_amount: currentAmount,
        };

        await historyRepository.create(historyData);
    },



}
