import { services as SERVICES } from '@/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Server, Settings, DollarSign, Layers, CreditCard,
  Building2, CheckCircle, GraduationCap, Database, Brain,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Server, Settings, DollarSign, Layers, CreditCard,
  Building2, CheckCircle, GraduationCap, Database, Brain,
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
  const { slug, locale } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const name = locale === 'en' && service.en ? service.en.name : service.name;
  const desc = locale === 'en' && service.en ? service.en.shortDescription : service.shortDescription;
  return { title: `${name} - Glomix`, description: desc };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const isEn = locale === 'en' && !!service.en;
  const name = isEn ? service.en!.name : service.name;
  const fullDescription = isEn ? service.en!.fullDescription : service.fullDescription;
  const backLabel = locale === 'en' ? '← Back to Services' : '← Quay lại dịch vụ';
  const contactLabel = locale === 'en' ? 'Contact Us' : 'Liên hệ ngay';

  const Icon = ICON_MAP[service.icon] ?? Server;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href={`/${locale}#services`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-10 transition-colors"
        >
          {backLabel}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#4A9EE8]/20 to-[#7B4FD4]/20">
              <Icon size={32} className="text-[#4A9EE8]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            {fullDescription}
          </p>

          <Link
            href={`/${locale}#lead-form`}
            className="inline-block bg-gradient-to-r from-[#4A9EE8] to-[#7B4FD4] hover:opacity-90 text-white font-semibold px-8 py-3 rounded-lg transition-opacity"
          >
            {contactLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
