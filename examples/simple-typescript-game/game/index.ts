import { Game2D, Renderable2D } from "@bigby/2d";
import { Entity } from "@bigby/core";
import MainScene from "./scenes/main";

/* Anything built using Bigby is comprised of entities (represented by instances
of the Entity class). Each entity can have child entities, forming a scene tree,
and any number of behaviors (represented by instances of the Behavior class.)

How you work with these core classes is mostly up to you -- in this example
game, we'll create a set of classes that inherit from them.

We'll start with the following class, an instance of which represents the game
itself. */

class ExampleGame extends Entity {
  constructor() {
    super("Example Game");

    /* We can use `addBehavior` to add behaviors to an entity. The first
    behavior we want to add is `Game2D`, which implements the actual 2D game
    engine. (Bigby's core framework is engine agnostic; at some point in the
    future, there will also be a Game3D.) */
    this.addBehavior(Game2D);

    /* All entities that intend to render something to the screen are expected
    to have the Renderable2D behavior. */
    this.addBehavior(Renderable2D);

    /* There is no specific "scene management" in Bigby; scenes are simply
    entities that you add to (and later remove from) your top-level entity. So,
    let's create an instance of the MainScene class and add it as a child. */
    this.addChild(new MainScene());
  }
}

/* This example game uses the Bigby CLI, which expects the root entity to be the
default export of this module. */
export default new ExampleGame();
