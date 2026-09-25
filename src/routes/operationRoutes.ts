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
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/getMonthlyDebit', isAuthenticated, (req, res, next) => getMonthlyDebit(req, res, next));
router.post('/getMonthlyCredit', isAuthenticated, (req, res, next) => getMonthlyCredit(req, res, next));
router.post('/getLiveDebit', isAuthenticated, (req, res, next) => getLiveDebit(req, res, next));
router.post('/getLiveCredit', isAuthenticated, (req, res, next) => getLiveCredit(req, res, next));

router.post('/createLiveDebit', isAuthenticated, (req, res, next) => createLiveDebit(req, res, next));
router.post('/createLiveCredit', isAuthenticated, (req, res, next) => createLiveCredit(req, res, next));
router.post('/createMonthlyDebit', isAuthenticated, (req, res, next) => createMonthlyDebit(req, res, next));
router.post('/createMonthlyCredit', isAuthenticated, (req, res, next) => createMonthlyCredit(req, res, next));

router.post('/debitLiveCredit', isAuthenticated, (req, res, next) => debitLiveCredit(req, res, next));
router.post('/debitMonthlyCredit', isAuthenticated, (req, res, next) => debitMonthlyCredit(req, res, next));

router.post('/debitLiveDebit', isAuthenticated, (req, res, next) => debitLiveDebit(req, res, next));
router.post('/debitMonthlyDebit', isAuthenticated, (req, res, next) => debitMonthlyDebit(req, res, next));

router.delete('/deleteMonthlyDebit/:id', isAuthenticated, (req, res, next) => deleteMonthlyDebit(req, res, next));
router.delete('/deleteLiveCredit/:id', isAuthenticated, (req, res, next) => deleteLiveCredit(req, res, next));
router.delete('/deleteMonthlyCredit/:id', isAuthenticated, (req, res, next) => deleteMonthlyCredit(req, res, next));
router.delete('/deleteLiveDebit/:id', isAuthenticated, (req, res, next) => deleteLiveDebit(req, res, next));


router.post('/debitMonthlyDebits', isAuthenticated, (req, res, next) => debitMonthlyDebits(req, res, next));
router.post('/debitLiveDebits', isAuthenticated, (req, res, next) => debitLiveDebits(req, res, next));
router.post('/creditLiveCredits', isAuthenticated, (req, res, next) => creditLiveCredits(req, res, next));
router.post('/creditMonthlyCredits', isAuthenticated, (req, res, next) => creditMonthlyCredits(req, res, next));

export default router;