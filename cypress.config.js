const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fhkhzy',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "nuxt",
      bundler: "webpack",
    },
  },
});
