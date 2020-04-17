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

  awake() {
    const engine = new BABYLON.Engine(this.canvas, true);

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      scene
    );

    camera.setTarget(BABYLON.Vector3.Zero());

    camera.attachControl(this.canvas, false);

    new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    const sphere = BABYLON.Mesh.CreateSphere(
      "sphere1",
      16,
      2,
      scene,
      false,
      BABYLON.Mesh.FRONTSIDE
    );

    sphere.position.y = 1;

    BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene, false);

    let lastTime = Date.now();
    engine.runRenderLoop(() => {
      /* Calculate deltaTime */
      const newTime = Date.now();
      const deltaMs = clamp(newTime - lastTime, 0, 1000);
      const deltaTime = deltaMs / 1000;
      lastTime = newTime;

      /* Tell our entity to update */
      this.entity.update(deltaTime);

      /* Render scene */
      scene.render();
    });

    /* Automatically resize renderer when window is resized */
    window.addEventListener("resize", engine.resize);
  }
}

export default Game3D;
