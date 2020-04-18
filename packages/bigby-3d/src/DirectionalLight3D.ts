import { Behavior, inspect } from "@bigby/core";
import { DirectionalLight } from "three";
import Transform3D from "./Transform3D";

export default class DirectionalLight3D extends Behavior {
  static displayName = "DirectionalLight3D";
  static icon = "💡";
  static description = "Adds a directional light source to the scene.";

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

  light = new DirectionalLight(0xffffff, 0.5);

  awake() {
    this.getBehavior(Transform3D).add(this.light);
  }
}
