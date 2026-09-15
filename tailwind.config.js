/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Soft beige
        beige: {
          100: '#F5E6D3',
          200: '#FAF0E6',
          300: '#E8D5C4',
        },
        // Accent: Baby pink
        pink: {
          light: '#FFD1DC',
          DEFAULT: '#FFC0CB',
          accent: '#FFB6C1',
        },
        // Text
        warmGray: '#5D5D5D',
        darkBrown: '#4A4A4A',
        // Background
        cream: '#FFFBF5',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'soft': '1rem',
        'soft-lg': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 30px rgba(0, 0, 0, 0.08)',
      },
      transitionDuration: {
        'smooth': '300ms',
      },
    },
  },
  plugins: [],
}
