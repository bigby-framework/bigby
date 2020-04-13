import { Entity } from "@bigby/core";
import { Renderable2D, AutoRotate2D, Sprite2D, IVec2 } from "@bigby/2d";

const create = ({
  position,
  rotSpeed = 0,
}: {
  position: IVec2;
  rotSpeed?: number;
}) => {
  const ship = new Entity("Spaceship");
  ship.icon = "🕹";
  ship.addBehavior(Renderable2D, { position });
  ship.addBehavior(Sprite2D, { uri: "/assets/lemming.png" });
  ship.addBehavior(AutoRotate2D, { speed: rotSpeed });
  return ship;
};

export default { create };
