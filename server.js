import 'express-async-errors';
// Global Imports
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Custom Imports
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.json());
app.use(cookieParser());

// Routes

app.get('/', (req, res) => {
  res.send('Hello People!');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'api test route ' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'route not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
