import { Behavior } from "@bigby/core";
import Transform from "./Transform";
import ResourceLoader from "./ResourceLoader";

/**
 * A subclass of the original [[Behavior]] class with some extra convenience
 * functionality specific to @bigby/game.
 */
export default class GameBehavior extends Behavior {
  get transform() {
    return this.getBehavior(Transform);
  }

  get nearestTransform() {
    return this.getNearestBehavior(Transform);
  }

  get loader() {
    return this.getNearestBehavior(ResourceLoader)!.loader;
  }
}
