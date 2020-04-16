import { Entity } from "@bigby/core";
import { Renderable2D, Sprite2D, AutoRotate2D } from "@bigby/2d";

class Ship extends Entity {
  constructor({ position = { x: 0, y: 0 }, rotSpeed = 0 }) {
    super("Ship");

    this.addBehavior(Renderable2D, { position });
    this.addBehavior(Sprite2D, { uri: "/assets/lemming.png" });
    this.addBehavior(AutoRotate2D, { speed: rotSpeed });
  }
}

export default Ship;
