/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        // Tes couleurs custom ici (tu pourras les changer plus tard)
        primary: '#3B82F6',
        secondary: '#10B981',
      },
    },
  },
  plugins: [],
}