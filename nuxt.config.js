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
        content:
          "Hello! I'm Mariam. I am a Professional in Hospitality and Education field"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Hello! I'm Mariam. I am a Professional in Hospitality and Education field"
      },
      { hid: "og:site_name", name: "og:site_name", content: "Mariam" },
      { hid: "og:title", name: "og:title", content: "Mariam - Portfolio" },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Mariam - Education and Hospitality Professional"
      },
      { hid: "twitter:site", name: "twitter:site", content: "@kanagapothil" },
      {
        hid: "twitter:creator",
        name: "twitter:creator",
        content: "@kanagapothil"
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "Mariam | Education and Hospitality Professional"
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "Hello! I'm Mariam. I am a Professional in Hospitality and Education field"
      },
      {
        hid: "apple-mobile-web-app-title",
        name: "apple-mobile-web-app-title",
        content: "Mariam - Education and Hospitality Professional"
      },
      {
        hid: "mobile-mobile-web-app-capable",
        name: "apple-mobile-web-app-capable",
        content: "Mariam - Education and Hospitality Professional"
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
    },
    icon: {
      source: "/M..svg"
    }
  },

  content: {},

  build: {}
};
