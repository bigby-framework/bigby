import Physics2D from "./Physics2D";
import * as planck from "planck-js";
import { GameBehavior, vec2 } from "@bigby/game";

export default class RigidBody2D extends GameBehavior {
  body?: planck.Body;

  angularDamping = 0;
  linearDamping = 0;
  allowSleep = true;
  type: "dynamic" | "static" = "dynamic";

  /**
   * Set bullet to `true` if you want this RigidBody2D to enable continuous
   * collision detection aka bullet physics. This will incur a performance
   * penalty, but will make sure that the body will not pass through thin walls.
   *
   * @memberof RigidBody2D
   */
  get bullet() {
    return this._bullet;
  }
  set bullet(v) {
    this._bullet = v;
    this.body?.setBullet(v);
  }
  private _bullet = false;

  /**
   * Set fixedRotation to `true` if you want to stop the body from rotation (as
   * part of the physics simulation). You can still set the body's rotation
   * directly. This flag is useful for things like bullets that don't need to
   * rotate individually.
   *
   * @memberof RigidBody2D
   */
  get fixedRotation() {
    return this._fixedRotation;
  }
  set fixedRotation(v) {
    this._fixedRotation = v;
    this.body?.setFixedRotation(v);
  }
  private _fixedRotation = false;

  /**
   * The Physics2D instance that is holding our physics world.
   */
  private p2d?: Physics2D;

  awake() {
    this.p2d = this.getNearestBehavior(Physics2D);
    if (!this.p2d) throw "RigidBody2D needs a Physics2D to operate";
    if (!this.transform) throw "RigidBody2D needs a Transform to operate";

    this.body = this.p2d.world.createBody({
      position: new planck.Vec2(
        this.transform.position.x / this.p2d.ppu,
        this.transform.position.y / this.p2d.ppu
      ),
      type: this.type,
      bullet: this._bullet,
      fixedRotation: this._fixedRotation,
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
    const { ppu } = this.p2d!;

    /* Apply position */
    this.transform!.position.set(position.x * ppu, position.y * ppu);

    /* Apply rotation */
    this.transform!.container.rotation = this.body!.getAngle();
  }

  destroy() {
    if (this.p2d && this.body) this.p2d.world.destroyBody(this.body);
  }

  accelerate(vector: vec2.IVec2) {
    if (!this.body) return;

    this.body.applyForceToCenter(planck.Vec2(vector), true);
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
