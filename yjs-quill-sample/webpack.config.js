const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    quill: "./quill.js",
  },
  output: {
    globalObject: "self",
    path: path.resolve(__dirname, "./dist/"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
};
