import React from 'react';
import { IMAGES } from '../../assets/constants';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold text-primary mb-2 primary-gradient leading-tight">
              Ten Factors
            </h1>
            <p className="text-xl lg:text-2xl font-medium mb-8 leading-relaxed">
            Measure and Improve Software Quality
            </p>
            <p className="text-lg lg:text-xl leading-relaxed">
              A practical and scalable framework for measuring and improving software 
              quality in technology service companies and products/startups. 
              Ten-Factors help companies to maintain high standards in products, and make data-driven improvements.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">Get Started</button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                Learn More
              </button>
            </div> */}
          </div>
          
          {/* Right content - Placeholder for circular diagram */}
          <div className="flex justify-center">
            <img 
              src={IMAGES.tenFactorsCircle} 
              alt={t('hero.diagramAlt')} 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
