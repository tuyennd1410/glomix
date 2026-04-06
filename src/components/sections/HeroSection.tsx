'use client';

import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* === BACKGROUND LAYERS === */}

      {/* Layer 1: Deep gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020818] via-[#0D1B2E] to-[#0a0a2e]" aria-hidden="true" />

      {/* Layer 2: Radial glow spots */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7B4FD4]/25 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4A9EE8]/10 rounded-full blur-[80px]" />
      </div>

      {/* Layer 3: Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,158,232,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,158,232,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Layer 4: SVG cloud/tech decorations */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Floating cloud shapes */}
        <ellipse cx="10%" cy="25%" rx="80" ry="40" fill="none" stroke="#4A9EE8" strokeWidth="0.5" opacity="0.3" />
        <ellipse cx="88%" cy="70%" rx="100" ry="50" fill="none" stroke="#7B4FD4" strokeWidth="0.5" opacity="0.25" />

        {/* Circuit-like lines */}
        <path d="M0,30% L15%,30% L15%,20% L30%,20%" stroke="#4A9EE8" strokeWidth="0.8" fill="none" opacity="0.2" />
        <path d="M100%,60% L85%,60% L85%,75% L70%,75%" stroke="#7B4FD4" strokeWidth="0.8" fill="none" opacity="0.2" />
        <path d="M50%,0 L50%,10% L60%,10% L60%,20%" stroke="#4A9EE8" strokeWidth="0.8" fill="none" opacity="0.15" />

        {/* Dot nodes */}
        <circle cx="15%" cy="20%" r="3" fill="#4A9EE8" opacity="0.4" />
        <circle cx="30%" cy="20%" r="2" fill="#4A9EE8" opacity="0.3" />
        <circle cx="85%" cy="75%" r="3" fill="#7B4FD4" opacity="0.4" />
        <circle cx="70%" cy="75%" r="2" fill="#7B4FD4" opacity="0.3" />
        <circle cx="60%" cy="20%" r="2" fill="#4A9EE8" opacity="0.3" />

        {/* Large decorative rings */}
        <circle cx="5%" cy="50%" r="120" fill="none" stroke="#2563EB" strokeWidth="0.5" opacity="0.12" />
        <circle cx="95%" cy="50%" r="150" fill="none" stroke="#7B4FD4" strokeWidth="0.5" opacity="0.1" />
        <circle cx="50%" cy="95%" r="200" fill="none" stroke="#4A9EE8" strokeWidth="0.5" opacity="0.08" />

        {/* Small floating dots */}
        {[
          [20, 15], [75, 25], [40, 80], [85, 40], [15, 70],
          [60, 10], [90, 85], [35, 45], [70, 60], [25, 90],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="1.5" fill="white" opacity="0.2" />
        ))}

        {/* Server/cloud icon outlines — top right */}
        <g transform="translate(82%, 12%)" opacity="0.15" stroke="#4A9EE8" strokeWidth="1" fill="none">
          <rect x="0" y="0" width="60" height="14" rx="3" />
          <rect x="0" y="18" width="60" height="14" rx="3" />
          <rect x="0" y="36" width="60" height="14" rx="3" />
          <circle cx="52" cy="7" r="3" fill="#4A9EE8" />
          <circle cx="52" cy="25" r="3" fill="#4A9EE8" />
          <circle cx="52" cy="43" r="3" fill="#4A9EE8" />
        </g>

        {/* Cloud icon — bottom left */}
        <g transform="translate(5%, 75%)" opacity="0.12" stroke="#7B4FD4" strokeWidth="1.5" fill="none">
          <path d="M20 35 Q5 35 5 22 Q5 10 18 10 Q20 2 30 2 Q42 2 42 14 Q50 14 50 22 Q50 35 35 35 Z" />
        </g>
      </svg>

      {/* === CONTENT === */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#4A9EE8] animate-pulse" />
          AWS Partner · Cloud & AI Solutions
        </div>

        <h1 className="mb-5 leading-tight">
          <span className="block text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest font-[family-name:var(--font-rajdhani)] uppercase bg-gradient-to-r from-white via-[#a8d4ff] to-[#c4a8ff] bg-clip-text text-transparent">
            Glomix
          </span>
          <span className="block text-lg sm:text-xl md:text-2xl font-medium mt-2 text-white/80 tracking-wide">
            Global In Minutes · Cloud &amp; AI Transformation
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-8 text-white/65 max-w-2xl mx-auto leading-relaxed">
          {t('subheadline')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCtaClick}
            className="bg-gradient-to-r from-[#2563EB] to-[#7B4FD4] hover:opacity-90 text-white font-semibold px-8 py-3.5 rounded-lg transition-opacity shadow-lg shadow-blue-900/40 hover:shadow-xl"
          >
            {t('cta')}
          </button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white/30 hover:border-white/60 text-white/80 hover:text-white font-medium px-8 py-3.5 rounded-lg transition-all backdrop-blur-sm"
          >
            {t('viewServices')} →
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm">
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#4A9EE8]"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z"/></svg>
            AWS Partner
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#7B4FD4]"><circle cx="12" cy="12" r="10"/></svg>
            100+ SME
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#4A9EE8]"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            24/7 Support
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#7B4FD4]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Bảo mật cao
          </span>
        </div>
      </div>
    </section>
  );
}
