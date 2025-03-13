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

  // Check if mobile and initialize states
  useEffect(() => {
    // Fix scroll issue - ensure page loads at top
    window.scrollTo(0, 0);
    
    // Check if we're on mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 1024; // lg breakpoint in Tailwind
      setIsMobile(isMobileDevice);
      setShowMobileEntry(isMobileDevice);
      
      // On desktop, show content immediately
      if (!isMobileDevice) {
        setShowContent(true);
      }
    };
    
    // Check on initial load
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mobile entry animation completion
  const handleEntryComplete = () => {
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
            <Hero skipMobileAnimation={isMobile} />
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
