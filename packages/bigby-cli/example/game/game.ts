import { Entity } from "@bigby/core";
import { Game2D, Renderable2D } from "@bigby/2d";

const create = (name: string) => {
  const game = new Entity(name);
  game.addBehavior(Game2D);
  game.addBehavior(Renderable2D);
  return game;
};

export default { create };
