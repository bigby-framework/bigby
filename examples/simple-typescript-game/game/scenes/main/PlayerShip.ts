import { Renderable2D, Sprite2D } from "@bigby/2d";
import { Entity } from "@bigby/core";
import PlayerShipController from "./behaviors/PlayerShipController";

class PlayerShip extends Entity {
  /* Classes derived from Entity can override their name and icon. */
  name = "Ship";
  icon = "🚀";

  constructor({ position = { x: 0, y: 0 } }) {
    super();

    /* First, let's add the Renderable2D behavior. This allows a Ship instance
    to have its own position, rotation, scale and so on. */
    this.addBehavior(Renderable2D, { position });

    /* We want this little spaceship render itself using a sprite, so let's add
    a Sprite2D behavior and pass some options to it. */
    this.addBehavior(Sprite2D, { uri: "/assets/lemming.png" });

    /* Finally, let's add an instance of PlayerShipController, which is a custom
    behavior implemented within our game (take a look, it's great!) */
    this.addBehavior(PlayerShipController);
  }
}

export default PlayerShip;
