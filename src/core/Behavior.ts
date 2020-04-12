import * as uuid from "uuid";
import { Entity } from "./Entity";
import { IFinderFunctions } from "./IFinderFunctions";
import { signal } from "./signal";

export interface IBehaviorConstructor<
  T extends Behavior<U> = Behavior<any>,
  U = any
> {
  new (): T & {
    set: (props: U) => T;
  };
}

type BehaviorProperties = { [key: string]: any };

export abstract class Behavior<
  TProperties extends BehaviorProperties = BehaviorProperties
> implements IFinderFunctions {
  public static displayName: string;
  public static description: string;
  public static icon: string;

  /* ID */
  id = uuid.v4();

  /* Reference to the entity that owns us */
  entity: Entity;

  /* Some lifecycle signals */
  onPropertyUpdate = signal();
  onDestroy = signal();

  /* Lifecycle functions that child classes may override as needed */
  awake() {}
  update(dt: number) {}
  lateUpdate(dt: number) {}
  editorUpdate(dt: number) {}
  editorLateUpdate(dt: number) {}
  enterPlayMode() {}
  enterEditMode() {}
  propertyUpdate() {}
  destroy() {}

  /* Convenience accessors */
  get parent() {
    return this.entity.parent;
  }

  set(props: Partial<TProperties>) {
    Object.assign(this, props);
    return this;
  }

  /* Bunch of convenience shortcuts to satisfy IFinderFunctions: */
  getBehavior<T extends Behavior>(constructor: IBehaviorConstructor<T>): T {
    return this.entity.getBehavior(constructor);
  }

  getNearestEntityWith<T extends Behavior>(
    constructor: IBehaviorConstructor<T>
  ): Entity {
    return this.entity.getNearestEntityWith(constructor);
  }

  getNearestBehavior<T extends Behavior>(
    constructor: IBehaviorConstructor<T>
  ): T {
    return this.entity.getNearestBehavior(constructor);
  }
}
