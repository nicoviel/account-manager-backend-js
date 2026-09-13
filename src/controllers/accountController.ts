import { NextFunction, Request, Response } from 'express';
import { accountService } from '../services/accountService.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';

export const getAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: User = req.body;
    const account: Account | null = await accountService.findByUser(user);
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

export const totalCurrentAmount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: User = req.body;
    const amount: number = await accountService.totalCurrentAmount(user);
    res.status(200).json({ amount });
  } catch (error) {
    next(error);
  }
};