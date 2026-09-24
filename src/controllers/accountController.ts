import { NextFunction, Request, Response } from 'express';
import { accountService } from '../services/accountService.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { reportService } from '../services/reportService.js';
import { historyService } from '../services/historyService.js';

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
    res.status(200).json(amount );
  } catch (error) {
    next(error);
  }
};

export const reset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    console.log('Reset account',account);
    if (account.user) {
      await reportService.createAndSendReport(account.user);
    }
    await historyService.updateHistory(account.id)
    await historyService.createHistory(account)
    await accountService.reset(account)
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getHistories= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    const histories = await historyService.getHistories(account);
    res.status(200).json(histories);
  } catch (error) {
    next(error);
  }
};

