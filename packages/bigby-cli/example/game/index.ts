import { AutoRotate2D, Game2D, Renderable2D, Sprite2D } from "@bigby/2d";
import { Entity, EntityFactory, EntityData } from "@bigby/core";

/* Ship factory */
const ship: EntityFactory = ({ position = { x: 0, y: 0 }, rotSpeed = 0 }) => ({
  name: "Spaceship",
  icon: "🚀",
  behaviors: [
    [Renderable2D, { position }],
    [Sprite2D, { uri: "/assets/lemming.png" }],
    [AutoRotate2D, { speed: rotSpeed }],
  ],
});

/* Game data */
const gameData: EntityData = {
  name: "Bigby Example Game",
  behaviors: [Game2D, Renderable2D],
  children: [
    ship({ position: { x: 200, y: 200 }, rotSpeed: 120 }),
    ship({ position: { x: 400, y: 300 }, rotSpeed: -250 }),
    ship({ position: { x: 200, y: 400 }, rotSpeed: -250 }),
  ],
};

export default Entity.from(gameData);
