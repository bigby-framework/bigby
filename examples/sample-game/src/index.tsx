import game from "./game";
import ship from "./ship";
import { startEditor } from "@bigby/editor";

/* Set up game */
const root = game.create("Bigby Sample Game");
root.addChild(ship.create({ position: { x: 200, y: 200 }, rotSpeed: 100 }));
root.addChild(ship.create({ position: { x: 400, y: 300 }, rotSpeed: -250 }));

/* Start the Bigby Editor UI with the game we've just set up */
startEditor(document.getElementById("app"), root);
