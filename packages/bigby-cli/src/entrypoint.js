/* This is the main entrypoint used by the Webpack configuration embedded in this package. */

import { start2DEditor } from "@bigby/2d-editor";

/* Import the game */
import game from "@/game";

/* Start the Bigby Editor UI with the game we've just set up */
start2DEditor(game, document.getElementById("app"));
