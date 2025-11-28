/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3c096c',
          light: '#9d4edd',
          dark: '#240046',
          80: '#5a189a',
          60: '#7b2cbf',
        },
        secondary: {
          DEFAULT: '#bee9e8',
          light: '#d0f4f3',
          dark: '#62b6cb',
        },
        accent: {
          bg: '#f8f0ff',
        },
        dark: {
          100: '#00171f',
          80: '#242b33',
          60: '#4a5568',
          40: '#99a2a5',
          20: '#ccd1d2',
          10: '#ebeeef',
        },
      },
      fontFamily: {
        sans: ['"Red Hat Display"', 'sans-serif'],
        condensed: ['"Roboto Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

