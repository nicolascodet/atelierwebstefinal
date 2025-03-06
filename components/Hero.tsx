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
  
  // Parallax effects for different elements - reduced mobile effect
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  // Futuristic features with tech icons
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
    {
      id: 'integration',
      label: 'Seamless Integration',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11L6 7M6 7L10 11M6 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 17L18 13M18 13L22 17M18 13V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 5.5L21 8.5L18 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 14.5C9 14.5 10.8333 16.5 12 16.5C13.1667 16.5 15 14.5 15 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  // Recognition section
  const recognition = [
    { name: "Currently in development phase", icon: "🚀" },
    { name: "Backed by real art enthusiasts", icon: "🎨" },
    { name: "Built by a small team of artists & engineers", icon: "👩‍💻" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-white">
      {/* Gradient background for better text visibility */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-50/30"></div>
        
        {/* Tech grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        
        {/* Animated particles and glow effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Glowing orbs */}
          <div className="absolute top-[5%] right-[10%] w-[20%] h-[20%] rounded-full bg-blue-500/10 filter blur-[120px] animate-pulse-slow"></div>
          <div className="absolute top-[40%] left-[5%] w-[15%] h-[15%] rounded-full bg-purple-500/15 filter blur-[100px] animate-float"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[25%] h-[25%] rounded-full bg-cyan-500/10 filter blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30"></div>
        <div className="absolute top-52 right-20 w-20 h-20 rounded-full border border-blue-200 opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 rounded-full border border-purple-200 opacity-20"></div>
        
        {/* Circuit patterns */}
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-[url('/images/circuit.svg')] bg-no-repeat bg-contain opacity-[0.07]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-16 lg:pt-24 pb-8 lg:pb-16 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* Left side - Content */}
            <div className="lg:col-span-5 lg:order-1 order-2">
              <motion.div 
                style={{ y: textY }}
                className="space-y-6"
              >
                {/* Futuristic header with animated elements */}
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={isLoaded ? { opacity: 1, width: "100%" } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 mb-4"
                  />
                  
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
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
                  >
                    Art that evolves 
                    <span className="block mt-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">with you</span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="mt-4 text-lg text-gray-700 max-w-xl"
                  >
                    The Canvas by Atelier Frames combines elegant design with Museum Grade display technology and custom art generation to transform your space.
                  </motion.p>

                  {/* Feature pills */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6"
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

                  {/* CTA buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="mt-6 flex flex-col sm:flex-row gap-4"
                  >
                    <a 
                      href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:opacity-90 transition-opacity"></div>
                      <div className="relative flex items-center justify-center px-5 py-3 text-white font-medium">
                        <span className="mr-2">Back on Kickstarter</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                    
                    <a 
                      href="#demo"
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <div className="absolute inset-0 border border-gray-300 group-hover:border-blue-500/50 transition-colors rounded-lg"></div>
                      <div className="relative flex items-center justify-center px-5 py-3 text-gray-700 group-hover:text-blue-600 font-medium transition-colors">
                        <span>Try Demo</span>
                      </div>
                    </a>
                  </motion.div>

                  {/* Recognition section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-8"
                  >
                    <div className="space-y-3">
                      {recognition.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + (i * 0.1) }}
                          className="flex items-center gap-2"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm text-gray-600">{item.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Video */}
            <div className="lg:col-span-7 lg:order-2 order-1">
              <motion.div
                style={{ y: videoY }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Decorative frame around video */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 rounded-xl sm:rounded-2xl blur-sm opacity-50"></div>
                
                {/* Video frame */}
                <div className="relative rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 bg-white shadow-xl">
                  <div className="aspect-video relative">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/m6GNAmyvLVc" 
                      title="The Canvas by Atelier Frames" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-l border-blue-500"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-r border-purple-500"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-l border-cyan-400"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-r border-blue-500"></div>
                </div>
                
                {/* Video controls and status indicators */}
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 gap-2 sm:gap-0">
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 py-1 sm:py-1.5 px-2 sm:px-3 rounded-full flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">Watch Demo</span>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 py-1 sm:py-1.5 px-2 sm:px-3 rounded-full flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-gray-700">Early Bird Available</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Testimonial section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4"
          >
            <div className="flex items-center justify-center space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-base sm:text-lg text-gray-600 italic">"The prototype I saw was impressive. I love the concept of displaying digital art that can change based on my preferences."</p>
            <div className="mt-3 sm:mt-4">
              <span className="font-medium text-gray-900">Michael T.</span>
              <span className="text-gray-500 text-sm ml-2">Beta Tester</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-gray-400 hover:text-blue-500 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
