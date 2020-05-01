import { Behavior } from "@bigby/core";
import * as PIXI from "pixi.js";

export default class ResourceLoader extends Behavior {
  get loader() {
    return PIXI.Loader.shared;
  }
}
