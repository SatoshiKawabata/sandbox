import path from "path";
import config from "./webpack.config";
import merge from "webpack-merge";
const ExtensionReloader = require("webpack-extension-reloader");

export default merge(config, {
  mode: "development",
  watch: true,
  entry: {
    contents: "./src/contents.tsx",
    background: "./src/background.ts",
  },
  plugins: [
    new ExtensionReloader({
      manifest: path.resolve(__dirname, "./public/manifest.json"),
      port: 3001,
      reloadPage: true,
      entries: {
        contentScript: "contents",
        background: "background",
      },
    }),
  ],
});
