import prisma from '../config/db.js';

import { account  as PrismaAccount,Prisma } from '@prisma/client'; 
import { monthly_debit as PrismaMonthlyDebit } from '@prisma/client';
import { monthly_credit as PrismaMonthlyCredit } from '@prisma/client';
import { live_debit as PrismaLiveDebit } from '@prisma/client';
import { live_credit as PrismaLiveCredit } from '@prisma/client';

export const operationRepository = {
  
  getMonthlyDebit: async (account: PrismaAccount, tx?: Prisma.TransactionClient ): Promise<PrismaMonthlyDebit[] > => {
    const client = tx || prisma;
    return await client.monthly_debit.findMany({
      where: { accountId: account.id }
    });
  },
  getMonthlyCredit: async (account: PrismaAccount, tx?: Prisma.TransactionClient ): Promise<PrismaMonthlyCredit[] > => {
    const client = tx || prisma;
    return await client.monthly_credit.findMany({
      where: { accountId: account.id }
    });
  },

    getLiveDebit: async (account: PrismaAccount, tx?: Prisma.TransactionClient ): Promise<PrismaLiveDebit[] > => {
    const client = tx || prisma;
    return await client.live_debit.findMany({
      where: { accountId: account.id }
    });
  },
    getLiveCredit: async (account: PrismaAccount, tx?: Prisma.TransactionClient ): Promise<PrismaLiveCredit[] > => {
    const client = tx || prisma;
    return await client.live_credit.findMany({
      where: { accountId: account.id }
    });
  },
};
