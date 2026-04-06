import { useTranslations } from 'next-intl';
import { Linkedin, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { services } from '@/data/services';
import GlomixLogo from '@/components/GlomixLogo';

const socialLinks = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/glomix', icon: 'linkedin' },
  { platform: 'Facebook', url: 'https://facebook.com/glomix.cloud', icon: 'facebook' },
  { platform: 'YouTube', url: 'https://youtube.com/@glomix', icon: 'youtube' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1B2E] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <GlomixLogo width={200} showTagline />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">{t('tagline')}</p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contactTitle')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#4A9EE8] mt-0.5 shrink-0" />
                <span>{t('address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#4A9EE8] shrink-0" />
                <a href={`tel:${t('phone')}`} className="hover:text-white transition-colors">{t('phone')}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#4A9EE8] shrink-0" />
                <a href={`mailto:${t('email')}`} className="hover:text-white transition-colors">{t('email')}</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('servicesTitle')}</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <a href={`/services/${service.slug}`} className="hover:text-[#4A9EE8] transition-colors">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('socialTitle')}</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}
                    className="flex items-center gap-2 text-sm hover:text-[#4A9EE8] transition-colors">
                    {link.icon === 'linkedin' && <Linkedin size={18} />}
                    {link.icon === 'facebook' && <Facebook size={18} />}
                    {link.icon === 'youtube' && <Youtube size={18} />}
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          {t('copyright', { year })}
        </div>
      </div>
    </footer>
  );
}
