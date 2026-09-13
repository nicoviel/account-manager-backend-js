import { NextFunction, Request, Response } from 'express';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';
import { User } from '../models/user.model.js';
import { BankAccount } from '../models/bankAccount.model.js';

export const getBankAccounts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: User = req.body;
    const accounts: BankAccount[] | null = await bankAccountRepository.findByUser(user);
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};
