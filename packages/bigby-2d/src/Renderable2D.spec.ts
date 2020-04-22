import Renderable2D from "./Renderable2D";
import * as PIXI from "pixi.js";

describe("Renderable2D", () => {
  describe(".add and .remove", () => {
    it("adds a PIXI display object to the container", () => {
      const r2d = new Renderable2D();
      const other = new PIXI.DisplayObject();

      /* test add */
      r2d.add(other);
      expect(r2d.container.children).toContain(other);

      /* test remove */
      r2d.remove(other);
      expect(r2d.container.children).not.toContain(other);
    });

    it("adds another R2D's container to the container", () => {
      const r2d = new Renderable2D();
      const other = new Renderable2D();

      /* test add */
      r2d.add(other);
      expect(r2d.container.children).toContain(other.container);

      /* test remove */
      r2d.remove(other);
      expect(r2d.container.children).not.toContain(other.container);
    });
  });
});
