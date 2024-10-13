const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  // e2e: {
  //   devServer: {
  //     framework: "create-react-app",
  //     bundler: "webpack",
  //   },
  // },
  // include: ["cypress", "src"],
});
