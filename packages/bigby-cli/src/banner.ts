import consola from "consola";
import pkg from "./pkg";

export default () => {
  consola.info(`Bigby ${pkg.version}`);
};
