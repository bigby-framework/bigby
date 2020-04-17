import path from "path";
import webpack from "webpack";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
import fs from "fs";

export const create = () => {
  const cwd = process.cwd();

  /* Which files and directories should we copy over? */
  const directoryExists = (name: string) =>
    fs.existsSync(path.resolve(cwd, name));

  let copyObjects = new Array<any>();
  if (directoryExists("assets"))
    copyObjects.push({ from: "assets", to: "assets" });

  /* Return a webpack configuration object */
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
      new CopyPlugin(copyObjects),
      new HtmlWebpackPlugin({
        title: "Bigby Game",
        template: require("html-webpack-template"),
        headHtmlSnippet:
          "<style>html, body {width: 100%; height: 100%; overflow: hidden; margin: 0; padding: 0} div#bigby { position: fixed; width: 100%; height: 100%; overflow: hidden } canvas { width: 100%; height: 100% }</style>",
        appMountId: "bigby",
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

export const enableAnalyzer = (config: webpack.Configuration) => {
  config.plugins.push(new BundleAnalyzerPlugin());
};
