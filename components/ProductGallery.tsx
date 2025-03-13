'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const productImages = [
  {
    src: '/images/livingroom.JPG',
    alt: 'The Canvas in a modern living room setting',
  },
  {
    src: '/images/homeoffice.JPG',
    alt: 'The Canvas in a home office',
  },
  {
    src: '/images/bedroom.JPG',
    alt: 'The Canvas in a bedroom',
  },
];

const ProductGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollRef.current && e.deltaY !== 0) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };
    
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <section className="py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900 mb-2">The Canvas in Your Home</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto text-sm md:text-base">
            See how our beautifully crafted digital canvas fits perfectly in any space
          </p>
        </motion.div>

        <div className="relative">
          {/* Left fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          
          {/* Scrollable gallery */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-5 pb-6 no-scrollbar scroll-smooth"
          >
            <div className="pl-8 shrink-0 w-4"></div>
            {productImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="shrink-0 relative"
              >
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white">
                  <div className="relative w-64 h-48 sm:w-72 sm:h-52 md:w-80 md:h-56 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-sm text-gray-700">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="pr-8 shrink-0 w-4"></div>
          </div>

          {/* Right fade effect */}
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery; 