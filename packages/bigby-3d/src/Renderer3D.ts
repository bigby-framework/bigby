import { Behavior } from "@bigby/core";
import Transform3D from "./Transform3D";
import { Scene, PerspectiveCamera, WebGLRenderer, Camera } from "three";

class Renderer3D extends Behavior<{
  canvas: HTMLCanvasElement;
  isEditing: boolean;
}> {
  static icon = "🕹";
  static displayName = "Renderer3D";
  static description =
    "Powers a 3D game and should be added to your top-most entity.";

  /* HTML element that will be home to us */
  private _element: HTMLElement;

  get element() {
    return this._element;
  }

  set element(element) {
    /* Assign */
    this._element = element;

    /* Reset renderer size */
    this.renderer.setSize(element.clientWidth, element.clientHeight);

    /* Move renderer DOM element */
    this.element.appendChild(this.renderer.domElement);

    /* TODO: reset camera aspect ratio */
  }

  /* Scene */
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;

  awake() {
    /* Create our scene */
    this.scene = new Scene();

    /* Create a camera */
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    /* Find our Transform3D and add it to the scene */
    const t3d = this.getBehavior(Transform3D);
    this.scene.add(t3d.group);

    /* Create a renderer */
    this.renderer = new WebGLRenderer();

    /* Set the element (so we can launch the renderer) */
    this.element = this.element || document.getElementById("bigby");
  }

  lateUpdate() {
    this.render();
  }

  editorLateUpdate() {
    this.render();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default Renderer3D;
