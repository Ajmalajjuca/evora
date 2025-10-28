const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');


router.use('/auth', authRoutes);
router.use('/users', userRoutes);

router.get('/', (req, res) => {
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

module.exports = router;
