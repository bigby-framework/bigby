import { Behavior, inspect } from "../../core";
import { Contact, Vec2, World } from "planck-js";
import { IPhysicsBodyUserData } from "./RigidBody2D";

interface IPhysics2DProps {
  gravity: IGravity;
  ppm: number;
}

interface IGravity {
  x: number;
  y: number;
}

export class Physics2D extends Behavior<IPhysics2DProps> {
  static displayName = "Physics2D";
  static icon = "🌍";
  static description =
    "Creates a 2D physics world. Required for any 2D physics you want to simulate in your game.";

  /* Gravity */
  @inspect("Gravity", ["x", "y"])
  get gravity() {
    return this.world.getGravity() as IGravity;
  }
  set gravity({ x, y }: IGravity) {
    this.world.setGravity(new Vec2(x, y));
  }

  /* Configurable properties */
  @inspect() updatesPerSecond = 60;
  @inspect("Pixels/m") ppm = 10; /* Pixels per Meter */

  /* World */
  readonly world = new World({
    gravity: Vec2(0, 9.81),
  });

  /* Needed for our ticking */
  private accumulatedTime = 0;

  /* Collision tracking */
  private begunContacts: Contact[] = [];
  private endedContacts: Contact[] = [];

  awake() {
    /* Set up collisions */
    this.world.on("begin-contact", (contact) => {
      this.begunContacts.push(contact);
    });

    this.world.on("end-contact", (contact) => {
      this.endedContacts.push(contact);
    });
  }

  update(dt: number) {
    if (dt > 0) {
      /* The physics simulation needs to run on a fixed step, so let's make sure this happens. */
      const freq = 1 / this.updatesPerSecond;
      this.accumulatedTime += dt;

      while (this.accumulatedTime > freq) {
        this.accumulatedTime -= freq;
        this.world.step(freq);
      }

      this.handleCollisions();
    }
  }

  private handleCollisionsContact(
    contact: Contact,
    signal: "onContactBegin" | "onContactEnd"
  ) {
    const fixtureA = contact.getFixtureA();
    const fixtureB = contact.getFixtureB();
    const bodyA = fixtureA.getBody();
    const bodyB = fixtureB.getBody();
    const rb2dA = (bodyA.m_userData as IPhysicsBodyUserData).rigidBody2D;
    const rb2dB = (bodyB.m_userData as IPhysicsBodyUserData).rigidBody2D;

    rb2dA[signal].emit({ contact: contact, body: rb2dB });
    rb2dB[signal].emit({ contact: contact, body: rb2dA });
  }

  private handleCollisions() {
    this.begunContacts.forEach((contact) => {
      this.handleCollisionsContact(contact, "onContactBegin");
    });

    this.endedContacts.forEach((contact) => {
      this.handleCollisionsContact(contact, "onContactEnd");
    });

    this.begunContacts = [];
    this.endedContacts = [];
  }
}
