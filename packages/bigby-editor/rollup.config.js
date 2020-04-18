import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    // {
    //   file: pkg.module,
    //   format: "es", // the preferred format
    // },
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
  watch: {
    clearScreen: false,
  },
  plugins: [
    typescript(),
    postcss({
      modules: true,
      // extract: true,
      plugins: [],
    }),
  ],
  external: [
    "normalize.css",
    "react",
    "react-dom",
    "@bigby/core",
    "lodash",
    "hotkeys-js",
    "@fortawesome/free-solid-svg-icons",
    "@fortawesome/react-fontawesome",
    "classnames",
  ],
};
