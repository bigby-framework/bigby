import { Entity } from "@bigby/core";
import { PolygonCollider2D } from "../PolygonCollider2D";
import { RigidBody2D } from "../RigidBody2D";

export interface IFilter {
  categoryBits: number;
  maskBits: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IFixture {
  density: number;
  friction: number;
  bounce: number;
  filter: IFilter;
  points: IPoint[];
}

// export const loadFixture = (fixture: IFixture, body: Body, scale = 1) => {
//   const points = fixture.points.map((point) =>
//     Vec2(point.x * scale, point.y * scale)
//   );

//   body.createFixture(Polygon(points), {
//     density: fixture.density,
//     friction: fixture.friction,
//     restitution: fixture.bounce,
//     filterCategoryBits: fixture.filter.categoryBits,
//     filterMaskBits: fixture.filter.maskBits,
//   });
// };

export const importPhysicsEditorData = (
  entity: Entity,
  fixtures: IFixture[]
) => {
  /* Make sure the entity has a RigidBody2D behavior */
  if (!entity.getBehavior(RigidBody2D)) entity.addBehavior(RigidBody2D);

  /* Create colliders for each fixture */
  fixtures.forEach((fixture) => {
    entity.addBehavior(PolygonCollider2D, {
      density: fixture.density,
      friction: fixture.friction,
      bounce: fixture.bounce,
      points: fixture.points,
    });
  });
};
