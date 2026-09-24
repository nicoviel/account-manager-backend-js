import { NextFunction, Request, Response } from 'express';
import { operationService } from '../services/operationService.js';
import { Account } from '../models/account.model.js';
import { LiveCredit, LiveDebit, MonthlyCredit, MonthlyDebit } from '../models/operation.model.js';

export const getMonthlyDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    console.log('OperationController.getMonthlyDebit Input account', account)
    const operations: MonthlyDebit[] = await operationService.getMonthlyDebit(account);
    console.log('OperationController.getMonthlyDebit Output operations', operations)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(operations));
  } catch (error) {
    next(error);
  }
};

export const getMonthlyCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    console.log('OperationController.getMonthlyCredit Input account', account)
    const operations: MonthlyCredit[] = await operationService.getMonthlyCredit(account);
    console.log('OperationController.getMonthlyCredit Output operations', operations)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(operations));
  } catch (error) {
    next(error);
  }
};

export const getLiveDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    console.log('OperationController.getLiveDebit Input account', account)
    const operations: LiveDebit[] = await operationService.getLiveDebit(account);
    console.log('OperationController.getLiveDebit Output operations', operations)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(operations));
  } catch (error) {
    next(error);
  }
};

export const getLiveCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account: Account = req.body;
    console.log('OperationController.getLiveCredit Input account', account)
    const operations: LiveCredit[] = await operationService.getLiveCredit(account);
    console.log('OperationController.getLiveCredit Output operations', operations)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(operations));
  } catch (error) {
    next(error);
  }
};

export const createLiveDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const operation: LiveDebit = req.body;
    console.log('OperationController.createLiveDebit Input operation', operation)
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
    console.log('OperationController.createLiveCredit Input operation', operation)
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
    console.log('OperationController.createMonthlyDebit Input operation', operation)
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
    console.log('OperationController.createMonthlyCredit Input operation', operation)
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
    console.log('OperationController.debitLiveCredit Input operation', operation)
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
    console.log('OperationController.debitMonthlyCredit Input operation', operation)
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
    console.log('OperationController.debitMonthlyDebit Input operation', operation)
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
    console.log('OperationController.debitLiveDebit Input operation', operation)
    await operationService.debitLiveDebit(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteMonthlyDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const operation: LiveDebit = req.body;
    console.log('OperationController.deleteMonthlyDebit Input operation', operation)
    await operationService.deleteMonthlyDebit(id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};


export const deleteLiveDebit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const operation: LiveDebit = req.body;
    console.log('OperationController.deleteLiveDebit Input operation', operation)
    await operationService.deleteLiveDebit(id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteLiveCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const operation: LiveDebit = req.body;
    console.log('OperationController.deleteLiveCredit Input operation', operation)
    await operationService.deleteLiveCredit(id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteMonthlyCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const operation: LiveDebit = req.body;
    console.log('OperationController.deleteMonthlyCredit Input operation', operation)
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
    console.log('OperationController.debitMonthlyDebits Input operation', operation)
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
    console.log('OperationController.debitLiveDebits Input operation', operation)
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
    console.log('OperationController.creditLiveCredits Input operation', operation)
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
    console.log('OperationController.creditMonthlyCredits Input operation', operation)
    await operationService.creditMonthlyCredits(operation);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
