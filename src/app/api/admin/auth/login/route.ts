import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validators';
import { comparePassword, signToken } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'INVALID_REQUEST', message: 'Request body không hợp lệ.' },
      { status: 400 }
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    const fields = Object.fromEntries(
      parsed.error.issues.map((issue) => [issue.path.join('.'), issue.message])
    );
    return NextResponse.json(
      { success: false, error: 'VALIDATION_ERROR', fields },
      { status: 422 }
    );
  }

  const { username, password } = parsed.data;

  const user = await prisma.adminUser.findUnique({ where: { username } });

  const isValid = user ? await comparePassword(password, user.passwordHash) : false;

  if (!user || !isValid) {
    return NextResponse.json(
      {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Tên đăng nhập hoặc mật khẩu không đúng.',
      },
      { status: 401 }
    );
  }

  const token = signToken({ id: user.id, username: user.username });

  const response = NextResponse.json(
    { success: true, message: 'Đăng nhập thành công.' },
    { status: 200 }
  );

  response.cookies.set('admin_token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return response;
}
