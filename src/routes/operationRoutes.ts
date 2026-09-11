import express from 'express';
import { getLiveCredit, getLiveDebit, getMonthlyCredit, getMonthlyDebit } from '../controllers/operationController';

const router = express.Router();

router.post('/getMonthlyDebit', getMonthlyDebit);
router.post('/getMonthlyCredit', getMonthlyCredit);
router.post('/getLiveDebit', getLiveDebit);
router.post('/getLiveCredit', getLiveCredit);

export default router;