import { program } from "commander";
import pkg from "./pkg";
import commands from "./commands";

program.version(pkg.version);
program
  .command("start")
  .description("Starts the Bigby development server and runs your game")
  .action(commands.start);

program
  .command("build")
  .description("Builds your game for publishing")
  .action(commands.build);

export const run = () => {
  program.parse(process.argv);
};
