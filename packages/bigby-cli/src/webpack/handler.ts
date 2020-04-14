import webpack from "webpack";
import consola from "consola";

export const showStats = (stats: webpack.Stats, quitOnError = true) => {
  const json = stats.toJson();

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

    if (quitOnError) process.exit(1);
  }

  consola.success(`Build completed in ${json.time}ms`);
};

const handler: webpack.ICompiler.Handler = (err, stats) => {
  if (err) {
    consola.error(err);
  } else {
    showStats(stats);
  }
};

export default handler;
