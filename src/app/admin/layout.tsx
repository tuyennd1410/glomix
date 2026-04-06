import type { Metadata } from 'next';
import { Rajdhani } from 'next/font/google';
import '@/app/globals.css';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Glomix Admin',
  description: 'Glomix Admin Dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={rajdhani.variable}>
      <body>{children}</body>
    </html>
  );
}
