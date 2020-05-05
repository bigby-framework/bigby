import { Behavior } from "@bigby/core";
import * as planck from "planck-js";

export class PhysicsWorld extends Behavior {
  world = new planck.World();

  get gravity() {
    return this.world.getGravity();
  }

  set gravity(v) {
    this.world.setGravity(v);
  }
}
