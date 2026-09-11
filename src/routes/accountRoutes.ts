import express from 'express';
import { getAccount, totalCurrentAmount } from '../controllers/accountController.js';

const router = express.Router();

router.post('/getAccount', getAccount);
router.post('/totalCurrentAmount', totalCurrentAmount);

export default router;