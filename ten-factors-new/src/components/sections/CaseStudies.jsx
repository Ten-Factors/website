import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const items = [
  {
    company: 'Acme Corp',
    title: 'Accelerated release cadence',
    summary: 'By focusing on deployment automation and CI, Acme reduced lead time while increasing quality.'
  },
  {
    company: 'Globex',
    title: 'Stability and speed together',
    summary: 'Improved incident response and change management brought fewer failures with quicker recovery.'
  },
  {
    company: 'Initech',
    title: 'From manual to automated',
    summary: 'Migrating to trunk-based development and automated tests unlocked consistent delivery.',
    result: '+50% test coverage'
  },
  {
    company: 'Initech',
    title: 'From manual to automated',
    summary: 'Migrating to trunk-based development and automated tests unlocked consistent delivery.'
  },
];

const CaseStudies = () => {
  const [emblaRef] = useEmblaCarousel(
    { align: 'start', loop: false, dragFree: false, slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <section id="case-studies" className="py-16 lg:py-24 bg-white overflow-x-hidden">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h2 className="text-5xl lg:text-7xl font-bold text-primary mb-2 primary-gradient leading-tight">
            Case Studies
          </h2>
          <p className="text-tertiary text-lg lg:text-xl mb-10">
            See how teams improved their delivery performance with Ten-Factors.
          </p>
        </div>

        <div className="relative">
          <div ref={emblaRef} aria-label="Case Studies">
            <div className="flex gap-4 lg:gap-6">
              {items.map((item, idx) => (
                <article
                  key={idx}
                  className="group flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_40%] xl:flex-[0_0_33%] flex flex-col rounded-3xl bg-white primary-shadow transition-all hover:-translate-y-0.5"
                >
                  {/* Header / Logo strip */}
                  <div className="relative h-64 w-full bg-[#f9f8f9] rounded-t-3xl">
                    <div className="absolute inset-0 border-b border-gray-200 pointer-events-none" aria-hidden="true" />
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="w-[221px] h-[80px] bg-white/80 border border-gray-200 rounded-xl flex items-center justify-center">
                        <img
                          // src={IMAGES[item.company]}
                          alt={item.company}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4 w-full p-6">
                    <div className="flex flex-col gap-2 text-primary">
                      <h3 className="text-[22px] lg:text-[24px] leading-7 lg:leading-8 tracking-[0.2px] font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-tertiary text-sm lg:text-base leading-6">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-2">
                      <a
                        href="#"
                        className="relative block w-full rounded-2xl border border-primary text-primary px-6 py-3 text-center text-sm lg:text-base font-medium hover:opacity-80"
                        aria-label="Read more"
                      >
                        Read more
                      </a>
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

export default CaseStudies;
