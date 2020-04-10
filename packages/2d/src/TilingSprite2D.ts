import { Sprite2D } from "./Sprite2D";
import * as PIXI from "pixi.js";
import { inspect } from "@bigby/core";

export class TilingSprite2D extends Sprite2D<{
  bounds: { width: number; height: number };
}> {
  static displayName = "TilingSprite2D";
  static description =
    "Renders a tiling 2D sprite. The specified texture is repeated across the dimensions of this sprite.";

  @inspect("Size", ["width", "height"])
  bounds = { width: 500, height: 500 };

  @inspect("Tile Scale", ["x", "y"])
  tileScale = { x: 1, y: 1 };

  protected sprite: PIXI.TilingSprite;

  createSpriteFromTexture() {
    return new PIXI.TilingSprite(
      this.texture,
      this.bounds.width,
      this.bounds.height
    );
  }

  update() {
    this.sprite.width = this.bounds.width;
    this.sprite.height = this.bounds.height;
    this.sprite.tileScale.set(this.tileScale.x, this.tileScale.y);
  }
}
