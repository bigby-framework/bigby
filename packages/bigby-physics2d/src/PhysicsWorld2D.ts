import { Behavior } from "@bigby/core";
import * as planck from "planck-js";

export default class PhysicsWorld2D extends Behavior {
  readonly world = new planck.World();

  /**
   * Pixels per unit (meter). Defaults to 10.
   */
  ppu = 10;

  /**
   * The physics world's gravity vector.
   *
   * @memberof PhysicsWorld2D
   */
  get gravity() {
    return this.world.getGravity();
  }
  set gravity(v) {
    this.world.setGravity(v);
  }

  update(dt: number) {
    /* FIXME: this is not how we want to update physics */
    this.world.step(dt);
  }
}
