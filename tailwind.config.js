module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      pointerEvents: ['disabled'],
      backgroundColor: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}