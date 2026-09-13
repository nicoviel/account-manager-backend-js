import express from 'express';
import {
  createLiveCredit,
  createLiveDebit,
  createMonthlyCredit,
  createMonthlyDebit,
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

export default router;