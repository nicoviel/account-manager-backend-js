import { accountRepository } from '../repositories/accountRepository.js';
import { userRepository } from '../repositories/userRepository.js';
import prisma from '../config/db.js';
import { User } from '../models/user.model.js';
import { AppError } from '../errors/AppError.js';

export const userService = {
  login: async (login: string, password: string): Promise<User> => {
    const user: User | null = await userRepository.findByUser(login);

    if (!user) {
      throw new AppError(401, 'Identifiants invalides.');
    }

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      throw new AppError(401, 'Identifiants invalides.');
    }

    return user;
  },

  createUser: async (
    userData: { login: string; email: string; password: string; firstName: string; lastName: string },
    amount: number
  ): Promise<User> => {
    const existingUser: User | null = await userRepository.findByUser(userData.login);

    if (existingUser) {
      throw new AppError(409, 'Cet utilisateur existe déjà.');
    }

    return await prisma.$transaction(async (tx: any) => {
      const savedUser = await userRepository.create(userData, tx);

      const accountToSave = {
        currentAmount: amount,
        futureAmountWithCredit: amount,
        futureAmountWithoutCredit: amount,
        user: {
          connect: { id: savedUser.id },
        },
      };

      await accountRepository.create(accountToSave, tx);
      return savedUser;
    });
  },
};