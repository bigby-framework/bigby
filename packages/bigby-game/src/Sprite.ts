import { Behavior } from "@bigby/core";
import { Sprite as PIXISprite } from "pixi.js";
import Transform from "./Transform";

export default class Sprite extends Behavior {
  uri?: string;

  private sprite?: PIXISprite;

  awake() {
    if (!this.uri) throw "No URI given.";
    this.sprite = PIXISprite.from(this.uri);
    this.sprite.anchor.set(0.5);

    /* Add the sprite to the next transform. */
    this.getNearestBehavior(Transform)?.add(this.sprite);
  }

  destroy() {
    this.sprite?.destroy();
  }
}
