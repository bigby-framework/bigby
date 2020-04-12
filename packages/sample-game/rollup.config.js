import typescript from "rollup-plugin-typescript";
import html from "@rollup/plugin-html";

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
    // resolve(), // tells Rollup how to find date-fns in node_modules
    // commonjs(), // converts date-fns to ES modules
    // production && terser() // minify, but only in production
  ],
};
