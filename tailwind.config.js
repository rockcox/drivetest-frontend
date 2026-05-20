/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#0e0e0c',
          soft: '#1c1c18',
          muted: '#3a3a34',
        },
        paper: {
          DEFAULT: '#f5f4ef',
          warm: '#ede9e0',
          cold: '#e8eaee',
        },
        lime: {
          DEFAULT: '#c8f53a',
          dark: '#a8d020',
          soft: '#e4faaa',
        },
        amber: { DEFAULT: '#f5a623' },
        red: { DEFAULT: '#e8392a' },
        green: { DEFAULT: '#22a868' },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease both',
        'pulse-dot': 'pulseDot 1.4s ease-in-out infinite',
        'slide-in': 'slideIn 0.35s ease both',
        'scan-bar': 'scanBar 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.75)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scanBar: {
          '0%, 100%': { transform: 'scaleX(0.2)', opacity: '0.4' },
          '50%': { transform: 'scaleX(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
