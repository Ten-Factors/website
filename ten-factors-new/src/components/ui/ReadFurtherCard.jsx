import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ReadFurtherCard({ titleKey, descKey, href = '#' }) {
  const { t } = useTranslation();
  return (
    <a
      href={href}
      className="bg-white flex flex-col items-center justify-start overflow-clip rounded-2xl primary-shadow w-full max-w-[630px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      <div className="flex flex-col gap-4 items-start justify-start px-10 py-8 w-full">
        <div className="flex flex-col gap-3 items-start text-left text-primary w-full">
          <div className="font-bold text-[24px] tracking-[0.2px] w-full">
            <p className="leading-[24px]">{t(titleKey)}</p>
          </div>
          <div className="text-[16px] w-full">
            <p className="leading-[24px]">{t(descKey)}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
