import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; // 1. Import du package CORS
import userRoutes from './routes/userRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import operationRoutes from './routes/operationRoutes.js';
import bankAccountRoutes from './routes/bankAccountRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// 💡 1. Désactiver totalement les ETags (Supprime le cache sauvage sur les tableaux vides [])
app.set('etag', false);

// 💡 2. Ajouter un middleware pour forcer la désactivation du cache sur TOUTES les réponses
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});


// 2. Configuration de CORS (Autorise votre frontend Angular/React/Vue)
app.use(cors({
  origin: 'http://localhost:4200', // Autorise uniquement cette URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autorise ces méthodes HTTP
  allowedHeaders: ['Content-Type', 'Authorization'], // Autorise ces en-têtes
   credentials: true 
}));

app.use(express.json());
app.use('/user', userRoutes);
app.use('/account', accountRoutes);
app.use('/note', noteRoutes);
app.use('/operation', operationRoutes );
app.use('/bankAccount', bankAccountRoutes );

app.listen(port, () => {
  console.log(`[server]: Serveur TypeScript démarré sur http://localhost:${port}`);
});
