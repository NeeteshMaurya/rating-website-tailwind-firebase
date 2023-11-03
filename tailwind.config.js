/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': {
            transform: 'translateX(0px)',
          },

          '50%': {
            transform: 'translateX(calc(400px - 100%))',
          },

          '100%': {
            transform: 'translateX(0px)',
          },
        },
      },
      animation: {
        slide: 'slide 40s ease infinite',
      },
    },
  },
  plugins: [],
}

