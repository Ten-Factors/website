import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReadFurtherCard } from '../../components';

// Background asset from Figma export
import imgLayer1 from '../../assets/images/c8f261f91eedfc8b7dcff7261e963d999617b761.svg';

export default function ReadFurther() {
  const { t } = useTranslation();
  return (
    <section
      className="box-border content-stretch flex flex-col gap-12 items-start justify-start p-[80px] relative w-full"
      id="node-118_16688"
    >
      {/* Decorative background */}
      <div
        className="absolute h-[828px] left-1/2 opacity-[0.08] overflow-clip top-1/2 -z-10 translate-x-[-50%] translate-y-[-50%] w-[1440px] pointer-events-none select-none"
        aria-hidden
      >
        <div className="absolute inset-0">
          <img alt="" className="block max-w-none w-full h-full object-cover" src={imgLayer1} />
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-5xl font-bold primary-gradient mb-2">
        {t('readFurther.title')}
      </h2>

      {/* Cards grid */}
      <div className="flex flex-wrap gap-6 w-full">
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
