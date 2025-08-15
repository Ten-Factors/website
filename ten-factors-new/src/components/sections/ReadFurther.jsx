import React from 'react';
import { ReadFurtherCard } from '../../components';

// Background asset from Figma export
import imgLayer1 from '../../assets/images/c8f261f91eedfc8b7dcff7261e963d999617b761.svg';

const items = [
  { title: 'Advantages', desc: 'Discover how Ten-Factors differs from existing solutions', href: '#advantages' },
  { title: 'Success Stories', desc: 'See how Ten-Factors can supercharge your software quality', href: '#case-studies' },
  { title: 'Library of Best Practices', desc: 'Explore the catalogue of industry best practices and guidelines', href: '#best-practices' },
  { title: 'Get Started', desc: 'Begin your journey with Ten-Factors', href: '#cta' },
];

export default function ReadFurther() {
  return (
    <section
      className="container mx-auto px-8 py-20 relative"
      id="node-118_16688"
    >
      {/* Decorative background */}
      {/* TODO: fix mobile overflow-x */}
      <div
        className="absolute opacity-8 top-1/2 left-1/2 -z-10 transform -translate-x-1/2 -translate-y-1/2 w-[100%] h-[828px]"
        aria-hidden
      >
        <div className="absolute inset-0">
          <img alt="" className="block w-full h-full object-cover" src={imgLayer1} />
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-2 primary-gradient leading-tight">
        Read Further
      </h2>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map(({ title, desc, href }) => (
          <ReadFurtherCard key={href} title={title} desc={desc} href={href} />
        ))}
      </div>
    </section>
  );
}
