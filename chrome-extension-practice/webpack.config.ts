import { Configuration } from "webpack";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: Configuration = {
  entry: {
    contents: path.join(__dirname, "src", "contents.tsx"),
    popup: path.join(__dirname, "src", "popup.tsx"),
    background: "./src/background.ts",
    index: "./src/index.tsx",
  },
  output: {
    // distディレクトリにcontent_scripts.jsを吐く
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /.ts|.tsx$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    // publicディレクトリにあるファイルをdistディレクトリにコピーする
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
};

export default config;
