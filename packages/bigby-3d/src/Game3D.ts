import { Behavior } from "@bigby/core";
import * as BABYLON from "babylonjs";

class Game3D extends Behavior {
  static icon = "🕹";
  static displayName = "Game3D";
  static description =
    "Powers a 3D game and should be added to your top-most entity.";

  /* Canvas element we'll use for rendering */
  canvas: HTMLCanvasElement;

  awake() {
    const engine = new BABYLON.Engine(this.canvas, true);
  }
}

export default Game3D;
