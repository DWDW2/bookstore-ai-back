import 'dotenv/config';
import express from 'express';
import globalRouter from './global-router';
import { logger } from './logger';
import OpenAI from 'openai';
import { connectToDatabase } from './connect';

const app = express();
const PORT = process.env.PORT || 3000;
connectToDatabase()
app.use(logger);
app.use(express.json());
app.use('/api/v1/', globalRouter);

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
