import { Request, Response } from 'express';
import { operationRepository } from '../repositories/operationRepository.js';
import { operationService } from '../services/operationService.js';
import { Account } from '../models/account.model.js';
import { LiveCredit, LiveDebit, LiveDebit, MonthlyCredit, MonthlyDebit } from '../models/operation.model.js';

export const getMonthlyDebit = async (req: Request, borderRes: Response): Promise<any> => {
  const account: Account = req.body;
  try {
    const operations: MonthlyDebit[] = await operationService.getMonthlyDebit(account);
    //console.log("Monthly debit retrieved:", operations);
    borderRes.setHeader('Content-Type', 'application/json');
     return borderRes.status(200).send(JSON.stringify(operations));
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};


export const getMonthlyCredit = async (req: Request, borderRes: Response): Promise<any> => {
  const account: Account = req.body;
  try {
    const operations: MonthlyCredit[] = await operationService.getMonthlyCredit(account);
    //console.log("Monthly credit retrieved:", operations);
    borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).send(JSON.stringify(operations));
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};

export const getLiveDebit = async (req: Request, borderRes: Response): Promise<any> => {
  const account: Account = req.body;
  try {
    const operations: LiveDebit[] = await operationService.getLiveDebit(account);
    //console.log("Live debit retrieved:", operations);
    borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).send(JSON.stringify(operations));
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};


export const getLiveCredit = async (req: Request, borderRes: Response): Promise<any> => {
  const account: Account = req.body;
  try {
    const operations: LiveCredit[] = await operationService.getLiveCredit(account);
    //console.log("Live credit retrieved:", operations);
  borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).send(JSON.stringify(operations));
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};


export const createLiveDebit = async (req: Request, borderRes: Response): Promise<any> => {
  const operation: LiveDebit = req.body;
  try {
    await operationService.createLiveDebit(operation);

  borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};

export const createLiveCredit = async (req: Request, borderRes: Response): Promise<any> => {
  const operation: LiveCredit = req.body;
  try {
    await operationService.createLiveCredit(operation);

    borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};

export const createMonthlyDebit = async (req: Request, borderRes: Response): Promise<any> => {
  const operation: MonthlyDebit = req.body;
  try {
    await operationService.createMonthlyDebit(operation);

  borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};

export const createMonthlyCredit = async (req: Request, borderRes: Response): Promise<any> => {
  const operation: MonthlyCredit = req.body;
  try {
    await operationService.createMonthlyCredit(operation);

  borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};
