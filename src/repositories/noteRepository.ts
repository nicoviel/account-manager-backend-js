import prisma from '../config/db.js';
import { note  as PrismaNote } from '@prisma/client'; 
import { user  as PrismaUser,Prisma } from '@prisma/client'; 

export const noteRepository = {
  
  findByUser: async (user: PrismaUser, tx?: Prisma.TransactionClient ): Promise<PrismaNote | null> => {
    const client = tx || prisma;
    return await client.note.findFirst({
      where: { userId: user.id }
    });
  }

};
