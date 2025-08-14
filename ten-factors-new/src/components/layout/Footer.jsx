import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  const onSubscribe = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    // Placeholder submit handler. Integrate with a real API later.
    console.log('Subscribe email:', email);
  };
  return (
    <footer className="bg-white border-t border-gray-200 py-12" role="contentinfo">
      <div className="container-custom">
        {/* Subscribe to our newsletter */}
        <section className="mb-12">
          <div className="flex flex-col gap-6 items-center justify-start p-0 relative w-full max-w-[479px] mx-auto">
            <div className="flex flex-col gap-2 items-center justify-start text-center w-full">
              <h3 className="primary-gradient font-bold text-[24px] leading-[32px] text-[#020205] w-full">
                Subscribe to Our Newsletter
              </h3>
              <p className="font-normal text-[16px] leading-[24px] text-[#020205] w-full">
                Get product updates, best practices, and insights right to your inbox.
              </p>
            </div>
            <form onSubmit={onSubscribe} className="flex flex-row flex-wrap md:flex-nowrap gap-4 items-center justify-center w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-[336px] shrink-0">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <div className="relative w-full">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="bg-white w-full h-12 px-4 py-3 rounded-[18px] border border-[#c9c0c9] text-[16px] leading-[24px] text-[#020205] placeholder-[#9a9a9b] tracking-[0.2px] focus:outline-none focus:ring-2 focus:ring-[#ffba00] focus:border-[#ffba00]"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="bg-[#ffba00] flex items-center justify-center px-6 py-3 rounded-[18px] shrink-0 hover:bg-[#e6a700] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffba00]"
              >
                <span className="font-bold text-[18px] leading-[24px] text-[#020205] text-center whitespace-nowrap">
                  Subscribe
                </span>
              </button>
            </form>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1">
            <div className="text-xl font-bold text-primary mb-4">Ten-Factors</div>
            <p className="text-tertiary text-sm">Measure and improve software delivery performance with our comprehensive assessment tool.</p>
          </div>
          
          {/* Links columns */}
          <nav aria-label="Product">
            <h3 className="font-semibold text-primary mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#advantages" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#application" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#best-practices" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </nav>
          
          <nav aria-label="Company">
            <h3 className="font-semibold text-primary mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#careers" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </nav>
          
          <nav aria-label="Support">
            <h3 className="font-semibold text-primary mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#support" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </nav>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-tertiary">
            © {year} Ten-Factors. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#cookies" className="text-tertiary hover:text-primary transition-colors text-xs">Cookie Declaration</a>
            <span className="text-tertiary text-xs">/</span>
            <a href="#privacy" className="text-tertiary hover:text-primary transition-colors text-xs">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
