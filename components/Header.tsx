'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Navigation items
const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Gallery', href: '#integration' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

// Animation variants for nav links
const navLinkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + custom * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

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
            ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2 sm:py-2.5' 
            : 'bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="z-10 group">
              <div className="flex items-center cursor-pointer">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-lg mr-2.5 border border-gray-200 bg-white group-hover:border-blue-200 transition-colors">
                  <Image 
                    src="/images/logo.jpg" 
                    alt="Atelier Frames Logo" 
                    fill
                    className="object-cover"
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  Atelier Frames
                </span>
              </div>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center">
              <nav className="flex items-center mr-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={navLinkVariants}
                  >
                    <Link 
                      href={item.href}
                      className="px-4 py-2 text-gray-600 hover:text-blue-600 relative font-medium transition-colors group"
                    >
                      {item.name}
                      {/* Animated underline */}
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 -translate-x-1/2 bg-blue-500 group-hover:w-1/2 transition-all duration-300"></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <a 
                  href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg inline-block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:opacity-90 transition-opacity"></div>
                  <div className="relative flex items-center justify-center px-5 py-2 text-white font-medium">
                    <span className="mr-2">Back on Kickstarter</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden z-10">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-blue-600 transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-5 h-5">
                  <span 
                    className={`absolute top-1/2 left-0 block w-5 h-0.5 bg-current transform ${
                      mobileMenuOpen 
                        ? 'rotate-45' 
                        : '-translate-y-1'
                    } transition-transform duration-200`}
                  />
                  <span 
                    className={`absolute top-1/2 left-0 block w-5 h-0.5 bg-current ${
                      mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    } transition-opacity duration-200`}
                  />
                  <span 
                    className={`absolute top-1/2 left-0 block w-5 h-0.5 bg-current transform ${
                      mobileMenuOpen 
                        ? '-rotate-45' 
                        : 'translate-y-1'
                    } transition-transform duration-200`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-40 w-full max-w-xs h-full bg-white border-l border-gray-200 shadow-xl overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="relative w-8 h-8 overflow-hidden rounded-lg mr-2 bg-white border border-gray-200">
                    <Image 
                      src="/images/logo.jpg" 
                      alt="Atelier Frames Logo" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-lg font-semibold text-gray-800">Atelier Frames</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="py-4 px-4">
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center py-3 px-4 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <motion.a 
                    href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-lg relative overflow-hidden group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <span className="relative text-white font-medium flex items-center">
                      Back on Kickstarter
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </motion.a>
                  <motion.p 
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                      Early bird special: Save 40%
                    </span>
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
