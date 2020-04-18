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
    this._element = element;
    this.resetRenderer();
  }

  /* Scene */
  scene: Scene;
  camera: PerspectiveCamera;
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
    this.camera.position.z = 10;

    /* Find our Transform3D and add it to the scene */
    const t3d = this.getBehavior(Transform3D);
    this.scene.add(t3d.group);

    /* Create a renderer */
    this.renderer = new WebGLRenderer();

    /* Set the element (so we can launch the renderer) */
    this.element = this.element || document.getElementById("bigby");

    /* Automatically reset the renderer when window size changes */
    window.onresize = () => this.resetRenderer();
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

  private resetRenderer() {
    if (!this.renderer || !this.element) {
      console.debug(
        "Renderer3D tried to reset, but didn't have renderer or element"
      );
      return;
    }

    /* Reset renderer size */
    this.renderer.setSize(this.element.clientWidth, this.element.clientHeight);

    /* Move renderer DOM element */
    this.element.appendChild(this.renderer.domElement);

    /* Reset camera aspect ratio */
    this.camera.aspect = this.element.clientWidth / this.element.clientHeight;
    this.camera.updateProjectionMatrix();
  }
}

export default Renderer3D;
