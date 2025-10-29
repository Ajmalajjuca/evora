import jwt, { JwtPayload } from 'jsonwebtoken';

/**
 * Generate a JWT token
 * @param id - user ID or unique identifier
 * @returns signed JWT string
 */
export const generateToken = (id: string | number): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Verify a JWT token
 * @param token - JWT string to verify
 * @returns decoded payload or throws error if invalid
 */
export const verifyToken = (token: string): string | JwtPayload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.verify(token, secret);
};
