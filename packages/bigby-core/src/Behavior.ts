import Entity from "./Entity";

export type BehaviorConstructor<T extends Behavior = Behavior> = new (
  entity: Entity
) => T;

export type BehaviorDescription<T extends Behavior> =
  | BehaviorConstructor<T>
  | [BehaviorConstructor<T>, BehaviorProps<T>?];

export type BehaviorProps<T extends Behavior = Behavior> = Partial<T>;

export default class Behavior {
  protected entity: Entity;

  static make<T extends Behavior = Behavior>(
    entity: Entity,
    constructor: BehaviorConstructor<T>,
    props?: BehaviorProps<T>
  ) {
    /* create instance */
    const instance = new constructor(entity) as T;

    /* Assign props */
    if (props) instance.set(props);

    /* If the behavior's entity is already awake, also awake the behavior */
    entity.isAwake() && instance.awake();

    return instance;
  }

  constructor(entity: Entity) {
    this.entity = entity;
    this.entity.behaviors.push(this);
  }

  preload() {}
  awake() {}
  update(dt: number) {}
  lateUpdate(dt: number) {}
  destroy() {}

  set(props: BehaviorProps) {
    Object.assign(this, props);
  }

  getBehavior<T extends Behavior>(
    constructor: BehaviorConstructor<T>
  ): T | undefined {
    return this.entity?.getBehavior(constructor);
  }

  getNearestBehavior<T extends Behavior>(
    constructor: BehaviorConstructor<T>
  ): T | undefined {
    return this.entity?.getNearestBehavior(constructor);
  }
}
