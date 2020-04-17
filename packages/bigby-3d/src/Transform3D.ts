import { Behavior, inspect } from "@bigby/core";

export default class Transform3D extends Behavior {
  static displayName = "Transform3D";
  static icon = "🖥";
  static description = "Yeah.";

  /* Position */
  @inspect("Position", ["x", "y", "z"], { step: 0.1 })
  get position() {
    return this.node.position;
  }

  set position({ x, y, z }: { x: number; y: number; z: number }) {
    this.node.position.set(x, y, z);
  }

  node: BABYLON.TransformNode;

  awake() {
    /* Create a Babylon TransformNode */
    this.node = new BABYLON.TransformNode(this.entity.name);
  }
}
