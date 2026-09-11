
import { account as PrismaAccount } from '@prisma/client';
import { user as PrismaUser } from '@prisma/client';
import { accountRepository } from '../repositories/accountRepository.js';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';

export const accountService = {

    findByUser: async (user: PrismaUser): Promise<PrismaAccount | null > => {
        return  await accountRepository.findByUser(user);

    },

    totalCurrentAmount: async (user: PrismaUser): Promise<number> => {
        const account: PrismaAccount | null = await accountRepository.findByUser(user);
        if (account) {
            const amount:number = await bankAccountRepository.totalAmountForAllAccount(user);
            return account.currentAmount? account.currentAmount + amount : amount;
         }
         return 0;
    }
}