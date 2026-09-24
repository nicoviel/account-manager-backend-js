import dotenv from 'dotenv';
dotenv.config();

import express, { Router } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import operationRoutes from './routes/operationRoutes.js';
import bankAccountRoutes from './routes/bankAccountRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { appConfig } from './config/app.js';
import session from "express-session";
import { exportService, ExportService } from './services/exportService.js';


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

app.use(
  session({
    name: "JSESSIONID",
    secret: "un-super-secret",      // à mettre en env
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false               // true si HTTPS
      //maxAge: 1000 * 60 * 60        // 1h
    }
  })
);

const router = Router();
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    // Supprime le cookie côté navigateur
    res.clearCookie("JSESSIONID");

    return res.status(200).json({ message: "Logged out" });
  });
});


app.use(express.json());
app.use('/user', userRoutes);
app.use('/account', accountRoutes);
app.use('/note', noteRoutes);
app.use('/operation', operationRoutes);
app.use('/bankAccount', bankAccountRoutes);
app.use('/report', reportRoutes);
app.use("/", router);

app.use(errorHandler);
app.use(express.json());


app.listen(port, () => {
  console.log(`[server]: Serveur TypeScript démarré sur http://localhost:${port}`);
    // Fonction qui appelle ton service
  async function runScheduledTask() {
    try {
      await exportService.runScheduledTask();
    } catch (error) {
      console.error("Erreur dans la tâche programmée :", error);
    }
  }

  // Exécution immédiate au démarrage
  runScheduledTask();

  // Exécution toutes les 12h
  setInterval(runScheduledTask, 12 * 60 * 60 * 1000);
});
