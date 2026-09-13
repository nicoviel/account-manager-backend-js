import express from 'express';
import { createLiveCredit, createLiveDebit, createMonthlyCredit, createMonthlyDebit, getLiveCredit, getLiveDebit, getMonthlyCredit, getMonthlyDebit } from '../controllers/operationController';

const router = express.Router();

router.post('/getMonthlyDebit', getMonthlyDebit);
router.post('/getMonthlyCredit', getMonthlyCredit);
router.post('/getLiveDebit', getLiveDebit);
router.post('/getLiveCredit', getLiveCredit);

router.post('/createLiveDebit', createLiveDebit);
router.post('/createLiveCredit', createLiveCredit);
router.post('/createMonthlyDebit', createMonthlyDebit);
router.post('/createMonthlyCredit', createMonthlyCredit);

export default router;