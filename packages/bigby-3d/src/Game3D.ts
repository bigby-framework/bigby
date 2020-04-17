import { Ticker } from "@bigby/behaviors";
import { Behavior, Entity, inspect } from "@bigby/core";
import * as BABYLON from "babylonjs";

class Game3D extends Behavior<{
  canvas: HTMLCanvasElement;
  isEditing: boolean;
}> {
  static icon = "🕹";
  static displayName = "Game3D";
  static description =
    "Powers a 3D game and should be added to your top-most entity.";

  /* Editing Flag */
  private _isEditing = false;
  @inspect()
  get isEditing() {
    return this._isEditing;
  }
  set isEditing(v) {
    this._isEditing = v;
    // v ? this.entity.enterEditMode() : this.entity.enterPlayMode();
  }

  /* HTML element that will be home to us */
  element: HTMLElement;

  scene: BABYLON.Scene;

  awake() {
    /* Default to #bigby element if none is given */
    if (!this.element) this.element = document.getElementById("bigby");

    /* Create a canvas element */
    const canvas = document.createElement("canvas");
    this.element.appendChild(canvas);

    const engine = new BABYLON.Engine(canvas, true);

    this.scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      this.scene
    );

    camera.setTarget(BABYLON.Vector3.Zero());

    // camera.attachControl(this.canvas, false);

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

    /* Connect to Ticker and set it up to tick the game */
    this.getBehavior(Ticker).onTick(() => {
      this.scene.render();
    });
  }

  lateUpdate() {
    this.scene?.render();
  }
}

export default Game3D;
