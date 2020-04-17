import { Behavior } from "@bigby/core";
import { clamp } from "@bigby/math";
import * as BABYLON from "babylonjs";

class Game3D extends Behavior<{ canvas: HTMLCanvasElement }> {
  static icon = "🕹";
  static displayName = "Game3D";
  static description =
    "Powers a 3D game and should be added to your top-most entity.";

  /* Canvas element we'll use for rendering */
  canvas: HTMLCanvasElement;

  scene: BABYLON.Scene;

  awake() {
    const engine = new BABYLON.Engine(this.canvas, true);

    this.scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      this.scene
    );

    camera.setTarget(BABYLON.Vector3.Zero());

    camera.attachControl(this.canvas, false);

    new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );

    const sphere = BABYLON.Mesh.CreateSphere(
      "sphere1",
      16,
      4,
      this.scene,
      false,
      BABYLON.Mesh.FRONTSIDE
    );

    sphere.position.y = 1;

    BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, this.scene, false);

    /* Automatically resize renderer when window is resized */
    window.addEventListener("resize", engine.resize);
  }

  lateUpdate() {
    this.scene?.render();
  }
}

export default Game3D;
