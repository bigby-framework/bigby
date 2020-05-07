import * as PIXI from "pixi.js";
import GameBehavior from "./GameBehavior";

export default class TilingSprite extends GameBehavior {
  uri?: string;
  texture?: string;

  bounds = { width: 512, height: 512 };

  tileScale = { x: 1, y: 1 };

  private sprite?: PIXI.TilingSprite;

  get anchor() {
    return this.sprite!.anchor as { x: number; y: number };
  }

  set anchor(v: number | { x: number; y: number }) {
    if (typeof v === "number") this.sprite!.anchor.set(v);
    else this.sprite!.anchor.set(v.x, v.y);
  }

  preload() {
    /* If the texture to be used was specified using `uri`, queue it for loading. */
    if (this.uri) this.loader.add(this.uri);
  }

  awake() {
    if (!this.uri && !this.texture)
      throw "Either texture or uri needs to be specified.";

    const texture = PIXI.Texture.from(this.texture || this.uri!);

    this.sprite = new PIXI.TilingSprite(
      texture,
      this.bounds.width,
      this.bounds.height
    );

    this.sprite.tileScale.set(this.tileScale.x, this.tileScale.y);

    /* Add the sprite to the next transform. */
    this.nearestTransform?.add(this.sprite);
  }

  destroy() {
    this.sprite?.destroy();
  }
}
