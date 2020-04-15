import * as uuid from "uuid";
import {
  Behavior,
  IBehaviorConstructor,
  IBehaviorProperties,
} from "./Behavior";
import { IFinderFunctions } from "./IFinderFunctions";

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

/**
 * @category Core
 */
export class Entity implements IFinderFunctions {
  static defaultName = "Entity";

  icon = "꩜";
  id = uuid.v4();
  name: string;
  parent: Entity;

  isAwake = false;
  isDestroyed = false;

  /* Constructor */
  constructor(name?: string) {
    this.name = name;
  }

  /* Child entities */
  children = new Array<Entity>();

  addChild<T extends Entity>(constructor?: { new (): T } | Entity) {
    /* Create entity instance */
    const entity =
      constructor instanceof Entity
        ? constructor
        : new (constructor || Entity)();

    /* Establish parent/child relationship */
    entity.parent = this;
    this.children = [...this.children, entity];

    /* If we're awake, awake this, one, too! */
    if (this.isAwake) entity.awake();

    /* Done! */
    return entity;
  }

  removeChild(entity: Entity) {
    entity.parent = null;
    this.children = this.children.filter((go) => go !== entity);
  }

  /* Behaviors attached to this entity */
  behaviors = new Array<Behavior>();

  addBehavior<TBehavior extends Behavior, TProps>(
    constructor: IBehaviorConstructor<TBehavior, TProps> | TBehavior,
    props?: TProps
  ): TBehavior {
    /* Create behavior instance */
    const behavior =
      constructor instanceof Behavior ? constructor : new constructor();

    /* Establish relationship between us and the behavior */
    behavior.entity = this;
    this.behaviors = [...this.behaviors, behavior];

    /* Initialize behavior */
    if (props) behavior.set(props);

    /* Done! */
    return behavior;
  }

  removeBehavior(behavior: Behavior) {
    behavior.entity = null;
    this.behaviors = this.behaviors.filter((b) => b !== behavior);
  }

  getBehavior<T extends Behavior>(constructor: IBehaviorConstructor<T>): T {
    return this.behaviors.find((co) => co.constructor === constructor) as T;
  }

  /* Search the entity tree upwards, starting with this entity, for the next entity containing the given behavior */
  getNearestEntityWith<T extends Behavior>(
    constructor: IBehaviorConstructor<T>
  ): Entity {
    if (this.getBehavior(constructor)) return this;
    else return this.parent?.getNearestEntityWith(constructor);
  }

  /* Searches the nearest entity that has the specified behavior, and returns the behavior */
  getNearestBehavior<T extends Behavior>(
    constructor: IBehaviorConstructor<T>
  ): T {
    const entity = this.getNearestEntityWith(constructor);
    return entity.getBehavior(constructor);
  }

  /* Lifecycle methods */

  awake() {
    this.isAwake = true;

    this.behaviors.forEach((b) => b.awake());
    this.children.forEach((e) => e.awake());
  }

  update(dt: number) {
    this.behaviors.forEach((b) => b.update(dt));
    this.children.forEach((e) => e.update(dt));
    this.behaviors.forEach((b) => b.lateUpdate(dt));
  }

  editorUpdate(dt: number) {
    this.behaviors.forEach((b) => b.editorUpdate(dt));
    this.children.forEach((e) => e.editorUpdate(dt));
    this.behaviors.forEach((b) => b.editorLateUpdate(dt));
  }

  enterEditMode() {
    this.behaviors.forEach((b) => b.enterEditMode());
    this.children.forEach((e) => e.enterEditMode());
  }

  enterPlayMode() {
    this.behaviors.forEach((b) => b.enterPlayMode());
    this.children.forEach((e) => e.enterPlayMode());
  }

  destroy() {
    if (this.isDestroyed) return;

    this.isDestroyed = true;

    /* Destroy children first */
    this.children.forEach((ent) => ent.destroy());

    /* Let all our behaviors know that we're being destroyed */
    this.behaviors.forEach((co) => {
      co.destroy();
      co.onDestroy.emit();
    });

    /* kbye */
    this.parent.removeChild(this);
  }

  public static from(data: EntityData) {
    const e = new Entity(data.name);

    e.icon = data.icon || e.icon;

    /* Create behaviors */
    if (data.behaviors) {
      data.behaviors.forEach((bd) => {
        if (Array.isArray(bd)) {
          e.addBehavior(...bd);
        } else {
          e.addBehavior(bd);
        }
      });
    }

    /* Create children */
    if (data.children) {
      data.children.forEach((ed) => {
        e.addChild(Entity.from(ed));
      });
    }

    return e;
  }
}
