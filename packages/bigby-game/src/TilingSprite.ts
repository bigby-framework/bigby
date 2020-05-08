import * as PIXI from "pixi.js";
import Sprite from "./Sprite";

export default class TilingSprite extends Sprite {
  bounds = { width: 512, height: 512 };
  tileScale = { x: 1, y: 1 };

  protected createSprite(texture: PIXI.Texture) {
    const sprite = new PIXI.TilingSprite(
      texture,
      this.bounds.width,
      this.bounds.height
    );

    sprite.tileScale.set(this.tileScale.x, this.tileScale.y);

    this.sprite = sprite;
  }
}
