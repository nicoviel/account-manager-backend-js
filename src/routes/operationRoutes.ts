import express from 'express';
import {
  createLiveCredit,
  createLiveDebit,
  createMonthlyCredit,
  createMonthlyDebit,
  creditLiveCredits,
  creditMonthlyCredits,
  debitLiveCredit,
  debitLiveDebit,
  debitLiveDebits,
  debitMonthlyCredit,
  debitMonthlyDebit,
  debitMonthlyDebits,
  deleteLiveCredit,
  deleteLiveDebit,
  deleteMonthlyCredit,
  deleteMonthlyDebit,
  getLiveCredit,
  getLiveDebit,
  getMonthlyCredit,
  getMonthlyDebit,
} from '../controllers/operationController.js';

const router = express.Router();

router.post('/getMonthlyDebit', (req, res, next) => getMonthlyDebit(req, res, next));
router.post('/getMonthlyCredit', (req, res, next) => getMonthlyCredit(req, res, next));
router.post('/getLiveDebit', (req, res, next) => getLiveDebit(req, res, next));
router.post('/getLiveCredit', (req, res, next) => getLiveCredit(req, res, next));

router.post('/createLiveDebit', (req, res, next) => createLiveDebit(req, res, next));
router.post('/createLiveCredit', (req, res, next) => createLiveCredit(req, res, next));
router.post('/createMonthlyDebit', (req, res, next) => createMonthlyDebit(req, res, next));
router.post('/createMonthlyCredit', (req, res, next) => createMonthlyCredit(req, res, next));

router.post('/debitLiveCredit', (req, res, next) => debitLiveCredit(req, res, next));
router.post('/debitMonthlyCredit', (req, res, next) => debitMonthlyCredit(req, res, next));

router.post('/debitLiveDebit', (req, res, next) => debitLiveDebit(req, res, next));
router.post('/debitMonthlyDebit', (req, res, next) => debitMonthlyDebit(req, res, next));

router.delete('/deleteMonthlyDebit/:id', (req, res, next) => deleteMonthlyDebit(req, res, next));
router.delete('/deleteLiveCredit/:id', (req, res, next) => deleteLiveCredit(req, res, next));
router.delete('/deleteMonthlyCredit/:id', (req, res, next) => deleteMonthlyCredit(req, res, next));
router.delete('/deleteLiveDebit/:id', (req, res, next) => deleteLiveDebit(req, res, next));


router.post('/debitMonthlyDebits', (req, res, next) => debitMonthlyDebits(req, res, next));
router.post('/debitLiveDebits', (req, res, next) => debitLiveDebits(req, res, next));
router.post('/creditLiveCredits', (req, res, next) => creditLiveCredits(req, res, next));
router.post('/creditMonthlyCredits', (req, res, next) => creditMonthlyCredits(req, res, next));

export default router;