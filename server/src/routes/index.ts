import express, { Request, Response, Router } from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);


export default router;
