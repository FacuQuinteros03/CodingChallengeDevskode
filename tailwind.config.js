/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Para proyectos que usan HTML
    './src/**/*.{js,jsx,ts,tsx}', // Asegúrate de que este patrón cubra todos los archivos relevantes
  ],
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
