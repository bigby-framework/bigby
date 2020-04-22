import { Entity } from "@bigby/core";
import { Game2D, Renderable2D } from "@bigby/2d";
import { Ticker } from "@bigby/behaviors";

export default (name?: string) => {
  const game = new Entity(name);
  game.addBehavior(Ticker);
  game.addBehavior(Game2D);
  game.addBehavior(Renderable2D);
  return game;
};
