import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "src.test/index.ts",
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
  plugins: [typescript({ tsconfig: "tsconfig.build.json" })],
};
