import Entity from "./Entity";

export type BehaviorConstructor<T extends Behavior = Behavior> = new () => T;

export type BehaviorProps = { [key: string]: any };

export default class Behavior {
  entity: Entity | undefined;

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
