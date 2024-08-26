/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-color": "rgba(150, 165, 165, 0.3)",
      },
    },
  },
  plugins: [],
};
