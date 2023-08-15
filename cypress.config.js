const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'k6ahvk',
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    projectId: "orangehrm4.5",
    specPattern: "./cypress/tests/**.*",
    baseUrl: "http://localhost/orangehrm-4.5/symfony/web/index.php"
  },
});
