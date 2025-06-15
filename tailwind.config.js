/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        'india-green': '#138808',
        'sky-blue': '#87CEEB',
        'soft-pink': '#FFD1DC',
        'chakra-gold': '#FFD700',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
      },
      animation: {
        'bounce-gentle': 'bounce 1s ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'chakra-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FF9933\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
};