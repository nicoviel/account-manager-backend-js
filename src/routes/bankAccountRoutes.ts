import express from 'express';
import { getBankAccounts } from '../controllers/bankAccountController';

const router = express.Router();

router.post('/getBankAccounts', getBankAccounts);
export default router;