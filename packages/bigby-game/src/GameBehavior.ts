import { Behavior } from "@bigby/core";
import * as PIXI from "pixi.js";
import ResourceLoader from "./ResourceLoader";
import Transform from "./Transform";

/**
 * A subclass of the original [[Behavior]] class with some extra convenience
 * functionality specific to @bigby/game.
 */
export default class GameBehavior extends Behavior {
  /* TODO: find a nicer, less noisy way to memoize these. */

  private __transform?: Transform;
  /** Provides a convenient (and memoized) accessor to the current entity's Transform behavior. */
  get transform() {
    return (this.__transform = this.__transform || this.$(Transform));
  }

  private __nearestTransform?: Transform;
  get nearestTransform() {
    return (this.__nearestTransform =
      this.__nearestTransform || this.$(Transform, true));
  }

  private __loader?: PIXI.Loader;
  get loader() {
    return (this.__loader =
      this.__loader || this.$(ResourceLoader, true)!.loader);
  }
}
