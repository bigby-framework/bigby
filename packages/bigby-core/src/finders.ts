import { IBehavior, BehaviorConstructor } from "./Behavior";
import Entity from "./Entity";

export const getBehavior = <T extends IBehavior>(
  from: Entity | IBehavior,
  constructor: BehaviorConstructor<T>
): T | undefined => {
  return from instanceof Entity
    ? (from.behaviors.find((b) => b instanceof constructor) as T)
    : getBehavior(from.entity, constructor);
};

export const $ = getBehavior;

export const getNearestBehavior = <T extends IBehavior>(
  from: Entity | IBehavior,
  constructor: BehaviorConstructor<T>
): T | undefined => {
  return from instanceof Entity
    ? (from.behaviors.find((b) => b instanceof constructor) as T) ||
        (from.parent && getNearestBehavior(from.parent, constructor))
    : getNearestBehavior(from.entity, constructor);
};

export const $up = getNearestBehavior;
