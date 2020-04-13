/* The purpose of this package is to provide a big object containing
everything needed to build 2D games using Bigby. For this reason, we'll mix in
the exports of the most important libraries at the top level: */
export * from "@bigby/core";
export * from "@bigby/2d";
export * from "@bigby/2d-physics";

/* ...and provide properties for some of the helper modules: */
import * as random from "@bigby/random";
export { random };

import * as math from "@bigby/math";
export { math };
