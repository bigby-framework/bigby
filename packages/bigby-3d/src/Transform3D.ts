import { Behavior, inspect } from "@bigby/core";
import { Group } from "three";
import Renderer3D from "./Renderer3D";

export interface IVec3 {
  x: number;
  y: number;
  z: number;
}

export interface IPosition3D {
  position: IVec3;
}

export interface IRotation3D {
  rotation: IVec3;
}

export interface IScale3D {
  scale: IVec3;
}

export interface ITransform3D extends IPosition3D, IRotation3D, IScale3D {}

export default class Transform3D extends Behavior<ITransform3D> {
  static displayName = "Transform3D";
  static icon = "🖥";
  static description = "Yeah.";

  /* Group */
  group = new Group();

  /* Position */
  @inspect("Position", ["x", "y", "z"], { step: 0.1 })
  get position() {
    return this.group.position;
  }

  set position(pos: IVec3) {
    this.group.position.set(pos.x, pos.y, pos.z);
  }

  /* Scale */
  @inspect("Scale", ["x", "y", "z"], { step: 0.05 })
  get scale() {
    return this._scale;
  }

  set scale(scale: IVec3) {
    this._scale = scale;
  }

  private _scale: IVec3 = { x: 1, y: 1, z: 1 };

  /* Rotation */
  @inspect("Rotation", ["x", "y", "z"], { step: 0.05 })
  get rotation() {
    return this._rotation;
  }

  set rotation(rotation: IVec3) {
    this._rotation = rotation;
  }

  private _rotation: IVec3 = { x: 0, y: 0, z: 0 };

  awake() {
    /* Parent our node under the nearest node, if there is one */
    const t3d = this.parent?.getNearestBehavior(Transform3D);
    if (t3d) t3d.group.add(this.group);
  }
}
