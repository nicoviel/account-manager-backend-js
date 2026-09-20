import prisma from '../config/db.js';
import { Prisma } from '@prisma/client';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { bankAccountRepository } from './bankAccountRepository.js';

export const accountRepository = {
  /**
   * Récupère tous les comptes liés à l'identifiant d'un utilisateur
   */
  findByUser: async (user: User, tx?: Prisma.TransactionClient): Promise<Account | null> => {
    const client = tx || prisma;
    return await client.account.findFirst({
      where: { userId: user.id },
      include: {
        user: true // 👈 CRUCIAL : Force Prisma à peupler l'objet 'user' dans la réponse
      }
    });

  },

  create: async (data: Prisma.accountCreateInput, tx?: Prisma.TransactionClient): Promise<Account> => {
    const client = tx || prisma;
    return await client.account.create({
      data: data,
      include: {
        user: true
      }
    });
  },

  findById: async (id: number, tx?: Prisma.TransactionClient): Promise<Account | null> => {
    const client = tx || prisma;
    return await client.account.findUnique({
      where: { id: id },
      include: {
        user: true
      }
    });

  },

  update: async (id: number, data: Prisma.accountUpdateInput, tx?: Prisma.TransactionClient): Promise<Account> => {
    const client = tx || prisma;
    return await client.account.update({
      where: { id: id },
      data: data,
      include: {
        user: true
      }
    });
  },

  getTotalCurrentAmount: async (user: User): Promise<number> => {
    const account: Account | null = await accountRepository.findByUser(user);
    if (!account)
      return 0;
    const amount: number = await bankAccountRepository.totalAmountForAllAccount(user);

    return amount + (account.currentAmount ?? 0);
  },

};

