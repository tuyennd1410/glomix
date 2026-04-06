'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCountUp } from '@/hooks/useCountUp';
import { Stat } from '@/types';

const STATS: Stat[] = [
  { id: '1', value: 50, suffix: '%', prefix: '', label: 'Giảm chi phí AWS' },
  { id: '2', value: 3, suffix: 'x', prefix: '', label: 'Tăng tốc triển khai' },
  { id: '3', value: 100, suffix: '+', prefix: '', label: 'Doanh nghiệp SME' },
  { id: '4', value: 24, suffix: '/7', prefix: '', label: 'Hỗ trợ kỹ thuật' },
];

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, 2000, active);
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="text-4xl font-bold">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="mt-2 text-sm">{stat.label}</div>
    </div>
  );
}

interface StatsSectionProps {
  stats?: Stat[];
}

export default function StatsSection({ stats = STATS }: StatsSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3, once: true });

  return (
    <section id="stats" ref={ref as React.RefObject<HTMLElement>} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Thống kê của chúng tôi
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} active={isIntersecting} />
          ))}
        </div>
      </div>
    </section>
  );
}
