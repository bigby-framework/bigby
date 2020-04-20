import { Entity } from "@bigby/core";
import PlayerShip from "./PlayerShip";

/* Let's create a class representing the game's main scene. */

class MainScene extends Entity {
  constructor() {
    super("Main Scene");

    this.addChild(new PlayerShip({ position: { x: 100, y: 200 } }));
    this.addChild(new PlayerShip({ position: { x: 200, y: 300 } }));
  }
}

export default MainScene;
