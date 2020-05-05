import { Sprite as PIXISprite, Texture } from "pixi.js";
import GameBehavior from "./GameBehavior";

export default class Sprite extends GameBehavior {
  uri?: string;
  texture?: string;

  private sprite = new PIXISprite();

  get anchor() {
    return this.sprite.anchor as { x: number; y: number };
  }

  set anchor(v: number | { x: number; y: number }) {
    if (typeof v === "number") this.sprite.anchor.set(v);
    else this.sprite.anchor.set(v.x, v.y);
  }

  preload() {
    /* If the texture to be used was specified using `uri`, queue it for loading. */
    if (this.uri) this.loader.add(this.uri);
  }

  awake() {
    if (!this.uri && !this.texture)
      throw "Either texture or uri needs to be specified.";

    this.sprite.texture = Texture.from(this.texture || this.uri!);

    /* Add the sprite to the next transform. */
    this.nearestTransform?.add(this.sprite);
  }

  destroy() {
    this.sprite?.destroy();
  }
}
