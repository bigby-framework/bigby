import { Sprite as PIXISprite, Texture } from "pixi.js";
import GameBehavior from "./GameBehavior";

export default class Sprite extends GameBehavior {
  private sprite?: PIXISprite;

  /**
   *
   *
   * @memberof Sprite
   */
  get uri() {
    return this._uri;
  }
  set uri(uri) {
    this._uri = uri;
    if (this.sprite) this.sprite.texture = Texture.from(uri);
  }
  private _uri?: string;

  /**
   *
   *
   * @memberof Sprite
   */
  get resource() {
    return this._resource;
  }
  set resource(resource) {
    this._resource = resource;
    if (this.sprite) this.sprite.texture = Texture.from(resource);
  }
  private _resource = "";

  /**
   * Anchor point of the sprite, ranging from 0 to 1, with 0.5 representing the center.
   *
   * @memberof Sprite
   */
  get anchor() {
    return this._anchor;
  }
  set anchor(v: number | { x: number; y: number }) {
    this._anchor = v;

    if (this.sprite)
      if (typeof v === "number") this.sprite.anchor.set(v);
      else this.sprite.anchor.set(v.x, v.y);
  }
  private _anchor: number | { x: number; y: number } = 0;

  preload() {
    /* If the texture to be used was specified using `uri`, queue it for loading. */
    if (this.uri) this.loader.add(this.uri);
  }

  awake() {
    const source = this.resource || this.uri;
    if (!source) throw "Sprite needs either resource or uri to be set";

    /* Create sprite */
    this.sprite = new PIXISprite(Texture.from(source));
    this.anchor = this._anchor; /* apply previously stored anchor... don't sue me */

    /* Add the sprite to the next transform. */
    this.nearestTransform?.add(this.sprite);
  }

  destroy() {
    this.sprite?.destroy();
  }
}
