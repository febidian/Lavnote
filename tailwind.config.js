/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo1: ["Diphylleia", "serif"],
        logo2: ["Karla", "sans-serif"],
        main: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), require('@tailwindcss/typography'), require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
