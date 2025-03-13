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
    
    // Immediately make the illustration visible
    animate(".right-illustration", { opacity: 1, scale: [0.9, 1] }, { duration: 0.7 });
    
    // Animate in each element of the frame with more dramatic visibility
    animate([
      [".anthro-blob", { scale: [0.8, 1], opacity: [0, 0.9] }, { duration: 0.8 }],
      [".anthro-circle", { scale: [0.5, 1], opacity: [0, 0.9] }, { duration: 0.6, delay: 0.1 }],
      [".anthro-line", { pathLength: [0, 1], opacity: [0, 0.9] }, { duration: 0.7, delay: 0.2 }],
    ]);
    
    // Start the breathing animations immediately after showing
    animate([
      [".frame-rect", { scale: [0.95, 1], opacity: [0, 1] }, { duration: 0.7 }],
      [".control-dot", { scale: [0, 1], opacity: [0, 1] }, { duration: 0.5, delay: 0.3 }],
      [".art-representation", { scale: [0.9, 1], opacity: [0, 1] }, { duration: 0.8, delay: 0.2 }],
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
                    Transforming walls into living art with AI magic
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

            {/* Right side - Enhanced Anthropic-style Animation with higher visibility */}
            <div className="right-illustration block opacity-0 relative">
              <div className="relative flex items-center justify-center h-[400px] w-full">
                {/* 3D Frame representation - more visible and modern */}
                <svg 
                  viewBox="0 0 500 500" 
                  className="w-full h-full max-w-md mx-auto" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Gradient background for the SVG to make it more visible */}
                  <defs>
                    <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(var(--primary-accent), 0.1)" />
                      <stop offset="100%" stopColor="rgba(var(--secondary-accent), 0.1)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background Blob - higher opacity */}
                  <motion.rect 
                    x="120" y="80" 
                    width="260" height="340" 
                    rx="130" 
                    fill="url(#frameGradient)"
                    className="anthro-blob"
                    stroke="rgba(var(--primary-accent), 0.3)"
                    strokeWidth="1"
                    opacity="0"
                    animate={{
                      width: [260, 270, 260],
                      height: [340, 350, 340],
                      x: [120, 115, 120],
                      y: [80, 75, 80],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 6,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Main frame with breathing animation */}
                  <motion.rect 
                    x="150" y="120" 
                    width="200" height="260" 
                    rx="10" 
                    className="frame-rect"
                    fill="none"
                    stroke="rgba(var(--primary-accent), 0.7)"
                    strokeWidth="3"
                    opacity="0"
                    animate={{
                      width: [200, 204, 200],
                      height: [260, 264, 260],
                      x: [150, 148, 150],
                      y: [120, 118, 120],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Digital screen representation */}
                  <motion.rect 
                    x="160" y="130" 
                    width="180" height="240" 
                    rx="5" 
                    className="anthro-blob"
                    fill="rgba(var(--secondary-accent), 0.15)"
                    stroke="rgba(var(--secondary-accent), 0.3)"
                    strokeWidth="1"
                    opacity="0"
                    animate={{
                      opacity: [0.15, 0.2, 0.15],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Art representation - more visibility */}
                  <motion.path 
                    d="M200,200 C230,170 280,170 300,200 S330,260 250,260 S170,230 200,200 Z" 
                    className="art-representation"
                    fill="rgba(var(--tertiary-accent), 0.3)"
                    stroke="rgba(var(--tertiary-accent), 0.5)"
                    strokeWidth="1.5"
                    opacity="0"
                    animate={{
                      d: [
                        "M200,200 C230,170 280,170 300,200 S330,260 250,260 S170,230 200,200 Z",
                        "M195,195 C225,165 285,165 305,195 S335,265 250,265 S165,225 195,195 Z",
                        "M200,200 C230,170 280,170 300,200 S330,260 250,260 S170,230 200,200 Z"
                      ],
                      opacity: [0.3, 0.4, 0.3],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 7,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Frame control circles - increased size */}
                  <motion.circle 
                    cx="250" cy="390" r="8" 
                    className="control-dot"
                    fill="rgba(var(--primary-accent), 0.7)"
                    opacity="0"
                    animate={{
                      r: [8, 9, 8],
                      opacity: [0.7, 0.9, 0.7],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="220" cy="390" r="6" 
                    className="control-dot"
                    fill="rgba(var(--secondary-accent), 0.7)"
                    opacity="0"
                    animate={{
                      r: [6, 7, 6],
                      opacity: [0.7, 0.9, 0.7],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2.5,
                        ease: "easeInOut",
                        delay: 0.3
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="280" cy="390" r="6" 
                    className="control-dot"
                    fill="rgba(var(--tertiary-accent), 0.7)"
                    opacity="0"
                    animate={{
                      r: [6, 7, 6],
                      opacity: [0.7, 0.9, 0.7],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3,
                        ease: "easeInOut",
                        delay: 0.6
                      }
                    }}
                  />
                  
                  {/* Design elements */}
                  <motion.line 
                    x1="160" y1="200" x2="340" y2="200" 
                    className="anthro-line"
                    stroke="rgba(var(--primary-accent), 0.4)"
                    strokeWidth="1.5"
                    opacity="0"
                    animate={{
                      y1: [200, 202, 200],
                      y2: [200, 202, 200],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 5,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  <motion.line 
                    x1="160" y1="250" x2="340" y2="250" 
                    className="anthro-line"
                    stroke="rgba(var(--secondary-accent), 0.4)"
                    strokeWidth="1.5"
                    opacity="0"
                    animate={{
                      y1: [250, 248, 250],
                      y2: [250, 248, 250],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4.5,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Electric pulses */}
                  <motion.path 
                    d="M140,330 L160,330 L170,310 L180,350 L190,330 L210,330" 
                    className="anthro-line"
                    stroke="rgba(var(--primary-accent), 0.5)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0"
                    animate={{
                      pathOffset: [0, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear"
                      }
                    }}
                  />
                  
                  <motion.path 
                    d="M290,330 L310,330 L320,310 L330,350 L340,330 L360,330" 
                    className="anthro-line"
                    stroke="rgba(var(--secondary-accent), 0.5)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0"
                    animate={{
                      pathOffset: [0, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                        delay: 0.5
                      }
                    }}
                  />
                  
                  {/* Corner dots */}
                  <motion.circle 
                    cx="150" cy="120" r="4" 
                    className="anthro-circle"
                    fill="rgba(var(--primary-accent), 0.8)"
                    opacity="0"
                    animate={{
                      r: [4, 5, 4],
                      opacity: [0.8, 1, 0.8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="350" cy="120" r="4" 
                    className="anthro-circle"
                    fill="rgba(var(--secondary-accent), 0.8)"
                    opacity="0"
                    animate={{
                      r: [4, 5, 4],
                      opacity: [0.8, 1, 0.8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: 0.3
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="150" cy="380" r="4" 
                    className="anthro-circle"
                    fill="rgba(var(--tertiary-accent), 0.8)"
                    opacity="0"
                    animate={{
                      r: [4, 5, 4],
                      opacity: [0.8, 1, 0.8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: 0.6
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="350" cy="380" r="4" 
                    className="anthro-circle"
                    fill="rgba(var(--primary-accent), 0.8)"
                    opacity="0"
                    animate={{
                      r: [4, 5, 4],
                      opacity: [0.8, 1, 0.8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: 0.9
                      }
                    }}
                  />
                </svg>
                
                {/* Add subtle floating particles behind the frame */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-[rgba(var(--primary-accent),0.2)]"
                      style={{
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, Math.random() * 10 - 5, 0],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
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
