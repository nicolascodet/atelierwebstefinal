/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0077ED', // Modern blue
        'primary-dark': '#0055CC',
        'secondary': '#111827', // Near black
        'secondary-light': '#374151',
        'accent': '#7C3AED', // Vibrant purple
        'accent-light': '#A78BFA',
        'success': '#10B981', // Green
        'warning': '#F59E0B', // Amber
        'danger': '#EF4444', // Red
        'background': '#FFFFFF',
        'surface': '#F9FAFB',
        'surface-dark': '#F3F4F6',
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Helvetica Neue', 'sans-serif'],
        'display': ['SF Pro Display', 'Inter', 'sans-serif'],
        'mono': ['SF Mono', 'Menlo', 'monospace'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        'mobile': '100%',
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        'medium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '8px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 10s ease infinite',
        'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          from: { borderColor: 'transparent' },
          to: { borderColor: 'currentColor' },
        },
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
    },
  },
  plugins: [],
}
