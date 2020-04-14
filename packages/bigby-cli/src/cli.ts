import { program } from "commander";
import consola from "consola";
import pkg from "./pkg";

program.version(pkg.version);

export const run = () => {
  consola.info("hi from consola");
  consola.info(pkg.version);
};
