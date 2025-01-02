/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-color":"#00bcd4",
        "secondary-color":"#EAF0F1"
      }
    },
  },
  plugins: [],
}