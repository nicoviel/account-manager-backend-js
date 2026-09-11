import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { userRepository } from '../repositories/userRepository.js';
import { user as PrismaUser } from '@prisma/client';
import { userService } from '../services/userService.js';

export class UserController {
public  async newUser (req: Request, res: Response): Promise<any>  {
  try {

    const amountParam = req.params.amount;
    const amountAsNumber = Number(amountParam);

    const { login, email, password, firstName, lastName } = req.body;
    const user: PrismaUser = await userService.createUser({ login, email, password, firstName, lastName }, amountAsNumber);

    // 👉 Le token dans le header
    res.setHeader("Authorization", `Bearer ${this.generateToken(user)}`);

    // 👉 Le body contient uniquement l'objet métier
    return res.status(200).json(user);

  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};

public async login (req: Request, borderRes: Response): Promise<any> {
  const { login, password } = req.body;

  try {
    const user: PrismaUser | null = await userService.login(login, password);
    if (!user) {
      return borderRes.status(500).json({ message: "Your password is incorrect." });
    }

    // 👉 Le token dans le header
    borderRes.setHeader("Authorization", `Bearer ${this.generateToken(user)}`);

    // 👉 Le body contient uniquement l'objet métier
    return borderRes.status(200).json(user);

  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};

private generateToken = (user: PrismaUser): string => {
  // Génération du JWT
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET n'est pas défini dans l'environnement");
  }
  const token = jwt.sign(
    { userId: user.id, login: user.login },
    jwtSecret,
    { expiresIn: '2h' }
  );
  return token;
};

}
// Optionnel : On exporte une instance unique (Singleton) pour faciliter l'import
export const userController = new UserController();