import { inspect, Behavior } from "@bigby/core";
import * as PIXI from "pixi.js";

export default class TilingSprite2D extends Behavior<{
  bounds: { width: number; height: number };
}> {
  static icon = "🚀";
  static displayName = "TilingSprite2D";
  static description =
    "Renders a tiling 2D sprite. The specified texture is repeated across the dimensions of this sprite.";

  /* Texture URI */
  @inspect("Texture URI")
  get uri() {
    return this._uri;
  }
  set uri(uri) {
    this._uri = uri;
    this.createSprite(PIXI.Texture.from(uri));
  }
  private _uri: string;

  @inspect("Size", ["width", "height"])
  bounds = { width: 500, height: 500 };

  @inspect("Tile Scale", ["x", "y"])
  tileScale = { x: 1, y: 1 };

  private sprite: PIXI.TilingSprite;

  createSprite(texture: PIXI.Texture) {
    if (this.sprite) this.sprite.destroy();

    this.sprite = new PIXI.TilingSprite(
      texture,
      this.bounds.width,
      this.bounds.height
    );
  }

  update() {
    if (!this.sprite) return;

    this.sprite.width = this.bounds.width;
    this.sprite.height = this.bounds.height;
    this.sprite.tileScale.set(this.tileScale.x, this.tileScale.y);
  }
}
