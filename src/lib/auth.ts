import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET chưa được cấu hình trong biến môi trường');
  }
  return secret;
}

/**
 * Ký JWT token với payload cho trước.
 * Đọc JWT_SECRET và JWT_EXPIRES_IN từ process.env.
 */
export function signToken(payload: object): string {
  const secret = getJwtSecret();
  const expiresIn = (process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']) ?? '24h';

  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * Xác minh JWT token và trả về decoded payload.
 * Throw error nếu token không hợp lệ hoặc đã hết hạn.
 */
export function verifyToken(token: string): jwt.JwtPayload | string {
  const secret = getJwtSecret();
  return jwt.verify(token, secret);
}

/**
 * Hash mật khẩu bằng bcryptjs với salt rounds = 12.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * So sánh mật khẩu plaintext với hash đã lưu.
 * Trả về true nếu khớp, false nếu không khớp.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
