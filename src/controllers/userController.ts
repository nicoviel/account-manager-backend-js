import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/userService.js';
import { User } from '../models/user.model.js';
import { AppError } from '../errors/AppError.js';

export class UserController {
  public async newUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const amountParam = req.params.amount;
      const amountAsNumber = Number(amountParam);

      if (Number.isNaN(amountAsNumber)) {
        throw new AppError(400, 'Le montant est invalide.');
      }
      console.log('UserController.newUser Input body', req.body)
      const { login, email, password, firstName, lastName } = req.body;
      const user: User = await userService.createUser(
        { login, email, password, firstName, lastName },
        amountAsNumber
      );

      req.session.user = user;
      console.log('UserController.newUser Output user', user)
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { login, password } = req.body;
      console.log('UserController.login Input body', req.body)
      const user: User = await userService.login(login, password);
      // ÉQUIVALENT DE SecurityContextHolder.getContext().setAuthentication(...)
      req.session.user = user;
      console.log('UserController.login Output user', user)
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

}


export const userController = new UserController();