import { Behavior, IBehaviorConstructor } from "./Behavior";
import { Entity } from "./Entity";

export interface IFinderFunctions {
  getBehavior: (constructor: IBehaviorConstructor<any>) => Behavior<any>;
  getNearestEntityWith: (constructor: IBehaviorConstructor<any>) => Entity;
  getNearestBehavior: (constructor: IBehaviorConstructor<any>) => Behavior<any>;
}
