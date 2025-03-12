'use client';

import React from 'react';
import { motion } from 'framer-motion';

const VideoDemo = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 -mt-4 sm:mt-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex justify-center"
      >
        <a 
          href="https://www.youtube.com/watch?v=YsnrgDo_wUY" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3 py-3 px-6 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all"
        >
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none"
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            Watch Demo Video
          </span>
        </a>
      </motion.div>
    </div>
  );
};

export default VideoDemo; 