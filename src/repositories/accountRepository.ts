import prisma from '../config/db.js';
import { account as PrismaAccount } from '@prisma/client';
import { user as PrismaUser, Prisma } from '@prisma/client';

export const accountRepository = {
  /**
   * Récupère tous les comptes liés à l'identifiant d'un utilisateur
   */
  findByUser: async (user: PrismaUser, tx?: Prisma.TransactionClient): Promise<PrismaAccount | null> => {
    const client = tx || prisma;
    return await client.account.findFirst({
      where: { userId: user.id },
      include: {
        user: true // 👈 CRUCIAL : Force Prisma à peupler l'objet 'user' dans la réponse
      }
    });

  },

  create: async (data: Prisma.accountCreateInput, tx?: Prisma.TransactionClient): Promise<PrismaAccount> => {
    const client = tx || prisma;
    return await client.account.create({
      data: data
    });
  },

};

