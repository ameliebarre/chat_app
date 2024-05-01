/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9d6dff",
        grey: {
          light: "#E7E7E8",
          DEFAULT: "#F3F5F8"
        }
      }
    },
  },
  plugins: [],
}

