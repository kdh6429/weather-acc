// jest-puppeteer.config.js
module.exports = {
  server: {
    command: `yarn start`,
    port: 3001,
    launchTimeout: 20000,
    debug: true,
  },
}
