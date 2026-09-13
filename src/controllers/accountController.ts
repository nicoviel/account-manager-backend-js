import { Request, Response } from 'express';
import { accountService } from '../services/accountService.js';
import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';

export const getAccount = async (req: Request, borderRes: Response): Promise<any> => {
  const user: User = req.body;

  try {
    const account: Account | null = await accountService.findByUser(user);
    return borderRes.status(200).json(account);
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};


export const totalCurrentAmount = async (req: Request, borderRes: Response): Promise<any> => {
  const user: User = req.body;
  try {
    const amount: number = await accountService.totalCurrentAmount(user);
    return borderRes.status(200).json({ amount });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};