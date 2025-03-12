'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProcessFlow from '../components/ProcessFlow';
import AIArtDemo from '../components/AIArtDemo';
import Features from '../components/Features';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Home() {
  // Fix scroll issue - ensure page loads at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero section with more prominent Kickstarter CTA */}
      <section id="hero" className="pt-16 md:pt-20">
        <Hero />
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
      
      {/* Newsletter with Kickstarter reminder */}
      <section id="newsletter" className="py-8 md:py-12 bg-gray-50">
        <Newsletter />
      </section>
      
      <Footer />
    </main>
  );
}
