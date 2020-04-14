import { program } from "commander";
import pkg from "./pkg";
import commands from "./commands";
import banner from "./banner";

program.version(pkg.version);

program
  .command("dev")
  .option("-p, --port <port>", "Port to bind to (default: 4000)")
  .option("-b, --bind <host>", "Host to bind to (default: localhost)")
  .option("-o, --open", "Open the game in your browser")
  .option("-d, --debug", "Print extra build statistics")
  .description("Starts the Bigby development server and runs your game")
  .action(commands.dev);

program
  .command("build")
  .option("-p, --production", "Build for production")
  .description("Builds your game for publishing")
  .action(commands.build);

export const run = () => {
  banner();
  program.parse(process.argv);
};
