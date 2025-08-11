import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const onSubscribe = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    // Placeholder submit handler. Integrate with a real API later.
    console.log('Subscribe email:', email);
  };
  return (
    <footer className="bg-white border-t border-gray-200 py-12" role="contentinfo">
      <div className="container-custom">
        {/* Subscribe to our newsletter */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 lg:gap-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold text-primary">{t('footer.newsletter.title')}</h3>
              <p className="text-tertiary mt-2">{t('footer.newsletter.subtitle')}</p>
            </div>
            <form onSubmit={onSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">{t('footer.newsletter.emailLabel')}</label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md text-sm text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button type="submit" className="btn-primary">{t('footer.newsletter.submit')}</button>
            </form>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1">
            <div className="text-xl font-bold text-primary mb-4">{t('brand')}</div>
            <p className="text-tertiary text-sm">{t('footer.description')}</p>
          </div>
          
          {/* Links columns */}
          <nav aria-label={t('footer.product')}>
            <h3 className="font-semibold text-primary mb-4">{t('footer.product')}</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#advantages" className="hover:text-primary transition-colors">{t('footer.features')}</a></li>
              <li><a href="#application" className="hover:text-primary transition-colors">{t('footer.pricing')}</a></li>
              <li><a href="#best-practices" className="hover:text-primary transition-colors">{t('footer.documentation')}</a></li>
            </ul>
          </nav>
          
          <nav aria-label={t('footer.company')}>
            <h3 className="font-semibold text-primary mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#about" className="hover:text-primary transition-colors">{t('footer.about')}</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors">{t('footer.blog')}</a></li>
              <li><a href="#careers" className="hover:text-primary transition-colors">{t('footer.careers')}</a></li>
            </ul>
          </nav>
          
          <nav aria-label={t('footer.support')}>
            <h3 className="font-semibold text-primary mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#support" className="hover:text-primary transition-colors">{t('footer.helpCenter')}</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#privacy" className="hover:text-primary transition-colors">{t('footer.privacyPolicy')}</a></li>
            </ul>
          </nav>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-tertiary">
            © {year} {t('brand')}. {t('footer.rightsReserved')}
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#cookies" className="text-tertiary hover:text-primary transition-colors text-xs">{t('footer.cookieDeclaration')}</a>
            <span className="text-tertiary text-xs">/</span>
            <a href="#privacy" className="text-tertiary hover:text-primary transition-colors text-xs">{t('footer.privacyPolicy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
