import { NextFunction, Request, Response } from 'express';

import { noteRepository } from '../repositories/noteRepository.js';
import { Note } from '../models/note.model.js';
import { User } from '../models/user.model.js';

export const getNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: User = req.body;
    const note: Note | null = await noteRepository.findByUser(user);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const save = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const note: Note = req.body;
    const noteSaved: Note | null = await noteRepository.save(note);
    res.status(200).json(noteSaved);
  } catch (error) {
    next(error);
  }
};
