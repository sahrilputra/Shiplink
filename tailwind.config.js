/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    fontFamily: {
      poppins : ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#CC0019  ',
        'secondary': '#00509D   ',
        'blue-dark': '#3E9EFF ',
        'blue-light': '#D1E9FF ',
        'green-status': '#50CD8D',
        'green-status-bg': '#50CD8D ',
        'yellow-status': '#FFC149 ',
        'yellow-status-bg': '#FFC1494D ',
        'blue-status': '#3E9EFF ',
        'blue-status-bg': '#3E9EFF4D ',
        'red-status': ' #D90429',
        'red-status-bg': '#D9042933 ',
        'outline-input': "#E7E8EC",
        'inputBg' : '#F7F7FA',
        'blue-light-button': '#F3F8FF'
        
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
