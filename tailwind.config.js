module.exports = {
  content: [
    './_includes/*.html',
    './_layouts/*.html',
    './_posts/*.md',
    './assets/images/*.svg',
    './assets/js/*.js',
    './*.{html,md}'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        sm: '0.25rem'
      },
      screens: {
        lg: '1024px'
      }
    },
    extend: {},
  },
  plugins: [],
}
