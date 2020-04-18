import { Behavior, inspect } from "@bigby/core";
import { IVec3, IRotation3D } from "./Transform3D";
import { Transform3D } from ".";

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
    this.t3d?.node.addRotation(
      this.speed.x * dt,
      this.speed.y * dt,
      this.speed.z * dt
    );
  }
}
