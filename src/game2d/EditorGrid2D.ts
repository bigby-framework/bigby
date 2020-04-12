import { Behavior, inspect } from "../core";
import { Game2D, Renderable2D, UI2D } from ".";
import { Graphics } from "pixi.js";
import { ViewportController2D } from "./ViewportController2D";

export class EditorGrid2D extends Behavior {
  static displayName = "EditorGrid2D";
  static icon = "🚧";
  static description = "Renders a grid during edit mode.";

  private _gridSize = 100;
  @inspect() get gridSize() {
    return this._gridSize;
  }
  set gridSize(v) {
    this._gridSize = v;
    this.drawGrid();
  }

  private game2D: Game2D;
  private ui2d: UI2D;
  private vc2D: ViewportController2D;
  private r2d: Renderable2D;
  private graphics: Graphics;

  private worldGridSize = this.gridSize;

  awake() {
    this.game2D = this.getBehavior(Game2D);
    this.ui2d = this.getBehavior(UI2D);
    this.vc2D = this.getBehavior(ViewportController2D);
    this.r2d = this.getBehavior(Renderable2D);

    /* Set up graphics */
    this.graphics = new Graphics();
    this.ui2d.container.addChild(this.graphics);
    this.drawGrid();

    this.vc2D.onZoom(() => {
      this.drawGrid();
    });
  }

  editorUpdate() {
    this.graphics.position.set(
      (this.r2d.position.x % this.worldGridSize) - this.worldGridSize,
      (this.r2d.position.y % this.worldGridSize) - this.worldGridSize
    );
  }

  drawGrid() {
    /* Update world grid size */
    this.worldGridSize = this.gridSize * this.vc2D.scale;
    while (this.worldGridSize < 50) this.worldGridSize *= 2;
    while (this.worldGridSize > 200) this.worldGridSize /= 2;

    /* Draw the grid */
    this.graphics.clear();
    this.graphics.lineStyle(2, 0xcccccc, 0.1);

    const worldSize = this.worldGridSize;

    const width = this.game2D.app.view.width + worldSize * 2;
    const height = this.game2D.app.view.height + worldSize * 2;

    for (let x = 0; x <= width; x += worldSize) {
      this.graphics.moveTo(x, 0);
      this.graphics.lineTo(x, height);
    }

    for (let y = 0; y <= height; y += worldSize) {
      this.graphics.moveTo(0, y);
      this.graphics.lineTo(width, y);
    }

    /* draw crosses */
    this.graphics.lineStyle(2, 0xcccccc, 0.2);
    for (let x = 0; x <= width; x += worldSize) {
      for (let y = 0; y <= height; y += worldSize) {
        this.graphics.moveTo(x, y - 5);
        this.graphics.lineTo(x, y + 5);
        this.graphics.moveTo(x - 5, y);
        this.graphics.lineTo(x + 5, y);
      }
    }
  }
}
