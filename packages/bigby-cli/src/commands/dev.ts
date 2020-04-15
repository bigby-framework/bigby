import consola from "consola";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import * as configuration from "../webpack/configuration";
import { showStats } from "../webpack/handler";

export default ({
  bind = "localhost",
  port = 4000,
  open = false,
  debug = false,
}) => {
  consola.info(`Starting Bigby development server at http://${bind}:${port}`);

  const config = configuration.create();
  const compiler = webpack(config);

  /* Hook into the compiler to show build stats */
  compiler.hooks.done.tap("BigbyCLIStats", (stats) => {
    showStats(stats, false);
  });

  /* webpack-dev-server configuration */
  const options = {
    open,
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    contentBase: "www",
    stats: debug && { colors: true },
    quiet: !debug,
    overlay: true,
  } as WebpackDevServer.Configuration;

  /* Run the webpack-dev-server */
  const server = new WebpackDevServer(compiler, options);
  server.listen(port, bind);
};
