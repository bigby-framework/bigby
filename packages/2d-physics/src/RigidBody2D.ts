import { Behavior, inspect, signal } from "@bigby/core";
import { angleToVec2, IVec2, Renderable2D } from "@bigby/2d";
import { Body, Contact, Vec2 } from "planck-js";
import { Physics2D } from "./Physics2D";
import { vec2unit } from "./vec2";

export interface IPhysicsBodyUserData {
  rigidBody2D: RigidBody2D;
}

export interface IContactData {
  contact: Contact;
  body: RigidBody2D;
}

export class RigidBody2D extends Behavior<{
  linearDamping: number;
  angularDamping: number;
  fixedRotation: boolean;
  bullet: boolean;
}> {
  static displayName = "RigidBody2D";
  static icon = "🌍";
  static description = "Simulates the entity in a 2D physics world.";

  /* Configuration Props */
  @inspect() linearDamping = 0.5;
  @inspect() angularDamping = 0.5;

  /* bullet */
  private _bullet = false;
  @inspect() get bullet() {
    return this._bullet;
  }
  set bullet(v) {
    this._bullet = v;
    this.body?.setBullet(v);
  }

  /* fixedRotation */
  private _fixedRotation = false;
  @inspect() get fixedRotation() {
    return this._fixedRotation;
  }
  set fixedRotation(v: boolean) {
    this._fixedRotation = v;
    this.body?.setFixedRotation(v);
  }

  /* Collision Signals */
  onContactBegin = signal<IContactData>();
  onContactEnd = signal<IContactData>();

  /* A couple of convenience getters and setters to wrap around our physics body. */

  get position() {
    return this.body.getPosition().clone();
  }
  set position(vec2: Vec2) {
    this.body.setPosition(vec2);
    this.applyTransformToRenderable2D();
  }

  get velocity() {
    return this.body.getLinearVelocity().clone();
  }
  set velocity(vec2: Vec2) {
    this.body.setLinearVelocity(vec2);
  }

  get angle() {
    return this.body.getAngle();
  }
  set angle(rad) {
    this.body.setAngle(rad);
    this.applyTransformToRenderable2D();
  }

  public body: Body;
  private r2d: Renderable2D;
  private p2d: Physics2D;

  awake() {
    /* Store some references for later */
    this.r2d = this.getBehavior(Renderable2D);
    this.p2d = this.getNearestBehavior(Physics2D);

    /* Create physics body */
    this.body = this.p2d.world.createBody({
      type: "dynamic",
      angularDamping: this.angularDamping,
      linearDamping: this.linearDamping,
      fixedRotation: this.fixedRotation,
      bullet: this.bullet,
      userData: { rigidBody2D: this },
    });

    this.fetchTransformFromRenderable2D();

    /* Listen to updates on the Renderable2D. If the user updates the transform, we'll
      want to modify our own body instead. */
    this.r2d.onPropertyUpdate(() => {
      this.fetchTransformFromRenderable2D();
    });
  }

  update() {
    /* Reconfigure body. TODO: can probably be optimized */
    this.body.setAngularDamping(this.angularDamping);
    this.body.setLinearDamping(this.linearDamping);

    /* Update the entity's transform */
    this.applyTransformToRenderable2D();
  }

  destroy() {
    this.p2d.world.destroyBody(this.body);
  }

  accelerate(direction: IVec2, force: number) {
    this.body.applyForceToCenter(vec2unit(Vec2(direction)).mul(force), true);
  }

  getUpVector() {
    return Vec2(angleToVec2(this.body.getAngle() - Math.PI / 2));
  }

  getDownVector() {
    return Vec2(angleToVec2(this.body.getAngle() + Math.PI / 2));
  }

  getRightVector() {
    return Vec2(angleToVec2(this.body.getAngle()));
  }

  getLeftVector() {
    return Vec2(angleToVec2(this.body.getAngle() - Math.PI));
  }

  private fetchTransformFromRenderable2D() {
    this.body.setPosition(
      Vec2(
        this.r2d.position.x / this.p2d.ppm,
        this.r2d.position.y / this.p2d.ppm
      )
    );
    this.body.setAngle(this.r2d.rotation);
  }

  private applyTransformToRenderable2D() {
    const { p, q } = this.body.getTransform();
    this.r2d.position.x = p.x * this.p2d.ppm;
    this.r2d.position.y = p.y * this.p2d.ppm;
    this.r2d.rotation = q.getAngle();
  }
}
