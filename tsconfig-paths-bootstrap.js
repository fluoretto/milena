const tsConfigPaths = require("tsconfig-paths");

const baseUrl = "./build"; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
  baseUrl,
  paths: {
    "*": ["node_modules/*"],
    "@root/*": ["./*"],
  },
});
