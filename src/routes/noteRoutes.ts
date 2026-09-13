import express from 'express';
import { getNote, save } from '../controllers/noteController.js';

const router = express.Router();

router.post('/getNote', (req, res, next) => getNote(req, res, next));
router.post('/save', (req, res, next) => save(req, res, next));

export default router;
