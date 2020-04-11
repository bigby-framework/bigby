import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es", // the preferred format
    },
  ],
  plugins: [
    typescript({ tsconfig: "tsconfig.build.json" }),
    postcss({
      modules: true,
      // extract: true,
      plugins: [],
    }),
  ],
  external: [
    "normalize.css",
    "react",
    "@bigby/core",
    "@bigby/2d",
    "lodash",
    "hotkeys-js",
    "@fortawesome/free-solid-svg-icons",
    "@fortawesome/react-fontawesome",
    "classnames",
  ],
};
