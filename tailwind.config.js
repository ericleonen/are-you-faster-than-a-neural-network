/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  colors: {
    "black": "#1b1b1b",
    "gray": "#a3a3a3",
    "purple": "#B1C3FF",
    "turquoise": "#1FE0B2"
  }
}
