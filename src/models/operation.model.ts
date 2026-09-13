import { account as PrismaAccount } from '@prisma/client';
import { live_debit as PrismaLiveDebit } from '@prisma/client';
import { live_credit as PrismaLiveCredit } from '@prisma/client';
import { monthly_debit as PrismaMonthlyDebit } from '@prisma/client';
import { monthly_credit as PrismaMonthlyCredit } from '@prisma/client';
import { bank_account as PrismaBankAccount } from '@prisma/client';


export type LiveDebitWithAccount = PrismaLiveDebit & {
  account?: PrismaAccount;
  bankAccount?: PrismaBankAccount;
};

export type LiveCreditWithAccount = PrismaLiveCredit & {
  account?: PrismaAccount;
  bankAccount?: PrismaBankAccount;
};

export type MonthlyCreditWithAccount = PrismaMonthlyCredit & {
  account?: PrismaAccount;
  bankAccount?: PrismaBankAccount;
};
export type MonthlyDebitWithAccount = PrismaMonthlyDebit & {
  account?: PrismaAccount;
  bankAccount?: PrismaBankAccount;
};