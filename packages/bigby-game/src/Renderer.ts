import { Behavior } from "@bigby/core";
import { Application } from "pixi.js";

export default class Renderer extends Behavior {
  width = 1280;
  height = 720;

  app?: Application;
  domElement = document.body;

  awake() {
    this.app = new Application({ width: this.width, height: this.height });
    this.domElement.appendChild(this.app.view);
  }

  destroy() {
    if (this.app) {
      this.domElement.removeChild(this.app.view);
      this.app.destroy();
    }
  }
}
