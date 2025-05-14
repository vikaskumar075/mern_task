import express, { json } from 'express';
import cors from 'cors';
import deviceRouter from './routes/deviceRoutes.js';
import errorRoutes from './routes/errors.js';
import authRoutes from './routes/authRoutes.js'
import { config } from 'dotenv';

config();

const app = express();
app.use(cors());
app.use(json());

app.use('/api/devices', deviceRouter);
app.use('/api/errors', errorRoutes);
app.use('/api/auth', authRoutes);

export default app;
