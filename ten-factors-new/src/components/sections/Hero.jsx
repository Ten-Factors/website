import React from 'react';
import { IMAGES } from '../../assets/constants';

const Hero = () => {
  return (
    <section className="relative z-[-1]">
      <div className="unique-bg lg:bottom-[250px] bg-[#F9F8F9]">
        <img className="w-[auto] h-[100svh] max-w-[100%] lg:h-[initial] lg:w-[100%]" src={IMAGES.heroBackground} alt="" />
      </div>

      <div className="container-custom flex gap-4 flex-col items-start pt-[24px] justify-between z-1 relative lg:flex-row">

        {/* Content */}
        <div className="md:w-[519px] flex flex-col lg:pt-[60px] gap-8 items-start justify-start">
          <div className="flex flex-col gap-2 items-start justify-start w-full">
            <h1 className="primary-gradient font-bold text-[72px] leading-[72px]">
              Ten Factors
            </h1>
            <p className="font-medium text-[24px] leading-[32px] text-[#020205] min-w-full">
              Measure and Improve Software Quality
            </p>
          </div>
          <div className="flex flex-col gap-3 items-start justify-start w-full">
            <p className="font-medium text-[16px] leading-[24px] text-[#020205] w-full">
              A practical and scalable framework for measuring and improving software quality in technology service companies and products/startups. Ten-Factors help companies to maintain high standards in products, and make data-driven improvements.
            </p>
          </div>
        </div>

        {/* Circular diagram */}
        <div className="flex w-auto h-[100%]">
          <img 
            src={IMAGES.tenFactorsCircle} 
            alt="Ten-Factors circular diagram" 
            className="w-[100%]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
