import React from 'react';
import { useTranslation } from 'react-i18next';

const stepsKeys = [
  { key: 'usage.steps.1', icon: '1' },
  { key: 'usage.steps.2', icon: '2' },
  { key: 'usage.steps.3', icon: '3' },
  { key: 'usage.steps.4', icon: '4' },
  { key: 'usage.steps.5', icon: '5' },
];

const UsageProcess = () => {
  const { t } = useTranslation();
  const stepColors = ['#195460', '#286566', '#39766c', '#4e8d74', '#6cad7e'];

  return (
    <section id="usage-process" className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h2 className="text-5xl lg:text-7xl font-bold text-primary mb-2 primary-gradient leading-tight">
            {t('usage.title')}
          </h2>
          <p className="text-tertiary text-lg lg:text-xl mb-10">
            {t('usage.subtitle')}
          </p>
        </div>

        {/* Mobile/Tablet layout: numbers left (1..5), descriptions right (1..5) */}
        <div className="grid grid-cols-[auto,1fr] gap-[4px] lg:hidden">
          {stepsKeys.map((s, idx) => (
            <React.Fragment key={s.key}>
              <div className="flex items-start justify-start pt-1">
                <div
                  className="flex items-center justify-center rounded-full w-16 h-16 text-white font-bold text-2xl leading-8"
                  style={{ backgroundColor: stepColors[idx] }}
                  aria-hidden
                >
                  {idx + 1}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary tracking-[0.2px] mb-2">
                  {t(`${s.key}.title`)}
                </h3>
                <p className="text-base text-tertiary leading-6">
                  {t(`${s.key}.desc`)}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Desktop layout: horizontal with number first then text, matching Figma spacing */}
        <ol className="hidden lg:flex lg:flex-row lg:items-start lg:gap-6 xl:gap-8">
          {stepsKeys.map((s, idx) => (
            <li key={s.key} className="relative box-border flex w-[236px] shrink-0 flex-col items-start gap-10">
              <div className="flex items-center justify-center">
                <div
                  className="flex items-center justify-center rounded-full w-16 h-16 text-white font-bold text-2xl leading-8"
                  style={{ backgroundColor: stepColors[idx] }}
                  aria-hidden
                >
                  {idx + 1}
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start w-full">
                <h3 className="text-2xl font-bold text-primary tracking-[0.2px] leading-6">
                  {t(`${s.key}.title`)}
                </h3>
                <p className="text-base text-tertiary leading-6">
                  {t(`${s.key}.desc`)}
                </p>
              </div>
              {/* Optional connector line to hint progression */}
              {idx < stepsKeys.length - 1 && (
                <div className="absolute left-16 top-[30px] h-1 w-[204px] bg-gradient-to-r from-[#195460] to-[#6cad7e]" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default UsageProcess;
