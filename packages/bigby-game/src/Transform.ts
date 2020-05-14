import { Behavior, $up } from "@bigby/core";
import { Container, DisplayObject } from "pixi.js";
import Renderer from "./Renderer";

/**
 * This is a base behavior for any entity that intends to draw something to the
 * screen. It provides position, rotation, scaling, sorting and more.
 */
export default class Transform extends Behavior {
  container = new Container();

  get position() {
    return this.container.position;
  }

  set position({ x, y }) {
    this.container.position.set(x, y);
  }

  get rotation() {
    return this.container.rotation;
  }

  set rotation(v) {
    this.container.rotation = v;
  }

  get angle() {
    return this.container.angle;
  }

  set angle(v) {
    this.container.angle = v;
  }

  get scale() {
    return this.container.scale;
  }

  set scale(v) {
    this.container.scale.set(v.x, v.y);
  }

  awake() {
    /* If there's another Transform higher up, let's add ourselves to it. If
    not, find the Renderer instance and add ourselves to its stage instead. */

    const transform = this.entity.parent?.$(Transform, true);
    if (transform) {
      transform.add(this);
    } else {
      const renderer = this.$(Renderer, true);
      renderer?.app?.stage.addChild(this.container);
    }
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
