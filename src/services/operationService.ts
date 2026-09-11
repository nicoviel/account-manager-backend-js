import { account  as PrismaAccount } from '@prisma/client'; 
import { monthly_debit  as PrismaMonthyDebit } from '@prisma/client'; 
import { operationRepository } from '../repositories/operationRepository.js';
import { monthly_credit as PrismaMonthlyCredit } from '@prisma/client';
import { live_debit as PrismaLiveDebit } from '@prisma/client';
import { live_credit as PrismaLiveCredit } from '@prisma/client';

export const operationService = {

    getMonthlyDebit: async (account: PrismaAccount): Promise<PrismaMonthyDebit[] > => {
        const debits: PrismaMonthyDebit[]  = await operationRepository.getMonthlyDebit(account);
        return debits;
    },

    getMonthlyCredit: async (account: PrismaAccount): Promise<PrismaMonthlyCredit[] > => {
        const credits: PrismaMonthlyCredit[]  = await operationRepository.getMonthlyCredit(account);
        return credits;
    },

    getLiveDebit: async (account: PrismaAccount): Promise<PrismaLiveDebit[] > => {
        const debits: PrismaLiveDebit[]  = await operationRepository.getLiveDebit(account);
        return debits;
    },

    getLiveCredit: async (account: PrismaAccount): Promise<PrismaLiveCredit[] > => {
        const credits: PrismaLiveCredit[]  = await operationRepository.getLiveCredit(account);
        return credits;
    }

}