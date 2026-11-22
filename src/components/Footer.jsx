import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, Mail } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

export const Footer = () => {
  const { t, settings, language, getWhatsAppLink } = useBrand();

  return (
    <footer className="relative z-10 bg-[#4A0011] text-[#FFF7EB] border-t border-[#DFAC6D]/25">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="inline-block text-xl sm:text-2xl font-semibold text-[#FEDEA3] tracking-tight"
            >
              AL QERWIAH – القروية
            </Link>
            <p className="mt-4 text-sm text-[#FFF7EB]/80 leading-relaxed max-w-md">
              {t.footer.description}
            </p>
            <p className="mt-5 text-xs tracking-wider text-[#DFAC6D]">
              {t.footer.heritageMark} · {settings.atelierLocation[language]}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-[#FEDEA3] mb-4">
              {t.footer.navigationTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FFF7EB]/80">
              <li>
                <Link to="/" className="hover:text-[#FEDEA3] transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FEDEA3] transition-colors">
                  {t.nav.story}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#FEDEA3] transition-colors">
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link to="/custom-design" className="hover:text-[#FEDEA3] transition-colors">
                  {t.nav.customDesign}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FEDEA3] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & WhatsApp */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-[#FEDEA3] mb-4">
              {t.footer.connectTitle}
            </h3>
            <div className="space-y-3 text-sm text-[#FFF7EB]/85">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-[#FEDEA3] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#DFAC6D]" aria-hidden="true" />
                <span dir="ltr" className="tabular-nums">
                  {settings.whatsappNumber}
                </span>
              </a>

              <div>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="inline-flex items-center gap-2.5 hover:text-[#FEDEA3] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#DFAC6D]" aria-hidden="true" />
                  <span>{settings.contactEmail}</span>
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-[#FEDEA3]/25 flex items-center justify-center text-[#FEDEA3] hover:bg-[#FEDEA3] hover:text-[#4A0011] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-[#FEDEA3]/25 flex items-center justify-center text-[#FEDEA3] hover:bg-[#FEDEA3] hover:text-[#4A0011] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#FEDEA3]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF7EB]/65">
          <p>{t.footer.rights}</p>
          <p>{t.productsPage.informationalNote}</p>
        </div>
      </div>
    </footer>
  );
};
