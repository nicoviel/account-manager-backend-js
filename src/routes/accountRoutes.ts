import express from 'express';
import { getAccount, totalCurrentAmount } from '../controllers/accountController.js';

const router = express.Router();

router.post('/getAccount', (req, res, next) => getAccount(req, res, next));
router.post('/totalCurrentAmount', (req, res, next) => totalCurrentAmount(req, res, next));

export default router;