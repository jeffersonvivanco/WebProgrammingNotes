/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "karma",
  coverageAnalysis: "perTest",
  karma: {
    projectType: "custom",
    configFile: "karma.conf.js",
    config: {},
  },
};
