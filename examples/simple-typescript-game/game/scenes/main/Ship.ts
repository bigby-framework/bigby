import { Entity } from "@bigby/core";
import { Renderable2D, Sprite2D, AutoRotate2D } from "@bigby/2d";

class Ship extends Entity {
  /* Classes derived from Entity can override their name and icon. */
  name = "Ship";
  icon = "🚀";

  constructor({ position = { x: 0, y: 0 }, rotSpeed = 0 }) {
    super();

    /* First, let's add the Renderable2D behavior. This allows a Ship instance
    to have its own position, rotation, scale and so on. */
    this.addBehavior(Renderable2D, { position });

    /* We want this little spaceship render itself using a sprite, so let's add
    a Sprite2D behavior and pass some options to it. */
    this.addBehavior(Sprite2D, { uri: "/assets/lemming.png" });

    this.addBehavior(AutoRotate2D, { speed: rotSpeed });
  }
}

export default Ship;
