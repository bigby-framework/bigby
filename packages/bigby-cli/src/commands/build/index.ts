import consola from "consola";
import webpack from "webpack";
import { webpackConfiguration } from "../../webpack/configuration";
import handler from "../../webpack/handler";

export default () => {
  consola.log("Building Bigby game");

  const config = webpackConfiguration();
  const compiler = webpack(config);

  compiler.run(handler);
};
