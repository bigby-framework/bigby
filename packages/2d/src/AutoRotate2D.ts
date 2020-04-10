import { Behavior, inspect } from "@bigby/core";
import { Renderable2D } from "./Renderable2D";

export interface IAutoRotateable {
  rotation: number;
}

export interface IAutoRotate2D {
  speed: number;
  rotateable: IAutoRotateable;
}

export class AutoRotate2D extends Behavior<IAutoRotate2D>
  implements IAutoRotate2D {
  static displayName = "AutoRotate2D";
  static icon = "♻️";
  static description =
    "Automatically rotates the entity clockwise or counter-clockwise.";

  @inspect() speed = 1;
  rotateable: IAutoRotateable;

  awake() {
    if (!this.rotateable) this.rotateable = this.getBehavior(Renderable2D);
  }

  update(dt: number) {
    if (this.rotateable) this.rotateable.rotation += this.speed * dt;
  }
}
