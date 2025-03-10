'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Integration from '../components/Integration';
import Pricing from '../components/Pricing';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import AIArtDemo from '../components/AIArtDemo';

export default function Home() {
  // Fix scroll issue - ensure page loads at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section id="hero" className="pt-16 md:pt-20">
        <Hero />
      </section>
      
      <section id="features" className="py-12 md:py-16">
        <Features />
      </section>
      
      <section id="ai-art-demo" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AIArtDemo />
        </div>
      </section>
      
      <section id="integration" className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <Integration />
      </section>
      
      <section id="pricing" className="bg-gray-50 py-16 md:py-20">
        <Pricing />
      </section>
      
      <section id="newsletter" className="py-16 md:py-20">
        <Newsletter />
      </section>
      
      <Footer />
    </main>
  );
}
