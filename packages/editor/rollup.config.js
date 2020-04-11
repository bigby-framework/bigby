import typescript from "rollup-plugin-typescript2";

export default {
  input: "src.test/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [typescript({ tsconfig: "tsconfig.build.json" })],
};
