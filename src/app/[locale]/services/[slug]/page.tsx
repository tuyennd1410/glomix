import { services as SERVICES } from '@/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Server,
  Settings,
  DollarSign,
  Layers,
  CreditCard,
  Building2,
  CheckCircle,
  GraduationCap,
  Database,
  Brain,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Server,
  Settings,
  DollarSign,
  Layers,
  CreditCard,
  Building2,
  CheckCircle,
  GraduationCap,
  Database,
  Brain,
};

interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const locales = ['vi', 'en'];
  return locales.flatMap((locale) =>
    SERVICES.map((service) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} - OSAM`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = ICON_MAP[service.icon] ?? Server;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href={`/${locale}#services`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-10 transition-colors"
        >
          ← Quay lại dịch vụ
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-orange-50 text-orange-500">
              <Icon size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            {service.fullDescription}
          </p>

          <Link
            href={`/${locale}#contact`}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Liên hệ ngay
          </Link>
        </div>
      </div>
    </main>
  );
}
