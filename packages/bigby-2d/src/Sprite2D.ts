import { Behavior, inspect } from "@bigby/core";
import * as PIXI from "pixi.js";
import Renderable2D from "./Renderable2D";
import { IVec2 } from "./vec2";

export interface ISprite2D {
  uri: string;
  anchor: IVec2;
}

export default class Sprite2D<TExtraProps = {}> extends Behavior<
  ISprite2D & TExtraProps
> {
  static icon = "🚀";
  static displayName = "Sprite2D";
  static description = "Renders a 2D sprite.";

  /* Texture URI */
  @inspect("Texture URI")
  get uri() {
    return this._uri;
  }
  set uri(uri) {
    this._uri = uri;
    this.sprite.texture = PIXI.Texture.from(uri);
  }
  private _uri: string;

  /* Anchor Ratio */
  @inspect("Anchor", ["x", "y"], { step: 0.05, min: 0, max: 1 })
  get anchor() {
    return this.sprite.anchor;
  }
  set anchor(anchor: IVec2) {
    this.sprite.anchor.set(anchor.x, anchor.y);
  }

  protected sprite = new PIXI.Sprite();
  protected r2d: Renderable2D;

  awake() {
    this.r2d = this.getBehavior(Renderable2D);
    this.r2d.add(this.sprite);
  }

  destroy() {
    this.r2d.remove(this.sprite);
    this.sprite.destroy();
  }
}
