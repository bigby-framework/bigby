import { Behavior } from "@bigby/core";

class PlayerShipController extends Behavior {
  /* Typically, behaviors implement small pieces of functionality that can be
  added to any kind of entity. Sometimes, you will implement behaviors that
  implement functionality specific to a certain entity; these are typically
  known as "controllers". This behavior class here is PlayerShipController,
  which is going to control (aha!) the PlayerShip entity.

  Behavior classes expose a number of lifecycle methods that you can hook into
  in order to provide functionality. The most important of these is `update`,
  which is going to be called once per frame.
  */

  update(dt: number) {}
}

export default PlayerShipController;
