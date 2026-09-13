import prisma from '../config/db.js';
import { note  as PrismaNote } from '@prisma/client'; 
import { user  as PrismaUser,Prisma } from '@prisma/client'; 
import { NoteInput } from '../models/note.model.js';

export const noteRepository = {
  
  findByUser: async (user: PrismaUser, tx?: Prisma.TransactionClient ): Promise<PrismaNote | null> => {
    const client = tx || prisma;
    return await client.note.findFirst({
      where: { userId: user.id }
    });
  },

save: async (note: NoteInput, tx?: Prisma.TransactionClient ): Promise<PrismaNote | null> => {
  const client = tx || prisma;

  return client.note.upsert({
    where: { userId: note.user.id },
    update: { text: note.text },
    create: {
      text: note.text,
      userId: note.user.id
    }
  });
}


};
