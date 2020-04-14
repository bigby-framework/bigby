import { Entity } from "@bigby/core";
import { Renderable2D, AutoRotate2D, Sprite2D, IVec2, Game2D } from "@bigby/2d";

/* Factory function that will create the root game object */
const game = (name: string) => {
  const game = new Entity(name);
  game.addBehavior(Game2D);
  game.addBehavior(Renderable2D);
  return game;
};

/* Factory for ships */
const ship = ({
  position,
  rotSpeed = 0,
}: {
  position: IVec2;
  rotSpeed?: number;
}) => {
  const ship = new Entity("Spaceship");
  ship.icon = "🚀";
  ship.addBehavior(Renderable2D, { position });
  ship.addBehavior(Sprite2D, { uri: "/assets/lemming.png" });
  ship.addBehavior(AutoRotate2D, { speed: rotSpeed });

  return ship;
};

/* Set up game */
const root = game("Bigby Sample Game");
root.addChild(ship({ position: { x: 200, y: 200 }, rotSpeed: 120 }));
root.addChild(ship({ position: { x: 400, y: 300 }, rotSpeed: -250 }));
root.addChild(ship({ position: { x: 200, y: 400 }, rotSpeed: -250 }));

export default root;
