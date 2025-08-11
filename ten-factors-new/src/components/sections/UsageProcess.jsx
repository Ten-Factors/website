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

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stepsKeys.map((s, idx) => (
            <li key={s.key} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-full bg-yellow-400 text-primary font-bold flex items-center justify-center">
                  {s.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {t(`${s.key}.title`)}
              </h3>
              <p className="text-tertiary">
                {t(`${s.key}.desc`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default UsageProcess;
