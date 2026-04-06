'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCountUp } from '@/hooks/useCountUp';

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  prefix: string;
  labelKey: string;
}

const STATS: StatItem[] = [
  { id: '1', value: 50, suffix: '%', prefix: '', labelKey: 'reduceCost' },
  { id: '2', value: 3, suffix: 'x', prefix: '', labelKey: 'fasterDeploy' },
  { id: '3', value: 100, suffix: '+', prefix: '', labelKey: 'smeClients' },
  { id: '4', value: 24, suffix: '/7', prefix: '', labelKey: 'support' },
];

function StatCard({ stat, active, label }: { stat: StatItem; active: boolean; label: string }) {
  const count = useCountUp(stat.value, 2000, active);
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="text-4xl font-bold">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="mt-2 text-sm">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const t = useTranslations('stats');
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3, once: true });

  return (
    <section id="stats" ref={ref as React.RefObject<HTMLElement>} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          {t('sectionTitle')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard
              key={stat.id}
              stat={stat}
              active={isIntersecting}
              label={t(stat.labelKey as 'reduceCost' | 'fasterDeploy' | 'smeClients' | 'support')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
