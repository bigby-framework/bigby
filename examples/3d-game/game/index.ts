import { Game3D } from "@bigby/3d";
import { Entity } from "@bigby/core";
import { Ticker } from "@bigby/behaviors";

const game = new Entity();
game.addBehavior(Ticker);
game.addBehavior(Game3D);

export default game;
