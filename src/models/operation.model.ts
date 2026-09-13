import { live_debit as PrismaLiveDebit } from '@prisma/client';
import { live_credit as PrismaLiveCredit } from '@prisma/client';
import { monthly_debit as PrismaMonthlyDebit } from '@prisma/client';
import { monthly_credit as PrismaMonthlyCredit } from '@prisma/client';

import { Account } from './account.model';
import { BankAccount } from './bankAccount.model';


export type LiveDebit = PrismaLiveDebit & {
  account?: Account;
  bankAccount?: BankAccount;
};

export type LiveCredit = PrismaLiveCredit & {
  account?: Account;
  bankAccount?: BankAccount;
};

export type MonthlyCredit = PrismaMonthlyCredit & {
  account?: Account;
  bankAccount?: BankAccount;
};
export type MonthlyDebit = PrismaMonthlyDebit & {
  account?: Account;
  bankAccount?: BankAccount;
};