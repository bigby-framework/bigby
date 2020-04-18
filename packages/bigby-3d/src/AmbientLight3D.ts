import { Behavior, inspect } from "@bigby/core";
import { AmbientLight } from "three";
import Transform3D from "./Transform3D";

export default class AmbientLight3D extends Behavior {
  static displayName = "AmbientLight3D";
  static icon = "💡";
  static description = "Adds ambient lighting to the scene.";

  @inspect("Color", ["r", "g", "b"])
  get color() {
    return this.light.color;
  }
  set color({ r, g, b }) {
    this.light.color.setRGB(r, g, b);
  }

  @inspect()
  get intensity() {
    return this.light.intensity;
  }
  set intensity(v) {
    this.light.intensity = v;
  }

  light = new AmbientLight(0xffffff, 0.5);

  awake() {
    this.getBehavior(Transform3D).add(this.light);
  }
}
