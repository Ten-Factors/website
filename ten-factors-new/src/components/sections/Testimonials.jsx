import React from 'react';
import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const items = [
  { key: 'testimonials.items.1' },
  { key: 'testimonials.items.2' },
  { key: 'testimonials.items.3' },
  { key: 'testimonials.items.4' },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: false, dragFree: false, slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
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
    <section id="testimonials" className="py-16 lg:py-24 bg-white overflow-x-hidden">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h2 className="text-5xl lg:text-7xl font-bold text-primary mb-2 primary-gradient leading-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-tertiary text-lg lg:text-xl mb-10">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="relative">

          <div ref={emblaRef} aria-label={t('testimonials.title')}>
            <div className="flex gap-4 lg:gap-6">
              {items.map((item) => (
                <article
                  key={item.key}
                  className="h-max flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_40%] xl:flex-[0_0_33%] p-6 primary-shadow rounded-xl bg-white shadow-sm hover:shadow transition-shadow"
                >
                  <svg
                    className="mb-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M45.5 11C45.5 9.542 44.92 8.142 43.89 7.11C42.858 6.08 41.458 5.5 40 5.5C32.336 5.5 15.664 5.5 8 5.5C6.542 5.5 5.142 6.08 4.11 7.11C3.08 8.142 2.5 9.542 2.5 11V31C2.5 34.038 4.962 36.5 8 36.5H10C10.276 36.5 10.5 36.724 10.5 37V38.838C10.5 40.184 11.272 41.41 12.484 41.994C13.696 42.576 15.136 42.412 16.186 41.572L22.39 36.61C22.478 36.538 22.588 36.5 22.702 36.5H40C41.458 36.5 42.858 35.92 43.89 34.89C44.92 33.858 45.5 32.458 45.5 31V11ZM26.148 25.714C25.47 24.89 24.814 23.45 25.02 20.934C25.352 16.854 29.78 14.934 29.78 14.934L30.594 16.174C30.594 16.174 28.102 17.52 28.326 20.62C28.476 20.6 28.626 20.59 28.78 20.59C30.568 20.59 32.02 22.04 32.02 23.828C32.02 25.614 30.568 27.066 28.78 27.066C28.304 27.066 27.85 26.962 27.44 26.776C27.434 26.776 26.468 26.24 26.148 25.714ZM17.148 25.714C16.47 24.89 15.814 23.45 16.02 20.934C16.352 16.854 20.78 14.934 20.78 14.934L21.594 16.174C21.594 16.174 19.102 17.52 19.326 20.62C19.476 20.6 19.626 20.59 19.78 20.59C21.568 20.59 23.02 22.04 23.02 23.828C23.02 25.614 21.568 27.066 19.78 27.066C19.304 27.066 18.85 26.962 18.44 26.776C18.434 26.776 17.468 26.24 17.148 25.714Z" fill="url(#paint0_linear_118_16626)"/>
                    <defs>
                    <linearGradient id="paint0_linear_118_16626" x1="2.5" y1="42.3388" x2="49.359" y2="36.507" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#134E5E"/>
                    <stop offset="1" stopColor="#71B280"/>
                    </linearGradient>
                    </defs>
                  </svg>

                  <blockquote className="text-primary text-lg leading-relaxed mb-6">“{t(`${item.key}.quote`)}”</blockquote>

                  <div className="flex items-center gap-3 pt-4 border-t-1 border-gray-300">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl" aria-hidden="true">🧑</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-primary truncate">{t(`${item.key}.name`)}</span>
                        <span className="text-lg" aria-hidden="true">{t(`${item.key}.flag`)}</span>
                      </div>
                      <div className="text-sm text-tertiary truncate">{t(`${item.key}.role`)}</div>
                    </div>
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

export default Testimonials;
