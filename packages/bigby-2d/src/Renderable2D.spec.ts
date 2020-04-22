import Renderable2D from "./Renderable2D";
import * as PIXI from "pixi.js";

describe("Renderable2D", () => {
  describe(".add", () => {
    it("adds a PIXI display object to the container", () => {
      const r2d = new Renderable2D();
      const other = new PIXI.DisplayObject();

      r2d.add(other);

      expect(r2d.container.children).toContain(other);
    });

    it("adds another R2D's container to the container", () => {
      const r2d = new Renderable2D();
      const other = new Renderable2D();

      r2d.add(other);

      expect(r2d.container.children).toContain(other.container);
    });
  });
});
