// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // colors: {
      //   'primary': '#4a5084',
      //   'secondary': '#6976ea',
      //   'background': '#ECECEC'
      // }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

