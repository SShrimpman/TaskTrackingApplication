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
        '500': '500px',
        '700': '700px',
      },
      boxShadow: {
        'button': '0 0px 10px 0px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [require("daisyui")],
}

