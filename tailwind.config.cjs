/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#937DC2',
        'secondary': '#C689C6',
        'accent': '#E8A0BF',
        'light': '#F1F1F6',
        'dark': '#3E4149',
        'darker': '#181818',
      }
    },
  },
  plugins: [],
}