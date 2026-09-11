import { Request, Response } from 'express';

import { bank_account  as PrismaBankAccount } from '@prisma/client'; 
import { user  as PrismaUser } from '@prisma/client'; 
import { bankAccountRepository } from '../repositories/bankAccountRepository.js';


export const getBankAccounts = async (req: Request, borderRes: Response): Promise<any> => {
  const user: PrismaUser = req.body;

  try {
    const note: PrismaBankAccount | null = await bankAccountRepository.findByUser(user);
    return borderRes.status(200).json(note);
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};
