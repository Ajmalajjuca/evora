const express = require('express');
const router = express.Router();
import { register, login, getMe } from '../controllers/authController';
import { protect } from '../middleware/auth';

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
