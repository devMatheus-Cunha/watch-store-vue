const {
    defineConfig
} = require("cypress");

module.exports = defineConfig({
    projectId: 'fhkhzy',
    e2e: {
        specPattern: "./cypress/e2e",
        baseUrl: "http://localhost:3000",
    },

    component: {
        devServer: {
            framework: "nuxt",
            bundler: "webpack",
        },
    },
});