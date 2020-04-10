import { Behavior, Entity, math, signal } from "@bigby/core";
import { interaction, IPoint } from "pixi.js";
import { Game2D, IVec2, Renderable2D } from "~/mkgm2d";

export class ViewportController2D extends Behavior {
  static displayName = "ViewportController2D";
  static icon = "🎥";
  static description = "Provides viewport panning and zooming in the editor.";

  private game2d: Game2D;
  private r2d: Renderable2D;
  private isDragging = false;
  private originalMousePosition: IPoint;
  private originalContainerPosition: IPoint;
  private wheelDelta = 0;

  /* Scaling properties */
  scale = 1;
  minScale = 0.3;
  maxScale = 4;

  /* Signals */
  onZoom = signal();

  awake() {
    /* Fetch some other behaviors */
    this.game2d = this.getBehavior(Game2D);
    this.r2d = this.getBehavior(Renderable2D);

    /* Reconfigure the R2D's PIXI container to be interactive, otherwise it will
    not receive mouse/touch events. */
    this.r2d.container.interactive = true;

    /* Set up mouse events */
    const startDragging = (event: interaction.InteractionEvent) => {
      if (event.data.button == 1) {
        this.r2d.container.cursor = "grab";
        this.isDragging = true;
        this.originalMousePosition = this.getMousePosition();
        this.originalContainerPosition = this.r2d.container.getGlobalPosition();
      }
    };

    const stopDragging = (event: interaction.InteractionEvent) => {
      if (event.data.button == 1) {
        this.r2d.container.cursor = "unset";
        this.isDragging = false;
      }
    };

    this.game2d.element.addEventListener("wheel", (event) => {
      if (this.game2d.isEditing) this.wheelDelta += event.deltaY;
    });

    this.r2d.container.on("mousedown", startDragging);
    this.r2d.container.on("mouseup", stopDragging);
    this.r2d.container.on("mouseupoutside", stopDragging);
  }

  editorUpdate() {
    const scale = this.r2d.scale;
    const mousePos = this.getMousePosition();

    if (this.isDragging) {
      /* Calculate the delta the mouse has moved since dragging started */
      const delta = {
        x: mousePos.x - this.originalMousePosition.x,
        y: mousePos.y - this.originalMousePosition.y,
      };

      /* Apply the delta to the original container position */
      this.r2d.position = {
        x: this.originalContainerPosition.x + delta.x,
        y: this.originalContainerPosition.y + delta.y,
      };
    }

    if (this.wheelDelta != 0) {
      /* Apply zoom */
      const delta = this.wheelDelta / 1000;
      this.scale = math.clamp(this.scale - delta, this.minScale, this.maxScale);
      this.r2d.zoomIntoPoint(mousePos, { x: this.scale, y: this.scale });

      /* Reset wheelDelta until next frame */
      this.wheelDelta = 0;

      /* Emit signal */
      this.onZoom.emit();
    }
  }

  getMousePosition() {
    const mouse = this.game2d.app.renderer.plugins.interaction.mouse;
    return mouse.getLocalPosition(this.r2d.container.parent);
  }

  focusOnPosition(position: IVec2) {
    this.scale = 1;
    this.r2d.scale = { x: 1, y: 1 };
    this.r2d.position = { x: -position.x, y: -position.y };
  }

  focusOnEntity(ent: Entity) {
    const r2d = ent.getBehavior(Renderable2D);
    if (r2d) {
      const pos = r2d.position;
      this.focusOnPosition(pos);
    }
  }
}
