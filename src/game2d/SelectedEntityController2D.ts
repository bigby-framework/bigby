import { Graphics } from "pixi.js";
import { Renderable2D } from "./Renderable2D";
import { UI2D } from "./UI2D";
import { Behavior, Entity, signal } from "../core";

export class SelectedEntityController2D extends Behavior {
  static displayName = "SelectedEntityController2D";
  static icon = "🧺";
  static description = "Tracks the currently selected entity.";

  /* selectedObject property */
  private _selectedEntity: Entity;
  get selectedEntity() {
    return this._selectedEntity;
  }
  set selectedEntity(ent: Entity) {
    this._selectedEntity = ent;
    this.selectedEntity_r2d = ent.getBehavior(Renderable2D);
  }

  /* onSelectEntity is fired when the user selects an entity within the editor view. */
  onSelectEntity = signal<Entity>();

  private gizmo: Graphics;

  private ui2d: UI2D;
  private selectedEntity_r2d: Renderable2D;

  awake() {
    this.ui2d = this.getBehavior(UI2D);

    /* Create gizmo and add it to editor UI */
    this.gizmo = new Graphics();
    this.ui2d.container.addChild(this.gizmo);
  }

  editorLateUpdate() {
    if (this.selectedEntity && this.gizmo) {
      /* Update gizmo */
      const bounds = this.selectedEntity_r2d.container.getBounds();
      this.gizmo.clear();
      this.gizmo.lineStyle(3, 0xffbd01, 0.5);
      this.gizmo.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      this.gizmo.endFill();
    }
  }

  selectEntityFromGameView(ent: Entity) {
    this.selectedEntity = ent;
    this.onSelectEntity.emit(this.selectedEntity);
  }
}
