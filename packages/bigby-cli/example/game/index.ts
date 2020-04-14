import game from "./game";
import ship from "./ship";

/* Set up game */
const root = game.create("Bigby Sample Game");
root.addChild(ship.create({ position: { x: 200, y: 200 }, rotSpeed: 120 }));
root.addChild(ship.create({ position: { x: 400, y: 300 }, rotSpeed: -250 }));
root.addChild(ship.create({ position: { x: 200, y: 400 }, rotSpeed: -250 }));

export default root;
