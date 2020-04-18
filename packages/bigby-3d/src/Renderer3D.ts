import { Behavior } from "@bigby/core";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Camera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshNormalMaterial,
  Vector3,
} from "three";

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
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.element.appendChild(this.renderer.domElement);
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

    {
      /* Add some dummy stuff */
      var geometry = new BoxGeometry();
      var mat = new MeshNormalMaterial({});
      var cube = new Mesh(geometry, mat);
      this.scene.add(cube);
      cube.position.add(new Vector3(3, 1, 0.2));
      this.camera.position.z = 5;
    }

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
