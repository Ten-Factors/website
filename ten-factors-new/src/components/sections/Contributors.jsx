import React from 'react';
import romanImage from '../../assets/images/RRodomanskiy.png';
import danielImage from '../../assets/images/DNiaziev.png';

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
  const items = [
    { name: "Roman Rodomansky", role: "Co-Founder", company: "RALABS", avatar: romanImage },
    { name: "Daniel Niiaziiev", role: "Head of Engineering", company: "RALABS", avatar: danielImage },
    { name: "Alex Kim", role: "Full‑stack Engineer", company: "Umbrella" },
    { name: "Maria Garcia", role: "Product Manager", company: "Initech" },
    { name: "Liam Brown", role: "QA Engineer", company: "Hooli" },
    { name: "Emma Wilson", role: "Tech Writer", company: "Soylent" }
  ];

  return (
    <section id="contributors" className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <article className="flex flex-col items-center sm:items-start  justify-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-2 primary-gradient leading-tight">
              Contributors
            </h2>
            <p className="text-primary text-lg mb-10">
              People who helped build Ten‑Factors.
            </p>
          </article>

          {Array.isArray(items) && items.map((person, idx) => (
            <article
              key={idx}
              className="p-5 rounded-xl bg-white shadow-sm hover:shadow flex items-center gap-4"
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
