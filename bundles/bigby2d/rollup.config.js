import typescript from "rollup-plugin-typescript2";
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
      format: "es",
    },
  ],
  watch: {
    clearScreen: false,
  },
  plugins: [typescript({ tsconfig: "tsconfig.build.json" })],
  external: [
    "@bigby/core",
    "@bigby/2d",
    "@bigby/2d-physics",
    "@bigby/random",
    "@bigby/math",
  ],
};
