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
                    account.futureAmountWithCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithCredit(account,tx) : 0;
                    account.futureAmountWithoutCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithoutCredit(account,tx) : 0;
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
                    account.futureAmountWithCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithCredit(account,tx) : 0;
                    account.futureAmountWithoutCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithoutCredit(account,tx) : 0;
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
                    account.futureAmountWithCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithCredit(account,tx) : 0;
                    account.futureAmountWithoutCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithoutCredit(account,tx) : 0;
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
                    await operationRepository.saveMonthlyDebit (operation, tx);
                    account.futureAmountWithCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithCredit(account,tx) : 0;
                    account.futureAmountWithoutCredit = account.currentAmount ? account.currentAmount - await calculateFutureAmountWithoutCredit(account,tx) : 0;
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




}

async function calculateFutureAmountWithoutCredit(account: Account, tx?: any): Promise<number> {
    const amountTobeDebitedMonthly :number  = await  operationRepository.amountToBeDebitedMonthly(account.id,tx);
    const amountTobeDebitedLive :number  =  await  operationRepository.amountToBeDebitedLive(account.id,tx);
    return amountTobeDebitedMonthly+amountTobeDebitedLive;
}

async function calculateFutureAmountWithCredit(account: Account, tx?: any): Promise<number> {
    const amountTobeDebited = await calculateFutureAmountWithoutCredit(account, tx);
    const amountTobeCreditedMonthly :number  = await  operationRepository.amountToBeCreditedMonthly(account.id,tx);
    const amountTobeCreditedLive :number  = await  operationRepository.amountToBeCreditedLive(account.id,tx);
    return amountTobeDebited - (amountTobeCreditedMonthly + amountTobeCreditedLive);
}
