import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import GlomixLogo from '@/components/GlomixLogo';

const PAGE_SIZE = 20;

const SERVICE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  AWS_Migration: { label: 'AWS Migration', color: 'text-blue-600', bg: 'bg-blue-50' },
  AI_Integration: { label: 'AI Integration', color: 'text-purple-600', bg: 'bg-purple-50' },
  Both: { label: 'Cả hai', color: 'text-emerald-600', bg: 'bg-emerald-50' },
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) redirect('/admin/login');
  try { verifyToken(token); } catch { redirect('/admin/login'); }

  const rawPage = parseInt(searchParams.page ?? '1', 10);
  const page = Math.max(1, isNaN(rawPage) ? 1 : rawPage);
  const skip = (page - 1) * PAGE_SIZE;

  const [leads, total, groupByResult] = await Promise.all([
    prisma.lead.findMany({ skip, take: PAGE_SIZE, orderBy: { createdAt: 'desc' } }),
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ['serviceInterest'], _count: true }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  const byService: Record<string, number> = {};
  for (const item of groupByResult) byService[item.serviceInterest] = item._count;

  const statCards = [
    {
      label: 'Tổng Lead',
      value: total,
      icon: '👥',
      gradient: 'from-blue-500 to-blue-700',
      sub: 'Tất cả thời gian',
    },
    {
      label: 'AWS Migration',
      value: byService['AWS_Migration'] ?? 0,
      icon: '☁️',
      gradient: 'from-sky-500 to-sky-700',
      sub: `${total > 0 ? Math.round(((byService['AWS_Migration'] ?? 0) / total) * 100) : 0}% tổng số`,
    },
    {
      label: 'AI Integration',
      value: byService['AI_Integration'] ?? 0,
      icon: '🤖',
      gradient: 'from-violet-500 to-violet-700',
      sub: `${total > 0 ? Math.round(((byService['AI_Integration'] ?? 0) / total) * 100) : 0}% tổng số`,
    },
    {
      label: 'Cả hai dịch vụ',
      value: byService['Both'] ?? 0,
      icon: '⚡',
      gradient: 'from-emerald-500 to-emerald-700',
      sub: `${total > 0 ? Math.round(((byService['Both'] ?? 0) / total) * 100) : 0}% tổng số`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar + Main layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[#0D1B2E] fixed left-0 top-0 bottom-0 z-10">
          <div className="p-6 border-b border-white/10">
            <GlomixLogo width={140} />
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium">
              <span>📊</span> Dashboard
            </div>
            <a href="/api/admin/leads/export" download
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition">
              <span>📥</span> Xuất CSV
            </a>
          </nav>
          <div className="p-4 border-t border-white/10">
            <form action="/api/admin/auth/logout" method="POST">
              <button type="submit"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition">
                <span>🚪</span> Đăng xuất
              </button>
            </form>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 lg:ml-64">
          {/* Top header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Quản lý danh sách khách hàng tiềm năng</p>
              </div>
              <div className="flex items-center gap-3">
                <a href="/api/admin/leads/export" download
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A9EE8] to-[#7B4FD4] text-white text-sm font-medium rounded-lg hover:opacity-90 transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Xuất CSV
                </a>
                <form action="/api/admin/auth/logout" method="POST" className="lg:hidden">
                  <button type="submit" className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    Đăng xuất
                  </button>
                </form>
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6">
            {/* Stat cards — 4 ô ngang */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((card) => (
                <div key={card.label} className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-5 text-white shadow-lg`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{card.icon}</span>
                    <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">{card.sub}</span>
                  </div>
                  <p className="text-4xl font-bold mb-1">{card.value}</p>
                  <p className="text-sm text-white/80">{card.label}</p>
                </div>
              ))}
            </div>

            {/* Progress bars */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Phân bổ theo nhu cầu dịch vụ</h2>
              <div className="space-y-4">
                {Object.entries(SERVICE_CONFIG).map(([key, cfg]) => {
                  const count = byService[key] ?? 0;
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-gray-700">{cfg.label}</span>
                        <span className="text-sm text-gray-500">{count} lead · {pct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            key === 'AWS_Migration' ? 'bg-blue-500' :
                            key === 'AI_Integration' ? 'bg-violet-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leads table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">Danh sách Lead</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Trang {page}/{totalPages} · {total} lead
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Họ tên</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nhu cầu</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày đăng ký</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-16 text-gray-400">
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl">📭</span>
                            <span className="text-sm">Chưa có lead nào</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead: { id: number; customerName: string; email: string; phone: string; serviceInterest: string; createdAt: Date }, idx: number) => {
                        const cfg = SERVICE_CONFIG[lead.serviceInterest];
                        return (
                          <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-400">
                              {skip + idx + 1}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A9EE8] to-[#7B4FD4] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                  {lead.customerName.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-gray-800">{lead.customerName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{lead.phone}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cfg?.bg ?? 'bg-gray-100'} ${cfg?.color ?? 'text-gray-600'}`}>
                                {cfg?.label ?? lead.serviceInterest}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {new Date(lead.createdAt).toLocaleDateString('vi-VN', {
                                day: '2-digit', month: '2-digit', year: 'numeric'
                              })}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Hiển thị {skip + 1}–{Math.min(skip + PAGE_SIZE, total)} / {total} lead
                  </span>
                  <div className="flex items-center gap-2">
                    <a href={page > 1 ? `?page=${page - 1}` : '#'}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                        page <= 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}>
                      ← Trước
                    </a>
                    <span className="px-3 py-1.5 text-sm bg-[#4A9EE8] text-white rounded-lg font-medium">
                      {page}
                    </span>
                    <a href={page < totalPages ? `?page=${page + 1}` : '#'}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                        page >= totalPages ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}>
                      Sau →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
