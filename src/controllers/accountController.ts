import { NextFunction, Request, Response } from 'express';
import { accountService } from '../services/accountService.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { reportService } from '../services/reportService.js';
import { historyService } from '../services/historyService.js';

export const getAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: User = req.body;
    console.log('AccountController.getAccount Input user', user)
    const account: Account | null = await accountService.findByUser(user);
    console.log('AccountController.getAccount Output account', account)
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

export const totalCurrentAmount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: User = req.body;
    console.log('AccountController.totalCurrentAmount Input user', user)
    const amount: number = await accountService.totalCurrentAmount(user);
    console.log('AccountController.totalCurrentAmount Output amount', amount)
    res.status(200).json(amount);
  } catch (error) {
    next(error);
  }
};

export const reset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    console.log('AccountController.reset Input account', account)
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

export const getHistories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    console.log('AccountController.getHistories Input account', account)
    const histories = await historyService.getHistories(account);
    console.log('getHistories Output histories', histories)
    res.status(200).json(histories);
  } catch (error) {
    next(error);
  }
};

