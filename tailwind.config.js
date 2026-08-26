/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        padayal: {
          primary: '#2B7A4B',        // Leafy Banana Green (Brand/Headers/Nav)
          'primary-hover': '#23643D',  // Deep Leaf Green Hover
          cta: '#965A38',            // Heritage Terracotta Brown (Action/Buttons)
          'cta-hover': '#804B2D',      // Rich Terracotta Hover
          'cta-active': '#6C3E24',     // Pressed Terracotta State
          secondary: '#8A9A5B',      // Muted Sage / Lemongrass (Badges/Tags)
          'secondary-light': '#F2F5EB',// Very Light Sage Tint (Badge background)
          bg: '#FAF8F5',             // Raw Coconut Milk (Soft Organic Canvas)
          surface: '#FFFFFF',        // Pure Crisp White (Cards/Modals)
          text: '#112415',           // Deep Forest Shadows (Headers/High Contrast Text)
          muted: '#5A6B5D',          // Muted Leaf Body Text
        },
        forest: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
          950: '#0d3010',
        },
        cream: {
          50: '#fffdf7',
          100: '#fff8e7',
          200: '#fff0d4',
          300: '#ffe8c0',
          400: '#ffd9a0',
          500: '#f5e6c8',
        },
        earth: {
          50: '#efebe9',
          100: '#d7ccc8',
          200: '#bcaaa4',
          300: '#a1887f',
          400: '#8d6e63',
          500: '#795548',
          600: '#6d4c41',
          700: '#5d4037',
          800: '#4e342e',
          900: '#3e2723',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Playfair Display', 'system-ui', 'sans-serif'],
        pranic: ['Fraunces', 'Merriweather', 'Georgia', 'serif'],
        handwritten: ['Caveat', 'cursive'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
