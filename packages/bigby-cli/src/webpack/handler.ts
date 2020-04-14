import webpack from "webpack";
import consola from "consola";

const handler: webpack.ICompiler.Handler = (err, stats) => {
  if (err) {
    consola.error(err);
  } else {
    const json = stats.toJson();

    // For debugging
    // consola.info(json);

    if (!stats.hasErrors() && !stats.hasWarnings()) {
      consola.success(`Built the game (${json.time}ms), things are good.`);
    } else {
      /* If there are warnings, show them. */
      if (stats.hasWarnings()) {
        json.warnings.forEach((warning) => {
          consola.warn(warning);
        });
      }

      /* If there are errors, show them, then exit the process. */
      if (stats.hasErrors()) {
        json.errors.forEach((error) => {
          consola.error(error);
        });

        process.exit(1);
      }
    }
  }
};

export default handler;
