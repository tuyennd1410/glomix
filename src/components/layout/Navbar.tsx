'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import GlomixLogo from '@/components/GlomixLogo';

export default function Navbar() {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NAV_LINKS = [
    { label: t('home'), href: '#hero' },
    { label: t('services'), href: '#services' },
    { label: t('products'), href: '#products' },
    { label: t('careers'), href: '#careers' },
    { label: t('about'), href: '#about' },
  ];

  const handleNavClick = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleLangSwitch = () => {
    const currentLocale = window.location.pathname.split('/')[1] === 'en' ? 'en' : 'vi';
    router.replace(pathname as '/', { locale: currentLocale === 'vi' ? 'en' : 'vi' });
  };

  const navBg = 'bg-[#0D1B2E] shadow-sm';
  const textCls = 'text-white/80 hover:text-white transition-colors';

  return (
    <nav aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button onClick={() => handleNavClick('#hero')} aria-label="Glomix - Trang chủ">
            <GlomixLogo width={140} />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => handleNavClick(link.href)} className={`text-sm font-medium ${textCls}`}>
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop: lang + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={handleLangSwitch} className={`flex items-center gap-1 text-sm font-medium ${textCls}`} aria-label="Chuyển đổi ngôn ngữ">
              <Globe size={16} />
              <span>{t('langSwitch')}</span>
            </button>
            <button
              onClick={handleCtaClick}
              className="bg-gradient-to-r from-[#4A9EE8] to-[#7B4FD4] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              {t('cta')}
            </button>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={handleLangSwitch} className={`flex items-center gap-1 text-sm ${textCls}`} aria-label="Chuyển đổi ngôn ngữ">
              <Globe size={16} />
              <span>{t('langSwitch')}</span>
            </button>
            <button className={`p-2 rounded-md ${textCls}`} onClick={() => setIsOpen(p => !p)} aria-label="Toggle menu" aria-expanded={isOpen}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0D1B2E]/98 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <button key={link.href} onClick={() => handleNavClick(link.href)} className="text-left text-white/80 hover:text-white text-sm font-medium py-1 transition-colors">
              {link.label}
            </button>
          ))}
          <button
            onClick={handleCtaClick}
            className="bg-gradient-to-r from-[#4A9EE8] to-[#7B4FD4] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity mt-2"
          >
            {t('cta')}
          </button>
        </div>
      )}
    </nav>
  );
}
