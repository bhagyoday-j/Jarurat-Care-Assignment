/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:    '#17317A',
        secondary:  '#2F5EFF',
        accent:     '#5A7CFF',
        bgLight:    '#F2F5FB',
        bgSection:  '#EEF3FA',
        textPrimary:'#1A2F6B',
        textMuted:  '#4F5F7A',
        border:     '#DDE5F2',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        soft:   '0 4px 20px rgba(0,0,0,0.06)',
        medium: '0 10px 30px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
