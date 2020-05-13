import { $, Behavior } from "@bigby/core";
import * as PIXI from "pixi.js";
import Renderer from "./Renderer";

export default class Mouse extends Behavior {
  private renderer?: Renderer;
  private interaction?: PIXI.interaction.InteractionManager;

  awake() {
    this.renderer = $(this, Renderer);
    this.interaction = this.renderer!.app!.renderer.plugins.interaction;
  }
}
