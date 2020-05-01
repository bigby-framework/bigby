import { Behavior } from "@bigby/core";
import { Application } from "pixi.js";

export default class Renderer extends Behavior {
  app?: Application;
  domElement = document.body;

  awake() {
    this.app = new Application({ resizeTo: this.domElement });
    this.domElement.appendChild(this.app.view);
  }

  destroy() {
    if (this.app) {
      this.domElement.removeChild(this.app.view);
      this.app.destroy();
    }
  }
}
