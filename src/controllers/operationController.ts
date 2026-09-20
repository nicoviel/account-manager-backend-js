import { NextFunction, Request, Response } from 'express';

import { operationService } from '../services/operationService.js';
import { Account } from '../models/account.model.js';
import { LiveCredit, LiveDebit, MonthlyCredit, MonthlyDebit } from '../models/operation.model.js';

export const getMonthlyDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    const operations: MonthlyDebit[] = await operationService.getMonthlyDebit(account);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(operations));
  } catch (error) {
    next(error);
  }
};

export const getMonthlyCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    const operations: MonthlyCredit[] = await operationService.getMonthlyCredit(account);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(operations));
  } catch (error) {
    next(error);
  }
};

export const getLiveDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    const operations: LiveDebit[] = await operationService.getLiveDebit(account);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(operations));
  } catch (error) {
    next(error);
  }
};

export const getLiveCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    const operations: LiveCredit[] = await operationService.getLiveCredit(account);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(operations));
  } catch (error) {
    next(error);
  }
};

export const createLiveDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: LiveDebit = req.body;
    await operationService.createLiveDebit(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const createLiveCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: LiveCredit = req.body;
    await operationService.createLiveCredit(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const createMonthlyDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: MonthlyDebit = req.body;
    await operationService.createMonthlyDebit(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const createMonthlyCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: MonthlyCredit = req.body;
    await operationService.createMonthlyCredit(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const debitLiveCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: LiveCredit = req.body;
    await operationService.debitLiveCredit(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const debitMonthlyCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: MonthlyCredit = req.body;
    await operationService.debitMonthlyCredit(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const debitMonthlyDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: MonthlyDebit = req.body;
    await operationService.debitMonthlyDebit(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const debitLiveDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: LiveDebit = req.body;
    await operationService.debitLiveDebit(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteMonthlyDebit= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const operation: LiveDebit = req.body;
    await operationService.deleteMonthlyDebit(id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};


export const deleteLiveDebit= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const operation: LiveDebit = req.body;
    await operationService.deleteLiveDebit(id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteLiveCredit= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const operation: LiveDebit = req.body;
    await operationService.deleteLiveCredit(id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteMonthlyCredit= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const operation: LiveDebit = req.body;
    await operationService.deleteMonthlyCredit(id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const debitMonthlyDebits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: MonthlyDebit[] = req.body;
    await operationService.debitMonthlyDebits(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const debitLiveDebits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: LiveDebit[] = req.body;
    await operationService.debitLiveDebits(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const creditLiveCredits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: LiveCredit[] = req.body;
    await operationService.creditLiveCredits(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const creditMonthlyCredits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: MonthlyCredit[] = req.body;
    await operationService.creditMonthlyCredits(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
