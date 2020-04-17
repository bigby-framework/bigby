import { Behavior } from "@bigby/core";
import { Container } from "pixi.js";
import { Game2D } from "./Game2D";

class UI2D extends Behavior<{ editorOnly: boolean }> {
  static displayName = "UI2D";
  static icon = "🖱";
  static description =
    "Renders any kind of UI (which is not scaled or translated alongside the rest of the game.)";

  container: Container;
  editorOnly = false;

  private game2D: Game2D;

  awake() {
    this.game2D = this.getNearestBehavior(Game2D);

    this.container = new Container();
    this.container.zIndex = 1000;
    this.game2D.app.stage.addChild(this.container);
  }

  update() {
    if (this.editorOnly && this.container.visible)
      this.container.visible = false;
  }

  editorUpdate() {
    if (this.editorOnly && !this.container.visible)
      this.container.visible = true;
  }

  destroy() {
    this.game2D.app.stage.removeChild(this.container);
  }
}

export default UI2D;
