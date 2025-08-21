import React from 'react';

export default function ReadFurtherCard({ title, desc, href = '#' }) {
  return (
    <a
      href={href}
      className="bg-white flex flex-col items-center justify-start overflow-clip rounded-2xl primary-shadow w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      <div className="flex flex-col gap-4 items-start justify-start px-10 py-8 w-full">
        <div className="flex flex-col gap-3 items-start text-left text-primary w-full">
          <h3 className="text-xl font-bold text-primary">
            {title}
          </h3>
          <p className="text-base leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </a>
  );
}
