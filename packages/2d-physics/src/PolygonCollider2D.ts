import { Behavior, inspect } from "@bigby/core";
import { IPoint, Renderable2D } from "@bigby/2d";
import * as PIXI from "pixi.js";
import { Fixture, Polygon, Vec2 } from "planck-js";
import { Physics2D } from "./Physics2D";
import { RigidBody2D } from "./RigidBody2D";

interface IPolygonCollider2D {
  density: number;
  friction: number;
  bounce: number;
  points: IPoint[];
}

export class PolygonCollider2D extends Behavior<IPolygonCollider2D>
  implements IPolygonCollider2D {
  static displayName = "PolygonCollider2D";
  static description =
    "Creates a polygon-shaped collider for your RigidBody2D physics body.";

  /* Properties */
  @inspect() density = 1;
  @inspect() friction = 0.5;
  @inspect("Bounciness") bounce = 0;

  points: IPoint[] = [];

  private r2d: Renderable2D;
  private fixture: Fixture;

  awake() {
    this.r2d = this.getBehavior(Renderable2D);

    this.createFixture();
    this.createGizmo();

    /* Listen to updates on the Renderable2D. If the user updates the transform, we'll
      want to recreate the fixture. */
    this.r2d.onPropertyUpdate(() => {
      this.createFixture();
    });
  }

  createFixture() {
    /* Remove old fixture if we have one */
    if (this.fixture) {
      this.fixture.getBody().destroyFixture(this.fixture);
    }

    /* Create new fixture */
    const rb2d = this.getBehavior(RigidBody2D);
    const p2d = this.getNearestBehavior(Physics2D);

    this.fixture = rb2d.body.createFixture({
      shape: Polygon(
        this.points.map((point) =>
          Vec2(
            (point.x / p2d.ppm) * this.r2d.scale.x,
            (point.y / p2d.ppm) * this.r2d.scale.y
          )
        )
      ),
      density: this.density,
      friction: this.friction,
      restitution: this.bounce,
    });
  }

  createGizmo() {
    /* Create a gizmo */
    const graphics = new PIXI.Graphics();
    const p2d = this.getNearestBehavior(Physics2D);

    const color = 0xffcc99;
    graphics.lineStyle(1, color, 0.8);
    graphics.beginFill(color, 0.2);

    if (this.points.length > 0) {
      graphics.drawPolygon(
        this.points.map((point) => new PIXI.Point(point.x, point.y))
      );
    }

    graphics.endFill();

    /* Add gizmo to our R2D */
    const r2d = this.getBehavior(Renderable2D);
    r2d.container.addChild(graphics);
  }
}
