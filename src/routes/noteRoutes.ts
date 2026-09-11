import express from 'express';
import { getNote } from '../controllers/noteController.js';

const router = express.Router();

router.post('/getNote', getNote);

export default router;
