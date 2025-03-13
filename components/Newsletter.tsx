'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Submit email to Formspree
      const response = await fetch('https://formspree.io/f/mwpleoao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Set success state
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Newsletter submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated on <span className="text-[#5D7A61]">The Canvas</span>
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our newsletter to receive updates on our Kickstarter campaign, product development,
            and exclusive early-bird offers.
          </p>
          
          {isSuccess ? (
            <div className="bg-[#5D7A61]/10 text-[#5D7A61] p-4 rounded-lg mb-6 inline-block">
              Thank you for subscribing! We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6" action="https://formspree.io/f/mwpleoao" method="POST">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5D7A61] focus:border-transparent"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#5D7A61] hover:bg-[#4D6A51] text-white font-medium rounded-lg transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </form>
          )}
          
          <p className="text-sm text-gray-500">
            We respect your privacy and will never share your information.
          </p>
          
          <div className="mt-12 pt-10 border-t border-gray-200">
            <p className="text-gray-700 mb-4">Don't miss our limited-time Kickstarter offers!</p>
            <a
              href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#5D7A61] hover:bg-[#4D6A51] text-white font-medium transition-colors"
            >
              <span className="mr-2">View Kickstarter Campaign</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
