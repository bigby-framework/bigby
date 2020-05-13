import * as planck from "planck-js";
import AbstractCollider2D from "./AbstractCollider2D";

export default class CircleCollider2D extends AbstractCollider2D {
  radius = 1;

  protected fixtureShape() {
    return planck.Circle(this.radius * this.transform!.scale.x);
  }
}
