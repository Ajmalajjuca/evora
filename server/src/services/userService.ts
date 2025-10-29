// services/userService.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";
import { IUser } from "../types/user.js";

const userRepository = new UserRepository();

export class UserService {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

   async createUser(data: Partial<IUser>): Promise<IUser> {
    return await userRepository.create(data);
  }

  async updateUser(id: string, data: Partial<IUser>) {
    const updatedUser = await userRepository.update(id, data);
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) throw new Error("User not found");
    return deletedUser;
  }
}
