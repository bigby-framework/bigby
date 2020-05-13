import { $, Behavior } from "@bigby/core";
import * as PIXI from "pixi.js";
import Renderer from "./Renderer";
import Transform from "./Transform";

type MouseButton = 1 | 2 | 4;

export default class Mouse extends Behavior {
  private renderer?: Renderer;
  private interaction?: PIXI.interaction.InteractionManager;

  static LeftButton: MouseButton = 1;
  static RightButton: MouseButton = 2;
  static MouseWheel: MouseButton = 4;

  awake() {
    this.renderer = $(this, Renderer);
    this.interaction = this.renderer!.app!.renderer.plugins.interaction;
  }

  getButtons() {
    return this.interaction!.mouse.buttons;
  }

  getPosition(origin?: Transform) {
    return this.interaction!.mouse.getLocalPosition(this.renderer!.app!.stage);
  }

  isButtonPressed(button: MouseButton) {
    return (this.getButtons() & button) == button;
  }
}
