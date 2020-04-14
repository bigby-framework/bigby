/* This is the main entrypoint used by the Webpack configuration embedded in this package. */

import { startEditor } from "@bigby/editor";

/* Import the game */
import game from "~/game";

/* Start the Bigby Editor UI with the game we've just set up */
startEditor(game, document.getElementById("app"));
