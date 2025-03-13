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
    }, 500); // Small delay to ensure everything is loaded
    
    return () => clearTimeout(timer);
  }, []);

  const startAnimations = async () => {
    if (hasAnimated) return;

    // First, make sure everything is visible but at initial states
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
        await new Promise(resolve => setTimeout(resolve, 80));
      }
      
      // Move cursor to next line after typing is done
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Fade in the tagline
    await animate("#tagline", { opacity: [0, 1], y: [10, 0] }, { duration: 0.6 });
    
    // Hide cursor when all text is done
    await animate("#cursor", { opacity: 0 }, { duration: 0.5 });
    
    // Animate in the minimalist frame on the right
    animate([
      [".anthro-blob", { scale: [0.95, 1], opacity: [0, 1] }, { duration: 1.5 }],
      [".anthro-circle", { scale: [0, 1], opacity: [0, 1] }, { duration: 0.8, delay: 0.2 }],
      [".anthro-line", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 1.0, delay: 0.3 }],
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
                    Using generative AI to allow you to be the artist
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

            {/* Right side - Minimalist Anthropic-style Animation */}
            <div className="right-illustration block opacity-0">
              <div className="relative flex items-center justify-center h-[400px]">
                {/* Anthropic-style minimalist illustration */}
                <svg 
                  viewBox="0 0 500 500" 
                  className="w-full h-auto max-w-md" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Base shapes */}
                  <motion.rect 
                    x="150" y="100" 
                    width="200" height="300" 
                    rx="100" 
                    className="anthro-blob fill-[rgba(var(--primary-accent),0.08)]"
                    opacity="0"
                    animate={{
                      width: [200, 210, 200],
                      height: [300, 310, 300],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="250" cy="175" r="50" 
                    className="anthro-circle fill-[rgba(var(--secondary-accent),0.1)]" 
                    opacity="0"
                    animate={{
                      r: [50, 53, 50],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3.5,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="250" cy="325" r="40" 
                    className="anthro-circle fill-[rgba(var(--primary-accent),0.1)]" 
                    opacity="0"
                    animate={{
                      r: [40, 43, 40],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4.5,
                        ease: "easeInOut",
                        delay: 0.5
                      }
                    }}
                  />
                  
                  {/* Frame representation */}
                  <motion.rect 
                    x="175" y="150" 
                    width="150" height="200" 
                    rx="8" 
                    className="anthro-blob fill-none stroke-[rgb(var(--primary-accent))]"
                    strokeWidth="2"
                    opacity="0"
                    animate={{
                      x: [175, 177, 175],
                      y: [150, 148, 150],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 5,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Subtle lines */}
                  <motion.line 
                    x1="175" y1="175" x2="325" y2="175" 
                    className="anthro-line stroke-[rgb(var(--secondary-accent))]" 
                    strokeWidth="1.5" 
                    opacity="0"
                    animate={{
                      y1: [175, 177, 175],
                      y2: [175, 177, 175],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  <motion.line 
                    x1="175" y1="220" x2="325" y2="220" 
                    className="anthro-line stroke-[rgb(var(--primary-accent))]" 
                    strokeWidth="1.5" 
                    opacity="0"
                    animate={{
                      y1: [220, 222, 220],
                      y2: [220, 222, 220],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 5,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  <motion.line 
                    x1="175" y1="265" x2="325" y2="265" 
                    className="anthro-line stroke-[rgb(var(--tertiary-accent))]" 
                    strokeWidth="1.5" 
                    opacity="0"
                    animate={{
                      y1: [265, 263, 265],
                      y2: [265, 263, 265],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Aesthetics dots */}
                  <motion.circle 
                    cx="350" cy="150" r="5" 
                    className="anthro-circle fill-[rgb(var(--primary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [5, 6, 5],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="350" cy="200" r="5" 
                    className="anthro-circle fill-[rgb(var(--secondary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [5, 6, 5],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        ease: "easeInOut",
                        delay: 0.5
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="350" cy="250" r="5" 
                    className="anthro-circle fill-[rgb(var(--tertiary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [5, 6, 5],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        ease: "easeInOut",
                        delay: 1
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="150" cy="150" r="5" 
                    className="anthro-circle fill-[rgb(var(--secondary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [5, 6, 5],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        ease: "easeInOut",
                        delay: 0.2
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="150" cy="200" r="5" 
                    className="anthro-circle fill-[rgb(var(--tertiary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [5, 6, 5],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        ease: "easeInOut",
                        delay: 0.7
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="150" cy="250" r="5" 
                    className="anthro-circle fill-[rgb(var(--primary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [5, 6, 5],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        ease: "easeInOut",
                        delay: 1.2
                      }
                    }}
                  />
                  
                  {/* Abstract art representation */}
                  <motion.path 
                    d="M220,200 C240,180 260,180 280,200 S300,240 250,240 S200,220 220,200 Z" 
                    className="anthro-blob fill-[rgba(var(--secondary-accent),0.2)]" 
                    opacity="0"
                    animate={{
                      d: [
                        "M220,200 C240,180 260,180 280,200 S300,240 250,240 S200,220 220,200 Z",
                        "M215,205 C235,175 265,175 285,205 S305,245 250,245 S195,225 215,205 Z",
                        "M220,200 C240,180 260,180 280,200 S300,240 250,240 S200,220 220,200 Z"
                      ],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 6,
                        ease: "easeInOut"
                      }
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
