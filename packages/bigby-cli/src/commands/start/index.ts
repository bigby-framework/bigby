import consola from "consola";
import webpack from "webpack";
import { webpackConfiguration } from "../../webpack/configuration";
import handler from "../../webpack/handler";

export default () => {
  consola.log("Starting Bigby development server");

  const config = webpackConfiguration();
  const compiler = webpack(config);

  compiler.watch({}, handler);
};
