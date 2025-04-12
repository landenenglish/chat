import primeui from 'tailwindcss-primeui'

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
  plugins: [primeui],
  darkMode: ['class', '.p-dark'],
}
