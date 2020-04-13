const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "~": path.resolve(__dirname, "../src"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "assets", to: "assets" }]),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      title: "Bigby Sample Game",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
