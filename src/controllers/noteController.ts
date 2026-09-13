import { Request, Response } from 'express';

import { noteRepository } from '../repositories/noteRepository.js'; 
import { Note } from '../models/note.model.js';
import { User } from '../models/user.model.js';


export const getNote = async (req: Request, borderRes: Response): Promise<any> => {
  const user: User = req.body;
  try {
    const note: Note | null = await noteRepository.findByUser(user);
    return borderRes.status(200).json(note);
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};


export const save = async (req: Request, borderRes: Response): Promise<any> => {
  const note: Note = req.body;
  try {
    const noteSaved: Note | null = await noteRepository.save(note);
    return borderRes.status(200).json(noteSaved);
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};
