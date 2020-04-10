import * as PIXI from "pixi.js";
import { Behavior, inspect } from "@bigby/core";
import { Renderable2D } from "./Renderable2D";

export class Game2D extends Behavior {
  static icon = "🕹";
  static displayName = "Game2D";
  static description =
    "Powers a 2D game and should be added to your top-most entity.";

  app: PIXI.Application;
  element: HTMLElement;

  /* Properties */
  backgroundColor = 0x000000;

  private _isEditing = false;

  @inspect()
  get isEditing() {
    return this._isEditing;
  }
  set isEditing(v) {
    this._isEditing = v;
    v ? this.entity.enterEditMode() : this.entity.enterPlayMode();
  }

  awake() {
    /* Create a PIXI application */
    this.app = new PIXI.Application({
      backgroundColor: this.backgroundColor,
      resizeTo: this.element,
      autoStart: false,
      antialias: true,
    });

    this.element.appendChild(this.app.view);

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

    /* Give everyone a chance to run enterEditMode and enterPlayMode functions */
    this.isEditing ? this.entity.enterEditMode() : this.entity.enterPlayMode();
  }
}
