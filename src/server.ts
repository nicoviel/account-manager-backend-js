import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import operationRoutes from './routes/operationRoutes.js';
import bankAccountRoutes from './routes/bankAccountRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { appConfig } from './config/app.js';

const app = express();
const port = appConfig.port;

app.set('etag', false);

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(cors({
  origin: appConfig.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use('/user', userRoutes);
app.use('/account', accountRoutes);
app.use('/note', noteRoutes);
app.use('/operation', operationRoutes);
app.use('/bankAccount', bankAccountRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Serveur TypeScript démarré sur http://localhost:${port}`);
});
