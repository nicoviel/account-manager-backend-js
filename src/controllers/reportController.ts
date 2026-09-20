import { NextFunction, Request, Response } from 'express';

import { User } from '../models/user.model.js';
import { reportService } from '../services/reportService.js';

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: User = req.body;
    await reportService.createAndSendReport(user)
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};