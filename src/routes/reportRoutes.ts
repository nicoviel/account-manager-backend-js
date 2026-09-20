import express from 'express';
import { create } from '../controllers/reportController.js';

const router = express.Router();

router.post('/create', (req, res, next) => create(req, res, next));

export default router;
