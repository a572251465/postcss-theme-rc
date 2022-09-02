const path = require("path");
const del = require("rollup-plugin-del");
const ts = require("@rollup/plugin-typescript");

const resolvePath = (...urls) => path.resolve(__dirname, ...urls);

module.exports = {
  input: resolvePath("src/index.ts"),
  output: [
    {
      file: resolvePath("lib/index.cjs.js"),
      format: "cjs",
      exports: "default"
    },
    {
      file: resolvePath("lib/index.esm.js"),
      format: "esm"
    }
  ],
  plugins: [ts(), del()]
};
