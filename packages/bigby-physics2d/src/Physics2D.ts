import { Behavior } from "@bigby/core";
import * as planck from "planck-js";
import { IPhysicsBodyUserData } from "./RigidBody2D";

export default class Physics2D extends Behavior {
  readonly world = new planck.World();

  /**
   * Pixels per unit (meter). Defaults to 10.
   */
  ppu = 10;

  /**
   * How many physics calculations to perform per second. (Default: 60)
   */
  stepsPerSecond = 60;

  /**
   * The physics world's gravity vector.
   *
   * @memberof Physics2D
   */
  get gravity() {
    return this.world.getGravity();
  }
  set gravity(v) {
    this.world.setGravity(v);
  }

  awake() {
    this.setupCollisionHandling();
  }

  /** Time accumulator used for performing fixed physics steps. */
  private accuTime = 0;

  update(dt: number) {
    this.updatePhysics(dt);
    this.handleCollisions();
  }

  /**
   * Updates the physics world.
   *
   * Physics simulations are interesting, because they largely rely on constant
   * time steps in order to remain accurate. We can't just pass `dt` in there
   * like we do everywhere else, so instead, we'll accumulate the time and then
   * updated physics on a fixed step.
   *
   * @private
   * @param {number} dt
   * @memberof Physics2D
   */
  private updatePhysics(dt: number) {
    const stepTime = 1 / this.stepsPerSecond;
    this.accuTime += dt;

    while (this.accuTime > stepTime) {
      this.world.step(stepTime);
      this.accuTime -= stepTime;
    }
  }

  /*
  Let's handle collisions!

  Basically, we're going to ask planck to report newly begun and ended contacts
  to us. We'll store them in an array that will then be handled and emptied by
  `handleCollisions`, which will make sure the involved RigidBody2D instances
  will be notified. Good times!
  */

  private contacts = {
    begun: new Array<planck.Contact>(),
    ended: new Array<planck.Contact>(),
  };

  private setupCollisionHandling() {
    /* Set up collisions */
    this.world.on("begin-contact", (contact) => {
      this.contacts.begun.push(contact);
    });

    this.world.on("end-contact", (contact) => {
      this.contacts.ended.push(contact);
    });
  }

  private handleCollisions() {
    this.contacts.begun.forEach((contact) => {
      this.handleCollisionsContact(contact, "onContactBegin");
    });
    this.contacts.begun = [];

    this.contacts.ended.forEach((contact) => {
      this.handleCollisionsContact(contact, "onContactEnd");
    });
    this.contacts.ended = [];
  }

  private handleCollisionsContact(
    contact: planck.Contact,
    signal: "onContactBegin" | "onContactEnd"
  ) {
    const bodyA = contact.getFixtureA().getBody();
    const bodyB = contact.getFixtureB().getBody();

    const rb2dA = (bodyA.m_userData as IPhysicsBodyUserData).rigidBody2D;
    const rb2dB = (bodyB.m_userData as IPhysicsBodyUserData).rigidBody2D;

    rb2dA[signal].emit({ contact, body: rb2dB });
    rb2dB[signal].emit({ contact, body: rb2dA });
  }
}
