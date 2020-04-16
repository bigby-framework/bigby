import { Entity } from "@bigby/core";
import Ship from "./Ship";

/* Let's create a class representing the game's main scene. */

class MainScene extends Entity {
  constructor() {
    super("Main Scene");

    this.addChild(new Ship({ position: { x: 200, y: 200 }, rotSpeed: 120 }));
    this.addChild(new Ship({ position: { x: 400, y: 300 }, rotSpeed: -250 }));
    this.addChild(new Ship({ position: { x: 200, y: 400 }, rotSpeed: -250 }));
  }
}

export default MainScene;
