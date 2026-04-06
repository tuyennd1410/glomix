import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Parse và clamp query params
  const rawPage = parseInt(searchParams.get('page') ?? '1', 10);
  const rawLimit = parseInt(searchParams.get('limit') ?? '20', 10);

  const page = Math.max(1, isNaN(rawPage) ? 1 : rawPage);
  const limit = Math.min(100, Math.max(1, isNaN(rawLimit) ? 20 : rawLimit));
  const skip = (page - 1) * limit;

  try {
    // Chạy song song 3 truy vấn để tối ưu hiệu năng
    const [total, leads, groupByResult] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.lead.groupBy({
        by: ['serviceInterest'],
        _count: true,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    // Chuyển groupBy result thành object { ServiceInterest: count }
    const byServiceInterest: Record<string, number> = {};
    for (const item of groupByResult) {
      byServiceInterest[item.serviceInterest] = item._count;
    }

    return NextResponse.json(
      {
        success: true,
        data: leads,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
        stats: {
          total,
          byServiceInterest,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET /api/admin/leads] DB error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau.',
      },
      { status: 500 }
    );
  }
}
