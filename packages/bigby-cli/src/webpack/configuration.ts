import path from "path";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

export const webpackConfiguration = () => {
  const cwd = process.cwd();

  return {
    entry: path.resolve(cwd, "./game/index.js"),
    mode: "development",
    output: {
      path: path.resolve(cwd, "./dist"),
      filename: "[name].bundle.js",
    },
    // module: {
    //   rules: [
    //     { test: /\.tsx?$/, use: "ts-loader" },
    //     { test: /\.css$/, use: ["style-loader", "css-loader"] },
    //   ],
    // },
    resolve: {
      extensions: [".js"],
      alias: {
        "~": path.resolve(cwd, "./game"),
      },
    },
    plugins: [
      // new CleanWebpackPlugin(),
      // new CopyPlugin([{ from: "assets", to: "assets" }]),
      new HtmlWebpackPlugin({
        title: "Bigby Game",
      }),
    ],
    // optimization: {
    //   splitChunks: {
    //     chunks: "all",
    //   },
    // },
  };
};
