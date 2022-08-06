const plugin = require('tailwindcss/plugin')

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
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('light', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `html[color-theme='light'] .${e(
            `light${separator}${className}`
          )}`
        })
      })
    }),
    plugin(function ({ addVariant, e }) {
      addVariant('system', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `html[color-theme='system'] .${e(
            `system${separator}${className}`
          )}`
        })
      })
    }),
  ],
}
