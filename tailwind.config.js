module.exports = {
  content: [
    './_includes/*.html',
    './_layouts/*.html',
    './_posts/*.md',
    './assets/js/*.js',
    './*.{html,md}'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '8rem',
        sm: '1rem'
      },
      screens: {
        lg: '1024px'
      }
    },
    extend: {},
  },
  plugins: [],
}
