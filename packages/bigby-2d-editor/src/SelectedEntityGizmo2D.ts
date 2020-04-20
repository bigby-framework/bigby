import { Renderable2D, UI2D, Game2D, EntityContainer } from "@bigby/2d";
import { Behavior } from "@bigby/core";
import { SelectedEntity } from "@bigby/editor";
import { Graphics } from "pixi.js";

class SelectedEntityGizmo2D extends Behavior {
  static displayName = "SelectedEntityGizmo2D";
  static icon = "🧺";
  static description =
    "Renders the selection gizmo around the currently selected entity, if there is one.";

  private gizmo: Graphics;
  private ui2d: UI2D;
  private se: SelectedEntity;

  awake() {
    this.ui2d = this.getBehavior(UI2D);
    this.se = this.getBehavior(SelectedEntity);

    /* Create gizmo and add it to editor UI */
    this.gizmo = new Graphics();
    this.ui2d.container.addChild(this.gizmo);

    /* Set up mouse selection of entities */
    if (this.se) {
      const game2d = this.getNearestBehavior(Game2D);
      game2d.app.stage.interactive = true;

      /* Click handler */
      game2d.app.stage.on("click", (e: PIXI.interaction.InteractionEvent) => {
        if (e.data.button == 0 && e.target instanceof EntityContainer) {
          this.se.selectEntityFromGameView(
            (e.target as EntityContainer).bigbyEntity
          );
          e.stopPropagation();
        }
      });
    }
  }

  editorLateUpdate() {
    if (this.se && this.se.selectedEntity && this.gizmo) {
      /* Update gizmo */
      const se_r2d = this.se.selectedEntity.getBehavior(Renderable2D);

      /* If the selected entity has a Renderable2D, render our gizmo around it. */
      if (se_r2d) {
        const bounds = se_r2d.container.getBounds();
        this.gizmo.clear();
        this.gizmo.lineStyle(3, 0xffbd01, 0.5);
        this.gizmo.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
        this.gizmo.endFill();
      } else {
        /* Otherwise, just clear the gizmo. */
        this.gizmo.clear();
      }
    }
  }
}

export default SelectedEntityGizmo2D;
