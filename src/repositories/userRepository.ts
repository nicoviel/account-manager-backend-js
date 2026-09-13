import prisma from '../config/db.js';
import { Prisma } from '@prisma/client'; 
import { User } from '../models/user.model.js';

export const userRepository = {
    findByUser: async (login: string, tx?: Prisma.TransactionClient): Promise<User | null> => {
    const client = tx || prisma;
    return await client.user.findFirst({
      where: { login: login }
    });
  },

  create: async (data: Prisma.userCreateInput, tx?: Prisma.TransactionClient): Promise<User> => {
    const client = tx || prisma;
    return await client.user.create({
      data: data
    });
  }

};

