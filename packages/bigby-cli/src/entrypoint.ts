/* This is the main entrypoint used by the Webpack configuration embedded in this package. */

import { startEditor } from "@bigby/editor";

/* Load the game's root object from the project's `./game` directory. */
const game = require("/Users/hmans/src/bigby/packages/bigby-cli/example/game");

/* Start the Bigby Editor UI with the game we've just set up */
startEditor(game.default, document.getElementById("app"));
