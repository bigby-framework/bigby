import consola from "consola";
import webpack from "webpack";
import * as configuration from "../webpack/configuration";
import handler from "../webpack/handler";
import ora from "ora";

export default ({ production = false, analyze = false }) => {
  consola.info("Building Bigby game");
  const spinner = ora("Building...").start();

  /* Build game */
  const config = configuration.create();

  /* Set mode */
  configuration.setProduction(config, production);

  /* Enable analyzer */
  if (analyze) configuration.enableAnalyzer(config);

  /* Compile! */
  const compiler = webpack(config);
  compiler.run(handler);

  /* Done */
  spinner.stop();
};
