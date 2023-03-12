/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#556ee6',
        'grey': '#74788d',
        'light-bg': '#f8f8fb',
      },
      fontSize: {
        text: '13px',
      },
    },
  },
  plugins: [],
};
