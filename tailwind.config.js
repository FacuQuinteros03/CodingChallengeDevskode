/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navbar: '#B187F533',
        button: '#B985FC',
        stockTrue: '#3DCC7A',
        stockFalse: '#FF7878',
        focusForm: '#2196F3',
        icon: '#323232',
      },
    },
  },
  plugins: [],
};
