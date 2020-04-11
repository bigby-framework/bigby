// webpack.config.js
var path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TypedCssModulesPlugin } = require("typed-css-modules-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.ts"),

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
        ],
      },
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
    new TypedCssModulesPlugin({
      globPattern: "src/**/*.css",
    }),
  ],

  externals: {
    react: "commonjs react",
  },
};
