import { Behavior } from "@bigby/core";
import Transform from "./Transform";
import ResourceLoader from "./ResourceLoader";

/**
 * A subclass of the original [[Behavior]] class with some extra convenience
 * functions specific to @bigby/game.
 */
export default class GameBehavior extends Behavior {
  getTransform() {
    return this.getBehavior(Transform);
  }

  getNearestTransform() {
    return this.getNearestBehavior(Transform);
  }

  getResourceLoader() {
    return this.getNearestBehavior(ResourceLoader);
  }
}
