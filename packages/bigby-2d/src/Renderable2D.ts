import { Behavior, inspect } from "@bigby/core";
import * as PIXI from "pixi.js";
import { angleToVec2 } from "./vec2";

export interface IRenderable2D {
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  zIndex: number;
  alpha: number;
}

export class Renderable2D extends Behavior<IRenderable2D>
  implements IRenderable2D {
  static icon = "🖥";
  static displayName = "Renderable2D";
  static description =
    "This is the base behavior required by all entities that intend to be rendered as part of your 2D game.";

  @inspect("Position", ["x", "y"], { step: 10 })
  get position() {
    return this.container.position;
  }
  set position({ x, y }: { x: number; y: number }) {
    this.container.position.set(x, y);
  }

  @inspect("Scale", ["x", "y"], { step: 0.1 })
  get scale() {
    return this.container.scale;
  }
  set scale({ x, y }: { x: number; y: number }) {
    this.container.scale.set(x, y);
  }

  @inspect("Pivot", ["x", "y"])
  get pivot() {
    return this.container.pivot;
  }
  set pivot({ x, y }: { x: number; y: number }) {
    this.container.pivot.set(x, y);
  }

  @inspect("Rotation")
  get rotation() {
    return this.container.angle;
  }
  set rotation(degrees) {
    this.container.angle = degrees;
  }

  get rotationRadians() {
    return this.container.rotation;
  }
  set rotationRadians(radians) {
    this.container.rotation = radians;
  }

  @inspect("Z-Index")
  get zIndex() {
    return this.container.zIndex;
  }
  set zIndex(v) {
    this.container.zIndex = v;
  }

  @inspect("Alpha", null, { min: 0, max: 1, step: 0.1 })
  get alpha() {
    return this.container.alpha;
  }
  set alpha(v) {
    this.container.alpha = v;
  }

  readonly container = new PIXI.Container();

  awake() {
    /* All containers should automatically sort their children by zIndex */
    this.container.sortableChildren = true;

    /* Let's set up a click event, but we'll only set the container to interactive in edit mode. */

    /* TODO: we definitely don't want a dependency to @bigby/editor here, so we
    should probably find a smarter way of doing this. */

    // this.container.on("click", (e: PIXI.interaction.InteractionEvent) => {
    //   if (e.data.button == 0) {
    //     const se = this.getNearestBehavior(SelectedEntity);

    //     if (se) {
    //       se.selectEntityFromGameView(this.entity);
    //       e.stopPropagation();
    //     }
    //   }
    // });

    /* Add our container to the nearest container */
    const r2d = this.parent?.getNearestBehavior(Renderable2D);
    if (r2d) r2d.container.addChild(this.container);
  }

  enterEditMode() {
    this.container.interactive = true;
  }

  enterPlayMode() {
    this.container.interactive = false;
  }

  destroy() {
    const r2d = this.parent?.getNearestBehavior(Renderable2D);
    if (r2d) r2d.container.removeChild(this.container);
  }

  getUpVector() {
    return angleToVec2(this.rotation - Math.PI / 2);
  }

  getDownVector() {
    return angleToVec2(this.rotation + Math.PI / 2);
  }

  getRightVector() {
    return angleToVec2(this.rotation);
  }

  getLeftVector() {
    return angleToVec2(this.rotation - Math.PI);
  }

  zoomIntoPoint(point: PIXI.IPoint, newScale: { x: number; y: number }) {
    /* Modify scale, taking note of local positions before and after */
    const pos1 = this.container.toLocal(point);
    this.scale = newScale;
    const pos2 = this.container.toLocal(point);

    /* Try to resolve pivot */
    this.position.x += (pos2.x - pos1.x) * this.scale.x;
    this.position.y += (pos2.y - pos1.y) * this.scale.y;
  }

  getGlobalPosition(point?: PIXI.Point) {
    return this.container.getGlobalPosition(point);
  }

  getLocalPosition(other: Renderable2D) {
    return this.container.toLocal(other.container.getGlobalPosition());
  }
}
