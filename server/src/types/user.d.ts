export type UserRole = 'user' | 'admin';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
  avatar?: string;
  isBlocked?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
