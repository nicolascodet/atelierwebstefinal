// This is a small change to trigger a new Vercel deployment
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const [scope, animate] = useAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimations();
    }, 300); // Reduced delay for faster start
    
    return () => clearTimeout(timer);
  }, []);

  const startAnimations = async () => {
    if (hasAnimated) return;

    // Make everything visible at initial states
    animate(".hero-heading", { opacity: 1 }, { duration: 0 });
    animate(".right-illustration", { opacity: 1 }, { duration: 0 });
    
    // Typing animation for "Introducing Atelier Frames"
    const targetText = "Introducing Atelier Frames.";
    const element = typingRef.current;
    if (element) {
      element.textContent = "";
      // Make cursor visible
      animate("#cursor", { opacity: 1 }, { duration: 0.1 });
      
      for (let i = 0; i <= targetText.length; i++) {
        element.textContent = targetText.substring(0, i);
        // Move cursor
        animate("#cursor", { left: `${i * 0.6}em` }, { duration: 0.05 });
        // Reduced timing for faster typing animation
        await new Promise(resolve => setTimeout(resolve, 40));
      }
      
      // Move cursor to next line after typing is done
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Fade in the tagline
    await animate("#tagline", { opacity: [0, 1], y: [10, 0] }, { duration: 0.4 });
    
    // Hide cursor when all text is done
    await animate("#cursor", { opacity: 0 }, { duration: 0.5 });
    
    // Make container visible first
    animate(".logo-container", { opacity: 1 }, { duration: 0.3 });
    
    // First, the initial spin animation of the logo
    await animate(".logo-spin-container", {
      rotate: [0, 720], // Two full rotations
      scale: [0.6, 1],  // Grow from smaller to normal size
    }, {
      duration: 1.8,    // Duration of spin
      ease: "easeOut",  // Start fast, then slow down
    });
    
    // Then add the glow and detailed animations
    animate([
      [".logo-glow", { opacity: [0, 0.5] }, { duration: 0.8 }],
      [".connector-line", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 1 }],
    ]);
    
    // Fade in description and cards
    await animate(".hero-description", { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 });
    
    // Fade in the cards
    animate([
      ["#card-1", { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 }],
      ["#card-2", { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: 0.2 }],
    ]);
    
    // Fade in the video link
    animate(".video-link", { opacity: [0, 1] }, { duration: 0.3 });
    
    setHasAnimated(true);
  };

  return (
    <div ref={scope} className="relative overflow-hidden bg-[rgb(var(--background-rgb))] py-10 md:py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--secondary-accent),0.05)] to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-screen-xl mx-auto">
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
                    Your walls, reimagined by artificial intelligence
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
                      <Link href="#ai-art-demo" className="btn btn-secondary mt-4 inline-block">
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
              </div>
            </div>

            {/* Right side - EXACT Logo Recreation with breathing effect */}
            <div className="right-illustration flex items-center justify-center opacity-0">
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
                          delay: 1.8 // Start after spin completes
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
                          delay: 2.0 // Start after spin with stagger
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
                          delay: 2.2 // Start after spin with stagger
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
                          delay: 1.8 // Start after spin completes
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
                          delay: 1.9 // Start after spin with stagger
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
                          delay: 2.0 // Start after spin with stagger
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
                          delay: 1.8 // Start breathing after spin
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
                          delay: 2.0 // Start breathing after spin
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
                          delay: 2.2 // Start breathing after spin
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
                        duration: 1.8,
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
