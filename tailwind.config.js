/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0f0f10',
        neonYellow: '#d8ff1f',
        neonPink: '#ff3bec',
        neonCyan: '#00eaff',
        neonPurple: '#b026ff',
        lavaOrange: '#ff6b1a',
        acidGreen: '#c4ff4d',
        ink: '#09090b',
        bone: '#f7f7f7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-neon': 'pulse-neon 2.4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 1.4s ease-in-out infinite',
        'grain': 'grain 6s steps(10) infinite',
        'gradient-x': 'gradient-x 12s ease infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 59, 236, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(255, 59, 236, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-5%, -10%)' },
          '40%': { transform: 'translate(-15%, 5%)' },
          '60%': { transform: 'translate(10%, 15%)' },
          '80%': { transform: 'translate(5%, -5%)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      dropShadow: {
        neon: '0 0 25px rgba(255, 59, 236, 0.45)',
        cyan: '0 0 25px rgba(0, 234, 255, 0.45)',
      }
    },
  },
  plugins: [],
}
