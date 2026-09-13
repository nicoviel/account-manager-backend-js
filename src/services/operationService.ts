import { operationRepository } from '../repositories/operationRepository.js';
import prisma from '../config/db.js';
import { accountRepository } from '../repositories/accountRepository.js';
import { Account } from '../models/account.model.js';
import { LiveCredit, LiveDebit, MonthlyCredit, MonthlyDebit } from '../models/operation.model.js';

export const operationService = {

    getMonthlyDebit: async (account: Account): Promise<MonthlyDebit[]> => {
        const debits: MonthlyDebit[] = await operationRepository.getMonthlyDebit(account);
        return debits;
    },

    getMonthlyCredit: async (account: Account): Promise<MonthlyCredit[]> => {
        const credits: MonthlyCredit[] = await operationRepository.getMonthlyCredit(account);
        return credits;
    },

    getLiveDebit: async (account: Account): Promise<LiveDebit[]> => {
        const debits: LiveDebit[] = await operationRepository.getLiveDebit(account);
        return debits;
    },

    getLiveCredit: async (account: Account): Promise<LiveCredit[]> => {
        const credits: LiveCredit[] = await operationRepository.getLiveCredit(account);
        return credits;
    },


    createLiveDebit: async (operation: LiveDebit) => {
        console.log("Create Live Debit operation received:", operation);
        await prisma.$transaction(async (tx) => {
            if (operation.account?.id) {
                const account: Account | null = await accountRepository.findById(operation.account.id, tx);
                if (account) {
                    console.log("---------------------------------------------------------------");
                    console.log("Create Live Debit " + operation.label + "(" + operation.amount + ")");
                    console.log("Amounts before operation: ");
                    console.log("Current amount:" + account.currentAmount);
                    console.log("Future amount with credit amount:" + account.futureAmountWithCredit);
                    console.log("Future amount without credit amount:" + account.futureAmountWithoutCredit);
                    await operationRepository.saveLiveDebit(operation, tx);
                    account.futureAmountWithCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithCredit(account, tx) : 0;
                    account.futureAmountWithoutCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithoutCredit(account, tx) : 0;
                    await accountRepository.update(account.id, account, tx);
                    console.log("Amounts after operation: ");
                    console.log("Current amount:" + account.currentAmount);
                    console.log("Future amount with credit amount:" + account.futureAmountWithCredit);
                    console.log("Future amount without credit amount:" + account.futureAmountWithoutCredit);
                    console.log("---------------------------------------------------------------");
                }
            }
        });
    },

    createLiveCredit: async (operation: LiveCredit) => {
        console.log("Create Live Credit operation received:", operation);
        await prisma.$transaction(async (tx) => {
            if (operation.account?.id) {
                const account: Account | null = await accountRepository.findById(operation.account.id, tx);
                if (account) {
                    console.log("---------------------------------------------------------------");
                    console.log("Create Live Credit " + operation.label + "(" + operation.amount + ")");
                    console.log("Amounts before operation: ");
                    console.log("Current amount:" + account.currentAmount);
                    console.log("Future amount with credit amount:" + account.futureAmountWithCredit);
                    console.log("Future amount without credit amount:" + account.futureAmountWithoutCredit);
                    await operationRepository.saveLiveCredit(operation, tx);
                    account.futureAmountWithCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithCredit(account, tx) : 0;
                    account.futureAmountWithoutCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithoutCredit(account, tx) : 0;
                    await accountRepository.update(account.id, account, tx);
                    console.log("Amounts after operation: ");
                    console.log("Current amount:" + account.currentAmount);
                    console.log("Future amount with credit amount:" + account.futureAmountWithCredit);
                    console.log("Future amount without credit amount:" + account.futureAmountWithoutCredit);
                    console.log("---------------------------------------------------------------");
                }
            }

        })
    },

    createMonthlyCredit: async (operation: MonthlyCredit) => {
        console.log("Create Monthly Credit operation received:", operation);
        await prisma.$transaction(async (tx) => {
            if (operation.account?.id) {
                const account: Account | null = await accountRepository.findById(operation.account.id, tx);
                if (account) {
                    console.log("---------------------------------------------------------------");
                    console.log("Create Monthly Credit " + operation.label + "(" + operation.amount + ")");
                    console.log("Amounts before operation: ");
                    console.log("Current amount:" + account.currentAmount);
                    console.log("Future amount with credit amount:" + account.futureAmountWithCredit);
                    console.log("Future amount without credit amount:" + account.futureAmountWithoutCredit);
                    await operationRepository.saveMonthlyCredit(operation, tx);
                    account.futureAmountWithCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithCredit(account, tx) : 0;
                    account.futureAmountWithoutCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithoutCredit(account, tx) : 0;
                    await accountRepository.update(account.id, account, tx);
                    console.log("Amounts after operation: ");
                    console.log("Current amount:" + account.currentAmount);
                    console.log("Future amount with credit amount:" + account.futureAmountWithCredit);
                    console.log("Future amount without credit amount:" + account.futureAmountWithoutCredit);
                    console.log("---------------------------------------------------------------");
                }
            }


        })
    },

    createMonthlyDebit: async (operation: MonthlyDebit) => {
        console.log("Create Monthly Debit operation received:", operation);
        await prisma.$transaction(async (tx) => {
            if (operation.account?.id) {
                const account: Account | null = await accountRepository.findById(operation.account.id, tx);
                if (account) {
                    console.log("---------------------------------------------------------------");
                    console.log("Create Monthly Debit " + operation.label + "(" + operation.amount + ")");
                    console.log("Amounts before operation: ");
                    console.log("Current amount:" + account.currentAmount);
                    console.log("Future amount with credit amount:" + account.futureAmountWithCredit);
                    console.log("Future amount without credit amount:" + account.futureAmountWithoutCredit);
                    await operationRepository.saveMonthlyDebit(operation, tx);
                    account.futureAmountWithCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithCredit(account, tx) : 0;
                    account.futureAmountWithoutCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithoutCredit(account, tx) : 0;
                    await accountRepository.update(account.id, account, tx);
                    console.log("Amounts after operation: ");
                    console.log("Current amount:" + account.currentAmount);
                    console.log("Future amount with credit amount:" + account.futureAmountWithCredit);
                    console.log("Future amount without credit amount:" + account.futureAmountWithoutCredit);
                    console.log("---------------------------------------------------------------");
                }
            }

        })
    },

    debitLiveCredit: async (operation: LiveCredit): Promise<LiveCredit> => {
        return await prisma.$transaction(async (tx) => {
            const dbLiveCredit = await tx.live_credit.findUnique({
                where: { id: operation.id },
                include: {
                    account: true,
                    bankAccount: true,
                },
            });

            if (!dbLiveCredit) {
                throw new Error('Live credit introuvable');
            }

            if (dbLiveCredit.credited === 1) {
                return {
                    ...dbLiveCredit,
                    credited: true,
                    internal: dbLiveCredit.internal === 1,
                } as LiveCredit;
            }

            const account = dbLiveCredit.account;
            if (!account) {
                throw new Error('Compte introuvable pour ce live credit');
            }

            const amount = Number(dbLiveCredit.amount ?? 0);
            const currentAmount = Number(account.currentAmount ?? 0);

            console.log('---------------------------------------------------------------');
            console.log('Credit Live Credit ' + dbLiveCredit.label + ' (' + amount + ')');
            console.log('Amounts before operation: ');
            console.log('Current amount:' + currentAmount);
            console.log('Future amount with credit amount:' + account.futureAmountWithCredit);
            console.log('Future amount without credit amount:' + account.futureAmountWithoutCredit);

            const updatedLiveCredit = await tx.live_credit.update({
                where: { id: dbLiveCredit.id },
                data: {
                    credited: 1,
                },
            });

            const newCurrentAmount = currentAmount + amount;

            const newFutureAmountWithCredit =
                newCurrentAmount - await calculateFutureAmountWithCredit(
                    { ...account, currentAmount: newCurrentAmount } as Account,
                    tx
                );

            const newFutureAmountWithoutCredit =
                newCurrentAmount - await calculateFutureAmountWithoutCredit(
                    { ...account, currentAmount: newCurrentAmount } as Account,
                    tx
                );

            await tx.account.update({
                where: { id: account.id },
                data: {
                    currentAmount: newCurrentAmount,
                    futureAmountWithCredit: newFutureAmountWithCredit,
                    futureAmountWithoutCredit: newFutureAmountWithoutCredit,
                },
            });

            console.log('Amounts after operation: ');
            console.log('Current amount:' + newCurrentAmount);
            console.log('Future amount with credit amount:' + newFutureAmountWithCredit);
            console.log('Future amount without credit amount:' + newFutureAmountWithoutCredit);

            if (dbLiveCredit.internal === 1 && dbLiveCredit.bankAccountId) {
                const bankAccount = await tx.bank_account.findUnique({
                    where: { id: dbLiveCredit.bankAccountId },
                });

                if (bankAccount) {
                    const bankAmount = Number(bankAccount.amount ?? 0);
                    console.log('Debit Bank account ' + bankAccount.name + ' of ' + amount);

                    await tx.bank_account.update({
                        where: { id: bankAccount.id },
                        data: {
                            amount: bankAmount - amount,
                        },
                    });
                }
            }

            console.log('---------------------------------------------------------------');

            return {
                ...updatedLiveCredit,
                credited: true,
                internal: updatedLiveCredit.internal === 1,
                account: {
                    ...account,
                    currentAmount: newCurrentAmount,
                    futureAmountWithCredit: newFutureAmountWithCredit,
                    futureAmountWithoutCredit: newFutureAmountWithoutCredit,
                },
            } as LiveCredit;
        });
    },


    debitMonthlyCredit: async (operation: MonthlyCredit): Promise<MonthlyCredit> => {
        return await prisma.$transaction(async (tx) => {
            const dbMonthlyCredit = await tx.monthly_credit.findUnique({
                where: { id: operation.id },
                include: {
                    account: true,
                    bankAccount: true,
                },
            });

            if (!dbMonthlyCredit) {
                throw new Error('Monthly credit introuvable');
            }

            if (dbMonthlyCredit.credited === 1) {
                return {
                    ...dbMonthlyCredit,
                    credited: true,
                    internal: dbMonthlyCredit.internal === 1,
                } as MonthlyCredit;
            }

            const account = dbMonthlyCredit.account;
            if (!account) {
                throw new Error('Compte introuvable pour ce live credit');
            }

            const amount = Number(dbMonthlyCredit.amount ?? 0);
            const currentAmount = Number(account.currentAmount ?? 0);

            console.log('---------------------------------------------------------------');
            console.log('Credit Monthly Credit ' + dbMonthlyCredit.label + ' (' + amount + ')');
            console.log('Amounts before operation: ');
            console.log('Current amount:' + currentAmount);
            console.log('Future amount with credit amount:' + account.futureAmountWithCredit);
            console.log('Future amount without credit amount:' + account.futureAmountWithoutCredit);

            const updatedMonthlyCredit = await tx.monthly_credit.update({
                where: { id: dbMonthlyCredit.id },
                data: {
                    credited: 1,
                },
            });

            const newCurrentAmount = currentAmount + amount;

            const newFutureAmountWithCredit =
                newCurrentAmount - await calculateFutureAmountWithCredit(
                    { ...account, currentAmount: newCurrentAmount } as Account,
                    tx
                );

            const newFutureAmountWithoutCredit =
                newCurrentAmount - await calculateFutureAmountWithoutCredit(
                    { ...account, currentAmount: newCurrentAmount } as Account,
                    tx
                );

            await tx.account.update({
                where: { id: account.id },
                data: {
                    currentAmount: newCurrentAmount,
                    futureAmountWithCredit: newFutureAmountWithCredit,
                    futureAmountWithoutCredit: newFutureAmountWithoutCredit,
                },
            });

            console.log('Amounts after operation: ');
            console.log('Current amount:' + newCurrentAmount);
            console.log('Future amount with credit amount:' + newFutureAmountWithCredit);
            console.log('Future amount without credit amount:' + newFutureAmountWithoutCredit);

            if (dbMonthlyCredit.internal === 1 && dbMonthlyCredit.bankAccountId) {
                const bankAccount = await tx.bank_account.findUnique({
                    where: { id: dbMonthlyCredit.bankAccountId },
                });

                if (bankAccount) {
                    const bankAmount = Number(bankAccount.amount ?? 0);
                    console.log('Debit Bank account ' + bankAccount.name + ' of ' + amount);

                    await tx.bank_account.update({
                        where: { id: bankAccount.id },
                        data: {
                            amount: bankAmount - amount,
                        },
                    });
                }
            }

            console.log('---------------------------------------------------------------');

            return {
                ...updatedMonthlyCredit,
                credited: true,
                internal: updatedMonthlyCredit.internal === 1,
                account: {
                    ...account,
                    currentAmount: newCurrentAmount,
                    futureAmountWithCredit: newFutureAmountWithCredit,
                    futureAmountWithoutCredit: newFutureAmountWithoutCredit,
                },
            } as MonthlyCredit;
        });
    }

}



async function calculateFutureAmountWithoutCredit(account: Account, tx?: any): Promise<number> {
    const amountTobeDebitedMonthly: number = await operationRepository.amountToBeDebitedMonthly(account.id, tx);
    const amountTobeDebitedLive: number = await operationRepository.amountToBeDebitedLive(account.id, tx);
    return amountTobeDebitedMonthly + amountTobeDebitedLive;
}

async function calculateFutureAmountWithCredit(account: Account, tx?: any): Promise<number> {
    const amountTobeDebited = await calculateFutureAmountWithoutCredit(account, tx);
    const amountTobeCreditedMonthly: number = await operationRepository.amountToBeCreditedMonthly(account.id, tx);
    const amountTobeCreditedLive: number = await operationRepository.amountToBeCreditedLive(account.id, tx);
    return amountTobeDebited - (amountTobeCreditedMonthly + amountTobeCreditedLive);
}
