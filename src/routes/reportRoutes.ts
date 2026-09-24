import express from 'express';
import { create } from '../controllers/reportController.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', isAuthenticated, (req, res, next) => create(req, res, next));

export default router;
