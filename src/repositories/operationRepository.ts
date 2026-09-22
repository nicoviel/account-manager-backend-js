import prisma from '../config/db.js';
import { Prisma } from '@prisma/client';
import { Account } from '../models/account.model.js';
import { LiveCredit, LiveDebit, MonthlyCredit, MonthlyDebit } from '../models/operation.model.js';

export const operationRepository = {

  getMonthlyDebit: async (account: Account, tx?: Prisma.TransactionClient): Promise<MonthlyDebit[]> => {
    const client = tx || prisma;
    const rows = await client.monthly_debit.findMany({
      where: { accountId: account.id }
    });
     return rows.map(r => ({
    ...r,
      debited: r.debited === 1,
      internal: r.internal === 1
  }));
  },
  getMonthlyCredit: async (account: Account, tx?: Prisma.TransactionClient): Promise<MonthlyCredit[]> => {
    const client = tx || prisma;
    const rows = await client.monthly_credit.findMany({
      where: { accountId: account.id }
    });
     return rows.map(r => ({
    ...r,
      credited: r.credited === 1,
      internal: r.internal === 1
  }));
  },

  getLiveDebit: async (account: Account, tx?: Prisma.TransactionClient): Promise<LiveDebit[]> => {
    const client = tx || prisma;
    const rows = await client.live_debit.findMany({
      where: { accountId: account.id }
    });
     return rows.map(r => ({
    ...r,
      debited: r.debited === 1,
      internal: r.internal === 1
  }));
  },

  getLiveCredit: async (account: Account, tx?: Prisma.TransactionClient): Promise<LiveCredit[]> => {
    const client = tx || prisma;
    const rows = await client.live_credit.findMany({
      where: { accountId: account.id }
    });
     return rows.map(r => ({
    ...r,
      credited: r.credited === 1,
      internal: r.internal === 1
  }));
  },

  async saveMonthlyDebit (operation: MonthlyDebit, tx?: Prisma.TransactionClient): Promise<any>  {
    const client = tx || prisma;

    // 1. On extrait et convertit les données pour correspondre à MySQL
    const formattedData: any = {
      date: operation.date,
      label: operation.label,
      amount: operation.amount,
      comment: operation.comment,
      // Conversion explicite des booléens en entiers (0 ou 1)
      debited: operation.debited ? 1 : 0,
      internal: operation.internal ? 1 : 0,
    };

    this.operationBankAccountAndAccountMapping(operation, formattedData);

    return await client.monthly_debit.create({
      data: formattedData
    });
  },

  async saveMonthlyCredit (operation: MonthlyCredit, tx?: Prisma.TransactionClient): Promise<any> {
    const client = tx || prisma;

    // 1. On extrait et convertit les données pour correspondre à MySQL
    const formattedData: any = {
      date: operation.date,
      label: operation.label,
      amount: operation.amount,
      comment: operation.comment,
      // Conversion explicite des booléens en entiers (0 ou 1)
      credited: operation.credited ? 1 : 0,
      internal: operation.internal ? 1 : 0,
    };

    this.operationBankAccountAndAccountMapping(operation, formattedData);

    return await client.monthly_credit.create({
      data: formattedData
    });
  },


async saveLiveDebit(operation: LiveDebit, tx?: Prisma.TransactionClient): Promise<any> {
  const client = tx || prisma;

  // 1. On extrait et convertit les données pour correspondre à MySQL
  const formattedData: any = {
    date: operation.date,
    label: operation.label,
    amount: operation.amount,
    comment: operation.comment,
    // Conversion explicite des booléens en entiers (0 ou 1)
    debited: operation.debited ? 1 : 0,
    internal: operation.internal ? 1 : 0,
  };

  this.operationBankAccountAndAccountMapping(operation, formattedData);

  // 4. Envoi de l'objet nettoyé dans la bonne transaction
  return await client.live_debit.create({
    data: formattedData
  });
},


  async saveLiveCredit (operation: LiveCredit, tx?: Prisma.TransactionClient): Promise<any> {
    const client = tx || prisma;

    // 1. On extrait et convertit les données pour correspondre à MySQL
    const formattedData: any = {
      date: operation.date,
      label: operation.label,
      amount: operation.amount,
      comment: operation.comment,
      // Conversion explicite des booléens en entiers (0 ou 1)
      credited: operation.credited ? 1 : 0,
      internal: operation.internal ? 1 : 0,
    };

    this.operationBankAccountAndAccountMapping(operation, formattedData);

    return await client.live_credit.create({
      data: formattedData
    });
  },

  amountToBeDebitedMonthly: async (accountId: number, tx?: Prisma.TransactionClient): Promise<number> => {
    const client = tx || prisma;
    const result = await client.monthly_debit.aggregate({
      where: { accountId: accountId, debited: 0 },
      _sum: { amount: true }
    });
    return result._sum.amount || 0;
  },

  amountToBeDebitedLive: async (accountId: number, tx?: Prisma.TransactionClient): Promise<number> => {
    const client = tx || prisma;
    const result = await client.live_debit.aggregate({
      where: { accountId: accountId, debited: 0 },
      _sum: { amount: true }
    });
    return result._sum.amount || 0;
  },

  amountToBeCreditedMonthly: async (accountId: number, tx?: Prisma.TransactionClient): Promise<number> => {
    const client = tx || prisma;
    const result = await client.monthly_credit.aggregate({
      where: { accountId: accountId, credited: 0 },
      _sum: { amount: true }
    });
    return result._sum.amount || 0;
  },

  amountToBeCreditedLive: async (accountId: number, tx?: Prisma.TransactionClient): Promise<number> => {
    const client = tx || prisma;
    const result = await client.live_credit.aggregate({
      where: { accountId: accountId, credited: 0 },
      _sum: { amount: true }
    });
    return result._sum.amount || 0;
  },


  updateMonthlyCredit: async (id: number, data: Prisma.monthly_creditUpdateInput, tx?: Prisma.TransactionClient): Promise<any> => {
    const client = tx || prisma;
    return await client.monthly_credit.update({
      where: { id: id },
      data: data
    });
  },

  updateMonthlyDebit: async (id: number, data: Prisma.monthly_debitUpdateInput, tx?: Prisma.TransactionClient): Promise<any> => {
    const client = tx || prisma;
    return await client.monthly_debit.update({
      where: { id: id },
      data: data
    });
  },



  operationBankAccountAndAccountMapping(operation: any, formattedData: any): any {
        // 2. Mapping de la relation 'account' (Style Hibernate -> Connecteur Prisma)
    if (operation.account && operation.account.id) {
      formattedData.account = { connect: { id: operation.account.id } };
    } else if (operation.accountId) {
      formattedData.accountId = operation.accountId;
    }

    // 3. Mapping de la relation 'bankAccount'
    if (operation.bankAccount && operation.bankAccount.id) {
      formattedData.bankAccount = { connect: { id: operation.bankAccount.id } };
    } else if (operation.bankAccountId) {
      formattedData.bankAccountId = operation.bankAccountId;
    }

  }
};
