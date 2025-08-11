import React from 'react';
import { useState } from 'react';
import NavigationLinks from './NavigationLinks';
import MobileMenu from './MobileMenu';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#top" className="text-xl font-bold text-primary">{t('brand')}</a>
          </div>

          {/* Desktop navigation */}
          <NavigationLinks orientation="horizontal" />

          {/* Right side: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a href="#get-score" className="btn-primary hidden md:inline-flex">{t('cta.getScore')}</a>

            {/* Hamburger for mobile */}
            <button
              type="button"
              aria-label={t('aria.openMenu')}
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile slide-in drawer */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
};

export default Header;
