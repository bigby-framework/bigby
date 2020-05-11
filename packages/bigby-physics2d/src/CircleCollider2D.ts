import AbstractCollider2D from "./AbstractCollider2D";
import * as planck from "planck-js";

export default class CircleCollider2D extends AbstractCollider2D {
  radius = 1;

  protected createFixture() {
    this.fixture = this.rb2d!.body!.createFixture({
      shape: planck.Circle(this.radius),
      friction: this.friction,
      density: this.density,
    });
  }
}
