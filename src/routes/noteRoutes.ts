import express from 'express';
import { getNote, save } from '../controllers/noteController.js';

const router = express.Router();

router.post('/getNote', getNote);
router.post('/save', save);

export default router;
