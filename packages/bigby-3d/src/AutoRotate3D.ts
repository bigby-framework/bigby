import { Behavior, inspect } from "@bigby/core";
import { Transform3D } from ".";
import { IVec3 } from "./Transform3D";

export default class AutoRotate3D extends Behavior<{ speed: IVec3 }> {
  static displayName = "AutoRotate3D";
  static icon = "♻️";
  static description = "Automatically rotates the entity.";

  @inspect("Speed", ["x", "y", "z"]) speed: IVec3 = { x: 0, y: 0, z: 0 };

  private t3d: Transform3D;

  awake() {
    this.t3d = this.getBehavior(Transform3D);
  }

  update(dt: number) {
    this.t3d.rotation = {
      x: this.t3d.rotation.x + this.speed.x * dt,
      y: this.t3d.rotation.y + this.speed.y * dt,
      z: this.t3d.rotation.z + this.speed.z * dt,
    };
  }
}
