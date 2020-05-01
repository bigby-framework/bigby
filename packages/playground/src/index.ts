import "./global.css";
import { Entity } from "@bigby/core";
import { Renderer, Ticker, Transform, Sprite } from "@bigby/game";

const root = new Entity({
  name: "Game Root",
  behaviors: [Renderer, Ticker],
  children: [
    {
      name: "Main Scene",
      behaviors: [Transform],
      children: [
        {
          name: "Player",
          behaviors: [Transform, [Sprite, { uri: "/assets/lemming.png" }]],
        },
      ],
    },
  ],
});
root.awake();

console.log(root);
