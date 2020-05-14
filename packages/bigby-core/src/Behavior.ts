/* eslint-disable @typescript-eslint/no-empty-function */
import Entity from "./Entity";

export type BehaviorConstructor<T extends IBehavior = IBehavior> = new (
  entity: Entity
) => T;

export type BehaviorProps<T extends IBehavior> = Partial<T>;

export type BehaviorConstructorAndProps<T extends IBehavior> = [
  BehaviorConstructor<T>,
  BehaviorProps<T>?
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BehaviorDescription<T extends IBehavior = any> =
  | BehaviorConstructor<T>
  | BehaviorConstructorAndProps<T>;

type PreloadFunction = () => void;
type AwakeFunction = () => void;
type UpdateFunction = (dt: number) => void;
type LateUpdateFunction = UpdateFunction;
type DestroyFunction = () => void;

export interface IBehavior {
  entity: Entity;
  set: Function;
  preload?: PreloadFunction;
  awake?: AwakeFunction;
  update?: UpdateFunction;
  lateUpdate?: LateUpdateFunction;
  destroy?: DestroyFunction;
}

export default class Behavior implements IBehavior {
  entity: Entity;

  static make<T extends IBehavior = IBehavior>(
    entity: Entity,
    constructor: BehaviorConstructor<T>,
    props?: BehaviorProps<T>
  ) {
    /* create instance */
    const instance = new constructor(entity) as T;

    /* Assign props */
    if (props) instance.set(props);

    /* If the behavior's entity is already awake, also awake the behavior */
    if (entity.isAwake() && instance.awake) instance.awake();

    return instance;
  }

  constructor(entity: Entity) {
    this.entity = entity;
    this.entity.behaviors.push(this);
  }

  set(props: BehaviorProps<this>) {
    Object.assign(this, props);
  }

  getBehavior<T extends Behavior>(
    constructor: BehaviorConstructor<T>,
    searchUp = false
  ): T | undefined {
    return this.entity.getBehavior(constructor, searchUp);
  }

  $ = this.getBehavior;
}
