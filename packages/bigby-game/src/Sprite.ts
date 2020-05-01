import { Behavior } from "@bigby/core";
import { Sprite as PIXISprite, Texture } from "pixi.js";
import Transform from "./Transform";
import GameBehavior from "./GameBehavior";

export default class Sprite extends GameBehavior {
  uri?: string;

  private sprite = new PIXISprite();

  get anchor() {
    return this.sprite.anchor as { x: number; y: number };
  }

  set anchor(v: number | { x: number; y: number }) {
    if (typeof v === "number") this.sprite.anchor.set(v);
    else this.sprite.anchor.set(v.x, v.y);
  }

  awake() {
    if (!this.uri) throw "No URI given.";
    this.sprite.texture = Texture.from(this.uri);

    /* Add the sprite to the next transform. */
    this.nearestTransform?.add(this.sprite);
  }

  destroy() {
    this.sprite?.destroy();
  }
}
