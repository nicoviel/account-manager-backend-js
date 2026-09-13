import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', (req, res, next) => userController.login(req, res, next));
router.post('/create/:amount', (req, res, next) => userController.newUser(req, res, next));

export default router;