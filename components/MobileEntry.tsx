'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MobileEntryProps {
  onComplete: () => void;
}

const MobileEntry = ({ onComplete }: MobileEntryProps) => {
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'spinning' | 'flyThrough' | 'complete'>('initial');
  
  useEffect(() => {
    // Start animation sequence after a brief delay
    const timer = setTimeout(() => {
      setAnimationPhase('spinning');
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Manage animation sequence
  useEffect(() => {
    if (animationPhase === 'spinning') {
      // After spin animation, move to fly-through phase
      const timer = setTimeout(() => {
        setAnimationPhase('flyThrough');
      }, 1500); // 1.5s for the spin
      
      return () => clearTimeout(timer);
    }
    
    if (animationPhase === 'flyThrough') {
      // After fly-through animation, complete the sequence
      const timer = setTimeout(() => {
        setAnimationPhase('complete');
        onComplete();
      }, 1000); // 1s for the fly-through
      
      return () => clearTimeout(timer);
    }
  }, [animationPhase, onComplete]);

  return (
    <AnimatePresence>
      {animationPhase !== 'complete' && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: animationPhase === 'flyThrough' ? 0 : 1 
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: animationPhase === 'flyThrough' ? 0.8 : 0.3
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-[-1]" />
            
            {/* Logo container */}
            <motion.div
              className="relative w-[200px] h-[200px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: animationPhase === 'flyThrough' ? 20 : 1,
                opacity: animationPhase === 'initial' ? 0 : 1
              }}
              transition={{ 
                duration: animationPhase === 'flyThrough' ? 1.2 : 0.5,
                ease: animationPhase === 'flyThrough' ? "easeIn" : "easeOut"
              }}
            >
              {/* Logo background */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#FFF8E1] opacity-40"
              />
              
              {/* Logo SVG */}
              <motion.div
                className="w-full h-full"
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: animationPhase === 'spinning' ? 720 : 0,
                }}
                transition={{ 
                  duration: 1.5,
                  ease: "easeInOut",
                  times: [0, 0.8, 1],
                  type: "spring",
                  stiffness: 50,
                  damping: 15
                }}
              >
                <svg 
                  viewBox="0 0 400 400" 
                  className="w-full h-full"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                      opacity: animationPhase === 'spinning' ? [0, 0.7, 0] : 0,
                    }}
                    transition={{
                      duration: 1.5,
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
              </motion.div>
            </motion.div>
            
            {/* Loading text */}
            <motion.div 
              className="absolute bottom-20 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: animationPhase === 'flyThrough' ? 0 : 1,
                y: animationPhase === 'initial' ? 20 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 font-medium">
                {animationPhase === 'initial' && 'Loading...'}
                {animationPhase === 'spinning' && 'Welcome to Atelier Frames'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileEntry; 