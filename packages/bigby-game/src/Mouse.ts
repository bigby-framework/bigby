import { $, Behavior } from "@bigby/core";
import * as PIXI from "pixi.js";
import Renderer from "./Renderer";
import Transform from "./Transform";

type MouseButton = 1 | 2 | 4;

export default class Mouse extends Behavior {
  private renderer?: Renderer;
  private interaction?: PIXI.interaction.InteractionManager;

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

  isLeftButtonPressed() {
    return this.isButtonPressed(1);
  }

  isRightButtonPressed() {
    return this.isButtonPressed(2);
  }

  isMouseWheelPressed() {
    return this.isButtonPressed(4);
  }
}
