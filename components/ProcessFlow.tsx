'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProcessFlow = () => {
  const steps = [
    {
      id: 'choose',
      title: 'Choose a Style',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      id: 'describe',
      title: 'Describe Your Art',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'generate',
      title: 'Generate',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'display',
      title: 'Display on Canvas',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
      >
        {/* Animated background line that flows through the steps */}
        <div className="absolute md:top-12 top-10 left-0 right-0 md:h-1 h-0.75 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 z-0">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-sm"
            style={{
              backgroundSize: '200% 100%'
            }}
            initial={{ width: "0%", opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            transition={{ 
              width: { duration: 1.2, ease: "easeOut" },
              opacity: { duration: 0.3 }
            }}
            viewport={{ once: true, margin: "-100px" }}
          />
        </div>

        <div className="py-6 px-4 sm:px-6 sm:py-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">How It Works</h3>
            <p className="text-gray-600 text-sm mt-1">The Canvas makes creating custom art effortless</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <motion.div 
                  className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3 border-2 border-white shadow-sm relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-blue-600">
                    {step.icon}
                  </div>
                </motion.div>
                <p className="font-medium text-gray-900 text-sm">{step.title}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a 
                href="#ai-art-demo" 
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                <span>Try it yourself below</span>
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessFlow; 