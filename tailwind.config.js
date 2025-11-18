/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f7fa",
          100: "#e4e8ef",
          200: "#cbd2dc",
          300: "#a1afc2",
          400: "#7484a4",
          500: "#576788",
          600: "#424e6d",
          700: "#353d56",
          800: "#2c3245",
          900: "#252a39"
        },
        accent: "#7f5af0"
      },
      boxShadow: {
        card: "0 20px 45px -35px rgba(15, 23, 42, 0.9)"
      }
    },
  },
  plugins: [],
}

