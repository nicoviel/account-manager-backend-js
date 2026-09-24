import express from 'express';
import { getBankAccounts, create, remove } from '../controllers/bankAccountController.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/getBankAccounts', isAuthenticated, (req, res, next) => getBankAccounts(req, res, next));
router.post('/create', isAuthenticated, (req, res, next) => create(req, res, next));
router.delete('/delete/:id', isAuthenticated, (req, res, next) =>remove(req, res, next));
export default router;