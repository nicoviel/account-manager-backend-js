import prisma from '../config/db.js';
import { Prisma } from '@prisma/client';
import { User } from '../models/user.model.js';
import { BankAccount } from '../models/bankAccount.model.js';

export const bankAccountRepository = {

  findByUser: async (user: User, tx?: Prisma.TransactionClient): Promise<BankAccount[]> => {
    const client = tx || prisma;
    return await client.bank_account.findMany({
      where: { userId: user.id }
    });
  },


  save: async (data: BankAccount, tx?: Prisma.TransactionClient) => {
    const client = tx || prisma;
    return await client.bank_account.create({
      data: {
        amount: data.amount,
        name: data.name,
        company: data.company,
        user: {
          connect: { id: data.user.id }   // ✔️ connexion propre
        }
      },
      include: { user: true }
    });
  },

  totalAmountForAllAccount: async (user: User, tx?: Prisma.TransactionClient): Promise<number> => {
    const client = tx || prisma;
    const result = await prisma.bank_account.aggregate({
      where: {
        userId: user.id // Filtre sur l'id de l'utilisateur (vérifiez la casse exacte de votre schéma, ex: user_id ou userId)
      },
      _sum: {
        amount: true // Indique à Prisma qu'on veut faire la somme de cette colonne
      }
    });
    return result._sum.amount || 0;
  },

  delete: async (id: number, tx?: Prisma.TransactionClient) => {
    const client = tx || prisma;
    await client.bank_account.delete({
      where: { id: id }
    });

  }
};
