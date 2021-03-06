import Behavior, {
  BehaviorConstructor,
  BehaviorDescription,
  IBehavior,
} from "./Behavior";

export type EntityState = "new" | "awake" | "destroyed";

export type EntityConstructor<T extends Entity = Entity> = new (
  data?: EntityDescription
) => T;

export type EntityDescription = {
  name?: string;
  behaviors?: BehaviorDescription[];
  children?: (Entity | EntityConstructor | EntityDescription)[];
};

export default class Entity {
  name = "Unnamed Entity";
  behaviors = new Array<IBehavior>();
  children = new Array<Entity>();
  parent: Entity | null = null;
  state: EntityState = "new";

  constructor(data?: EntityDescription) {
    if (data) {
      /* Name */
      if (data.name) this.name = data.name;

      /* Behaviors */
      data.behaviors?.forEach((bd) => {
        Array.isArray(bd) ? this.addBehavior(...bd) : this.addBehavior(bd);
      });

      /* Children */
      data.children?.forEach((ed) => this.addChild(ed));
    }
  }

  addBehavior<T extends Behavior>(
    constructor: BehaviorConstructor<T>,
    props?: Partial<T>
  ): T {
    /* Create behavior. It will register itself with our list of behaviors itself. */
    return Behavior.make<T>(this, constructor, props);
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

  /**
   * Returns `true` if the entity is currently in the `new` state.
   */
  isNew() {
    return this.state === "new";
  }

  /**
   * Returns `true` if the entity is currently in the `awake` state.
   */
  isAwake() {
    return this.state === "awake";
  }

  /**
   * Returns `true` if the entity is currently in the `destroyed` state.
   */
  isDestroyed() {
    return this.state === "destroyed";
  }

  /**
   * Before awaking an entity, it may want to perform certain activities like
   * preloading assets. The `preload()` function will call the function of the
   * same name on all of the entity's behaviors, and then do the same for all of
   * its children.
   *
   * @bigby/core doesn't implement any actual preloading functionality itself,
   * as it is typically specific to the environment Bigby is used in. If you're
   * building games with eg. @bigby/game, that package will come with the
   * preloading functionality needed.
   */
  preload() {
    if (!this.isNew()) throw "Only entities in 'new' state can be preloaded";

    this.behaviors.forEach((b) => b.preload && b.preload());
    this.children.forEach((e) => e.preload());
  }

  /**
   * Awakes this entity and all of its children. Will invoke the `awake`
   * function on all of its behaviors.
   */
  awake() {
    if (!this.isNew()) return;
    this.state = "awake";

    this.behaviors.forEach((b) => b.awake && b.awake());
    this.children.forEach((e) => e.awake());
  }

  /**
   * Updates this entity, all of its behaviors, and all of its children.
   * @param dt Time (in seconds) passed since last frame.
   */
  update(dt: number) {
    if (!this.isAwake()) return;

    this.behaviors.forEach((b) => b.update && b.update(dt));
    this.children.forEach((e) => e.update(dt));
    this.behaviors.forEach((b) => b.lateUpdate && b.lateUpdate(dt));
  }

  /**
   * Destroys this entity and all of its children. Will invoke the `destroy`
   * function on all of its behaviors.
   */
  destroy() {
    if (!this.isAwake()) return;

    /* Switch state */
    this.state = "destroyed";

    /* First, destroy all our children */
    this.children.forEach((e) => e.destroy());

    /* Now, destroy all our behaviors */
    this.behaviors.forEach((b) => b.destroy && b.destroy());

    /* Remove ourselves from parent's children list */
    if (this.parent)
      this.parent.children = this.parent.children.filter((e) => e !== this);
  }

  getBehavior<T extends Behavior>(
    constructor: BehaviorConstructor<T>,
    searchUp = false
  ): T | undefined {
    return (
      (this.behaviors.find((b) => b instanceof constructor) as T) ||
      (searchUp && this.parent?.getBehavior(constructor, searchUp))
    );
  }

  $ = this.getBehavior;
}
