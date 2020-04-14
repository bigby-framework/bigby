import consola from "consola";
import webpack from "webpack";
import { webpackConfiguration } from "../../webpack/configuration";

export default () => {
  consola.log("Building Bigby game");

  const config = webpackConfiguration();
  const compiler = webpack(config);

  compiler.run((err, stats) => {
    if (err) consola.error(err);
    else consola.log(stats.toJson());
  });
};