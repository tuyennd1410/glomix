// Khai báo gtag trên window để TypeScript không báo lỗi
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Ghi nhận sự kiện lead_generated lên GA4.
 * Bỏ qua nếu: không phải môi trường browser, GA_ID chưa cấu hình, hoặc gtag chưa load.
 * Yêu cầu: 8.1, 8.2, 8.3, 8.4
 */
export function trackLeadGenerated(serviceInterest: string): void {
  if (typeof window === 'undefined') return;
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'lead_generated', {
    service_interest: serviceInterest,
    timestamp: new Date().toISOString(),
  });
}
