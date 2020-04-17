import { Entity } from "@bigby/core";
import { Game3D } from "@bigby/3d";
import { Ticker } from "@bigby/behaviors";

import "./index.css";

const canvas = document.getElementById("game") as HTMLCanvasElement;

const game = new Entity();
game.addBehavior(Ticker);
game.addBehavior(Game3D);
game.getBehavior(Game3D).canvas = canvas;

// console.log(game);

game.awake();
