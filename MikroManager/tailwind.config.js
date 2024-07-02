/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'customBlue': '#008BC9',
      },
      backgroundImage: {
        'bgGuess': "url('./src/assets/bgGuess.png')",
      }
    },
  },
  plugins: [],
}

