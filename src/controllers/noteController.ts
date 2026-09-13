import { Request, Response } from 'express';

import { noteRepository } from '../repositories/noteRepository.js';
import { note  as PrismaNote } from '@prisma/client'; 
import { user  as PrismaUser } from '@prisma/client'; 
import { NoteInput } from '../models/note.model.js';


export const getNote = async (req: Request, borderRes: Response): Promise<any> => {
  const user: PrismaUser = req.body;
  try {
    const note: PrismaNote | null = await noteRepository.findByUser(user);
    return borderRes.status(200).json(note);
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};


export const save = async (req: Request, borderRes: Response): Promise<any> => {
  const note: NoteInput = req.body;
  try {
    const noteSaved: PrismaNote | null = await noteRepository.save(note);
    return borderRes.status(200).json(noteSaved);
  } catch (error) {
    console.error("Erreur serveur:", error);
    return borderRes.status(500).json({ message: "Une erreur serveur est survenue." });
  }
};
