import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { catchAsync } from "../utils/catchAsync";

const authService = new AuthService();

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { user, token } = await authService.register(name, email, password);
  res.status(201).json({ success: true, user, token });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  res.status(200).json({ success: true, user, token });
});


