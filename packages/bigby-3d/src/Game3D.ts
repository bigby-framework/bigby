import { Ticker } from "@bigby/behaviors";
import { Behavior, Entity, inspect } from "@bigby/core";
import * as BABYLON from "babylonjs";
import { BabylonFileLoaderConfiguration } from "babylonjs";

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
  private _element: HTMLElement;

  get element() {
    return this._element;
  }

  set element(element) {
    this._element = element;
    this.initializeElement();
  }

  /* Scene */
  scene: BABYLON.Scene;

  /* Other private stuff we'll need */
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;

  awake() {
    /* Default to #bigby element if none is given */
    if (!this.element) this.element = document.getElementById("bigby");

    /* Create a canvas element */
    this.canvas = document.createElement("canvas");
    this.engine = new BABYLON.Engine(this.canvas, true);

    this.initializeElement();

    this.scene = new BABYLON.Scene(this.engine);

    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      this.scene
    );

    camera.setTarget(BABYLON.Vector3.Zero());

    camera.attachControl(this.canvas, false);

    /* Automatically resize renderer when window is resized */
    window.addEventListener("resize", this.engine.resize);

    /* Connect to Ticker and set it up to tick the game */
    this.getBehavior(Ticker).onTick((dt) => {
      this.entity.update(dt);
    });
  }

  lateUpdate() {
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
