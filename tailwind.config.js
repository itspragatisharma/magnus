/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0B1730', 2: '#3B4760', 3: '#6B7589' },
        navy: { DEFAULT: '#0B1730', 800: '#122244', 700: '#1B2E57' },
        paper: { DEFAULT: '#F6F3EC', 2: '#EFEBE1', 3: '#E6E1D3' },
        line: { DEFAULT: '#DDD8C9', strong: '#C5BFAD' },
        emerald: { DEFAULT: '#0E8F6A', soft: '#DCEFE7', ink: '#075C44' },
        volt: { DEFAULT: '#2A5BFF', soft: '#E1E8FF', ink: '#1A3BB0' },
        amber: { DEFAULT: '#B7791F', soft: '#F6E9CC', ink: '#7A4E0E' },
        rose: { DEFAULT: '#B4443C', soft: '#F5DDD9', ink: '#7C2A24' },
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      borderRadius: { DEFAULT: '4px', md: '4px', lg: '6px' },
    },
  },
  plugins: [],
};
