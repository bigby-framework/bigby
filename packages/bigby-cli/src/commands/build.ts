import consola from "consola";
import webpack from "webpack";
import * as configuration from "../webpack/configuration";
import handler from "../webpack/handler";
import ora from "ora";

export default () => {
  consola.info("Building Bigby game");
  const spinner = ora("Building...").start();

  /* Build game */
  const config = configuration.create();
  const compiler = webpack(config);
  compiler.run(handler);

  /* Done */
  spinner.stop();
};
