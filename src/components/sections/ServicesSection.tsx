'use client';

import { Cloud, Brain, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ServicesSection() {
  const t = useTranslations('services');

  const cards = [
    {
      key: 'aws',
      Icon: Cloud,
      href: '/services/aws-managed-services',
    },
    {
      key: 'ai',
      Icon: Brain,
      href: '/services/ai-integration',
    },
  ] as const;

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-3 text-gray-500 text-lg">{t('sectionSubtitle')}</p>
        </div>

        {/* 2 large cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map(({ key, Icon, href }) => (
            <div
              key={key}
              className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4A9EE8]/20 to-[#7B4FD4]/20">
                <Icon size={32} className="text-[#4A9EE8]" />
              </div>

              {/* Title & description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 text-gray-600">{t(`${key}.description`)}</p>
              </div>

              {/* Highlights */}
              <ul className="flex flex-col gap-2">
                {(['highlight1', 'highlight2', 'highlight3'] as const).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-[#4A9EE8]" />
                    <span>{t(`${key}.${h}`)}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <Link
                  href={href}
                  className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#4A9EE8] to-[#7B4FD4] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {t(`${key}.cta`)} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
