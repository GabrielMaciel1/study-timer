/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'], // Certifique-se de que Tailwind está escaneando os arquivos corretamente
    theme: {
      extend: {
        colors: {
          primary: '#6b46c1', // Roxo principal
          secondary: '#9f7aea', // Roxo claro
        },
      },
    },
    plugins: [],
  };
  