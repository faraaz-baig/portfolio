export default {
  target: "static",

  head: {
    title: "Mariam",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "I am a Professional in Hospitality and Education field"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/M..svg" }]
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ["@nuxtjs/tailwindcss"],

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeCofig: false,
    config: {}
  },

  modules: ["@nuxtjs/pwa"],

  pwa: {
    manifest: {
      lang: "en"
    }
  },

  content: {},

  build: {}
};
