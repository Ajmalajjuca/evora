import { UserRepository } from "../repositories/userRepository.js";
import { AppError } from "../utils/AppError.js";
import { generateToken } from "../utils/jwt.js";


const userRepo = new UserRepository();

export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) throw new AppError("User already exists", 400);

    const user = await userRepo.create({ name, email, password });
    const token = generateToken(user._id);
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new AppError("Invalid email or password", 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError("Invalid email or password", 401);

    const token = generateToken(user._id);
    return { user, token };
  }
}
