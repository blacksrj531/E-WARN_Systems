/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ewarn: {
          blue: '#1d4ed8',
          dark: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}
