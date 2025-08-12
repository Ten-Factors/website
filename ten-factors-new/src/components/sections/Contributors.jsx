import React from 'react';
import { useTranslation } from 'react-i18next';

const InitialsAvatar = ({ name }) => {
  const initials = (name || '?')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="h-14 w-14 rounded-full bg-gray-200 text-primary flex items-center justify-center font-semibold">
      {initials}
    </div>
  );
};

const Contributors = () => {
  const { t } = useTranslation();
  const items = t('contributors.items', { returnObjects: true });

  return (
    <section id="contributors" className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <article className="flex flex-col items-center sm:items-start  justify-center">
            <h3 className="text-5xl font-bold primary-gradient mb-2">
              {t('contributors.title')}
            </h3>
            <p className="text-tertiary text-center max-w-md">
              {t('contributors.subtitle')}
            </p>
          </article>

          {Array.isArray(items) && items.map((person, idx) => (
            <article
              key={idx}
              className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow transition-shadow flex items-center gap-4"
            >
              {person.avatar ? (
                <img
                  src={person.avatar}
                  alt={`${person.name} avatar`}
                  className="h-14 w-14 rounded-full object-cover border border-gray-200"
                  loading="lazy"
                />
              ) : (
                <InitialsAvatar name={person.name} />
              )}
              <div className="min-w-0">
                <div className="font-semibold text-primary truncate">{person.name}</div>
                <div className="text-sm text-tertiary truncate">{person.role}</div>
                {person.company && (
                  <div className="text-sm text-tertiary truncate">{person.company}</div>
                )}
                {person.link && (
                  <a
                    className="text-sm text-blue-600 hover:underline"
                    href={person.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View profile
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contributors;
