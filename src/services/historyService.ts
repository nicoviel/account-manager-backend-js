import { accountRepository } from '../repositories/accountRepository.js';
import { Account } from '../models/account.model.js';
import { historyRepository } from '../repositories/historyRepository.js';
import { operationRepository } from '../repositories/operationRepository.js';
import { History } from '../models/history.model.js';
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
                history.amountOfDebit = totalDebits;

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

                history.amountOfCredit = totalCredits;
                history.endAmount = Number(account.currentAmount ?? 0) + savingAmount;
                history.savingAmount = savingAmount;

                if (account.user) {
                    const totalAmount = await accountRepository.getTotalCurrentAmount(account.user);
                    history.totalAmount = totalAmount;
                    await historyRepository.update(history);
                }

            }
        }
    },

    createHistory: async (account: Account) => {
        const currentAmount = Number(account.currentAmount ?? 0);

        const historyData: Prisma.historyCreateInput = {
            date: new Date(),
            // ❗ CORRECTION : on utilise la relation Prisma
            account: {
                connect: { id: account.id }
            },
            startAmount: currentAmount,
        };
        await historyRepository.create(historyData);
    },

    getHistories: async (account: Account): Promise<History[]> => {
        return await historyRepository.findByAccountIdOrderByDescId(account.id);
    }

}
