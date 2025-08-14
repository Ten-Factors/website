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
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 lg:gap-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold text-primary">Subscribe to our newsletter</h3>
              <p className="text-tertiary mt-2">Get product updates, best practices, and insights right to your inbox.</p>
            </div>
            <form onSubmit={onSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md text-sm text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button type="submit" className="btn-primary">Subscribe</button>
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
