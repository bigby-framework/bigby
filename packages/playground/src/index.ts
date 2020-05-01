import "./global.css";
import { Entity, Behavior } from "@bigby/core";
import { Renderer, Ticker, Transform, Sprite } from "@bigby/game";

class Autorotate extends Behavior {
  speed = 50;

  private transform?: Transform;

  awake() {
    this.transform = this.getBehavior(Transform);
  }

  update(dt: number) {
    this.transform!.rotation += this.speed * dt;
  }
}

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
          behaviors: [
            [Transform, { position: { x: 100, y: 100 } }],
            [Sprite, { uri: "/assets/lemming.png", anchor: 0.5 }],
            [Autorotate, { speed: 90 }],
          ],
        },
      ],
    },
  ],
});
root.awake();

console.log(root);
