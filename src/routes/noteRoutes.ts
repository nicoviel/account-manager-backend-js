import express from 'express';
import { getNote, save } from '../controllers/noteController.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/getNote', isAuthenticated, (req, res, next) => getNote(req, res, next));
router.post('/save', isAuthenticated, (req, res, next) => save(req, res, next));

export default router;
