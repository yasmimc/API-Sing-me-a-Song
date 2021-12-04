import express from 'express';
import cors from 'cors';
import recommendationRoutes from './routers/recommendationRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(recommendationRoutes);

export default app;
