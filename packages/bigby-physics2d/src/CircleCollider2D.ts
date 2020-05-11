import { Behavior, $, $up } from "@bigby/core";
import { Logger } from "@bigby/logger";
import { RigidBody2D } from ".";
import * as planck from "planck-js";

export default class CircleCollider2D extends Behavior {
  radius = 1;
  friction = 0;
  density = 1;

  private fixture?: planck.Fixture;

  awake() {
    const rb2d = $(this, RigidBody2D);
    const logger = $up(this, Logger);

    if (!rb2d) {
      logger?.error("CircleCollider2D needs a RigidBody2D to operate.");
      return;
    }

    if (!rb2d.body) {
      logger?.error("The entity's RigidBody2D needs to be awake.");
      return;
    }

    this.fixture = rb2d.body.createFixture({
      shape: planck.Circle(this.radius),
      friction: this.friction,
      density: this.density,
    });
  }

  destroy() {
    if (this.fixture) {
      $(this, RigidBody2D)?.body?.destroyFixture(this.fixture);
    }
  }
}
