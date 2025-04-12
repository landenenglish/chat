import primeui from 'tailwindcss-primeui'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './presets/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [primeui, typography],
  darkMode: ['class', '.p-dark'],
}
