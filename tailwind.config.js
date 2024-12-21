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
      },
    },
  },
  plugins: [],
};
