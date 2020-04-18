import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { Scene } from "@babylonjs/core/scene";
import { Behavior } from "@bigby/core";

class Game3D extends Behavior<{
  canvas: HTMLCanvasElement;
  isEditing: boolean;
}> {
  static icon = "🕹";
  static displayName = "Game3D";
  static description =
    "Powers a 3D game and should be added to your top-most entity.";

  /* HTML element that will be home to us */
  private _element: HTMLElement;

  get element() {
    return this._element;
  }

  set element(element) {
    this._element = element;
    this.initializeElement();
  }

  /* Scene */
  scene: Scene;

  /* Other private stuff we'll need */
  private canvas: HTMLCanvasElement;
  private engine: Engine;

  awake() {
    /* Default to #bigby element if none is given */
    if (!this.element) this.element = document.getElementById("bigby");

    /* Create a canvas element */
    this.canvas = document.createElement("canvas");

    /* Create our renderer */
    this.engine = new Engine(this.canvas, true);
    this.initializeElement();

    /* Create our scene */
    this.scene = new Scene(this.engine);

    /* Create an editor camera */
    const camera = new FreeCamera(
      "camera1",
      new Vector3(0, 5, -10),
      this.scene
    );
    camera.setTarget(Vector3.Zero());
    camera.attachControl(this.canvas, false);

    /* Automatically resize renderer when window is resized */
    window.addEventListener("resize", this.engine.resize);
  }

  lateUpdate() {
    /* If we have a scene, render it. */
    this.scene?.render();
  }

  private initializeElement() {
    if (this.element && this.canvas) {
      this.element.appendChild(this.canvas);
      this.engine.resize();
    }
  }
}

export default Game3D;
