/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teslagreen: "#4ED840",
      },
      backgroundImage: {
        "nk-mineirao": "url('./assets/nk-mineirao.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
