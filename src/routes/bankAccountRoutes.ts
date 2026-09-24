import express from 'express';
import { getBankAccounts, create, remove } from '../controllers/bankAccountController.js';

const router = express.Router();

router.post('/getBankAccounts', (req, res, next) => getBankAccounts(req, res, next));
router.post('/create', (req, res, next) => create(req, res, next));
router.delete('/delete/:id', (req, res, next) =>remove(req, res, next));
export default router;