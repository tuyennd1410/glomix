import { z } from 'zod';

// Regex số điện thoại Việt Nam: 10 chữ số, bắt đầu bằng 0
const VN_PHONE_REGEX = /^0\d{9}$/;

// Schema validate dữ liệu tạo Lead
export const createLeadSchema = z.object({
  customerName: z
    .string()
    .min(1, 'Họ và tên không được để trống')
    .max(255),
  email: z
    .string()
    .email('Email không hợp lệ')
    .max(255),
  phone: z
    .string()
    .regex(VN_PHONE_REGEX, 'Số điện thoại không hợp lệ — phải 10 chữ số, bắt đầu bằng 0'),
  serviceInterest: z.enum(['AWS_Migration', 'AI_Integration', 'Both']),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

// Schema validate đăng nhập admin
export const loginSchema = z.object({
  username: z.string().min(1, 'Tên đăng nhập không được để trống'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

export type LoginInput = z.infer<typeof loginSchema>;
