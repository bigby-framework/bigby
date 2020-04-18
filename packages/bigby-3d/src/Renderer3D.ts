import { Behavior } from "@bigby/core";

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
  }

  awake() {}

  lateUpdate() {
    // this.scene?.render();
  }

  editorLateUpdate() {
    // this.scene?.render();
  }
}

export default Renderer3D;
