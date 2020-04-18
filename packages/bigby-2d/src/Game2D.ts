import { Behavior, inspect } from "@bigby/core";
import * as PIXI from "pixi.js";
import Renderable2D from "./Renderable2D";

export default class Game2D extends Behavior {
  static icon = "🕹";
  static displayName = "Game2D";
  static description =
    "Powers a 2D game and should be added to your top-most entity.";

  app: PIXI.Application;

  /* Element */
  private _element: HTMLElement;

  get element() {
    return this._element;
  }

  set element(el) {
    this._element = el;
    this.initializeElement();
  }

  /* Properties */
  backgroundColor = 0x000000;

  awake() {
    /* If no HTML element has been specified at this point, let's look for #bigby */
    if (!this.element) this.element = document.getElementById("bigby");

    /* Create a PIXI application */
    this.app = new PIXI.Application({
      backgroundColor: this.backgroundColor,
      autoStart: false,
      antialias: true,
    });

    this.initializeElement();

    /* Find our Renderable2D and add its container to our stage */
    const r2d = this.getBehavior(Renderable2D);
    this.app.stage.addChild(r2d.container);

    /* Set up ticker */
    this.app.ticker.add(() => {
      const dt = this.app.ticker.deltaMS / 1000;

      if (this.isEditing) {
        this.entity.editorUpdate(dt);
      } else {
        this.entity.update(dt);
      }
    });

    /* Start the game */
    this.app.start();
  }

  private initializeElement() {
    if (this.app && this.element) {
      this.app.resizeTo = this.element;
      this.element.appendChild(this.app.view);
    }
  }
}
