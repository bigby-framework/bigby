import { Behavior } from "@bigby/core";
import * as planck from "planck-js";

export default class Physics2D extends Behavior {
  readonly world = new planck.World();

  /**
   * Pixels per unit (meter). Defaults to 10.
   */
  ppu = 10;

  /**
   * How many physics calculations to perform per second. (Default: 60)
   */
  stepsPerSecond = 60;

  /**
   * The physics world's gravity vector.
   *
   * @memberof Physics2D
   */
  get gravity() {
    return this.world.getGravity();
  }
  set gravity(v) {
    this.world.setGravity(v);
  }

  /** Time accumulator used for performing fixed physics steps. */
  private accuTime = 0;

  update(dt: number) {
    const stepTime = 1 / this.stepsPerSecond;
    this.accuTime += dt;

    while (this.accuTime > stepTime) {
      this.world.step(stepTime);
      this.accuTime -= stepTime;
    }
  }
}
