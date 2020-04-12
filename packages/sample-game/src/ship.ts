import { Entity } from "@bigby/core";
import { Renderable2D, AutoRotate2D } from "@bigby/2d";

export default () => {
  const ship = new Entity();
  ship.name = "Spaceship";
  ship.icon = "🕹";
  ship.addBehavior(Renderable2D);
  ship.addBehavior(AutoRotate2D, { speed: 1 });
  return ship;
};
