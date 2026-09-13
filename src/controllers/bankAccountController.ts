import { Request, Response } from 'express';
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';
import { User } from '../models/user.model.js';
import { BankAccount } from '../models/bankAccount.model.js';


export const getBankAccounts = async (req: Request, borderRes: Response): Promise<any> => {
  const user: User = req.body;

  try {
    const accounts: BankAccount[] | null = await bankAccountRepository.findByUser(user);
    return borderRes.status(200).json(accounts);
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};
