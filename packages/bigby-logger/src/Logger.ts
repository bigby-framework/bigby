import { Behavior } from "@bigby/core";

export default class Logger extends Behavior {
  private withColor(label: string, styles: string, ...output: unknown[]) {
    return [`%c ${label} %c`, `${styles}`, "", ...output];
  }

  debug(...output: unknown[]) {
    console.debug(
      ...this.withColor(
        "DEBUG",
        "background-color: purple; color: white;",
        ...output
      )
    );
  }

  info(...output: unknown[]) {
    console.info(
      ...this.withColor(
        "INFO",
        "background-color: green; color: white;",
        ...output
      )
    );
  }

  warn(...output: unknown[]) {
    console.warn(
      ...this.withColor(
        "WARN",
        "background-color: orange; color: white;",
        ...output
      )
    );
  }

  error(...output: unknown[]) {
    console.error(
      ...this.withColor(
        "ERROR",
        "background-color: red; color: white;",
        ...output
      )
    );
  }
}
