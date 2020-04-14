import consola from "consola";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { webpackConfiguration } from "../../webpack/configuration";

export default () => {
  consola.info("Starting Bigby development server");

  const config = webpackConfiguration();
  const compiler = webpack(config);

  const options = {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    contentBase: "www",
    stats: { colors: true },
  };

  const server = new WebpackDevServer(compiler, options);
  server.listen(4000, "localhost");
};
