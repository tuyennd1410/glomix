import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Map serviceInterest enum → nhãn hiển thị tiếng Việt/Anh
const SERVICE_INTEREST_LABELS: Record<string, string> = {
  AWS_Migration: 'AWS Migration',
  AI_Integration: 'AI Integration',
  Both: 'Cả hai',
};

/**
 * Escape một giá trị CSV theo RFC 4180:
 * - Nếu chứa dấu phẩy, ngoặc kép, hoặc ký tự xuống dòng → wrap trong "..."
 * - Dấu ngoặc kép bên trong được double-escape thành ""
 */
function escapeCsvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Format Date → "DD/MM/YYYY HH:mm" theo giờ Việt Nam (UTC+7)
 */
function formatDateVN(date: Date): string {
  // Dịch chuyển sang UTC+7
  const vnOffset = 7 * 60; // phút
  const localMs = date.getTime() + vnOffset * 60 * 1000;
  const d = new Date(localMs);

  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const min = String(d.getUTCMinutes()).padStart(2, '0');

  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Header row
    const rows: string[] = ['Tên,Email,SĐT,Nhu cầu,Ngày tạo'];

    for (const lead of leads) {
      const row = [
        escapeCsvField(lead.customerName),
        escapeCsvField(lead.email),
        escapeCsvField(lead.phone),
        escapeCsvField(SERVICE_INTEREST_LABELS[lead.serviceInterest] ?? lead.serviceInterest),
        escapeCsvField(formatDateVN(lead.createdAt)),
      ].join(',');
      rows.push(row);
    }

    // BOM UTF-8 để Excel nhận diện đúng encoding
    const csvContent = '\uFEFF' + rows.join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="leads.csv"',
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/leads/export] DB error:', error);
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
