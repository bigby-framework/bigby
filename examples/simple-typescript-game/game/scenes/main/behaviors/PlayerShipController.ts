import { Renderable2D } from "@bigby/2d";
import { KeyboardInput } from "@bigby/behaviors";
import { Behavior, inspect } from "@bigby/core";

/* Typically, behaviors implement small pieces of functionality that can be
added to any kind of entity. Sometimes, you will implement behaviors that
implement functionality specific to a certain entity; these are typically known
as "controllers". This behavior class here is PlayerShipController, which is
going to control (aha!) the PlayerShip entity. */

class PlayerShipController extends Behavior {
  /* Behaviors can expose properties in the editor by decorating them with
  @inspect: */

  @inspect("Player Speed") speed = 150;

  /* Behavior classes expose a number of lifecycle methods that you can hook into
  in order to provide functionality. The most important of these are `awake`,
  which is executed at the start of the game, and `update`, which is going to be
  called once per frame while the game is running. */

  private keyboardInput: KeyboardInput;
  private r2d: Renderable2D;

  awake() {
    /* Often, behaviors will have dependencies to other behaviors on the same
    entity. It's a common pattern to look for these in the behavior's `awake`
    function and store a reference to them in a private property.

    In this case, we'll look for a KeyboardInput behavior; if we can't find one,
    we'll simply create one ourselves. */

    this.keyboardInput =
      this.getBehavior(KeyboardInput) || this.entity.addBehavior(KeyboardInput);

    /* We're also going to be interacting with our entity's Renderable2D, so
    let's fetch a reference to it. */

    this.r2d = this.getBehavior(Renderable2D);
  }

  /* Next up is this behavior's `update` function, which will get called once
  per frame while our game is running. We'll use it to check and act on keyboard
  input. */

  update(dt: number) {
    /* Instead of manipulating the entity directly, we'll first build a
    representation of the horizontal and vertical axes -- a virtual joystick of
    sorts -- and modify it based on the current keyboard input. */

    const keys = this.keyboardInput;
    const stick = { x: 0, y: 0 };

    if (keys.isPressed("w")) stick.y -= 1;
    if (keys.isPressed("s")) stick.y += 1;
    if (keys.isPressed("a")) stick.x -= 1;
    if (keys.isPressed("d")) stick.x += 1;

    /* Now that we have a virtual control stick, let's use it to modify our
    player entity's position. Note that we're applying the configured speed as
    well as the `dt` (deltatime) value passed into `update`. */

    this.r2d.position.x += stick.x * this.speed * dt;
    this.r2d.position.y += stick.y * this.speed * dt;
  }
}

export default PlayerShipController;
