import express from 'express';
import { getAccount, getHistories, reset, totalCurrentAmount } from '../controllers/accountController.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/getAccount', isAuthenticated,(req, res, next) => getAccount(req, res, next));
router.post('/totalCurrentAmount', isAuthenticated, (req, res, next) => totalCurrentAmount(req, res, next));
router.post('/reset', isAuthenticated, (req, res, next) => reset(req, res, next));
router.post('/getHistory', isAuthenticated, (req, res, next) => getHistories(req, res, next));

export default router;