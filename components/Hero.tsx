'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animation triggers
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  // Simplified parallax effects for better mobile performance
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  // Simplified features with tech icons
  const features = [
    {
      id: 'ai-generation',
      label: 'AI-Generated Art',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14C10.2091 14 12 12.2091 12 10C12 7.79086 10.2091 6 8 6C5.79086 6 4 7.79086 4 10C4 12.2091 5.79086 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 12L17 15L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'display',
      label: 'Museum Grade Display',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 9L20 15C20 17.2091 18.2091 19 16 19L8 19C5.79086 19 4 17.2091 4 15L4 9C4 6.79086 5.79086 5 8 5L16 5C18.2091 5 20 6.79086 20 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 22L16 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-white">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-50/30"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-12 lg:pt-20 pb-6 lg:pb-12 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Content */}
            <div className="order-2 lg:order-1">
              <motion.div 
                style={{ y: textY }}
                className="space-y-5"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-center gap-2 mb-2"
                >
                  <div className="inline-flex items-center rounded-full bg-blue-100 border border-blue-200 px-3 py-1">
                    <span className="text-xs font-medium text-blue-700 uppercase tracking-wider">AI Art Frame</span>
                  </div>
                </motion.div>

                {/* Main heading with animated text */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                >
                  Art that evolves 
                  <span className="block mt-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">with you</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="mt-3 text-base md:text-lg text-gray-700"
                >
                  The Canvas by Atelier Frames combines elegant design with Museum Grade display technology and custom AI art generation to transform your space.
                </motion.p>

                {/* Feature pills */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4"
                >
                  <div className="flex flex-wrap gap-3">
                    {features.map((feature, i) => (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                        className="bg-white/80 backdrop-blur-sm border border-gray-200 py-1.5 px-3 rounded-full flex items-center gap-2"
                      >
                        <span className="text-blue-600">{feature.icon}</span>
                        <span className="text-xs font-medium text-gray-700">{feature.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Kickstarter CTA button - prominent placement and design */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  className="mt-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all group-hover:scale-105 duration-300"></div>
                        <div className="relative flex items-center justify-center px-6 py-3.5 text-white font-medium">
                          <span className="mr-2">Back our Kickstarter</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </a>
                    
                    <a 
                      href="#ai-art-demo"
                      className="w-full sm:w-auto"
                    >
                      <div className="relative overflow-hidden rounded-lg border border-gray-300 group">
                        <div className="relative flex items-center justify-center px-6 py-3.5 text-gray-700 group-hover:text-blue-600 font-medium transition-colors">
                          <span>Try the Demo</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </motion.div>

                {/* Project status */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 flex items-center text-sm text-gray-600"
                >
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Kickstarter campaign live now!</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Right side - Video (simplified for better mobile viewing) */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Video frame with simplified styling */}
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white shadow-lg">
                  <div className="aspect-video relative">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/m6GNAmyvLVc" 
                      title="The Canvas by Atelier Frames" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
