'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 pt-10 pb-6 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-4">
              <div className="relative w-8 h-8 rounded-lg mr-2 overflow-hidden border border-gray-200">
                <Image 
                  src="/images/logo.jpg" 
                  alt="Atelier Frames Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-semibold text-gray-800">Atelier Frames</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              The Canvas combines elegant design with Museum Grade display technology and custom AI art generation to transform your space.
            </p>
            
            {/* Kickstarter Badge */}
            <div className="mt-5">
              <a 
                href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#05ce78] text-white text-xs font-medium px-3 py-1.5 rounded-full"
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.6,6.1l-9.7,8.2l-7.6-4.4L20.6,6.1L20.6,6.1z"/>
                  <path d="M3.3,9.9V5.6c0-1,0.8-1.9,1.9-1.9h13.6c1,0,1.9,0.8,1.9,1.9v12.8c0,1-0.8,1.9-1.9,1.9H5.2
                  c-1,0-1.9-0.8-1.9-1.9v-4.2L9.8,17L3.3,9.9z"/>
                </svg>
                Back our Kickstarter
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#ai-art-demo" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Try Demo</a>
              </li>
              <li>
                <a href="#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              </li>
              <li>
                <a href="#product-gallery" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#newsletter" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Newsletter</a>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Kickstarter
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@atelierframes.com" 
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Atelier Frames. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
