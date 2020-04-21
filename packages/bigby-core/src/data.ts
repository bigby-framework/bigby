import { IBehaviorConstructor, IBehaviorProperties } from "./Behavior";

export type BehaviorData =
  | [IBehaviorConstructor, IBehaviorProperties?]
  | IBehaviorConstructor;

export type EntityData = {
  name: string;
  icon?: string;
  behaviors?: BehaviorData[];
  children?: EntityData[];
};

export type EntityFactory = (...args: any[]) => EntityData;

export type BehaviorFactory = (...args: any[]) => BehaviorData;
