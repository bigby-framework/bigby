import { Game2D, Renderable2D, UI2D } from "@bigby/2d";
import { Behavior } from "@bigby/core";
import { SelectedEntity } from "@bigby/editor";
import { Graphics } from "pixi.js";

class SelectedEntityController2D extends Behavior {
  static displayName = "SelectedEntityController2D";
  static icon = "🧺";
  static description = "Tracks the currently selected entity.";

  private gizmo: Graphics;
  private ui2d: UI2D;
  private se: SelectedEntity;

  awake() {
    this.ui2d = this.getBehavior(UI2D);
    this.se = this.getBehavior(SelectedEntity);

    /* Create gizmo and add it to editor UI */
    this.gizmo = new Graphics();
    this.ui2d.container.addChild(this.gizmo);
  }

  editorLateUpdate() {
    if (this.se && this.se.selectedEntity && this.gizmo) {
      /* Update gizmo */
      const se_r2d = this.se.selectedEntity.getBehavior(Renderable2D);

      const bounds = se_r2d.container.getBounds();
      this.gizmo.clear();
      this.gizmo.lineStyle(3, 0xffbd01, 0.5);
      this.gizmo.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      this.gizmo.endFill();
    }
  }
}

export default SelectedEntityController2D;
