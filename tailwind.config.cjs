module.exports = {
  purge: ["./src/**/*.svelte", "./src/**/*.html", "./src/**/*.ts"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      darkBlue: "#231A2B",
      purple: "#6A37BC",
      darkPurple: "#2F203C",
      pink: "#E3C5CF",
      lightPink: "#FFE2F8",
      black: "black",
      white: "white",
      lightgray: "lightgray",
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundOpacity: ["active"],
    },
  },
  plugins: [],
};
