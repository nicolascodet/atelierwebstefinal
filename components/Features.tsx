'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Features data with modern icons
const features = [
  {
    id: 1,
    title: "AI-Generated Art",
    description: "Create unique artwork using AI technology to match your style preferences",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M8 14C10.2091 14 12 12.2091 12 10C12 7.79086 10.2091 6 8 6C5.79086 6 4 7.79086 4 10C4 12.2091 5.79086 14 8 14Z" />
        <path d="M14 12L17 15L20 12" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Multiple Styles",
    description: "Choose from a selection of artistic styles or create a custom look",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H14M20 7V13M20 7L7 20L4 17L17 4L20 7Z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Quick Generation",
    description: "Generate new artwork and display it on your frame with minimal wait time",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Software Updates",
    description: "Planned regular updates to add new features and improvements",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 16V17C3 18.6569 4.34315 20 6 20H18C19.6569 20 21 18.6569 21 17V16M16 8L12 4M12 4L8 8M12 4V16" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Mobile App Control",
    description: "Control your frame from anywhere with our companion mobile app",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Text Prompts",
    description: "Describe what you want to see and let our AI bring it to life",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 18.5C15.5 18.5 16.5 14 16.5 11.5C16.5 9 15.5 4.5 12 4.5C8.5 4.5 7.5 9 7.5 11.5C7.5 14 8.5 18.5 12 18.5Z" />
        <path d="M15.5 11.5H19.5M4.5 11.5H8.5M7 15L5 17M17 15L19 17M7 8L5 6M17 8L19 6" />
      </svg>
    ),
  },
];

// Art styles showcase - realistic selection
const artStyles = [
  { name: "Impressionism", color: "from-blue-400 to-blue-600" },
  { name: "Minimalism", color: "from-gray-600 to-gray-800" },
  { name: "Abstract", color: "from-purple-500 to-indigo-600" },
  { name: "Watercolor", color: "from-cyan-400 to-teal-600" },
  { name: "Digital", color: "from-emerald-400 to-green-600" },
  { name: "Photorealism", color: "from-orange-400 to-red-600" },
];

const Features = () => {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Auto-scroll functionality for mobile
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    let scrollPosition = 0;
    let scrollDirection = 1; // 1 for right, -1 for left
    let isPaused = false;
    
    const autoScroll = () => {
      if (!scrollContainer || isPaused) return;
      
      // Only auto-scroll on mobile/tablet
      if (window.innerWidth >= 768) return;
      
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Change direction when reaching the end
      if (scrollPosition >= maxScroll) {
        scrollDirection = -1;
      } else if (scrollPosition <= 0) {
        scrollDirection = 1;
      }
      
      // Calculate new position with smooth scrolling
      scrollPosition += 1 * scrollDirection;
      scrollContainer.scrollLeft = scrollPosition;
    };
    
    // Create smooth animation with requestAnimationFrame
    let animationId: number;
    const animate = () => {
      autoScroll();
      animationId = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animationId = requestAnimationFrame(animate);
    
    // Add pause on user interaction
    const handleMouseEnter = () => {
      isPaused = true;
    };
    
    const handleMouseLeave = () => {
      isPaused = false;
    };
    
    const handleTouchStart = () => {
      isPaused = true;
    };
    
    const handleTouchEnd = () => {
      // Resume after a short delay to allow user to finish their interaction
      setTimeout(() => {
        isPaused = false;
      }, 2000);
    };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  return (
    <div className="bg-white/80" id="features">
      {/* Header Section */}
      <div className="py-8 lg:py-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 filter blur-[100px]"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 filter blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              {/* Modern section header */}
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-600 mb-4"></div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 mb-3">
                  Limitless Creative <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">Possibilities</span>
                </h2>
              </div>
              <p className="text-base sm:text-lg text-gray-600 mx-auto max-w-2xl">
                The Canvas transforms your space with stunning AI-generated artwork that evolves with your taste and mood.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Cards Section - Horizontal Scrolling on Mobile */}
      <div className="pb-8 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div ref={scrollContainerRef} className="max-w-screen-xl mx-auto overflow-auto no-scrollbar">
            <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 md:grid-flow-row pb-4 md:pb-0" style={{ minWidth: "min-content" }}>
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.id * 0.05 }}
                  className="flex-none w-[85vw] sm:w-[300px] md:w-auto bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-100 transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Art Generation Demo - Modern Light Theme */}
      <div className="py-12 lg:py-24 bg-gradient-to-b from-blue-50 to-indigo-50/30 relative">
        {/* Decorative patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[url('/images/grid.svg')] bg-repeat opacity-[0.05]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-900">
                    Create Artwork <span className="text-blue-600">with AI</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600">
                    Describe what you want to see, and our AI technology generates artwork customized to your preferences. With different styles to choose from, you can personalize your space.
                  </p>
                  
                  {/* Modern style chips */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {artStyles.map((style, index) => (
                        <div
                          key={style.name}
                          className={`bg-gradient-to-r ${style.color} text-white text-xs px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm`}
                        >
                          {style.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Modern CTA */}
                  <div className="pt-3 sm:pt-4">
                    <a 
                      href="#demo" 
                      className="group relative overflow-hidden rounded-lg inline-block touch-manipulation"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:opacity-90 transition-opacity"></div>
                      <div className="relative flex items-center justify-center px-5 py-3 text-white font-medium">
                        <span className="mr-2">See How It Works</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </div>
              
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative"
                >
                  {/* Decorative glow around the image */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 rounded-xl sm:rounded-2xl blur-sm opacity-30"></div>
                  
                  <div className="relative rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-white">
                    <div className="aspect-[4/3] w-full relative">
                      <Image
                        src="/images/test.jpg"
                        alt="AI Art Generation Demo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications - Modern Data Display */}
      <div ref={ref} className="py-12 lg:py-24 relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute bottom-0 left-[20%] w-[30%] h-[50%] rounded-full bg-blue-500/5 filter blur-[100px]"></div>
          <div className="absolute top-0 right-[10%] w-[25%] h-[40%] rounded-full bg-purple-500/5 filter blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 lg:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-900 mb-4 sm:mb-6">
                Cutting-Edge <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Specifications</span>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-blue-600 mb-2 sm:mb-3">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1.5 sm:mb-2">Museum Grade Display</h3>
                <p className="text-sm sm:text-base text-gray-600">High resolution screen with true-to-life colors, anti glare, and excellent detail</p>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-xs sm:text-sm text-gray-500">Resolution:</span>
                  <span className="ml-2 text-blue-600 font-mono text-xs sm:text-sm">1920 x 1080</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-blue-600 mb-2 sm:mb-3">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1.5 sm:mb-2">Fast Processing</h3>
                <p className="text-sm sm:text-base text-gray-600">Responsive processing for image generation and smooth transitions</p>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-xs sm:text-sm text-gray-500">Generation time:</span>
                  <span className="ml-2 text-blue-600 font-mono text-xs sm:text-sm">within seconds</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-blue-600 mb-2 sm:mb-3">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1.5 sm:mb-2">Connectivity</h3>
                <p className="text-sm sm:text-base text-gray-600">Seamless connections via Wi-Fi, Bluetooth, and cloud integration</p>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-xs sm:text-sm text-gray-500">Wireless:</span>
                  <span className="ml-2 text-blue-600 font-mono text-xs sm:text-sm">Wi-Fi 6 + BT 5.2</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-blue-600 mb-2 sm:mb-3">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1.5 sm:mb-2">Powerful AI</h3>
                <p className="text-sm sm:text-base text-gray-600">Modern AI technology capable of generating unique artwork</p>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-xs sm:text-sm text-gray-500">Based on:</span>
                  <span className="ml-2 text-blue-600 font-mono text-xs sm:text-sm">FLUX</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
