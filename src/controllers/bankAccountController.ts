import { NextFunction, Request, Response } from 'express';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';
import { User } from '../models/user.model.js';
import { BankAccount } from '../models/bankAccount.model.js';
import { bankAccountService } from '../services/bankAccountService.js';

export const getBankAccounts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: User = req.body;
    const accounts: BankAccount[] | null = await bankAccountService.findByUser(user);
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: BankAccount = req.body;
    await bankAccountService.save(account);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await bankAccountService.delete(id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};