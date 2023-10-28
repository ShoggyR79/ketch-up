/** @type {import('tailwindcss').Config} */

const colors = require("./styles")

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}

