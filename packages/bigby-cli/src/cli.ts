import { program } from "commander";
import pkg from "./pkg";
import commands from "./commands";

program.version(pkg.version);
program
  .command("dev")
  .option("-p, --port <port>", "Port to bind to (default: 4000)")
  .option("-b, --bind <host>", "Host to bind to (default: localhost)")
  .description("Starts the Bigby development server and runs your game")
  .action(commands.dev);

program
  .command("build")
  .description("Builds your game for publishing")
  .action(commands.build);

export const run = () => {
  program.parse(process.argv);
};
