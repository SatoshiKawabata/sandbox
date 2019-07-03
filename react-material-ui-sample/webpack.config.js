const HtmlWebpackPlugin = require("html-webpack-plugin");

const PAGES = [
  "index.html",
  "page1/index.html",
  "page2/index.html",
  "subPage/index.html"
];

module.exports = {
  mode: "development",
  entry: `${__dirname}/src/index.tsx`,
  output: {
    path: `${__dirname}/build`,
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  plugins: [
    ...PAGES.map(page => {
      return new HtmlWebpackPlugin({
        template: `${__dirname}/src/index.html`,
        filename: page,
        inject: "body"
      });
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: `${__dirname}/build`,
    port: "8888"
  }
};
