import { Behavior, inspect } from "@bigby/core";

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

  /* Position */
  @inspect("Position", ["x", "y", "z"], { step: 0.1 })
  get position() {
    return this._position;
  }

  set position(pos: IVec3) {
    this._position = pos;
    this.applyTransform();
  }

  private _position: IVec3 = { x: 0, y: 0, z: 0 };

  /* Scale */
  @inspect("Scale", ["x", "y", "z"], { step: 0.05 })
  get scale() {
    return this._scale;
  }

  set scale(scale: IVec3) {
    this._scale = scale;
    this.applyTransform();
  }

  private _scale: IVec3 = { x: 1, y: 1, z: 1 };

  /* Rotation */
  @inspect("Rotation", ["x", "y", "z"], { step: 0.05 })
  get rotation() {
    return this._rotation;
  }

  set rotation(rotation: IVec3) {
    this._rotation = rotation;
    this.applyTransform();
  }

  private _rotation: IVec3 = { x: 0, y: 0, z: 0 };

  /* Node */
  node: BABYLON.TransformNode;

  awake() {
    /* Create a Babylon TransformNode */
    this.node = new BABYLON.TransformNode(this.entity.name);
    this.applyTransform();

    /* Parent our node under the nearest node, if there is one */
    const t3d = this.parent?.getNearestBehavior(Transform3D);
    if (t3d) this.node.parent = t3d.node;
  }

  private applyTransform() {
    if (!this.node) return;

    this.node.position.set(this.position.x, this.position.y, this.position.z);
    this.node.scaling.set(this.scale.x, this.scale.y, this.scale.z);
    this.node.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
  }
}
