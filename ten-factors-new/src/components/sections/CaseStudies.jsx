import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import CaseStudiesCard from '../ui/CaseStudiesCard';

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
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-2 primary-gradient leading-tight">
            Case Studies
          </h2>
          <p className="text-primary text-lg mb-10">
            See how teams improved their delivery performance with Ten-Factors.
          </p>
        </div>

        <div className="relative">
          <div ref={emblaRef} aria-label="Case Studies">
            <div className="flex gap-4 lg:gap-6">
              {items.map((item, idx) => (
                <CaseStudiesCard key={idx} company={item.company} title={item.title} summary={item.summary}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
