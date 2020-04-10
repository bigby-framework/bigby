import { Behavior, inspect } from "@bigby/core";
import { Renderable2D } from "./Renderable2D";

export interface IAutoRotate2D {
  speed: number;
}

export class AutoRotate2D extends Behavior<IAutoRotate2D>
  implements IAutoRotate2D {
  static displayName = "AutoRotate2D";
  static icon = "♻️";
  static description =
    "Automatically rotates the entity clockwise or counter-clockwise.";

  @inspect() speed = 1;

  rotatable: { rotation: number };

  awake() {
    if (!this.rotatable) this.rotatable = this.getBehavior(Renderable2D);
  }

  update(dt: number) {
    if (this.rotatable) this.rotatable.rotation += this.speed * dt;
  }
}
