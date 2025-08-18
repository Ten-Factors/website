import React from 'react';

const CTA = () => {

  return (
    <section id="cta" className="primary-gradient-bg">
		<div className="ralabs-part-bg">
      		<div className="container-custom py-8 flex flex-col lg:flex-row items-center justify-between">
				<div className="max-w-3xl">
					<h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
						Ready to try Ten-Factors?
					</h2>
					<p className="text-white text-lg lg:text-xl mb-10">
						Start measuring and improving your software quality today.
					</p>
				</div>

				<div className="h-max flex justify-center">
					<a
						href="#get-started"
						className="btn-primary"
						aria-label="Get Started Now"
					>
						Get Started Now
					</a>
				</div>
			</div>
      	</div>
    </section>
  );
};

export default CTA;
