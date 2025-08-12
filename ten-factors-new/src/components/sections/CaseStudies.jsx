import React from 'react';
import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const items = [
  {
    key: 'caseStudies.items.1',
  },
  {
    key: 'caseStudies.items.2',
  },
  {
    key: 'caseStudies.items.3',
  },
  {
    key: 'caseStudies.items.4',
  },
];

const CaseStudies = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: false, dragFree: false, slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [prevDisabled, setPrevDisabled] = React.useState(true);
  const [nextDisabled, setNextDisabled] = React.useState(true);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="case-studies" className="py-16 lg:py-24 bg-white overflow-x-hidden">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h2 className="text-5xl lg:text-7xl font-bold text-primary mb-2 primary-gradient leading-tight">
            {t('caseStudies.title')}
          </h2>
          <p className="text-tertiary text-lg lg:text-xl mb-10">
            {t('caseStudies.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div ref={emblaRef} aria-label={t('caseStudies.title')}>
            <div className="flex gap-4 lg:gap-6">
              {items.map((item) => (
                <article
                  key={item.key}
                  className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_40%] xl:flex-[0_0_33%] p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow transition-shadow"
                >
                <div className="h-40 w-full flex items-center justify-center mb-4">
                  <div className="w-[221px] h-[80px] bg-gray-200 rounded-xl flex items-center justify-center">
                    <img
                    //   src={IMAGES[item.key]}
                      alt={t(`${item.key}.company`)}
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
                
                  <header className="mb-4">
                    <div className="text-sm text-tertiary">{t(`${item.key}.company`)}</div>
                    <h3 className="text-xl font-semibold text-primary mt-1">
                      {t(`${item.key}.title`)}
                    </h3>
                  </header>
                  <p className="text-tertiary mb-4">
                    {t(`${item.key}.summary`)}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-primary font-semibold">
                      {t(`${item.key}.result`)}
                    </div>
                    <a href="#" className="text-primary hover:opacity-80 text-sm font-medium">
                      {t('caseStudies.readMore')} →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
