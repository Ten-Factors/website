import React, { useState } from 'react';

const Newsletter = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const onSubscribe = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      
      // Basic email validation
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      console.log('Subscribe email:', email);
      
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.7) {
            reject(new Error('Network error. Please try again later.'));
          } else {
            resolve();
          }
        }, 1000);
      });

      setStatus('success');
      e.target.reset(); // Clear form on success
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col gap-6 items-center justify-start p-0 relative w-full max-w-[479px] mx-auto">
        <div className="flex flex-col gap-2 items-center justify-start text-center w-full">
          <h3 className="primary-gradient text-2xl font-bold w-full">
            Subscribe to Our Newsletter
          </h3>
          <p className="font-normal text-[16px] leading-[24px] w-full">
            Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
          </p>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="w-full max-w-[479px] p-4 bg-green-50 border border-green-200 rounded-[18px] text-center">
            <p className="text-green-800 font-medium">
              ✓ Successfully subscribed! Thank you for joining our newsletter.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="w-full max-w-[479px] p-4 bg-red-50 border border-red-200 rounded-[18px] text-center">
            <p className="text-red-800 font-medium">
              ⚠ {errorMessage}
            </p>
          </div>
        )}

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
                disabled={status === 'loading'}
                className={`bg-white w-full h-12 px-4 py-3 rounded-[18px] border text-[16px] leading-[24px] text-[#020205] placeholder-[#9a9a9b] tracking-[0.2px] focus:outline-none focus:ring-2 transition-colors ${
                  status === 'loading' 
                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
                    : 'border-[#c9c0c9] focus:ring-[#ffba00] focus:border-[#ffba00]'
                }`}
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className={`flex items-center justify-center px-6 py-3 rounded-[18px] shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffba00] ${
              status === 'loading'
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#ffba00] hover:bg-[#e6a700]'
            }`}
          >
            <span className="font-bold text-[18px] leading-[24px] text-[#020205] text-center whitespace-nowrap">
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
