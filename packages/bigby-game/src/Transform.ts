import { Behavior } from "@bigby/core";
import { Container, DisplayObject } from "pixi.js";
import Renderer from "./Renderer";

/**
 * This is a base behavior for any entity that intends to draw something to the
 * screen. It provides position, rotation, scaling, sorting and more.
 */
export default class Transform extends Behavior {
  private container = new Container();

  awake() {
    /* If there's another Transform higher up, let's add ourselves to it. If
    not, find the Renderer instance and add ourselves to its stage instead. */

    this.entity.parent?.getBehavior(Transform)?.add(this) ||
      this.getNearestBehavior(Renderer)?.app?.stage.addChild(this.container);
  }

  destroy() {
    this.container.destroy();
  }

  /**
   * Adds another [[Transform]] (or any [[PIXI.DisplayObject]]) to this transform's container.
   * @param what Object to add. Can be either another [[Transform]] instance or any [[PIXI.DisplayObject]].
   */
  add(what: Transform | DisplayObject) {
    if (what instanceof Transform) this.add(what.container);
    else this.container.addChild(what);
  }
}
