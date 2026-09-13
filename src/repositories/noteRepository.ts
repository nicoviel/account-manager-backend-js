import prisma from '../config/db.js';
import { Prisma } from '@prisma/client';
import { Note } from '../models/note.model.js';
import { User } from '../models/user.model.js';

export const noteRepository = {

  findByUser: async (user: User, tx?: Prisma.TransactionClient): Promise<Note | null> => {
    const client = tx || prisma;
    return await client.note.findFirst({
      where: { userId: user.id },
      include: { user: true }
    }) as Note | null;
  },

  save: async (note: Note, tx?: Prisma.TransactionClient): Promise<Note | null> => {
    const client = tx || prisma;
    const result = await client.note.upsert({
      where: { userId: note.user.id },
      update: { text: note.text },
      create: {
        text: note.text,
        userId: note.user.id
      },
      include: { user: true }   // ← indispensable si Note contient user
    });

    return result as Note;       // ou as Note | null si tu veux être cohérent avec la signature
  }



};
