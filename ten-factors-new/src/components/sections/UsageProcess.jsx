import React from 'react';

const steps = [
  { title: 'Answer the questions', desc: 'Complete a short questionnaire across the Ten Factors to evaluate your current practices.' },
  { title: 'Receive your score', desc: 'Instantly get a detailed score with strengths and areas to improve.' },
  { title: 'Review best practices', desc: 'Explore actionable recommendations and best practices tailored to your results.' },
  { title: 'Track improvements', desc: 'Implement changes and track progress over time to continuously improve.' },
  { title: 'Track improvements', desc: 'Implement changes and track progress over time to continuously improve.' },
];

const UsageProcess = () => {
  const stepColors = ['#195460', '#286566', '#39766c', '#4e8d74', '#6cad7e'];

  return (
    <section id="usage-process" className="py-16 lg:py-24 bg-transparent lg:mt-[-350px] xl:mt-[-450px]">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-2 primary-gradient leading-tight">
            Usage Process
          </h2>
          <p className="text-primary text-lg mb-14">
            Ten-Factors is designed to provide a clear, practical, and scalable approach to quality control in software development. Our approach combines automated metrics with direct team feedback, creating a complete and accurate view of service quality.
          </p>
        </div>

        {/* Mobile/Tablet layout: numbers left (1..5), descriptions right (1..5) */}
        <div className="grid grid-cols-[auto,1fr] gap-[4px] xl:hidden">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
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
                  {step.title}
                </h3>
                <p className="text-base text-tertiary leading-6">
                  {step.desc}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Desktop layout: horizontal with number first then text, matching Figma spacing */}
        <ol className="hidden xl:flex lg:flex-row lg:items-start lg:gap-6 xl:gap-8">
          {steps.map((step, idx) => (
            <li key={idx} className="relative box-border flex w-[236px] shrink-0 flex-col items-start gap-10">
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
                  {step.title}
                </h3>
                <p className="text-base text-tertiary leading-6">
                  {step.desc}
                </p>
              </div>
              {/* Optional connector line to hint progression */}
              {idx < steps.length - 1 && (
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
