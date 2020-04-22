import { Behavior, inspect } from "@bigby/core";
import * as PIXI from "pixi.js";
import Renderable2D from "./Renderable2D";
import { IVec2 } from "./vec2";

export interface ISprite2D {
  uri: string;
  anchor: IVec2;
}

export default class Sprite2D<TExtraProps = {}>
  extends Behavior<ISprite2D & TExtraProps>
  implements ISprite2D {
  static icon = "🚀";
  static displayName = "Sprite2D";
  static description = "Renders a 2D sprite.";

  texture: PIXI.Texture;

  /* Texture URI */
  @inspect("Texture URI")
  get uri() {
    return this._uri;
  }
  set uri(uri) {
    this._uri = uri;
    if (this.texture) this.reinitialize();
  }
  private _uri: string;

  /* Anchor Ratio */
  @inspect("Anchor", ["x", "y"], { step: 0.05, min: 0, max: 1 })
  anchor = { x: 0.5, y: 0.5 };

  protected sprite: PIXI.Sprite;
  protected r2d: Renderable2D;

  awake() {
    this.r2d = this.getBehavior(Renderable2D);
    this.reinitialize();
  }

  destroy() {
    this.destroySprite();
  }

  protected createSpriteFromTexture() {
    return new PIXI.Sprite(this.texture);
  }

  protected destroySprite() {
    if (this.sprite) {
      this.r2d.container.removeChild(this.sprite);
      this.sprite.destroy();
    }
  }

  protected reinitialize() {
    /* If we already have a sprite, destroy it */
    this.destroySprite();
    this.texture?.destroy();

    /* Create a new sprite from the given URI */
    this.texture = PIXI.Texture.from(this.uri);
    this.sprite = this.createSpriteFromTexture();
    this.sprite.anchor.set(this.anchor.x, this.anchor.y);

    /* Add to r2d */
    this.r2d.container.addChild(this.sprite);
  }
}
