'use client';

import { useTranslations } from 'next-intl';
import { Activity, Bot, TrendingUp } from 'lucide-react';

const PRODUCTS = [
  {
    key: 'cloudHealthCheck' as const,
    Icon: Activity,
    featured: false,
  },
  {
    key: 'aiStarter' as const,
    Icon: Bot,
    featured: true,
  },
  {
    key: 'growthOps' as const,
    Icon: TrendingUp,
    featured: false,
  },
];

export default function ProductsSection() {
  const t = useTranslations('products');

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-3 text-lg text-gray-500">{t('sectionSubtitle')}</p>
        </div>

        {/* 3 pricing cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCTS.map(({ key, Icon, featured }) => (
            <div
              key={key}
              className={[
                'relative flex flex-col gap-6 rounded-2xl border p-8 transition-shadow hover:shadow-lg',
                featured
                  ? 'border-[#2563EB] shadow-md bg-blue-50'
                  : 'border-gray-100 bg-white shadow-sm',
              ].join(' ')}
            >
              {/* Badge "Phổ biến nhất" */}
              {featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#4A9EE8] to-[#7B4FD4] px-4 py-1 text-xs font-semibold text-white whitespace-nowrap">
                  {t('mostPopular')}
                </span>
              )}

              {/* Icon */}
              <div className={['flex h-14 w-14 items-center justify-center rounded-2xl', featured ? 'bg-gradient-to-br from-[#4A9EE8]/20 to-[#7B4FD4]/20' : 'bg-gray-50'].join(' ')}>
                <Icon size={32} className={featured ? 'text-[#7B4FD4]' : 'text-[#4A9EE8]'} />
              </div>

              {/* Name & description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t(`${key}.name`)}
                </h3>
                <p className="mt-2 text-gray-600">{t(`${key}.description`)}</p>
              </div>

              {/* Pricing type */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700">{t('pricingType')}:</span>
                <span>{t(`${key}.pricingType`)}</span>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <a
                  href="#lead-form"
                  role="button"
                  className={[
                    'inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity',
                    featured
                      ? 'bg-gradient-to-r from-[#4A9EE8] to-[#7B4FD4] text-white hover:opacity-90'
                      : 'border border-[#7B4FD4] text-[#7B4FD4] hover:bg-purple-50',
                  ].join(' ')}
                >
                  {t(`${key}.cta`)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
