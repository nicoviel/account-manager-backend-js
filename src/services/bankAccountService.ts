import { accountRepository } from '../repositories/accountRepository.js';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { operationRepository } from '../repositories/operationRepository.js';
import prisma from '../config/db.js';
import { operationService } from './operationService.js';
import { BankAccount } from '../models/bankAccount.model.js';

export const bankAccountService = {
    findByUser: async (user: User): Promise<BankAccount[]> => {
        return await bankAccountRepository.findByUser(user);
      },


  save: async (data: BankAccount) => {
    await bankAccountRepository.save(data);
  },

  totalAmountForAllAccount: async (user: User): Promise<number> => {
    return await bankAccountRepository.totalAmountForAllAccount(user);
  },


  delete:async (id: number) => {
     await prisma.$transaction(async (tx) => {
      await operationRepository.detachMonthlyCreditFromBankAccount(id,tx);
      await operationRepository.detachMonthlyDebitFromBankAccount(id,tx);
      await operationRepository.detachLiveCreditFromBankAccount(id,tx);
      await operationRepository.detachLiveDebitFromBankAccount(id,tx);
      await bankAccountRepository.delete(id,tx);
     });
  }
}