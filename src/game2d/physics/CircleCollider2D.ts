import { Behavior } from "../../core/Behavior";
import { RigidBody2D } from "./RigidBody2D";
import { Circle } from "planck-js";
import { Renderable2D } from "../Renderable2D";
import * as PIXI from "pixi.js";
import { Physics2D } from "./Physics2D";

interface ICircleCollider {
  size: number;
  density: number;
  friction: number;
}

export class CircleCollider2D extends Behavior<ICircleCollider>
  implements ICircleCollider {
  static displayName = "CircleCollider2D";
  static description =
    "Creates a circle-shaped collider for your RigidBody2D physics body.";

  /* Properties */
  size: number = 1;
  density: number = 1;
  friction: number = 0.5;

  awake() {
    const rb2d = this.getBehavior(RigidBody2D);
    rb2d.body.createFixture({
      shape: Circle(this.size),
      density: this.density,
      friction: this.friction,
    });

    this.createGizmo();
  }

  createGizmo() {
    /* Create a gizmo */
    const graphics = new PIXI.Graphics();
    const p2d = this.getNearestBehavior(Physics2D);
    const color = 0xffcc99;
    graphics.lineStyle(1, color, 0.8);
    graphics.beginFill(color, 0.2);
    graphics.drawCircle(0, 0, this.size * p2d.ppm);
    graphics.endFill();

    /* Add gizmo to our R2D */
    const r2d = this.getBehavior(Renderable2D);
    r2d.container.addChild(graphics);
  }
}
