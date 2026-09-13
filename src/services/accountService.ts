import { accountRepository } from '../repositories/accountRepository.js';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';

export const accountService = {

    findByUser: async (user: User): Promise<Account | null > => {
        return  await accountRepository.findByUser(user);

    },

    totalCurrentAmount: async (user: User): Promise<number> => {
        const account: Account | null = await accountRepository.findByUser(user);
        if (account) {
            const amount:number = await bankAccountRepository.totalAmountForAllAccount(user);
            return account.currentAmount? account.currentAmount + amount : amount;
         }
         return 0;
    }
}