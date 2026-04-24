/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lumina-gold': '#D4AF37',
        'lumina-rose': '#E6C1B1',
        'lumina-silver': '#C0C0C0',
        'lumina-platinum': '#E5E4E2',
        'lumina-cream': '#F9F6F1',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}