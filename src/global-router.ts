import { Router } from 'express';
import userRouter from './user/user-router';

const globalRouter = Router();

globalRouter.use(userRouter);

export default globalRouter;
