import { Behavior, inspect } from "@bigby/core";
import { AmbientLight } from "three";
import Transform3D from "./Transform3D";

export default class AmbientLight3D extends Behavior {
  static displayName = "AmbientLight3D";
  static icon = "💡";
  static description = "Adds ambient lighting to the scene.";

  @inspect() color = 0xffffff;
  @inspect() intensity = 0.1;

  light = new AmbientLight(this.color, this.intensity);

  awake() {
    this.getBehavior(Transform3D).add(this.light);
  }
}
