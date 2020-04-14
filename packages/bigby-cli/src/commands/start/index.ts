import consola from "consola";
import webpack from "webpack";
import { webpackConfiguration } from "../../webpack/configuration";

export default () => {
  consola.log("Starting Bigby development server");

  const config = webpackConfiguration();
  const compiler = webpack(config);

  compiler.watch({}, (err, stats) => {
    if (err) consola.error(err);
    else consola.info(stats.toJson);
  });
};