import consola from "consola";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import * as configuration from "../webpack/configuration";

export default ({ bind = "localhost", port = 4000, open = false }) => {
  consola.info(`Starting Bigby development server at http://${bind}:${port}`);

  const config = configuration.create();
  const compiler = webpack(config);

  const options = {
    open,
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    contentBase: "www",
    stats: { colors: true },
    overlay: true,
  };

  const server = new WebpackDevServer(compiler, options);
  server.listen(port, bind);
};
