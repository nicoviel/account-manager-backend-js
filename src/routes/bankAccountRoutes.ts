import express from 'express';
import { getBankAccounts } from '../controllers/bankAccountController.js';

const router = express.Router();

router.post('/getBankAccounts', (req, res, next) => getBankAccounts(req, res, next));
export default router;