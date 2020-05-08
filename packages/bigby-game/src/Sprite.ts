import * as PIXI from "pixi.js";
import GameBehavior from "./GameBehavior";

export default class Sprite extends GameBehavior {
  protected sprite?: PIXI.Sprite;

  /**
   * URI of texture to use in this sprite. Unlike [[resource]], setting `uri`
   * will cause the texture to be preloaded in the `preload()` step. If your
   * texture has already been preloaded by some other means (eg. as part of a
   * texture atlas), use [[resource]] instead.
   *
   * @memberof Sprite
   */
  get uri() {
    return this._uri;
  }
  set uri(uri) {
    this._uri = uri;
    this.applyNewTexture(uri);
  }
  private _uri?: string;

  /**
   * Texture resource to use for this sprite. The Sprite behavior will assume
   * that this resource has already been preloaded. If you haven't done this,
   * use the [[uri]] property instead, as it will cause the specified texture to
   * be preloaded in the `preload` step.
   *
   * @memberof Sprite
   */
  get resource() {
    return this._resource;
  }
  set resource(resource) {
    this._resource = resource;
    this.applyNewTexture(resource);
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
    /* Sanity check */
    const source = this.resource || this.uri;
    if (!source) throw "Sprite needs either resource or uri to be set";

    /* Create sprite */
    this.createSprite(PIXI.Texture.from(source));
    this.anchor = this._anchor; /* apply previously stored anchor... don't sue me */

    /* Add the sprite to the next transform. */
    this.nearestTransform?.add(this.sprite);
  }

  destroy() {
    this.sprite?.destroy();
  }

  private applyNewTexture(uri?: string) {
    if (this.sprite && uri) this.sprite.texture = PIXI.Texture.from(uri);
  }

  protected createSprite(texture: PIXI.Texture) {
    this.sprite = new PIXI.Sprite(texture);
  }
}
