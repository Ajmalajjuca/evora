import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/userRepository.js";
import { AppError } from "../utils/AppError.js";
import { generateToken } from "../utils/jwt.js";

const userRepo = new UserRepository();

export class AuthService {
  /**
   * @desc Register a new user
   */
  async register(name: string, email: string, password: string) {
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) throw new AppError("User already exists", 400);

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepo.create({ name, email, password: hashedPassword });

    const token = generateToken(user);

    return { user, token };
  }

  /**
   * @desc Authenticate user and return JWT
   */
  async login(email: string, password: string) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new AppError("Invalid email or password", 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError("Invalid email or password", 401);

    const token = generateToken(user);

    return { user, token };
  }
}
