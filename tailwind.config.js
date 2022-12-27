/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./server.mjs", "./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: (theme) => ({
        fadeIn: {
          "0%": {
            opacity: theme("opacity.0"),
          },
          "100%": {
            opacity: theme("opacity.100"),
          },
        },
      }),
    },
  },
  plugins: [],
};
