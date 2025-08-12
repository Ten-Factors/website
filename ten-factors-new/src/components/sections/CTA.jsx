import React from 'react';
import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section id="cta" className="primary-gradient-bg">
			<div className="py-8 ralabs-part-bg">
      	<div className="container-custom flex flex-col lg:flex-row items-center justify-between">
					<div className="max-w-3xl">
						<h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4">
							{t('ctaSection.title')}
						</h2>
						<p className="text-white text-lg lg:text-xl mb-8">
							{t('ctaSection.subtitle')}
						</p>
					</div>

					<div className="h-max flex justify-center">
						<a
							href="#get-started"
							className="btn-primary"
							aria-label={t('ctaSection.primary')}
						>
							{t('ctaSection.primary')}
						</a>
					</div>
				</div>
      </div>
    </section>
  );
};

export default CTA;
