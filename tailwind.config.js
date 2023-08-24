/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'transparentBg': 'rgba(0,0,0,.4)',
      },
      width: {
        '700': '700px',
      }
    },
  },
  plugins: [],
}

