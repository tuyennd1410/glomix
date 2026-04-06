import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createLeadSchema } from '@/lib/validators';

// Rate limiting: in-memory Map theo IP
// Cấu trúc: Map<ip, { count: number; resetAt: number }>
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 5;       // tối đa 5 request
const RATE_LIMIT_WINDOW = 60_000; // trong 1 phút (ms)

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // Cửa sổ mới hoặc chưa có entry
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  // 1. Rate limiting
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
      },
      { status: 429 }
    );
  }

  // 2. Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Dữ liệu không hợp lệ',
        fields: {},
      },
      { status: 422 }
    );
  }

  // 3. Validate bằng Zod schema
  const parsed = createLeadSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? 'unknown';
      fields[key] = issue.message;
    }
    return NextResponse.json(
      {
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Dữ liệu không hợp lệ',
        fields,
      },
      { status: 422 }
    );
  }

  const { customerName, email, phone, serviceInterest } = parsed.data;

  try {
    // 4. Kiểm tra duplicate email
    const existing = await prisma.lead.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'EMAIL_ALREADY_EXISTS',
          message: 'Email này đã đăng ký. Chúng tôi sẽ liên hệ sớm.',
        },
        { status: 409 }
      );
    }

    // 5. Lưu Lead vào DB
    await prisma.lead.create({
      data: { customerName, email, phone, serviceInterest },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24 giờ.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/leads] DB error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
      },
      { status: 500 }
    );
  }
}
