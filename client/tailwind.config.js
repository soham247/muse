/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#d2d1d2",
          200: "#a4a4a5",
          300: "#777679",
          400: "#49494c",
          500: "#1c1b1f",
          600: "#161619",
          700: "#111013",
          800: "#0b0b0c",
          900: "#060506"
        },
      }
    },
  },
  plugins: [],
}

