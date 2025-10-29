import express, { Request, Response } from 'express';


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to conekt-lab API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      health: '/health'
    }
  });
});

export default router;
