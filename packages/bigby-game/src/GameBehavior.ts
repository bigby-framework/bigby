import { Behavior } from "@bigby/core";
import Transform from "./Transform";
import ResourceLoader from "./ResourceLoader";
import * as PIXI from "pixi.js";

/**
 * A subclass of the original [[Behavior]] class with some extra convenience
 * functionality specific to @bigby/game.
 */
export default class GameBehavior extends Behavior {
  /* TODO: find a nicer, less noisy way to memoize these. */

  private __transform?: Transform;
  get transform() {
    return (this.__transform = this.__transform || this.getBehavior(Transform));
  }

  private __nearestTransform?: Transform;
  get nearestTransform() {
    return (this.__nearestTransform =
      this.__nearestTransform || this.getNearestBehavior(Transform));
  }

  private __loader?: PIXI.Loader;
  get loader() {
    return (this.__loader =
      this.__loader || this.getNearestBehavior(ResourceLoader)!.loader);
  }
}
