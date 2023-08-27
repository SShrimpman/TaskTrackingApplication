/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'backgroundImage': "url('./assets/background.png')",
      },
      colors: {
        'whiteBG': '#E7E4E1',
        'transparentBg': 'rgba(0,0,0,.4)',
      },
      width: {
        '580': '580px',
        '750': '750px',
        '900': '900px',
      },
      boxShadow: {
        'button': '0 0px 10px 0px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [require("daisyui")],
}

