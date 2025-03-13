'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Touch handlers for swipeable carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && activeFeature < features.length - 1) {
      setActiveFeature(activeFeature + 1);
    }
    
    if (isRightSwipe && activeFeature > 0) {
      setActiveFeature(activeFeature - 1);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // Core features with simpler descriptions and icons
  const features = [
    {
      id: 'ai-art',
      title: 'AI Art Generation',
      description: 'Create custom artwork that matches your style and space with our advanced AI technology.',
      icon: (
        <svg className="w-6 h-6 text-[#5D7A61]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      mobileIcon: (
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: 'museum-display',
      title: 'Museum Grade Display',
      description: 'Experience exceptional color accuracy and clarity with our premium display technology.',
      icon: (
        <svg className="w-6 h-6 text-[#5D7A61]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      mobileIcon: (
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'elegant-design',
      title: 'Elegant Design',
      description: 'Crafted from premium materials with a minimalist aesthetic that complements any interior.',
      icon: (
        <svg className="w-6 h-6 text-[#5D7A61]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      mobileIcon: (
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
    {
      id: 'easy-control',
      title: 'Simple Control',
      description: 'Change your art whenever you want through our intuitive mobile app.',
      icon: (
        <svg className="w-6 h-6 text-[#5D7A61]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      mobileIcon: (
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  // Mobile version indicators
  const MobileIndicators = () => (
    <div className="flex justify-center space-x-2 mt-4">
      {features.map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveFeature(index)}
          className={`w-2 h-2 rounded-full transition-colors ${
            index === activeFeature ? 'bg-[#5D7A61]' : 'bg-gray-300'
          }`}
          aria-label={`Go to feature ${index + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center mb-6 md:mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Redefining Digital Art Display
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600"
        >
          The Canvas combines cutting-edge technology with elegant design to bring personalized art to your home.
        </motion.p>
      </div>

      {/* Mobile layout - modern, swipeable card interface */}
      {isMobile && (
        <div className="mb-8">
          <div 
            ref={carouselRef}
            className="w-full overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeFeature * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div 
                  key={feature.id} 
                  className="w-full flex-shrink-0 px-2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-xl shadow-md"
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5D7A61] to-[#4D6A51] opacity-90"></div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white opacity-5 -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white opacity-5 -ml-16 -mb-16"></div>
                    
                    <div className="relative px-5 py-8 text-white">
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="p-4 mb-4 bg-white/10 rounded-full">
                          {feature.mobileIcon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                      </div>
                      <p className="text-white/90 text-center">{feature.description}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          <MobileIndicators />
          
          {/* Swipe instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center text-sm text-gray-500 mt-2"
          >
            Swipe to see more features
          </motion.div>
        </div>
      )}

      {/* Desktop layout - grid of feature cards */}
      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 rounded-full bg-[#5D7A61]/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Kickstarter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 md:mt-12 text-center"
      >
        <p className="text-gray-700 mb-4">Ready to transform your space with personalized AI art?</p>
        <a 
          href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#5D7A61] hover:bg-[#4D6A51] text-white font-medium transition-colors"
        >
          <span className="mr-2">Back our Kickstarter</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default Features;
