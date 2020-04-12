import { Entity } from "@bigby/core";
import { Game2D, Renderable2D } from "@bigby/2d";

export default (name: string, el: HTMLElement) => {
  const game = new Entity();
  game.name = name;
  game.addBehavior(Game2D).element = el;
  game.addBehavior(Renderable2D);
  return game;
};
