import consola from "consola";
import webpack from "webpack";

export default () => {
  consola.log("Starting Bigby development server");

  const compiler = webpack({});

  compiler.watch({}, (err, stats) => {
    if (err) consola.error(err);
  });
};
