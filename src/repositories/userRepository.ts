import prisma from '../config/db.js';
import { user  as PrismaUser, Prisma } from '@prisma/client'; 

export const userRepository = {
    findByUser: async (login: string, tx?: Prisma.TransactionClient): Promise<PrismaUser | null> => {
    const client = tx || prisma;
    return await client.user.findFirst({
      where: { login: login }
    });
  },

  create: async (data: Prisma.userCreateInput, tx?: Prisma.TransactionClient): Promise<PrismaUser> => {
    const client = tx || prisma;
    return await client.user.create({
      data: data
    });
  }

};

