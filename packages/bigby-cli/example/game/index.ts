import { AutoRotate2D, Game2D, Renderable2D, Sprite2D } from "@bigby/2d";
import { Entity } from "@bigby/core";

/* Ship factory */
const ship = ({ position = { x: 0, y: 0 }, rotSpeed = 0 }) =>
  Entity.from({
    name: "Spaceship",
    icon: "🚀",
    behaviors: [
      [Renderable2D, { position }],
      [Sprite2D, { uri: "/assets/lemming.png" }],
      [AutoRotate2D, { speed: rotSpeed }],
    ],
  });

/* Create game */
const game = Entity.from({
  name: "Bigby Example Game",
  behaviors: [[Game2D], [Renderable2D]],
});

/* Set up game */
game.addChild(ship({ position: { x: 200, y: 200 }, rotSpeed: 120 }));
game.addChild(ship({ position: { x: 400, y: 300 }, rotSpeed: -250 }));
game.addChild(ship({ position: { x: 200, y: 400 }, rotSpeed: -250 }));

export default game;
