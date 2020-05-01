import "./global.css";
import { Entity } from "@bigby/core";
import { Renderer, Ticker, Transform } from "@bigby/game";

const root = new Entity({
  name: "Game Root",
  behaviors: [Renderer, Ticker],
  children: [{ name: "Main Scene", behaviors: [Transform] }],
});
root.awake();

console.log(root);
