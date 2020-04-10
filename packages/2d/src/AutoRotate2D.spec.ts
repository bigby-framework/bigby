import { AutoRotate2D } from "./AutoRotate2D";
import { Renderable2D } from "./Renderable2D";

test("it rotates the R2D at the configured speed", () => {
  const ar2d = new AutoRotate2D();
  ar2d.speed = 10;
  ar2d.rotateable = new Renderable2D();

  expect(ar2d.rotateable.rotation).toBe(0);
  ar2d.update(0.5);
  expect(ar2d.rotateable.rotation).toBe(5);
});
