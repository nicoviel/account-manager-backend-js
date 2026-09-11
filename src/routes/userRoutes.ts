import express from 'express';
import { userController } from '../controllers/userController';
//import { login, newUser } from '../controllers/userController.js';

const router = express.Router();

//router.post('/login', login);
//router.post('/create/:amount', newUser);

router.post('/login', (req, res) => userController.login(req, res));
router.post('/create/:amount', (req, res) => userController.newUser(req, res));

export default router;