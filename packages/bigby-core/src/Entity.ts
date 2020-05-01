import Behavior, { BehaviorConstructor, BehaviorProps } from "./Behavior";

export type EntityState = "new" | "awake" | "destroyed";

export type EntityConstructor<T extends Entity = Entity> = new (
  ...args: any[]
) => T;

export type BehaviorDescription =
  | BehaviorConstructor
  | [BehaviorConstructor, BehaviorProps?];

export type EntityDescription = {
  name?: string;
  behaviors?: (Behavior | BehaviorDescription)[];
  children?: (Entity | EntityConstructor | EntityDescription)[];
};

export default class Entity {
  name = "Unnamed Entity";
  behaviors = new Array<Behavior>();
  children = new Array<Entity>();
  parent: Entity | null = null;
  state: EntityState = "new";

  constructor(data?: EntityDescription) {
    if (data) {
      /* Name */
      if (data.name) this.name = data.name;

      /* Behaviors */
      data.behaviors?.forEach((bd) => {
        bd instanceof Behavior
          ? this.addBehavior(bd)
          : Array.isArray(bd)
          ? this.addBehavior(...bd)
          : this.addBehavior(bd);
      });

      /* Children */
      data.children?.forEach((ed) => this.addChild(ed));
    }
  }

  addBehavior<T extends Behavior>(
    constructor: T | BehaviorConstructor<T>,
    props?: Partial<T>
  ): T {
    /* Get behavior instance */
    const behavior =
      constructor instanceof Behavior ? constructor : new constructor();

    /* Don't add it twice */
    if (this.hasBehavior(behavior)) return behavior;

    /* Set ourselves as the behavior's entity */
    behavior.entity = this;

    /* Add it to our list of behaviors */
    this.behaviors.push(behavior);

    /* Set those props */
    if (props) behavior.set(props);

    /* If we're already awake, also awaken the behavior */
    this.isAwake() && behavior.awake();

    return behavior;
  }

  hasBehavior<T extends Behavior>(behavior: Behavior | BehaviorConstructor<T>) {
    if (behavior instanceof Behavior) {
      return this.behaviors.includes(behavior);
    } else {
      return this.behaviors.some((b) => b instanceof behavior);
    }
  }

  addChild<T extends Entity>(
    constructor: T | EntityConstructor<T> | EntityDescription
  ): T {
    if (constructor instanceof Function) {
      return this.addChild(new constructor());
    } else if (constructor instanceof Entity) {
      const entity = constructor;

      /* Don't add the same entity twice */
      if (this.hasChild(entity)) return entity;

      /* Assign us as the child's parent */
      entity.parent = this;

      /* Put it into our list of children */
      this.children.push(entity);

      /* If we're already awake, call the entity's awake method */
      this.isAwake() && entity.awake();

      /* Return the entity */
      return entity as T;
    } else if (typeof constructor === "object") {
      return this.addChild(new Entity(constructor) as T);
    } else {
      throw "Could not add child. Huh!";
    }
  }

  hasChild(entity: Entity) {
    return this.children.includes(entity);
  }

  removeChild(entity: Entity) {
    /* TODO: check if entity is actually a child of ours */

    /* Destroy the entity if it hasn't already destroyed itself */
    if (!entity.isDestroyed()) entity.destroy();

    /* Remove parent from entity */
    entity.parent = null;

    /* Remove entity from our list of children */
    this.children = this.children.filter((e) => e !== entity);
  }

  isNew() {
    return this.state === "new";
  }

  isAwake() {
    return this.state === "awake";
  }

  isDestroyed() {
    return this.state === "destroyed";
  }

  /**
   * Awakes this entity and all of its children. Will invoke the `awake`
   * function on all of its behaviors.
   */
  awake() {
    if (!this.isNew()) return;
    this.state = "awake";

    this.behaviors.forEach((b) => b.awake());
    this.children.forEach((e) => e.awake());
  }

  /**
   * Updates this entity, all of its behaviors, and all of its children.
   * @param dt Time (in seconds) passed since last frame.
   */
  update(dt: number) {
    this.behaviors.forEach((b) => b.update(dt));
    this.children.forEach((e) => e.update(dt));
    this.behaviors.forEach((b) => b.lateUpdate(dt));
  }

  /**
   * Destroys this entity and all of its children. Will invoke the `destroy`
   * function on all of its behaviors.
   */
  destroy() {
    this.children.forEach((e) => e.destroy());
    this.behaviors.forEach((b) => b.destroy());
  }

  /* Finder methods */

  getBehavior<T extends Behavior>(constructor: BehaviorConstructor<T>): T {
    return this.behaviors.find((b) => b instanceof constructor) as T;
  }

  getNearestBehavior<T extends Behavior>(
    constructor: BehaviorConstructor<T>
  ): T {
    return (
      this.getBehavior(constructor) ||
      this.parent?.getNearestBehavior(constructor)
    );
  }
}
