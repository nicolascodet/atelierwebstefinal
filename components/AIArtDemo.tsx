'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Style {
  id: string;
  name: string;
  prompt: string;
  description: string;
}

const artStyles: Style[] = [
  {
    id: 'bw-photography',
    name: 'Black & White',
    prompt: 'black and white photography, dramatic lighting, strong contrast',
    description: 'Dramatic monochrome'
  },
  {
    id: 'baroque',
    name: 'Classical',
    prompt: 'baroque style, dramatic, ornate, rich colors, chiaroscuro, detailed',
    description: 'Rich classical style'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    prompt: 'minimalist style, simple, clean lines, uncluttered, neutral colors',
    description: 'Clean and simple'
  }
];

export default function AIArtDemo() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Update active step based on user progress
  useEffect(() => {
    if (selectedStyle) {
      setActiveStep(2);
    }
    if (selectedStyle && prompt) {
      setActiveStep(3);
    }
    if (generatedImage) {
      setActiveStep(4);
    }
  }, [selectedStyle, prompt, generatedImage]);

  const handleStyleSelect = (style: Style) => {
    setSelectedStyle(style);
  };

  const handleGenerate = async () => {
    if (!prompt || !selectedStyle) {
      setError('Please enter a prompt and select a style');
      return;
    }

    setError(null);
    setIsGenerating(true);
    setGeneratedImage(null);
    setStatusMessage('Starting generation...');
    
    try {
      // Step 1: Enhance the prompt
      setStatusMessage('Enhancing your prompt...');
      const enhanceResponse = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: selectedStyle }),
      });
      
      if (!enhanceResponse.ok) {
        const errorData = await enhanceResponse.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to enhance prompt');
      }
      
      const enhanceData = await enhanceResponse.json();
      
      // Step 2: Generate image
      setStatusMessage('Generating image (this may take up to 20 seconds)...');
      
      const generateResponse = await fetch('/api/minimal-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: enhanceData.enhancedPrompt }),
      });
      
      if (!generateResponse.ok) {
        const errorData = await generateResponse.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to generate image');
      }
      
      const imageData = await generateResponse.json();
      setGeneratedImage(imageData.imageUrl);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
      setStatusMessage(null);
    }
  };

  const clearDemo = () => {
    setPrompt('');
    setSelectedStyle(null);
    setGeneratedImage(null);
    setError(null);
    setStatusMessage(null);
    setActiveStep(1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div id="demo" className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
        >
          Try It Yourself
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Create your own custom artwork in seconds
        </motion.p>
      </div>

      {/* Progress steps for mobile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="sm:hidden mb-6 px-4"
      >
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 h-1 top-4 bg-gray-200 -z-10">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${(activeStep / 4) * 100}%` }}
            ></div>
          </div>

          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step} 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= activeStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              } transition-colors duration-300`}
            >
              {step}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"
        >
          <div className="mb-5">
            <div className="flex items-center mb-2">
              <div className={`w-6 h-6 rounded-full ${activeStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} flex items-center justify-center text-xs font-bold mr-2`}>1</div>
              <label className="block text-sm font-medium text-gray-700">
                Choose a style
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {artStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleSelect(style)}
                  disabled={isGenerating}
                  className={`border rounded-md p-3 text-center transition-all ${
                    selectedStyle?.id === style.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="font-medium text-sm">{style.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{style.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center mb-2">
              <div className={`w-6 h-6 rounded-full ${activeStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'} flex items-center justify-center text-xs font-bold mr-2`}>2</div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                Describe what you want to see
              </label>
            </div>
            <textarea
              id="prompt"
              ref={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
              placeholder="e.g. a serene mountain landscape with a sunset"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              rows={3}
            ></textarea>
          </div>

          <div className="mb-3">
            <div className="flex items-center mb-3">
              <div className={`w-6 h-6 rounded-full ${activeStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'} flex items-center justify-center text-xs font-bold mr-2`}>3</div>
              <p className="text-sm font-medium text-gray-700">Generate your custom artwork</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt || !selectedStyle}
                className="w-full py-2.5 px-4 rounded-md text-white font-medium transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate Art'
                )}
              </button>
              
              <button
                onClick={clearDemo}
                disabled={isGenerating}
                className="w-full sm:w-auto py-2.5 px-4 rounded-md border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {statusMessage && (
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {statusMessage}
            </div>
          )}
        </motion.div>

        {/* Right side - Image Display */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm h-full flex flex-col">
            <div className="flex items-center mb-3">
              <div className={`w-6 h-6 rounded-full ${activeStep >= 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'} flex items-center justify-center text-xs font-bold mr-2`}>4</div>
              <span className="text-sm font-medium text-gray-700">Your Custom Artwork</span>
            </div>
            
            <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-md border border-gray-200 overflow-hidden relative min-h-[250px]">
              {generatedImage ? (
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={generatedImage} 
                  alt="Generated art" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center px-4">
                  <div className="text-gray-400 mb-1">
                    <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">
                    {isGenerating 
                      ? "Your artwork is being created..." 
                      : "Follow steps 1-3 to generate your custom art"}
                  </p>
                </div>
              )}
            </div>

            {generatedImage && (
              <div className="mt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-700 mb-3">Like what you see? Back our Kickstarter to bring The Canvas to life!</p>
                  <a 
                    href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-colors"
                  >
                    Back on Kickstarter
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
