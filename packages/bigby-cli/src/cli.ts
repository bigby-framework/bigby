import { program } from "commander";
import consola from "consola";
import pkg from "./pkg";

program.version(pkg.version);
program
  .command("start")
  .description("Starts the Bigby development server and runs your game")
  .action(() => {
    consola.log("Starting server!");
  });

export const run = () => {
  program.parse(process.argv);
};
