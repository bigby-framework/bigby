import PhysicsWorld2D from "./PhysicsWorld2D";
import * as planck from "planck-js";
import GameBehavior from "../GameBehavior";

export default class RigidBody2D extends GameBehavior {
  body?: planck.Body;

  private pw2d?: PhysicsWorld2D;

  awake() {
    this.pw2d = this.getNearestBehavior(PhysicsWorld2D);
    if (!this.pw2d) throw "RigidBody2D needs a PhysicsWorld2D to operate";
    if (!this.transform) throw "RigidBody2D needs a Transform to operate";

    this.body = this.pw2d.world.createBody({
      type: "dynamic",
      position: new planck.Vec2(
        this.transform.position.x / this.pw2d.ppu,
        this.transform.position.y / this.pw2d.ppu
      ),
    });
  }

  update() {
    const position = this.body!.getPosition();
    const { ppu } = this.pw2d!;

    this.transform!.position.set(position.x * ppu, position.y * ppu);
  }
}
