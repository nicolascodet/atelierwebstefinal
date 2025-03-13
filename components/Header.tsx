'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Simplified navigation items
const navItems = [
  { name: 'Try Demo', href: '#ai-art-demo' },
  { name: 'Features', href: '#features' },
  { name: 'Gallery', href: '#product-gallery' },
  { name: 'Newsletter', href: '#newsletter' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' 
            : 'bg-transparent py-3'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="z-10 group">
              <div className="flex items-center">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden rounded-lg mr-2 border border-gray-200 bg-white">
                  <Image 
                    src="/images/logo.jpg" 
                    alt="Atelier Frames Logo" 
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  Atelier Frames
                </span>
              </div>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-2">
              <nav className="flex items-center mr-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#5D7A61] transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              
              {/* Kickstarter CTA */}
              <a
                href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#5D7A61] hover:bg-[#4D6A51] rounded-lg shadow-sm transition-colors"
              >
                Back our Kickstarter
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <a
                href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 mr-2 text-xs font-medium text-white bg-[#5D7A61] hover:bg-[#4D6A51] rounded-lg"
              >
                Kickstarter
              </a>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-700 hover:text-[#5D7A61] hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[57px] z-40 bg-white shadow-lg md:hidden"
          >
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  {item.name}
                </a>
              ))}
              
              <a
                href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-[#5D7A61] hover:bg-[#5D7A61]/10 rounded-md"
              >
                <span>Visit our Kickstarter</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
