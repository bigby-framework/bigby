import * as planck from "planck-js";
import AbstractCollider2D from "./AbstractCollider2D";
import { vec2 } from "@bigby/game";

export default class PolygonCollider2D extends AbstractCollider2D {
  points: vec2.IVec2[] = [];

  protected fixtureShape() {
    const scale = this.transform!.scale;

    return planck.Polygon(
      this.points.map((point) =>
        planck.Vec2(
          (point.x / this.p2d!.ppu) * scale.x,
          (point.y / this.p2d!.ppu) * scale.y
        )
      )
    );
  }
}
