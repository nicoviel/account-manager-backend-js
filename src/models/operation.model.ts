import { live_debit as PrismaLiveDebit } from '@prisma/client';
import { live_credit as PrismaLiveCredit } from '@prisma/client';
import { monthly_debit as PrismaMonthlyDebit } from '@prisma/client';
import { monthly_credit as PrismaMonthlyCredit } from '@prisma/client';

import { Account } from './account.model';
import { BankAccount } from './bankAccount.model';


export type LiveDebit =  Omit<PrismaLiveDebit, "debited"| "internal">  & {
  account?: Account;
  bankAccount?: BankAccount;
  debited: boolean;
  internal: boolean;
};

export type LiveCredit =  Omit<PrismaLiveCredit, "credited"| "internal"> & {
  account?: Account;
  bankAccount?: BankAccount;
  credited: boolean;
  internal: boolean;
};

export type MonthlyCredit =  Omit<PrismaMonthlyCredit, "credited"| "internal"> & {
  account?: Account;
  bankAccount?: BankAccount;
  credited: boolean;
  internal: boolean;
};
export type MonthlyDebit =  Omit<PrismaMonthlyDebit, "debited"| "internal"> & {
  account?: Account;
  bankAccount?: BankAccount;
  debited: boolean;
  internal: boolean;
};
