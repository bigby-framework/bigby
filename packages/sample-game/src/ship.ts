import { Entity } from "@bigby/core";
import { Renderable2D, AutoRotate2D, Sprite2D } from "@bigby/2d";

export default () => {
  const ship = new Entity("Spaceship");
  ship.icon = "🕹";
  ship.addBehavior(Renderable2D);
  ship.addBehavior(Sprite2D, { uri: "/assets/lemming.png" });
  ship.addBehavior(AutoRotate2D, { speed: Math.PI });
  return ship;
};
