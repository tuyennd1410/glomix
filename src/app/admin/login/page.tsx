'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validators';
import GlomixLogo from '@/components/GlomixLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { router.push('/admin/dashboard'); return; }
      setServerError(res.status === 401 ? 'Tên đăng nhập hoặc mật khẩu không đúng.' : 'Có lỗi xảy ra. Vui lòng thử lại.');
    } catch {
      setServerError('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1B2E] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <GlomixLogo width={240} showTagline />
          <p className="text-sm text-gray-400 mt-3">Trang quản trị</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
            <input id="username" type="text" autoComplete="username" {...register('username')}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7B4FD4] focus:border-transparent transition disabled:opacity-50"
              disabled={isSubmitting} />
            {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input id="password" type="password" autoComplete="current-password" {...register('password')}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7B4FD4] focus:border-transparent transition disabled:opacity-50"
              disabled={isSubmitting} />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          {serverError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">{serverError}</p>
          )}

          <button type="submit" disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4A9EE8] to-[#7B4FD4] hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-opacity disabled:opacity-60 disabled:cursor-not-allowed">
            {isSubmitting && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
