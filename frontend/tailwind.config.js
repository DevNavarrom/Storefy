/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    colors: {
      'blue-light': '#e5f8ff'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

