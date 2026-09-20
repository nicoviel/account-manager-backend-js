
import { account as PrismaAccount } from '@prisma/client';
import { User } from './user.model';


export type Account = PrismaAccount & {
    user: User | null
};