const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: `${__dirname}/src/index.tsx`,
  output: {
    path: `${__dirname}/build`,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.json'
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
      contentBase: `${__dirname}/build`,
      port: "8888",
      historyApiFallback: { disableDotRule: true }
  }
};
