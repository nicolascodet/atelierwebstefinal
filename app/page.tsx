'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Image from 'next/image';
import Hero from '../components/Hero';
import ProcessFlow from '../components/ProcessFlow';
import AIArtDemo from '../components/AIArtDemo';
import Features from '../components/Features';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import ProductGallery from '../components/ProductGallery';
import VideoDemo from '../components/VideoDemo';
import MobileEntry from '../components/MobileEntry';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileEntry, setShowMobileEntry] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [animationHasRun, setAnimationHasRun] = useState(false);

  // Check if mobile and initialize states
  useEffect(() => {
    // Fix scroll issue - ensure page loads at top
    window.scrollTo(0, 0);
    
    // Check if we're on mobile and if the animation has run before
    const checkMobileAndAnimation = () => {
      const isMobileDevice = window.innerWidth < 1024; // lg breakpoint in Tailwind
      setIsMobile(isMobileDevice);
      
      // Check localStorage to see if the animation has already been shown
      const hasSeenAnimation = localStorage.getItem('hasSeenAnimation') === 'true';
      setAnimationHasRun(hasSeenAnimation);
      
      // Only show the entry animation on mobile if it hasn't been seen before
      setShowMobileEntry(isMobileDevice && !hasSeenAnimation);
      
      // Show content immediately if not mobile or already seen animation
      if (!isMobileDevice || hasSeenAnimation) {
        setShowContent(true);
      }
    };
    
    // Check on initial load
    checkMobileAndAnimation();
    
    // Listen for resize events - only check mobile state on resize, don't change animation state
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 1024;
      setIsMobile(isMobileDevice);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mobile entry animation completion
  const handleEntryComplete = () => {
    // Store in localStorage that the user has seen the animation
    localStorage.setItem('hasSeenAnimation', 'true');
    setAnimationHasRun(true);
    setShowMobileEntry(false);
    setShowContent(true);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Mobile entry animation */}
      {showMobileEntry && (
        <MobileEntry onComplete={handleEntryComplete} />
      )}
      
      {/* Main content */}
      {showContent && (
        <>
          <Header />
          
          {/* Hero section with more prominent Kickstarter CTA */}
          <section id="hero" className="pt-16 md:pt-20">
            <Hero skipMobileAnimation={isMobile || animationHasRun} />
          </section>
          
          {/* Process flow section - visualizes the steps */}
          <section className="py-8 md:py-12 bg-gradient-to-b from-white to-blue-50/20">
            <ProcessFlow />
          </section>
          
          {/* AI Art Demo moved up for better engagement */}
          <section id="ai-art-demo" className="py-8 md:py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <AIArtDemo />
            </div>
          </section>
          
          {/* Simplified features section */}
          <section id="features" className="py-8 md:py-12 bg-gradient-to-b from-white via-blue-50/30 to-white">
            <Features />
          </section>
          
          {/* Product Gallery showing Canvas in different settings */}
          <section id="product-gallery" className="py-8 md:py-12 bg-white">
            <ProductGallery />
          </section>
          
          {/* Video Demo section */}
          <section id="video-demo" className="py-8 md:py-12 bg-white">
            <VideoDemo />
          </section>
          
          {/* Newsletter with Kickstarter reminder */}
          <section id="newsletter" className="py-8 md:py-12 bg-gray-50">
            <Newsletter />
          </section>
          
          <Footer />
        </>
      )}
    </main>
  );
}
