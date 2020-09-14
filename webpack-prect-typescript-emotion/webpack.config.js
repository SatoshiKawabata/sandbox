module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
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
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.json'
    ],
    alias: {
       react: 'preact/compat',
    }
  },
  devServer: {
      contentBase: "./build",
      port: "8888"
  }
};
