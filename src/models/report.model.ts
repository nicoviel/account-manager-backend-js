
import { account as PrismaAccount } from '@prisma/client';
import { User } from './user.model';
import { Account } from './account.model';
import { LiveCredit, LiveDebit, MonthlyCredit, MonthlyDebit } from './operation.model';
import { Note } from './note.model';


export type ReportTemplate = {
    login: string| null;
    firstName: string| null;
    lastName: string| null;
    account?: Account| null;
    monthlyDebits?: MonthlyDebit[] | null; 
    liveDebits?: LiveDebit[] | null; 
    liveCredits?:LiveCredit[] | null; 
    monthlyCredits?: MonthlyCredit[] | null; 
    note?:Note | null;

};