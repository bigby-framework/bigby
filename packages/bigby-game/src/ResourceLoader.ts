import { Behavior } from "@bigby/core";
import * as PIXI from "pixi.js";

export default class ResourceLoader extends Behavior {
  private loader?: PIXI.Loader;

  awake() {
    this.loader = PIXI.Loader.shared;
  }
}
