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
    
    // 1. Show "World's first"
    await animate("#world-first", { opacity: [0, 1] }, { duration: 0.6 });
    
    // 2. Show "that transforms your"
    await animate("#transforms-line", { opacity: [0, 1] }, { duration: 0.4 });
    
    // 3. Animate the transforms underline
    await animate("#transforms-underline", { width: ["0%", "100%"] }, { duration: 0.4 });
    
    // 4. Show "living space"
    await animate("#space-line", { opacity: [0, 1] }, { duration: 0.4 });
    
    // 5. Animate the space underline
    await animate("#space-underline", { width: ["0%", "100%"] }, { duration: 0.4 });
    
    // 6. Typing animation for "AI picture frame"
    const targetText = "AI picture frame";
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
      
      // Hide cursor when done
      await animate("#cursor", { opacity: 0 }, { duration: 0.5 });
    }
    
    // 7. Animate in all the frame elements
    animate([
      [".frame-part", { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.8, delay: 0.1 }],
      [".frame-line", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.8, delay: 0.2 }],
      [".frame-circle", { scale: [0, 1], opacity: [0, 1] }, { duration: 0.6, delay: 0.3 }],
    ]);
    
    // 8. Fade in description and cards
    await animate(".hero-description", { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 });
    
    // 9. Fade in the cards
    animate([
      ["#card-1", { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 }],
      ["#card-2", { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: 0.2 }],
    ]);
    
    // 10. Fade in the video link
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
                {/* Main heading with tight spacing */}
                <h1 className="hero-heading text-4xl sm:text-5xl font-bold text-[rgb(var(--text-primary))] opacity-0">
                  <div id="world-first" className="mb-3 opacity-0">World's first</div>
                  
                  <div id="transforms-line" className="flex items-baseline gap-x-2 mt-0 opacity-0">
                    <span>that</span>
                    <span className="relative inline-block">
                      transforms
                      <span id="transforms-underline" className="absolute bottom-1 left-0 w-0 h-[4px] bg-[rgb(var(--secondary-accent))]"></span>
                    </span>
                    <span>your</span>
                  </div>
                  
                  <div id="space-line" className="mt-1 opacity-0">
                    <span>living</span>&nbsp;
                    <span className="relative inline-block">
                      space
                      <span id="space-underline" className="absolute bottom-1 left-0 w-0 h-[4px] bg-[rgb(var(--secondary-accent))]"></span>
                    </span>
                    <span className="ml-2 relative">
                      <span className="text-[rgb(var(--primary-accent))]" ref={typingRef}></span>
                      <span id="cursor" className="absolute h-[1.2em] w-[2px] bg-black opacity-0"></span>
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

            {/* Right side - Animated Illustration */}
            <div className="right-illustration block opacity-0">
              <div className="relative">
                <svg 
                  viewBox="0 0 500 500" 
                  className="w-full h-auto" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Frame outline */}
                  <motion.rect 
                    x="100" y="100" 
                    width="300" height="300" 
                    rx="50" ry="50"
                    className="frame-part fill-[rgb(var(--primary-accent))]"
                    opacity="0"
                    animate={{
                      y: [0, -10, 0],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4
                      }
                    }}
                  />
                  
                  {/* Inner display area */}
                  <motion.rect 
                    x="130" y="130" 
                    width="240" height="240" 
                    rx="30" ry="30"
                    className="frame-part fill-white"
                    opacity="0"
                  />
                  
                  {/* Animated lines */}
                  <motion.line 
                    x1="150" y1="180" x2="350" y2="180" 
                    className="frame-line stroke-[rgb(var(--tertiary-accent))]" 
                    strokeWidth="3" 
                    strokeDasharray="10 5"
                    opacity="0"
                    animate={{
                      x1: [150, 155, 150],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3
                      }
                    }}
                  />
                  <motion.line 
                    x1="150" y1="240" x2="350" y2="240" 
                    className="frame-line stroke-[rgb(var(--primary-accent))]" 
                    strokeWidth="3" 
                    strokeDasharray="20 10"
                    opacity="0"
                    animate={{
                      x2: [350, 340, 350],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4
                      }
                    }}
                  />
                  <motion.line 
                    x1="150" y1="300" x2="350" y2="300" 
                    className="frame-line stroke-[rgb(var(--secondary-accent))]" 
                    strokeWidth="3" 
                    strokeDasharray="15 7"
                    opacity="0"
                    animate={{
                      x1: [150, 160, 150],
                      x2: [350, 340, 350],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 5
                      }
                    }}
                  />

                  {/* Circular elements with animation */}
                  <motion.circle 
                    cx="190" cy="190" r="20" 
                    className="frame-circle fill-none stroke-[rgb(var(--secondary-accent))]" 
                    strokeWidth="3"
                    opacity="0"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                      transition: {
                        rotate: {
                          repeat: Infinity,
                          duration: 20,
                          ease: "linear"
                        },
                        scale: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 2
                        }
                      }
                    }}
                    style={{ originX: "190px", originY: "190px" }}
                  />
                  <motion.circle 
                    cx="310" cy="310" r="30" 
                    className="frame-circle fill-none stroke-[rgb(var(--primary-accent))]" 
                    strokeWidth="3"
                    opacity="0"
                    animate={{
                      rotate: -360,
                      transition: {
                        repeat: Infinity,
                        duration: 25,
                        ease: "linear"
                      }
                    }}
                    style={{ originX: "310px", originY: "310px" }}
                  />
                  <motion.circle 
                    cx="250" cy="250" r="50" 
                    className="frame-circle fill-none stroke-[rgb(var(--tertiary-accent))]" 
                    strokeWidth="2" 
                    strokeDasharray="5 5"
                    opacity="0"
                    animate={{
                      rotate: 360,
                      r: [50, 52, 50],
                      transition: {
                        rotate: {
                          repeat: Infinity,
                          duration: 30,
                          ease: "linear"
                        },
                        r: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3
                        }
                      }
                    }}
                    style={{ originX: "250px", originY: "250px" }}
                  />
                  
                  {/* Connecting lines with draw animation */}
                  <motion.line 
                    x1="180" y1="320" x2="250" y2="250" 
                    className="frame-line stroke-[rgb(var(--primary-accent))]" 
                    strokeWidth="2"
                    opacity="0"
                  />
                  <motion.line 
                    x1="320" y1="180" x2="250" y2="250" 
                    className="frame-line stroke-[rgb(var(--secondary-accent))]" 
                    strokeWidth="2"
                    opacity="0"
                  />
                  
                  {/* Control dots with pulse animation */}
                  <motion.circle 
                    cx="80" cy="200" r="8" 
                    className="frame-circle fill-[rgb(var(--secondary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [8, 10, 8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2
                      }
                    }}
                  />
                  <motion.circle 
                    cx="80" cy="250" r="8" 
                    className="frame-circle fill-[rgb(var(--tertiary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [8, 10, 8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        delay: 0.5
                      }
                    }}
                  />
                  <motion.circle 
                    cx="80" cy="300" r="8" 
                    className="frame-circle fill-[rgb(var(--primary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [8, 10, 8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        delay: 1
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="420" cy="200" r="8" 
                    className="frame-circle fill-[rgb(var(--secondary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [8, 10, 8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        delay: 0.3
                      }
                    }}
                  />
                  <motion.circle 
                    cx="420" cy="250" r="8" 
                    className="frame-circle fill-[rgb(var(--tertiary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [8, 10, 8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        delay: 0.8
                      }
                    }}
                  />
                  <motion.circle 
                    cx="420" cy="300" r="8" 
                    className="frame-circle fill-[rgb(var(--primary-accent))]" 
                    opacity="0"
                    animate={{
                      r: [8, 10, 8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        delay: 1.3
                      }
                    }}
                  />
                  
                  {/* Additional decorative elements */}
                  <motion.path 
                    d="M150,350 C200,380 300,380 350,350" 
                    className="frame-line stroke-[rgb(var(--secondary-accent))]" 
                    strokeWidth="2" 
                    strokeDasharray="5 3"
                    fill="none"
                    opacity="0"
                    animate={{
                      d: ["M150,350 C200,380 300,380 350,350", "M150,350 C200,370 300,390 350,350", "M150,350 C200,380 300,380 350,350"],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 6
                      }
                    }}
                  />
                  
                  <motion.path 
                    d="M150,150 C200,120 300,120 350,150" 
                    className="frame-line stroke-[rgb(var(--tertiary-accent))]" 
                    strokeWidth="2" 
                    strokeDasharray="5 3"
                    fill="none"
                    opacity="0"
                    animate={{
                      d: ["M150,150 C200,120 300,120 350,150", "M150,150 C200,130 300,110 350,150", "M150,150 C200,120 300,120 350,150"],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 7
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
