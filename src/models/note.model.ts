
import { note as PrismaNote } from '@prisma/client';
import { user as PrismaUser } from '@prisma/client';


export type NoteInput = PrismaNote & {
  user: PrismaUser;
};