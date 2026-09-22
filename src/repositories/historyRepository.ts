import prisma from '../config/db.js';
import { Prisma } from '@prisma/client';
import { History } from '../models/history.model.js';

export const historyRepository = {

  findByAccountIdOrderByDescId: async (accountId: number, tx?: Prisma.TransactionClient): Promise<History[]> => {
    const client = tx || prisma;
    return await client.history.findMany({
      where: { accountId: accountId },
      orderBy: {
        id: 'desc'
      }
    });
  },

  update: async (data: History, tx?: Prisma.TransactionClient): Promise<History> => {
    const client = tx || prisma;
    return await client.history.update({
      where: { id: data.id },
      data: data,
    });
  },

create: async (data: Prisma.historyCreateInput, tx?: Prisma.TransactionClient): Promise<History> => {
  const client = tx || prisma;
  return await client.history.create({
    data,
  });
},


};
