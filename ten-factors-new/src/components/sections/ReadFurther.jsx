import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReadFurtherCard } from '../../components';

// Background asset from Figma export
import imgLayer1 from '../../assets/images/c8f261f91eedfc8b7dcff7261e963d999617b761.svg';

export default function ReadFurther() {
  const { t } = useTranslation();
  return (
    <section
      className="container mx-auto px-8 py-20 relative"
      id="node-118_16688"
    >
      {/* Decorative background */}
      {/* TODO: fix mobile overflow-x */}
      <div
        className="absolute opacity-8 top-1/2 left-1/2 -z-10 transform -translate-x-1/2 -translate-y-1/2 w-[1440px] h-[828px]"
        aria-hidden
      >
        <div className="absolute inset-0">
          <img alt="" className="block w-full h-full object-cover" src={imgLayer1} />
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-5xl font-bold primary-gradient mb-4">
        {t('readFurther.title')}
      </h2>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ReadFurtherCard
          titleKey="readFurther.cards.advantages.title"
          descKey="readFurther.cards.advantages.desc"
          href="#advantages"
        />
        <ReadFurtherCard
          titleKey="readFurther.cards.successStories.title"
          descKey="readFurther.cards.successStories.desc"
          href="#case-studies"
        />
        <ReadFurtherCard
          titleKey="readFurther.cards.bestPractices.title"
          descKey="readFurther.cards.bestPractices.desc"
          href="#best-practices"
        />
        <ReadFurtherCard
          titleKey="readFurther.cards.getStarted.title"
          descKey="readFurther.cards.getStarted.desc"
          href="#cta"
        />
      </div>
    </section>
  );
}
