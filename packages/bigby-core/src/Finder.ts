import { IBehavior, BehaviorConstructor } from "./Behavior";
import Entity from "./Entity";

/**
 * An abstract class containing methods concerned with finding entities and
 * behaviors on the scene graph.
 *
 * @export
 * @abstract
 * @class Finder
 */
export default abstract class Finder {
  static getBehavior<T extends IBehavior>(
    from: Entity | IBehavior,
    constructor: BehaviorConstructor<T>
  ): T | undefined {
    return from instanceof Entity
      ? (from.behaviors.find((b) => b instanceof constructor) as T)
      : Finder.getBehavior(from.entity, constructor);
  }

  static getNearestBehavior<T extends IBehavior>(
    from: Entity | IBehavior,
    constructor: BehaviorConstructor<T>
  ): T | undefined {
    return from instanceof Entity
      ? (from.behaviors.find((b) => b instanceof constructor) as T) ||
          (from.parent && Finder.getNearestBehavior(from.parent, constructor))
      : Finder.getNearestBehavior(from.entity, constructor);
  }
}

export const $ = Finder.getBehavior;

export const $up = Finder.getNearestBehavior;
