const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const User = require('../models/User');


export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError('User already exists', 400));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    data: { user }
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError('Invalid credentials', 401));
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    data: { user }
  });
});

export const getMe = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    data: { user: req.user }
  });
});
