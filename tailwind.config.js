export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-1": "var(--color-white-1)",
        "black-1": "var(--color-black-1)",
        "gray-1": "var(--color-gray-1)",
        "gray-2": "var(--color-gray-2)",
        "paper-1": "var(--color-paper-1)",
        "paper-2": "var(--color-paper-2)",
        "cream-1": "var(--color-cream-1)",
        "cream-2": "var(--color-cream-2)",
        "sand-1": "var(--color-sand-1)",
        "sand-2": "var(--color-sand-2)",
        "red-1": "var(--color-red-1)",
        "green-1": "var(--color-green-1)",
        "blue-1": "var(--color-blue-1)",
        "blue-2": "var(--color-blue-2)",
        "purple-1": "var(--color-purple-1)",
        "pink-1": "var(--color-pink-1)",
        "orange-1": "var(--color-orange-1)",
      },
      boxShadow: {
        "retro-lg": "6px 6px 0 var(--shadow-gray-1-18)",
        "retro-md": "4px 4px 0 var(--shadow-gray-1-12)",
        "retro-post": "6px 6px 0 var(--shadow-gray-1-14)",
        "inset-blue":
          "inset 2px 2px 0 var(--color-paper-1), inset -2px -2px 0 var(--color-blue-1)",
        "inset-sand":
          "inset 2px 2px 0 var(--color-paper-1), inset -2px -2px 0 var(--color-sand-1)",
      },
      fontFamily: {
        sans: ["var(--font-default)", "system-ui", "sans-serif"],
        mono: ["var(--font-default)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
