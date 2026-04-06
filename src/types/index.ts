// ============================================================
// Các type hiện có của dự án
// ============================================================

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string; // e.g. '%', '+', 'K'
  prefix: string; // e.g. '$'
  label: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  en?: {
    name: string;
    shortDescription: string;
    fullDescription: string;
  };
}

export interface CaseStudy {
  id: string;
  clientName: string;
  logoUrl: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[]; // service slugs
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  summary: string;
  publishedAt: string; // ISO 8601
  category: 'news' | 'blog';
}

export interface CTASectionProps {
  title: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface FooterProps {
  services: Pick<Service, 'id' | 'name' | 'slug'>[];
  socialLinks: { platform: string; url: string; icon: string }[];
}

// ============================================================
// Các type mới cho Glomix Landing Page
// ============================================================

/** Nhu cầu dịch vụ của khách hàng tiềm năng */
export type ServiceInterest = 'AWS_Migration' | 'AI_Integration' | 'Both';

/** Thông tin khách hàng tiềm năng (Lead) */
export interface Lead {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  serviceInterest: ServiceInterest;
  message?: string | null;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

/** Tài khoản quản trị viên */
export interface AdminUser {
  id: number;
  username: string;
  passwordHash: string;
  createdAt: string; // ISO 8601
}

/** Response phân trang chung */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/** Cấu trúc response API thống nhất */
export type ApiResponse<T = unknown> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string; message: string; fields?: Record<string, string> };
