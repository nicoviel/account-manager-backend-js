import { Request, Response } from 'express';
import { account as PrismaAccount } from '@prisma/client';
import { operationRepository } from '../repositories/operationRepository.js';
import { monthly_debit as PrismaMonthlyDebit } from '@prisma/client';
import { monthly_credit as PrismaMonthlyCredit } from '@prisma/client';
import { live_debit as PrismaLiveDebit } from '@prisma/client';
import { live_credit as PrismaLiveCredit } from '@prisma/client';
import { operationService } from '../services/operationService.js';

export const getMonthlyDebit = async (req: Request, borderRes: Response): Promise<any> => {
  const account: PrismaAccount = req.body;
  try {
    const operations: PrismaMonthlyDebit[] = await operationService.getMonthlyDebit(account);
    console.log("Monthly debit retrieved:", operations);
    borderRes.setHeader('Content-Type', 'application/json');
     return borderRes.status(200).send(JSON.stringify(operations));
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};


export const getMonthlyCredit = async (req: Request, borderRes: Response): Promise<any> => {
  const account: PrismaAccount = req.body;
  try {
    const operations: PrismaMonthlyCredit[] = await operationService.getMonthlyCredit(account);
    console.log("Monthly credit retrieved:", operations);
    borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).send(JSON.stringify(operations));
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};

export const getLiveDebit = async (req: Request, borderRes: Response): Promise<any> => {
  const account: PrismaAccount = req.body;
  try {
    const operations: PrismaLiveDebit[] = await operationService.getLiveDebit(account);
    console.log("Live debit retrieved:", operations);
    borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).send(JSON.stringify(operations));
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};


export const getLiveCredit = async (req: Request, borderRes: Response): Promise<any> => {
  const account: PrismaAccount = req.body;
  try {
    const operations: PrismaLiveCredit[] = await operationService.getLiveCredit(account);
    console.log("Live credit retrieved:", operations);
  borderRes.setHeader('Content-Type', 'application/json');
    return borderRes.status(200).send(JSON.stringify(operations));
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};
