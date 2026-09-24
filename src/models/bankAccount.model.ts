
import { bank_account as PrismaBankAccount } from '@prisma/client';
import { User } from './user.model';


export type BankAccount = PrismaBankAccount & {
    user?:User
};