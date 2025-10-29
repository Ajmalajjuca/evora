// controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { UserService } from "../services/userService.js";
import { ApiResponse } from "../utils/apiResponse.js";


const userService = new UserService()
// GET all users
export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  ApiResponse.success(res, users, "Users fetched successfully");
});

// GET single user
export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  ApiResponse.success(res, user, "User fetched successfully");
});

// CREATE user
export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  ApiResponse.success(res, user, "User created successfully", 201);
});

// UPDATE user
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);
  ApiResponse.success(res, user, "User updated successfully");
});

// DELETE user
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  ApiResponse.success(res, null, "User deleted successfully", 204);
});
