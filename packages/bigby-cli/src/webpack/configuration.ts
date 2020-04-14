import path from "path";
import webpack from "webpack";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");

export const create = () => {
  const cwd = process.cwd();

  return <webpack.Configuration>{
    context: path.resolve(cwd),
    entry: path.resolve(__dirname, "../entrypoint.js"),
    mode: "development",
    devtool: "inline-source-map",
    output: {
      path: path.resolve(cwd, "./dist"),
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
        "@": cwd,
      },
    },
    plugins: [
      new WebpackBar(),
      new CleanWebpackPlugin(),
      new CopyPlugin([{ from: "assets", to: "assets" }]),
      new HtmlWebpackPlugin({
        title: "Bigby Game",
        template: require("html-webpack-template"),
        appMountId: "app",
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    performance: {
      maxEntrypointSize: 1000000,
      maxAssetSize: 1000000,
    },
  };
};

export const setProduction = (
  config: webpack.Configuration,
  production = false
) => {
  config.mode = production ? "production" : "development";
  config.devtool = production ? false : "inline-source-map";
};
