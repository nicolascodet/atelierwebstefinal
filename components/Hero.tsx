// This is a small change to trigger a new Vercel deployment
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  skipMobileAnimation?: boolean;
}

const Hero = ({ skipMobileAnimation = false }: HeroProps) => {
  const [scope, animate] = useAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };
    
    // Check on initial load
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Start animations almost immediately
    const timer = setTimeout(() => {
      startAnimations();
    }, 75); // Reduced from 150ms to 75ms
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Add custom CSS for button styling to match logo green
  useEffect(() => {
    // Add custom styles to override button colors site-wide
    const style = document.createElement('style');
    style.innerHTML = `
      .btn-primary {
        background-color: #5D7A61 !important;
        border-color: #5D7A61 !important;
      }
      .btn-primary:hover {
        background-color: #4D6A51 !important;
        border-color: #4D6A51 !important;
      }
      .video-btn {
        background-color: #5D7A61;
        border: none;
        color: white;
        transition: background-color 0.3s;
      }
      .video-btn:hover {
        background-color: #4D6A51;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const startAnimations = async () => {
    if (hasAnimated) return;

    if (isMobile && !skipMobileAnimation) {
      // MOBILE ANIMATION SEQUENCE - GREATLY ACCELERATED
      
      // First, show only the logo
      animate(".mobile-logo-container", { opacity: 1 }, { duration: 0.2 });
      
      // Do the spin animation - faster
      await animate(".logo-spin-container", {
        rotate: [0, 720],
        scale: [0.6, 0.9, 0.7],
      }, {
        duration: 1.0, // Reduced from 2.0 to 1.0
        ease: "easeOut",
      });
      
      // Fade out the logo faster
      await animate(".mobile-logo-container", { 
        opacity: 0,
        scale: 0.5
      }, { 
        duration: 0.3, // Reduced from 0.5 to 0.3
        ease: "easeOut" 
      });
      
      // Show content immediately
      animate([
        [".hero-heading", { opacity: 1 }, { duration: 0.3 }],
        [".hero-description", { opacity: 1, y: 0 }, { duration: 0.2 }],
        ["#card-1", { opacity: 1, y: 0 }, { duration: 0.2 }],
        ["#card-2", { opacity: 1, y: 0 }, { duration: 0.2 }],
        [".mobile-video-container", { opacity: 1 }, { duration: 0.2 }],
        [".video-link", { opacity: 1 }, { duration: 0.2 }]
      ]);
      
      // Type out text faster
      const targetText = "Introducing Atelier Frames.";
      const element = typingRef.current;
      if (element) {
        element.textContent = "";
        animate("#cursor", { opacity: 1 }, { duration: 0.1 });
        
        for (let i = 0; i <= targetText.length; i++) {
          element.textContent = targetText.substring(0, i);
          animate("#cursor", { left: `${i * 0.6}em` }, { duration: 0.02 });
          // Slowed down typing from 12ms to 30ms per character (even slower)
          await new Promise(resolve => setTimeout(resolve, 30));
        }
      }
      
      // Show tagline right after typing
      animate("#tagline", { opacity: 1, y: 0 }, { duration: 0.2 });
      
      // Animate underline faster
      animate(".ai-underline", { 
        pathLength: [0, 1],
        opacity: [0, 1]
      }, { 
        duration: 0.2, // Reduced from 0.4 to 0.2
        ease: "easeInOut"
      });
      
      // Hide cursor
      animate("#cursor", { opacity: 0 }, { duration: 0.2 });
      
    } else {
      // Skip mobile animation if we've already done the entry animation
      if (isMobile && skipMobileAnimation) {
        // Show everything immediately with no animation
        animate([
          [".hero-heading", { opacity: 1 }, { duration: 0 }],
          ["#tagline", { opacity: 1 }, { duration: 0 }],
          [".hero-description", { opacity: 1 }, { duration: 0 }],
          ["#card-1", { opacity: 1 }, { duration: 0 }],
          ["#card-2", { opacity: 1 }, { duration: 0 }],
          [".video-link", { opacity: 1 }, { duration: 0 }],
          [".mobile-video-container", { opacity: 1 }, { duration: 0 }],
          [".desktop-video-container", { opacity: 1 }, { duration: 0 }],
          [".right-illustration", { opacity: 1 }, { duration: 0 }],
          [".logo-container", { opacity: 1 }, { duration: 0 }],
          [".ai-underline", { pathLength: 1, opacity: 1 }, { duration: 0 }]
        ]);
        
        // Add text content without animation
        const element = typingRef.current;
        if (element) {
          element.textContent = "Introducing Atelier Frames.";
        }
      } else {
        // DESKTOP ANIMATION SEQUENCE - ALSO ACCELERATED
        // Load critical elements immediately
        animate([
          [".hero-heading", { opacity: 1 }, { duration: 0 }],
          [".right-illustration", { opacity: 1 }, { duration: 0 }],
          [".hero-description", { opacity: 1, y: 0 }, { duration: 0.2 }],
          [".desktop-video-container", { opacity: 1 }, { duration: 0.3 }]
        ]);
        
        // Typing animation for "Introducing Atelier Frames" - slower
        const targetText = "Introducing Atelier Frames.";
        const element = typingRef.current;
        if (element) {
          element.textContent = "";
          animate("#cursor", { opacity: 1 }, { duration: 0.1 });
          
          for (let i = 0; i <= targetText.length; i++) {
            element.textContent = targetText.substring(0, i);
            animate("#cursor", { left: `${i * 0.6}em` }, { duration: 0.02 });
            // Slowed down typing from 24ms to 50ms per character (even slower)
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          
          await new Promise(resolve => setTimeout(resolve, 25)); // Reduced from 50ms to 25ms
        }
        
        // Fade in the tagline faster
        await animate("#tagline", { opacity: [0, 1], y: [10, 0] }, { duration: 0.3 }); // Reduced from 0.4 to 0.3
        
        // Animate the underline faster
        animate(".ai-underline", { 
          pathLength: [0, 1],
          opacity: [0, 1]
        }, { 
          duration: 0.4, // Reduced from 0.8 to 0.4
          ease: "easeInOut"
        });
        
        // Hide cursor
        await animate("#cursor", { opacity: 0 }, { duration: 0.3 }); // Reduced from 0.5 to 0.3
        
        // Make container visible
        animate(".logo-container", { opacity: 1 }, { duration: 0.2 }); // Reduced from 0.3 to 0.2
        
        // Spin animation - faster
        await animate(".logo-spin-container", {
          rotate: [0, 720], 
          scale: [0.6, 1],
        }, {
          duration: 1.0, // Reduced from 1.8 to 1.0
          ease: "easeOut",
        });
        
        // Add glow and detailed animations
        animate([
          [".logo-glow", { opacity: [0, 0.5] }, { duration: 0.4 }], // Reduced from 0.8 to 0.4
          [".connector-line", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.5 }], // Reduced from 1.0 to 0.5
        ]);
        
        // Fade in cards faster
        animate([
          ["#card-1", { opacity: [0, 1], y: [20, 0] }, { duration: 0.3 }], // Reduced from 0.5 to 0.3
          ["#card-2", { opacity: [0, 1], y: [20, 0] }, { duration: 0.3, delay: 0.1 }], // Reduced delay from 0.2 to 0.1
        ]);
        
        // Fade in the video link
        animate(".video-link", { opacity: [0, 1] }, { duration: 0.2 }); // Reduced from 0.3 to 0.2
      }
    }
    
    setHasAnimated(true);
  };

  // Completely revised video implementation for more reliable playback
  const VideoComponent = ({ isMobile = false }) => {
    const containerClass = isMobile 
      ? "mobile-video-container w-full opacity-0" 
      : "desktop-video-container w-full opacity-0 rounded-lg overflow-hidden";
      
    const handleOpenVideo = () => {
      // Open the video in a new tab if having issues with embedding
      window.open('https://www.youtube.com/watch?v=m6GNAmyvLVc', '_blank');
    };
    
    return (
      <div className={containerClass}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Static YouTube embed - more reliable than dynamic loading */}
          <div className="relative pb-[56.25%] overflow-hidden">
            <iframe 
              src="https://www.youtube.com/embed/m6GNAmyvLVc?rel=0&showinfo=0" 
              title="The Canvas by Atelier Frames"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Fallback if iframe doesn't load */}
          <div className="p-4 border-t border-gray-100">
            <h3 className="font-medium text-lg mb-1">Watch: The Canvas in Action</h3>
            <p className="text-sm text-gray-600 mb-3">See how our AI-powered frame transforms spaces and brings art to life</p>
            <button 
              onClick={handleOpenVideo}
              className="video-btn py-2 px-4 rounded flex items-center justify-center gap-2 w-full sm:w-auto font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
              Open in YouTube
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={scope} className="relative overflow-hidden bg-[rgb(var(--background-rgb))] py-10 md:py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--secondary-accent),0.05)] to-transparent" />
      
      {/* MOBILE-ONLY INITIAL LOGO - Hide if skipMobileAnimation is true */}
      {!skipMobileAnimation && (
        <div className="mobile-logo-container fixed inset-0 z-50 flex items-center justify-center opacity-0 lg:hidden">
          <div className="relative w-[280px] h-[280px]">
            {/* Cream background */}
            <div className="absolute inset-0 rounded-full bg-[#FFF8E1] opacity-40"></div>
            
            {/* Spin container for logo animation */}
            <div className="logo-spin-container w-full h-full flex items-center justify-center origin-center">
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="mobile-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="10" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* The three green circular nodes */}
                <motion.circle
                  cx="200" cy="120" r="30"
                  fill="#5D7A61"
                />
                
                <motion.circle
                  cx="120" cy="240" r="30"
                  fill="#5D7A61"
                />
                
                <motion.circle
                  cx="280" cy="240" r="30"
                  fill="#5D7A61"
                />
                
                {/* Connection lines */}
                <path
                  d="M200,120 L120,240 M200,120 L280,240 M120,240 L280,240"
                  stroke="#C4D0C5"  
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                
                {/* Dynamic trail effect during spin */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 1.0, // Reduced from 2.0 to 1.0 to match new spin duration
                    ease: "easeOut"
                  }}
                >
                  {/* Motion trails for spinning effect */}
                  <path 
                    d="M200,120 L120,240 L280,240 Z" 
                    stroke="#C4D0C5" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <circle cx="200" cy="120" r="15" fill="#5D7A61" opacity="0.3" />
                  <circle cx="120" cy="240" r="15" fill="#5D7A61" opacity="0.3" />
                  <circle cx="280" cy="240" r="15" fill="#5D7A61" opacity="0.3" />
                </motion.g>
              </svg>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          {/* DESKTOP LAYOUT - Back to original 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <div className="space-y-6">
                {/* Main heading with typing effect */}
                <h1 className="hero-heading text-4xl sm:text-5xl font-bold text-[rgb(var(--text-primary))] opacity-0">
                  <div className="relative">
                    <span className="text-[rgb(var(--primary-accent))]" ref={typingRef}></span>
                    <span id="cursor" className="absolute h-[1.2em] w-[2px] bg-black opacity-0"></span>
                  </div>
                  
                  <div id="tagline" className="mt-4 text-2xl sm:text-3xl font-medium text-[rgb(var(--text-secondary))] opacity-0">
                    Your walls, reimagined by <span className="relative">
                      artificial intelligence
                      <svg 
                        className="absolute left-0 -bottom-1 w-full" 
                        height="12" 
                        viewBox="0 0 200 12" 
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <motion.path
                          className="ai-underline"
                          d="M0,3 C50,10 150,0 200,5"
                          stroke="rgba(var(--tertiary-accent), 0.8)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                        />
                        <motion.path
                          className="ai-underline"
                          d="M0,8 C75,4 125,12 200,8"
                          stroke="rgba(var(--primary-accent), 0.5)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          style={{ pathOffset: 0.1 }}
                        />
                      </svg>
                    </span>
                  </div>
                </h1>

                <p className="hero-description text-lg text-[rgb(var(--text-secondary))] opacity-0">
                  The Canvas by Atelier Frames is the first digital picture frame with built-in AI, 
                  bringing your spaces to life with art that adapts to your style and environment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                  {/* First Card */}
                  <div id="card-1" className="anthro-card p-6 opacity-0">
                    <div className="space-y-4">
                      <div className="inline-flex items-center rounded-full bg-[rgba(var(--primary-accent),0.1)] border border-[rgba(var(--primary-accent),0.2)] px-3 py-1">
                        <span className="text-xs font-medium text-[rgb(var(--primary-accent))] uppercase tracking-wider">INNOVATION</span>
                      </div>
                      <h2 className="title-sm">AI-Powered Art</h2>
                      <p className="body">Experience intelligent art generation that evolves based on your preferences and environment.</p>
                      <Link href="#features" className="btn btn-primary mt-4 inline-block">
                        Learn more
                      </Link>
                    </div>
                  </div>

                  {/* Second Card */}
                  <div id="card-2" className="anthro-card p-6 opacity-0">
                    <div className="space-y-4">
                      <div className="inline-flex items-center rounded-full bg-[rgba(var(--secondary-accent),0.1)] border border-[rgba(var(--secondary-accent),0.2)] px-3 py-1">
                        <span className="text-xs font-medium text-[rgb(var(--secondary-accent))] uppercase tracking-wider">CRAFTSMANSHIP</span>
                      </div>
                      <h2 className="title-sm">Premium Design</h2>
                      <p className="body">Elegant handcrafted frames that blend traditional craftsmanship with cutting-edge technology.</p>
                      <Link href="#ai-art-demo" className="btn btn-primary mt-4 inline-block">
                        Try demo
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <a 
                    href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="video-link text-tertiary flex items-center hover:text-secondary transition-colors duration-300 opacity-0"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <span>Watch our video</span>
                  </a>
                </div>

                {/* Desktop video below content on left side */}
                <div className="hidden lg:block mt-8">
                  <VideoComponent isMobile={false} />
                </div>
              </div>
            </div>

            {/* Right side - Logo (back to original position) */}
            <div className="right-illustration hidden lg:flex items-center justify-center opacity-0">
              <div className="logo-container relative w-full max-w-[400px] h-[400px] opacity-0">
                {/* Cream background to match the logo's background */}
                <div className="absolute inset-0 rounded-full bg-[#FFF8E1] opacity-40"></div>
                
                {/* Spin container for initial animation */}
                <div className="logo-spin-container w-full h-full flex items-center justify-center origin-center">
                  {/* Exact logo SVG recreation with precise breathing animations */}
                  <svg 
                    viewBox="0 0 400 400" 
                    className="w-full h-full"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background soft glow effect */}
                    <defs>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    {/* The three glow halos behind each node */}
                    <motion.ellipse 
                      cx="200" cy="120" rx="35" ry="35" 
                      className="logo-glow"
                      fill="#E8F0E9" 
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{
                        rx: [35, 38, 35],
                        ry: [35, 38, 35],
                        opacity: [0.5, 0.6, 0.5],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3,
                          ease: "easeInOut",
                          delay: 1.0 // Adjusted for faster initial animation
                        }
                      }}
                    />
                    
                    <motion.ellipse 
                      cx="120" cy="240" rx="35" ry="35" 
                      className="logo-glow"
                      fill="#E8F0E9" 
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{
                        rx: [35, 38, 35],
                        ry: [35, 38, 35],
                        opacity: [0.5, 0.6, 0.5],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3.5,
                          ease: "easeInOut",
                          delay: 1.1 // Adjusted for faster initial animation
                        }
                      }}
                    />
                    
                    <motion.ellipse 
                      cx="280" cy="240" rx="35" ry="35" 
                      className="logo-glow"
                      fill="#E8F0E9" 
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{
                        rx: [35, 38, 35],
                        ry: [35, 38, 35],
                        opacity: [0.5, 0.6, 0.5],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3.2,
                          ease: "easeInOut",
                          delay: 1.2 // Adjusted for faster initial animation
                        }
                      }}
                    />
                    
                    {/* Connection lines - precisely matching the logo's light green-gray */}
                    <motion.path
                      d="M200,120 L120,240"
                      className="connector-line"
                      stroke="#C4D0C5"  
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        strokeWidth: [4, 4.5, 4],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 4,
                          ease: "easeInOut",
                          delay: 1.0 // Adjusted for faster initial animation
                        }
                      }}
                    />
                    
                    <motion.path
                      d="M200,120 L280,240"
                      className="connector-line"
                      stroke="#C4D0C5"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        strokeWidth: [4, 4.5, 4],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 4.3,
                          ease: "easeInOut",
                          delay: 1.1 // Adjusted for faster initial animation
                        }
                      }}
                    />
                    
                    <motion.path
                      d="M120,240 L280,240"
                      className="connector-line"
                      stroke="#C4D0C5"
                      strokeWidth="4" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        strokeWidth: [4, 4.5, 4],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 4.6,
                          ease: "easeInOut",
                          delay: 1.2 // Adjusted for faster initial animation
                        }
                      }}
                    />
                    
                    {/* The three green circular nodes - exact color match */}
                    <motion.circle
                      cx="200" cy="120" r="25"
                      className="node-circle"
                      fill="#5D7A61"
                      animate={{
                        r: [25, 27, 25],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3,
                          ease: "easeInOut",
                          delay: 1.0 // Adjusted for faster initial animation
                        }
                      }}
                    />
                    
                    <motion.circle
                      cx="120" cy="240" r="25"
                      className="node-circle"
                      fill="#5D7A61"
                      animate={{
                        r: [25, 27, 25],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3.3,
                          ease: "easeInOut",
                          delay: 1.1 // Adjusted for faster initial animation
                        }
                      }}
                    />
                    
                    <motion.circle
                      cx="280" cy="240" r="25"
                      className="node-circle"
                      fill="#5D7A61"
                      animate={{
                        r: [25, 27, 25],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3.6,
                          ease: "easeInOut",
                          delay: 1.2 // Adjusted for faster initial animation
                        }
                      }}
                    />
                    
                    {/* Dynamic trail effect during spin */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.7, 0],
                      }}
                      transition={{
                        duration: 1.0, // Reduced from 1.8 to 1.0
                        ease: "easeOut"
                      }}
                    >
                      {/* Motion trails for spinning effect */}
                      <path 
                        d="M200,120 L120,240 L280,240 Z" 
                        stroke="#C4D0C5" 
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        fill="none"
                      />
                      <circle cx="200" cy="120" r="15" fill="#5D7A61" opacity="0.3" />
                      <circle cx="120" cy="240" r="15" fill="#5D7A61" opacity="0.3" />
                      <circle cx="280" cy="240" r="15" fill="#5D7A61" opacity="0.3" />
                    </motion.g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Video Section - Prominent outside the grid */}
          <div className="mt-8 lg:hidden">
            <VideoComponent isMobile={true} />
          </div>
          
          {/* Mobile Kickstarter link below video */}
          <div className="flex items-center justify-center mt-4 lg:hidden">
            <a 
              href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block py-2 px-6 bg-[#5D7A61] hover:bg-[#4D6A51] text-white rounded-md font-medium transition-colors duration-300"
            >
              Back on Kickstarter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
