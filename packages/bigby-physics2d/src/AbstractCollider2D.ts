import { $, $up, Behavior } from "@bigby/core";
import { Logger } from "@bigby/logger";
import * as planck from "planck-js";
import { RigidBody2D } from ".";
import Physics2D from "./Physics2D";

export type ColliderCategoryBits = number;
export type ColliderMaskBits = number;

export default abstract class AbstractCollider2D extends Behavior {
  friction = 0;
  density = 1;
  restitution = 0;

  categories: ColliderCategoryBits = 0;
  mask: ColliderMaskBits = 0;

  protected fixture?: planck.Fixture;
  protected p2d?: Physics2D;
  protected rb2d?: RigidBody2D;
  protected logger?: Logger;

  awake() {
    this.p2d = $up(this, Physics2D);
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

    this.fixture = this.rb2d!.body!.createFixture({
      shape: this.fixtureShape(),
      friction: this.friction,
      density: this.density,
      restitution: this.restitution,
      filterCategoryBits: this.categories,
      filterMaskBits: this.mask,
    });
  }

  protected abstract fixtureShape(): planck.Shape;
}
