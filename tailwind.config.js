/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#05070e',
          card: 'rgba(13, 17, 28, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#00f2fe',
          purple: '#9d4edd',
          glow: '#4facfe',
          textMuted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 242, 254, 0.3))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(157, 78, 221, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}
