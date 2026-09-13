
import { note as PrismaNote } from '@prisma/client';
import { User } from './user.model';


export type Note = PrismaNote & {
  user: User;
};