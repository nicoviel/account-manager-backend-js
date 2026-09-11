import prisma from '../config/db.js';
import { bank_account as PrismaBankAccount } from '@prisma/client';
import { user as PrismaUser, Prisma } from '@prisma/client';

export const bankAccountRepository = {

  findByUser: async (user: PrismaUser, tx?: Prisma.TransactionClient): Promise<PrismaBankAccount[]> => {
    const client = tx || prisma;
    return await client.bank_account.findMany({
      where: { userId: user.id }
    });
  },



  totalAmountForAllAccount: async (user: PrismaUser, tx?: Prisma.TransactionClient): Promise<number> => {
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
  }
};
