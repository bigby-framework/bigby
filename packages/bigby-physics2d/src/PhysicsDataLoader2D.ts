import { GameBehavior } from "@bigby/game";
import { IVec2 } from "@bigby/game/dist/vec2";
import PolygonCollider2D from "./PolygonCollider2D";
import RigidBody2D from "./RigidBody2D";

export type Filter = {
  categoryBits: number;
  maskBits: number;
};

export type Fixture = {
  density: number;
  friction: number;
  bounce: number;
  filter: Filter;
  points: IVec2[];
};

export type PhysicsData = Fixture[];

export default class PhysicsDataLoader2D extends GameBehavior {
  data?: PhysicsData;

  awake() {
    /* Create a RigidBody2D behavior if it's not already there */
    if (!this.$(RigidBody2D)) this.entity.addBehavior(RigidBody2D);

    /* Create colliders for each fixture */
    this.data?.forEach((fixture) => {
      this.entity.addBehavior(PolygonCollider2D, {
        density: fixture.density,
        friction: fixture.friction,
        restitution: fixture.bounce,
        points: fixture.points,
        categories: fixture.filter.categoryBits,
        mask: fixture.filter.maskBits,
      });
    });
  }
}
