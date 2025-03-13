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
    
    // Logo animation - make all elements visible
    animate(".logo-animation", { opacity: 1 }, { duration: 0.7 });
    
    // Animate in elements of the logo
    animate([
      [".logo-circle", { scale: [0.8, 1], opacity: [0, 1] }, { duration: 0.8 }],
      [".logo-path", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 1.2 }],
      [".logo-accent", { scale: [0.7, 1], opacity: [0, 1] }, { duration: 0.6, delay: 0.3 }],
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
                    Your walls, reimagined by AI brilliance
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

            {/* Right side - Logo-inspired animated design */}
            <div className="right-illustration flex items-center justify-center opacity-0">
              <div className="relative w-full max-w-md h-[400px]">
                {/* Logo-inspired animation */}
                <svg 
                  viewBox="0 0 400 400" 
                  className="logo-animation w-full h-full mx-auto" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background glow effect */}
                  <motion.circle
                    cx="200" cy="200" r="150"
                    fill="rgba(var(--background-rgb), 0.8)"
                    stroke="rgba(var(--primary-accent), 0.1)"
                    strokeWidth="40"
                    animate={{
                      r: [150, 155, 150],
                      opacity: [0.8, 0.9, 0.8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Central triangle formation - inspired by the image */}
                  <g className="triangle-formation">
                    {/* Connection lines */}
                    <motion.path
                      d="M200,120 L120,240 L280,240 Z"
                      className="logo-path"
                      stroke="rgba(var(--tertiary-accent), 0.7)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{
                        strokeWidth: [6, 8, 6],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    
                    {/* Top node */}
                    <motion.circle
                      cx="200" cy="120" r="30"
                      className="logo-circle"
                      fill="rgba(var(--tertiary-accent), 0.9)"
                      animate={{
                        r: [30, 33, 30],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 2.5,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    
                    {/* Left node */}
                    <motion.circle
                      cx="120" cy="240" r="30"
                      className="logo-circle"
                      fill="rgba(var(--tertiary-accent), 0.9)"
                      animate={{
                        r: [30, 33, 30],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3.5,
                          ease: "easeInOut",
                          delay: 0.5
                        }
                      }}
                    />
                    
                    {/* Right node */}
                    <motion.circle
                      cx="280" cy="240" r="30"
                      className="logo-circle"
                      fill="rgba(var(--tertiary-accent), 0.9)"
                      animate={{
                        r: [30, 33, 30],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3,
                          ease: "easeInOut",
                          delay: 1
                        }
                      }}
                    />
                    
                    {/* Shadow/glow effects behind nodes */}
                    <motion.circle
                      cx="200" cy="120" r="40"
                      className="logo-accent"
                      fill="rgba(var(--background-rgb), 0.7)"
                      animate={{
                        r: [40, 44, 40],
                        opacity: [0.3, 0.5, 0.3],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    
                    <motion.circle
                      cx="120" cy="240" r="40"
                      className="logo-accent"
                      fill="rgba(var(--background-rgb), 0.7)"
                      animate={{
                        r: [40, 44, 40],
                        opacity: [0.3, 0.5, 0.3],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 4,
                          ease: "easeInOut",
                          delay: 0.7
                        }
                      }}
                    />
                    
                    <motion.circle
                      cx="280" cy="240" r="40"
                      className="logo-accent"
                      fill="rgba(var(--background-rgb), 0.7)"
                      animate={{
                        r: [40, 44, 40],
                        opacity: [0.3, 0.5, 0.3],
                        transition: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3.5,
                          ease: "easeInOut",
                          delay: 1.4
                        }
                      }}
                    />
                  </g>
                  
                  {/* Decorative elements */}
                  <motion.circle
                    cx="200" cy="200" r="8"
                    className="logo-accent"
                    fill="rgba(var(--primary-accent), 0.8)"
                    animate={{
                      r: [8, 10, 8],
                      opacity: [0.8, 1, 0.8],
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Floating accent particles */}
                  <g className="floating-accents">
                    {[...Array(5)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={200 + (i - 2) * 40}
                        cy={300}
                        r={4}
                        className="logo-accent"
                        fill="rgba(var(--secondary-accent), 0.6)"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.6, 0.8, 0.6],
                          transition: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2 + i * 0.5,
                            ease: "easeInOut",
                            delay: i * 0.3
                          }
                        }}
                      />
                    ))}
                  </g>
                  
                  {/* Pulse rings */}
                  <motion.circle
                    cx="200" cy="200" r="60"
                    stroke="rgba(var(--primary-accent), 0.2)"
                    strokeWidth="1"
                    fill="none"
                    animate={{
                      r: [60, 90, 60],
                      opacity: [0.2, 0, 0.2],
                      transition: {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeOut"
                      }
                    }}
                  />
                  
                  <motion.circle
                    cx="200" cy="200" r="70"
                    stroke="rgba(var(--secondary-accent), 0.2)"
                    strokeWidth="1"
                    fill="none"
                    animate={{
                      r: [70, 100, 70],
                      opacity: [0.2, 0, 0.2],
                      transition: {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeOut",
                        delay: 1
                      }
                    }}
                  />
                </svg>
                
                {/* Floating particles in background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-[rgba(var(--tertiary-accent),0.3)]"
                      style={{
                        width: `${Math.random() * 6 + 3}px`,
                        height: `${Math.random() * 6 + 3}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        x: [0, Math.random() * 8 - 4, 0],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
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
