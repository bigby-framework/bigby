import PhysicsWorld2D from "./PhysicsWorld2D";
import * as planck from "planck-js";
import { GameBehavior } from "@bigby/game";
import * as vec2 from "@bigby/game/esm/vec2";

export default class RigidBody2D extends GameBehavior {
  body?: planck.Body;

  angularDamping = 0;
  linearDamping = 0;
  allowSleep = true;
  type: "dynamic" | "static" = "dynamic";

  private pw2d?: PhysicsWorld2D;

  awake() {
    this.pw2d = this.getNearestBehavior(PhysicsWorld2D);
    if (!this.pw2d) throw "RigidBody2D needs a PhysicsWorld2D to operate";
    if (!this.transform) throw "RigidBody2D needs a Transform to operate";

    this.body = this.pw2d.world.createBody({
      position: new planck.Vec2(
        this.transform.position.x / this.pw2d.ppu,
        this.transform.position.y / this.pw2d.ppu
      ),
      type: this.type,
      allowSleep: this.allowSleep,
      angularDamping: this.angularDamping,
      linearDamping: this.linearDamping,
    });

    this.body.createFixture({
      shape: planck.Circle(6),
      friction: 0,
      density: 1,
    });
  }

  update() {
    const position = this.body!.getPosition();
    const { ppu } = this.pw2d!;

    /* Apply position */
    this.transform!.position.set(position.x * ppu, position.y * ppu);

    /* Apply rotation */
    this.transform!.container.rotation = this.body!.getAngle();
  }

  destroy() {
    if (this.pw2d && this.body) this.pw2d.world.destroyBody(this.body);
  }

  accelerate(direction: vec2.IVec2, force: number) {
    if (!this.body) return;

    const vec2 = planck.Vec2(direction);
    vec2.normalize();

    this.body.applyForceToCenter(vec2.mul(force), true);
  }

  getUpVector() {
    return planck.Vec2(vec2.fromAngle(this.body!.getAngle() - Math.PI / 2));
  }

  getDownVector() {
    return planck.Vec2(vec2.fromAngle(this.body!.getAngle() + Math.PI / 2));
  }

  getRightVector() {
    return planck.Vec2(vec2.fromAngle(this.body!.getAngle()));
  }

  getLeftVector() {
    return planck.Vec2(vec2.fromAngle(this.body!.getAngle() - Math.PI));
  }
}
