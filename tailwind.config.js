module.exports = {
  theme: {
    extend: {
      colors: {
        blue: "#445ABE",
        myblue: "#4d6fff",
        mytext: "#3b60ff"
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
