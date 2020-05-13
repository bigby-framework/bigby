import { $up, Signal } from "@bigby/core";
import { GameBehavior, vec2 } from "@bigby/game";
import * as planck from "planck-js";
import Physics2D from "./Physics2D";

export interface IPhysicsBodyUserData {
  rigidBody2D: RigidBody2D;
}

export interface IContactData {
  contact: planck.Contact;
  body: RigidBody2D;
}

export default class RigidBody2D extends GameBehavior {
  /** The physics body this behavior uses internally. */
  body?: planck.Body;

  /* Collision Signals */

  /**
   * Emitted when this RigidBody2D starts colliding with another body.
   *
   * @memberof RigidBody2D
   */
  onContactBegin = Signal<IContactData>();

  /**
   * Emitted when this RigidBody2D stops colliding with another body.
   *
   * @memberof RigidBody2D
   */
  onContactEnd = Signal<IContactData>();

  /* TODO: the following should be getters/setters, directly interacting with the body */

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
   * The current (linear) velocity of the body.
   *
   * @memberof RigidBody2D
   */
  get linearVelocity() {
    return this.body!.getLinearVelocity();
  }
  set linearVelocity(v: vec2.IVec2) {
    this.body!.setLinearVelocity(planck.Vec2(v));
  }

  get rotation() {
    return this.body!.getAngle();
  }
  set rotation(v) {
    this.body!.setAngle(v);
  }

  /**
   * The Physics2D instance that is holding our physics world.
   */
  private p2d?: Physics2D;

  awake() {
    this.p2d = $up(this, Physics2D);
    if (!this.p2d) throw "RigidBody2D needs a Physics2D to operate";
    if (!this.transform) throw "RigidBody2D needs a Transform to operate";

    this.body = this.p2d.world.createBody({
      position: new planck.Vec2(
        this.transform.position.x / this.p2d.ppu,
        this.transform.position.y / this.p2d.ppu
      ),
      angle: this.transform.rotation,
      type: this.type,
      bullet: this._bullet,
      fixedRotation: this._fixedRotation,
      allowSleep: this.allowSleep,
      angularDamping: this.angularDamping,
      linearDamping: this.linearDamping,

      /* User data -- we'll need this for collision handling later */
      userData: { rigidBody2D: this },
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
    return vec2.fromRadians(this.body!.getAngle() - Math.PI / 2);
  }

  getDownVector() {
    return vec2.fromRadians(this.body!.getAngle() + Math.PI / 2);
  }

  getRightVector() {
    return vec2.fromRadians(this.body!.getAngle());
  }

  getLeftVector() {
    return vec2.fromRadians(this.body!.getAngle() - Math.PI);
  }

  /* TODO: absolutely not happy with the "offset" thing we're doing here. Is
  there a way to maybe incooperate the getLeftVector etc. methods above? */

  rotateTowardsVector(v: vec2.IVec2, force: number, offset = 0) {
    this.rotateTowardsAngle(vec2.toRadians(v), force, offset);
  }

  rotateTowardsAngle(angle: number, force: number, offset = 0) {
    let deltaAngle = angle - this.body!.getAngle() + offset;
    while (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;
    while (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
    this.body!.applyTorque(deltaAngle * force);
  }
}
