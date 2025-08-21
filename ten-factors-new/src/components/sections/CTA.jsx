import React from 'react';

const CTA = () => {

  return (
    <section id="cta" className="primary-gradient-bg">
		<div className="ralabs-part-bg">
      		<div className="container-custom py-12 flex flex-col lg:flex-row items-center justify-between">
				<div className="max-w-3xl">
					<h2 className="text-3xl lg:text-5xl font-bold text-white mb-2 leading-tight">
						Ready to try Ten-Factors?
					</h2>
					<p className="text-white text-base lg:text-lg mb-4">
						Start measuring and improving your software quality today.
					</p>
				</div>

				<div className="h-max flex justify-center">
					<a
						href="#get-started"
						className="btn-primary font-extrabold"
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
