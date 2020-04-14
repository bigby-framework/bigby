import path from "path";
import webpack from "webpack";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

export const create = () => {
  const cwd = process.cwd();

  return <webpack.Configuration>{
    // entry: path.resolve(__dirname, "../entrypoint.js"),
    entry: path.resolve(cwd, "./game/index.ts"),
    mode: "development",
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
        "~": path.resolve(cwd, "./game"),
      },
    },
    plugins: [
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
  };
};
