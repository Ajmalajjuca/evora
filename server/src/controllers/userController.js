import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { ApiResponse } from '../utils/apiResponse';
const User = require('../models/User');


export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  ApiResponse.success(res, users, 'Users fetched successfully');
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  ApiResponse.success(res, user, 'User fetched successfully');
});

export const createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  ApiResponse.success(res, user, 'User created successfully', 201);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  ApiResponse.success(res, user, 'User updated successfully');
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  ApiResponse.success(res, null, 'User deleted successfully', 204);
});
