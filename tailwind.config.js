module.exports = {
  theme: {
    extend: {
      colors: {
        blue: "#2A7DB9",
        myblue: "#4d6fff",
        mytext: "#2A7DB9"
      },
      fontFamily: {
        sans: ["Inter"]
      }
    }
  },
  variants: {
    extend: {
      textOpacity: ["active", "hover"]
    }
  },
  purge: [
    "components/**/*.vue",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "plugins/**/*.js",
    "nuxt.config.js"
  ]
};
