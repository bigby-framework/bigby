import { Behavior, inspect } from "@bigby/core";
import { IVec3 } from "./Transform3D";

export default class AutoRotate3D extends Behavior<{ speed: IVec3 }> {
  @inspect("Speed", ["x", "y", "z"]) speed: IVec3 = { x: 0, y: 0, z: 0 };

  update(dt: number) {
    console.log("Hi from AutoRotate3D!");
  }
}
