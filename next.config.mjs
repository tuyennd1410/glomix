// File này được tạo để hỗ trợ Jest (next/jest yêu cầu next.config.js hoặc next.config.mjs)
// Nội dung giống next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

export default withNextIntl(nextConfig);
