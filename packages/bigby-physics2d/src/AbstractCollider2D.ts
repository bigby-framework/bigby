import { Behavior, $, $up } from "@bigby/core";
import { Logger } from "@bigby/logger";
import { RigidBody2D } from ".";
import * as planck from "planck-js";

export default abstract class AbstractCollider2D extends Behavior {
  friction = 0;
  density = 1;

  protected fixture?: planck.Fixture;

  protected rb2d?: RigidBody2D;
  protected logger?: Logger;

  awake() {
    this.rb2d = $(this, RigidBody2D);
    this.logger = $up(this, Logger);

    if (!this.rb2d) {
      this.logger?.error("CircleCollider2D needs a RigidBody2D to operate.");
      return;
    }

    if (!this.rb2d.body) {
      this.logger?.error("The entity's RigidBody2D needs to be awake.");
      return;
    }

    this.createFixture();
  }

  destroy() {
    if (this.fixture) {
      this.rb2d!.body?.destroyFixture(this.fixture);
    }
  }

  protected abstract createFixture(): void;
}
