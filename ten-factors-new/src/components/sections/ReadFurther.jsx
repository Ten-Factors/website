import React from 'react';
import { ReadFurtherCard } from '../../components';

const items = [
  { title: 'Advantages', desc: 'Discover how Ten-Factors differs from existing solutions', href: '#advantages' },
  { title: 'Success Stories', desc: 'See how Ten-Factors can supercharge your software quality', href: '#case-studies' },
  { title: 'Library of Best Practices', desc: 'Explore the catalogue of industry best practices and guidelines', href: '#best-practices' },
  { title: 'Get Started', desc: 'Begin your journey with Ten-Factors', href: '#cta' },
];

export default function ReadFurther() {
  return (
    <section
      className="primary-bg-cover"
      id="node-118_16688"
    >
      <div className="relative z-1 container mx-auto px-8 py-20">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-2 primary-gradient leading-tight">
          Read Further
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map(({ title, desc, href }) => (
            <ReadFurtherCard key={href} title={title} desc={desc} href={href} />
          ))}
        </div>
      </div>
    </section>
  );
}
