import typescript from "rollup-plugin-typescript";
import html from "@rollup/plugin-html";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;
const development = !production;

export default {
  input: "./src/index.tsx",
  output: {
    file: "dist/bundle.js",
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    typescript(),
    html(),
    development && serve("dist"),
    development && livereload(),
    production && terser(),
    // resolve(), // tells Rollup how to find date-fns in node_modules
    // commonjs(), // converts date-fns to ES modules
    // production && terser() // minify, but only in production
  ],
};
