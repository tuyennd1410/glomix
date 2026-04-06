import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

const PAGE_SIZE = 20;

interface SearchParams {
  page?: string;
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Kiểm tra auth cookie phía server
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    verifyToken(token);
  } catch {
    redirect('/admin/login');
  }

  // Parse query param page
  const rawPage = parseInt(searchParams.page ?? '1', 10);
  const page = Math.max(1, isNaN(rawPage) ? 1 : rawPage);
  const skip = (page - 1) * PAGE_SIZE;

  // Fetch data trực tiếp từ Prisma (song song)
  const [leads, total, groupByResult] = await Promise.all([
    prisma.lead.findMany({
      skip,
      take: PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.lead.count(),
    prisma.lead.groupBy({
      by: ['serviceInterest'],
      _count: true,
    }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Thống kê theo serviceInterest
  const byService: Record<string, number> = {};
  for (const item of groupByResult) {
    byService[item.serviceInterest] = item._count;
  }

  const serviceLabels: Record<string, string> = {
    AWS_Migration: 'AWS Migration',
    AI_Integration: 'AI Integration',
    Both: 'Cả hai',
  };

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <header className="bg-[#0A1628] border-b border-blue-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">Glomix</span>
            <span className="ml-3 text-sm text-blue-300">Admin Dashboard</span>
          </div>
          <form action="/api/admin/auth/logout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition"
            >
              Đăng xuất
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Thống kê tổng quan */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Tổng quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">Tổng số Lead</p>
              <p className="text-3xl font-bold text-[#0A1628] mt-1">{total}</p>
            </div>
            {Object.entries(serviceLabels).map(([key, label]) => (
              <div key={key} className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold text-[#2563EB] mt-1">
                  {byService[key] ?? 0}
                </p>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Phân bổ theo nhu cầu dịch vụ
            </h3>
            {Object.entries(serviceLabels).map(([key, label]) => {
              const count = byService[key] ?? 0;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{label}</span>
                    <span>
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-[#2563EB] h-2.5 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bảng leads */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Danh sách Lead
              <span className="ml-2 text-sm font-normal text-blue-300">
                (Trang {page}/{totalPages || 1})
              </span>
            </h2>
            <a
              href="/api/admin/leads/export"
              download
              className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-blue-600 rounded-lg transition"
            >
              Xuất CSV
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Tên</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">SĐT</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Nhu cầu</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Ngày tạo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400">
                        Chưa có lead nào.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead: { id: number; customerName: string; email: string; phone: string; serviceInterest: string; createdAt: Date }) => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {lead.customerName}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                        <td className="px-4 py-3 text-gray-600">{lead.phone}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#2563EB]">
                            {serviceLabels[lead.serviceInterest] ?? lead.serviceInterest}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(lead.createdAt).toLocaleDateString('vi-VN')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <a
                href={page > 1 ? `?page=${page - 1}` : '#'}
                aria-disabled={page <= 1}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  page <= 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                    : 'bg-white text-[#0A1628] hover:bg-gray-100 shadow-sm'
                }`}
              >
                ← Previous
              </a>
              <span className="text-sm text-blue-200">
                {page} / {totalPages}
              </span>
              <a
                href={page < totalPages ? `?page=${page + 1}` : '#'}
                aria-disabled={page >= totalPages}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  page >= totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                    : 'bg-white text-[#0A1628] hover:bg-gray-100 shadow-sm'
                }`}
              >
                Next →
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
